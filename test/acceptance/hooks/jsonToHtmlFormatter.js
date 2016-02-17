// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
'use strict';

let Cucumber = require('cucumber'),
    fs = require('fs'),
    path = require('path'),
    Mustache = require('mustache');

let JsonFormatter = Cucumber.Listener.JsonFormatter();

const templatePath = path.join(__dirname, '..', 'template'),
    templateAssetPath = path.join(templatePath, 'asset'),
    reportDirectoryPath = path.join(__dirname, '..', '..', '..', 'test_results', 'acceptance_tests'),
    reportAssetPath = path.join(reportDirectoryPath, 'asset'),
    reportFilePath = path.join(reportDirectoryPath, 'report.json');

const featureConf = new Map()
                      .set('Accueil', { icon: 'home' })
                      .set('Identification', { icon: 'user' })
                      .set('Orientation', { icon: 'map-signs' });
const statusConf = new Map()
                      .set('passed', 'success')
                      .set('failed', 'danger')
                      .set('undefined', 'primary')
                      .set('skipped', 'default');

function mkdirp(path, root) {
  let dirs = path.split('/'),
      dir = dirs.shift(),
      rootPath = (root || '') + dir + '/';

  try {
    fs.mkdirSync(rootPath);
  } catch (e) {
    if (!fs.statSync(rootPath).isDirectory()) {
      throw new Error(e);
    }
  }

  return !dirs.length || mkdirp(dirs.join('/'), rootPath);
}

function copyRecursiveSync(src, dest) {
  let exists = fs.existsSync(src);
  let stats = exists && fs.statSync(src);
  let isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    mkdirp(dest);
    fs.readdirSync(src).forEach(function(childItemName) {
      copyRecursiveSync(path.join(src, childItemName),
                        path.join(dest, childItemName));
    });
  } else if(!fs.existsSync(dest)) {
    fs.linkSync(src, dest);
  }
}

function initGlobalReport() {
  return {
    name: 'Accueil',
    id: 'index',
    icon: featureConf.get('Accueil').icon,
    time: 0,
    featureName: '',
    test: { passed: 0, failed: 0, undefined: 0, skipped: 0 },
    wheather: false,
    wheatherSuny: false,
    wheatherCloudy: false,
    wheatherCloud: false,
    wheatherStormy: false,
    features: []
  };
}

/**
  Exemple : if uri = /toto/tata/titi.feature the function return tata
*/
function getParentFeatureName(featurePath) {
  let featurePathSplitted = featurePath.split(path.sep);
  return featurePathSplitted[featurePathSplitted.length - 2];
}

function updateFeatureStatus(child, parent) {
  if(child.status === 'failed' || (parent.status !== 'failed' && parent.status !== 'undefined' && child.status !== 'skipped')) {
    parent.status = child.status;
    parent.statusStyle = statusConf.get(child.status);
    parent.inError = parent.status !== 'passed';
    parent.error_message = parent.status === 'failed' ? child.error_message : undefined;
  }
}

function loadTemplate(templateFile) {
  return fs.readFileSync(templateFile).toString();
}

function saveHTML(currentFeature, globalReport) {
  let templateFile = path.join(templatePath, 'index.html');
  let html = Mustache.to_html(loadTemplate(templateFile), {
    globalReport: globalReport,
    currentFeature: currentFeature,
    // image: mustacheImageHandler
  });

  fs.writeFileSync(path.join(reportDirectoryPath, currentFeature.id + '.html'), html);
}

function createHtmlReport(features) {

  let globalReport = initGlobalReport();
  let parentFeatures = new Map();

  // Création de la liste des parentFeatures
  JSON.parse(features).forEach(function(feature) {
    let parentFeatureName = getParentFeatureName(feature.uri);
    let parentFeature = parentFeatures.get(parentFeatureName);
    if(!parentFeature) {
      parentFeature = {
          name: parentFeatureName,
          id: parentFeatureName.toLowerCase().replace(/\s+/, '-'),
          icon: featureConf.get(parentFeatureName).icon,
          time: 0,
          status: 'skipped',
          statusStyle: 'default',
          test: { passed: 0, failed: 0, undefined: 0, skipped: 0 },
          features: []
      };
      parentFeatures.set(parentFeatureName, parentFeature);

      globalReport.features.push(parentFeature);
    }

    let featureDescSplitted = feature.description.split('Critères d\'acceptance :');
    feature.story = featureDescSplitted[0].split('\n');
    feature.criterias = featureDescSplitted[1] ? featureDescSplitted[1].split('**') : [];
    feature.criterias.shift();
    feature.time = 0;
    feature.status = 'skipped';
    feature.statusStyle = 'default';
    feature.test = { passed: 0, failed: 0, undefined: 0, skipped: 0 };
    parentFeature.features.push(feature);
  });

  for(let parentFeature of parentFeatures.values()) {

    for(let feature of parentFeature.features) {

      if(feature.elements) {
        for(let scenario of feature.elements) {

          scenario.time = 0;
          scenario.status = 'skipped';
          scenario.statusStyle = 'default';
          scenario.test = { passed: 0, failed: 0, undefined: 0, skipped: 0 };

          if(scenario.steps) {
            for(let step of scenario.steps) {
              step.result.statusStyle = statusConf.get(step.result.status);
              scenario.time += step.result.duration ? step.result.duration/1000000000 : 0;
              updateFeatureStatus(step.result, scenario);
            }
            scenario.error_message_list = scenario.error_message ? scenario.error_message.split('\n') : undefined;
            scenario.time = Math.round(scenario.time);
            scenario.test[scenario.status] += 1;
            feature.test[scenario.status] += 1;
            parentFeature.test[scenario.status] += 1;
            globalReport.test[scenario.status] += 1;
          }

          feature.time += scenario.time;
          updateFeatureStatus(scenario, feature);

        }
      }

      parentFeature.time += feature.time;
      updateFeatureStatus(feature, parentFeature);

      saveHTML(feature, globalReport);
    }

    globalReport.time += parentFeature.time;

    saveHTML(parentFeature, globalReport);
  }

  // Calcul du wheather
  let totalTest = globalReport.test.passed + globalReport.test.failed + globalReport.test.undefined + globalReport.test.skipped;
  let failPercent = Math.round((globalReport.test.failed + globalReport.test.undefined) * 100 / totalTest);
  globalReport.wheatherSuny = failPercent === 0;
  globalReport.wheatherCloudy = failPercent > 0 && failPercent < 10;
  globalReport.wheatherCloud = failPercent >= 10 && failPercent < 50;
  globalReport.wheatherStormy = failPercent >=50;
  globalReport.wheather = true;

  saveHTML(globalReport, globalReport);
}

module.exports = function JsonOutputHook() {
  JsonFormatter.log = function (json) {
    console.log('Écriture du résultat au format json...');
    fs.open(reportFilePath, 'w+', function (err, fd) {
      if (err) {
        mkdirp(reportDirectoryPath);
        fd = fs.openSync(reportFilePath, 'w+');
      }
      fs.writeSync(fd, json, 'utf-8');
    });
    console.log('Copie des fichiers ressources template...');
    copyRecursiveSync(templateAssetPath, reportAssetPath);
    console.log('Création du rapport html...');
    createHtmlReport(json);
  };

  this.registerListener(JsonFormatter);
};

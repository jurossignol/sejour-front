#language: fr
Fonctionnalité: Orientation primo demande de séjour professionnel salarié

En tant que usager
Je veux répondre à une série de questions
Afin d'être orienté vers une primo demande de séjour professionnel salarié

Critère d'acceptance : 
- Les informations suivantes doivent être demandées : profil, date de naissance, nationalité, pays de résidence, durée du séjour, motif du séjour, présence d'une autorisation de travail
- Le dépôt d'une demande de séjour professionnel salarié est proposée à un particulier majeur, de nationalité autre qu'algérienne et "européenne", résidant à l'étranger, projettant un séjour de plus de 3 mois, pour l'exercice d'une activité professionnelle salariée et ayant une autorisation de travail
- Un renvoi vers un site d'information est proposé à tous les usagers non éligibles

Scénario: Je suis un salarié à l'étranger avec une autorisation de travail
    Etant donné un usager non connecté
    Lorsque je suis un particulier
    Et je suis né le 04/08/1966
    Et je suis de nationalité argentine
    Et mon pays de résidence est Argentine
    Et la durée de mon séjour est de plus de 3 mois
    Et mon motif de séjour est l'exercice d'une activité professionnelle salariée
    Et j'ai une autorisation de travail
    Alors on m'oriente vers une primo demande de titre de séjour professionnel salarié

Scénario: Je suis un salarié à l'étranger sans autorisation de travail
    Etant donné un usager non connecté
    Lorsque je suis un particulier
    Et je suis né le 04/08/1966
    Et je suis de nationalité argentine
    Et mon pays de résidence est Argentine
    Et la durée de mon séjour est de plus de 3 mois
    Et mon motif de séjour est l'exercice d'une activité professionnelle salariée
    Et je n'ai pas d'autorisation de travail
    Alors on m'oriente vers un site d'information relatif à l'autorisation de travail
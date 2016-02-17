#language: fr
Fonctionnalité: Orientation demande d'autorisation de travail salarié

En tant qu'usager
Je veux répondre à une série de questions
Afin d'être orienté vers une demande d'autorisation de travail salarié

Critères d'acceptance :
** Les informations suivantes doivent être demandées : profil, démarche, date de naissance, pays de résidence du ressortissant étranger, nationalité du ressortissant étranger, durée du séjour, motif du séjour, présence d'une autorisation de travail
** Le dépôt d'une autorisation de travail est proposée à un employeur, désirant employer un ressortissant étranger majeur, de nationalité autre qu'algérienne et "européenne", résidant à l'étranger, projettant un séjour de plus de 3 mois, pour l'exercice d'une activité professionnelle salariée et n'ayant pas une autorisation de travail
** Un renvoi vers un site d'information est proposé à tous les usagers non éligibles

Scénario: Je suis un employeur d'un ressortissant étranger résidant à l'étranger
    Etant donné un usager non connecté
    Lorsque je suis un employeur
    Et ma démarche est d'employer un ressortissant étranger
    Et le ressortissant étranger est né le 04/08/1966
    Et le ressortissant étranger est de nationalité argentine
    Et son pays de résidence est Argentine
    Et la durée de son séjour est de plus de 3 mois
    Et son motif de séjour est l'exercice d'une activité professionnelle salariée
    Et je n'ai pas d'autorisation de travail
    Alors on m'oriente vers une demande d'autorisation de travail salarié

Scénario: Je suis un employeur d'un ressortissant étranger résidant en France
    Etant donné un usager non connecté
    Lorsque je suis un employeur
    Et ma démarche est d'employer un ressortissant étranger
    Et le ressortissant étranger est né le 04/08/1966
    Et le ressortissant étranger est de nationalité argentine
    Et son pays de résidence est France
    Alors on m'oriente vers un site d'information relatif à l'emploi d'un ressortissant étranger résidant en France

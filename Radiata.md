# Liste des tâches
## 🔤 Correction des formats de texte
- [ ] Vérifier le format des caractères dans le module Service
- [ ] Corriger le problème de majuscule automatique après chaque espace  
  - Exemple :
    - Saisi : "Réservation d'hébergement"
    - Résultat actuel : "Réservation D'hébergement"
  - Comportement attendu : garder les minuscules après espace

## 🛠️ Problèmes après modification des services
- [ ] Corriger l'erreur après modification d’un service
  - Suppression des anciens avantages
  - Création de nouveaux avantages
- [ ] Résoudre le problème où le service ne s’ouvre plus côté public
- [ ] Corriger l’erreur "application error"

## ⚙️ Fiabilité des modifications
- [ ] Vérifier pourquoi certaines modifications ne sont pas prises en compte
- [ ] Corriger les problèmes dans :
  - Les destinations
  - Les services (certains ne fonctionnent pas correctement)

## 🔗 Gestion des relations entre entités
- [ ] Corriger la relation entre "Nos services" et "service inclus"
  - Actuellement liés automatiquement
  - Doivent pouvoir être indépendants (différents)
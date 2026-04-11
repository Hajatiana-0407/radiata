<?php

namespace App\Controller\Admin;

use App\Entity\Reservations;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Field\{
    IdField,
    AssociationField,
    DateTimeField,
    IntegerField,
    BooleanField,
    ChoiceField, EmailField,
    FormField,
    TextField,
    TextareaField
};

class ReservationsCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Reservations::class;
    }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setEntityLabelInSingular('Réservation')
            ->setEntityLabelInPlural('Réservations')
            ->setDefaultSort(['date_creation' => 'DESC'])
            ->setSearchFields(['client.nom', 'client.prenom', 'circuit.titre'])
            ->setPaginatorPageSize(20)
            ->showEntityActionsInlined()
            ->setHelp('index', 'Gestion des réservations de circuits')
            ->setFormOptions(
                ['csrf_protection' => false],
                ['csrf_protection' => false]
            );
    }

    public function configureActions(Actions $actions): Actions
    {

        return $actions
            ->add(Crud::PAGE_INDEX, Action::DETAIL)
            ->add(Crud::PAGE_EDIT, Action::SAVE_AND_ADD_ANOTHER)
            ->update(Crud::PAGE_INDEX, Action::NEW , function (Action $action) {
                return $action->setIcon('fa fa-calendar-plus')->setLabel('Nouvelle réservation');
            })
            ->update(Crud::PAGE_INDEX, Action::EDIT, function (Action $action) {
                return $action->setIcon('fa fa-edit')->setLabel('')->setHtmlAttributes(['title' => 'Modifier']);
            })
            ->update(Crud::PAGE_INDEX, Action::DELETE, function (Action $action) {
                return $action->setIcon('fa fa-trash')->setLabel('')->setHtmlAttributes(['title' => 'Supprimer'])
                    // Supprimer uniquement les réservations non confirmées
                    ->displayIf(fn(Reservations $entity) => !$entity->isStatut());
            })
            ->update(Crud::PAGE_INDEX, Action::DETAIL, function (Action $action) {
                return $action->setIcon('fa fa-eye')->setLabel('')->setHtmlAttributes(['title' => 'Voir le détail']);
            });
    }

    public function configureFields(string $pageName): iterable
    {
        $nomClient = TextField::new('nom_client', 'Nom complet')
            ->setRequired(false)
            ->setHelp('Nom complet du client (si non lié à un compte)');

        $email = EmailField::new('email', 'Email')
            ->setRequired(false)
            ->setHelp('Adresse email de contact');

        $circuit = AssociationField::new('circuit', 'Circuit')
            ->setRequired(true)
            ->autocomplete()
            ->formatValue(function ($value, Reservations $entity) {
                $c = $entity->getCircuit();
                if (!$c)
                    return '<em class="text-muted">—</em>';
                $titre = htmlspecialchars($c->getTitre());
                $duree = $c->getDureeJours() ?? null;
                $badge = $duree ? " <span class='badge badge-light border'>{$duree}j</span>" : '';
                return $titre . $badge;
            })
            ->renderAsHtml()
            ->setHelp('Circuit réservé');

        // -------------------------------------------------------
        // Dates
        // -------------------------------------------------------
        $dateDebut = DateTimeField::new('date_debut', 'Date de début')
            ->setFormat('dd/MM/yyyy')
            ->setRequired(true)
            ->setHelp('Date de début du circuit');

        $dateDebutFull = DateTimeField::new('date_debut', 'Date de début')
            ->setFormat('dd/MM/yyyy HH:mm')
            ->setRequired(true);

        $dateFin = DateTimeField::new('date_fin', 'Date de fin')
            ->setFormat('dd/MM/yyyy HH:mm')
            ->setRequired(false)
            ->setHelp('Date de fin du circuit (calculée automatiquement si laissée vide)');

        $dateCreation = DateTimeField::new('date_creation', 'Date de demande')
            ->setFormat('dd/MM/yyyy HH:mm')
            ->setFormTypeOption('disabled', 'disabled');

        // -------------------------------------------------------
        // Participants — total calculé pour l'index
        // -------------------------------------------------------
        $adultes = IntegerField::new('nombre_adultes', 'Adultes')
            ->setHelp('Nombre d\'adultes (12 ans et +)')
            ->setFormTypeOption('attr', ['min' => 1]);

        $enfants = IntegerField::new('nombre_enfants', 'Enfants')
            ->setHelp('Nombre d\'enfants (2–11 ans)')
            ->setFormTypeOption('attr', ['min' => 0]);

        $bebes = IntegerField::new('nombre_bebes', 'Bébés')
            ->setHelp('Nombre de bébés (moins de 2 ans)')
            ->setFormTypeOption('attr', ['min' => 0]);

        $totalParticipants = IntegerField::new('nombre_adultes', 'Participants')
            ->formatValue(function ($value, Reservations $entity) {
                $a = $entity->getNombreAdultes() ?? 0;
                $e = $entity->getNombreEnfants() ?? 0;
                $b = $entity->getNombreBebes() ?? 0;
                $total = $a + $e + $b;
                $details = [];
                if ($a)
                    $details[] = "{$a} adulte" . ($a > 1 ? 's' : '');
                if ($e)
                    $details[] = "{$e} enfant" . ($e > 1 ? 's' : '');
                if ($b)
                    $details[] = "{$b} bébé" . ($b > 1 ? 's' : '');
                return ($total > 0 ? "👥 {$total} — " : '') . (implode(', ', $details) ?: '—');
            })
            ->onlyOnIndex();

        // -------------------------------------------------------
        // Hébergement
        // -------------------------------------------------------
        $hebergementChoices = [
            '🏨 Standard' => 'standard',
            '🛏️ Confort' => 'comfort',
            '✨ Luxe' => 'luxe',
            '🏡 Villa privée' => 'villa',
        ];

        $hebergement = ChoiceField::new('hebergement', 'Hébergement')
            ->setChoices($hebergementChoices)
            ->renderAsBadges([
                'standard' => 'info',
                'comfort' => 'primary',
                'luxe' => 'warning',
                'villa' => 'success',
            ])
            ->setHelp('Type d\'hébergement choisi pour le circuit');

        // Version formulaire avec descriptions complètes
        $hebergementForm = ChoiceField::new('hebergement', 'Hébergement')
            ->setChoices([
                '🏨 Standard — Chambre basique avec services essentiels' => 'standard',
                '🛏️ Confort — Chambre spacieuse avec plus de commodités' => 'comfort',
                '✨ Luxe — Suite haut de gamme avec services premium' => 'luxe',
                '🏡 Villa Privée — Villa entière avec piscine privée' => 'villa',
            ])
            ->renderExpanded(true)
            ->setHelp('Type d\'hébergement choisi pour le circuit');

        // -------------------------------------------------------
        // Statut (booléen confirmé / en attente)
        // -------------------------------------------------------
        $statut = BooleanField::new('statut', 'Statut')
            ->renderAsSwitch(true)
            ->setHelp('Basculer pour confirmer ou mettre en attente la réservation');

        // Statut formaté pour l'index et le détail — basé sur la vraie propriété booléenne
        $statutIndex = BooleanField::new('statut', 'Statut')
            ->formatValue(function ($value, Reservations $entity) {
                if ($entity->isStatut()) {
                    return '<span class="badge badge-success"><i class="fa fa-check-circle mr-1"></i> Confirmée</span>';
                }
                return '<span class="badge badge-warning text-dark"><i class="fa fa-clock mr-1"></i> En attente</span>';
            });

        // -------------------------------------------------------
        // Services additionnels (correction de la casse)
        // -------------------------------------------------------
        $services = AssociationField::new('Services', 'Services additionnels')
            ->setFormTypeOption('by_reference', false)
            ->autocomplete()
            ->setHelp('Services optionnels inclus dans la réservation');


        // =========================
        // PAGE INDEX
        // =========================
        if ($pageName === Crud::PAGE_INDEX) {
            return [
                // $client,
                $nomClient , 
                $email , 
                $circuit,
                $dateDebut,
                $totalParticipants,
                $hebergement,
                $statutIndex,
                $dateCreation->onlyOnIndex(),
            ];
        }

        // =========================
        // PAGE NEW
        // =========================
        if ($pageName === Crud::PAGE_NEW) {
            return [
                FormField::addPanel('Client')->setIcon('fa-user'),
                 $nomClient , 
                $email , 

                FormField::addPanel('Circuit')->setIcon('fa-route'),
                $circuit,

                FormField::addPanel('Dates')->setIcon('fa-calendar-alt'),
                $dateDebutFull,
                $dateFin,

                FormField::addPanel('Participants')->setIcon('fa-users'),
                $adultes->setFormTypeOption('data', 1),
                $enfants->setFormTypeOption('data', 0),
                $bebes->setFormTypeOption('data', 0),

                FormField::addPanel('Hébergement')->setIcon('fa-bed'),
                $hebergementForm->setFormTypeOption('data', 'standard'),

                FormField::addPanel('Services additionnels')->setIcon('fa-concierge-bell'),
                $services,

                FormField::addPanel('Statut & Remarques')->setIcon('fa-check-circle'),
                $statut->setFormTypeOption('data', false),
            ];
        }

        // =========================
        // PAGE EDIT
        // =========================
        if ($pageName === Crud::PAGE_EDIT) {
            return [
                FormField::addPanel('Client')->setIcon('fa-user'),
                 $nomClient , 
                $email , 

                FormField::addPanel('Circuit')->setIcon('fa-route'),
                $circuit,

                FormField::addPanel('Dates')->setIcon('fa-calendar-alt'),
                $dateDebutFull,
                $dateFin,

                FormField::addPanel('Participants')->setIcon('fa-users'),
                $adultes,
                $enfants,
                $bebes,

                FormField::addPanel('Hébergement')->setIcon('fa-bed'),
                $hebergementForm,

                FormField::addPanel('Services additionnels')->setIcon('fa-concierge-bell'),
                $services,

                FormField::addPanel('Statut & Remarques')->setIcon('fa-check-circle'),
                $statut,

                FormField::addPanel('Informations techniques')->setIcon('fa-history')->collapsible(),
                $dateCreation,
            ];
        }

        // =========================
        // PAGE DETAIL
        // =========================
        return [
            FormField::addPanel('Identification')->setIcon('fa-calendar-check'),
            $dateCreation,
            $statutIndex,

            FormField::addPanel('Client')->setIcon('fa-user'),
            $nomClient,
            $email , 

            FormField::addPanel('Circuit réservé')->setIcon('fa-route'),
            $circuit,

            FormField::addPanel('Dates du séjour')->setIcon('fa-calendar-alt'),
            $dateDebutFull,
            $dateFin,

            FormField::addPanel('Participants')->setIcon('fa-users'),
            $adultes,
            $enfants,
            $bebes,

            FormField::addPanel('Hébergement')->setIcon('fa-bed'),
            $hebergement,

            FormField::addPanel('Services additionnels')->setIcon('fa-concierge-bell'),
            $services,
        ];
    }
}

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
    CollectionField,
    ChoiceField,
    FormField,
    TextField
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
            ->setHelp('index', 'Gestion des réservations de circuits');
    }

    public function configureActions(Actions $actions): Actions
    {
        return $actions
            ->add(Crud::PAGE_INDEX, Action::DETAIL)
            ->add(Crud::PAGE_EDIT, Action::SAVE_AND_ADD_ANOTHER)
            // ->add(Crud::PAGE_INDEX, Action::new('generateInvoice', 'Facture', 'fa fa-file-invoice')
            //     ->linkToRoute('admin_reservation_invoice', function (Reservations $reservation): array {
            //         return ['id' => $reservation->getId()];
            //     })
            //     ->displayIf(fn($entity) => $entity->isStatut()))
            ->add(Crud::PAGE_INDEX, Action::new('sendConfirmation', 'Confirmer', 'fa fa-envelope')
                ->linkToRoute('admin_reservation_confirm', function (Reservations $reservation): array {
                    return ['id' => $reservation->getId()];
                })
                ->displayIf(fn($entity) => !$entity->isStatut()))
            ->update(Crud::PAGE_INDEX, Action::NEW , function (Action $action) {
                return $action->setIcon('fa fa-calendar-plus')->setLabel('Nouvelle réservation');
            })
            ->update(Crud::PAGE_INDEX, Action::EDIT, function (Action $action) {
                return $action->setIcon('fa fa-edit')->setLabel('');
            })
            ->update(Crud::PAGE_INDEX, Action::DELETE, function (Action $action) {
                return $action->setIcon('fa fa-trash')->setLabel('');
            });
    }

    public function configureFields(string $pageName): iterable
    {
        // =========================
        // Champs réutilisables
        // =========================
        $id = IdField::new('id')->onlyOnIndex();

        $client = AssociationField::new('client', 'Client')
            ->setRequired(true)
            ->autocomplete()
            ->setHelp('Client faisant la réservation');

        $circuit = AssociationField::new('circuit', 'Circuit')
            ->setRequired(true)
            ->autocomplete()
            ->setHelp('Circuit réservé');

        $dateDebut = DateTimeField::new('date_debut', 'Date de début')
            ->setFormat('dd/MM/yyyy HH:mm')
            ->setRequired(true)
            ->setHelp('Date de début du circuit');

        $dateFin = DateTimeField::new('date_fin', 'Date de fin')
            ->setFormat('dd/MM/yyyy HH:mm')
            ->setRequired(false)
            ->setHelp('Date de fin du circuit (calculée automatiquement si vide)');

        $adultes = IntegerField::new('nombre_adultes', 'Adultes')
            ->setHelp('Nombre d\'adultes');

        $enfants = IntegerField::new('nombre_enfants', 'Enfants')
            ->setHelp('Nombre d\'enfants');

        $bebes = IntegerField::new('nombre_bebes', 'Bébés')
            ->setHelp('Nombre de bébés');

        $statut = BooleanField::new('statut', 'Statut')
            ->renderAsSwitch(true)
            ->setCustomOption(BooleanField::OPTION_RENDER_AS_SWITCH, true)
            ->setHelp('Réservation confirmée')
            ->formatValue(function ($value, $entity) {
                return $value ? '✅ Confirmée' : '⏳ En attente';
            });

        $dateCreation = DateTimeField::new('date_creation', 'Date création')
            ->setFormat('dd/MM/yyyy HH:mm')
            ->onlyOnIndex()
            ->setFormTypeOption('disabled', 'disabled');

        $services = AssociationField::new('Services', 'Services additionnels')
            ->setFormTypeOption('by_reference', false)
            ->autocomplete()
            ->setHelp('Services optionnels');

        // Durée du séjour
        $duree = TextField::new('duree', 'Durée')
            ->onlyOnIndex()
            ->formatValue(function ($value, $entity) {
                $debut = $entity->getDateDebut();
                $fin = $entity->getDateFin();

                if (!$fin) {
                    if ($circuit = $entity->getCircuit()) {
                        $fin = clone $debut;
                        $fin->modify('+' . $circuit->getDureeJours() . ' days');
                    } else {
                        return 'N/A';
                    }
                }

                $diff = $debut->diff($fin);
                return $diff->days . ' jour(s)';
            });

        // =========================
        // PAGE INDEX (liste)
        // =========================
        if ($pageName === Crud::PAGE_INDEX) {
            return [
                $id,
                // $client,
                // $circuit,
                $dateDebut->setFormat('dd/MM/yyyy'),
                $duree,
                $adultes,
                $enfants,
                $bebes,
                $statut->setTemplatePath('admin/field/reservation_status.html.twig'),
                $dateCreation,
            ];
        }

        // =========================
        // PAGE NEW (création)
        // =========================
        if ($pageName === Crud::PAGE_NEW) {
            return [
                FormField::addPanel('Informations client')->setIcon('fa-user'),
                $client,

                FormField::addPanel('Circuit')->setIcon('fa-route'),
                $circuit,

                FormField::addPanel('Dates')->setIcon('fa-calendar'),
                $dateDebut,
                $dateFin,

                FormField::addPanel('Participants')->setIcon('fa-users'),
                $adultes,
                $enfants,
                $bebes,

                FormField::addPanel('Services additionnels')->setIcon('fa-concierge-bell'),
                $services,

                FormField::addPanel('Statut')->setIcon('fa-check-circle'),
                $statut->setFormTypeOption('data', false),
            ];
        }

        // =========================
        // PAGE EDIT (modification)
        // =========================
        if ($pageName === Crud::PAGE_EDIT) {
            return [
                FormField::addPanel('Informations client')->setIcon('fa-user'),
                $client,

                FormField::addPanel('Circuit')->setIcon('fa-route'),
                $circuit,

                FormField::addPanel('Dates')->setIcon('fa-calendar'),
                $dateDebut,
                $dateFin,

                FormField::addPanel('Participants')->setIcon('fa-users'),
                $adultes,
                $enfants,
                $bebes,

                FormField::addPanel('Services additionnels')->setIcon('fa-concierge-bell'),
                $services,

                FormField::addPanel('Statut')->setIcon('fa-check-circle'),
                $statut,

                FormField::addPanel('Informations techniques')->setIcon('fa-history')->collapsible(),
                $dateCreation->setFormTypeOption('disabled', 'disabled'),
            ];
        }

        // =========================
        // PAGE DETAIL (détails)
        // =========================
        return [
            FormField::addPanel('Informations générales'),
            $id,
            $client,
            $circuit,

            FormField::addPanel('Dates'),
            $dateDebut,
            $dateFin,

            FormField::addPanel('Participants'),
            $adultes,
            $enfants,
            $bebes,

            FormField::addPanel('Services'),
            $services,

            FormField::addPanel('Statut'),
            $statut,
            $dateCreation,
        ];
    }
}
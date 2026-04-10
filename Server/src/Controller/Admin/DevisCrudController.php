<?php

namespace App\Controller\Admin;

use App\Entity\Devis;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Field\{
    IdField,
    TextField,
    EmailField,
    IntegerField,
    ChoiceField,
    DateTimeField,
    AssociationField,
    CollectionField,
    FormField
};

class DevisCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Devis::class;
    }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setEntityLabelInSingular('Devis')
            ->setEntityLabelInPlural('Devis')
            ->setDefaultSort(['date_creation' => 'DESC'])
            ->setSearchFields(['reference_devis', 'nom_client', 'email', 'telephone'])
            ->setPaginatorPageSize(20)
            ->showEntityActionsInlined()
            ->setHelp('index', 'Gestion des demandes de devis')
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
            ->add(Crud::PAGE_INDEX, Action::new('convertToReservation', 'Convertir', 'fa fa-exchange-alt')
                ->linkToRoute('admin_devis_convert', function (Devis $devis): array {
                    return ['id' => $devis->getId()];
                })
                ->displayIf(fn($entity) => $entity->getStatut() === 'accepte'))
            ->update(Crud::PAGE_INDEX, Action::NEW , function (Action $action) {
                return $action->setIcon('fa fa-file-contract')->setLabel('Nouveau devis');
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
            ->setRequired(false)
            ->autocomplete()
            ->setHelp('Sélectionner un client existant');

        $referenceDevis = TextField::new('reference_devis', 'Référence')
            ->setRequired(true)
            ->setHelp('Référence unique du devis')
            ->setFormTypeOption('attr', ['placeholder' => 'DEV-XXXX-XXXX']);

        $nomClient = TextField::new('nom_client', 'Nom client')
            ->setRequired(false)
            ->setHelp('Nom complet du client');

        $email = EmailField::new('email', 'Email')
            ->setRequired(false);

        $telephone = TextField::new('telephone', 'Téléphone')
            ->setRequired(false);

        $adultes = IntegerField::new('nombres_adultes', 'Adultes')
            ->setHelp('Nombre d\'adultes');

        $enfants = IntegerField::new('nombre_enfants', 'Enfants')
            ->setHelp('Nombre d\'enfants');

        $bebes = IntegerField::new('nombre_bebes', 'Bébés')
            ->setHelp('Nombre de bébés');

        $statut = ChoiceField::new('statut', 'Statut')
            ->setChoices([
                'â ï¸ En attente' => 'en_attente',
                'ð En cours' => 'en_cours',
                'â Accepté' => 'accepte',
                'â Refusé' => 'refuse',
                'ð Devis envoyé' => 'devis_envoye',
                'ð° Facturé' => 'facture',
                'ð¦ Terminé' => 'termine'
            ])
            ->renderAsBadges([
                'en_attente' => 'warning',
                'en_cours' => 'info',
                'accepte' => 'success',
                'refuse' => 'danger',
                'devis_envoye' => 'primary',
                'facture' => 'secondary',
                'termine' => 'dark'
            ])
            ->setHelp('Statut actuel du devis');

        $datesSouhaitees = DateTimeField::new('dates_souhaitees', 'Dates souhaitées')
            ->setFormat('dd/MM/yyyy HH:mm')
            ->setRequired(true)
            ->setHelp('Dates souhaitées pour le circuit');

        $dateCreation = DateTimeField::new('date_creation', 'Date création')
            ->setFormat('dd/MM/yyyy HH:mm')
            ->onlyOnIndex()
            ->setFormTypeOption('disabled', 'disabled');

        $circuits = AssociationField::new('circuits', 'Circuits')
            ->setFormTypeOption('by_reference', false)
            ->autocomplete()
            ->setHelp('Circuits sélectionnés');

        $services = AssociationField::new('services', 'Services')
            ->setFormTypeOption('by_reference', false)
            ->autocomplete()
            ->setHelp('Services additionnels');

        // =========================
        // PAGE INDEX (liste)
        // =========================
        if ($pageName === Crud::PAGE_INDEX) {
            return [
                $id,
                $referenceDevis,
                $nomClient,
                $email,
                $telephone,
                $datesSouhaitees->setFormat('dd/MM/yyyy'),
                $statut,
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
                $referenceDevis->setFormTypeOption('data', $this->generateReference()),
                $nomClient,
                $email,
                $telephone,

                FormField::addPanel('Participants')->setIcon('fa-users'),
                $adultes,
                $enfants,
                $bebes,

                FormField::addPanel('Dates')->setIcon('fa-calendar'),
                $datesSouhaitees->setFormTypeOption('data', new \DateTime('+1 week')),

                FormField::addPanel('Prestations')->setIcon('fa-route'),
                $circuits,
                $services,

                FormField::addPanel('Statut')->setIcon('fa-flag'),
                $statut->setFormTypeOption('data', 'en_attente'),
            ];
        }

        // =========================
        // PAGE EDIT (modification)
        // =========================
        if ($pageName === Crud::PAGE_EDIT) {
            return [
                FormField::addPanel('Informations client')->setIcon('fa-user'),
                $client,
                $referenceDevis->setFormTypeOption('disabled', 'disabled'),
                $nomClient,
                $email,
                $telephone,

                FormField::addPanel('Participants')->setIcon('fa-users'),
                $adultes,
                $enfants,
                $bebes,

                FormField::addPanel('Dates')->setIcon('fa-calendar'),
                $datesSouhaitees,

                FormField::addPanel('Prestations')->setIcon('fa-route'),
                $circuits,
                $services,

                FormField::addPanel('Statut')->setIcon('fa-flag'),
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
            $referenceDevis,
            $client,
            $nomClient,
            $email,
            $telephone,

            FormField::addPanel('Participants'),
            $adultes,
            $enfants,
            $bebes,

            FormField::addPanel('Dates'),
            $datesSouhaitees,

            FormField::addPanel('Prestations'),
            $circuits,
            $services,

            FormField::addPanel('Statut'),
            $statut,
            $dateCreation,
        ];
    }

    // Génère une référence unique pour le devis
    private function generateReference(): string
    {
        return 'DEV-' . date('Ymd') . '-' . strtoupper(bin2hex(random_bytes(3)));
    }
}
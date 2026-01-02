<?php

namespace App\Controller\Admin;

use App\Entity\Clients;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Field\{
    IdField,
    TextField,
    EmailField,
    IntegerField,
    BooleanField,
    DateTimeField,
    AssociationField,
    CollectionField,
    FormField
};
use Symfony\Component\Form\Extension\Core\Type\PasswordType;

class ClientsCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Clients::class;
    }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setEntityLabelInSingular('Client')
            ->setEntityLabelInPlural('Clients')
            ->setDefaultSort(['date_creation' => 'DESC'])
            ->setSearchFields(['nom', 'prenom', 'email', 'ville', 'pays'])
            ->setPaginatorPageSize(20)
            ->showEntityActionsInlined()
            ->setHelp('index', 'Gestion des clients et de leurs informations');
    }

    public function configureActions(Actions $actions): Actions
    {
        return $actions
            ->add(Crud::PAGE_INDEX, Action::DETAIL)
            ->add(Crud::PAGE_EDIT, Action::SAVE_AND_ADD_ANOTHER)
            ->update(Crud::PAGE_INDEX, Action::NEW , function (Action $action) {
                return $action->setIcon('fa fa-user-plus')->setLabel('Nouveau client');
            })
            ->update(Crud::PAGE_INDEX, Action::EDIT, function (Action $action) {
                return $action->setIcon('fa fa-edit')->setLabel('');
            })
            ->update(Crud::PAGE_INDEX, Action::DELETE, function (Action $action) {
                return $action->setIcon('fa fa-trash')->setLabel('')
                    ->displayIf(fn($entity) => $entity->getReservations()->isEmpty());
            });
    }
    public function configureFields(string $pageName): iterable
    {
        // =========================
        // Champs réutilisables
        // =========================
        $id = IdField::new('id')->onlyOnIndex();

        $nom = TextField::new('nom', 'Nom')
            ->setRequired(true)
            ->setHelp('Nom de famille du client');

        $prenom = TextField::new('prenom', 'Prénom')
            ->setRequired(true)
            ->setHelp('Prénom du client');

        $email = EmailField::new('email', 'Email')
            ->setRequired(true)
            ->setHelp('Adresse email du client');

        $motDePasse = TextField::new('mot_de_passe', 'Mot de passe')
            ->setFormType(PasswordType::class)
            ->setRequired($pageName === Crud::PAGE_NEW)
            ->setHelp($pageName === Crud::PAGE_NEW
                ? 'Définir un mot de passe pour le client'
                : 'Laisser vide pour ne pas modifier le mot de passe')
            ->hideOnIndex()
            ->setFormTypeOption('empty_data', '');

        $telephone = IntegerField::new('telephone', 'Téléphone')
            ->setRequired(false)
            ->setHelp('Numéro de téléphone');

        $adresse = TextField::new('adresse', 'Adresse')
            ->setRequired(false)
            ->hideOnIndex()
            ->setHelp('Adresse postale complète');

        $ville = TextField::new('ville', 'Ville')
            ->setRequired(false);

        $pays = TextField::new('pays', 'Pays')
            ->setRequired(false)
            ->setHelp('Pays de résidence');

        $dateCreation = DateTimeField::new('date_creation', 'Date d\'inscription')
            ->setFormat('dd/MM/yyyy HH:mm')
            ->onlyOnIndex()
            ->setFormTypeOption('disabled', 'disabled');

        $actif = BooleanField::new('actif', 'Compte actif')
            ->renderAsSwitch(true)
            ->setFormTypeOption('data', true)
            ->setHelp('Le client peut se connecter et effectuer des réservations');

        // Champs d'association (affichés en détail seulement)
        $devis = CollectionField::new('devis', 'Devis')
            ->onlyOnDetail()
            ->setTemplatePath('admin/field/collection_devis.html.twig');

        $reservations = CollectionField::new('reservations', 'Réservations')
            ->onlyOnDetail()
            ->setTemplatePath('admin/field/collection_reservations.html.twig');

        $messagesContacts = CollectionField::new('messagesContacts', 'Messages')
            ->onlyOnDetail();

        $favoris = CollectionField::new('favoris', 'Favoris')
            ->onlyOnDetail();

        // =========================
        // PAGE INDEX (liste)
        // =========================
        if ($pageName === Crud::PAGE_INDEX) {
            return [
                $id,
                $nom,
                $prenom,
                $email,
                $telephone->formatValue(function ($value) {
                    return $value ? '+33 ' . substr($value, 1) : '';
                }),
                $ville,
                $dateCreation,
                $actif,
            ];
        }

        // =========================
        // PAGE NEW (création)
        // =========================
        if ($pageName === Crud::PAGE_NEW) {
            return [
                FormField::addPanel('Informations personnelles')->setIcon('fa-user'),
                $nom,
                $prenom,
                $email,
                $motDePasse,
                $telephone,

                FormField::addPanel('Adresse')->setIcon('fa-map-marker-alt'),
                $adresse,
                $ville,
                $pays,

                FormField::addPanel('Configuration du compte')->setIcon('fa-cog'),
                $actif,
            ];
        }

        // =========================
        // PAGE EDIT (modification)
        // =========================
        if ($pageName === Crud::PAGE_EDIT) {
            return [
                FormField::addPanel('Informations personnelles')->setIcon('fa-user'),
                $nom,
                $prenom,
                $email,
                $motDePasse->setLabel('Nouveau mot de passe (optionnel)'),
                $telephone,

                FormField::addPanel('Adresse')->setIcon('fa-map-marker-alt'),
                $adresse,
                $ville,
                $pays,

                FormField::addPanel('Configuration du compte')->setIcon('fa-cog'),
                $actif,

                FormField::addPanel('Historique')->setIcon('fa-history')->collapsible(),
                $dateCreation->setFormTypeOption('disabled', 'disabled'),
            ];
        }

        // =========================
        // PAGE DETAIL (détails)
        // =========================
        return [
            FormField::addPanel('Informations personnelles'),
            $id,
            $nom,
            $prenom,
            $email,
            $telephone,

            FormField::addPanel('Adresse'),
            $adresse,
            $ville,
            $pays,

            FormField::addPanel('Compte'),
            $dateCreation,
            $actif,

            FormField::addPanel('Activités du client')->setIcon('fa-chart-line')->collapsible(),
            $reservations,
            $devis,
            $messagesContacts,
            $favoris,
        ];
    }
}
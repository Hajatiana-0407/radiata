<?php

namespace App\Controller\Admin;

use App\Entity\Services;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Field\{
    ArrayField, IdField,
    TextField,
    TextareaField,
    IntegerField,
    BooleanField,
    ChoiceField,
    FormField
};

class ServicesCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Services::class;
    }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setEntityLabelInSingular('Service')
            ->setEntityLabelInPlural('Services')
            ->setDefaultSort(['ordre_affichage' => 'ASC'])
            ->setSearchFields(['nom', 'description'])
            ->setPaginatorPageSize(20)
            ->showEntityActionsInlined()
            ->setFormOptions(['validation_groups' => ['Default', 'creation']]);
    }

    public function configureActions(Actions $actions): Actions
    {
        return $actions
            ->add(Crud::PAGE_INDEX, Action::DETAIL)
            ->add(Crud::PAGE_EDIT, Action::SAVE_AND_ADD_ANOTHER)
            ->update(Crud::PAGE_INDEX, Action::NEW , function (Action $action) {
                return $action->setIcon('fa fa-plus')->setLabel('Nouveau service');
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

        $nom = TextField::new('nom', 'Nom du service')
            ->setRequired(true)
            ->setHelp('Nom du service tel qu\'il apparaîtra sur le site');

        $description = TextareaField::new('description', 'Description')
            ->setRequired(true)
            ->setNumOfRows(4)
            ->hideOnIndex()
            ->setHelp('Description détaillée du service');

        $ordreAffichage = IntegerField::new('ordre_affichage', 'Ordre d\'affichage')
            ->setRequired(true)
            ->setHelp('Détermine l\'ordre d\'affichage sur le site (plus petit = premier)');

        $avantages = ArrayField::new('avantages', 'Avantage(s)')
            ->setRequired(false)
            ->hideOnIndex() ; 

        $actif = BooleanField::new('actif', 'Actif')
            ->renderAsSwitch(true)
            ->setFormTypeOption('data', true) // Valeur par défaut
            ->setHelp('Service visible sur le site');

        // =========================
        // PAGE INDEX (liste)
        // =========================
        if ($pageName === Crud::PAGE_INDEX) {
            return [
                $id,
                $nom,
                $ordreAffichage,
                $actif,
            ];
        }

        // =========================
        // PAGE NEW (création)
        // =========================
        if ($pageName === Crud::PAGE_NEW) {
            return [
                FormField::addPanel('Informations principales')->setIcon('fa-info-circle'),
                $nom,
                $description,
                $avantages,

                FormField::addPanel('Configuration')->setIcon('fa-cog'),
                $ordreAffichage,
                $actif,
            ];
        }

        // =========================
        // PAGE EDIT (modification)
        // =========================
        if ($pageName === Crud::PAGE_EDIT) {
            return [
                FormField::addPanel('Informations principales')->setIcon('fa-info-circle'),
                $nom,
                $description,
                $avantages,

                FormField::addPanel('Configuration')->setIcon('fa-cog'),
                $ordreAffichage,
                $actif,
            ];
        }

        // =========================
        // PAGE DETAIL (détails)
        // =========================
        return [
            FormField::addPanel('Informations du service'),
            $id,
            $nom,
            $description,
            $avantages,

            FormField::addPanel('Configuration'),
            $ordreAffichage,
            $actif,
        ];
    }
}
<?php

namespace App\Controller\Admin;

use App\Entity\GalerieMedias;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Field\{
    IdField,
    TextField,
    TextareaField,
    ChoiceField,
    IntegerField,
    BooleanField,
    DateTimeField,
    AssociationField,
    FormField,
    ArrayField,
    ImageField
};

class GalerieMediasCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return GalerieMedias::class;
    }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setEntityLabelInSingular('Média')
            ->setEntityLabelInPlural('Galerie Médias')
            ->setDefaultSort(['ordre_affichage' => 'ASC'])
            ->setSearchFields(['titre', 'description', 'nom_ficher'])
            ->setPaginatorPageSize(10)
            ->showEntityActionsInlined()
            ->setHelp('index', 'Gestion de la galerie médias (images, vidéos, documents)')
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
                return $action->setIcon('fa fa-image')->setLabel('Nouveau média');
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

        $titre = TextField::new('titre', 'Titre du média')
            ->setRequired(true)
            ->setHelp('Titre descriptif du média');

        $description = TextareaField::new('description', 'Description')
            ->setRequired(false)
            ->setNumOfRows(3)
            ->hideOnIndex()
            ->setHelp('Description détaillée du média');


        $uploadDir = 'public/uploads/galerie/images';
        $basePath = 'uploads/galerie/images';
        // Champ de fichier
        $fichier = ImageField::new('fichier', label: 'Image principale')
            ->setBasePath($basePath)
            ->setUploadDir($uploadDir)
            ->setUploadedFileNamePattern('[timestamp].[extension]')
            ->setRequired(true)
            ->setHelp('Image de couverture du circuit (format recommandé: 16:9)');

        $tags = ArrayField::new('tags', 'Tags')
            ->setRequired(false)
            ->hideOnIndex()
            ->setHelp('Tags pour catégoriser le média (séparés par des virgules)');

        $circuit = AssociationField::new('circuit', 'Circuit associé')
            ->setRequired(true)
            ->renderAsNativeWidget()
            ->setHelp('Circuit auquel ce média est lié');

        $service = AssociationField::new('service', 'Service associé')
            ->setRequired(false)
            ->renderAsNativeWidget()
            ->setHelp('Service auquel ce média est lié (optionnel)');

        $ordreAffichage = IntegerField::new('ordre_affichage', 'Ordre d\'affichage')
            ->setRequired(true)
            ->setHelp('Position dans la galerie (plus petit = premier)');

        $dateUpload = DateTimeField::new('date_upload', 'Date d\'upload')
            ->setFormat('dd/MM/yyyy HH:mm')
            ->onlyOnIndex()
            ->setFormTypeOption('disabled', 'disabled');

        $actif = BooleanField::new('actif', 'Actif')
            ->renderAsSwitch(true)
            ->setFormTypeOption('data', true)
            ->setHelp('Média visible dans la galerie');

        // =========================
        // PAGE INDEX (liste)
        // =========================
        if ($pageName === Crud::PAGE_INDEX) {
            return [
                $id,
                $fichier->setBasePath($basePath)->onlyOnIndex(),
                $titre,
                $circuit,
                $ordreAffichage,
                $actif,
                $dateUpload,
            ];
        }

        // =========================
        // PAGE NEW (création)
        // =========================
        if ($pageName === Crud::PAGE_NEW) {
            return [
                FormField::addPanel('Informations média')->setIcon('fa-info-circle'),
                $titre,
                $description,

                FormField::addPanel('Fichier')->setIcon('fa-file-upload'),
                $fichier,

                FormField::addPanel('Associations')->setIcon('fa-link'),
                $circuit,
                $service,

                FormField::addPanel('Organisation')->setIcon('fa-sliders-h'),
                $tags,
                $ordreAffichage,
                $actif->setFormTypeOption('data', true),
            ];
        }

        // =========================
        // PAGE EDIT (modification)
        // =========================
        if ($pageName === Crud::PAGE_EDIT) {
            return [
                FormField::addPanel('Informations média')->setIcon('fa-info-circle'),
                $titre,
                $description,

                FormField::addPanel('Fichier')->setIcon('fa-file-upload'),
                $fichier,

                FormField::addPanel('Associations')->setIcon('fa-link'),
                $circuit,
                $service,

                FormField::addPanel('Organisation')->setIcon('fa-sliders-h'),
                $tags,
                $ordreAffichage,
                $actif,

                FormField::addPanel('Informations techniques')->setIcon('fa-history')->collapsible(),
                $dateUpload->setFormTypeOption('disabled', 'disabled'),
            ];
        }

        // =========================
        // PAGE DETAIL (détails)
        // =========================
        return [
            FormField::addPanel('Informations média'),
            $id,
            $titre,
            $description,
            $fichier,

            FormField::addPanel('Associations'),
            $circuit,
            $service,

            FormField::addPanel('Organisation'),
            $tags,
            $ordreAffichage,
            $actif,

            FormField::addPanel('Informations techniques'),
            $dateUpload,
        ];
    }
}
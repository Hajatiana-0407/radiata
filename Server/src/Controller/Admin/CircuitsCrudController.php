<?php

namespace App\Controller\Admin;

use App\Entity\Circuits;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Field\{
    IdField,
    TextField,
    TextareaField,
    ImageField,
    NumberField,
    BooleanField,
    DateTimeField,
    AssociationField,
    CollectionField,
    SlugField,
    ChoiceField,
    FormField
};

class CircuitsCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Circuits::class;
    }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setEntityLabelInSingular('Circuit')
            ->setEntityLabelInPlural('Circuits')
            ->setDefaultSort(['date_creation' => 'DESC'])
            ->setSearchFields(['titre', 'description', 'slug'])
            ->setPaginatorPageSize(10)
            ->showEntityActionsInlined()
            ->setHelp('index', 'Gérez vos circuits touristiques');
    }

    public function configureActions(Actions $actions): Actions
    {
        return $actions
            ->add(Crud::PAGE_INDEX, Action::DETAIL)
            ->add(Crud::PAGE_EDIT, Action::SAVE_AND_ADD_ANOTHER)
            ->add(Crud::PAGE_INDEX, Action::new('duplicate', 'Dupliquer')
                ->linkToCrudAction('duplicate')
                ->setIcon('fa fa-copy')
                ->displayIf(fn ($entity) => $entity instanceof Circuits))
            ->update(Crud::PAGE_INDEX, Action::NEW, function (Action $action) {
                return $action->setIcon('fa fa-route')->setLabel('Nouveau circuit');
            })
            ->update(Crud::PAGE_INDEX, Action::DELETE, function (Action $action) {
                return $action->setIcon('fa fa-trash')->setLabel('')
                    ->displayIf(fn ($entity) => $entity->getReservations()->isEmpty());
            });
    }

    public function configureFields(string $pageName): iterable
    {
        // =========================
        // Chemins d'upload
        // =========================
        $uploadDir = 'public/uploads/circuits';
        $basePath = 'uploads/circuits';
        
        // =========================
        // Champs réutilisables
        // =========================
        $id = IdField::new('id')->onlyOnIndex();
        
        $titre = TextField::new('titre', 'Titre du circuit')
            ->setRequired(true)
            ->setHelp('Titre principal du circuit');
        
        $image = ImageField::new('image', 'Image principale')
            ->setBasePath($basePath)
            ->setUploadDir($uploadDir)
            ->setUploadedFileNamePattern('[slug]-[timestamp].[extension]')
            ->setRequired(false)
            ->setHelp('Image de couverture du circuit (format recommandé: 16:9)');
        
        $slug = SlugField::new('slug')
            ->setTargetFieldName('titre')
            ->setUnlockConfirmationMessage('Le slug est généré automatiquement')
            ->setHelp('URL du circuit');
        
        $description = TextareaField::new('description', 'Description')
            ->setRequired(true)
            ->setNumOfRows(5)
            ->hideOnIndex()
            ->setHelp('Description détaillée du circuit');
        
        $metaTitre = TextField::new('meto_titre', 'Meta titre (SEO)')
            ->setRequired(false)
            ->hideOnIndex()
            ->setHelp('Titre pour le référencement (50-60 caractères)');
        
        $metaDescription = TextareaField::new('meta_description', 'Meta description (SEO)')
            ->setRequired(false)
            ->setNumOfRows(2)
            ->hideOnIndex()
            ->setHelp('Description pour le référencement (150-160 caractères)');
        
        $dureeJours = NumberField::new('duree_jours', 'Durée (jours)')
            ->setNumDecimals(1)
            ->setRequired(true)
            ->setHelp('Durée du circuit en jours (ex: 7.5 pour 7 jours et demi)');
        
        $prixBase = NumberField::new('prix_base', 'Prix de base')
            ->setNumDecimals(2)
            ->setRequired(true)
            ->setHelp('Prix de base par personne (€)');
        
        $difficulte = ChoiceField::new('difficulte', 'Difficulté')
            ->setChoices([
                '⭐ Facile' => 1,
                '⭐⭐ Intermédiaire' => 2,
                '⭐⭐⭐ Difficile' => 3,
                '⭐⭐⭐⭐ Expert' => 4,
                '⭐⭐⭐⭐⭐ Extrême' => 5
            ])
            ->renderAsBadges([
                1 => 'success',
                2 => 'info',
                3 => 'warning',
                4 => 'danger',
                5 => 'dark'
            ])
            ->setHelp('Niveau de difficulté du circuit');
        
        $scoreEcotourisme = NumberField::new('score_ecotourisme', 'Score écotourisme')
            ->setNumDecimals(1)
            ->setHelp('Score de durabilité (1 à 5 étoiles)')
            ->setFormTypeOption('attr', ['min' => 1, 'max' => 5, 'step' => 0.5]);
        
        $actif = BooleanField::new('actif', 'Actif')
            ->renderAsSwitch(true)
            ->setFormTypeOption('data', true)
            ->setHelp('Circuit visible sur le site');
        
        $dateCreation = DateTimeField::new('date_creation', 'Date de création')
            ->setFormat('dd/MM/yyyy HH:mm')
            ->onlyOnIndex()
            ->setFormTypeOption('disabled', 'disabled');
        
        // Champs d'association
        $circuitsSimilaires = AssociationField::new('circuits', 'Circuits similaires')
            ->setFormTypeOption('by_reference', false)
            ->setHelp('Circuits liés ou similaires')
            ->autocomplete();
        
        $categories = AssociationField::new('categories', 'Catégories')
            ->setFormTypeOption('by_reference', false)
            ->setHelp('Catégories associées au circuit')
            ->autocomplete();
        
        // Collections (affichées uniquement en détail)
        $galerieMedias = CollectionField::new('galerieMedias', 'Galerie médias')
            ->useEntryCrudForm(GalerieMediasCrudController::class)
            ->onlyOnDetail();
        
        $reservations = CollectionField::new('reservations', 'Réservations')
            ->onlyOnDetail();
        
        $avis = CollectionField::new('avis', 'Avis')
            ->onlyOnDetail();

        // =========================
        // PAGE INDEX (liste)
        // =========================
        if ($pageName === Crud::PAGE_INDEX) {
            return [
                $id,
                $image->setBasePath($basePath)->onlyOnIndex(),
                $titre,
                $dureeJours->setNumDecimals(0),
                $prixBase->setNumDecimals(0)->formatValue(function ($value) {
                    return $value ? number_format($value, 0, ',', ' ') . ' €' : '0 €';
                }),
                $difficulte,
                $actif,
                $dateCreation,
            ];
        }

        // =========================
        // PAGE NEW (création)
        // =========================
        if ($pageName === Crud::PAGE_NEW) {
            return [
                FormField::addPanel('Informations principales')->setIcon('fa-info-circle'),
                $titre,
                $slug,
                $description,
                $image,
                
                FormField::addPanel('Caractéristiques')->setIcon('fa-cogs'),
                $dureeJours,
                $prixBase,
                $difficulte,
                $scoreEcotourisme,
                
                FormField::addPanel('Catégories & Relations')->setIcon('fa-tags'),
                $categories,
                $circuitsSimilaires,
                
                FormField::addPanel('Référencement')->setIcon('fa-search')->collapsible(),
                $metaTitre,
                $metaDescription,
                
                FormField::addPanel('Publication')->setIcon('fa-globe'),
                $actif,
            ];
        }

        // =========================
        // PAGE EDIT (modification)
        // =========================
        if ($pageName === Crud::PAGE_EDIT) {
            return [
                FormField::addPanel('Informations principales')->setIcon('fa-info-circle'),
                $titre,
                $slug,
                $description,
                $image,
                
                FormField::addPanel('Caractéristiques')->setIcon('fa-cogs'),
                $dureeJours,
                $prixBase,
                $difficulte,
                $scoreEcotourisme,
                
                FormField::addPanel('Catégories & Relations')->setIcon('fa-tags'),
                $categories,
                $circuitsSimilaires,
                
                FormField::addPanel('Référencement')->setIcon('fa-search')->collapsible(),
                $metaTitre,
                $metaDescription,
                
                FormField::addPanel('Publication')->setIcon('fa-globe'),
                $actif,
                
                FormField::addPanel('Informations techniques')->setIcon('fa-history')->collapsible(),
                $dateCreation->setFormTypeOption('disabled', 'disabled'),
            ];
        }

        // =========================
        // PAGE DETAIL (détails)
        // =========================
        return [
            FormField::addPanel('Informations principales'),
            $id,
            $image,
            $titre,
            $slug,
            $description,
            
            FormField::addPanel('Caractéristiques'),
            $dureeJours,
            $prixBase,
            $difficulte,
            $scoreEcotourisme,
            
            FormField::addPanel('Catégories'),
            $categories,
            $circuitsSimilaires,
            
            FormField::addPanel('Référencement'),
            $metaTitre,
            $metaDescription,
            
            FormField::addPanel('Publication'),
            $actif,
            $dateCreation,
            
            FormField::addPanel('Contenu associé')->collapsible(),
            $galerieMedias,
            $reservations,
            $avis,
        ];
    }
}
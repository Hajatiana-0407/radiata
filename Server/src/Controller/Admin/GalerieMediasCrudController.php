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
    ArrayField
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
            ->setPaginatorPageSize(20)
            ->showEntityActionsInlined()
            ->setHelp('index', 'Gestion de la galerie médias (images, vidéos, documents)');
    }

    public function configureActions(Actions $actions): Actions
    {
        return $actions
            ->add(Crud::PAGE_INDEX, Action::DETAIL)
            ->add(Crud::PAGE_EDIT, Action::SAVE_AND_ADD_ANOTHER)
            ->add(Crud::PAGE_INDEX, Action::new('preview', 'Prévisualiser', 'fa fa-eye')
                ->linkToUrl(function (GalerieMedias $media) {
                    $filePath = $media->getCheminFichier();
                    
                    if (!$filePath) {
                        return '#';
                    }
                    
                    return '/uploads/galerie/' . $filePath;
                })
                ->setHtmlAttributes(['target' => '_blank'])
                ->displayIf(function ($entity) {
                    return $entity->getCheminFichier() && 
                           $entity->getTypeMedia() === 'image';
                }))
            ->update(Crud::PAGE_INDEX, Action::NEW, function (Action $action) {
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
        
        // Champ de fichier
        $fichier = TextField::new('chemin_fichier', 'Fichier')
            ->setRequired(true)
            ->hideOnIndex()
            ->setHelp('Nom du fichier (ex: mon-image.jpg)');
        
        // Champ pour afficher le fichier selon son type
        $fichierPreview = TextField::new('chemin_fichier', 'Fichier')
            ->onlyOnIndex()
            ->formatValue(function ($value, $entity) {
                return $this->renderMediaPreview($entity);
            });
        
        $typeMedia = ChoiceField::new('type_media', 'Type de média')
            ->setChoices([
                '🖼️ Image' => 'image',
                '🎬 Vidéo' => 'video',
                '📄 Document PDF' => 'pdf',
                '📋 Document Word' => 'document',
                '🔊 Audio' => 'audio',
                '📊 Archive ZIP' => 'archive'
            ])
            ->setRequired(true)
            ->setHelp('Type de fichier média');
        
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
                $fichierPreview,
                $titre,
                $typeMedia,
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
                $typeMedia->setFormTypeOption('data', 'image'),
                
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
                $typeMedia,
                
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
            $typeMedia,
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

    // Méthode pour rendre l'aperçu du média
    private function renderMediaPreview(GalerieMedias $media): string
    {
        $type = $media->getTypeMedia();
        $filePath = $media->getCheminFichier();
        $titre = $media->getTitre();
        
        if (!$filePath) {
            return '<i class="fas fa-file fa-lg text-muted"></i>';
        }
        
        if ($type === 'image' && $filePath) {
            // Chemin relatif pour l'image
            $imageUrl = '/uploads/galerie/images/' . $filePath;
            
            return sprintf(
                '<img src="%s" alt="%s" style="width: 60px; height: 40px; object-fit: cover; border-radius: 4px;" onerror="this.onerror=null; this.src=\'/bundles/easyadmin/images/default-item-image.png\';">',
                htmlspecialchars($imageUrl),
                htmlspecialchars($titre)
            );
        }
        
        // Icônes pour les autres types
        $icons = [
            'image' => ['class' => 'fa-image', 'color' => 'primary'],
            'video' => ['class' => 'fa-video', 'color' => 'danger'],
            'pdf' => ['class' => 'fa-file-pdf', 'color' => 'danger'],
            'document' => ['class' => 'fa-file-word', 'color' => 'info'],
            'audio' => ['class' => 'fa-file-audio', 'color' => 'warning'],
            'archive' => ['class' => 'fa-file-archive', 'color' => 'secondary']
        ];
        
        $icon = $icons[$type] ?? ['class' => 'fa-file', 'color' => 'muted'];
        
        return sprintf(
            '<i class="fas %s fa-2x text-%s" title="%s"></i>',
            $icon['class'],
            $icon['color'],
            htmlspecialchars($type)
        );
    }
}
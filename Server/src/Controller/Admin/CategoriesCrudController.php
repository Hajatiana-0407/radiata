<?php

namespace App\Controller\Admin;

use App\Entity\Categories;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Field\{
    IdField,
    TextField,
    TextareaField,
    ColorField,
    IntegerField,
    DateTimeField,
    ChoiceField,
    FormField
};

class CategoriesCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Categories::class;
    }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setEntityLabelInSingular('Catégorie')
            ->setEntityLabelInPlural('Catégories')
            ->setDefaultSort(['ordre_affichage' => 'ASC'])
            ->setSearchFields(['nom', 'description'])
            ->setPaginatorPageSize(20)
            ->showEntityActionsInlined();
    }

    public function configureActions(Actions $actions): Actions
    {
        return $actions
            ->add(Crud::PAGE_INDEX, Action::DETAIL)
            ->add(Crud::PAGE_EDIT, Action::SAVE_AND_ADD_ANOTHER)
            ->update(Crud::PAGE_INDEX, Action::NEW, function (Action $action) {
                return $action->setIcon('fa fa-folder-plus')->setLabel('Nouvelle catégorie');
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
        
        // Champ icône avec sélection d'icônes FontAwesome
        $icone = ChoiceField::new('icone', 'Icône')
            ->setChoices([
                '📁 Dossier' => 'fas fa-folder',
                '🏷️ Étiquette' => 'fas fa-tag',
                '📂 Dossier ouvert' => 'fas fa-folder-open',
                '📊 Graphique' => 'fas fa-chart-bar',
                '💰 Finance' => 'fas fa-money-bill-wave',
                '🛒 Commerce' => 'fas fa-shopping-cart',
                '🎨 Design' => 'fas fa-palette',
                '💻 Technologie' => 'fas fa-laptop-code',
                '🎵 Musique' => 'fas fa-music',
                '🎬 Film' => 'fas fa-film',
                '📚 Livre' => 'fas fa-book',
                '🍕 Nourriture' => 'fas fa-pizza-slice',
                '🚗 Transport' => 'fas fa-car',
                '🏥 Santé' => 'fas fa-heartbeat',
                '🎓 Éducation' => 'fas fa-graduation-cap',
                '⚽ Sport' => 'fas fa-futbol',
                '✈️ Voyage' => 'fas fa-plane',
                '🏠 Maison' => 'fas fa-home',
                '👕 Mode' => 'fas fa-tshirt',
                '🔧 Outils' => 'fas fa-tools',
                '📱 Mobile' => 'fas fa-mobile-alt',
                '💡 Idées' => 'fas fa-lightbulb',
                '👥 Personnes' => 'fas fa-users',
                '📅 Événements' => 'fas fa-calendar-alt',
                '📰 Actualités' => 'fas fa-newspaper',
                '🎯 Cible' => 'fas fa-bullseye',
                '⚡ Énergie' => 'fas fa-bolt',
                '🌱 Nature' => 'fas fa-leaf',
                '🏢 Entreprise' => 'fas fa-building',
            ])
            ->setRequired(false)
            ->renderAsBadges(false)
            ->setHelp('Sélectionnez une icône FontAwesome ou laissez vide');
        
        $nom = TextField::new('nom', 'Nom de la catégorie')
            ->setRequired(true)
            ->setHelp('Nom de la catégorie tel qu\'il apparaîtra sur le site');
        
        $description = TextareaField::new('description', 'Description')
            ->setRequired(false)
            ->setNumOfRows(3)
            ->hideOnIndex()
            ->setHelp('Description courte de la catégorie');
        
        // Champ couleur avec sélecteur de couleur
        $couleur = ColorField::new('couleur', 'Couleur')
            ->setRequired(false)
            ->setHelp('Couleur d\'accentuation de la catégorie (format hexadécimal)');
        
        $ordreAffichage = IntegerField::new('ordre_affichage', 'Ordre d\'affichage')
            ->setRequired(true)
            ->setHelp('Détermine l\'ordre d\'affichage (plus petit = premier)');
        
        $dateCreation = DateTimeField::new('date_creation', 'Date de création')
            ->setFormat('dd/MM/yyyy HH:mm')
            ->onlyOnIndex()
            ->setFormTypeOption('disabled', 'disabled');

        // =========================
        // PAGE INDEX (liste)
        // =========================
        if ($pageName === Crud::PAGE_INDEX) {
            return [
                $id,
                $icone->setTemplatePath('admin/field/icon.html.twig'),
                $nom,
                $couleur->setTemplatePath('admin/field/color.html.twig'),
                $ordreAffichage,
                $dateCreation,
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
                
                FormField::addPanel('Apparence')->setIcon('fa-paint-brush'),
                $icone,
                
                FormField::addPanel('Configuration')->setIcon('fa-cog'),
                $ordreAffichage,
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
                
                FormField::addPanel('Apparence')->setIcon('fa-paint-brush'),
                $icone,
                $couleur,
                
                FormField::addPanel('Configuration')->setIcon('fa-cog'),
                $ordreAffichage,
                
                FormField::addPanel('Informations techniques')->setIcon('fa-history')->collapsible(),
                $dateCreation,
            ];
        }

        // =========================
        // PAGE DETAIL (détails)
        // =========================
        return [
            FormField::addPanel('Informations principales'),
            $id,
            $icone,
            $nom,
            $description,
            
            FormField::addPanel('Apparence'),
            $couleur,
            
            FormField::addPanel('Configuration'),
            $ordreAffichage,
            $dateCreation,
        ];
    }
}
<?php

namespace App\Controller\Admin;

use App\Entity\Articles;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Field\{
    AssociationField,
    IdField,
    TextField,
    TextareaField,
    ImageField,
    DateTimeField,
    BooleanField,
    SlugField,
    FormField
};

class ArticlesCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Articles::class;
    }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setEntityLabelInSingular('Article')
            ->setEntityLabelInPlural('Articles')
            ->setDefaultSort(['id' => 'DESC', 'date_creation' => 'DESC'])
            ->setSearchFields(['titre', 'contenu', 'meto_titre'])
            ->setPaginatorPageSize(10)
            ->showEntityActionsInlined()
            ->setHelp('index', 'Gérez vos articles de blog et actualités');
    }

    public function configureActions(Actions $actions): Actions
    {
        return $actions
            ->add(Crud::PAGE_INDEX, Action::DETAIL)
            ->add(Crud::PAGE_EDIT, Action::SAVE_AND_ADD_ANOTHER)
            // ->add(Crud::PAGE_INDEX, Action::new('preview', 'Prévisualiser')
            //     ->linkToUrl(function (Articles $article) {
            //         return $this->generateUrl('article_show', ['slug' => $article->getSlug()]);
            //     })
            //     ->setIcon('fa fa-eye')
            //     ->setHtmlAttributes(['target' => '_blank'])
            //     ->displayIf(fn($entity) => $entity->isActif()))
            ->update(Crud::PAGE_INDEX, Action::NEW , function (Action $action) {
                return $action->setIcon('fa fa-newspaper')->setLabel('Nouvel article');
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
        // Chemins d'upload
        // =========================
        $uploadDir = 'public/uploads/articles';
        $basePath = 'uploads/articles';

        // =========================
        // Champs réutilisables
        // =========================
        $id = IdField::new('id')->onlyOnIndex();

        $imageCouverture = ImageField::new('image_couverture', 'Image de couverture')
            ->setBasePath($basePath)
            ->setUploadDir($uploadDir)
            ->setUploadedFileNamePattern('[slug]-[timestamp].[extension]')
            ->setRequired(true )
            ->setHelp('Format recommandé: 1200x630px (ratio 16:9)');

        $autheur = TextField::new('autheur', 'Auteur de l\'article')
            ->setRequired(false)
            ->setHelp('Nom de l\'auteur de l\'article');

        $titre = TextField::new('titre', 'Titre de l\'article')
            ->setRequired(true)
            ->setHelp('Titre principal de l\'article');

        $slug = SlugField::new('slug')
            ->setTargetFieldName('titre')
            ->setUnlockConfirmationMessage('Le slug est généré automatiquement')
            ->setHelp('URL de l\'article');

        $contenu = TextareaField::new('contenu', 'Contenu')
            ->setRequired(true)
            ->setNumOfRows(15)
            ->hideOnIndex()
            ->setHelp('Contenu principal de l\'article (markdown ou HTML supporté)');

        $metaTitre = TextField::new('meto_titre', 'Meta titre (SEO)')
            ->setRequired(false)
            ->hideOnIndex()
            ->setHelp('Titre pour le référencement (50-60 caractères optimaux)');

        $metaDescription = TextareaField::new('meta_description', 'Meta description (SEO)')
            ->setRequired(false)
            ->setNumOfRows(3)
            ->hideOnIndex()
            ->setHelp('Description pour le référencement (150-160 caractères optimaux)');

        $datePublication = DateTimeField::new('date_publication', 'Date de publication')
            ->setFormat('dd/MM/yyyy HH:mm')
            ->setHelp('Date à laquelle l\'article sera publié');

        $actif = BooleanField::new('actif', 'Publié')
            ->renderAsSwitch(true)
            ->setHelp('Article visible sur le site');

        $dateCreation = DateTimeField::new('date_creation', 'Date de création')
            ->setFormat('dd/MM/yyyy HH:mm')
            ->onlyOnIndex()
            ->setFormTypeOption('disabled', 'disabled');

        $categories = AssociationField::new('categories', 'Catégories')
            ->setFormTypeOption('by_reference', false)
            ->setHelp('Catégories associées au circuit')
            ->autocomplete();

        // =========================
        // PAGE INDEX (liste)
        // =========================
        if ($pageName === Crud::PAGE_INDEX) {
            return [
                $id,
                $imageCouverture->setBasePath($basePath)->onlyOnIndex(),
                $titre,
                $datePublication->setFormat('dd/MM/yyyy'),
                $actif,
            ];
        }

        // =========================
        // PAGE NEW (création)
        // =========================
        if ($pageName === Crud::PAGE_NEW) {
            return [
                FormField::addPanel('Contenu principal')->setIcon('fa-file-alt'),
                $autheur,
                $titre,
                $slug,
                $contenu,
                $categories,

                FormField::addPanel('Image de couverture')->setIcon('fa-image'),
                $imageCouverture,

                FormField::addPanel('Publication')->setIcon('fa-calendar'),
                $datePublication->setFormTypeOption('data', new \DateTime()),
                $actif->setFormTypeOption('data', false),

                FormField::addPanel('Référencement (SEO)')->setIcon('fa-search')->collapsible(),
                $metaTitre,
                $metaDescription,
            ];
        }

        // =========================
        // PAGE EDIT (modification)
        // =========================
        if ($pageName === Crud::PAGE_EDIT) {
            return [
                FormField::addPanel('Contenu principal')->setIcon('fa-file-alt'),
                $autheur,
                $titre,
                $slug,
                $contenu,
                $categories,

                FormField::addPanel('Image de couverture')->setIcon('fa-image'),
                $imageCouverture,

                FormField::addPanel('Publication')->setIcon('fa-calendar'),
                $datePublication,
                $actif,

                FormField::addPanel('Référencement (SEO)')->setIcon('fa-search')->collapsible(),
                $metaTitre,
                $metaDescription,

                FormField::addPanel('Informations techniques')->setIcon('fa-history')->collapsible(),
                $dateCreation->setFormTypeOption('disabled', 'disabled'),
            ];
        }

        // =========================
        // PAGE DETAIL (détails)
        // =========================
        return [
            FormField::addPanel('Contenu'),
            $autheur,
            $id,
            $imageCouverture,
            $titre,
            $slug,
            $contenu,
            $categories,

            FormField::addPanel('Publication'),
            $datePublication,
            $actif,

            FormField::addPanel('Référencement'),
            $metaTitre,
            $metaDescription,

            FormField::addPanel('Informations'),
            $dateCreation,
        ];
    }
}
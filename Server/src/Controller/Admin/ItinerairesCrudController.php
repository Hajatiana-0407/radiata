<?php

namespace App\Controller\Admin;

use App\Entity\Itineraires;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Field\{
    IntegerField,
    TextField,
    TextareaField,
    ImageField,
    FormField
};

class ItinerairesCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Itineraires::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            IntegerField::new('ordre', 'Jour')
                ->setFormTypeOption('attr', ['min' => 1])
                ->setHelp('Numéro du jour (Jour 1, Jour 2...)'),

            TextField::new('titre', 'Titre')
                ->setRequired(true),

            TextareaField::new('description', 'Description')
                ->setNumOfRows(3)
                ->setRequired(true),

            ImageField::new('image', 'Image')
                ->setBasePath('uploads/itineraires')
                ->setUploadDir('public/uploads/itineraires')
                ->setUploadedFileNamePattern('[slug]-[timestamp].[extension]')
                ->setRequired(false),
        ];
    }
}
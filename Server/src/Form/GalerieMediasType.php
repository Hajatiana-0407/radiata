<?php

namespace App\Form;

use App\Entity\Circuits;
use App\Entity\GalerieMedias;
use App\Entity\Services;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class GalerieMediasType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('titre')
            ->add('description')
            ->add('nom_ficher')
            ->add('chemin_fichier')
            ->add('type_media')
            ->add('tags')
            ->add('ordre_affichage')
            ->add('date_upload')
            ->add('actif')
            ->add('circuit', EntityType::class, [
                'class' => Circuits::class,
                'choice_label' => 'id',
            ])
            ->add('service', EntityType::class, [
                'class' => Services::class,
                'choice_label' => 'id',
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => GalerieMedias::class,
        ]);
    }
}

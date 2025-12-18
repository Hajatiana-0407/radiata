<?php

namespace App\Form;

use App\Entity\Categories;
use App\Entity\Circuits;
use App\Entity\Devis;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class CircuitsType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('titre')
            ->add('image')
            ->add('slug')
            ->add('description')
            ->add('meto_titre')
            ->add('meta_description')
            ->add('duree_jours')
            ->add('prix_base')
            ->add('difficulte')
            ->add('score_ecotourisme')
            ->add('actif')
            ->add('date_creation')
            ->add('circuits', EntityType::class, [
                'class' => Circuits::class,
                'choice_label' => 'id',
                'multiple' => true,
            ])
            ->add('devis', EntityType::class, [
                'class' => Devis::class,
                'choice_label' => 'id',
                'multiple' => true,
            ])
            ->add('categories', EntityType::class, [
                'class' => Categories::class,
                'choice_label' => 'id',
                'multiple' => true,
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Circuits::class,
        ]);
    }
}

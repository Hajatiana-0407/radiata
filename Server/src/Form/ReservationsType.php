<?php

namespace App\Form;

use App\Entity\Circuits;
use App\Entity\Clients;
use App\Entity\Reservations;
use App\Entity\Services;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ReservationsType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('date_debut')
            ->add('date_fin')
            ->add('nombre_adultes')
            ->add('nombre_enfants')
            ->add('nombre_bebes')
            ->add('statut')
            ->add('date_creation')
            ->add('circuit', EntityType::class, [
                'class' => Circuits::class,
                'choice_label' => 'id',
            ])
            ->add('Services', EntityType::class, [
                'class' => Services::class,
                'choice_label' => 'id',
                'multiple' => true,
            ])
            ->add('client', EntityType::class, [
                'class' => Clients::class,
                'choice_label' => 'id',
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Reservations::class,
        ]);
    }
}

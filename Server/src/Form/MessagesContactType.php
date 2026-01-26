<?php

namespace App\Form;

use App\Entity\Clients;
use App\Entity\MessagesContact;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class MessagesContactType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('nom')
            ->add('email')
            ->add('telephone')
            ->add('sujet')
            ->add('message')
            ->add('date_envoi')
            ->add('statut')
            ->add('client', EntityType::class, [
                'class' => Clients::class,
                'choice_label' => 'id',
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => MessagesContact::class,
        ]);
    }
}

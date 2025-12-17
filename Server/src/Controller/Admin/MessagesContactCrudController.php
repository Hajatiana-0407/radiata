<?php

namespace App\Controller\Admin;

use App\Entity\MessagesContact;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Field\{
    IdField,
    TextField,
    EmailField,
    TextareaField,
    DateTimeField,
    ChoiceField,
    AssociationField,
    FormField
};

class MessagesContactCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return MessagesContact::class;
    }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setEntityLabelInSingular('Message')
            ->setEntityLabelInPlural('Messages')
            ->setDefaultSort(['date_envoi' => 'DESC'])
            ->setSearchFields(['nom', 'email', 'telephone', 'message'])
            ->setPaginatorPageSize(20)
            ->showEntityActionsInlined()
            ->setHelp('index', 'Gestion des messages du formulaire de contact');
    }

    public function configureActions(Actions $actions): Actions
    {
        return $actions
            ->add(Crud::PAGE_INDEX, Action::DETAIL)
            ->add(Crud::PAGE_EDIT, Action::SAVE_AND_ADD_ANOTHER)
            // ->add(Crud::PAGE_INDEX, Action::new('markAsRead', 'Marquer comme lu', 'fa fa-envelope-open')
            //     ->linkToCrudAction('markAsRead')
            //     ->displayIf(fn($entity) => $entity->getStatut() === 'nouveau'))
            ->add(Crud::PAGE_INDEX, Action::new('reply', 'Répondre', 'fa fa-reply')
                ->linkToUrl(function (MessagesContact $message) {
                    return 'mailto:' . $message->getEmail() . '?subject=Re: Votre message - ' . $message->getNom();
                })
                ->setHtmlAttributes(['target' => '_blank']))
            ->update(Crud::PAGE_INDEX, Action::NEW , function (Action $action) {
                return $action->setIcon('fa fa-envelope')->setLabel('Nouveau message');
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

        $client = AssociationField::new('client', 'Client associé')
            ->setRequired(false)
            ->renderAsNativeWidget() // Évite l'erreur t20.id
            ->setHelp('Si le message provient d\'un client existant');

        $nom = TextField::new('nom', 'Nom complet')
            ->setRequired(true)
            ->setHelp('Nom de l\'expéditeur');

        $email = EmailField::new('email', 'Email')
            ->setRequired(true)
            ->setHelp('Adresse email de contact');

        $telephone = TextField::new('telephone', 'Téléphone')
            ->setRequired(false)
            ->setHelp('Numéro de téléphone');

        $message = TextareaField::new('message', 'Message')
            ->setRequired(true)
            ->setNumOfRows(6)
            ->hideOnIndex()
            ->setHelp('Contenu du message');

        $dateEnvoi = DateTimeField::new('date_envoi', 'Date d\'envoi')
            ->setFormat('dd/MM/yyyy HH:mm')
            ->setFormTypeOption('disabled', 'disabled')
            ->setHelp('Date à laquelle le message a été envoyé');

        $statut = ChoiceField::new('statut', 'Statut')
            ->setChoices([
                '🆕 Nouveau' => 'nouveau',
                '📖 Lu' => 'lu',
                '📧 Répondu' => 'repondu',
                '📁 Archivé' => 'archive',
                '🗑️ Supprimé' => 'supprime',
                '🚫 Spam' => 'spam'
            ])
            ->renderAsBadges([
                'nouveau' => 'warning',
                'lu' => 'info',
                'repondu' => 'success',
                'archive' => 'secondary',
                'supprime' => 'danger',
                'spam' => 'dark'
            ])
            ->setHelp('Statut du message');

        // =========================
        // PAGE INDEX (liste)
        // =========================
        if ($pageName === Crud::PAGE_INDEX) {
            return [
                $id,
                $nom,
                $email,
                $telephone,
                $dateEnvoi->setFormat('dd/MM/yyyy HH:mm'),
                $statut,
            ];
        }

        // =========================
        // PAGE NEW (création)
        // =========================
        if ($pageName === Crud::PAGE_NEW) {
            return [
                FormField::addPanel('Expéditeur')->setIcon('fa-user'),
                $client,
                $nom,
                $email,
                $telephone,

                FormField::addPanel('Message')->setIcon('fa-envelope'),
                $message,

                FormField::addPanel('Statut')->setIcon('fa-flag'),
                $statut->setFormTypeOption('data', 'nouveau'),

                FormField::addPanel('Informations techniques')->setIcon('fa-info-circle'),
                $dateEnvoi->setFormTypeOption('data', new \DateTime()),
            ];
        }

        // =========================
        // PAGE EDIT (modification)
        // =========================
        if ($pageName === Crud::PAGE_EDIT) {
            return [
                FormField::addPanel('Expéditeur')->setIcon('fa-user'),
                $client,
                $nom,
                $email,
                $telephone,

                FormField::addPanel('Message')->setIcon('fa-envelope'),
                $message,

                FormField::addPanel('Statut')->setIcon('fa-flag'),
                $statut,

                FormField::addPanel('Informations techniques')->setIcon('fa-info-circle'),
                $dateEnvoi->setFormTypeOption('disabled', 'disabled'),
            ];
        }

        // =========================
        // PAGE DETAIL (détails)
        // =========================
        return [
            FormField::addPanel('Informations expéditeur'),
            $id,
            $client,
            $nom,
            $email,
            $telephone,

            FormField::addPanel('Message'),
            $message,

            FormField::addPanel('Statut'),
            $statut,

            FormField::addPanel('Informations techniques'),
            $dateEnvoi,
        ];
    }

    // Action pour marquer comme lu
    // public function markAsRead(MessagesContact $message)
    // {
    //     $message->setStatut('lu');
    //     $this->getDoctrine()->getManager()->flush();

    //     $this->addFlash('success', 'Message marqué comme lu');

    //     return $this->redirectToRoute('admin', [
    //         'crudAction' => 'index',
    //         'crudControllerFqcn' => self::class,
    //     ]);
    // }
}
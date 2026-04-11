<?php

namespace App\Controller\Admin;

use App\Entity\Devis;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Field\{
    IdField,
    TextField,
    EmailField,
    IntegerField,
    NumberField,
    ChoiceField,
    DateTimeField,
    AssociationField,
    FormField,
    TextareaField
};

class DevisCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Devis::class;
    }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setEntityLabelInSingular('Devis')
            ->setEntityLabelInPlural('Devis')
            ->setDefaultSort(['date_creation' => 'DESC'])
            ->setSearchFields(['reference_devis', 'nom_client', 'email', 'telephone'])
            ->setPaginatorPageSize(20)
            ->showEntityActionsInlined()
            ->setHelp('index', 'Gestion des demandes de devis clients')
            ->setFormOptions(
                ['csrf_protection' => false],
                ['csrf_protection' => false]
            );
    }

    public function configureActions(Actions $actions): Actions
    {
        // Action personnalisée : convertir un devis accepté en réservation
        $convertAction = Action::new('convertToReservation', 'Convertir en réservation', 'fa fa-exchange-alt')
            ->linkToRoute('admin_devis_convert', function (Devis $devis): array {
                return ['id' => $devis->getId()];
            })
            ->addCssClass('btn btn-success btn-sm')
            ->displayIf(fn(Devis $entity) => $entity->getStatut() === 'accepte');
;

        return $actions
            ->add(Crud::PAGE_INDEX, Action::DETAIL)
            ->add(Crud::PAGE_INDEX, $convertAction)
            ->add(Crud::PAGE_DETAIL, $convertAction)
            ->add(Crud::PAGE_EDIT, Action::SAVE_AND_ADD_ANOTHER)
            ->update(Crud::PAGE_INDEX, Action::NEW , function (Action $action) {
                return $action->setIcon('fa fa-file-contract')->setLabel('Nouveau devis');
            })
            ->update(Crud::PAGE_INDEX, Action::EDIT, function (Action $action) {
                return $action->setIcon('fa fa-edit')->setLabel('')->setHtmlAttributes(['title' => 'Modifier']);
            })
            ->update(Crud::PAGE_INDEX, Action::DELETE, function (Action $action) {
                return $action->setIcon('fa fa-trash')->setLabel('')->setHtmlAttributes(['title' => 'Supprimer'])
                    ->displayIf(fn(Devis $entity) => in_array($entity->getStatut(), ['en_attente', 'refuse']));
            })
            ->update(Crud::PAGE_INDEX, Action::DETAIL, function (Action $action) {
                return $action->setIcon('fa fa-eye')->setLabel('')->setHtmlAttributes(['title' => 'Voir le détail']);
            });
    }

    public function configureFields(string $pageName): iterable
    {
        // -------------------------------------------------------
        // Référence
        // -------------------------------------------------------
        $referenceDevis = TextField::new('reference_devis', 'Référence')
            ->setRequired(true)
            ->setHelp('Référence unique du devis (auto-générée)')
            ->setFormTypeOption('attr', ['placeholder' => 'DEV-YYYYMMDD-XXXXXX', 'readonly' => true]);

        // -------------------------------------------------------
        // Client
        // -------------------------------------------------------
        $client = AssociationField::new('client', 'Client lié')
            ->setRequired(false)
            ->autocomplete()
            ->setHelp('Lier à un client existant (optionnel si renseigné manuellement)');

        $nomClient = TextField::new('nom_client', 'Nom complet')
            ->setRequired(false)
            ->setHelp('Nom complet du client (si non lié à un compte)');

        $email = EmailField::new('email', 'Email')
            ->setRequired(false)
            ->setHelp('Adresse email de contact');

        $telephone = TextField::new('telephone', 'Téléphone')
            ->setRequired(false)
            ->setHelp('Numéro de téléphone');

        // -------------------------------------------------------
        // Participants
        // -------------------------------------------------------
        $adultes = IntegerField::new('nombres_adultes', 'Adultes')
            ->setHelp('Nombre d\'adultes (12 ans et +)')
            ->setFormTypeOption('attr', ['min' => 0]);

        $enfants = IntegerField::new('nombre_enfants', 'Enfants')
            ->setHelp('Nombre d\'enfants (2 à 11 ans)')
            ->setFormTypeOption('attr', ['min' => 0]);

        $bebes = IntegerField::new('nombre_bebes', 'Bébés')
            ->setHelp('Nombre de bébés (moins de 2 ans)')
            ->setFormTypeOption('attr', ['min' => 0]);

        // Champ calculé pour l'index : total participants
        $totalParticipants = TextField::new('totalParticipants', 'Participants')
            ->formatValue(function ($value, Devis $entity) {
                $adultes = $entity->getNombresAdultes() ?? 0;
                $enfants = $entity->getNombreEnfants() ?? 0;
                $bebes = $entity->getNombreBebes() ?? 0;
                $total = $adultes + $enfants + $bebes;
                $details = [];
                if ($adultes)
                    $details[] = "{$adultes} adulte" . ($adultes > 1 ? 's' : '');
                if ($enfants)
                    $details[] = "{$enfants} enfant" . ($enfants > 1 ? 's' : '');
                if ($bebes)
                    $details[] = "{$bebes} bébé" . ($bebes > 1 ? 's' : '');
                return "<span title=\"" . implode(', ', $details) . "\">👥 {$total}</span>";
            })
            ->renderAsHtml()
            ->onlyOnIndex();

        // -------------------------------------------------------
        // Statut
        // -------------------------------------------------------
        $statut = ChoiceField::new('statut', 'Statut')
            ->setChoices([
                '⏳ En attente' => 'en_attente',
                '🔄 En cours' => 'en_cours',
                '✅ Accepté' => 'accepte',
                '❌ Refusé' => 'refuse',
                '📄 Devis envoyé' => 'devis_envoye',
                '💰 Facturé' => 'facture',
                '🏁 Terminé' => 'termine',
            ])
            ->renderAsBadges([
                'en_attente' => 'warning',
                'en_cours' => 'info',
                'accepte' => 'success',
                'refuse' => 'danger',
                'devis_envoye' => 'primary',
                'facture' => 'secondary',
                'termine' => 'dark',
            ])
            ->setHelp('Statut actuel du devis');

        // -------------------------------------------------------
        // Dates
        // -------------------------------------------------------
        $datesSouhaitees = DateTimeField::new('dates_souhaitees', 'Dates souhaitées')
            ->setFormat('dd/MM/yyyy')
            ->setRequired(true)
            ->setHelp('Date de départ souhaitée pour le circuit');

        $dateCreation = DateTimeField::new('date_creation', 'Date de demande')
            ->setFormat('dd/MM/yyyy HH:mm')
            ->setFormTypeOption('disabled', 'disabled');

        // -------------------------------------------------------
        // Prestations
        // -------------------------------------------------------
        $circuits = AssociationField::new('circuits', 'Circuits')
            ->setFormTypeOption('by_reference', false)
            ->autocomplete()
            ->setRequired(true ) 
            ->setHelp('Circuits sélectionnés par le client');

        $services = AssociationField::new('services', 'Services additionnels')
            ->setFormTypeOption('by_reference', false)
            ->autocomplete()
            ->setHelp('Services supplémentaires demandés');


        // =========================
        // PAGE INDEX (liste)
        // =========================
        if ($pageName === Crud::PAGE_INDEX) {
            return [
                $referenceDevis,
                // Affichage consolidé : nom du client lié ou nom manuel
                TextField::new('nom_client', 'Client')
                    ->formatValue(function ($value, Devis $entity) {
                        $nom = $value;
                        if (!$nom && $entity->getClient()) {
                            $c = $entity->getClient();
                            $nom = trim($c->getPrenom() . ' ' . $c->getNom());
                        }
                        return $nom ?: '<em class="text-muted">—</em>';
                    })
                    ->renderAsHtml(),
                $email,
                // Circuits : liste compacte
                AssociationField::new('circuits', 'Circuit(s)')
                    ->formatValue(function ($value, Devis $entity) {
                        $circuits = $entity->getCircuits();
                        if ($circuits->isEmpty())
                            return '<em class="text-muted">—</em>';
                        $items = [];
                        foreach ($circuits as $c) {
                            $items[] = '<span class="badge badge-light border">' . htmlspecialchars($c->getTitre()) . '</span>';
                        }
                        return implode(' ', $items);
                    })
                    ->renderAsHtml(),
                $totalParticipants,
                $datesSouhaitees,
                $statut,
                $dateCreation->onlyOnIndex(),
            ];
        }

        // =========================
        // PAGE NEW (création)
        // =========================
        if ($pageName === Crud::PAGE_NEW) {
            return [
                FormField::addPanel('Informations client')->setIcon('fa-user'),
                $client,
                $referenceDevis->setFormTypeOption('data', $this->generateReference()),
                $nomClient,
                $email,
                $telephone,

                FormField::addPanel('Participants')->setIcon('fa-users'),
                $adultes->setFormTypeOption('data', 1),
                $enfants->setFormTypeOption('data', 0),
                $bebes->setFormTypeOption('data', 0),

                FormField::addPanel('Dates souhaitées')->setIcon('fa-calendar-alt'),
                $datesSouhaitees->setFormTypeOption('data', new \DateTime('+1 week')),

                FormField::addPanel('Prestations')->setIcon('fa-route'),
                $circuits,
                $services,

                FormField::addPanel('Statut & Remarques')->setIcon('fa-flag'),
                $statut->setFormTypeOption('data', 'en_attente'),
            ];
        }

        // =========================
        // PAGE EDIT (modification)
        // =========================
        if ($pageName === Crud::PAGE_EDIT) {
            return [
                FormField::addPanel('Informations client')->setIcon('fa-user'),
                $client,
                $referenceDevis->setFormTypeOption('disabled', 'disabled'),
                $nomClient,
                $email,
                $telephone,

                FormField::addPanel('Participants')->setIcon('fa-users'),
                $adultes,
                $enfants,
                $bebes,

                FormField::addPanel('Dates souhaitées')->setIcon('fa-calendar-alt'),
                $datesSouhaitees,

                FormField::addPanel('Prestations')->setIcon('fa-route'),
                $circuits,
                $services,

                FormField::addPanel('Statut & Remarques')->setIcon('fa-flag'),
                $statut,

                FormField::addPanel('Informations techniques')->setIcon('fa-history')->collapsible(),
                $dateCreation,
            ];
        }

        // =========================
        // PAGE DETAIL
        // =========================
        return [
            FormField::addPanel('Identification')->setIcon('fa-file-contract'),
            $referenceDevis,
            $dateCreation,
            $statut,

            FormField::addPanel('Client')->setIcon('fa-user'),
            $client,
            $nomClient,
            $email,
            $telephone,

            FormField::addPanel('Participants')->setIcon('fa-users'),
            $adultes,
            $enfants,
            $bebes,

            FormField::addPanel('Dates souhaitées')->setIcon('fa-calendar-alt'),
            $datesSouhaitees,

            FormField::addPanel('Prestations demandées')->setIcon('fa-route'),
            $circuits,
            $services,
        ];
    }

    /**
     * Génère une référence unique pour le devis.
     * Format : DEV-YYYYMMDD-XXXXXX (hex aléatoire en majuscules)
     */
    private function generateReference(): string
    {
        return sprintf('DEV-%s-%s', date('Ymd'), strtoupper(bin2hex(random_bytes(3))));
    }
}
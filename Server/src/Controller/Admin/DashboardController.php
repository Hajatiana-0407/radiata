<?php

namespace App\Controller\Admin;

use App\Entity\Articles;
use App\Entity\Categories;
use App\Entity\Circuits;
use App\Entity\Clients;
use App\Entity\Devis;
use App\Entity\GalerieMedias;
use App\Entity\MessagesContact;
use App\Entity\Reservations;
use App\Entity\Services;
use EasyCorp\Bundle\EasyAdminBundle\Attribute\AdminDashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\Assets;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ColorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Router\AdminUrlGenerator;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Response;

#[AdminDashboard(routePath: '/admin', routeName: 'admin')]
class DashboardController extends AbstractDashboardController
{

    public function __construct(private RequestStack $requestStack)
    {
    }
    public function index(): Response
    {

        $adminUrlGenerator = $this->container->get(AdminUrlGenerator::class);

        return $this->redirect(
            $adminUrlGenerator
                ->setController(ArticlesCrudController::class)
                ->generateUrl()
        );

        // Option 1. You can make your dashboard redirect to some common page of your backend
        //
        // 1.1) If you have enabled the "pretty URLs" feature:
        // return $this->redirectToRoute('admin_user_index');
        //
        // 1.2) Same example but using the "ugly URLs" that were used in previous EasyAdmin versions:
        // $adminUrlGenerator = $this->container->get(AdminUrlGenerator::class);
        // return $this->redirect($adminUrlGenerator->setController(OneOfYourCrudController::class)->generateUrl());

        // Option 2. You can make your dashboard redirect to different pages depending on the user
        //
        // if ('jane' === $this->getUser()->getUsername()) {
        //     return $this->redirectToRoute('...');
        // }

        // Option 3. You can render some custom template to display a proper dashboard with widgets, etc.
        // (tip: it's easier if your template extends from @EasyAdmin/page/content.html.twig)
        //
        // return $this->render('some/path/my-dashboard.html.twig');
    }

    public function configureDashboard(): Dashboard
    {
        $request = $this->requestStack->getCurrentRequest();
        $baseUrl = $request?->getSchemeAndHttpHost() ?? '';
        return Dashboard::new()
            ->setTitle('<img src="' . $baseUrl . '/image/logo-no-bg.png" classe="__admin_logo" style="max-height: 150px;">')
            ->setLocales([
                // 'fr' => '🇫🇷 Français',
                'en' => '🇬🇧 English'
            ]);

        ;
    }

    public function configureMenuItems(): iterable
    {
        yield MenuItem::linkToDashboard('Dashboard', 'fa fa-home');

        // ---------- Catalogue -------- //
        yield MenuItem::section('Catalogue');
        yield MenuItem::linkToCrud('Services', 'fa fa-concierge-bell', Services::class);
        yield MenuItem::linkToCrud('Catégories', 'fa fa-tags', Categories::class);
        yield MenuItem::linkToCrud('Circuits', 'fa fa-route', Circuits::class);

        yield MenuItem::section('Contenu');
        yield MenuItem::linkToCrud('Articles', 'fa fa-newspaper', Articles::class);
        yield MenuItem::linkToCrud('Galerie', 'fa fa-image', GalerieMedias::class);

        yield MenuItem::section('Clients');
        yield MenuItem::linkToCrud('Liste des clients', 'fa fa-list', Clients::class);
        yield MenuItem::linkToCrud('Devis', 'fa fa-file-invoice', Devis::class);
        yield MenuItem::linkToCrud('Réservation', 'fa fa-calendar-check', Reservations::class);
        yield MenuItem::linkToCrud('Messages', 'fa fa-message', MessagesContact::class);

        return [
            MenuItem::linkToUrl('Visit public website', null, '/'),
            MenuItem::linkToUrl('Search in Google', 'fab fa-google', 'https://google.com'),
            // ...
        ];
    }

    public function configureAssets(): Assets
    {
        return Assets::new()->addCssFile('administration/admin.css');
    }

}
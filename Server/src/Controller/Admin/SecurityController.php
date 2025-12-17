<?php

namespace App\Controller\Admin;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class SecurityController extends AbstractController
{
    #[Route('/admin/login', name: 'admin_login')]
    public function login(AuthenticationUtils $authenticationUtils): Response
    {
        // Si l'utilisateur est déjà connecté, rediriger vers le dashboard
        if ($this->getUser()) {
            return $this->redirectToRoute('admin');
        }

        // Récupérer l'erreur de connexion s'il y en a une
        $error = $authenticationUtils->getLastAuthenticationError();
        
        // Dernier nom d'utilisateur saisi
        $lastUsername = $authenticationUtils->getLastUsername();

        return $this->render('admin/security/login.html.twig', [
            'last_username' => $lastUsername,
            'error' => $error,
            'page_title' => 'Connexion Administrateur',
            'favicon_path' => '/favicon.ico',
            'site_name' => 'Administration'
        ]);
    }

    #[Route('/admin/logout', name: 'admin_logout')]
    public function logout(): void
    {
        // Le logout est géré par le firewall
        throw new \LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');
    }
}
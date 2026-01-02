<?php

namespace App\Controller\Admin;

use App\Entity\Users;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;

class MyProfileController extends AbstractController
{
    #[Route('/admin/mon-profil', name: 'admin_my_profile')]
    public function editProfile(
        Request $request,
        EntityManagerInterface $entityManager,
        UserPasswordHasherInterface $passwordHasher,
        Security $security
    ): Response {
        /** @var Users $user */
        $user = $security->getUser();
        
        if (!$user) {
            return $this->redirectToRoute('admin_login');
        }
        
        if ($request->isMethod('POST')) {
            $currentPassword = $request->request->get('current_password');
            $email = $request->request->get('email');
            $newPassword = $request->request->get('new_password');
            $confirmPassword = $request->request->get('confirm_password');
            
            // Validation
            $errors = [];
            
            if (!$passwordHasher->isPasswordValid($user, $currentPassword)) {
                $errors[] = 'Mot de passe actuel incorrect.';
            }
            
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $errors[] = 'Adresse email invalide.';
            }
            
            if (!empty($newPassword)) {
                if ($newPassword !== $confirmPassword) {
                    $errors[] = 'Les nouveaux mots de passe ne correspondent pas.';
                }
                
                if (strlen($newPassword) < 6) {
                    $errors[] = 'Le mot de passe doit contenir au moins 6 caractères.';
                }
            }
            
            if (empty($errors)) {
                // Mettre à jour
                $user->setEmail($email);
                
                if (!empty($newPassword)) {
                    $user->setPassword($passwordHasher->hashPassword($user, $newPassword));
                    $this->addFlash('success', 'Email et mot de passe modifiés avec succès.');
                } else {
                    $this->addFlash('success', 'Email modifié avec succès.');
                }
                
                $entityManager->flush();
                
                return $this->redirectToRoute('admin');
            } else {
                foreach ($errors as $error) {
                    $this->addFlash('error', $error);
                }
            }
        }
        
        return $this->render('admin/profile/simple_form.html.twig', [
            'user' => $user,
        ]);
    }
}
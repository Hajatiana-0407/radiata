<?php

namespace App\Controller;

use App\Entity\MessagesContact;
use App\Form\MessagesContactType;
use App\Repository\MessagesContactRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/messages/contact')]
final class MessagesContactController extends AbstractController
{
    #[Route(name: 'app_messages_contact_index', methods: ['GET'])]
    public function index(MessagesContactRepository $messagesContactRepository): Response
    {
        return $this->render('messages_contact/index.html.twig', [
            'messages_contacts' => $messagesContactRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_messages_contact_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        //  Vérification du Content-Type
        if ($request->headers->get('Content-Type') !== 'application/json') {
            return new JsonResponse([
                'error' => 'Content-Type must be application/json'
            ], Response::HTTP_UNSUPPORTED_MEDIA_TYPE);
        }

        //  Désérialisation et validation
        $data = json_decode($request->getContent(), true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            return new JsonResponse([
                'error' => 'JSON invalide'
            ], Response::HTTP_BAD_REQUEST);
        }

        $messageContact = new MessagesContact();
        $messageContact->setNom($data['name'] ?? '');
        $messageContact->setEmail($data['email'] ?? '');
        $messageContact->setTelephone($data['phone'] ?? "");
        $messageContact->setSujet($data['subject'] ?? '');
        $messageContact->setMessage($data['message'] ?? '');
        $messageContact->setStatut('nouveau');

        $entityManager->persist($messageContact);
        $entityManager->flush();

        // Réponse réussie
        return new JsonResponse([
            'success' => true,
            'message' => 'Message contact créé avec succès',
            'messageContactId' => $messageContact->getId(),
        ], status: Response::HTTP_CREATED);



    }
}

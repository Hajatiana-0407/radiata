<?php

namespace App\Controller;

use App\Entity\Clients;
use App\Entity\Reservations;
use App\Form\ReservationsType;
use App\Repository\CircuitsRepository;
use App\Repository\ReservationsRepository;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/reservations')]
final class ReservationsController extends AbstractController
{

    public function __construct(
        private LoggerInterface $logger
    ) {
    }

    #[Route(name: 'app_reservations_index', methods: ['GET'])]
    public function index(ReservationsRepository $reservationsRepository): Response
    {
        return $this->render('reservations/index.html.twig', [
            'reservations' => $reservationsRepository->findAll(),
        ]);
    }

    // #[Route('/new', name: 'app_reservations_new', methods: ['GET', 'POST'])]
    // public function new(Request $request, EntityManagerInterface $entityManager): Response
    // {
    //     $reservation = new Reservations();
    //     $form = $this->createForm(ReservationsType::class, $reservation);
    //     $form->handleRequest($request);

    //     if ($form->isSubmitted() && $form->isValid()) {
    //         $entityManager->persist($reservation);
    //         $entityManager->flush();

    //         return $this->redirectToRoute('app_reservations_index', [], Response::HTTP_SEE_OTHER);
    //     }

    //     return $this->render('reservations/new.html.twig', [
    //         'reservation' => $reservation,
    //         'form' => $form,
    //     ]);
    // }


    #[Route('/new', name: 'app_reservations_new', methods: ['POST'])]
    public function new(
        Request $request,
        EntityManagerInterface $entityManager,
        CircuitsRepository $circuitsRepository
    ): Response {

        //  Vérification du Content-Type
        if ($request->headers->get('Content-Type') !== 'application/json') {
            return new JsonResponse([
                'error' => 'Content-Type must be application/json'
            ], Response::HTTP_UNSUPPORTED_MEDIA_TYPE);
        }

        try {
            //  Désérialisation et validation
            $data = json_decode($request->getContent(), true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                return new JsonResponse([
                    'error' => 'JSON invalide'
                ], Response::HTTP_BAD_REQUEST);
            }

            //  Validation métier supplémentaire
            $startDate = new \DateTime($data['startDate']);
            $endDate = new \DateTime($data['endDate']);

            if ($endDate <= $startDate) {
                return new JsonResponse([
                    'error' => 'La date de départ doit être après la date d\'arrivée'
                ], Response::HTTP_BAD_REQUEST);
            }

            $circuit = null;
            if ($data['destinationId']) {
                $circuit = $circuitsRepository->find($data['destinationId']);
            }

            // Creation de l'etité Client 
            $client = new Clients();
            $client->setNom($data['firstName']);
            $client->setPrenom($data['lastName']);
            $client->setEmail($data['email']);
            $client->setTelephone($data['phone']);
            $client->setMotDePasse('password');
            $client->setAdresse($data['adresse']);
            $entityManager->persist($client);
            $entityManager->flush();

            //  Création de l'entité Reservation 
            $reservation = new Reservations();
            $reservation->setNombreAdultes($data['adultes']);
            $reservation->setNombreEnfants($data['enfants']);
            $reservation->setNombreBebes($data['bebes']);
            $reservation->setDateDebut($startDate);
            $reservation->setDateFin($endDate);
            $reservation->setCircuit($circuit);
            $reservation->setStatut(0);
            $reservation->setHebergement($data['accommodationType']);
            $reservation->setClient($client);


            // 8. Persistance
            $entityManager->persist($reservation);
            $entityManager->flush();


            // 10. Réponse réussie
            return new JsonResponse([
                'success' => true,
                'message' => 'Réservation créée avec succès',
                'reservationId' => $reservation->getId(),
            ], status: Response::HTTP_CREATED);

        } catch (\Exception $e) {
            // 11. Gestion des erreurs
            $this->logger->error('Erreur lors de la création de la réservation', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'ip' => $request->getClientIp()
            ]);

            return new JsonResponse([
                'error' => 'Une erreur est survenue lors de la création de la réservation'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}

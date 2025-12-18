<?php

namespace App\Controller;

use App\Entity\Circuits;
use App\Form\CircuitsType;
use App\Repository\CircuitsRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/circuits')]
final class CircuitsController extends AbstractController
{
    #[Route('/', name: 'app_circuits_index', methods: ['GET'])]
    public function index(
        Request $request,
        CircuitsRepository $circuitsRepository,
    ): Response {
        // Récupération des paramètres de requête
        $page = $request->query->getInt('page', 1);
        $search = $request->query->get('search', '');
        $difficulty = $request->query->get('difficulty', '');
        $minPrice = $request->query->getInt('minPrice', 0);
        $maxPrice = $request->query->getInt('maxPrice', 10000);
        $popularOnly = $request->query->getBoolean('popularOnly', false);

        // Récupération des données paginées
        $paginator = $circuitsRepository->findCircuitsPaginated(
            $search,
            $difficulty,
            $minPrice,
            $maxPrice,
            $page,
            10
        );

        // Construction de la réponse
        $circuitsArray = [];
        foreach ($paginator['data'] as $circuit) {
            $circuitsArray[] = [
                'id' => $circuit->getId(),
                'title' => $circuit->getTitre(),
                'description' => $circuit->getDescription(),
                'image' => $circuit->getImage(),
                'price' => $circuit->getPrixBase(),
                'difficulty' => $circuit->getDifficulte(),
                'duration' => $circuit->getDureeJours(),
                'slug' => $circuit->getSlug(),
                'ecotourism_score' => $circuit->getScoreEcotourisme(),
                'createdAt' => $circuit->getDateCreation()?->format('Y-m-d H:i:s'),
                'active' => $circuit->isActif(),
                'location' => $circuit->getLocalisation(),
                'isPopular' => $circuit->isPopulare(),
            ];
        }

        $response = [
            'success' => true,
            'message' => 'Liste des circuits récupérée avec succès',
            'data' => $circuitsArray,
            'pagination' => [
                'currentPage' => $page,
                'totalItems' => $paginator['total'],
                'totalPages' => $paginator['totalPages'],
            ],
        ];

        return $this->json($response);
    }

    #[Route('/new', name: 'app_circuits_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $circuit = new Circuits();
        $form = $this->createForm(CircuitsType::class, $circuit);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($circuit);
            $entityManager->flush();

            return $this->redirectToRoute('app_circuits_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('circuits/new.html.twig', [
            'circuit' => $circuit,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_circuits_show', methods: ['GET'])]
    public function show(Circuits $circuit): Response
    {
        return $this->render('circuits/show.html.twig', [
            'circuit' => $circuit,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_circuits_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Circuits $circuit, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(CircuitsType::class, $circuit);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_circuits_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('circuits/edit.html.twig', [
            'circuit' => $circuit,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_circuits_delete', methods: ['POST'])]
    public function delete(Request $request, Circuits $circuit, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete' . $circuit->getId(), $request->getPayload()->getString('_token'))) {
            $entityManager->remove($circuit);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_circuits_index', [], Response::HTTP_SEE_OTHER);
    }
}

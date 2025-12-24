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
    public function index(Request $request, CircuitsRepository $circuitsRepository, ): Response
    {
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
                'page' => $page,
                'total' => $paginator['total'],
                'totalPages' => $paginator['totalPages'],
            ],
        ];

        return $this->json($response);
    }


    #[Route('/popular', name: 'app_circuits_popular', methods: ['GET'])]
    public function popular(
        Request $request,
        CircuitsRepository $circuitsRepository,
    ): Response {
        // Récupération des paramètres de requête
        $page = $request->query->getInt('page', 1);

        // Récupération des données paginées
        $paginator = $circuitsRepository->findPopularCircuitsPaginated(
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
                'page' => $page,
                'total' => $paginator['total'],
                'totalPages' => $paginator['totalPages'],
            ],
        ];

        return $this->json($response);
    }

    #[Route('/{slug}', name: 'app_circuits_show', methods: ['GET'])]
    public function show(Circuits $circuit): Response
    {
        $servicesIncluded = $circuit->getServices()->toArray();

        $circuitData = [
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
            'group_size' => [
                'min' => $circuit->getRange()->getMin(),
                'max' => $circuit->getRange()->getMax(),
            ],
            'conservation_contribution' => $circuit->getConservationContribution(),
            'highlights' => $circuit->getPointFort(),
            'sustainability_features' => $circuit->getActionsDurables(),
            'recommended_season' => $circuit->getPeriode(),
            'included_services' => array_map(function ( $servicesIncluded ) { return [
                'name' => $servicesIncluded->getNom() ,
                'description' =>  $servicesIncluded->getDescription(), 
                'id' => $servicesIncluded->getId() 
            ] ; 
         }, $servicesIncluded),
        ];

        $response = [
            'success' => true,
            'message' => 'Détails du circuit récupérés avec succès',
            'data' => $circuitData,
        ];

        return $this->json($response);
    }
}

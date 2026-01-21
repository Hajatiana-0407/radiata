<?php

namespace App\Controller;

use App\Entity\GalerieMedias;
use App\Form\GalerieMediasType;
use App\Repository\GalerieMediasRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/galerie/medias')]
final class GalerieMediasController extends AbstractController
{
    #[Route(name: 'app_galerie_medias_index', methods: ['GET'])]
    public function index(GalerieMediasRepository $galerieMediasRepository, Request $request): Response
    {
        $page = $request->query->getInt('page', 1);
        $search = $request->query->getString('search', '');
        $categorie_id = $request->query->getInt('categorie', 0);


        $galeriesMedias = $galerieMediasRepository->getGallerieMediasByCategorie($categorie_id, $search, $page, 10);

        $galeriesMediasArray = [];
        foreach ($galeriesMedias['data'] as $key => $galerie) {
            $galeriesMediasArray[] = [
                'title' => $galerie->getTitre(),
                'file' => $galerie->getFichier(),
                'description' => $galerie->getDescription(),
                'date' => $galerie->getDateUpload()?->format('Y-m-d H:i:s'),
                'tags' => $galerie->getTags(),
                'categories' => array_map(fn($cat) => $cat->getNom(), $galerie->getCategories()->toArray()),
            ];
        }


        $response = [
            'success' => true,
            'message' => 'Liste des circuits récupérée avec succès',
            'data' => $galeriesMediasArray,
            'pagination' => [
                'page' => $page,
                'total' => $galeriesMedias['total'],
                'totalPages' => $galeriesMedias['totalPages'],
            ],
        ];
        return $this->json($response);
    }
}

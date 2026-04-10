<?php

namespace App\Controller;

use App\Entity\Services;
use App\Form\ServicesType;
use App\Repository\ServicesRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/services')]
final class ServicesController extends AbstractController
{
    #[Route(name: 'app_services_index', methods: ['GET'])]
    public function index(ServicesRepository $servicesRepository): Response
    {
        $services = $servicesRepository->findAllServices();
        $servicesArray = [];
        foreach ($services as $service) {
            $servicesArray[] = [
                'id' => $service->getId(),
                'name' => $service->getNom(),
                'description' => $service->getDescription(),
                'avantages' => $service->getAvantages(),
            ];
        }

        $response = [
            'success' => true,
            'message' => 'Liste des services récupérée avec succès',
            'data' => $servicesArray,
        ];

        return $this->json($response);
    }
}

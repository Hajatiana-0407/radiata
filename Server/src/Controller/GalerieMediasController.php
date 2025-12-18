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

#[Route('/galerie/medias')]
final class GalerieMediasController extends AbstractController
{
    #[Route(name: 'app_galerie_medias_index', methods: ['GET'])]
    public function index(GalerieMediasRepository $galerieMediasRepository): Response
    {
        return $this->render('galerie_medias/index.html.twig', [
            'galerie_medias' => $galerieMediasRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_galerie_medias_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $galerieMedia = new GalerieMedias();
        $form = $this->createForm(GalerieMediasType::class, $galerieMedia);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($galerieMedia);
            $entityManager->flush();

            return $this->redirectToRoute('app_galerie_medias_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('galerie_medias/new.html.twig', [
            'galerie_media' => $galerieMedia,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_galerie_medias_show', methods: ['GET'])]
    public function show(GalerieMedias $galerieMedia): Response
    {
        return $this->render('galerie_medias/show.html.twig', [
            'galerie_media' => $galerieMedia,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_galerie_medias_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, GalerieMedias $galerieMedia, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(GalerieMediasType::class, $galerieMedia);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_galerie_medias_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('galerie_medias/edit.html.twig', [
            'galerie_media' => $galerieMedia,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_galerie_medias_delete', methods: ['POST'])]
    public function delete(Request $request, GalerieMedias $galerieMedia, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$galerieMedia->getId(), $request->getPayload()->getString('_token'))) {
            $entityManager->remove($galerieMedia);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_galerie_medias_index', [], Response::HTTP_SEE_OTHER);
    }
}

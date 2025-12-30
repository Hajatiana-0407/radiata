<?php

namespace App\Controller;

use App\Entity\Articles;
use App\Repository\ArticlesRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/articles')]
final class ArticlesController extends AbstractController
{
    #[Route(name: 'app_articles_index', methods: ['GET'])]
    public function index(ArticlesRepository $articlesRepository, Request $request): Response
    {
        // Récupération des paramètres de requête
        $page = $request->query->getInt('page', 1);
        $search = $request->query->getString('search', '');
        $paginator = $articlesRepository->findArticlesPaginated($search, $page, 10);
        $articles = [];
        foreach ($paginator['data'] as $article) {
            $articles[] = [
                'id' => $article->getId(),
                'title' => $article->getTitre(),
                'slug' => $article->getSlug(),
                'image' => $article->getImageCouverture(),
                'content' => $article->getContenu(),
                'author' => $article->getAutheur(),
                'date' => $article->getDatePublication()?->format('Y-m-d H:i:s'),
                'date_creation' => $article->getDateCreation()?->format('Y-m-d H:i:s'),
                'category' => array_map(function ($category) {
                    return [
                        'id' => $category->getId(),
                        'name' => $category->getNom(),
                        'description' => $category->getDescription(),
                    ];
                }, $article->getCategories()->toArray()),
                'meta_title' => $article->getMetoTitre(),
                'meta_description' => $article->getMetaDescription(),
            ];
        }
        ;


        $response = [
            'success' => true,
            'message' => 'Liste des articles récupérée avec succès',
            'data' => $articles,
            'pagination' => [
                'page' => $page,
                'total' => $paginator['total'],
                'totalPages' => $paginator['totalPages'],
            ],
        ];

        return $this->json($response);
    }


    #[Route('/{slug}', name: 'app_articles_show', methods: ['GET'])]
    public function show(Articles $article): Response
    {
        return $this->render('articles/show.html.twig', [
            'article' => $article,
        ]);
    }


    //  #[Route('/new', name: 'app_articles_new', methods: ['GET', 'POST'])]
    // public function new(Request $request, EntityManagerInterface $entityManager): Response
    // {
    //     $article = new Articles();
    //     $form = $this->createForm(ArticlesType::class, $article);
    //     $form->handleRequest($request);

    //     if ($form->isSubmitted() && $form->isValid()) {
    //         $entityManager->persist($article);
    //         $entityManager->flush();

    //         return $this->redirectToRoute('app_articles_index', [], Response::HTTP_SEE_OTHER);
    //     }

    //     return $this->render('articles/new.html.twig', [
    //         'article' => $article,
    //         'form' => $form,
    //     ]);
    // }

    // #[Route('/{id}/edit', name: 'app_articles_edit', methods: ['GET', 'POST'])]
    // public function edit(Request $request, Articles $article, EntityManagerInterface $entityManager): Response
    // {
    //     $form = $this->createForm(ArticlesType::class, $article);
    //     $form->handleRequest($request);

    //     if ($form->isSubmitted() && $form->isValid()) {
    //         $entityManager->flush();

    //         return $this->redirectToRoute('app_articles_index', [], Response::HTTP_SEE_OTHER);
    //     }

    //     return $this->render('articles/edit.html.twig', [
    //         'article' => $article,
    //         'form' => $form,
    //     ]);
    // }

    // #[Route('/{id}', name: 'app_articles_delete', methods: ['POST'])]
    // public function delete(Request $request, Articles $article, EntityManagerInterface $entityManager): Response
    // {
    //     if ($this->isCsrfTokenValid('delete'.$article->getId(), $request->getPayload()->getString('_token'))) {
    //         $entityManager->remove($article);
    //         $entityManager->flush();
    //     }

    //     return $this->redirectToRoute('app_articles_index', [], Response::HTTP_SEE_OTHER);
    // }
}

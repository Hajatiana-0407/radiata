<?php

namespace App\Repository;

use App\Entity\Articles;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Tools\Pagination\Paginator;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Articles>
 */
class ArticlesRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Articles::class);
    }

    public function findArticlesPaginated(
        ?string $search,
        int $page = 1,
        ?int $limit = 10
    ): array {
        $qb = $this->createQueryBuilder('a');

        //  Recherche texte
        if (!empty($search)) {
            $qb->andWhere(
                'a.titre LIKE :search 
             OR a.contenu LIKE :search'
            )
                ->setParameter('search', '%' . $search . '%');
        }

        $qb->andWhere('a.actif = true ');

        $qb->orderBy('a.id', 'DESC');

        // Pagination
        $qb->setFirstResult(($page - 1) * $limit)
            ->setMaxResults(maxResults: $limit);

        $paginator = new Paginator($qb->getQuery());

        return [
            'data' => iterator_to_array($paginator),
            'total' => count($paginator),
            'page' => $page,
            'limit' => $limit,
            'totalPages' => (int) ceil(count($paginator) / $limit),
        ];
    }

    //    /**
    //     * @return Articles[] Returns an array of Articles objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('a')
    //            ->andWhere('a.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('a.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?Articles
    //    {
    //        return $this->createQueryBuilder('a')
    //            ->andWhere('a.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}

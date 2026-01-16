<?php

namespace App\Repository;

use App\Entity\Categories;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Tools\Pagination\Paginator;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Categories>
 */
class CategoriesRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Categories::class);
    }


    public function findCategorieCircuits(
        int $page = 1,
        ?int $limit = 8
    ) {
        $qb = $this->createQueryBuilder('c');
        $qb->innerJoin('c.circuits', 'circuits')
            ->groupBy('c.id');

        // Pagination
        $qb->setFirstResult(($page - 1) * $limit)
            ->setMaxResults($limit);

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
    //     * @return Categories[] Returns an array of Categories objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('c')
    //            ->andWhere('c.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('c.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?Categories
    //    {
    //        return $this->createQueryBuilder('c')
    //            ->andWhere('c.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}

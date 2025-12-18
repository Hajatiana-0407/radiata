<?php

namespace App\Repository;

use App\Entity\Circuits;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Tools\Pagination\Paginator;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Circuits>
 */
class CircuitsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Circuits::class);
    }

    public function findCircuitsPaginated(
        ?string $search,
        ?string $difficulte,
        ?int $minPrice,
        ?int $maxPrice,
        int $page = 1,
        ?int $limit = 10
    ): array {
        $qb = $this->createQueryBuilder('c');

        //  Recherche texte
        if (!empty($search)) {
            $qb->andWhere(
                'c.titre LIKE :search 
             OR c.description LIKE :search 
             OR c.localisation LIKE :search'
            )
                ->setParameter('search', '%' . $search . '%');
        }
        if (!empty($difficulte)) {
            $qb->andWhere('c.difficulte = :difficulte')
                ->setParameter('difficulte', $difficulte);
        }

        //  Prix 
        if ($minPrice !== null) {
            $qb->andWhere('c.prix_base >= :minPrice')
                ->setParameter('minPrice', $minPrice);
        }
        if ($maxPrice !== null) {
            $qb->andWhere('c.prix_base <= :maxPrice')
                ->setParameter('maxPrice', $maxPrice);
        }

        $qb->orderBy('c.id', 'DESC');

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
    //     * @return Circuits[] Returns an array of Circuits objects
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

    //    public function findOneBySomeField($value): ?Circuits
    //    {
    //        return $this->createQueryBuilder('c')
    //            ->andWhere('c.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}

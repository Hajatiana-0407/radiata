<?php

namespace App\Repository;

use App\Entity\GalerieMedias;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Tools\Pagination\Paginator;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<GalerieMedias>
 */
class GalerieMediasRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, GalerieMedias::class);
    }

    public function getGallerieMediasByCategorie(int $categorie_id, string $search = '', int $page = 1, int $limit = 10)
    {
        $query = $this->createQueryBuilder('g')
            ->join('g.categories', 'c')
            ->addSelect('c');
        if ($categorie_id > 0) {
            $query->andWhere('c.id = :categorie_id')
                ->setParameter('categorie_id', $categorie_id);
        }

        if ($search !== '') {
            $query->andWhere('g.titre LIKE :search OR g.description LIKE :search')
                ->setParameter('search', '%' . $search . '%');
        }
        $query->orderBy('g.ordre_affichage', 'ASC');

        // Pagination
        $query->setFirstResult(($page - 1) * $limit)
            ->setMaxResults($limit);

        $paginator = new Paginator($query->getQuery());

        return [
            'data' => iterator_to_array($paginator),
            'total' => count($paginator),
            'page' => $page,
            'limit' => $limit,
            'totalPages' => (int) ceil(count($paginator) / $limit),
        ];
    }

    //    /**
    //     * @return GalerieMedias[] Returns an array of GalerieMedias objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('g')
    //            ->andWhere('g.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('g.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?GalerieMedias
    //    {
    //        return $this->createQueryBuilder('g')
    //            ->andWhere('g.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}

<?php

namespace App\Entity;

use App\Repository\LanguesRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: LanguesRepository::class)]
class Langues
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 10)]
    private ?string $code = null;

    #[ORM\Column(length: 255)]
    private ?string $nom = null;

    /**
     * @var Collection<int, CategoriesTraductions>
     */
    #[ORM\OneToMany(targetEntity: CategoriesTraductions::class, mappedBy: 'langue', orphanRemoval: true)]
    private Collection $categoriesTraductions;

    public function __construct()
    {
        $this->categoriesTraductions = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCode(): ?string
    {
        return $this->code;
    }

    public function setCode(string $code): static
    {
        $this->code = $code;

        return $this;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): static
    {
        $this->nom = $nom;

        return $this;
    }

    /**
     * @return Collection<int, CategoriesTraductions>
     */
    public function getCategoriesTraductions(): Collection
    {
        return $this->categoriesTraductions;
    }

    public function addCategoriesTraduction(CategoriesTraductions $categoriesTraduction): static
    {
        if (!$this->categoriesTraductions->contains($categoriesTraduction)) {
            $this->categoriesTraductions->add($categoriesTraduction);
            $categoriesTraduction->setLangue($this);
        }

        return $this;
    }

    public function removeCategoriesTraduction(CategoriesTraductions $categoriesTraduction): static
    {
        if ($this->categoriesTraductions->removeElement($categoriesTraduction)) {
            // set the owning side to null (unless already changed)
            if ($categoriesTraduction->getLangue() === $this) {
                $categoriesTraduction->setLangue(null);
            }
        }

        return $this;
    }
}

<?php

namespace App\Entity;

use App\Repository\CategoriesTraductionsRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CategoriesTraductionsRepository::class)]
class CategoriesTraductions
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'categoriesTraductions')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Langues $langue = null;

    #[ORM\Column(length: 255)]
    private ?string $nom = null;

    #[ORM\Column(length: 255)]
    private ?string $description = null;

    #[ORM\OneToOne(inversedBy: 'categoriesTraductions', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?Categories $categorie = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLangue(): ?Langues
    {
        return $this->langue;
    }

    public function setLangue(?Langues $langue): static
    {
        $this->langue = $langue;

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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getCategorie(): ?Categories
    {
        return $this->categorie;
    }

    public function setCategorie(Categories $categorie): static
    {
        $this->categorie = $categorie;

        return $this;
    }
}

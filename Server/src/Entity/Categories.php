<?php

namespace App\Entity;

use App\Repository\CategoriesRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CategoriesRepository::class)]
class Categories
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $icone = null;

    #[ORM\Column(length: 255)]
    private ?string $couleur = null;

    #[ORM\Column(length: 255)]
    private ?int $ordre_affichage = null;

    #[ORM\Column]
    private ?bool $actif = null;

    #[ORM\Column]
    private ?\DateTime $date_creation = null;

    #[ORM\OneToOne(mappedBy: 'categorie', cascade: ['persist', 'remove'])]
    private ?CategoriesTraductions $categoriesTraductions = null;

    public function __construct()
    { 
        $this->date_creation = new \DateTime();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIcone(): ?string
    {
        return $this->icone;
    }

    public function setIcone(string $icone): static
    {
        $this->icone = $icone;

        return $this;
    }

    public function getCouleur(): ?string
    {
        return $this->couleur;
    }

    public function setCouleur(string $couleur): static
    {
        $this->couleur = $couleur;

        return $this;
    }

    public function getOrdreAffichage(): ?int
    {
        return $this->ordre_affichage;
    }

    public function setOrdreAffichage(int $ordre_affichage): static
    {
        $this->ordre_affichage = $ordre_affichage;

        return $this;
    }

    public function isActif(): ?bool
    {
        return $this->actif;
    }

    public function setActif(bool $actif): static
    {
        $this->actif = $actif;

        return $this;
    }

    public function getDateCreation(): ?\DateTime
    {
        return $this->date_creation;
    }

    public function setDateCreation(\DateTime $date_creation): static
    {
        $this->date_creation = $date_creation;

        return $this;
    }

    /**
     * @return Collection<int, CategoriesTraductions>
     */

    public function getCategoriesTraductions(): ?CategoriesTraductions
    {
        return $this->categoriesTraductions;
    }

    public function setCategoriesTraductions(CategoriesTraductions $categoriesTraductions): static
    {
        // set the owning side of the relation if necessary
        if ($categoriesTraductions->getCategorie() !== $this) {
            $categoriesTraductions->setCategorie($this);
        }

        $this->categoriesTraductions = $categoriesTraductions;

        return $this;
    }
}

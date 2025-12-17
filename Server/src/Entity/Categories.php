<?php

namespace App\Entity;

use App\Repository\CategoriesRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
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
    private ?string $nom = null;

    #[ORM\Column(length: 255)]
    private ?string $description = null;

    #[ORM\Column(length: 255)]
    private ?string $couleur = null;

    #[ORM\Column(length: 255)]
    private ?int $ordre_affichage = null;

    #[ORM\Column]
    private ?\DateTime $date_creation = null;

    #[ORM\Column]
    private ?bool $actif = true;

    /**
     * @var Collection<int, Circuits>
     */
    #[ORM\ManyToMany(targetEntity: Circuits::class, mappedBy: 'categories')]
    private Collection $circuits;


    public function __construct()
    {
        $this->date_creation = new \DateTime();
        $this->circuits = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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
     * @return Collection<int, Circuits>
     */
    public function getCircuits(): Collection
    {
        return $this->circuits;
    }

    public function addCircuit(Circuits $circuit): static
    {
        if (!$this->circuits->contains($circuit)) {
            $this->circuits->add($circuit);
            $circuit->addCategory($this);
        }

        return $this;
    }

    public function removeCircuit(Circuits $circuit): static
    {
        if ($this->circuits->removeElement($circuit)) {
            $circuit->removeCategory($this);
        }

        return $this;
    }

    public function __toString(): string
    {
        return $this->getNom(); 
    }
}

<?php

namespace App\Entity;

use App\Repository\ReservationsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ReservationsRepository::class)]
class Reservations
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'reservations')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Circuits $circuit = null;

    #[ORM\Column]
    private ?\DateTime $date_debut = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTime $date_fin = null;

    #[ORM\Column]
    private ?int $nombre_adultes = 1;

    #[ORM\Column]
    private ?int $nombre_enfants = 0;

    #[ORM\Column]
    private ?int $nombre_bebes = 0;

    #[ORM\Column]
    private ?bool $statut = null;

    #[ORM\Column]
    private ?\DateTime $date_creation = null;

    /**
     * @var Collection<int, Services>
     */
    #[ORM\ManyToMany(targetEntity: Services::class, inversedBy: 'reservations')]
    private Collection $Services;

    #[ORM\ManyToOne(inversedBy: 'reservations')]
    private ?Clients $client = null;

    public function __construct()
    {
        $this->Services = new ArrayCollection();
        $this->date_creation = new \DateTime();
    }

    public function getId(): ?int
    {
        return $this->id;
    }


    public function getCircuit(): ?Circuits
    {
        return $this->circuit;
    }

    public function setCircuit(?Circuits $circuit): static
    {
        $this->circuit = $circuit;

        return $this;
    }

    public function getDateDebut(): ?\DateTime
    {
        return $this->date_debut;
    }

    public function setDateDebut(\DateTime $date_debut): static
    {
        $this->date_debut = $date_debut;

        return $this;
    }

    public function getDateFin(): ?\DateTime
    {
        return $this->date_fin;
    }

    public function setDateFin(?\DateTime $date_fin): static
    {
        $this->date_fin = $date_fin;

        return $this;
    }

    public function getNombreAdultes(): ?int
    {
        return $this->nombre_adultes;
    }

    public function setNombreAdultes(int $nombre_adultes): static
    {
        $this->nombre_adultes = $nombre_adultes;

        return $this;
    }

    public function getNombreEnfants(): ?int
    {
        return $this->nombre_enfants;
    }

    public function setNombreEnfants(int $nombre_enfants): static
    {
        $this->nombre_enfants = $nombre_enfants;

        return $this;
    }

    public function getNombreBebes(): ?int
    {
        return $this->nombre_bebes;
    }

    public function setNombreBebes(int $nombre_bebes): static
    {
        $this->nombre_bebes = $nombre_bebes;

        return $this;
    }

    public function isStatut(): ?bool
    {
        return $this->statut;
    }

    public function setStatut(bool $statut): static
    {
        $this->statut = $statut;

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
     * @return Collection<int, Services>
     */
    public function getServices(): Collection
    {
        return $this->Services;
    }

    public function addService(Services $service): static
    {
        if (!$this->Services->contains($service)) {
            $this->Services->add($service);
        }

        return $this;
    }

    public function removeService(Services $service): static
    {
        $this->Services->removeElement($service);

        return $this;
    }

    public function getClient(): ?Clients
    {
        return $this->client;
    }

    public function setClient(?Clients $client): static
    {
        $this->client = $client;

        return $this;
    }



    public function getDureeJours(): ?int
    {
        if ($this->date_debut && $this->getDateFin()) {
            return $this->date_debut->diff($this->getDateFin())->days;
        }

        return $this->circuit ? $this->circuit->getDureeJours() : null;
    }

    public function getPrixTotal(): float
    {
        $total = 0;

        if ($this->circuit) {
            $prixBase = $this->circuit->getPrixBase();
            $total += $prixBase * $this->nombre_adultes;
            $total += $prixBase * $this->nombre_enfants * 0.7; // 30% réduction enfants
            // Bébés gratuits
        }

        foreach ($this->getServices() as $service) {
            // Ajouter le prix des services si disponible
            // $total += $service->getPrix();
        }

        return $total;
    }
}

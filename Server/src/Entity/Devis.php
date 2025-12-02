<?php

namespace App\Entity;

use App\Repository\DevisRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: DevisRepository::class)]
class Devis
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'devis')]
    private ?Clients $client = null;

    #[ORM\Column(length: 255)]
    private ?string $reference_devis = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $nom_client = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $email = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $telephone = null;

    #[ORM\Column]
    private ?\DateTime $dates_souhaitees = null;

    #[ORM\Column]
    private ?int $nombres_adultes = null;

    #[ORM\Column]
    private ?int $nombre_enfants = null;

    #[ORM\Column]
    private ?int $nombre_bebes = null;

    #[ORM\Column(length: 255)]
    private ?string $statut = null;

    #[ORM\Column]
    private ?\DateTime $date_creation = null;

    /**
     * @var Collection<int, Circuits>
     */
    #[ORM\ManyToMany(targetEntity: Circuits::class, inversedBy: 'devis')]
    private Collection $circuits;

    /**
     * @var Collection<int, Services>
     */
    #[ORM\ManyToMany(targetEntity: Services::class, inversedBy: 'devis')]
    private Collection $services;

    public function __construct()
    {
        $this->circuits = new ArrayCollection();
        $this->services = new ArrayCollection();
        $this->date_creation = new \DateTime() ; 
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getReferenceDevis(): ?string
    {
        return $this->reference_devis;
    }

    public function setReferenceDevis(string $reference_devis): static
    {
        $this->reference_devis = $reference_devis;

        return $this;
    }

    public function getNomClient(): ?string
    {
        return $this->nom_client;
    }

    public function setNomClient(?string $nom_client): static
    {
        $this->nom_client = $nom_client;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(?string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getTelephone(): ?string
    {
        return $this->telephone;
    }

    public function setTelephone(?string $telephone): static
    {
        $this->telephone = $telephone;

        return $this;
    }

    public function getDatesSouhaitees(): ?\DateTime
    {
        return $this->dates_souhaitees;
    }

    public function setDatesSouhaitees(\DateTime $dates_souhaitees): static
    {
        $this->dates_souhaitees = $dates_souhaitees;

        return $this;
    }

    public function getNombresAdultes(): ?int
    {
        return $this->nombres_adultes;
    }

    public function setNombresAdultes(int $nombres_adultes): static
    {
        $this->nombres_adultes = $nombres_adultes;

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

    public function getStatut(): ?string
    {
        return $this->statut;
    }

    public function setStatut(string $statut): static
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
        }

        return $this;
    }

    public function removeCircuit(Circuits $circuit): static
    {
        $this->circuits->removeElement($circuit);

        return $this;
    }

    /**
     * @return Collection<int, Services>
     */
    public function getServices(): Collection
    {
        return $this->services;
    }

    public function addService(Services $service): static
    {
        if (!$this->services->contains($service)) {
            $this->services->add($service);
        }

        return $this;
    }

    public function removeService(Services $service): static
    {
        $this->services->removeElement($service);

        return $this;
    }
}

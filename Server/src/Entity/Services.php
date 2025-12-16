<?php

namespace App\Entity;

use App\Repository\ServicesRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\DBAL\Types\Types;

#[ORM\Entity(repositoryClass: ServicesRepository::class)]
class Services
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $icone = null;

    #[ORM\Column]
    private ?bool $actif = null;

    #[ORM\Column(length: 255)]
    private ?string $nom = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $description = null;

    #[ORM\Column]
    private ?int $ordre_affichage = null;

    /**
     * @var Collection<int, GalerieMedias>
     */
    #[ORM\OneToMany(targetEntity: GalerieMedias::class, mappedBy: 'service')]
    private Collection $galerieMedias;

    /**
     * @var Collection<int, Devis>
     */
    #[ORM\ManyToMany(targetEntity: Devis::class, mappedBy: 'services')]
    private Collection $devis;

    /**
     * @var Collection<int, Reservations>
     */
    #[ORM\ManyToMany(targetEntity: Reservations::class, mappedBy: 'Services')]
    private Collection $reservations;

    public function __construct()
    {
        $this->galerieMedias = new ArrayCollection();
        $this->devis = new ArrayCollection();
        $this->reservations = new ArrayCollection();
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

    public function isActif(): ?bool
    {
        return $this->actif;
    }

    public function setActif(bool $actif): static
    {
        $this->actif = $actif;

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

    /**
     * @return Collection<int, GalerieMedias>
     */
    public function getGalerieMedias(): Collection
    {
        return $this->galerieMedias;
    }

    public function addGalerieMedia(GalerieMedias $galerieMedia): static
    {
        if (!$this->galerieMedias->contains($galerieMedia)) {
            $this->galerieMedias->add($galerieMedia);
            $galerieMedia->setService($this);
        }

        return $this;
    }

    public function removeGalerieMedia(GalerieMedias $galerieMedia): static
    {
        if ($this->galerieMedias->removeElement($galerieMedia)) {
            // set the owning side to null (unless already changed)
            if ($galerieMedia->getService() === $this) {
                $galerieMedia->setService(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Devis>
     */
    public function getDevis(): Collection
    {
        return $this->devis;
    }

    public function addDevi(Devis $devi): static
    {
        if (!$this->devis->contains($devi)) {
            $this->devis->add($devi);
            $devi->addService($this);
        }

        return $this;
    }

    public function removeDevi(Devis $devi): static
    {
        if ($this->devis->removeElement($devi)) {
            $devi->removeService($this);
        }

        return $this;
    }

    /**
     * @return Collection<int, Reservations>
     */
    public function getReservations(): Collection
    {
        return $this->reservations;
    }

    public function addReservation(Reservations $reservation): static
    {
        if (!$this->reservations->contains($reservation)) {
            $this->reservations->add($reservation);
            $reservation->addService($this);
        }

        return $this;
    }

    public function removeReservation(Reservations $reservation): static
    {
        if ($this->reservations->removeElement($reservation)) {
            $reservation->removeService($this);
        }

        return $this;
    }
}

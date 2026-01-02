<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Entity\ValueObject\Range;
use App\Repository\CircuitsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\String\Slugger\AsciiSlugger;

#[ApiResource()]
#[ORM\Entity(repositoryClass: CircuitsRepository::class)]
class Circuits
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $titre = null;

    #[ORM\Column(length: 255)]
    private ?string $image = '';

    #[ORM\Column(length: 255)]
    private ?string $slug = null;

    #[ORM\Column(length: 255)]
    private ?string $description = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $meto_titre = '';

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $meta_description = '';

    #[ORM\Column]
    private ?float $duree_jours = null;

    #[ORM\Column]
    private ?float $prix_base = null;

    #[ORM\Column]
    private ?int $difficulte = 1;

    #[ORM\Column]
    private ?float $score_ecotourisme = 1;

    #[ORM\Column]
    private ?bool $actif = true;

    #[ORM\Embedded(class: Range::class)]
    private ?Range $range = null;

    #[ORM\Column]
    private ?\DateTime $date_creation = null;


    /**
     * @var Collection<int, self>
     */
    #[ORM\ManyToMany(targetEntity: self::class, inversedBy: 'circuits')]
    private Collection $circuits;

    /**
     * @var Collection<int, GalerieMedias>
     */
    #[ORM\OneToMany(targetEntity: GalerieMedias::class, mappedBy: 'circuit')]
    private Collection $galerieMedias;

    /**
     * @var Collection<int, Devis>
     */
    #[ORM\ManyToMany(targetEntity: Devis::class, mappedBy: 'circuits')]
    private Collection $devis;

    /**
     * @var Collection<int, Reservations>
     */
    #[ORM\OneToMany(targetEntity: Reservations::class, mappedBy: 'circuit', orphanRemoval: true)]
    private Collection $reservations;

    /**
     * @var Collection<int, Avis>
     */
    #[ORM\OneToMany(targetEntity: Avis::class, mappedBy: 'circuit')]
    private Collection $avis;

    /**
     * @var Collection<int, Categories>
     */
    #[ORM\ManyToMany(targetEntity: Categories::class, inversedBy: 'circuits')]
    private Collection $categories;

    #[ORM\Column(length: 255)]
    private ?string $localisation = null;

    #[ORM\Column]
    private ?bool $is_populare = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $conservation_contribution = null;

    #[ORM\Column(nullable: true)]
    private ?array $point_fort = null;

    #[ORM\Column(nullable: true)]
    private ?array $actionsDurables = null;

    #[ORM\Column(nullable: true)]
    private ?array $periode = null;

    /**
     * @var Collection<int, Services>
     */
    #[ORM\ManyToMany(targetEntity: Services::class, inversedBy: 'circuits')]
    private Collection $services;


    public function __construct()
    {
        $this->circuits = new ArrayCollection();
        $this->galerieMedias = new ArrayCollection();
        $this->devis = new ArrayCollection();
        $this->reservations = new ArrayCollection();
        $this->avis = new ArrayCollection();
        $this->date_creation = new \DateTime();
        $this->categories = new ArrayCollection();
        $this->services = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDureeJours(): ?float
    {
        return $this->duree_jours;
    }

    public function setDureeJours(float $duree_jours): static
    {
        $this->duree_jours = $duree_jours;

        return $this;
    }

    public function getPrixBase(): ?float
    {
        return $this->prix_base;
    }

    public function setPrixBase(float $prix_base): static
    {
        $this->prix_base = $prix_base;

        return $this;
    }

    public function getDifficulte(): ?int
    {
        return $this->difficulte;
    }

    public function setDifficulte(int $difficulte): static
    {
        $this->difficulte = $difficulte;

        return $this;
    }

    public function getScoreEcotourisme(): ?float
    {
        return $this->score_ecotourisme;
    }

    public function setScoreEcotourisme(float $score_ecotourisme): static
    {
        $this->score_ecotourisme = $score_ecotourisme;

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
     * @return Collection<int, self>
     */
    public function getCircuits(): Collection
    {
        return $this->circuits;
    }

    public function addCircuit(self $circuit): static
    {
        if (!$this->circuits->contains($circuit)) {
            $this->circuits->add($circuit);
        }

        return $this;
    }

    public function removeCircuit(self $circuit): static
    {
        $this->circuits->removeElement($circuit);

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
            $galerieMedia->setCircuit($this);
        }

        return $this;
    }

    public function removeGalerieMedia(GalerieMedias $galerieMedia): static
    {
        if ($this->galerieMedias->removeElement($galerieMedia)) {
            // set the owning side to null (unless already changed)
            if ($galerieMedia->getCircuit() === $this) {
                $galerieMedia->setCircuit(null);
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
            $devi->addCircuit($this);
        }

        return $this;
    }

    public function removeDevi(Devis $devi): static
    {
        if ($this->devis->removeElement($devi)) {
            $devi->removeCircuit($this);
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
            $reservation->setCircuit($this);
        }

        return $this;
    }

    public function removeReservation(Reservations $reservation): static
    {
        if ($this->reservations->removeElement($reservation)) {
            // set the owning side to null (unless already changed)
            if ($reservation->getCircuit() === $this) {
                $reservation->setCircuit(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Avis>
     */
    public function getAvis(): Collection
    {
        return $this->avis;
    }

    public function addAvi(Avis $avi): static
    {
        if (!$this->avis->contains($avi)) {
            $this->avis->add($avi);
            $avi->setCircuit($this);
        }

        return $this;
    }

    public function removeAvi(Avis $avi): static
    {
        if ($this->avis->removeElement($avi)) {
            // set the owning side to null (unless already changed)
            if ($avi->getCircuit() === $this) {
                $avi->setCircuit(null);
            }
        }

        return $this;
    }
    public function getTitre(): ?string
    {
        return $this->titre;
    }

    public function setTitre(string $titre): static
    {
        $this->titre = $titre;
        $slugger = new AsciiSlugger();
        $this->slug = $slugger->slug($this->titre);
        return $this;
    }

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): static
    {
        $this->slug = $slug;

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

    public function getMetoTitre(): ?string
    {
        return $this->meto_titre;
    }

    public function setMetoTitre(string $meto_titre): static
    {
        $this->meto_titre = $meto_titre;

        return $this;
    }

    public function getMetaDescription(): ?string
    {
        return $this->meta_description;
    }

    public function setMetaDescription(string $meta_description): static
    {
        $this->meta_description = $meta_description;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(string $image): static
    {
        $this->image = $image;

        return $this;
    }

    /**
     * @return Collection<int, Categories>
     */
    public function getCategories(): Collection
    {
        return $this->categories;
    }

    public function addCategory(Categories $category): static
    {
        if (!$this->categories->contains($category)) {
            $this->categories->add($category);
        }

        return $this;
    }

    public function removeCategory(Categories $category): static
    {
        $this->categories->removeElement($category);

        return $this;
    }

    public function __tostring(): string
    {
        return $this->titre;
    }

    public function getLocalisation(): ?string
    {
        return $this->localisation;
    }

    public function setLocalisation(string $localisation): static
    {
        $this->localisation = $localisation;

        return $this;
    }

    public function isPopulare(): ?bool
    {
        return $this->is_populare;
    }

    public function setIsPopulare(bool $is_populare): static
    {
        $this->is_populare = $is_populare;

        return $this;
    }

    public function getConservationContribution(): ?string
    {
        return $this->conservation_contribution;
    }

    public function setConservationContribution(?string $conservation_contribution): static
    {
        $this->conservation_contribution = $conservation_contribution;

        return $this;
    }

    public function getPointFort(): ?array
    {
        return $this->point_fort;
    }

    public function setPointFort(?array $point_fort): static
    {
        $this->point_fort = $point_fort;

        return $this;
    }


    public function getRange(): ?Range
    {
        return $this->range;
    }
    public function setRange(Range $range): static
    {
        $this->range = $range;
        return $this;
    }

    public function getActionsDurables(): ?array
    {
        return $this->actionsDurables;
    }

    public function setActionsDurables(?array $actionsDurables): static
    {
        $this->actionsDurables = $actionsDurables;

        return $this;
    }

    public function getPeriode(): ?array
    {
        return $this->periode;
    }

    public function setPeriode(?array $periode): static
    {
        $this->periode = $periode;

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

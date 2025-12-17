<?php

namespace App\Entity;

use App\Repository\GalerieMediasRepository;
use DateTime;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: GalerieMediasRepository::class)]
class GalerieMedias
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $titre = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $description = null;

    #[ORM\Column(length: 255)]
    private ?string $nom_ficher = null;

    #[ORM\Column(length: 255)]
    private ?string $chemin_fichier = null;

    #[ORM\Column(length: 100)]
    private ?string $type_media = null;

    #[ORM\Column(nullable: true)]
    private ?array $tags = null;

    #[ORM\ManyToOne(inversedBy: 'galerieMedias')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Circuits $circuit = null;

    #[ORM\ManyToOne(inversedBy: 'galerieMedias')]
    private ?Services $service = null;

    #[ORM\Column]
    private ?int $ordre_affichage = null;

    #[ORM\Column(nullable: true)]
    private ?DateTime $date_upload = null;

    #[ORM\Column]
    private ?bool $actif = null;


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNomFicher(): ?string
    {
        return $this->nom_ficher;
    }

    public function setNomFicher(string $nom_ficher): static
    {
        $this->nom_ficher = $nom_ficher;

        return $this;
    }

    public function getCheminFichier(): ?string
    {
        return $this->chemin_fichier;
    }

    public function setCheminFichier(string $chemin_fichier): static
    {
        $this->chemin_fichier = $chemin_fichier;

        return $this;
    }

    public function getTypeMedia(): ?string
    {
        return $this->type_media;
    }

    public function setTypeMedia(string $type_media): static
    {
        $this->type_media = $type_media;

        return $this;
    }

    public function getTags(): ?array
    {
        return $this->tags;
    }


    public function getTitre(): ?string
    {
        return $this->titre;
    }

    public function setTitre(string $titre): static
    {
        $this->titre = $titre;

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

    public function setTags(?array $tags): static
    {
        $this->tags = $tags;

        return $this;
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

    public function getService(): ?Services
    {
        return $this->service;
    }

    public function setService(?Services $service): static
    {
        $this->service = $service;

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

    public function getDateUpload(): ?DateTime
    {
        return $this->date_upload;
    }

    public function setDateUpload(?DateTime $date_upload): static
    {
        $this->date_upload = $date_upload;

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

    public function __toString(): string
    {
        return $this->titre;
    }
}

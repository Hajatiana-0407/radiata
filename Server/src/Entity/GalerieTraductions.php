<?php

namespace App\Entity;

use App\Repository\GalerieTraductionsRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: GalerieTraductionsRepository::class)]
class GalerieTraductions
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'galerieTraductions')]
    #[ORM\JoinColumn(nullable: false)]
    private ?GalerieMedias $galerie = null;

    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?Langues $langue = null;

    #[ORM\Column(length: 255)]
    private ?string $titre = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $description = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getGalerie(): ?GalerieMedias
    {
        return $this->galerie;
    }

    public function setGalerie(?GalerieMedias $galerie): static
    {
        $this->galerie = $galerie;

        return $this;
    }

    public function getLangue(): ?Langues
    {
        return $this->langue;
    }

    public function setLangue(Langues $langue): static
    {
        $this->langue = $langue;

        return $this;
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
}

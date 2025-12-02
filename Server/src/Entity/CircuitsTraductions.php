<?php

namespace App\Entity;

use App\Repository\CircuitsTraductionsRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\String\Slugger\AsciiSlugger;

#[ORM\Entity(repositoryClass: CircuitsTraductionsRepository::class)]
class CircuitsTraductions
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Langues $langue = null;

    #[ORM\Column(length: 255)]
    private ?string $titre = null;

    #[ORM\Column(length: 255)]
    private ?string $slug = null;

    #[ORM\Column(length: 255)]
    private ?string $description = null;

    #[ORM\Column(length: 255)]
    private ?string $meto_titre = null;

    #[ORM\Column(length: 255)]
    private ?string $meta_description = null;

    #[ORM\OneToOne(inversedBy: 'circuitsTraductions', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?Circuits $circuit = null;

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

    public function getCircuit(): ?Circuits
    {
        return $this->circuit;
    }

    public function setCircuit(Circuits $circuit): static
    {
        $this->circuit = $circuit;

        return $this;
    }
}

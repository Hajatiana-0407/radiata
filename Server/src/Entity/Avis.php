<?php

namespace App\Entity;

use App\Repository\AvisRepository;
use DateTime;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: AvisRepository::class)]
class Avis
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\OneToOne(inversedBy: 'avis', cascade: ['persist', 'remove'])]
    private ?CLients $client = null;

    #[ORM\ManyToOne(inversedBy: 'avis')]
    private ?Circuits $circuit = null;

    #[ORM\Column]
    private ?int $note = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $commentaire = null;

    #[ORM\Column(length: 255)]
    private ?DateTime $date_publication = null;

    #[ORM\Column(length: 255)]
    private ?string $statut = null;


    public function __construct()
    {
        $this->date_publication = new DateTime();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getClient(): ?CLients
    {
        return $this->client;
    }

    public function setClient(?CLients $client): static
    {
        $this->client = $client;

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

    public function getNote(): ?int
    {
        return $this->note;
    }

    public function setNote(int $note): static
    {
        $this->note = $note;

        return $this;
    }

    public function getCommentaire(): ?string
    {
        return $this->commentaire;
    }

    public function setCommentaire(string $commentaire): static
    {
        $this->commentaire = $commentaire;

        return $this;
    }

    public function getDatetPublication(): ?DateTime
    {
        return $this->date_publication;
    }

    public function setDatetPublication(DateTime $date_publication): static
    {
        $this->date_publication = $date_publication;

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
}

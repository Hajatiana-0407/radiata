<?php

namespace App\Entity;

use App\Repository\ClientsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ClientsRepository::class)]
class Clients
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $nom = null;

    #[ORM\Column(length: 255)]
    private ?string $prenom = null;

    #[ORM\Column(length: 255)]
    private ?string $email = null;

    #[ORM\Column(length: 255)]
    private ?string $mot_de_passe = null;

    #[ORM\Column]
    private ?int $telephone = null;

    #[ORM\Column(length: 255)]
    private ?string $adresse = null;

    #[ORM\Column(length: 255)]
    private ?string $ville = null;

    #[ORM\Column(length: 255)]
    private ?string $pays = null;

    #[ORM\Column]
    private ?\DateTime $date_creation = null;

    #[ORM\Column(nullable: true)]
    private ?bool $actif = null;

    /**
     * @var Collection<int, ClientsTokens>
     */
    #[ORM\OneToMany(targetEntity: ClientsTokens::class, mappedBy: 'client')]
    private Collection $clientsTokens;

    /**
     * @var Collection<int, Devis>
     */
    #[ORM\OneToMany(targetEntity: Devis::class, mappedBy: 'client')]
    private Collection $devis;

    /**
     * @var Collection<int, Reservations>
     */
    #[ORM\OneToMany(targetEntity: Reservations::class, mappedBy: 'client', orphanRemoval: true)]
    private Collection $reservations;

    /**
     * @var Collection<int, Favoris>
     */
    #[ORM\OneToMany(targetEntity: Favoris::class, mappedBy: 'client', orphanRemoval: true)]
    private Collection $favoris;

    #[ORM\OneToOne(mappedBy: 'client', cascade: ['persist', 'remove'])]
    private ?Avis $avis = null;

    /**
     * @var Collection<int, MessagesContact>
     */
    #[ORM\OneToMany(targetEntity: MessagesContact::class, mappedBy: 'client')]
    private Collection $messagesContacts;

    public function __construct()
    {
        $this->clientsTokens = new ArrayCollection();
        $this->devis = new ArrayCollection();
        $this->reservations = new ArrayCollection();
        $this->favoris = new ArrayCollection();
        $this->messagesContacts = new ArrayCollection();
        $this->date_creation = new \DateTime() ; 
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

    public function getPrenom(): ?string
    {
        return $this->prenom;
    }

    public function setPrenom(string $prenom): static
    {
        $this->prenom = $prenom;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getMotDePasse(): ?string
    {
        return $this->mot_de_passe;
    }

    public function setMotDePasse(string $mot_de_passe): static
    {
        $this->mot_de_passe = $mot_de_passe;

        return $this;
    }

    public function getTelephone(): ?int
    {
        return $this->telephone;
    }

    public function setTelephone(int $telephone): static
    {
        $this->telephone = $telephone;

        return $this;
    }

    public function getAdresse(): ?string
    {
        return $this->adresse;
    }

    public function setAdresse(string $adresse): static
    {
        $this->adresse = $adresse;

        return $this;
    }

    public function getVille(): ?string
    {
        return $this->ville;
    }

    public function setVille(string $ville): static
    {
        $this->ville = $ville;

        return $this;
    }

    public function getPays(): ?string
    {
        return $this->pays;
    }

    public function setPays(string $pays): static
    {
        $this->pays = $pays;

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

    public function isActif(): ?bool
    {
        return $this->actif;
    }

    public function setActif(?bool $actif): static
    {
        $this->actif = $actif;

        return $this;
    }

    /**
     * @return Collection<int, ClientsTokens>
     */
    public function getClientsTokens(): Collection
    {
        return $this->clientsTokens;
    }

    public function addClientsToken(ClientsTokens $clientsToken): static
    {
        if (!$this->clientsTokens->contains($clientsToken)) {
            $this->clientsTokens->add($clientsToken);
            $clientsToken->setClient($this);
        }

        return $this;
    }

    public function removeClientsToken(ClientsTokens $clientsToken): static
    {
        if ($this->clientsTokens->removeElement($clientsToken)) {
            // set the owning side to null (unless already changed)
            if ($clientsToken->getClient() === $this) {
                $clientsToken->setClient(null);
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
            $devi->setClient($this);
        }

        return $this;
    }

    public function removeDevi(Devis $devi): static
    {
        if ($this->devis->removeElement($devi)) {
            // set the owning side to null (unless already changed)
            if ($devi->getClient() === $this) {
                $devi->setClient(null);
            }
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
            $reservation->setClient($this);
        }

        return $this;
    }

    public function removeReservation(Reservations $reservation): static
    {
        if ($this->reservations->removeElement($reservation)) {
            // set the owning side to null (unless already changed)
            if ($reservation->getClient() === $this) {
                $reservation->setClient(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Favoris>
     */
    public function getFavoris(): Collection
    {
        return $this->favoris;
    }

    public function addFavori(Favoris $favori): static
    {
        if (!$this->favoris->contains($favori)) {
            $this->favoris->add($favori);
            $favori->setClient($this);
        }

        return $this;
    }

    public function removeFavori(Favoris $favori): static
    {
        if ($this->favoris->removeElement($favori)) {
            // set the owning side to null (unless already changed)
            if ($favori->getClient() === $this) {
                $favori->setClient(null);
            }
        }

        return $this;
    }

    public function getAvis(): ?Avis
    {
        return $this->avis;
    }

    public function setAvis(?Avis $avis): static
    {
        // unset the owning side of the relation if necessary
        if ($avis === null && $this->avis !== null) {
            $this->avis->setClient(null);
        }

        // set the owning side of the relation if necessary
        if ($avis !== null && $avis->getClient() !== $this) {
            $avis->setClient($this);
        }

        $this->avis = $avis;

        return $this;
    }

    /**
     * @return Collection<int, MessagesContact>
     */
    public function getMessagesContacts(): Collection
    {
        return $this->messagesContacts;
    }

    public function addMessagesContact(MessagesContact $messagesContact): static
    {
        if (!$this->messagesContacts->contains($messagesContact)) {
            $this->messagesContacts->add($messagesContact);
            $messagesContact->setClient($this);
        }

        return $this;
    }

    public function removeMessagesContact(MessagesContact $messagesContact): static
    {
        if ($this->messagesContacts->removeElement($messagesContact)) {
            // set the owning side to null (unless already changed)
            if ($messagesContact->getClient() === $this) {
                $messagesContact->setClient(null);
            }
        }

        return $this;
    }
}

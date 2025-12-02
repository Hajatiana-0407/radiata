<?php

namespace App\Entity;

use App\Repository\ArticlesRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ArticlesRepository::class)]
class Articles
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;


    #[ORM\Column(length: 255)]
    private ?string $image_couverture = null;

    #[ORM\Column]
    private ?\DateTime $date_publication = null;

    #[ORM\Column]
    private ?bool $actif = null;

    #[ORM\Column]
    private ?\DateTime $date_creation = null;

    /**
     * @var Collection<int, ArticlesTraductions>
     */
    #[ORM\OneToMany(targetEntity: ArticlesTraductions::class, mappedBy: 'article', orphanRemoval: true)]
    private Collection $articlesTraductions;

    public function __construct()
    {
        $this->articlesTraductions = new ArrayCollection();
        $this->date_creation = new \DateTime();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getImageCouverture(): ?string
    {
        return $this->image_couverture;
    }

    public function setImageCouverture(string $image_couverture): static
    {
        $this->image_couverture = $image_couverture;

        return $this;
    }

    public function getDatePublication(): ?\DateTime
    {
        return $this->date_publication;
    }

    public function setDatePublication(\DateTime $date_publication): static
    {
        $this->date_publication = $date_publication;

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
     * @return Collection<int, ArticlesTraductions>
     */
    public function getArticlesTraductions(): Collection
    {
        return $this->articlesTraductions;
    }

    public function addArticlesTraduction(ArticlesTraductions $articlesTraduction): static
    {
        if (!$this->articlesTraductions->contains($articlesTraduction)) {
            $this->articlesTraductions->add($articlesTraduction);
            $articlesTraduction->setArticle($this);
        }

        return $this;
    }

    public function removeArticlesTraduction(ArticlesTraductions $articlesTraduction): static
    {
        if ($this->articlesTraductions->removeElement($articlesTraduction)) {
            // set the owning side to null (unless already changed)
            if ($articlesTraduction->getArticle() === $this) {
                $articlesTraduction->setArticle(null);
            }
        }

        return $this;
    }
}

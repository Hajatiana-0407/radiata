<?php
namespace App\Entity\ValueObject;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Embeddable]
class Range
{
    #[ORM\Column(type: 'float')]
    private float $min;

    #[ORM\Column(type: 'float')]
    private float $max;

    public function __construct( float $min = 0.0, float $max = 0.0)
    {
        $this->min = $min;
        $this->max = $max;
    }

    public function getMin(): float
    {
        return $this->min;
    }
    public function getMax(): float
    {
        return $this->max;
    }

    public function setMin(float $min): self
    {
        $this->min = $min;
        return $this;
    }

    public function setMax(float $max): self
    {
        $this->max = $max;
        return $this;
    }
}
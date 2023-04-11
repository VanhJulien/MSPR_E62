<?php

namespace App\Entity;

use App\Repository\PlantRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\ExistsFilter;

#[ORM\Entity(repositoryClass: PlantRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['plant_group']],
)]
class Plant
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups('plant_group')]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups('plant_group')]
    private ?string $specie = null;

    #[ORM\Column(length: 255)]
    #[Groups('plant_group')]
    private ?string $status = null;

    #[ORM\ManyToOne(inversedBy: 'plants')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups('plant_group')]
    private ?Place $place = null;

    #[ORM\OneToMany(mappedBy: 'plant', targetEntity: Maintenance::class, orphanRemoval: true)]
    #[Groups('plant_group')]
    private Collection $maintenance;

    #[ORM\Column(type: Types::BLOB, nullable: true)]
    private $picture = null;

    public function __construct()
    {
        $this->maintenance = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSpecie(): ?string
    {
        return $this->specie;
    }

    public function setSpecie(string $specie): self
    {
        $this->specie = $specie;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getPlace(): ?Place
    {
        return $this->place;
    }

    public function setPlace(?Place $place): self
    {
        $this->place = $place;

        return $this;
    }

    /**
     * @return Collection<int, Maintenance>
     */
    public function getMaintenance(): Collection
    {
        return $this->maintenance;
    }

    public function addMaintenance(Maintenance $maintenance): self
    {
        if (!$this->maintenance->contains($maintenance)) {
            $this->maintenance->add($maintenance);
            $maintenance->setPlant($this);
        }

        return $this;
    }

    public function removeMaintenance(Maintenance $maintenance): self
    {
        if ($this->maintenance->removeElement($maintenance)) {
            // set the owning side to null (unless already changed)
            if ($maintenance->getPlant() === $this) {
                $maintenance->setPlant(null);
            }
        }

        return $this;
    }

    public function getPicture()
    {
        return $this->picture;
    }

    public function setPicture($picture): self
    {
        $this->picture = $picture;

        return $this;
    }
}

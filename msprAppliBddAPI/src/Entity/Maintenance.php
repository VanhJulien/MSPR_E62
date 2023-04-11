<?php

namespace App\Entity;

use App\Repository\MaintenanceRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;

#[ORM\Entity(repositoryClass: MaintenanceRepository::class)]
#[ApiResource]
class Maintenance
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $date_maintenance = null;

    #[ORM\Column(length: 255)]
    private ?string $description = null;

    #[ORM\ManyToOne(inversedBy: 'maintenance')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Account $maintainer = null;

    #[ORM\ManyToOne(inversedBy: 'maintenance')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Plant $plant = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDateMaintenance(): ?\DateTimeInterface
    {
        return $this->date_maintenance;
    }

    public function setDateMaintenance(\DateTimeInterface $date_maintenance): self
    {
        $this->date_maintenance = $date_maintenance;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getMaintainer(): ?Account
    {
        return $this->maintainer;
    }

    public function setMaintainer(?Account $maintainer): self
    {
        $this->maintainer = $maintainer;

        return $this;
    }

    public function getPlant(): ?Plant
    {
        return $this->plant;
    }

    public function setPlant(?Plant $plant): self
    {
        $this->plant = $plant;

        return $this;
    }
}

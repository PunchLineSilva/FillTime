<?php

namespace Source\Models;

use Source\Core\Connect;
use Source\Core\Model;

class Court extends Model{
    protected $id;
    protected $name;
    protected $hours;
    protected $type;
    protected $price;
    protected $image;

    public function __construct(
        int $id = null,
        string $name = null,
        int $hours = null,
        string $type = null,
        float $price = null,
        string $image = null
    ) 
    {
        $this->table = "courts";
        $this->id = $id;
        $this->name = $name;
        $this->hours = $hours;
        $this->type = $type;
        $this->price = $price;
        $this->image = $image;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(?int $id): void
    {
        $this->id = $id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): void
    {
        $this->name = $name;
    }

    public function getHours(): ?int
    {
        return $this->hours;
    }

    public function setHours(?int $hours): void
    {
        $this->hours = $hours;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(?string $type): void
    {
        $this->type = $type;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(?float $price): void
    {
        $this->price = $price;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(?string $image): void
    {
        $this->image = $image;
    }

     
}
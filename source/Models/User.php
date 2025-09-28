<?php

namespace Source\Models;

use Source\Core\Connect;
use Source\Core\Model;
use PDOException;

class User extends Model
{
    protected $id;
    protected $idType;
    protected $first_name;
    protected $last_name;
    protected $email;
    protected $password;
    protected $photo;

    public function __construct(
        int $id = null,
        int $idType = null,
        string $first_name = null,
        string $last_name = null,
        string $email = null,
        string $password = null,
        string $photo = null
    ) 
    {
        $this->table = "users";
        $this->setId($id);
        $this->setIdType($idType);
        $this->setFirstName($first_name);
        $this->setLastName($last_name);
        $this->setEmail($email);
        $this->setPassword($password);
        $this->setPhoto($photo);
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(?int $id): void
    {
        $this->id = $id;
    }

    public function getIdType(): ?int
    {
        return $this->idType;
    }

    public function setIdType(?int $idType): void
    {
        $this->idType = $idType;
    }

    public function getFirstName(): ?string
    {
        return $this->first_name;
    }

    public function setFirstName(?string $name): void
    {
        $this->first_name = $name;
    }

    public function getLastName(): ?string
    {
        return $this->last_name;
    }

    public function setLastName(?string $name): void
    {
        $this->last_name = $name;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(?string $email): void
    {
        $this->email = $email;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(?string $password): void
    {
        $this->password = $password;
    }

    public function getPhoto(): ?string
    {
        return $this->photo;
    }

    public function setPhoto(?string $photo): void
    {
        $this->photo = $photo;
    }

    public function insert (): bool
    {
        if (!filter_var($this->email, FILTER_VALIDATE_EMAIL)) {
            $this->errorMessage = "E-mail inválido";
            return false;
        }

        $sql = "SELECT id FROM users WHERE email = :email";
        $stmt = Connect::getInstance()->prepare($sql);
        $stmt->bindValue(":email", $this->email);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $this->errorMessage = "E-mail já cadastrado";
            return false;
        }

        $this->password = password_hash($this->password, PASSWORD_DEFAULT);

        return parent::insert();
    }

    public function findByEmail (string $email): bool
    {
        $sql = "SELECT * FROM users WHERE email = :email";
        $stmt = Connect::getInstance()->prepare($sql);
        $stmt->bindValue(":email", $email);

        try {
            $stmt->execute();
            $result = $stmt->fetch();
            if (!$result) {
                return false;
            }
            $this->id = $result->id;
            $this->idType = $result->idType;
            $this->first_name = $result->first_name;
            $this->last_name = $result->last_name;
            $this->email = $result->email;
            $this->password = $result->password;
            $this->photo = $result->photo;

            return true;
        } catch (PDOException $e) {
            $this->errorMessage = "Erro ao buscar o registro: {$e->getMessage()}";
            return false;
        }
    }

    public function findById(int $id): bool
    {
        $sql = "SELECT * FROM users WHERE id = :id";
        $stmt = Connect::getInstance()->prepare($sql);
        $stmt->bindValue(":id", $id);

        try {
            $stmt->execute();
            $result = $stmt->fetch();
            if (!$result) {
                return false;
            }
            $this->id = $result->id;
            $this->idType = $result->idType;
            $this->first_name = $result->first_name;
            $this->last_name = $result->last_name;
            $this->email = $result->email;
            $this->password = $result->password;
            $this->photo = $result->photo;

            return true;
        } catch (PDOException $e) {
            $this->errorMessage = "Erro ao buscar o registro: {$e->getMessage()}";
            return false;
        }
    }

    public function updatePassword(): bool
    {
        if (!$this->id) {
            $this->errorMessage = "ID do usuário é obrigatório";
            return false;
        }

        $sql = "UPDATE users SET password = :password WHERE id = :id";
        $stmt = Connect::getInstance()->prepare($sql);
        $stmt->bindValue(":password", $this->password);
        $stmt->bindValue(":id", $this->id);

        try {
            return $stmt->execute();
        } catch (PDOException $e) {
            $this->errorMessage = "Erro ao atualizar senha: {$e->getMessage()}";
            return false;
        }
    }

    public function getName(): string
    {
        return trim($this->first_name . ' ' . $this->last_name);
    }
}
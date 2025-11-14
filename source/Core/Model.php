<?php

namespace Source\Core;

use PDO;
use PDOException;

abstract class Model
{
    protected $table;
    protected $errorMessage;
    protected $primaryKey = "id";
    protected $id;

    public function getErrorMessage(): ?string
    {
        return $this->errorMessage;
    }

    public function findAll(): array
    {
        $sql = "SELECT * FROM {$this->table}";
        $stmt = Connect::getInstance()->prepare($sql);
        try {
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_CLASS, static::class);
        } catch (PDOException $e) {
            $this->errorMessage = "Erro ao buscar os registros: {$e->getMessage()}";
            return [];
        }
    }

    public function findById(int $id)
    {
        $sql = "SELECT * FROM {$this->table} WHERE {$this->primaryKey} = :id";
        $stmt = Connect::getInstance()->prepare($sql);
        $stmt->bindValue(":id", $id);

        try {
            $stmt->execute();
            $result = $stmt->fetchObject(static::class);
            if (!$result) {
                return null;
            }
            return $result;
        } catch (PDOException $e) {
            $this->errorMessage = "Erro ao buscar o registro: {$e->getMessage()}";
            return null;
        }
    }

    public function insert(): bool
    {
        $properties = get_object_vars($this);
        unset($properties['table'], $properties['errorMessage'], $properties['primaryKey'], $properties['id']);

        $columns = implode(", ", array_keys($properties));
        $values = ":" . implode(", :", array_keys($properties));

        $sql = "INSERT INTO {$this->table} ({$columns}) VALUES ({$values})";
        $stmt = Connect::getInstance()->prepare($sql);

        foreach ($properties as $key => &$value) {
            $stmt->bindValue(":{$key}", $value);
        }

        try {
            $stmt->execute();
            $this->id = Connect::getInstance()->lastInsertId();
            return true;
        } catch (PDOException $e) {
            $this->errorMessage = "Erro ao inserir o registro: {$e->getMessage()}";
            return false;
        }
    }

    public function updateById(): bool
    {
        $properties = get_object_vars($this);

        unset($properties['table'], $properties['errorMessage'], $properties['primaryKey'], $properties['id']);

        $setClauses = [];
        foreach ($properties as $key => $value) {
            if ($value !== null) {
                $setClauses[] = "{$key} = :{$key}";
            }
        }

        if (empty($setClauses)) {
            $this->errorMessage = "Nenhum dado para atualizar";
            return false;
        }

        $set = implode(", ", $setClauses);
        $sql = "UPDATE {$this->table} SET {$set} WHERE {$this->primaryKey} = :id";

        $stmt = Connect::getInstance()->prepare($sql);
        $stmt->bindValue(":id", $this->id);

        foreach ($properties as $key => $value) {
            if ($value !== null) {
                $stmt->bindValue(":{$key}", $value);
            }
        }

        try {
            return $stmt->execute();
        } catch (\PDOException $e) {
            $this->errorMessage = "Erro ao atualizar o registro: " . $e->getMessage();
            return false;
        }
    }

}
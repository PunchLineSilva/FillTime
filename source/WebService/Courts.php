<?php

namespace Source\WebService;

use Source\Models\Court;
use Source\Core\Connect;
use Sorfabiosantos\Uploader\Uploader;

class Courts extends Api
{
    public function listCourts(): void
    {
        $courts = new Court();
        $this->call(200, "success", "Lista de quadras", "success")
            ->back($courts->findAll());
    }

    public function listCourtById(array $data): void
    {
        if (!isset($data["id"])) {
            $this->call(400, "bad_request", "ID inválido", "error")->back();
            return;
        }

        if (!filter_var($data["id"], FILTER_VALIDATE_INT)) {
            $this->call(400, "bad_request", "ID inválido", "error")->back();
            return;
        }

        $court = new Court();
        if (!$court->findById($data["id"])) {
            $this->call(200, "success", "Quadra não encontrada", "error")->back();
            return;
        }

        $response = [
            "id" => $court->getId(),
            "name" => $court->getName(),
            "type" => $court->getType(),
            "hours" => $court->getHours(),
            "price" => $court->getPrice(),
            "image" => $court->getImage()
        ];

        $this->call(200, "success", "Quadra encontrada com sucesso", "success")->back($response);
    }

    public function createCourt(): void
{
    try {
        $pdo = \Source\Core\Connect::getConnection();

        $data = $_POST;
        $imagePath = null;

        if (
            !isset($data['name']) 
            || !isset($data['hours']) 
            || !isset($data['type']) 
            || !isset($data['price'])
        ) {
            $this->call(400, "bad_request", "Todos os campos são obrigatórios", "error")->back();
            return;
        }

        // Processa upload de imagem se existir
        if (!empty($_FILES["image"])) {
            $uploader = new Uploader("storage");
            $path = $uploader->Image($_FILES["image"], str_replace(' ', '-', $data['name']) . "-court");
            if (!$path) {
                $this->call(400, "bad_request", $uploader->getMessage(), "error")->back();
                return;
            }
            $imagePath = "storage/images/" . $path;
        }

        $stmt = $pdo->prepare("
            INSERT INTO courts (name, hours, type, price, image)
            VALUES (:name, :hours, :type, :price, :image)
        ");

        $stmt->execute([
            ':name'  => $data['name'],
            ':hours' => (int)$data['hours'],
            ':type'  => $data['type'],
            ':price' => (float)$data['price'],
            ':image' => $imagePath
        ]);

        $this->call(201, "created", "Quadra criada com sucesso", "success")->back();
    } catch (\PDOException $e) {
        $this->call(500, "internal_server_error", $e->getMessage(), "error")->back();
    }
}

    public function updateCourt(array $params): void
{
    try {
        $pdo = \Source\Core\Connect::getConnection();
        $id = $params['id'];

        $data = [];

        if (!empty($_POST)) {
            $data = $_POST;
        } else {
            parse_str(file_get_contents("php://input"), $data);
        }

        if (
            !isset($data['name']) 
            || !isset($data['hours']) 
            || !isset($data['type']) 
            || !isset($data['price'])
        ) {
            $this->call(400, "bad_request", "Todos os campos são obrigatórios", "error")->back();
            return;
        }

        $imagePath = null;

        // Processa upload de imagem se existir
        if (!empty($_FILES["image"])) {
            $uploader = new Uploader("storage");
            $path = $uploader->Image($_FILES["image"], str_replace(' ', '-', $data['name']) . "-court");
            if (!$path) {
                $this->call(400, "bad_request", $uploader->getMessage(), "error")->back();
                return;
            }
            $imagePath = "storage/images/" . $path;
        }

        $stmt = $pdo->prepare("
            UPDATE courts
            SET name = :name,
                hours = :hours,
                type = :type,
                price = :price" . 
                ($imagePath ? ", image = :image" : "") . "
            WHERE id = :id
        ");

        $params = [
            ':name'  => $data['name'],
            ':hours' => (int)$data['hours'],
            ':type'  => $data['type'],
            ':price' => (float)$data['price'],
            ':id'    => $id
        ];

        if ($imagePath) {
            $params[':image'] = $imagePath;
        }

        $stmt->execute($params);

        $this->call(200, "success", "Quadra atualizada com sucesso", "success")->back();
    } catch (\PDOException $e) {
        $this->call(500, "internal_server_error", $e->getMessage(), "error")->back();
    }
}
    public function deleteCourt(array $params): void
{
    try {
        $pdo = \Source\Core\Connect::getConnection();
        $id = $params['id'];

        // Busca a quadra para remover a imagem se existir
        $court = new Court();
        if ($court->findById($id)) {
            $imagePath = $court->getImage();
            if ($imagePath && file_exists(__DIR__ . "/../../" . $imagePath)) {
                unlink(__DIR__ . "/../../" . $imagePath);
            }
        }

        $stmt = $pdo->prepare("DELETE FROM courts WHERE id = :id");
        $stmt->execute([':id' => $id]);

        $this->call(200, "success", "Quadra deletada com sucesso", "success")->back();
    } catch (\PDOException $e) {
        $this->call(500, "internal_server_error", $e->getMessage(), "error")->back();
    }
}
}

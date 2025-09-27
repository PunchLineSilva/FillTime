<?php

namespace Source\WebService;

use Source\Models\User;
use Source\Core\JWTToken;
use SorFabioSantos\Uploader\Uploader;

require_once __DIR__ . "/../Core/Config.php";

class Users extends Api
{

    public function me(): void
    {
        $this->auth();

        $userId = $this->userAuth->id ?? null;
        if (!$userId) {
            $this->call(401, "unauthorized", "Token inválido ou expirado", "error")->back();
            return;
        }

        $user = (new User())->findById($userId);
        if (!$user) {
            $this->call(404, "not_found", "Usuário não encontrado", "error")->back();
            return;
        }

        $photoUrl = null;
        if ($user->getPhoto()) {
            $photoUrl = "http://localhost/FillTime" . $user->getPhoto();
        }

        $response = [
            "id" => $user->getId(),
            "name" => $user->getFirstName(),
            "email" => $user->getEmail(),
            "photo" => $photoUrl
        ];

        $this->call(200, "success", "Dados do usuário logado", "success")
            ->back($response);
    }


    public function listUsers(): void
    {
        $users = new User();
        $this->call(200, "success", "Lista de usuários", "success")
            ->back($users->findAll());
    }

    public function createUser(array $data)
    {
        $user = new User(
            null,
            $data["idType"] ?? 2,
            $data["first_name"] ?? null,
            $data["last_name"] ?? null,
            $data["email"] ?? null,
            $data["password"] ?? null
        );

        if (!empty($_FILES["photo"])) {
            $uploader = new Uploader("storage");
            $path = $uploader->Image($_FILES["photo"], str_replace(' ', '-', $user->getFirstName()) . "-photo");
            if (!$path) {
                $this->call(400, "bad_request", $uploader->getMessage(), "error")->back();
                return;
            }
            $user->setPhoto($path);
        }

        if (!$user->insert()) {
            $this->call(500, "internal_server_error", $user->getErrorMessage(), "error")->back();
            return;
        }

        $response = [
            "name" => $user->getFirstName(),
            "email" => $user->getEmail(),
            "photo" => $user->getPhoto()
        ];

        $this->call(201, "created", "Usuário criado com sucesso", "success")->back($response);
    }

    public function listUserById(array $data): void
    {
        if (!isset($data["id"])) {
            $this->call(400, "bad_request", "ID inválido", "error")->back();
            return;
        }

        if (!filter_var($data["id"], FILTER_VALIDATE_INT)) {
            $this->call(400, "bad_request", "ID inválido", "error")->back();
            return;
        }

        $user = new User();
        if (!$user->findById($data["id"])) {
            $this->call(200, "success", "Usuário não encontrado", "error")->back();
            return;
        }
        $response = [
            "name" => $user->getFirstName(),
            "email" => $user->getEmail()
        ];
        $this->call(200, "success", "Encontrado com sucesso", "success")->back($response);
    }

    public function login(): void
    {
        if (empty($this->headers["email"]) || empty($this->headers["password"])) {
            $this->call(400, "bad_request", "Credenciais inválidas", "error")->back();
            return;
        }

        $user = new User();

        if (!$user->findByEmail($this->headers["email"])) {
            $this->call(401, "unauthorized", "Usuário não encontrado", "error")->back();
            return;
        }

        if (!password_verify($this->headers["password"], $user->getPassword())) {
            $this->call(401, "unauthorized", "Senha inválida", "error")->back();
            return;
        }

        error_log("=== DEBUG LOGIN ===");
        error_log("User ID: " . $user->getId());
        error_log("User Email: " . $user->getEmail());
        error_log("User Name: " . $user->getFirstName());

        $jwt = new JWTToken();
        $token = $jwt->create([
            "id" => $user->getId(),
            "email" => $user->getEmail(),
            "name" => $user->getFirstName(),
            "photo" => $user->getPhoto()
        ]);

        $this->call(200, "success", "Login realizado com sucesso", "success")
            ->back([
                "token" => $token,
                "user" => [
                    "id" => $user->getId(),
                    "name" => $user->getFirstName(),
                    "email" => $user->getEmail(),
                    "photo" => $user->getPhoto()
                ]
            ]);
    }

    public function updateUser(): void
    {
        $this->auth();

        error_log("=== DEBUG TOKEN ===");
        error_log("Token decodificado: " . print_r($this->userAuth, true));
        error_log("Tipo de userAuth: " . gettype($this->userAuth));
        if (is_object($this->userAuth)) {
            error_log("Propriedades do userAuth: " . implode(', ', get_object_vars($this->userAuth)));
        }
        
        if (!isset($this->userAuth->id) || empty($this->userAuth->id)) {
            error_log("Estrutura do token inválida - id não encontrado ou vazio");
            error_log("Dados disponíveis no token: " . print_r($this->userAuth, true));
            
            $userId = 38;
            error_log("USANDO ID TEMPORÁRIO: " . $userId);
        } else {
            $userId = $this->userAuth->id;
            error_log("ID do usuário extraído: " . $userId);
        }
        
        $user = new User();
        if (!$user->findById($userId)) {
            error_log("Usuário não encontrado com ID: " . $userId);
            http_response_code(404);
            echo json_encode([
                "status" => "error",
                "message" => "Usuário não encontrado"
            ]);
            return;
        }
        
        error_log("Usuário encontrado: ID=" . $user->getId() . ", Name=" . $user->getFirstName() . ", Email=" . $user->getEmail());

        $name = filter_var($_POST['name'] ?? '', FILTER_SANITIZE_SPECIAL_CHARS);
        $email = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);
        $photoFile = (!empty($_FILES["photo"]["name"]) ? $_FILES["photo"] : null);
        
        error_log("=== DEBUG UPLOAD ===");
        error_log("FILES data: " . print_r($_FILES, true));
        error_log("Photo file: " . print_r($photoFile, true));

        if (!$name || !$email) {
            http_response_code(400);
            echo json_encode([
                "status" => "error",
                "message" => "Por favor, preencha nome e e-mail"
            ]);
            return;
        }

        $user->setFirstName($name);
        $user->setEmail($email);

        if ($photoFile) {
            error_log("=== DEBUG PHOTO UPLOAD ===");
            error_log("Arquivo recebido: " . print_r($photoFile, true));
            
            $storageDir = __DIR__ . "/../../storage";
            $imagesDir = $storageDir . "/images";
            
            if (!is_dir($storageDir)) {
                mkdir($storageDir, 0755, true);
                error_log("Diretório storage criado: " . $storageDir);
            }
            
            if (!is_dir($imagesDir)) {
                mkdir($imagesDir, 0755, true);
                error_log("Diretório images criado: " . $imagesDir);
            }
            
            $oldPhoto = $user->getPhoto();
            if ($oldPhoto && file_exists(__DIR__ . "/../../" . $oldPhoto)) {
                error_log("Removendo foto antiga: " . $oldPhoto);
                unlink(__DIR__ . "/../../" . $oldPhoto);
            }

            $upload = new Uploader("storage");
            $safeName = preg_replace('/[^a-zA-Z0-9-_]/', '-', $user->getFirstName());
            
            if (!isset($photoFile['tmp_name']) || !is_uploaded_file($photoFile['tmp_name'])) {
                error_log("Arquivo inválido ou não foi enviado corretamente");
                http_response_code(400);
                echo json_encode([
                    "status" => "error",
                    "message" => "Arquivo inválido ou não foi enviado corretamente"
                ]);
                return;
            }
            
            $path = $upload->Image($photoFile, $safeName . "-photo-" . time());
            
            error_log("Resultado do upload: " . ($path ? $path : "FALHOU"));
            
            if (!$path) {
                error_log("Erro no upload: Falha ao fazer upload da imagem");
                http_response_code(400);
                echo json_encode([
                    "status" => "error",
                    "message" => "Erro no upload da imagem. Verifique se o arquivo é uma imagem válida."
                ]);
                return;
            }

            $fullPath = "storage/images/" . $path;
            $user->setPhoto($fullPath);
            error_log("Foto definida no usuário: " . $user->getPhoto());
        }

        try {
            $connection = \Source\Core\Connect::getInstance();
            if (!$connection) {
                throw new \Exception("Conexão com banco de dados falhou");
            }
            error_log("Conexão com banco de dados estabelecida com sucesso");
        } catch (\Exception $e) {
            error_log("Erro de conexão: " . $e->getMessage());
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Erro de conexão com banco de dados: " . $e->getMessage()
            ]);
            return;
        }

        error_log("=== DEBUG UPDATE ===");
        error_log("Dados antes da atualização: ID=" . $user->getId() . ", Name=" . $user->getFirstName() . ", Email=" . $user->getEmail() . ", Photo=" . $user->getPhoto());

        try {
            if (!$user->updateById()) {
                error_log("Erro ao atualizar usuário: " . $user->getErrorMessage());
                error_log("Dados do usuário: ID=" . $user->getId() . ", Name=" . $user->getFirstName() . ", Email=" . $user->getEmail());
                
                http_response_code(500);
                echo json_encode([
                    "status" => "error",
                    "message" => $user->getErrorMessage() ?: "Erro ao atualizar usuário no banco de dados"
                ]);
                return;
            }

            error_log("Usuário atualizado com sucesso no banco de dados");
        } catch (Exception $e) {
            error_log("Exceção ao atualizar usuário: " . $e->getMessage());
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Erro interno do servidor: " . $e->getMessage()
            ]);
            return;
        }

        $jwt = new JWTToken();
        $token = $jwt->create([
            "id" => $user->getId(),
            "email" => $user->getEmail(),
            "name" => $user->getFirstName(),
            "photo" => $user->getPhoto()
        ]);

        $photoUrl = null;
        if ($user->getPhoto()) {
            $photoPath = $user->getPhoto();
            if (!str_starts_with($photoPath, '/')) {
                $photoPath = '/' . $photoPath;
            }
            $photoUrl = "http://localhost/FillTime" . $photoPath;
            error_log("URL da foto construída: " . $photoUrl);
        }

        http_response_code(200);
        echo json_encode([
            "status" => "success",
            "message" => "Dados atualizados com sucesso!",
            "token" => $token,
            "user" => [
                "name" => $user->getFirstName(),
                "email" => $user->getEmail(),
                "photo" => $photoUrl
            ]
        ]);
    }

}
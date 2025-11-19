<?php

require __DIR__ . "/../vendor/autoload.php";

use Source\Models\User;
use Source\Core\Connect;

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método não permitido']);
    exit;
}

try {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($input['token']) || empty($input['token'])) {
        throw new Exception('Token é obrigatório');
    }
    
    if (!isset($input['password']) || empty($input['password'])) {
        throw new Exception('Senha é obrigatória');
    }
    
    if (strlen($input['password']) < 6) {
        throw new Exception('A senha deve ter pelo menos 6 caracteres');
    }
    
    $token = $input['token'];
    $password = $input['password'];
    
    $conn = Connect::getInstance();
    $stmt = $conn->prepare("
        SELECT prt.*, u.id as user_id, u.email, u.first_name, u.last_name 
        FROM password_reset_tokens prt 
        JOIN users u ON prt.user_id = u.id 
        WHERE prt.token = ? AND prt.expires_at > NOW()
        ORDER BY prt.created_at DESC 
        LIMIT 1
    ");
    
    $stmt->execute([$token]);
    $tokenData = $stmt->fetch(PDO::FETCH_OBJ);
    
    if (!$tokenData) {
        throw new Exception('Token inválido ou expirado');
    }
    
    $user = new User();
    $user->setId($tokenData->user_id);
    $user->setPassword(password_hash($password, PASSWORD_DEFAULT));
    
    if (!$user->updatePassword()) {
        throw new Exception('Erro ao atualizar senha');
    }
    
    $stmt = $conn->prepare("DELETE FROM password_reset_tokens WHERE token = ?");
    $stmt->execute([$token]);
    
    echo json_encode([
        'success' => true, 
        'message' => 'Senha redefinida com sucesso!'
    ]);
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false, 
        'message' => $e->getMessage()
    ]);
}


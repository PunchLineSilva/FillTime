<?php

require __DIR__ . "/../vendor/autoload.php";

use Source\Core\EmailService;
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
    
    if (!isset($input['email']) || empty($input['email'])) {
        throw new Exception('E-mail é obrigatório');
    }
    
    $email = filter_var($input['email'], FILTER_VALIDATE_EMAIL);
    if (!$email) {
        throw new Exception('E-mail inválido');
    }
    
    $user = new User();
    $userFound = $user->findByEmail($email);
    
    if (!$userFound) {
        echo json_encode([
            'success' => true, 
            'message' => 'Se o e-mail estiver cadastrado, você receberá um link de recuperação.'
        ]);
        exit;
    }
    
    $resetToken = bin2hex(random_bytes(32));
    $expiresAt = date('Y-m-d H:i:s', strtotime('+1 hour'));
    
    $conn = Connect::getInstance();
    $stmt = $conn->prepare("
        INSERT INTO password_reset_tokens (user_id, token, expires_at, created_at) 
        VALUES (?, ?, ?, NOW())
        ON DUPLICATE KEY UPDATE 
        token = VALUES(token), 
        expires_at = VALUES(expires_at), 
        created_at = NOW()
    ");
    
    $stmt->execute([$user->getId(), $resetToken, $expiresAt]);
    
    $emailService = new EmailService();
    $emailService->sendPasswordRecoveryEmail(
        $email,
        $user->getFirstName() . ' ' . $user->getLastName(),
        $resetToken
    );
    
    echo json_encode([
        'success' => true, 
        'message' => 'E-mail de recuperação enviado com sucesso!'
    ]);
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false, 
        'message' => $e->getMessage()
    ]);
}


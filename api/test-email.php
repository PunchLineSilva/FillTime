<?php

require __DIR__ . "/../vendor/autoload.php";

use Source\Core\EmailService;

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
    
    error_log("Teste de e-mail iniciado para: " . $email);
    
    $emailService = new EmailService();
    
    $result = $emailService->sendPasswordRecoveryEmail(
        $email, 
        'Usuário Teste', 
        'teste-token-' . time()
    );
    
    if ($result) {
        error_log("E-mail de recuperação enviado com sucesso para: " . $email);
        echo json_encode([
            'success' => true, 
            'message' => 'E-mail de teste enviado com sucesso! Verifique sua caixa de entrada e spam.',
            'debug' => [
                'email' => $email,
                'timestamp' => date('Y-m-d H:i:s'),
                'server' => $_SERVER['SERVER_NAME'] ?? 'localhost'
            ]
        ]);
    } else {
        throw new Exception('Falha ao enviar e-mail');
    }
    
} catch (Exception $e) {
    error_log("Erro no teste de e-mail: " . $e->getMessage());
    http_response_code(400);
    echo json_encode([
        'success' => false, 
        'message' => $e->getMessage(),
        'debug' => [
            'timestamp' => date('Y-m-d H:i:s'),
            'server' => $_SERVER['SERVER_NAME'] ?? 'localhost'
        ]
    ]);
}


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
    
    if (!isset($input['name']) || empty($input['name'])) {
        throw new Exception('Nome é obrigatório');
    }
    
    if (!isset($input['email']) || empty($input['email'])) {
        throw new Exception('E-mail é obrigatório');
    }
    
    if (!isset($input['message']) || empty($input['message'])) {
        throw new Exception('Mensagem é obrigatória');
    }
    
    $email = filter_var($input['email'], FILTER_VALIDATE_EMAIL);
    if (!$email) {
        throw new Exception('E-mail inválido');
    }
    
    $name = trim($input['name']);
    $email = trim($input['email']);
    $phone = isset($input['phone']) ? trim($input['phone']) : '';
    $subject = isset($input['subject']) ? trim($input['subject']) : 'Contato via Site';
    $message = trim($input['message']);
    
    $subjectMap = [
        'sales' => 'Vendas',
        'support' => 'Suporte Técnico',
        'billing' => 'Financeiro',
        'partnership' => 'Parcerias',
        'other' => 'Outros'
    ];
    
    $subjectText = isset($subjectMap[$subject]) ? $subjectMap[$subject] : 'Contato via Site';
    
    $emailService = new EmailService();
    $emailService->sendContactEmail($name, $email, $subjectText, $message);
    
    echo json_encode([
        'success' => true, 
        'message' => 'Mensagem enviada com sucesso! Entraremos em contato em breve.'
    ]);
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false, 
        'message' => $e->getMessage()
    ]);
}



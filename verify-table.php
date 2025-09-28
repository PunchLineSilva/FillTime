<?php

require __DIR__ . "/vendor/autoload.php";

use Source\Core\Connect;

echo "=== VERIFICANDO TABELA PASSWORD_RESET_TOKENS ===\n";

try {
    $conn = Connect::getInstance();
    
    $stmt = $conn->query("SHOW TABLES LIKE 'password_reset_tokens'");
    $table = $stmt->fetch();
    
    if ($table) {
        echo "✅ Tabela 'password_reset_tokens' criada com sucesso!\n";
        
        $stmt = $conn->query("DESCRIBE password_reset_tokens");
        $columns = $stmt->fetchAll(PDO::FETCH_OBJ);
        
        echo "\nEstrutura da tabela:\n";
        foreach ($columns as $column) {
            echo "- {$column->Field}: {$column->Type}\n";
        }
        
        echo "\n🎉 Agora você pode testar a recuperação de senha!\n";
        echo "Acesse: http://localhost/FillTime/recuperar-senha\n";
        
    } else {
        echo "❌ Tabela 'password_reset_tokens' ainda não existe!\n";
        echo "Execute o SQL no phpMyAdmin primeiro.\n";
    }
    
} catch (Exception $e) {
    echo "❌ ERRO: " . $e->getMessage() . "\n";
}

echo "\n=== FIM DA VERIFICAÇÃO ===\n";


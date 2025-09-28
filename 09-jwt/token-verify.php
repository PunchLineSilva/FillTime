<form action="">
    <label for="token">Token:</label>
    <input type="text" name="token" id="token">
    <button type="submit">Verificar Token</button>
</form>
<?php

require __DIR__ . '/../vendor/autoload.php';

use Source\Core\JWTToken;


$jwt = new JWTToken();


if (isset($_GET['token'])) {
    $token = $_GET['token'];

    $decoded = $jwt->decode($token);

    if ($decoded) {
        echo "Token decodificado com sucesso:\n";
        var_dump($decoded);
        var_dump($decoded->data);
    } else {
        echo "Falha ao decodificar ou token expirado.\n";
    }

} else {
    die("Token não fornecido.");
}


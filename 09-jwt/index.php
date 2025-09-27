<?php

require __DIR__ . '/../vendor/autoload.php';

use Source\Core\JWTToken;

$jwt = new JWTToken();

$payload = [
    "name" => "Fábio Luís da Silva Santos",
    "email" => "fabiosantos@ifsul.edu.br"
];

$token = $jwt->create($payload);
echo "Token gerado:\n" . $token . "\n\n";



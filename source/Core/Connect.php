<?php

namespace Source\Core;

use PDO;
use PDOException;

const CONF_DB_HOST = "localhost"; // localhost
const CONF_DB_NAME = "db-inf-3at";
const CONF_DB_USER = "root";
const CONF_DB_PASS = "P@5tEl2903"; // nada

abstract class Connect
{
    private const OPTIONS = [
        PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8",
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
        PDO::ATTR_CASE => PDO::CASE_NATURAL
    ];

    private static $instance;

    public static function getInstance(): ?PDO
    {
        if (empty(self::$instance)) {
            try {
                self::$instance = new PDO(
                    "mysql:host=" . CONF_DB_HOST . ";dbname=" . CONF_DB_NAME,
                    CONF_DB_USER,
                    CONF_DB_PASS,
                    self::OPTIONS
                );
                error_log("Conexão com banco de dados estabelecida com sucesso");
            } catch (PDOException $exception) {
                error_log("Erro de conexão com banco de dados: " . $exception->getMessage());
                error_log("Host: " . CONF_DB_HOST . ", DB: " . CONF_DB_NAME . ", User: " . CONF_DB_USER);
                echo "Problemas ao Conectar! ";
                echo $exception->getMessage();
                return null;
            }
        }

        return self::$instance;
    }

    public static function getConnection() {
    $host = 'localhost';
    $db = 'db-inf-3at';
    $user = 'root';
    $pass = 'P@5tEl2903';

    try {
        return new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ]);
    } catch (PDOException $e) {
        die("Erro na conexão: " . $e->getMessage());
    }
}

    final private function __construct()
    {
    }

    private function __clone()
    {
    }
}

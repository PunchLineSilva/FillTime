<?php

const CONF_DB_HOST = "localhost";
const CONF_DB_NAME = "db-inf-3at";
const CONF_DB_USER = "root";
const CONF_DB_PASSWORD = "P@5tEl2903";

const IMAGE_DIR = "/storage/images";
const FILE_DIR = "/storage/files";
const IMAGE_MAX_SIZE = 5 * 1024 * 1024;
const IMAGE_MIN_SIZE = 1024;
const FILE_MAX_SIZE = 10 * 1024 * 1024;
const FILE_MIN_SIZE = 1024;

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
const ALLOWED_FILE_TYPES = ['application/pdf', 'text/plain'];

const IMAGE_SIZE_ERROR_MESSAGE = "Tamanho da imagem deve estar entre {0} e {1}";
const IMAGE_TYPE_ERROR_MESSAGE = "Tipo de arquivo não permitido para imagem";
const IMAGE_MOVE_ERROR_MESSAGE = "Erro ao mover arquivo de imagem";
const FILE_SIZE_ERROR_MESSAGE = "Tamanho do arquivo deve estar entre {0} e {1}";
const FILE_TYPE_ERROR_MESSAGE = "Tipo de arquivo não permitido";
const FILE_MOVE_ERROR_MESSAGE = "Erro ao mover arquivo";
<?php

namespace Source\Core;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use \DateTimeImmutable;
use \Exception;

class JWTToken
{
    private $secretKey = "sequencia_que_ninguém_conhece";
    private $headerJWT = "HS512";
    private $url = "http://localhost/FillTime";

    public function create($payLoad): string
    {
        $tokenId    = base64_encode(random_bytes(16));
        $issuedAt   = new DateTimeImmutable();
        $expire     = $issuedAt->modify('+90 minutes')->getTimestamp(); 

        $data = [
            'iat'  => $issuedAt->getTimestamp(),
            'jti'  => $tokenId,                 
            'iss'  => $this->url,               
            'nbf'  => $issuedAt->getTimestamp(),
            'exp'  => $expire,  
            'data' => $payLoad
        ];

        return JWT::encode(
            $data,
            $this->secretKey,
            $this->headerJWT 
        );
    }

    public function decode($token): bool | object
    {
        try {
            $token = JWT::decode($token, new Key($this->secretKey, $this->headerJWT));
            $now = new DateTimeImmutable();
            $serverName = $this->url;

            if ($token->iss !== $serverName || $token->nbf > $now->getTimestamp() || $token->exp < $now->getTimestamp())
            {
                return false;
            }
            return $token;
        } catch (Exception) {
            return false;
        }
    }

}

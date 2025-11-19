<?php

namespace Source\Models\ValueObjects;

use InvalidArgumentException;

class DocumentCPF
{
    private string $cpf;

    public function __construct(string $cpf)
    {
        if(!empty($cpf)){
            $this->validate($cpf);
        }
        $this->cpf = $cpf;
    }

    private function validate(string $cpf): void
    {
        $cpf = preg_replace('/[^0-9]/is', '', $cpf);

        if (strlen($cpf) !== 11) {
            throw new InvalidArgumentException("CPF inválido!");
        }

    }

    public function __toString(): string
    {
        return $this->cpf;
    }

}
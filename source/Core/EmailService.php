<?php

namespace Source\Core;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

class EmailService
{
    private $mailer;
    
    public function __construct()
    {
        $this->mailer = new PHPMailer(true);
        $this->configureSMTP();
    }
    
    private function configureSMTP()
    {
        try {
            // Configurações do servidor
            $this->mailer->isSMTP();
            $this->mailer->Host = EmailConfig::SMTP_HOST;
            $this->mailer->SMTPAuth = true;
            $this->mailer->Username = EmailConfig::SMTP_USERNAME;
            $this->mailer->Password = EmailConfig::SMTP_PASSWORD;
            $this->mailer->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $this->mailer->Port = EmailConfig::SMTP_PORT;
            $this->mailer->CharSet = 'UTF-8';
            
            $this->mailer->SMTPDebug = 0;
            $this->mailer->Debugoutput = 'error_log';
            $this->mailer->SMTPKeepAlive = true;
            $this->mailer->Timeout = 60;
            
            $this->mailer->setFrom(EmailConfig::SMTP_FROM_EMAIL, EmailConfig::SMTP_FROM_NAME);
        } catch (Exception $e) {
            throw new Exception("Erro ao configurar SMTP: {$e->getMessage()}");
        }
    }
    
    public function sendPasswordRecoveryEmail($userEmail, $userName, $resetToken)
    {
        try {
            $this->mailer->clearAddresses();
            $this->mailer->addAddress($userEmail, $userName);
            
            $this->mailer->isHTML(true);
            $this->mailer->Subject = 'Recuperação de Senha - FillTime';
            
            $resetLink = "http://localhost/FillTime/redefinir-senha?token=" . $resetToken;
            
            $this->mailer->Body = $this->getPasswordRecoveryTemplate($userName, $resetLink);
            $this->mailer->AltBody = "Olá {$userName},\n\nPara redefinir sua senha, acesse o link: {$resetLink}\n\nEste link expira em 1 hora.\n\nSe você não solicitou esta recuperação, ignore este e-mail.";
            
            return $this->mailer->send();
        } catch (Exception $e) {
            throw new Exception("Erro ao enviar e-mail de recuperação: {$e->getMessage()}");
        }
    }
    
    public function sendContactEmail($name, $email, $subject, $message)
    {
        try {
            $this->mailer->clearAddresses();
            $this->mailer->addAddress(EmailConfig::SAC_EMAIL, 'SAC FillTime');
            $this->mailer->addReplyTo($email, $name);
            
            $this->mailer->isHTML(true);
            $this->mailer->Subject = "Contato via Site: {$subject}";
            
            $this->mailer->Body = $this->getContactTemplate($name, $email, $subject, $message);
            $this->mailer->AltBody = "Nome: {$name}\nE-mail: {$email}\nAssunto: {$subject}\n\nMensagem:\n{$message}";
            
            return $this->mailer->send();
        } catch (Exception $e) {
            throw new Exception("Erro ao enviar e-mail de contato: {$e->getMessage()}");
        }
    }
    
    private function getPasswordRecoveryTemplate($userName, $resetLink)
    {
        return "
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset='UTF-8'>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #007bff; color: white; padding: 20px; text-align: center; }
                .content { padding: 20px; background: #f9f9f9; }
                .button { display: inline-block; background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h1>FillTime</h1>
                    <h2>Recuperação de Senha</h2>
                </div>
                <div class='content'>
                    <p>Olá <strong>{$userName}</strong>,</p>
                    <p>Recebemos uma solicitação para redefinir a senha da sua conta no FillTime.</p>
                    <p>Para criar uma nova senha, clique no botão abaixo:</p>
                    <p style='text-align: center;'>
                        <a href='{$resetLink}' class='button'>Redefinir Senha</a>
                    </p>
                    <p><strong>Importante:</strong></p>
                    <ul>
                        <li>Este link expira em <strong>1 hora</strong></li>
                        <li>Se você não solicitou esta recuperação, ignore este e-mail</li>
                        <li>Sua senha atual permanece inalterada até que você a redefina</li>
                    </ul>
                </div>
                <div class='footer'>
                    <p>Este é um e-mail automático, não responda.</p>
                    <p>&copy; 2025 FillTime. Todos os direitos reservados.</p>
                </div>
            </div>
        </body>
        </html>";
    }
    
    private function getContactTemplate($name, $email, $subject, $message)
    {
        return "
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset='UTF-8'>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #007bff; color: white; padding: 20px; text-align: center; }
                .content { padding: 20px; background: #f9f9f9; }
                .info { background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #007bff; }
                .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h1>FillTime</h1>
                    <h2>Nova Mensagem de Contato</h2>
                </div>
                <div class='content'>
                    <div class='info'>
                        <strong>Nome:</strong> {$name}<br>
                        <strong>E-mail:</strong> {$email}<br>
                        <strong>Assunto:</strong> {$subject}
                    </div>
                    <div class='info'>
                        <strong>Mensagem:</strong><br>
                        " . nl2br(htmlspecialchars($message)) . "
                    </div>
                    <p><strong>Para responder:</strong> Clique em 'Responder' ou envie um e-mail para {$email}</p>
                </div>
                <div class='footer'>
                    <p>Mensagem enviada através do formulário de contato do site FillTime.</p>
                    <p>&copy; 2025 FillTime. Todos os direitos reservados.</p>
                </div>
            </div>
        </body>
        </html>";
    }
}


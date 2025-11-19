<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/png" href="assets/web/images/logo.png">
  <title>Recuperar Senha | FillTime</title>
  <link rel="stylesheet" href="assets/web/css/login.css">
  <link rel="stylesheet" href="assets/_shared/css/toast.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap">
</head>
<body class="auth-page">
  <div class="auth-container">
    <div class="auth-card">
      <div class="auth-header">
        <div class="logo">
          <span class="logo-icon"></span>
          <a href="/FillTime/"><h1>FillTime</h1></a>
        </div>
        <h2>Recuperar Senha</h2>
        <p>Digite seu e-mail para receber um link de recuperação</p>
      </div>
      
      <form class="auth-form" id="formResetPassword">
        <div class="form-group">
          <label for="email">E-mail</label>
          <input type="email" id="email" name="email" placeholder="seu@email.com" required>
        </div>
        
        <button type="submit" class="btn btn-primary btn-full">Enviar Link de Recuperação</button>
      </form>
      
      <div class="auth-footer">
        <p>Lembrou da senha? <a href="/FillTime/login">Voltar ao Login</a></p>
      </div>
    </div>
    
    <div class="auth-info">
      <div class="auth-info-content">
        <h2>Recuperação Segura</h2>
        <p>Enviamos um link seguro para o seu e-mail para que você possa redefinir sua senha de forma segura.</p>
        
        <div class="auth-features">
          <div class="auth-feature">
            <div class="feature-icon"></div>
            <div class="feature-text">
              <h3>Processo Seguro</h3>
              <p>O link de recuperação expira em 1 hora para sua segurança.</p>
            </div>
          </div>
          
          <div class="auth-feature">
            <div class="feature-icon"></div>
            <div class="feature-text">
              <h3>Verificação de E-mail</h3>
              <p>Certifique-se de que o e-mail está correto para receber o link.</p>
            </div>
          </div>
          
          <div class="auth-feature">
            <div class="feature-icon"></div>
            <div class="feature-text">
              <h3>Suporte 24/7</h3>
              <p>Se tiver problemas, entre em contato conosco pelo formulário de contato.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script>
    document.getElementById('formResetPassword').addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const email = document.getElementById('email').value;
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      submitBtn.textContent = 'Enviando...';
      submitBtn.disabled = true;
      
      try {
        const response = await fetch('/FillTime/api/password-recovery.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email })
        });
        
        const data = await response.json();
        
        if (data.success) {
          if (typeof Toast !== 'undefined') {
            Toast.success('E-mail de recuperação enviado! Verifique sua caixa de entrada.');
          } else {
            alert('E-mail de recuperação enviado! Verifique sua caixa de entrada.');
          }
          
          document.getElementById('email').value = '';
        } else {
          if (typeof Toast !== 'undefined') {
            Toast.error(data.message || 'Erro ao enviar e-mail de recuperação.');
          } else {
            alert(data.message || 'Erro ao enviar e-mail de recuperação.');
          }
        }
      } catch (error) {
        console.error('Erro:', error);
        if (typeof Toast !== 'undefined') {
          Toast.error('Erro de conexão. Tente novamente.');
        } else {
          alert('Erro de conexão. Tente novamente.');
        }
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  </script>
  
  <script src="assets/_shared/js/Toast.js"></script>
</body>
</html>


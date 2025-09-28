<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/png" href="assets/web/images/logo.png">
  <title>Teste de E-mail | FillTime</title>
  <link rel="stylesheet" href="assets/web/css/login.css">
  <link rel="stylesheet" href="assets/_shared/css/toast.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap">
  <script type="module" src="assets/_shared/js/Toast.js" async></script>
</head>
<body class="auth-page">
  <div class="auth-container">
    <div class="auth-card">
      <div class="auth-header">
        <div class="logo">
          <span class="logo-icon"></span>
          <a href="/FillTime/"><h1>FillTime</h1></a>
        </div>
        <h2>Teste de E-mail</h2>
        <p>Teste o sistema de envio de e-mails</p>
      </div>
      
      <form class="auth-form" id="formTestEmail">
        <div class="form-group">
          <label for="email">E-mail para Teste</label>
          <input type="email" id="email" name="email" placeholder="seu@email.com" required>
        </div>
        
        <button type="submit" class="btn btn-primary btn-full">Enviar E-mail de Teste</button>
      </form>
      
      <div class="auth-footer">
        <p><a href="/FillTime/login">Voltar ao Login</a></p>
      </div>
    </div>
    
    <div class="auth-info">
      <div class="auth-info-content">
        <h2>Informações do Teste</h2>
        <p>Este teste enviará um e-mail de recuperação de senha para verificar se o sistema está funcionando.</p>
        
        <div class="auth-features">
          <div class="auth-feature">
            <div class="feature-icon"></div>
            <div class="feature-text">
              <h3>Verifique a Caixa de Entrada</h3>
              <p>O e-mail pode demorar alguns minutos para chegar.</p>
            </div>
          </div>
          
          <div class="auth-feature">
            <div class="feature-icon"></div>
            <div class="feature-text">
              <h3>Verifique o Spam</h3>
              <p>Às vezes os e-mails vão para a pasta de spam.</p>
            </div>
          </div>
          
          <div class="auth-feature">
            <div class="feature-icon"></div>
            <div class="feature-text">
              <h3>E-mail Acadêmico</h3>
              <p>E-mails de instituições podem ter restrições.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script>
    document.getElementById('formTestEmail').addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const email = document.getElementById('email').value;
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      // Mostrar loading
      submitBtn.textContent = 'Enviando...';
      submitBtn.disabled = true;
      
      try {
        const response = await fetch('/FillTime/api/test-email.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email })
        });
        
        const data = await response.json();
        
        if (data.success) {
          // Mostrar toast de sucesso
          if (typeof Toast !== 'undefined') {
            Toast.success(data.message);
          } else {
            alert(data.message);
          }
          
          // Mostrar informações de debug
          console.log('Debug Info:', data.debug);
          
          // Limpar formulário
          document.getElementById('email').value = '';
        } else {
          // Mostrar toast de erro
          if (typeof Toast !== 'undefined') {
            Toast.error(data.message || 'Erro ao enviar e-mail de teste.');
          } else {
            alert(data.message || 'Erro ao enviar e-mail de teste.');
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
        // Restaurar botão
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  </script>
</body>
</html>


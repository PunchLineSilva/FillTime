<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/png" href="assets/web/images/logo.png">
  <title>Nova Senha | FillTime</title>
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
        <h2>Nova Senha</h2>
        <p>Digite sua nova senha</p>
      </div>
      
      <form class="auth-form" id="formNewPassword">
        <input type="hidden" id="token" name="token" value="">
        
        <div class="form-group">
          <label for="password">Nova Senha</label>
          <div class="password-input">
            <input type="password" id="password" name="password" placeholder="Digite sua nova senha" required minlength="6">
            <button type="button" class="password-toggle" aria-label="Mostrar senha"></button>
          </div>
        </div>
        
        <div class="form-group">
          <label for="confirmPassword">Confirmar Nova Senha</label>
          <div class="password-input">
            <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirme sua nova senha" required minlength="6">
            <button type="button" class="password-toggle" aria-label="Mostrar senha"></button>
          </div>
        </div>
        
        <button type="submit" class="btn btn-primary btn-full">Redefinir Senha</button>
      </form>
      
      <div class="auth-footer">
        <p>Lembrou da senha? <a href="/FillTime/login">Voltar ao Login</a></p>
      </div>
    </div>
    
    <div class="auth-info">
      <div class="auth-info-content">
        <h2>Senha Segura</h2>
        <p>Escolha uma senha forte para proteger sua conta.</p>
        
        <div class="auth-features">
          <div class="auth-feature">
            <div class="feature-icon"></div>
            <div class="feature-text">
              <h3>Mínimo 6 Caracteres</h3>
              <p>Use pelo menos 6 caracteres para sua senha.</p>
            </div>
          </div>
          
          <div class="auth-feature">
            <div class="feature-icon"></div>
            <div class="feature-text">
              <h3>Combine Letras e Números</h3>
              <p>Misture letras maiúsculas, minúsculas e números.</p>
            </div>
          </div>
          
          <div class="auth-feature">
            <div class="feature-icon"></div>
            <div class="feature-text">
              <h3>Mantenha Segura</h3>
              <p>Não compartilhe sua senha com outras pessoas.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script>
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    if (!token) {
      alert('Token inválido ou expirado.');
      window.location.href = '/FillTime/login';
    }
    
    document.getElementById('token').value = token;
    
    document.querySelectorAll('.password-toggle').forEach(toggle => {
      toggle.addEventListener('click', function() {
        const input = this.parentElement.querySelector('input');
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
        this.classList.toggle('active');
      });
    });
    
    document.getElementById('formNewPassword').addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      const token = document.getElementById('token').value;
      
      if (password !== confirmPassword) {
        if (typeof Toast !== 'undefined') {
          Toast.error('As senhas não coincidem.');
        } else {
          alert('As senhas não coincidem.');
        }
        return;
      }
      
      if (password.length < 6) {
        if (typeof Toast !== 'undefined') {
          Toast.error('A senha deve ter pelo menos 6 caracteres.');
        } else {
          alert('A senha deve ter pelo menos 6 caracteres.');
        }
        return;
      }
      
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      submitBtn.textContent = 'Redefinindo...';
      submitBtn.disabled = true;
      
      try {
        const response = await fetch('/FillTime/api/new-password.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            token: token,
            password: password 
          })
        });
        
        const data = await response.json();
        
        if (data.success) {
          if (typeof Toast !== 'undefined') {
            Toast.success('Senha redefinida com sucesso! Redirecionando para o login...');
          } else {
            alert('Senha redefinida com sucesso! Redirecionando para o login...');
          }
          
          setTimeout(() => {
            window.location.href = '/FillTime/login';
          }, 2000);
        } else {
          if (typeof Toast !== 'undefined') {
            Toast.error(data.message || 'Erro ao redefinir senha.');
          } else {
            alert(data.message || 'Erro ao redefinir senha.');
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


<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/png" href="assets/web/images/logo.png">
  <title>Login | FillTime</title>
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
        <h2>Bem-vindo de volta</h2>
        <p>Entre na sua conta para continuar</p>
      </div>
      
      <form class="auth-form" id="formLogin">
        <div class="form-group">
          <label for="email">E-mail</label>
          <input type="email" id="email" name="email" placeholder="seu@email.com" required>
        </div>
        
        <div class="form-group">
          <label for="password">Senha</label>
          <div class="password-input">
            <input type="password" id="password" name="password" placeholder="Sua senha" required>
            <button type="button" class="password-toggle" aria-label="Mostrar senha"></button>
          </div>
          <div class="form-help">
            <a href="/FillTime/recuperar-senha" class="forgot-password">Esqueceu a senha?</a>
          </div>
        </div>
        
        <button type="submit" class="btn btn-primary btn-full">Entrar</button>
      </form>
      
      <div class="auth-footer">
        <p>Não tem uma conta? <a href="/FillTime/cadastro">Cadastre-se</a></p>
      </div>
    </div>
    
    <div class="auth-info">
      <div class="auth-info-content">
        <h2>Gerencie seu negócio com eficiência</h2>
        <p>A FillTime oferece todas as ferramentas que você precisa para gerenciar suas quadras esportivas, otimizar agendamentos e aumentar sua receita.</p>
        
        <div class="auth-features">
          <div class="auth-feature">
            <div class="feature-icon"></div>
            <div class="feature-text">
              <h3>Agendamentos Simplificados</h3>
              <p>Sistema intuitivo para gerenciar reservas e evitar conflitos de horários.</p>
            </div>
          </div>
          
          <div class="auth-feature">
            <div class="feature-icon"></div>
            <div class="feature-text">
              <h3>Análises Detalhadas</h3>
              <p>Relatórios e gráficos para entender o desempenho do seu negócio.</p>
            </div>
          </div>
          
          <div class="auth-feature">
            <div class="feature-icon"></div>
            <div class="feature-text">
              <h3>Gestão de Clientes</h3>
              <p>Mantenha um registro completo dos seus clientes e suas preferências.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script>
    console.log("=== JAVASCRIPT INLINE CARREGADO ===");
    
    function showToast(message, type = 'info') {
      const toast = document.createElement('div');
      toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        border-radius: 5px;
        z-index: 1000;
        font-family: Arial, sans-serif;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        max-width: 300px;
      `;
      toast.textContent = message;
      document.body.appendChild(toast);
      
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 3000);
    }
    
    function togglePassword() {
      console.log("Toggle password chamado");
      const passwordInput = document.getElementById('password');
      const toggleBtn = document.querySelector('.password-toggle');
      
      if (passwordInput && toggleBtn) {
        if (passwordInput.type === 'password') {
          passwordInput.type = 'text';
          toggleBtn.setAttribute('aria-label', 'Ocultar senha');
          toggleBtn.classList.add('show');
          console.log("Senha mostrada");
        } else {
          passwordInput.type = 'password';
          toggleBtn.setAttribute('aria-label', 'Mostrar senha');
          toggleBtn.classList.remove('show');
          console.log("Senha ocultada");
        }
      }
    }
    
    async function fazerLogin(email, password) {
      console.log("Fazendo login com:", email);
      
      try {
        const response = await fetch('http://localhost/FillTime/api/users/login', {
          method: 'GET',
          headers: {
            'email': email,
            'password': password
          }
        });
        
        const result = await response.json();
        console.log("Resposta:", result);
        
        if (result.status === 'success') {
          showToast('Login realizado com sucesso!', 'success');
          localStorage.setItem("userLogin", JSON.stringify(result.data));
          setTimeout(() => {
            window.location.href = "/FillTime/app";
          }, 2000);
        } else {
          showToast('Erro: ' + result.message, 'error');
        }
      } catch (error) {
        console.error("Erro:", error);
        showToast('Erro na conexão: ' + error.message, 'error');
      }
    }
    
    window.addEventListener('load', function() {
      console.log("Página carregada, configurando eventos");
      
      const toggleBtn = document.querySelector('.password-toggle');
      if (toggleBtn) {
        console.log("Botão de senha encontrado");
        toggleBtn.addEventListener('click', togglePassword);
      } else {
        console.error("Botão de senha não encontrado!");
      }
      
      const form = document.getElementById('formLogin');
      if (form) {
        console.log("Formulário encontrado");
        form.addEventListener('submit', function(e) {
          e.preventDefault();
          const email = document.getElementById('email').value;
          const password = document.getElementById('password').value;
          fazerLogin(email, password);
        });
      } else {
        console.error("Formulário não encontrado!");
      }
      
      console.log("Configuração concluída");
    });
  </script>

</body>
</html>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/png" href="assets/web/images/logo.png">
  <title>Cadastro | FillTime</title>
  <link rel="stylesheet" href="assets/web/css/register.css">
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
        <h2>Crie sua conta</h2>
        <p>Comece a gerenciar seu negócio de forma eficiente</p>
      </div>
      
      <form id="auth-form" class="auth-form">
        <div class="form-row">
          <div class="form-group">
            <label for="first_name">Nome</label>
            <input type="text" id="first_name" name="first_name" placeholder="Seu nome" required>
          </div>
          
          <div class="form-group">
            <label for="last_name">Sobrenome</label>
            <input type="text" id="last_name" name="last_name" placeholder="Seu sobrenome" required>
          </div>
        </div>
        
        <div class="form-group">
          <label for="email">E-mail</label>
          <input type="email" id="email" name="email" placeholder="seu@email.com" required>
        </div>
        
        <div class="form-group">
          <label for="password">Senha</label>
          <div class="password-input">
            <input type="password" id="password" name="password" placeholder="Crie uma senha forte" required>
            <button type="button" class="password-toggle" aria-label="Mostrar senha"></button>
          </div>
          <div class="password-strength">
            <div class="strength-meter">
              <div class="strength-segment"></div>
              <div class="strength-segment"></div>
              <div class="strength-segment"></div>
              <div class="strength-segment"></div>
            </div>
            <span class="strength-text">Senha fraca</span>
          </div>
        </div>
        
        
        
        <button type="submit" class="btn btn-primary btn-full">Criar Conta</button>
      </form>
      
      <div class="auth-footer">
        <p>Já tem uma conta? <a href="/FillTime/login">Entrar</a></p>
      </div>
    </div>
    
    <div class="auth-info">
      <div class="auth-info-content">
        <h2>Comece sua jornada com a FillTime</h2>
        <p>Junte-se a centenas de empresas que já estão otimizando a gestão de suas quadras esportivas e aumentando sua receita.</p>
        
        <div class="auth-testimonial">
          <div class="testimonial-content">
            <p>"Desde que implementamos a FillTime, nossa taxa de ocupação aumentou em 40% e reduzimos o tempo gasto com agendamentos em mais de 70%."</p>
          </div>
          <div class="testimonial-author">
            <div class="author-image"><img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" width="100%"></img></div>
            <div class="author-info">
              <h4>Marcelo Oliveira</h4>
              <p>Centro Esportivo Vitória</p>
            </div>
          </div>
        </div>
        
        <div class="auth-stats">
          <div class="stat-item">
            <h3>1,200+</h3>
            <p>Empresas usando</p>
          </div>
          <div class="stat-item">
            <h3>98%</h3>
            <p>Satisfação</p>
          </div>
          <div class="stat-item">
            <h3>30%</h3>
            <p>Aumento médio de receita</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script src="assets/web/js/register.js"></script>
</body>
</html>
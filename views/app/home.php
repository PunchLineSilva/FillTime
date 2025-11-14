<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/png" href="assets/app/images/logo.png">
  <title>Dashboard | FillTime</title>
  <link rel="stylesheet" href="assets/web/css/_theme.css">
  <link rel="stylesheet" href="assets/_shared/css/toast.css">
  <link rel="stylesheet" href="assets/app/css/home.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.css">
  <script src="assets/app/js/home.js"></script>
</head>
<body class="dashboard-page">
  <aside class="sidebar">
    <div class="sidebar-header">
      <div class="logo">
        <a href="/FillTime/" style="text-decoration: none; color: inherit; display: flex; align-items: center;">
          <span class="logo-icon" style="margin-right: 12px;"></span>
          <h1>FillTime</h1>
        </a>
      </div>
    </div>
    
    <nav class="sidebar-nav">
      <ul>
        <li class="active">
          <a href="#">
            <span class="nav-icon dashboard-icon"></span>
            <span>Dashboard</span>
          </a>
        </li>
      </ul>
    </nav>
    
    <div class="sidebar-footer">
      <a href="/FillTime/faqs" class="help-link">
        <span class="help-icon"></span>
        <span>Ajuda</span>
      </a>
    </div>
  </aside>

  <main class="main-content">
    <header class="dashboard-header">
      <div class="search-container">
        <span class="search-icon"></span>
        <input type="search" placeholder="Buscar...">
      </div>
      <div class="header-actions">
        <div class="user-profile" id="userProfile">
          <div class="user-avatar" id="user-avatar-placeholder"></div>
          <div class="user-info">
            <p class="user-name" id="user-name-placeholder">Carregando...</p>
            <p class="business-name">Minha Empresa</p>
          </div>
          <span class="dropdown-icon"></span>
          
          <div class="profile-dropdown" id="profileDropdown">
            <div class="profile-header">
              <h3 id="dropdown-user-name">Carregando...</h3>
              <p id="dropdown-user-email">Carregando...</p>
            </div>
            <div class="profile-menu">
              <a href="#" class="profile-menu-item" id="change-data-button">
                <span class="profile-icon"></span>
                <span>Alterar Dados</span>
              </a>
              <a href="#" class="profile-menu-item-danger" id="logout-button">
                <span class="profile-icon"></span>
                <span>Sair</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>

    <section class="welcome-section">
      <div class="welcome-content">
        <h1 id="welcome-message">Olá!</h1>
        <p>Gerencie seus recursos, agendamentos e acompanhe o desempenho do seu negócio</p>
      </div>

      <div class="date-range-picker">
        <span class="date-label">Período:</span>
        <button class="date-range-btn" id="dateRangeBtn">
          <span>Últimos 30 dias</span>
          <span class="dropdown-icon"></span>
        </button>
        <div class="date-range-dropdown" id="dateRangeDropdown">
          <div class="date-range-option">Hoje</div>
          <div class="date-range-option">Últimos 7 dias</div>
          <div class="date-range-option active">Últimos 30 dias</div>
          <div class="date-range-option">Este mês</div>
          <div class="date-range-option">Personalizado</div>
        </div>
      </div>
    </section>

    <section class="metrics-section">
      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-header">
            <h3>Receita Total</h3>
            <span class="trend up">+15%</span>
          </div>
          <p class="metric-value">R$ 24.750</p>
          <div class="metric-chart revenue-chart"></div>
        </div>
        
        <div class="metric-card">
          <div class="metric-header">
            <h3>Agendamentos</h3>
            <span class="trend up">+8%</span>
          </div>
          <p class="metric-value">324</p>
          <div class="metric-chart bookings-chart"></div>
        </div>
        
        <div class="metric-card">
          <div class="metric-header">
            <h3>Taxa de Ocupação</h3>
            <span class="trend up">+5%</span>
          </div>
          <p class="metric-value">68%</p>
          <div class="metric-chart occupancy-chart"></div>
        </div>
        
        <div class="metric-card">
          <div class="metric-header">
            <h3>Horários Vagos</h3>
            <span class="trend down">-3%</span>
          </div>
          <p class="metric-value">152</p>
          <div class="metric-chart empty-slots-chart"></div>
        </div>
      </div>
    </section>

    <section class="resources-section">
      <div class="section-header">
        <h2>Minhas Quadras</h2>
        <button class="btn btn-primary" id="addResourceBtn">
          <span class="plus-icon"></span>
          Adicionar Quadras
        </button>
      </div>
      
      <div class="courts-grid">
        <div class="court-card">
          <div class="court-header">
            <h3 class="court-title">Quadra 1</h3>
            <span class="court-status available">Disponível</span>
          </div>
          <div class="court-body">
            <div class="court-info">
              <div class="court-info-item">
                <span class="court-info-icon location-icon"></span>
                <span>Setor A - Arena Central</span>
              </div>
              <div class="court-info-item">
                <span class="court-info-icon type-icon"></span>
                <span>Futsal</span>
              </div>
              <div class="court-info-item">
                <span class="court-info-icon price-icon"></span>
                <span>R$ 120,00/hora</span>
              </div>
            </div>
            <div class="court-actions">
              <button class="court-action-btn btn-primary" data-court="1" data-court-name="Quadra 1">
                <span class="court-action-icon calendar-icon"></span>
                <span>Agendar</span>
              </button>
              <button class="court-action-btn btn-secondary">
                <span class="court-action-icon edit-icon"></span>
                <span>Editar</span>
              </button>
            </div>
          </div>
        </div>
        
        <div class="court-card">
          <div class="court-header">
            <h3 class="court-title">Quadra 2</h3>
            <span class="court-status occupied">Ocupada</span>
          </div>
          <div class="court-body">
            <div class="court-info">
              <div class="court-info-item">
                <span class="court-info-icon location-icon"></span>
                <span>Setor B - Arena Central</span>
              </div>
              <div class="court-info-item">
                <span class="court-info-icon type-icon"></span>
                <span>Vôlei</span>
              </div>
              <div class="court-info-item">
                <span class="court-info-icon price-icon"></span>
                <span>R$ 100,00/hora</span>
              </div>
            </div>
            <div class="court-actions">
              <button class="court-action-btn btn-primary" data-court="2" data-court-name="Quadra 2">
                <span class="court-action-icon calendar-icon"></span>
                <span>Agendar</span>
              </button>
              <button class="court-action-btn btn-secondary">
                <span class="court-action-icon edit-icon"></span>
                <span>Editar</span>
              </button>
            </div>
          </div>
        </div>
        
        <div class="court-card">
          <div class="court-header">
            <h3 class="court-title">Quadra 3</h3>
            <span class="court-status maintenance">Manutenção</span>
          </div>
          <div class="court-body">
            <div class="court-info">
              <div class="court-info-item">
                <span class="court-info-icon location-icon"></span>
                <span>Setor C - Arena Central</span>
              </div>
              <div class="court-info-item">
                <span class="court-info-icon type-icon"></span>
                <span>Basquete</span>
              </div>
              <div class="court-info-item">
                <span class="court-info-icon price-icon"></span>
                <span>R$ 150,00/hora</span>
              </div>
            </div>
            <div class="court-actions">
              <button class="court-action-btn btn-primary" data-court="3" data-court-name="Quadra 3">
                <span class="court-action-icon calendar-icon"></span>
                <span>Agendar</span>
              </button>
              <button class="court-action-btn btn-secondary">
                <span class="court-action-icon edit-icon"></span>
                <span>Editar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <div class="modal" id="bookingModal">
    <div class="modal-content large">
      <div class="modal-header">
        <h3>Agendar <span id="resourceName">Recurso</span></h3>
        <button class="close-btn" aria-label="Fechar">&times;</button>
      </div>
      
      <div class="court-calendar">
        <div class="calendar-header">
          <div class="calendar-navigation">
            <button class="btn btn-icon" aria-label="Semana anterior" id="prevWeekBtn">
              <span class="nav-arrow prev"></span>
            </button>
            <h4 id="weekRangeDisplay">Semana de 20 a 26 de Maio, 2025</h4>
            <button class="btn btn-icon" aria-label="Próxima semana" id="nextWeekBtn">
              <span class="nav-arrow next"></span>
            </button>
          </div>
        </div>
        
        <div class="weekdays">
          <div></div>
          <div>Segunda</div>
          <div>Terça</div>
          <div>Quarta</div>
          <div>Quinta</div>
          <div>Sexta</div>
          <div>Sábado</div>
          <div>Domingo</div>
        </div>
        
        <div class="time-slots">
          <div class="time-label">08:00</div>
          <div class="time-slot"></div>
          <div class="time-slot"></div>
          <div class="time-slot"></div>
          <div class="time-slot"></div>
          <div class="time-slot"></div>
          <div class="time-slot booked">
            <div class="booking-info">
              <span class="booking-client">Time Juvenil</span>
              <span class="booking-time">08:00 - 09:00</span>
            </div>
          </div>
          <div class="time-slot"></div>
          
          <div class="time-label">09:00</div>
          <div class="time-slot"></div>
          <div class="time-slot booked">
            <div class="booking-info">
              <span class="booking-client">Escola Municipal</span>
              <span class="booking-time">09:00 - 10:00</span>
            </div>
          </div>
          <div class="time-slot"></div>
          <div class="time-slot"></div>
          <div class="time-slot"></div>
          <div class="time-slot booked">
            <div class="booking-info">
              <span class="booking-client">Time Juvenil</span>
              <span class="booking-time">09:00 - 10:00</span>
            </div>
          </div>
          <div class="time-slot"></div>
          
          <div class="time-label">10:00</div>
          <div class="time-slot"></div>
          <div class="time-slot booked">
            <div class="booking-info">
              <span class="booking-client">Escola Municipal</span>
              <span class="booking-time">10:00 - 11:00</span>
            </div>
          </div>
          <div class="time-slot"></div>
          <div class="time-slot"></div>
          <div class="time-slot"></div>
          <div class="time-slot"></div>
          <div class="time-slot"></div>
          
          <div class="time-label">11:00</div>
          <div class="time-slot"></div>
          <div class="time-slot"></div>
          <div class="time-slot"></div>
          <div class="time-slot"></div>
          <div class="time-slot"></div>
          <div class="time-slot"></div>
          <div class="time-slot"></div>
          
          <div class="time-label">12:00</div>
          <div class="time-slot"></div>
          <div class="time-slot"></div>
          <div class="time-slot"></div>
          <div class="time-slot"></div>
          <div class="time-slot"></div>
          <div class="time-slot"></div>
          <div class="time-slot"></div>
          
          <div class="time-label">13:00</div>
          <div class="time-slot"></div>
          <div class="time-slot"></div>
          <div class="time-slot"></div>
          <div class="time-slot"></div>
          <div class="time-slot"></div>
          <div class="time-slot"></div>
          <div class="time-slot"></div>
          
          <div class="time-label">14:00</div>
          <div class="time-slot"></div>
          <div class="time-slot"></div>
          <div class="time-slot booked">
            <div class="booking-info">
              <span class="booking-client">Time Águias</span>
              <span class="booking-time">14:00 - 16:00</span>
            </div>
          </div>
          <div class="time-slot"></div>
          <div class="time-slot"></div>
          <div class="time-slot"></div>
          <div class="time-slot"></div>
          
          <div class="time-label">15:00</div>
          <div class="time-slot"></div>
          <div class="time-slot"></div>
          <div class="time-slot booked">
            <div class="booking-info">
              <span class="booking-client">Time Águias</span>
              <span class="booking-time">14:00 - 16:00</span>
            </div>
          </div>
          <div class="time-slot"></div>
          <div class="time-slot"></div>
          <div class="time-slot booked">
            <div class="booking-info">
              <span class="booking-client">Grupo Amigos</span>
              <span class="booking-time">15:00 - 17:00</span>
            </div>
          </div>
          <div class="time-slot"></div>
          
          <div class="time-label">16:00</div>
          <div class="time-slot"></div>
          <div class="time-slot"></div>
          <div class="time-slot"></div>
          <div class="time-slot"></div>
          <div class="time-slot booked">
            <div class="booking-info">
              <span class="booking-client">Time Vitória</span>
              <span class="booking-time">16:00 - 18:00</span>
            </div>
          </div>
          <div class="time-slot booked">
            <div class="booking-info">
              <span class="booking-client">Grupo Amigos</span>
              <span class="booking-time">15:00 - 17:00</span>
            </div>
          </div>
          <div class="time-slot"></div>
          
          <div class="time-label">17:00</div>
          <div class="time-slot booked">
            <div class="booking-info">
              <span class="booking-client">Associação UFPR</span>
              <span class="booking-time">17:00 - 19:00</span>
            </div>
          </div>
          <div class="time-slot"></div>
          <div class="time-slot"></div>
          <div class="time-slot"></div>
          <div class="time-slot booked">
            <div class="booking-info">
              <span class="booking-client">Time Vitória</span>
              <span class="booking-time">16:00 - 18:00</span>
            </div>
          </div>
          <div class="time-slot"></div>
          <div class="time-slot"></div>
          
          <div class="time-label">18:00</div>
          <div class="time-slot booked">
            <div class="booking-info">
              <span class="booking-client">Associação UFPR</span>
              <span class="booking-time">17:00 - 19:00</span>
            </div>
          </div>
          <div class="time-slot booked">
            <div class="booking-info">
              <span class="booking-client">Liga Amadora</span>
              <span class="booking-time">18:00 - 20:00</span>
            </div>
          </div>
          <div class="time-slot"></div>
          <div class="time-slot booked">
            <div class="booking-info">
              <span class="booking-client">Time Leões</span>
              <span class="booking-time">18:00 - 20:00</span>
            </div>
          </div>
          <div class="time-slot"></div>
          <div class="time-slot"></div>
          <div class="time-slot"></div>
          
          <div class="time-label">19:00</div>
          <div class="time-slot"></div>
          <div class="time-slot booked">
            <div class="booking-info">
              <span class="booking-client">Liga Amadora</span>
              <span class="booking-time">18:00 - 20:00</span>
            </div>
          </div>
          <div class="time-slot booked">
            <div class="booking-info">
              <span class="booking-client">Grupo Empresarial</span>
              <span class="booking-time">19:00 - 21:00</span>
            </div>
          </div>
          <div class="time-slot booked">
            <div class="booking-info">
              <span class="booking-client">Time Leões</span>
              <span class="booking-time">18:00 - 20:00</span>
            </div>
          </div>
          <div class="time-slot"></div>
          <div class="time-slot"></div>
          <div class="time-slot"></div>
          
          <div class="time-label">20:00</div>
          <div class="time-slot booked">
            <div class="booking-info">
              <span class="booking-client">Time Tigres</span>
              <span class="booking-time">20:00 - 22:00</span>
            </div>
          </div>
          <div class="time-slot"></div>
          <div class="time-slot booked">
            <div class="booking-info">
              <span class="booking-client">Grupo Empresarial</span>
              <span class="booking-time">19:00 - 21:00</span>
            </div>
          </div>
          <div class="time-slot"></div>
          <div class="time-slot booked">
            <div class="booking-info">
              <span class="booking-client">Grupo Amigos</span>
              <span class="booking-time">20:00 - 22:00</span>
            </div>
          </div>
          <div class="time-slot"></div>
          <div class="time-slot"></div>
          
          <div class="time-label">21:00</div>
          <div class="time-slot booked">
            <div class="booking-info">
              <span class="booking-client">Time Tigres</span>
              <span class="booking-time">20:00 - 22:00</span>
            </div>
          </div>
          <div class="time-slot"></div>
          <div class="time-slot"></div>
          <div class="time-slot"></div>
          <div class="time-slot booked">
            <div class="booking-info">
              <span class="booking-client">Grupo Amigos</span>
              <span class="booking-time">20:00 - 22:00</span>
            </div>
          </div>
          <div class="time-slot"></div>
          <div class="time-slot"></div>
          
          <div class="time-label">22:00</div>
          <div class="time-slot"></div>
          <div class="time-slot"></div>
          <div class="time-slot"></div>
          <div class="time-slot"></div>
          <div class="time-slot"></div>
          <div class="time-slot"></div>
          <div class="time-slot"></div>
        </div>
      </div>
      
      <form class="appointment-form" id="bookingForm" style="display: none;">
        <div class="form-group">
          <label for="client">Cliente</label>
          <input type="text" id="client" placeholder="Nome do cliente" required>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="date">Data</label>
            <input type="date" id="date" required>
          </div>

          <div class="form-group">
            <label for="start-time">Horário Início</label>
            <input type="time" id="start-time" required>
          </div>

          <div class="form-group">
            <label for="end-time">Horário Fim</label>
            <input type="time" id="end-time" required>
          </div>
        </div>

        <div class="form-group">
          <label for="booking-price">Valor (R$)</label>
          <input type="number" id="booking-price" min="0" step="0.01" required>
        </div>

        <div class="form-group">
          <label for="booking-notes">Observações</label>
          <textarea id="booking-notes" rows="3"></textarea>
        </div>

        <div class="form-actions">
          <button type="button" class="btn btn-secondary" id="backToCalendarBtn">Voltar</button>
          <button type="submit" class="btn btn-primary">Confirmar Agendamento</button>
        </div>
      </form>
    </div>
  </div>

  <div class="modal" id="addResourceModal">
    <div class="modal-content large">
      <div class="modal-header">
        <h3>Adicionar Novo Recurso</h3>
        <button class="close-btn" aria-label="Fechar">&times;</button>
      </div>
      
      <form class="appointment-form">
        <div class="form-row">
          <div class="form-group">
            <label for="resource-name">Nome do Recurso</label>
            <input type="text" id="resource-name" required>
          </div>

          <div class="form-group">
            <label for="resource-type">Tipo de Recurso</label>
            <select id="resource-type" required>
              <option value="">Selecione o tipo</option>
              <option value="quadra">Quadra Esportiva</option>
              <option value="sala">Sala de Reunião</option>
              <option value="equipamento">Equipamento</option>
              <option value="espaco">Espaço para Eventos</option>
              <option value="outro">Outro</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="resource-location">Localização</label>
            <input type="text" id="resource-location" required>
          </div>

          <div class="form-group">
            <label for="resource-price">Valor por Hora (R$)</label>
            <input type="number" id="resource-price" min="0" step="0.01" required>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="resource-capacity">Capacidade (pessoas)</label>
            <input type="number" id="resource-capacity" min="1" required>
          </div>

          <div class="form-group">
            <label for="resource-status">Status</label>
            <select id="resource-status" required>
              <option value="available">Disponível</option>
              <option value="maintenance">Em Manutenção</option>
              <option value="inactive">Inativo</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label for="resource-description">Descrição</label>
          <textarea id="resource-description" rows="3"></textarea>
        </div>

        <div class="form-group">
          <label>Horários de Funcionamento</label>
          <div class="form-row">
            <div class="form-group">
              <label for="opening-time">Abertura</label>
              <input type="time" id="opening-time" required>
            </div>

            <div class="form-group">
              <label for="closing-time">Fechamento</label>
              <input type="time" id="closing-time" required>
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button type="button" class="btn btn-secondary" id="cancelAddResourceBtn">Cancelar</button>
          <button type="submit" class="btn btn-primary">Salvar Recurso</button>
        </div>
      </form>
    </div>
  </div>


    </section>

    </main>

  <div class="modal" id="editUserModal">
    <div class="modal-content">
      <div class="modal-header">
        <h3>Alterar Meus Dados</h3>
        <button class="close-btn" id="closeModalBtn">&times;</button>
      </div>
      <form class="appointment-form" id="editUserForm">
        <div class="form-group">
          <label for="modalUserName">Nome</label>
          <input type="text" id="modalUserName" name="name" required>
        </div>
        <div class="form-group">
          <label for="modalUserEmail">E-mail</label>
          <input type="email" id="modalUserEmail" name="email" required>
        </div>
        <div class="form-group">
          <label for="modalUserPhoto" class="file-input-label">Nova Foto de Perfil (opcional)</label>
          <div class="file-input-container">
            <div class="file-input-wrapper">
              <input type="file" id="modalUserPhoto" name="photo" accept="image/*" class="file-input">
              <button type="button" class="file-input-button" onclick="document.getElementById('modalUserPhoto').click()">
                <span class="file-input-icon"></span>
                Escolher arquivo
              </button>
              <span class="file-input-text" id="fileInputText">Nenhum arquivo escolhido</span>
            </div>
          </div>
          <div class="image-preview" id="imagePreview" style="display: none;">
            <img id="previewImage" src="" alt="Preview da imagem selecionada" style="display: none;">
            <div id="imagePlaceholder" style="display: flex; align-items: center; justify-content: center; width: 120px; height: 120px; background-color: var(--neutral-100); border-radius: 8px; color: var(--neutral-500); font-size: 14px;">
              <span>📷 Foto</span>
            </div>
            <button type="button" class="image-preview-remove" onclick="removeImagePreview()">
              <span>🗑️</span>
              Remover
            </button>
          </div>
        </div>
        <div class="form-actions">
          <button type="button" class="btn btn-secondary" id="cancelModalBtn">Cancelar</button>
          <button type="submit" class="btn btn-primary">Salvar Alterações</button>
        </div>
      </form>
    </div>
  </div>

  <!-- Modal de Edição de Quadra -->
  <div class="modal" id="editCourtModal">
    <div class="modal-content large">
      <div class="modal-header">
        <h3>Editar Quadra</h3>
        <button class="close-btn" id="closeEditCourtModalBtn">&times;</button>
      </div>
      <form class="appointment-form" id="editCourtForm">
        <div class="form-row">
          <div class="form-group">
            <label for="edit-court-name">Nome da Quadra</label>
            <input type="text" id="edit-court-name" name="name" required>
          </div>
          <div class="form-group">
            <label for="edit-court-type">Tipo</label>
            <select id="edit-court-type" name="type" required>
              <option value="">Selecione o tipo</option>
              <option value="Futebol">Futebol</option>
              <option value="Vôlei">Vôlei</option>
              <option value="Basquete">Basquete</option>
              <option value="Tênis">Tênis</option>
              <option value="Futsal">Futsal</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="edit-court-hours">Horas de Duração</label>
            <input type="number" id="edit-court-hours" name="hours" min="1" max="24" required>
          </div>
          <div class="form-group">
            <label for="edit-court-price">Preço por Hora (R$)</label>
            <input type="number" id="edit-court-price" name="price" min="0" step="0.01" required>
          </div>
        </div>

        <div class="form-group">
          <label for="edit-court-image" class="file-input-label">Imagem da Quadra (opcional)</label>
          <div class="file-input-container">
            <div class="file-input-wrapper">
              <input type="file" id="edit-court-image" name="image" accept="image/*" class="file-input">
              <button type="button" class="file-input-button" onclick="document.getElementById('edit-court-image').click()">
                <span class="file-input-icon"></span>
                Escolher arquivo
              </button>
              <span class="file-input-text" id="editCourtFileInputText">Nenhum arquivo escolhido</span>
            </div>
          </div>
          <div class="image-preview" id="editCourtImagePreview" style="display: none;">
            <img id="editCourtPreviewImage" src="" alt="Preview da imagem selecionada" style="display: none;">
            <div id="editCourtImagePlaceholder" style="display: flex; align-items: center; justify-content: center; width: 120px; height: 120px; background-color: var(--neutral-100); border-radius: 8px; color: var(--neutral-500); font-size: 14px;">
              <span>🏟️ Quadra</span>
            </div>
            <button type="button" class="image-preview-remove" onclick="removeEditCourtImagePreview()">
              <span>🗑️</span>
              Remover
            </button>
          </div>
        </div>

        <div class="form-actions">
          <button type="button" class="btn btn-secondary" id="cancelEditCourtBtn">Cancelar</button>
          <button type="submit" class="btn btn-primary">Salvar Alterações</button>
        </div>
      </form>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js"></script>
</body>
</html>
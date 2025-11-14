// Toast simples para compatibilidade
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

// Importações necessárias - usando fetch direto para evitar problemas de módulo

// HTTP Client para usuários
class HttpUserLocal {
    constructor() {
        this.baseUrl = 'http://localhost/FillTime/api/users';
    }
    
    async updateUser(token, userData) {
        try {
            const response = await fetch(`${this.baseUrl}/update`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: userData
            });
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            throw error;
        }
    }
}

// HTTP Client para quadras (versão local como fallback)
class HttpCourtLocal {
    constructor() {
        this.baseUrl = 'http://localhost/FillTime/api/courts';
    }
    
    async listCourts() {
        try {
            const response = await fetch(`${this.baseUrl}/`);
            const result = await response.json();
            return result.data || [];
        } catch (error) {
            console.error('Erro ao listar quadras:', error);
            throw error;
        }
    }
    
    async createCourt(courtData) {
        try {
            const response = await fetch(`${this.baseUrl}/create`, {
                method: 'POST',
                body: courtData
            });
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Erro ao criar quadra:', error);
            throw error;
        }
    }
    
    async updateCourt(courtId, courtData) {
        try {
            const response = await fetch(`${this.baseUrl}/${courtId}`, {
                method: 'PUT',
                body: courtData
            });
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Erro ao atualizar quadra:', error);
            throw error;
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const httpCourt = new HttpCourtLocal();
    const httpUser = new HttpUserLocal();

    const userLoginData = localStorage.getItem("userLogin");

    if (!userLoginData) {
        alert("Você precisa estar logado para acessar esta página.");
        return (window.location.href = "/FillTime/login");
    }

    var { user, token } = JSON.parse(userLoginData);

    try {
        document.getElementById("user-name-placeholder").textContent = user.name;
        document.getElementById("dropdown-user-name").textContent = user.name;
        document.getElementById("dropdown-user-email").textContent = user.email;
        document.getElementById(
            "welcome-message"
        ).textContent = `Olá, ${user.name}!`;

        const avatar = document.getElementById("user-avatar-placeholder");
        avatar.innerHTML = user.photo
            ? `<img src="${user.photo}" alt="Foto de Perfil" style="width:100%; height:100%; border-radius:50%; object-fit:cover;">`
            : user.name.charAt(0).toUpperCase();
    } catch (err) {
        console.error("Erro ao processar dados do usuário:", err);
        return (window.location.href = "/FillTime/login");
    }

    const editUserForm = document.getElementById('editUserForm');
    const editUserModal = document.getElementById('editUserModal');
    const changeDataButton = document.getElementById('change-data-button');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const cancelModalBtn = document.getElementById('cancelModalBtn');
    
    const fileInput = document.getElementById("modalUserPhoto");
    const fileInputText = document.getElementById("fileInputText");
    const imagePreview = document.getElementById("imagePreview");
    const previewImage = document.getElementById("previewImage");
    const imagePlaceholder = document.getElementById("imagePlaceholder");

    function openEditModal() {
        if (!user) return;
        document.getElementById("modalUserName").value = user.name;
        document.getElementById("modalUserEmail").value = user.email;
        document.getElementById("modalUserPhoto").value = "";
        
        if (fileInputText) {
            fileInputText.textContent = "Nenhum arquivo escolhido";
            fileInputText.classList.remove("has-file");
        }
        if (imagePreview) {
            imagePreview.style.display = "none";
        }
        if (previewImage) {
            previewImage.src = "";
        }
        
        editUserModal.classList.add("active");
    }

    function closeEditModal() {
        editUserModal.classList.remove('active');
    }

    if (changeDataButton) {
        changeDataButton.addEventListener('click', (e) => {
            e.preventDefault();
            openEditModal();
        });
    }

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeEditModal);
    if (cancelModalBtn) cancelModalBtn.addEventListener('click', closeEditModal);

    if (fileInput) {
        fileInput.addEventListener("change", function(e) {
            const file = e.target.files[0];
            if (file) {
                if (!file.type.startsWith('image/')) {
                    showToast("Por favor, selecione apenas arquivos de imagem.", "error");
                    fileInput.value = "";
                    return;
                }
                
                fileInputText.textContent = file.name;
                fileInputText.classList.add("has-file");
                
                const reader = new FileReader();
                reader.onload = function(e) {
                    console.log("Imagem carregada:", e.target.result.substring(0, 50) + "...");
                    
                    if (imagePlaceholder) {
                        imagePlaceholder.style.display = "none";
                    }
                    
                    previewImage.src = e.target.result;
                    previewImage.alt = "Preview da imagem selecionada";
                    previewImage.style.display = "block";
                    previewImage.style.visibility = "visible";
                    previewImage.style.opacity = "1";
                    
                    imagePreview.style.display = "block";
                    imagePreview.style.visibility = "visible";
                    imagePreview.style.opacity = "1";
                    
                    const removeBtn = imagePreview.querySelector('.image-preview-remove');
                    if (removeBtn) {
                        removeBtn.style.display = "flex";
                        removeBtn.style.visibility = "visible";
                        removeBtn.style.opacity = "1";
                    }
                    
                    console.log("Preview configurado:", {
                        src: previewImage.src.substring(0, 50) + "...",
                        display: imagePreview.style.display,
                        imageDisplay: previewImage.style.display,
                        placeholderDisplay: imagePlaceholder ? imagePlaceholder.style.display : "N/A"
                    });
                };
                
                reader.onerror = function(e) {
                    console.error("Erro ao carregar imagem:", e);
                    showToast("Erro ao carregar a imagem. Tente novamente.", "error");
                    
                    if (imagePlaceholder) {
                        imagePlaceholder.style.display = "flex";
                    }
                    previewImage.style.display = "none";
                };
                
                reader.readAsDataURL(file);
            } else {
                fileInputText.textContent = "Nenhum arquivo escolhido";
                fileInputText.classList.remove("has-file");
                imagePreview.style.display = "none";
                previewImage.src = "";
            }
        });
    }

    window.removeImagePreview = function() {
        fileInput.value = "";
        fileInputText.textContent = "Nenhum arquivo escolhido";
        fileInputText.classList.remove("has-file");
        imagePreview.style.display = "none";
        imagePreview.style.visibility = "hidden";
        imagePreview.style.opacity = "0";
        previewImage.src = "";
        previewImage.alt = "";
        previewImage.style.display = "none";
        
        if (imagePlaceholder) {
            imagePlaceholder.style.display = "flex";
        }
        
        const removeBtn = imagePreview.querySelector('.image-preview-remove');
        if (removeBtn) {
            removeBtn.style.display = "none";
            removeBtn.style.visibility = "hidden";
            removeBtn.style.opacity = "0";
        }
    };

    editUserForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const name = document.getElementById("modalUserName").value.trim();
        const email = document.getElementById("modalUserEmail").value.trim();
        const photoInput = document.getElementById("modalUserPhoto");
        const photo = photoInput.files[0];
        
        if (!name || !email) {
            showToast('Por favor, preencha todos os campos obrigatórios', 'error');
            return;
        }
        
        try {
            const userLoginData = localStorage.getItem("userLogin");
            if (!userLoginData) {
                showToast('Sessão expirada. Faça login novamente.', 'error');
                return;
            }
            
            const userData = JSON.parse(userLoginData);
            console.log("Dados do localStorage:", userData);
            
            const token = userData.token;
            console.log("Token extraído:", token);
            
            if (!token) {
                showToast('Token não encontrado. Faça login novamente.', 'error');
                return;
            }
            
            const submitBtn = editUserForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Salvando...';
            submitBtn.disabled = true;

            const updateData = new FormData();
            updateData.append('name', name);
            updateData.append('email', email);
            if (photo) {
                updateData.append('photo', photo);
            }

            console.log("Enviando requisição com token:", token.substring(0, 20) + "...");
            console.log("Dados do FormData:", updateData);
            
            const response = await httpUser.updateUser(token, updateData);
            console.log("Resposta recebida:", response);
            
            if (response.status === 'success') {
                const updatedUser = response.user;
                const userLoginData = JSON.parse(localStorage.getItem("userLogin"));
                userLoginData.user = updatedUser;
                userLoginData.token = response.token;
                localStorage.setItem("userLogin", JSON.stringify(userLoginData));
                
                document.getElementById("user-name-placeholder").textContent = updatedUser.name;
                document.getElementById("dropdown-user-name").textContent = updatedUser.name;
                document.getElementById("dropdown-user-email").textContent = updatedUser.email;
                document.getElementById("welcome-message").textContent = `Olá, ${updatedUser.name}!`;
                
                if (updatedUser.photo) {
                    console.log("URL da foto:", updatedUser.photo);
                    const avatar = document.getElementById("user-avatar-placeholder");
                    avatar.innerHTML = `<img src="${updatedUser.photo}" alt="Foto de Perfil" onerror="console.log('Erro ao carregar imagem:', this.src); this.style.display='none'; this.parentElement.innerHTML='${updatedUser.name.charAt(0).toUpperCase()}';" onload="console.log('Imagem carregada com sucesso:', this.src);">`;
                } else {
                    const avatar = document.getElementById("user-avatar-placeholder");
                    avatar.innerHTML = updatedUser.name.charAt(0).toUpperCase();
                }

                closeEditModal();
                
                if (fileInputText) {
                    fileInputText.textContent = "Nenhum arquivo escolhido";
                    fileInputText.classList.remove("has-file");
                }
                if (imagePreview) {
                    imagePreview.style.display = "none";
                }
                if (previewImage) {
                    previewImage.src = "";
                }

                showToast('Dados atualizados com sucesso!', 'success');
            } else {
                showToast(response.message || 'Erro ao atualizar dados', 'error');
            }
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            console.error('Detalhes do erro:', error.message);

            let errorMessage = 'Erro ao conectar com o servidor';
            try {
                if (error.response) {
                    const errorData = JSON.parse(error.response);
                    errorMessage = errorData.message || 'Erro no servidor';
                }
            } catch (parseError) {
                console.error('Erro ao parsear resposta:', parseError);
                if (error.message.includes('Unexpected token')) {
                    errorMessage = 'Erro no servidor. Verifique os logs do PHP.';
                } else {
                    errorMessage = 'Erro ao conectar com o servidor: ' + error.message;
                }
            }
            
            showToast(errorMessage, 'error');
        } finally {
            const submitBtn = editUserForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.textContent = 'Salvar Alterações';
                submitBtn.disabled = false;
            }
        }
    });

    document.getElementById("logout-button")?.addEventListener("click", () => {
        localStorage.removeItem("userLogin");
        window.location.href = "/FillTime/login";
    });

    const dropdowns = {
        userProfile: {
            btn: document.getElementById("userProfile"),
            menu: document.getElementById("profileDropdown"),
        },
        notifications: {
            btn: document.getElementById("notificationBtn"),
            menu: document.getElementById("notificationsDropdown"),
        },
        dateRange: {
            btn: document.getElementById("dateRangeBtn"),
            menu: document.getElementById("dateRangeDropdown"),
        },
    };

    Object.values(dropdowns).forEach(({ btn, menu }) => {
        if (!btn || !menu) return;
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            closeAllDropdowns();
            menu.classList.toggle("active");
        });
        menu.addEventListener("click", (e) => e.stopPropagation());
    });

    function closeAllDropdowns() {
        Object.values(dropdowns).forEach(({ menu }) =>
            menu?.classList.remove("active")
        );
    }

    document.addEventListener("click", closeAllDropdowns);

    const bookingModal = document.getElementById("bookingModal");
    const addResourceModal = document.getElementById("addResourceModal");
    const bookingForm = document.getElementById("bookingForm");
    const courtCalendar = document.querySelector(".court-calendar");
    const resourceName = document.getElementById("resourceName");

    document.querySelectorAll(".court-action-btn.btn-primary").forEach((btn) => {
        btn.addEventListener("click", () => {
            resourceName.textContent = btn.getAttribute("data-court-name");
            bookingForm.style.display = "none";
            courtCalendar.style.display = "block";
            bookingModal.classList.add("active");
        });
    });

    // Função para carregar quadras
    async function loadCourts() {
        try {
            console.log('Carregando quadras...');
            const courts = await httpCourt.listCourts();
            console.log('Quadras carregadas:', courts);
            
            // Força o uso das novas imagens
            const courtsWithImages = courts.map((court, index) => {
                // Mapeia as quadras para as novas imagens
                const newImages = [
                    'storage/images/quadraUm.png',
                    'storage/images/quadraDois.jpg', 
                    'storage/images/quadraTres.jpg'
                ];
                
                // Força o uso das novas imagens baseado no nome da quadra
                if (court.name && court.name.includes('Futebol')) {
                    court.image = 'storage/images/quadraUm.png';
                } else if (court.name && court.name.includes('Vôlei')) {
                    court.image = 'storage/images/quadraDois.jpg';
                } else if (court.name && court.name.includes('Basquete')) {
                    court.image = 'storage/images/quadraTres.jpg';
                } else if (!court.image) {
                    // Fallback para outras quadras
                    court.image = newImages[index % newImages.length];
                }
                
                return court;
            });
            
            // Atualiza a interface com as quadras
            const courtsGrid = document.querySelector('.courts-grid');
            if (courtsGrid && courtsWithImages.length > 0) {
                courtsGrid.innerHTML = '';
                
                courtsWithImages.forEach((court, index) => {
                    const courtCard = createCourtCard(court, index + 1);
                    courtsGrid.appendChild(courtCard);
                });
            }
        } catch (error) {
            console.error('Erro ao carregar quadras:', error);
            showToast('Erro ao carregar quadras', 'error');
        }
    }
    
    // Função para criar card de quadra
    function createCourtCard(court, index) {
        const card = document.createElement('div');
        card.className = 'court-card';
        
        const statusClass = court.available ? 'available' : 'occupied';
        const statusText = court.available ? 'Disponível' : 'Ocupada';
        
        card.innerHTML = `
            <div class="court-header">
                <h3 class="court-title">${court.name || `Quadra ${index}`}</h3>
                <span class="court-status ${statusClass}">${statusText}</span>
            </div>
            <div class="court-body">
                <div class="court-image">
                    ${court.image ? `<img src="${court.image}" alt="${court.name}" style="width: 100%; height: 120px; object-fit: contain; border-radius: 8px; background: #f8f9fa;">` : '<div style="width: 100%; height: 120px; background: #f0f0f0; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #666;">Sem imagem</div>'}
                </div>
                <div class="court-info">
                    <div class="court-info-item">
                        <span class="court-info-icon location-icon"></span>
                        <span>Setor ${String.fromCharCode(64 + index)} - Arena Central</span>
                    </div>
                    <div class="court-info-item">
                        <span class="court-info-icon type-icon"></span>
                        <span>${court.type || 'Esportiva'}</span>
                    </div>
                    <div class="court-info-item">
                        <span class="court-info-icon price-icon"></span>
                        <span>R$ ${court.price ? court.price.toFixed(2) : '0,00'}/hora</span>
                    </div>
                </div>
                <div class="court-actions">
                    <button class="court-action-btn btn-primary" onclick="scheduleCourt(${court.id || index}, '${court.name || `Quadra ${index}`}')">
                        <span class="court-action-icon calendar-icon"></span>
                        <span>Agendar</span>
                    </button>
                    <button class="court-action-btn btn-secondary" onclick="editCourt(${court.id || index})">
                        <span class="court-action-icon edit-icon"></span>
                        <span>Editar</span>
                    </button>
                </div>
            </div>
        `;
        
        return card;
    }

    // Função para editar quadra
    window.editCourt = function(courtId) {
        console.log('Editando quadra:', courtId);
        
        // Busca os dados da quadra
        const courts = JSON.parse(localStorage.getItem('courts') || '[]');
        const court = courts.find(c => c.id == courtId);
        
        if (!court) {
            showToast('Quadra não encontrada', 'error');
            return;
        }
        
        // Preenche o formulário com os dados da quadra
        document.getElementById('edit-court-name').value = court.name || '';
        document.getElementById('edit-court-type').value = court.type || '';
        document.getElementById('edit-court-hours').value = court.hours || 2;
        document.getElementById('edit-court-price').value = court.price || 0;
        
        // Limpa a imagem
        document.getElementById('edit-court-image').value = '';
        document.getElementById('editCourtFileInputText').textContent = 'Nenhum arquivo escolhido';
        document.getElementById('editCourtImagePreview').style.display = 'none';
        
        // Armazena o ID da quadra para uso no submit
        document.getElementById('editCourtForm').dataset.courtId = courtId;
        
        // Abre o modal
        document.getElementById('editCourtModal').classList.add('active');
    };
    
    // Função para agendar quadra
    window.scheduleCourt = function(courtId, courtName) {
        console.log('Agendando quadra:', courtId, courtName);
        showToast('Função de agendamento em desenvolvimento', 'info');
    };
    
    // Função para remover preview de imagem da edição de quadra
    window.removeEditCourtImagePreview = function() {
        const fileInput = document.getElementById('edit-court-image');
        const fileInputText = document.getElementById('editCourtFileInputText');
        const imagePreview = document.getElementById('editCourtImagePreview');
        const previewImage = document.getElementById('editCourtPreviewImage');
        const imagePlaceholder = document.getElementById('editCourtImagePlaceholder');
        
        fileInput.value = '';
        fileInputText.textContent = 'Nenhum arquivo escolhido';
        fileInputText.classList.remove('has-file');
        imagePreview.style.display = 'none';
        imagePreview.style.visibility = 'hidden';
        imagePreview.style.opacity = '0';
        previewImage.src = '';
        previewImage.alt = '';
        previewImage.style.display = 'none';
        
        if (imagePlaceholder) {
            imagePlaceholder.style.display = 'flex';
        }
        
        const removeBtn = imagePreview.querySelector('.image-preview-remove');
        if (removeBtn) {
            removeBtn.style.display = 'none';
            removeBtn.style.visibility = 'hidden';
            removeBtn.style.opacity = '0';
        }
    };

    // Event listener para preview de imagem na edição de quadra
    document.getElementById('edit-court-image')?.addEventListener('change', function(e) {
        const file = e.target.files[0];
        const fileInputText = document.getElementById('editCourtFileInputText');
        const imagePreview = document.getElementById('editCourtImagePreview');
        const previewImage = document.getElementById('editCourtPreviewImage');
        const imagePlaceholder = document.getElementById('editCourtImagePlaceholder');
        
        if (file) {
            if (!file.type.startsWith('image/')) {
                showToast('Por favor, selecione apenas arquivos de imagem.', 'error');
                fileInput.value = '';
                return;
            }
            
            fileInputText.textContent = file.name;
            fileInputText.classList.add('has-file');
            
            const reader = new FileReader();
            reader.onload = function(e) {
                if (imagePlaceholder) {
                    imagePlaceholder.style.display = 'none';
                }
                
                previewImage.src = e.target.result;
                previewImage.alt = 'Preview da imagem selecionada';
                previewImage.style.display = 'block';
                previewImage.style.visibility = 'visible';
                previewImage.style.opacity = '1';
                
                imagePreview.style.display = 'block';
                imagePreview.style.visibility = 'visible';
                imagePreview.style.opacity = '1';
                
                const removeBtn = imagePreview.querySelector('.image-preview-remove');
                if (removeBtn) {
                    removeBtn.style.display = 'flex';
                    removeBtn.style.visibility = 'visible';
                    removeBtn.style.opacity = '1';
                }
            };
            
            reader.onerror = function(e) {
                console.error('Erro ao carregar imagem:', e);
                showToast('Erro ao carregar a imagem. Tente novamente.', 'error');
                
                if (imagePlaceholder) {
                    imagePlaceholder.style.display = 'flex';
                }
                previewImage.style.display = 'none';
            };
            
            reader.readAsDataURL(file);
        } else {
            fileInputText.textContent = 'Nenhum arquivo escolhido';
            fileInputText.classList.remove('has-file');
            imagePreview.style.display = 'none';
            previewImage.src = '';
        }
    });

    // Event listener para o formulário de edição de quadra
    document.getElementById('editCourtForm')?.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const courtId = this.dataset.courtId;
        const name = document.getElementById('edit-court-name').value.trim();
        const type = document.getElementById('edit-court-type').value;
        const hours = parseInt(document.getElementById('edit-court-hours').value);
        const price = parseFloat(document.getElementById('edit-court-price').value);
        const imageInput = document.getElementById('edit-court-image');
        const image = imageInput.files[0];
        
        if (!name || !type || !hours || !price) {
            showToast('Por favor, preencha todos os campos obrigatórios', 'error');
            return;
        }
        
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('type', type);
            formData.append('hours', hours);
            formData.append('price', price);
            if (image) {
                formData.append('image', image);
            }
            
            const response = await httpCourt.updateCourt(courtId, formData);
            
            if (response.status === 'success') {
                showToast('Quadra atualizada com sucesso!', 'success');
                document.getElementById('editCourtModal').classList.remove('active');
                loadCourts(); // Recarrega as quadras
            } else {
                showToast(response.message || 'Erro ao atualizar quadra', 'error');
            }
        } catch (error) {
            console.error('Erro ao atualizar quadra:', error);
            showToast('Erro ao conectar com o servidor', 'error');
        }
    });

    // Event listeners para fechar modal de edição
    document.getElementById('closeEditCourtModalBtn')?.addEventListener('click', () => {
        document.getElementById('editCourtModal').classList.remove('active');
    });
    
    document.getElementById('cancelEditCourtBtn')?.addEventListener('click', () => {
        document.getElementById('editCourtModal').classList.remove('active');
    });

    // Carrega quadras ao inicializar
    loadCourts();
    

    document.getElementById("addResourceBtn")?.addEventListener("click", () =>
        addResourceModal.classList.add("active")
    );

    // Event listener para o formulário de adicionar quadra
    document.querySelector('#addResourceModal form')?.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const name = document.getElementById('resource-name').value.trim();
        const type = document.getElementById('resource-type').value;
        const location = document.getElementById('resource-location').value.trim();
        const price = parseFloat(document.getElementById('resource-price').value);
        const capacity = parseInt(document.getElementById('resource-capacity').value);
        const status = document.getElementById('resource-status').value;
        const description = document.getElementById('resource-description').value.trim();
        const openingTime = document.getElementById('opening-time').value;
        const closingTime = document.getElementById('closing-time').value;
        
        if (!name || !type || !location || !price || !capacity || !status || !openingTime || !closingTime) {
            showToast('Por favor, preencha todos os campos obrigatórios', 'error');
            return;
        }
        
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('type', type);
            formData.append('hours', 2); // Duração padrão de 2 horas
            formData.append('price', price);
            
            const response = await httpCourt.createCourt(formData);
            
            if (response.status === 'success') {
                showToast('Quadra criada com sucesso!', 'success');
                document.getElementById('addResourceModal').classList.remove('active');
                loadCourts(); // Recarrega as quadras
                
                // Limpa o formulário
                this.reset();
            } else {
                showToast(response.message || 'Erro ao criar quadra', 'error');
            }
        } catch (error) {
            console.error('Erro ao criar quadra:', error);
            showToast('Erro ao conectar com o servidor', 'error');
        }
    });

    document.querySelectorAll(".close-btn").forEach((btn) =>
        btn.addEventListener("click", () => {
            bookingModal.classList.remove("active");
            addResourceModal.classList.remove("active");
        })
    );

    document.getElementById("backToCalendarBtn")?.addEventListener("click", () => {
        bookingForm.style.display = "none";
        courtCalendar.style.display = "block";
    });

    document
        .getElementById("cancelAddResourceBtn")
        ?.addEventListener("click", () =>
            addResourceModal.classList.remove("active")
        );

    document.addEventListener("click", (e) => {
        if (e.target === bookingModal) bookingModal.classList.remove("active");
        if (e.target === addResourceModal)
            addResourceModal.classList.remove("active");
    });

    const prevWeekBtn = document.getElementById("prevWeekBtn");
    const nextWeekBtn = document.getElementById("nextWeekBtn");
    const weekRangeDisplay = document.getElementById("weekRangeDisplay");
    let currentWeekStart = new Date(2025, 4, 20);

    function updateWeekDisplay() {
        const weekEnd = new Date(currentWeekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);

        const startDay = currentWeekStart.getDate();
        const endDay = weekEnd.getDate();
        const month = currentWeekStart.toLocaleString("pt-BR", { month: "long" });
        const year = currentWeekStart.getFullYear();

        weekRangeDisplay.textContent = `Semana de ${startDay} a ${endDay} de ${month}, ${year}`;
    }

    prevWeekBtn?.addEventListener("click", () => {
        currentWeekStart.setDate(currentWeekStart.getDate() - 7);
        updateWeekDisplay();
    });

    nextWeekBtn?.addEventListener("click", () => {
        currentWeekStart.setDate(currentWeekStart.getDate() + 7);
        updateWeekDisplay();
    });

    document.querySelectorAll(".time-slot:not(.booked)").forEach((slot) => {
        slot.addEventListener("click", () => {
            const timeLabel =
                slot.previousElementSibling?.textContent ||
                slot.parentElement.firstElementChild.textContent;

            const dayIndex =
                Array.from(slot.parentElement.children).indexOf(slot) % 8;
            const days = [
                "",
                "Segunda",
                "Terça",
                "Quarta",
                "Quinta",
                "Sexta",
                "Sábado",
                "Domingo",
            ];
            const day = days[dayIndex];

            const dateInput = document.getElementById("date");
            const startTimeInput = document.getElementById("start-time");
            const endTimeInput = document.getElementById("end-time");

            const targetDate = new Date(currentWeekStart);
            targetDate.setDate(currentWeekStart.getDate() + dayIndex - 1);

            dateInput.value = targetDate.toISOString().split("T")[0];
            startTimeInput.value = timeLabel.trim() + ":00";

            const startHour = parseInt(timeLabel.trim());
            endTimeInput.value = startHour + 1 + ":00";

            courtCalendar.style.display = "none";
            bookingForm.style.display = "block";
        });
    });
});

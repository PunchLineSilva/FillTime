class HttpUser {
    constructor() {
        this.baseUrl = 'http://localhost/FillTime/api/users';
    }
    
    async updateUser(token, userData) {
        try {
            if (!token) {
                throw new Error("Token não fornecido.");
            }
            
            console.log("Enviando requisição para:", `${this.baseUrl}/update`);
            console.log("Token sendo enviado:", token.substring(0, 20) + "...");
            console.log("Headers da requisição:", {
                'Authorization': `Bearer ${token}`
            });
            
            const response = await fetch(`${this.baseUrl}/update`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: userData
            });
            
            console.log("Status da resposta:", response.status);
            console.log("Headers da resposta:", response.headers);
            
            const responseData = await response.json();
            console.log("Dados da resposta:", responseData);
            
            return responseData;
        } catch (error) {
            console.error('Erro na requisição:', error);
            throw error;
        }
    }
}

class Toast {
    show(message, type = 'info') {
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background: ${type === 'error' ? '#dc2626' : type === 'success' ? '#16a34a' : '#3b82f6'};
            color: white;
            border-radius: 8px;
            z-index: 10000;
            font-weight: 500;
        `;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const api = new HttpUser();
    const toast = new Toast();

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
                    toast.show("Por favor, selecione apenas arquivos de imagem.", "error");
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
                    toast.show("Erro ao carregar a imagem. Tente novamente.", "error");
                    
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
            toast.show('Por favor, preencha todos os campos obrigatórios', 'error');
            return;
        }
        
        try {
            const userLoginData = localStorage.getItem("userLogin");
            if (!userLoginData) {
                toast.show('Sessão expirada. Faça login novamente.', 'error');
                return;
            }
            
            const userData = JSON.parse(userLoginData);
            console.log("Dados do localStorage:", userData);
            
            const token = userData.token;
            console.log("Token extraído:", token);
            
            if (!token) {
                toast.show('Token não encontrado. Faça login novamente.', 'error');
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
            
            const response = await api.updateUser(token, updateData);
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

                toast.show('Dados atualizados com sucesso!', 'success');
            } else {
                toast.show(response.message || 'Erro ao atualizar dados', 'error');
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
            
            toast.show(errorMessage, 'error');
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

    document.getElementById("addResourceBtn")?.addEventListener("click", () =>
        addResourceModal.classList.add("active")
    );

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

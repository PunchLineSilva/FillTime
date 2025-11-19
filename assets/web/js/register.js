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

async function createUser(userData) {
    try {
        const response = await fetch('http://localhost/FillTime/api/users/create', {
            method: 'POST',
            body: userData
        });
        
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Erro na requisição:', error);
        throw error;
    }
}

console.log("=== REGISTER.JS CARREGADO ===");

const formRegister = document.querySelector("#auth-form");
console.log("Formulário encontrado:", formRegister);

const passwordInput = document.querySelector("#password");
const passwordToggle = document.querySelector(".password-toggle");
const strengthMeter = document.querySelector(".strength-meter");
const strengthText = document.querySelector(".strength-text");
const strengthSegments = document.querySelectorAll(".strength-segment");

console.log("Elementos encontrados:", {
    passwordInput,
    passwordToggle,
    strengthMeter,
    strengthText,
    strengthSegments: strengthSegments.length
});

function calculatePasswordStrength(password) {
    let score = 0;
    let feedback = [];

    if (password.length >= 8) score += 1;
    else feedback.push("Mínimo 8 caracteres");
    
    if (password.length >= 12) score += 1;
    
    if (/[a-z]/.test(password)) score += 1;
    else feedback.push("Letras minúsculas");
    
    if (/[A-Z]/.test(password)) score += 1;
    else feedback.push("Letras maiúsculas");
    
    if (/[0-9]/.test(password)) score += 1;
    else feedback.push("Números");
    
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    else feedback.push("Caracteres especiais");
    
    return { score, feedback };
}

function updatePasswordStrength(password) {
    console.log("Atualizando força da senha:", password);
    const { score, feedback } = calculatePasswordStrength(password);
    console.log("Score da senha:", score);
    
    if (strengthSegments.length === 0) {
        console.error("Segmentos de força não encontrados!");
        return;
    }
    
    strengthSegments.forEach(segment => {
        segment.style.backgroundColor = "#E5E7EB"; // var(--neutral-200)
    });
    
    for (let i = 0; i < score && i < 4; i++) {
        if (score <= 1) {
            strengthSegments[i].style.backgroundColor = "#EF4444"; // var(--error-500)
        } else if (score <= 2) {
            strengthSegments[i].style.backgroundColor = "#F59E0B"; // var(--warning-500)
        } else if (score <= 3) {
            strengthSegments[i].style.backgroundColor = "#3B82F6"; // var(--primary-500)
        } else {
            strengthSegments[i].style.backgroundColor = "#10B981"; // var(--success-500)
        }
    }
    
    if (strengthText) {
        if (password.length === 0) {
            strengthText.textContent = "Digite uma senha";
            strengthText.style.color = "#6B7280"; // var(--neutral-500)
        } else if (score <= 1) {
            strengthText.textContent = "Senha fraca";
            strengthText.style.color = "#EF4444"; // var(--error-500)
        } else if (score <= 2) {
            strengthText.textContent = "Senha média";
            strengthText.style.color = "#F59E0B"; // var(--warning-500)
        } else if (score <= 3) {
            strengthText.textContent = "Senha boa";
            strengthText.style.color = "#3B82F6"; // var(--primary-500)
        } else {
            strengthText.textContent = "Senha forte";
            strengthText.style.color = "#10B981"; // var(--success-500)
        }
    }
}

function togglePasswordVisibility() {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        passwordToggle.setAttribute("aria-label", "Ocultar senha");
        passwordToggle.classList.add("show");
    } else {
        passwordInput.type = "password";
        passwordToggle.setAttribute("aria-label", "Mostrar senha");
        passwordToggle.classList.remove("show");
    }
}

if (passwordInput) {
    passwordInput.addEventListener("input", (e) => {
        updatePasswordStrength(e.target.value);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    if (passwordToggle) {
        passwordToggle.addEventListener("click", togglePasswordVisibility);
    }
});

if (formRegister) {
    console.log("Adicionando listener ao formulário");
    formRegister.addEventListener("submit", async (event) => {
        console.log("Formulário submetido!");
        event.preventDefault();
        
        const password = passwordInput.value;
        console.log("Senha digitada:", password);
        const { score } = calculatePasswordStrength(password);
        console.log("Score da senha:", score);
        
        if (score < 2) {
            showToast("A senha deve ter pelo menos 8 caracteres com letras e números", "error");
            return;
        }
        
        const userData = new FormData(formRegister);
        console.log("Dados do formulário:", userData);
        
        try {
            console.log("Enviando requisição para API...");
            const userCreated = await createUser(userData);
            console.log("Resposta da API:", userCreated);
            
            if (userCreated.type === "success") {
                showToast(userCreated.message, "success");
                setTimeout(() => {
                    window.location.href = "/FillTime/login"; 
                }, 2000);
            } else {
                showToast(userCreated.message, "error");
            }
        } catch (error) {
            console.error("Erro no cadastro:", error);
            showToast("Utilize de números e caracteres para a senha. Tente novamente.", "error");
        }
    });
} else {
    console.error("Formulário não encontrado!");
}
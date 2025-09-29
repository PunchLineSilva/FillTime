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
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        document.body.removeChild(toast);
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

const formRegister = document.querySelector("#auth-form");

const passwordInput = document.querySelector("#password");
const passwordToggle = document.querySelector(".password-toggle");
const strengthMeter = document.querySelector(".strength-meter");
const strengthText = document.querySelector(".strength-text");
const strengthSegments = document.querySelectorAll(".strength-segment");

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
    const { score, feedback } = calculatePasswordStrength(password);
    
    strengthSegments.forEach(segment => {
        segment.style.backgroundColor = "var(--neutral-200)";
    });
    
    for (let i = 0; i < score && i < 4; i++) {
        if (score <= 1) {
            strengthSegments[i].style.backgroundColor = "var(--error-500)";
        } else if (score <= 2) {
            strengthSegments[i].style.backgroundColor = "var(--warning-500)";
        } else if (score <= 3) {
            strengthSegments[i].style.backgroundColor = "var(--primary-500)";
        } else {
            strengthSegments[i].style.backgroundColor = "var(--success-500)";
        }
    }
    
    if (password.length === 0) {
        strengthText.textContent = "Digite uma senha";
        strengthText.style.color = "var(--neutral-500)";
    } else if (score <= 1) {
        strengthText.textContent = "Senha fraca";
        strengthText.style.color = "var(--error-500)";
    } else if (score <= 2) {
        strengthText.textContent = "Senha média";
        strengthText.style.color = "var(--warning-500)";
    } else if (score <= 3) {
        strengthText.textContent = "Senha boa";
        strengthText.style.color = "var(--primary-500)";
    } else {
        strengthText.textContent = "Senha forte";
        strengthText.style.color = "var(--success-500)";
    }
}

function togglePasswordVisibility() {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        passwordToggle.setAttribute("aria-label", "Ocultar senha");
    } else {
        passwordInput.type = "password";
        passwordToggle.setAttribute("aria-label", "Mostrar senha");
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
    formRegister.addEventListener("submit", async (event) => {
        event.preventDefault();
        
        const password = passwordInput.value;
        const { score } = calculatePasswordStrength(password);
        
        if (score < 2) {
            showToast("A senha deve ter pelo menos 8 caracteres com letras e números", "error");
            return;
        }
        
        const userData = new FormData(formRegister);
        
        try {
            const userCreated = await createUser(userData);
            
            if (userCreated.type === "success") {
                showToast(userCreated.message, "success");
                setTimeout(() => {
                    window.location.href = "/FillTime/login"; 
                }, 2000);
            } else {
                showToast(userCreated.message, "error");
            }
        } catch (error) {
            showToast("Utilize de números e caracteres para a senha. Tente novamente.", "error");
        }
    });
}
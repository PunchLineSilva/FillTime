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

async function loginUser(email, password) {
    try {
        const response = await fetch('http://localhost/FillTime/api/users/login', {
            method: 'GET',
            headers: {
                'email': email,
                'password': password
            }
        });
        
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Erro na requisição:', error);
        throw error;
    }
}

const formLogin = document.querySelector("#formLogin");
const passwordInput = document.querySelector("#password");
const passwordToggle = document.querySelector(".password-toggle");

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

document.addEventListener('DOMContentLoaded', function() {
    const passwordToggle = document.querySelector(".password-toggle");
    const formLogin = document.querySelector("#formLogin");
    const passwordInput = document.querySelector("#password");
    
    if (passwordToggle) {
        passwordToggle.addEventListener("click", function() {
            if (passwordInput.type === "password") {
                passwordInput.type = "text";
                passwordToggle.setAttribute("aria-label", "Ocultar senha");
                passwordToggle.classList.add("show");
            } else {
                passwordInput.type = "password";
                passwordToggle.setAttribute("aria-label", "Mostrar senha");
                passwordToggle.classList.remove("show");
            }
        });
    }
});

    if (formLogin) {
        formLogin.addEventListener("submit", async (event) => {
            event.preventDefault();
            const loginData = new FormData(formLogin);
            const email = loginData.get("email");
            const password = loginData.get("password");

            try {
                const response = await loginUser(email, password);
                showToast(response.message, response.status);
                
                if (response.status === "success") {
                    localStorage.setItem("userLogin", JSON.stringify(response.data));
                    
                    setTimeout(() => {
                        window.location.href = "/FillTime/app"; 
                    }, 2000);
                }
            } catch (error) {
                showToast("Ocorreu um erro ao tentar fazer login. Tente novamente.", "error");
            }
        });
    }
;
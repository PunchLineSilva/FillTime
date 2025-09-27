import { HttpUser } from "../../_shared/js/HttpUser.js";
import { Toast } from "../../_shared/js/Toast.js";

const requestUserLogin = new HttpUser();
const toast = new Toast();

const formLogin = document.querySelector("#formLogin");
const passwordInput = document.querySelector("#password");
const passwordToggle = document.querySelector(".password-toggle");

function togglePasswordVisibility() {
    console.log("Toggle clicked, current type:", passwordInput.type);
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        passwordToggle.setAttribute("aria-label", "Ocultar senha");
        passwordToggle.classList.add("show");
        console.log("Added show class, classes:", passwordToggle.className);
    } else {
        passwordInput.type = "password";
        passwordToggle.setAttribute("aria-label", "Mostrar senha");
        passwordToggle.classList.remove("show");
        console.log("Removed show class, classes:", passwordToggle.className);
    }
}

if (passwordToggle) {
    passwordToggle.addEventListener("click", togglePasswordVisibility);
}

if (formLogin) {
    formLogin.addEventListener("submit", async (event) => {
        event.preventDefault();
        const loginData = new FormData(formLogin);
        const headers = {
            email: loginData.get("email"),
            password: loginData.get("password")
        };

        try {
            const userLogin = await requestUserLogin.loginUser({}, headers);
            toast.show(userLogin.message, userLogin.status);
            
            if (userLogin.status === "success") {
                localStorage.setItem("userLogin", JSON.stringify(userLogin.data));
                
                setTimeout(() => {
                    console.log("Redirect")
                    window.location.href = "/FillTime/app"; 
                }, 2000);
            }
        } catch (error) {
            toast.show("Ocorreu um erro ao tentar fazer login. Tente novamente.", "error");
            console.error("Erro ao fazer login:", error);
        }
    });
}
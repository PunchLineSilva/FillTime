/**
 * Classe Toast - Sistema de notificações padronizado
 * Implementa conceitos de Orientação a Objetos com encapsulamento
 */
export class Toast {
    #container;
    #defaultDuration;
    #maxToasts;

    /**
     * Construtor da classe Toast
     * @param {Object} options - Opções de configuração
     * @param {number} options.defaultDuration - Duração padrão em ms
     * @param {number} options.maxToasts - Número máximo de toasts simultâneos
     */
    constructor(options = {}) {
        this.#defaultDuration = options.defaultDuration || 4000;
        this.#maxToasts = options.maxToasts || 5;
        this.#container = null;
        this.#initializeContainer();
    }

    /**
     * Inicializa o container de toasts
     * @private
     */
    #initializeContainer() {
        if (!this.#container) {
            this.#container = document.createElement('div');
            this.#container.className = 'toast-container';
            this.#container.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                display: flex;
                flex-direction: column;
                gap: 12px;
                max-width: 400px;
                pointer-events: none;
            `;
            document.body.appendChild(this.#container);
        }
    }

    /**
     * Cores e estilos para cada tipo de toast
     * @private
     */
    #getToastStyles() {
        return {
            success: {
                background: 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)',
                icon: '✓'
            },
            error: {
                background: 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)',
                icon: '✕'
            },
            warning: {
                background: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)',
                icon: '⚠'
            },
            info: {
                background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
                icon: 'ℹ'
            }
        };
    }

    /**
     * Remove toasts antigos se exceder o limite
     * @private
     */
    #manageToastLimit() {
        const toasts = this.#container.querySelectorAll('.toast');
        if (toasts.length >= this.#maxToasts) {
            const oldestToast = toasts[0];
            oldestToast.remove();
        }
    }

    /**
     * Exibe um toast com mensagem e tipo específicos
     * @param {string} message - Mensagem a ser exibida
     * @param {string} type - Tipo do toast (success, error, warning, info)
     * @param {number} duration - Duração em milissegundos
     */
    show(message, type = 'info', duration = null) {
        if (!message) return;

        this.#manageToastLimit();

        const actualDuration = duration || this.#defaultDuration;
        const styles = this.#getToastStyles();
        const toastStyle = styles[type] || styles.info;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.style.cssText = `
            padding: 0;
            border-radius: 12px;
            color: #fff;
            font-size: 14px;
            font-weight: 500;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
            display: flex;
            align-items: center;
            min-height: 56px;
            pointer-events: auto;
        `;

        toast.style.background = toastStyle.background;

        toast.innerHTML = `
            <div style="
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                padding: 16px 20px 16px 50px;
                position: relative;
            ">
                <div style="
                    position: absolute;
                    left: 16px;
                    top: 50%;
                    transform: translateY(-50%);
                    font-size: 18px;
                    font-weight: bold;
                ">${toastStyle.icon}</div>
                <span style="flex: 1; line-height: 1.4; margin-left: 8px;">${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    background: none;
                    border: none;
                    color: rgba(255, 255, 255, 0.8);
                    font-size: 18px;
                    font-weight: bold;
                    cursor: pointer;
                    padding: 4px 8px;
                    border-radius: 4px;
                    transition: all 0.2s ease;
                    margin-left: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 24px;
                    height: 24px;
                " onmouseover="this.style.background='rgba(255, 255, 255, 0.1)'" onmouseout="this.style.background='none'">×</button>
            </div>
        `;

        this.#container.appendChild(toast);

        // Animação de entrada
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(0)';
        }, 10);

        // Animação de saída
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%) scale(0.95)';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, actualDuration);
    }

    /**
     * Exibe toast de sucesso
     * @param {string} message - Mensagem de sucesso
     * @param {number} duration - Duração em milissegundos
     */
    success(message, duration = null) {
        this.show(message, 'success', duration);
    }

    /**
     * Exibe toast de erro
     * @param {string} message - Mensagem de erro
     * @param {number} duration - Duração em milissegundos
     */
    error(message, duration = null) {
        this.show(message, 'error', duration);
    }

    /**
     * Exibe toast de aviso
     * @param {string} message - Mensagem de aviso
     * @param {number} duration - Duração em milissegundos
     */
    warning(message, duration = null) {
        this.show(message, 'warning', duration);
    }

    /**
     * Exibe toast informativo
     * @param {string} message - Mensagem informativa
     * @param {number} duration - Duração em milissegundos
     */
    info(message, duration = null) {
        this.show(message, 'info', duration);
    }

    /**
     * Processa resposta da API e exibe toast apropriado
     * @param {Object} response - Resposta da API
     */
    showFromResponse(response) {
        if (!response || !response.type || !response.message) {
            this.error('Resposta inválida da API');
            return;
        }

        const { type, message } = response;
        
        switch (type) {
            case 'success':
                this.success(message);
                break;
            case 'error':
                this.error(message);
                break;
            case 'warning':
                this.warning(message);
                break;
            default:
                this.info(message);
        }
    }

    /**
     * Remove todos os toasts
     */
    clear() {
        if (this.#container) {
            this.#container.innerHTML = '';
        }
    }

    /**
     * Destrói a instância do Toast
     */
    destroy() {
        if (this.#container && this.#container.parentNode) {
            this.#container.parentNode.removeChild(this.#container);
        }
        this.#container = null;
    }
}

// Instância global do Toast
const globalToast = new Toast();

// Exporta tanto a classe quanto a instância global
export { globalToast as Toast };

// Mantém compatibilidade com o código existente
window.Toast = globalToast;
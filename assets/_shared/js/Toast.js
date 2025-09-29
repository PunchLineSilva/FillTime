(function() {
    'use strict';
    
    let toastContainer = null;
    
    function createContainer() {
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container';
            toastContainer.style.cssText = `
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
            document.body.appendChild(toastContainer);
            console.log('Toast container criado');
        }
        return toastContainer;
    }
    
    function showToast(message, type, duration = 4000) {
        console.log('Mostrando toast:', message, type);
        
        const container = createContainer();
        
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
        
        const colors = {
            success: 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)',
            error: 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)',
            info: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
            warning: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)'
        };
        
        toast.style.background = colors[type] || colors.info;
        
        toast.innerHTML = `
            <div style="
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                padding: 16px 20px 16px 50px;
                position: relative;
            ">
                <span style="flex: 1; line-height: 1.4;">${message}</span>
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
        
        container.appendChild(toast);
        console.log('Toast adicionado ao container');
        
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(0)';
        }, 10);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%) scale(0.95)';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, duration);
    }
    
    window.Toast = {
        success: function(message, duration) {
            showToast(message, 'success', duration);
        },
        error: function(message, duration) {
            showToast(message, 'error', duration);
        },
        info: function(message, duration) {
            showToast(message, 'info', duration);
        },
        warning: function(message, duration) {
            showToast(message, 'warning', duration);
        }
    };
    
    console.log('Toast global criado:', window.Toast);
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            console.log('DOM carregado, Toast pronto');
        });
    } else {
        console.log('DOM já carregado, Toast pronto');
    }
})();
import HttpClientBase from './HttpClientBase.js';
import { User } from './Models/User.js';
import { Toast } from './Toast.js';

export class HttpUser extends HttpClientBase {
    #toast;

    /**
     * Construtor da classe HttpUser
     * @param {string} baseUrl - URL base da API
     */
    constructor(baseUrl = 'http://localhost/FillTime/api/users') {
        super(baseUrl);
        this.#toast = new Toast();
    }

    /**
     * Cria um novo usuário
     * @param {User|FormData|Object} userData - Dados do usuário
     * @returns {Promise<Object>} - Resposta da API
     */
    async createUser(userData) {
        try {
            let data = userData;
            
            if (userData instanceof User) {
                data = userData.toFormData();
            }
            
            const response = await this.post('/create', data);
            this.#toast.showFromResponse(response);
            return response;
        } catch (error) {
            this.#toast.error('Erro ao criar usuário: ' + error.message);
            throw error;
        }
    }

    /**
     * Realiza login do usuário
     * @param {string} email - Email do usuário
     * @param {string} password - Senha do usuário
     * @returns {Promise<Object>} - Resposta da API
     */
    async loginUser(email, password) {
        try {
            const headers = {
                'email': email,
                'password': password
            };
            
            const response = await this.get('/login', {}, headers);
            this.#toast.showFromResponse(response);
            return response;
        } catch (error) {
            this.#toast.error('Erro ao fazer login: ' + error.message);
            throw error;
        }
    }

    /**
     * Atualiza dados do usuário
     * @param {string} token - Token de autenticação
     * @param {User|FormData|Object} userData - Dados do usuário
     * @returns {Promise<Object>} - Resposta da API
     */
    async updateUser(token, userData) {
        try {
            this.setAuthToken(token);
            
            let data = userData;
            
            if (userData instanceof User) {
                data = userData.toFormData();
            }
            
            const response = await this.post('/update', data);
            this.#toast.showFromResponse(response);
            return response;
        } catch (error) {
            this.#toast.error('Erro ao atualizar usuário: ' + error.message);
            throw error;
        } finally {
            this.clearAuthToken();
        }
    }

    /**
     * Busca dados do usuário logado
     * @param {string} token - Token de autenticação
     * @returns {Promise<User>} - Instância de User com dados
     */
    async me(token) {
        try {
            this.setAuthToken(token);
            const response = await this.get("/me");
            
            if (response.type === 'success' && response.data) {
                return new User(response.data);
            }
            
            throw new Error(response.message || 'Erro ao buscar dados do usuário');
        } catch (error) {
            this.#toast.error('Erro ao buscar dados do usuário: ' + error.message);
            throw error;
        } finally {
            this.clearAuthToken();
        }
    }

    /**
     * Busca usuário por ID
     * @param {string} token - Token de autenticação
     * @param {number} userId - ID do usuário
     * @returns {Promise<User>} - Instância de User
     */
    async getUserById(token, userId) {
        try {
            this.setAuthToken(token);
            const response = await this.get(`/${userId}`);
            
            if (response.type === 'success' && response.data) {
                return new User(response.data);
            }
            
            throw new Error(response.message || 'Usuário não encontrado');
        } catch (error) {
            this.#toast.error('Erro ao buscar usuário: ' + error.message);
            throw error;
        } finally {
            this.clearAuthToken();
        }
    }

    /**
     * Lista todos os usuários
     * @param {string} token - Token de autenticação
     * @returns {Promise<User[]>} - Array de instâncias de User
     */
    async listUsers(token) {
        try {
            this.setAuthToken(token);
            const response = await this.get('/');
            
            if (response.type === 'success' && response.data) {
                return response.data.map(userData => new User(userData));
            }
            
            throw new Error(response.message || 'Erro ao listar usuários');
        } catch (error) {
            this.#toast.error('Erro ao listar usuários: ' + error.message);
            throw error;
        } finally {
            this.clearAuthToken();
        }
    }

    /**
     * Deleta um usuário
     * @param {string} token - Token de autenticação
     * @param {number} userId - ID do usuário
     * @returns {Promise<Object>} - Resposta da API
     */
    async deleteUser(token, userId) {
        try {
            this.setAuthToken(token);
            const response = await this.delete(`/${userId}`);
            this.#toast.showFromResponse(response);
            return response;
        } catch (error) {
            this.#toast.error('Erro ao deletar usuário: ' + error.message);
            throw error;
        } finally {
            this.clearAuthToken();
        }
    }

    /**
     * Altera senha do usuário
     * @param {string} token - Token de autenticação
     * @param {string} currentPassword - Senha atual
     * @param {string} newPassword - Nova senha
     * @returns {Promise<Object>} - Resposta da API
     */
    async changePassword(token, currentPassword, newPassword) {
        try {
            this.setAuthToken(token);
            
            const data = {
                currentPassword,
                newPassword
            };
            
            const response = await this.post('/change-password', data);
            this.#toast.showFromResponse(response);
            return response;
        } catch (error) {
            this.#toast.error('Erro ao alterar senha: ' + error.message);
            throw error;
        } finally {
            this.clearAuthToken();
        }
    }

    /**
     * Solicita recuperação de senha
     * @param {string} email - Email do usuário
     * @returns {Promise<Object>} - Resposta da API
     */
    async requestPasswordRecovery(email) {
        try {
            const data = { email };
            const response = await this.post('/password-recovery', data);
            this.#toast.showFromResponse(response);
            return response;
        } catch (error) {
            this.#toast.error('Erro ao solicitar recuperação de senha: ' + error.message);
            throw error;
        }
    }

    /**
     * Redefine senha com token
     * @param {string} token - Token de recuperação
     * @param {string} newPassword - Nova senha
     * @returns {Promise<Object>} - Resposta da API
     */
    async resetPassword(token, newPassword) {
        try {
            const data = {
                token,
                newPassword
            };
            
            const response = await this.post('/reset-password', data);
            this.#toast.showFromResponse(response);
            return response;
        } catch (error) {
            this.#toast.error('Erro ao redefinir senha: ' + error.message);
            throw error;
        }
    }
}
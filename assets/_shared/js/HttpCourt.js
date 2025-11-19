import HttpClientBase from './HttpClientBase.js';
import { Court } from './Models/Court.js';
import { Toast } from './Toast.js';

export class HttpCourt extends HttpClientBase {
    #toast;

    /**
     * Construtor da classe HttpCourt
     * @param {string} baseUrl - URL base da API
     */
    constructor(baseUrl = 'http://localhost/FillTime/api/courts') {
        super(baseUrl);
        this.#toast = new Toast();
    }

    /**
     * Lista todas as quadras
     * @returns {Promise<Court[]>} - Array de instâncias de Court
     */
    async listCourts() {
        try {
            const response = await this.get('/');
            
            if (response.type === 'success' && response.data) {
                return response.data.map(courtData => new Court(courtData));
            }
            
            throw new Error(response.message || 'Erro ao listar quadras');
        } catch (error) {
            this.#toast.error('Erro ao listar quadras: ' + error.message);
            throw error;
        }
    }

    /**
     * Busca quadra por ID
     * @param {number} courtId - ID da quadra
     * @returns {Promise<Court>} - Instância de Court
     */
    async getCourtById(courtId) {
        try {
            const response = await this.get(`/${courtId}`);
            
            if (response.type === 'success' && response.data) {
                return new Court(response.data);
            }
            
            throw new Error(response.message || 'Quadra não encontrada');
        } catch (error) {
            this.#toast.error('Erro ao buscar quadra: ' + error.message);
            throw error;
        }
    }

    /**
     * Cria uma nova quadra
     * @param {Court|FormData|Object} courtData - Dados da quadra
     * @returns {Promise<Object>} - Resposta da API
     */
    async createCourt(courtData) {
        try {
            let data = courtData;
            
            if (courtData instanceof Court) {
                data = courtData.toFormData();
            }
            
            const response = await this.post('/', data);
            this.#toast.showFromResponse(response);
            return response;
        } catch (error) {
            this.#toast.error('Erro ao criar quadra: ' + error.message);
            throw error;
        }
    }

    /**
     * Atualiza uma quadra
     * @param {number} courtId - ID da quadra
     * @param {Court|FormData|Object} courtData - Dados da quadra
     * @returns {Promise<Object>} - Resposta da API
     */
    async updateCourt(courtId, courtData) {
        try {
            let data = courtData;
            
            if (courtData instanceof Court) {
                data = courtData.toFormData();
            }
            
            const response = await this.put(`/${courtId}`, data);
            this.#toast.showFromResponse(response);
            return response;
        } catch (error) {
            this.#toast.error('Erro ao atualizar quadra: ' + error.message);
            throw error;
        }
    }

    /**
     * Deleta uma quadra
     * @param {number} courtId - ID da quadra
     * @returns {Promise<Object>} - Resposta da API
     */
    async deleteCourt(courtId) {
        try {
            const response = await this.delete(`/${courtId}`);
            this.#toast.showFromResponse(response);
            return response;
        } catch (error) {
            this.#toast.error('Erro ao deletar quadra: ' + error.message);
            throw error;
        }
    }

    /**
     * Upload de imagem para quadra
     * @param {number} courtId - ID da quadra
     * @param {File} imageFile - Arquivo de imagem
     * @returns {Promise<Object>} - Resposta da API
     */
    async uploadCourtImage(courtId, imageFile) {
        try {
            const formData = new FormData();
            formData.append('image', imageFile);
            formData.append('courtId', courtId);
            
            const response = await this.post(`/${courtId}/image`, formData);
            this.#toast.showFromResponse(response);
            return response;
        } catch (error) {
            this.#toast.error('Erro ao fazer upload da imagem: ' + error.message);
            throw error;
        }
    }

    /**
     * Remove imagem da quadra
     * @param {number} courtId - ID da quadra
     * @returns {Promise<Object>} - Resposta da API
     */
    async removeCourtImage(courtId) {
        try {
            const response = await this.delete(`/${courtId}/image`);
            this.#toast.showFromResponse(response);
            return response;
        } catch (error) {
            this.#toast.error('Erro ao remover imagem: ' + error.message);
            throw error;
        }
    }

    /**
     * Busca quadras por tipo
     * @param {string} type - Tipo da quadra
     * @returns {Promise<Court[]>} - Array de instâncias de Court
     */
    async getCourtsByType(type) {
        try {
            const response = await this.get('/', { type });
            
            if (response.type === 'success' && response.data) {
                return response.data.map(courtData => new Court(courtData));
            }
            
            throw new Error(response.message || 'Erro ao buscar quadras por tipo');
        } catch (error) {
            this.#toast.error('Erro ao buscar quadras por tipo: ' + error.message);
            throw error;
        }
    }

    /**
     * Busca quadras por faixa de preço
     * @param {number} minPrice - Preço mínimo
     * @param {number} maxPrice - Preço máximo
     * @returns {Promise<Court[]>} - Array de instâncias de Court
     */
    async getCourtsByPriceRange(minPrice, maxPrice) {
        try {
            const response = await this.get('/', { 
                minPrice, 
                maxPrice 
            });
            
            if (response.type === 'success' && response.data) {
                return response.data.map(courtData => new Court(courtData));
            }
            
            throw new Error(response.message || 'Erro ao buscar quadras por preço');
        } catch (error) {
            this.#toast.error('Erro ao buscar quadras por preço: ' + error.message);
            throw error;
        }
    }
}

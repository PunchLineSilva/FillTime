export class Type {
    #id;
    #description;
    #createdAt;
    #updatedAt;

    /**
     * Construtor da classe Type
     * @param {Object} typeData - Dados do tipo
     * @param {number} typeData.id - ID do tipo
     * @param {string} typeData.description - Descrição do tipo
     * @param {string} typeData.createdAt - Data de criação
     * @param {string} typeData.updatedAt - Data de atualização
     */
    constructor(typeData = {}) {
        this.#id = typeData.id || null;
        this.#description = typeData.description || null;
        this.#createdAt = typeData.createdAt || typeData.created_at || null;
        this.#updatedAt = typeData.updatedAt || typeData.updated_at || null;
    }

    get id() {
        return this.#id;
    }

    get description() {
        return this.#description;
    }

    get createdAt() {
        return this.#createdAt;
    }

    get updatedAt() {
        return this.#updatedAt;
    }

    // Setters
    set id(value) {
        this.#id = value;
    }

    set description(value) {
        this.#description = value;
    }

    set createdAt(value) {
        this.#createdAt = value;
    }

    set updatedAt(value) {
        this.#updatedAt = value;
    }

    /**
     * Valida se o tipo tem dados mínimos necessários
     * @returns {boolean} - True se válido, false caso contrário
     */
    isValid() {
        return !!(this.#description && this.#description.trim().length > 0);
    }

    /**
     * Converte o objeto para JSON
     * @returns {Object} - Objeto JSON
     */
    toJSON() {
        return {
            id: this.#id,
            description: this.#description,
            createdAt: this.#createdAt,
            updatedAt: this.#updatedAt
        };
    }

    /**
     * Converte o objeto para FormData
     * @returns {FormData} - FormData com os dados do tipo
     */
    toFormData() {
        const formData = new FormData();
        
        if (this.#id) formData.append('id', this.#id);
        if (this.#description) formData.append('description', this.#description);
        
        return formData;
    }

    /**
     * Cria uma instância de Type a partir de dados JSON
     * @param {Object} jsonData - Dados JSON
     * @returns {Type} - Nova instância de Type
     */
    static fromJSON(jsonData) {
        return new Type(jsonData);
    }

    /**
     * Cria uma instância de Type a partir de dados de formulário
     * @param {FormData} formData - Dados do formulário
     * @returns {Type} - Nova instância de Type
     */
    static fromFormData(formData) {
        const typeData = {};
        for (const [key, value] of formData.entries()) {
            typeData[key] = value;
        }
        return new Type(typeData);
    }
}

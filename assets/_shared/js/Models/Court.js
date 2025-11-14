/**
 * Classe Court - Representa uma quadra do sistema
 * Implementa conceitos de Orientação a Objetos com encapsulamento
 */
export class Court {
    #id;
    #name;
    #hours;
    #type;
    #price;
    #image;
    #createdAt;
    #updatedAt;

    /**
     * Construtor da classe Court
     * @param {Object} courtData - Dados da quadra
     * @param {number} courtData.id - ID da quadra
     * @param {string} courtData.name - Nome da quadra
     * @param {number} courtData.hours - Horas de funcionamento
     * @param {string} courtData.type - Tipo da quadra
     * @param {number} courtData.price - Preço da quadra
     * @param {string} courtData.image - Imagem da quadra
     * @param {string} courtData.createdAt - Data de criação
     * @param {string} courtData.updatedAt - Data de atualização
     */
    constructor(courtData = {}) {
        this.#id = courtData.id || null;
        this.#name = courtData.name || null;
        this.#hours = courtData.hours || null;
        this.#type = courtData.type || null;
        this.#price = courtData.price || null;
        this.#image = courtData.image || null;
        this.#createdAt = courtData.createdAt || courtData.created_at || null;
        this.#updatedAt = courtData.updatedAt || courtData.updated_at || null;
    }

    // Getters
    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    get hours() {
        return this.#hours;
    }

    get type() {
        return this.#type;
    }

    get price() {
        return this.#price;
    }

    get image() {
        return this.#image;
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

    set name(value) {
        this.#name = value;
    }

    set hours(value) {
        this.#hours = parseInt(value) || null;
    }

    set type(value) {
        this.#type = value;
    }

    set price(value) {
        this.#price = parseFloat(value) || null;
    }

    set image(value) {
        this.#image = value;
    }

    set createdAt(value) {
        this.#createdAt = value;
    }

    set updatedAt(value) {
        this.#updatedAt = value;
    }

    /**
     * Valida se a quadra tem dados mínimos necessários
     * @returns {boolean} - True se válido, false caso contrário
     */
    isValid() {
        return !!(this.#name && this.#type && this.#price !== null);
    }

    /**
     * Formata o preço para exibição
     * @returns {string} - Preço formatado
     */
    getFormattedPrice() {
        if (this.#price === null) return 'N/A';
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(this.#price);
    }

    /**
     * Retorna informações resumidas da quadra
     * @returns {Object} - Informações resumidas
     */
    getSummary() {
        return {
            id: this.#id,
            name: this.#name,
            type: this.#type,
            price: this.getFormattedPrice(),
            image: this.#image
        };
    }

    /**
     * Converte o objeto para JSON
     * @returns {Object} - Objeto JSON
     */
    toJSON() {
        return {
            id: this.#id,
            name: this.#name,
            hours: this.#hours,
            type: this.#type,
            price: this.#price,
            image: this.#image,
            createdAt: this.#createdAt,
            updatedAt: this.#updatedAt
        };
    }

    /**
     * Converte o objeto para FormData (útil para uploads)
     * @returns {FormData} - FormData com os dados da quadra
     */
    toFormData() {
        const formData = new FormData();
        
        if (this.#id) formData.append('id', this.#id);
        if (this.#name) formData.append('name', this.#name);
        if (this.#hours) formData.append('hours', this.#hours);
        if (this.#type) formData.append('type', this.#type);
        if (this.#price !== null) formData.append('price', this.#price);
        if (this.#image) formData.append('image', this.#image);
        
        return formData;
    }

    /**
     * Cria uma instância de Court a partir de dados JSON
     * @param {Object} jsonData - Dados JSON
     * @returns {Court} - Nova instância de Court
     */
    static fromJSON(jsonData) {
        return new Court(jsonData);
    }

    /**
     * Cria uma instância de Court a partir de dados de formulário
     * @param {FormData} formData - Dados do formulário
     * @returns {Court} - Nova instância de Court
     */
    static fromFormData(formData) {
        const courtData = {};
        for (const [key, value] of formData.entries()) {
            courtData[key] = value;
        }
        return new Court(courtData);
    }
}

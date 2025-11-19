export class User {
    #id;
    #idType;
    #firstName;
    #lastName;
    #email;
    #password;
    #photo;
    #createdAt;
    #updatedAt;

    /**
     * Construtor da classe User
     * @param {Object} userData - Dados do usuário
     * @param {number} userData.id - ID do usuário
     * @param {number} userData.idType - ID do tipo de usuário
     * @param {string} userData.firstName - Primeiro nome
     * @param {string} userData.lastName - Último nome
     * @param {string} userData.email - Email do usuário
     * @param {string} userData.password - Senha do usuário
     * @param {string} userData.photo - Foto do usuário
     * @param {string} userData.createdAt - Data de criação
     * @param {string} userData.updatedAt - Data de atualização
     */
    constructor(userData = {}) {
        this.#id = userData.id || null;
        this.#idType = userData.idType || null;
        this.#firstName = userData.firstName || userData.first_name || null;
        this.#lastName = userData.lastName || userData.last_name || null;
        this.#email = userData.email || null;
        this.#password = userData.password || null;
        this.#photo = userData.photo || null;
        this.#createdAt = userData.createdAt || userData.created_at || null;
        this.#updatedAt = userData.updatedAt || userData.updated_at || null;
    }

    // Getters
    get id() {
        return this.#id;
    }

    get idType() {
        return this.#idType;
    }

    get firstName() {
        return this.#firstName;
    }

    get lastName() {
        return this.#lastName;
    }

    get email() {
        return this.#email;
    }

    get password() {
        return this.#password;
    }

    get photo() {
        return this.#photo;
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

    set idType(value) {
        this.#idType = value;
    }

    set firstName(value) {
        this.#firstName = value;
    }

    set lastName(value) {
        this.#lastName = value;
    }

    set email(value) {
        if (this.#validateEmail(value)) {
            this.#email = value;
        } else {
            throw new Error('Email inválido');
        }
    }

    set password(value) {
        this.#password = value;
    }

    set photo(value) {
        this.#photo = value;
    }

    set createdAt(value) {
        this.#createdAt = value;
    }

    set updatedAt(value) {
        this.#updatedAt = value;
    }

    /**
     * Valida formato de email
     * @param {string} email - Email a ser validado
     * @returns {boolean} - True se válido, false caso contrário
     */
    #validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Retorna o nome completo do usuário
     * @returns {string} - Nome completo
     */
    getFullName() {
        return `${this.#firstName} ${this.#lastName}`.trim();
    }

    /**
     * Valida se o usuário tem dados mínimos necessários
     * @returns {boolean} - True se válido, false caso contrário
     */
    isValid() {
        return !!(this.#firstName && this.#lastName && this.#email);
    }

    /**
     * Converte o objeto para JSON
     * @returns {Object} - Objeto JSON
     */
    toJSON() {
        return {
            id: this.#id,
            idType: this.#idType,
            firstName: this.#firstName,
            lastName: this.#lastName,
            email: this.#email,
            photo: this.#photo,
            createdAt: this.#createdAt,
            updatedAt: this.#updatedAt
        };
    }

    /**
     * Converte o objeto para FormData (útil para uploads)
     * @returns {FormData} - FormData com os dados do usuário
     */
    toFormData() {
        const formData = new FormData();
        
        if (this.#id) formData.append('id', this.#id);
        if (this.#idType) formData.append('idType', this.#idType);
        if (this.#firstName) formData.append('firstName', this.#firstName);
        if (this.#lastName) formData.append('lastName', this.#lastName);
        if (this.#email) formData.append('email', this.#email);
        if (this.#password) formData.append('password', this.#password);
        if (this.#photo) formData.append('photo', this.#photo);
        
        return formData;
    }

    /**
     * Cria uma instância de User a partir de dados JSON
     * @param {Object} jsonData - Dados JSON
     * @returns {User} - Nova instância de User
     */
    static fromJSON(jsonData) {
        return new User(jsonData);
    }

    /**
     * Cria uma instância de User a partir de dados de formulário
     * @param {FormData} formData - Dados do formulário
     * @returns {User} - Nova instância de User
     */
    static fromFormData(formData) {
        const userData = {};
        for (const [key, value] of formData.entries()) {
            userData[key] = value;
        }
        return new User(userData);
    }
}

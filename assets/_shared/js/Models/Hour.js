/**
 * Classe Hour - Representa um horário de funcionamento
 * Implementa conceitos de Orientação a Objetos com encapsulamento
 */
export class Hour {
    #id;
    #courtId;
    #startTime;
    #endTime;
    #available;
    #createdAt;
    #updatedAt;

    /**
     * Construtor da classe Hour
     * @param {Object} hourData - Dados do horário
     * @param {number} hourData.id - ID do horário
     * @param {number} hourData.courtId - ID da quadra
     * @param {string} hourData.startTime - Horário de início
     * @param {string} hourData.endTime - Horário de fim
     * @param {boolean} hourData.available - Se está disponível
     * @param {string} hourData.createdAt - Data de criação
     * @param {string} hourData.updatedAt - Data de atualização
     */
    constructor(hourData = {}) {
        this.#id = hourData.id || null;
        this.#courtId = hourData.courtId || hourData.court_id || null;
        this.#startTime = hourData.startTime || hourData.start_time || null;
        this.#endTime = hourData.endTime || hourData.end_time || null;
        this.#available = hourData.available !== undefined ? hourData.available : true;
        this.#createdAt = hourData.createdAt || hourData.created_at || null;
        this.#updatedAt = hourData.updatedAt || hourData.updated_at || null;
    }

    // Getters
    get id() {
        return this.#id;
    }

    get courtId() {
        return this.#courtId;
    }

    get startTime() {
        return this.#startTime;
    }

    get endTime() {
        return this.#endTime;
    }

    get available() {
        return this.#available;
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

    set courtId(value) {
        this.#courtId = value;
    }

    set startTime(value) {
        this.#startTime = value;
    }

    set endTime(value) {
        this.#endTime = value;
    }

    set available(value) {
        this.#available = Boolean(value);
    }

    set createdAt(value) {
        this.#createdAt = value;
    }

    set updatedAt(value) {
        this.#updatedAt = value;
    }

    /**
     * Valida se o horário tem dados mínimos necessários
     * @returns {boolean} - True se válido, false caso contrário
     */
    isValid() {
        return !!(this.#courtId && this.#startTime && this.#endTime);
    }

    /**
     * Valida se o horário de início é anterior ao horário de fim
     * @returns {boolean} - True se válido, false caso contrário
     */
    isTimeValid() {
        if (!this.#startTime || !this.#endTime) return false;
        
        const start = new Date(`2000-01-01T${this.#startTime}`);
        const end = new Date(`2000-01-01T${this.#endTime}`);
        
        return start < end;
    }

    /**
     * Retorna a duração do horário em minutos
     * @returns {number} - Duração em minutos
     */
    getDuration() {
        if (!this.#startTime || !this.#endTime) return 0;
        
        const start = new Date(`2000-01-01T${this.#startTime}`);
        const end = new Date(`2000-01-01T${this.#endTime}`);
        
        return (end - start) / (1000 * 60);
    }

    /**
     * Retorna a duração formatada
     * @returns {string} - Duração formatada (ex: "2h 30min")
     */
    getFormattedDuration() {
        const duration = this.getDuration();
        const hours = Math.floor(duration / 60);
        const minutes = duration % 60;
        
        if (hours > 0 && minutes > 0) {
            return `${hours}h ${minutes}min`;
        } else if (hours > 0) {
            return `${hours}h`;
        } else {
            return `${minutes}min`;
        }
    }

    /**
     * Retorna o status de disponibilidade formatado
     * @returns {string} - Status formatado
     */
    getAvailabilityStatus() {
        return this.#available ? 'Disponível' : 'Indisponível';
    }

    /**
     * Converte o objeto para JSON
     * @returns {Object} - Objeto JSON
     */
    toJSON() {
        return {
            id: this.#id,
            courtId: this.#courtId,
            startTime: this.#startTime,
            endTime: this.#endTime,
            available: this.#available,
            createdAt: this.#createdAt,
            updatedAt: this.#updatedAt
        };
    }

    /**
     * Converte o objeto para FormData
     * @returns {FormData} - FormData com os dados do horário
     */
    toFormData() {
        const formData = new FormData();
        
        if (this.#id) formData.append('id', this.#id);
        if (this.#courtId) formData.append('courtId', this.#courtId);
        if (this.#startTime) formData.append('startTime', this.#startTime);
        if (this.#endTime) formData.append('endTime', this.#endTime);
        formData.append('available', this.#available);
        
        return formData;
    }

    /**
     * Cria uma instância de Hour a partir de dados JSON
     * @param {Object} jsonData - Dados JSON
     * @returns {Hour} - Nova instância de Hour
     */
    static fromJSON(jsonData) {
        return new Hour(jsonData);
    }

    /**
     * Cria uma instância de Hour a partir de dados de formulário
     * @param {FormData} formData - Dados do formulário
     * @returns {Hour} - Nova instância de Hour
     */
    static fromFormData(formData) {
        const hourData = {};
        for (const [key, value] of formData.entries()) {
            if (key === 'available') {
                hourData[key] = value === 'true' || value === true;
            } else {
                hourData[key] = value;
            }
        }
        return new Hour(hourData);
    }
}

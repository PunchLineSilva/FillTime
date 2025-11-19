export default class HttpClientBase {
    #baseUrl;
    #defaultHeaders;

    constructor(baseUrl = '') {
        this.#baseUrl = baseUrl;
        this.#defaultHeaders = {
            'Content-Type': 'application/json'
        };
    }

    setAuthToken(token) {
        this.#defaultHeaders['token'] = `${token}`;
    }

    clearAuthToken() {
        delete this.#defaultHeaders['token'];
    }

    #buildUrl(endpoint, params = {}) {
        let url = `${this.#baseUrl}${endpoint}`;

        const queryParams = new URLSearchParams();
        for (const [key, value] of Object.entries(params)) {
            if (url.includes(`/:${key}`)) {
                url = url.replace(`:${key}`, value);
            } else {
                queryParams.append(key, value);
            }
        }

        const queryString = queryParams.toString();
        if (queryString) {
            url += `?${queryString}`;
        }

        return url;
    }

    async #fetchWithConfig(endpoint, config, params = {}) {
        try {
            const url = this.#buildUrl(endpoint, params);
            const response = await fetch(url, {
                ...config,
                headers: config.headers
            });

            if (!response.ok) {
                const contentType = response.headers.get('content-type');
                let errorData;
                
                if (contentType && contentType.includes('application/json')) {
                    errorData = await response.json();
                } else {
                    errorData = { message: await response.text() };
                }
                
                const error = new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
                error.status = response.status;
                error.response = JSON.stringify(errorData);
                throw error;
            }

            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            }

            return await response.text();

        } catch (error) {
            console.error('HTTP Request Error:', error);
            throw error;
        }
    }

    async get(endpoint, params = {}, headers = {}) {
        return this.#fetchWithConfig(endpoint, {
            method: 'GET',
            headers: headers
        }, params);
    }

    async post(endpoint, data = null, params = {}, headers = {}) {
        const isFormData = data instanceof FormData;

        const config = {
            method: 'POST',
            body: isFormData ? data : JSON.stringify(data),
            headers: {}
        };

        if (isFormData) {
            config.headers = { ...headers };
        } else {
            config.headers = { ...this.#defaultHeaders, ...headers };
        }

        return this.#fetchWithConfig(endpoint, config, params);
    }

    async put(endpoint, data = null, params = {}) {

        let config = {
            method: 'PUT',
            headers: {}
        };

        if (data instanceof FormData) {
            config.body = new URLSearchParams(data).toString();
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        } else {
            config.body = JSON.stringify(data);
            config.headers['Content-Type'] = 'application/json';
        }

        return this.#fetchWithConfig(endpoint, config, params);
    }

    async delete(endpoint, params = {}) {
        return this.#fetchWithConfig(endpoint, {
            method: 'DELETE'
        }, params);
    }
}
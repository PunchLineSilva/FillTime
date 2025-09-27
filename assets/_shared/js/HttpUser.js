import HttpClientBase from './HttpClientBase.js';

export class HttpUser extends HttpClientBase {
    constructor() {
        super(`http://localhost/FillTime/api/users`);
    }

    async createUser(userData) {
        return this.post('/create', userData);
    }

    async loginUser(loginData = {}, headers = {}) {
        return this.get('/login', loginData, headers);
    }

    async updateUser(token, userData) {
        const headers = {
            'token': token
        };
        
        if (userData instanceof FormData) {
            return this.post('/update', userData, {}, headers);
        }
        
        return this.post('/update', userData, {}, headers);
    }

    async me(token) {
        const headers = {
            'token': token
        };
        return this.get("/me", {}, headers)
    }
}
/**
 * Exemplo de uso das classes JavaScript com Orientação a Objetos
 * Este arquivo demonstra como utilizar todas as classes criadas
 */

import { HttpUser } from '../HttpUser.js';
import { HttpCourt } from '../HttpCourt.js';
import { User } from '../Models/User.js';
import { Court } from '../Models/Court.js';
import { Hour } from '../Models/Hour.js';
import { Type } from '../Models/Type.js';
import { Toast } from '../Toast.js';

/**
 * Exemplo de uso das classes
 */
export class UsageExample {
    constructor() {
        this.httpUser = new HttpUser();
        this.httpCourt = new HttpCourt();
        this.toast = new Toast();
    }

    /**
     * Exemplo de criação e cadastro de usuário
     */
    async exemploCriarUsuario() {
        try {
            // Cria uma instância de User
            const user = new User({
                firstName: 'João',
                lastName: 'Silva',
                email: 'joao@email.com',
                password: 'senha123'
            });

            // Valida se o usuário é válido
            if (!user.isValid()) {
                this.toast.error('Dados do usuário inválidos');
                return;
            }

            // Cadastra o usuário
            const response = await this.httpUser.createUser(user);
            
            if (response.type === 'success') {
                this.toast.success('Usuário criado com sucesso!');
            }
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
        }
    }

    /**
     * Exemplo de login
     */
    async exemploLogin() {
        try {
            const response = await this.httpUser.loginUser('joao@email.com', 'senha123');
            
            if (response.type === 'success') {
                // Cria instância de User com dados retornados
                const user = new User(response.data);
                
                // Salva no localStorage
                localStorage.setItem('userLogin', JSON.stringify({
                    user: user.toJSON(),
                    token: response.token
                }));
                
                this.toast.success('Login realizado com sucesso!');
            }
        } catch (error) {
            console.error('Erro no login:', error);
        }
    }

    /**
     * Exemplo de criação de quadra
     */
    async exemploCriarQuadra() {
        try {
            // Cria uma instância de Court
            const court = new Court({
                name: 'Quadra de Futebol 1',
                type: 'Futebol',
                hours: 2,
                price: 50.00
            });

            // Valida se a quadra é válida
            if (!court.isValid()) {
                this.toast.error('Dados da quadra inválidos');
                return;
            }

            // Cadastra a quadra
            const response = await this.httpCourt.createCourt(court);
            
            if (response.type === 'success') {
                this.toast.success('Quadra criada com sucesso!');
            }
        } catch (error) {
            console.error('Erro ao criar quadra:', error);
        }
    }

    /**
     * Exemplo de upload de imagem para quadra
     */
    async exemploUploadImagemQuadra(courtId, imageFile) {
        try {
            const response = await this.httpCourt.uploadCourtImage(courtId, imageFile);
            
            if (response.type === 'success') {
                this.toast.success('Imagem enviada com sucesso!');
            }
        } catch (error) {
            console.error('Erro ao fazer upload da imagem:', error);
        }
    }

    /**
     * Exemplo de listagem de quadras
     */
    async exemploListarQuadras() {
        try {
            const courts = await this.httpCourt.listCourts();
            
            console.log('Quadras encontradas:', courts.length);
            
            courts.forEach(court => {
                console.log(`- ${court.name} (${court.type}) - ${court.getFormattedPrice()}`);
                if (court.image) {
                    console.log(`  Imagem: ${court.image}`);
                }
            });
            
            return courts;
        } catch (error) {
            console.error('Erro ao listar quadras:', error);
            return [];
        }
    }

    /**
     * Exemplo de busca de quadras por tipo
     */
    async exemploBuscarQuadrasPorTipo(tipo) {
        try {
            const courts = await this.httpCourt.getCourtsByType(tipo);
            
            console.log(`Quadras do tipo ${tipo}:`, courts.length);
            courts.forEach(court => {
                console.log(`- ${court.name} - ${court.getFormattedPrice()}`);
            });
            
            return courts;
        } catch (error) {
            console.error('Erro ao buscar quadras por tipo:', error);
            return [];
        }
    }

    /**
     * Exemplo de criação de horário
     */
    exemploCriarHorario() {
        const hour = new Hour({
            courtId: 1,
            startTime: '08:00',
            endTime: '10:00',
            available: true
        });

        // Valida o horário
        if (!hour.isValid()) {
            this.toast.error('Dados do horário inválidos');
            return;
        }

        // Valida se o horário de início é anterior ao fim
        if (!hour.isTimeValid()) {
            this.toast.error('Horário de início deve ser anterior ao horário de fim');
            return;
        }

        console.log('Horário criado:', hour.toJSON());
        console.log('Duração:', hour.getFormattedDuration());
        console.log('Status:', hour.getAvailabilityStatus());
    }

    /**
     * Exemplo de uso do Toast com diferentes tipos
     */
    exemploToast() {
        this.toast.success('Operação realizada com sucesso!');
        this.toast.error('Ocorreu um erro na operação');
        this.toast.warning('Atenção: Verifique os dados');
        this.toast.info('Informação importante');

        // Exemplo de toast com resposta da API
        const apiResponse = {
            type: 'success',
            message: 'Dados salvos com sucesso!'
        };
        
        this.toast.showFromResponse(apiResponse);
    }

    /**
     * Exemplo de uso completo - fluxo de reserva
     */
    async exemploFluxoReserva() {
        try {
            // 1. Lista quadras disponíveis
            const courts = await this.exemploListarQuadras();
            
            if (courts.length === 0) {
                this.toast.warning('Nenhuma quadra disponível');
                return;
            }

            // 2. Filtra por tipo (exemplo: Futebol)
            const futebolCourts = await this.exemploBuscarQuadrasPorTipo('Futebol');
            
            if (futebolCourts.length === 0) {
                this.toast.warning('Nenhuma quadra de futebol disponível');
                return;
            }

            // 3. Seleciona a primeira quadra
            const selectedCourt = futebolCourts[0];
            console.log('Quadra selecionada:', selectedCourt.getSummary());

            // 4. Cria horário para a reserva
            const reservationHour = new Hour({
                courtId: selectedCourt.id,
                startTime: '14:00',
                endTime: '16:00',
                available: false // Indica que está reservado
            });

            console.log('Reserva criada:', reservationHour.toJSON());
            this.toast.success('Reserva realizada com sucesso!');
            
        } catch (error) {
            console.error('Erro no fluxo de reserva:', error);
            this.toast.error('Erro ao processar reserva');
        }
    }
}

// Exemplo de uso das classes
const example = new UsageExample();

// Descomente as linhas abaixo para testar os exemplos
// example.exemploCriarUsuario();
// example.exemploLogin();
// example.exemploCriarQuadra();
// example.exemploListarQuadras();
// example.exemploBuscarQuadrasPorTipo('Futebol');
// example.exemploCriarHorario();
// example.exemploToast();
// example.exemploFluxoReserva();

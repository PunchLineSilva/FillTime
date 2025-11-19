import { HttpUser } from '../HttpUser.js';
import { HttpCourt } from '../HttpCourt.js';
import { User } from '../Models/User.js';
import { Court } from '../Models/Court.js';
import { Hour } from '../Models/Hour.js';
import { Type } from '../Models/Type.js';
import { Toast } from '../Toast.js';

export class UsageExample {
    constructor() {
        this.httpUser = new HttpUser();
        this.httpCourt = new HttpCourt();
        this.toast = new Toast();
    }

    async exemploCriarUsuario() {
        try {
            // Cria uma instância de User
            const user = new User({
                firstName: 'João',
                lastName: 'Silva',
                email: 'joao@email.com',
                password: 'senha123'
            });

            if (!user.isValid()) {
                this.toast.error('Dados do usuário inválidos');
                return;
            }

            const response = await this.httpUser.createUser(user);
            
            if (response.type === 'success') {
                this.toast.success('Usuário criado com sucesso!');
            }
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
        }
    }

    async exemploLogin() {
        try {
            const response = await this.httpUser.loginUser('joao@email.com', 'senha123');
            
            if (response.type === 'success') {
                const user = new User(response.data);
                
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

    async exemploCriarQuadra() {
        try {
            const court = new Court({
                name: 'Quadra de Futebol 1',
                type: 'Futebol',
                hours: 2,
                price: 50.00
            });

            if (!court.isValid()) {
                this.toast.error('Dados da quadra inválidos');
                return;
            }

            const response = await this.httpCourt.createCourt(court);
            
            if (response.type === 'success') {
                this.toast.success('Quadra criada com sucesso!');
            }
        } catch (error) {
            console.error('Erro ao criar quadra:', error);
        }
    }

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

    exemploCriarHorario() {
        const hour = new Hour({
            courtId: 1,
            startTime: '08:00',
            endTime: '10:00',
            available: true
        });

        if (!hour.isValid()) {
            this.toast.error('Dados do horário inválidos');
            return;
        }

        if (!hour.isTimeValid()) {
            this.toast.error('Horário de início deve ser anterior ao horário de fim');
            return;
        }

        console.log('Horário criado:', hour.toJSON());
        console.log('Duração:', hour.getFormattedDuration());
        console.log('Status:', hour.getAvailabilityStatus());
    }

    exemploToast() {
        this.toast.success('Operação realizada com sucesso!');
        this.toast.error('Ocorreu um erro na operação');
        this.toast.warning('Atenção: Verifique os dados');
        this.toast.info('Informação importante');

        const apiResponse = {
            type: 'success',
            message: 'Dados salvos com sucesso!'
        };
        
        this.toast.showFromResponse(apiResponse);
    }

    async exemploFluxoReserva() {
        try {
            const courts = await this.exemploListarQuadras();
            
            if (courts.length === 0) {
                this.toast.warning('Nenhuma quadra disponível');
                return;
            }

            const futebolCourts = await this.exemploBuscarQuadrasPorTipo('Futebol');
            
            if (futebolCourts.length === 0) {
                this.toast.warning('Nenhuma quadra de futebol disponível');
                return;
            }

            const selectedCourt = futebolCourts[0];
            console.log('Quadra selecionada:', selectedCourt.getSummary());

            const reservationHour = new Hour({
                courtId: selectedCourt.id,
                startTime: '14:00',
                endTime: '16:00',
                available: false
            });

            console.log('Reserva criada:', reservationHour.toJSON());
            this.toast.success('Reserva realizada com sucesso!');
            
        } catch (error) {
            console.error('Erro no fluxo de reserva:', error);
            this.toast.error('Erro ao processar reserva');
        }
    }
}

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
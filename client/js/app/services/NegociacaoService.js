class NegociacaoService {

    constructor() {
        this._http = new HttpService();
    }

    sendRequest(rota, mensagemErro) {
        return new Promise((resolve, reject) => {
            this._http.get(rota)
                .then(negociacoes => {
                    resolve(negociacoes
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
                })
                .catch(erro => {
                    console.log(erro);
                    reject(mensagemErro)
                });
        })
    }

    obterNegociacoesDaSemana() {
        return this.sendRequest('negociacoes/semana', "Não foi possível importar as negociações da semana");
    }

    obterNegociacoesDaSemanaRetrasada() {
        return this.sendRequest('negociacoes/retrasada', "Não foi possível importar as negociações da semana retrasada")
    }

    obterNegociacoesDaSemanaAnterior() {
        return this.sendRequest('negociacoes/anterior', "Não foi possível importar as negociações da semana passada");
    }
}
class NegociacaoService {

    sendRequest(rota, mensagemErro) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', rota);
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText)
                            .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                    } else {
                        console.log(xhr.responseText);
                        reject(mensagemErro);
                    }
                }
            };
            xhr.send();
        });
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
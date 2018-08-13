class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._inputData = $('#data');

        let self = this;
        this._mensagemView = new MensagemView($('#MensagemView'));
        this._negociacoesView = new NegociacoesView($('#negociacoesView'));

        this._listaNegociacoes = new Bind(new ListaNegociacoes(),
            this._negociacoesView,
            ['adiciona', 'esvazia']);

        this._mensagem = new Bind(new Mensagem(),
            this._mensagemView,
            ['texto']);

    }

    adiciona(event) {
        event.preventDefault();

        let data = DataHelper.textoParaData(this._inputData.value);

        this._listaNegociacoes.adiciona(this._criaNegociacao(data));

        this._mensagem.texto = "Negociação adicionada com sucesso."

        this._limpaFormulario();

    }

    esvazia() {
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = 'Lista de negociações apagadas';
    }

    _criaNegociacao(data) {
        return new Negociacao(data, this._inputQuantidade.value, this._inputValor.value);
    }

    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0;
        this._inputData.focus();
    }

}
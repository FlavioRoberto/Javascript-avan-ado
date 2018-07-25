class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._inputData = $('#data');
        this._listaNegociacoes = new ListaNegociacoes();
        this._negociacoesView = new NegociacoesView($('#negociacoesView'));
        this._negociacoesView.update(this._listaNegociacoes);
        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($('#MensagemView'));
        this._mensagemView.update(this._mensagem);
    }

    adiciona(event) {
        event.preventDefault();

        let data = DataHelper.textoParaData(this._inputData.value);
            
        this._listaNegociacoes.adiciona(this._criaNegociacao(data));

        this._mensagem.texto = "Negociação adicionada com sucesso."

        this._mensagemView.update(this._mensagem);

        this._negociacoesView.update(this._listaNegociacoes);

        this._limpaFormulario();

    }

    _criaNegociacao(data){
        return new Negociacao(data, this._inputQuantidade.value, this._inputValor.value);
    }

    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0;
        this._inputData.focus();
    }

}
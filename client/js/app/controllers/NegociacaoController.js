class NegociacaoController {
  constructor() {
    let $ = document.querySelector.bind(document);
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');
    this._inputData = $('#data');
    let self = this;

    this._listaNegociacoes = new Bind(
      new ListaNegociacoes(),
      new NegociacoesView($('#negociacoesView')),
      'adiciona',
      'esvazia'
    );

    this._mensagem = new Bind(
      new Mensagem(),
      new MensagemView($('#MensagemView')),
      'texto'
    );

    ConnectionFactory.getConection().then(con => {
      new NegociacaoDao(con)
        .listarTodos()
        .then(negociacoes => {
          negociacoes.forEach(negociacao => {
            this._listaNegociacoes.adiciona(negociacao);
          });
        })
        .catch(erro => {
          console.log(erro);
          this._mensagem.texto = 'Não foi possível listar as negociações.';
        });
    });
  }

  adiciona(event) {
    event.preventDefault();
    ConnectionFactory.getConection()
      .then(con => {
        let negociacao = this._criaNegociacao(data);
        new NegociacaoDao(con).adiciona(negociacao).then(() => {
          this._listaNegociacoes.adiciona(negociacao);
          this._mensagem.texto = 'Negociação adicionada com sucesso.';
          this._limpaFormulario();
        });
      })
      .catch(erro => (this._mensagem.texto = erro));
  }

  esvazia() {
    ConnectionFactory.getConection()
      .then(con => new NegociacaoDao(con))
      .then(dao => dao.apagaTodos())
      .then(() => {
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = 'Lista de negociações apagadas';
      })
      .catch(erro => this._mensagem.texto.adiciona(erro));
  }

  _criaNegociacao() {
    let data = DataHelper.textoParaData(this._inputData.value);
    return new Negociacao(
      data,
      parseInt(this._inputQuantidade.value),
      parseFloat(this._inputValor.value)
    );
  }

  importaNegociacoes() {
    let service = new NegociacaoService();

    Promise.all([
      service.obterNegociacoesDaSemana(),
      service.obterNegociacoesDaSemanaAnterior(),
      service.obterNegociacoesDaSemanaRetrasada()
    ])
      .then(dados => {
        this._mensagem.texto = 'Negociações Importadas Com Sucesso!';
        dados
          .reduce((arrayAgrupado, array) => arrayAgrupado.concat(array), [])
          .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
      })
      .catch(error => {
        this._mensagem.texto = error;
      });
  }

  _limpaFormulario() {
    this._inputData.value = '';
    this._inputQuantidade.value = 1;
    this._inputValor.value = 0;
    this._inputData.focus();
  }
}

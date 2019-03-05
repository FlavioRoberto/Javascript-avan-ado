class NegociacaoDao {
  constructor(conection) {
    this._conection = conection;
    this._store = 'negociacoes';
  }

  adiciona(negociacao) {
    return new Promise((resolve, reject) => {
      let request = this._conection
        .transaction([this._store], 'readwrite')
        .objectStore(this._store)
        .add(negociacao);

      request.onsuccess = e => {
        resolve();
      };

      request.onerror = e => {
        console.log(e.target.error);
        reject('Não foi possível incluir a negociação');
      };
    });
  }

  listarTodos() {
    return new Promise((resolve, reject) => {
      let cursor = this._conection
        .transaction([this._store], 'readwrite')
        .objectStore(this._store)
        .openCursor();

      let negociacoes = [];

      cursor.onsuccess = e => {
        let atual = e.target.result;
        if (atual) {
          var dado = atual.value;
          negociacoes.push(
            new Negociacao(dado._data, dado._quantidade, dado._valor)
          );
          atual.continue();
        } else {
          resolve(negociacoes);
        }
      };

      cursor.onerror = e => reject(e.target.error);
    });
  }
}

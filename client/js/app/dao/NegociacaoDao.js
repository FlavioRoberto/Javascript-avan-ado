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
}

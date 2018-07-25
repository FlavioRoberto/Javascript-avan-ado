
class View {

    constructor(elemento) {
        this._elemento = elemento;
    }

    template(modelo) { 
        throw new Error('o método template deve ser implementado');
    }

    update(modelo) {
        this._elemento.innerHTML = this.template(modelo);
    }

}

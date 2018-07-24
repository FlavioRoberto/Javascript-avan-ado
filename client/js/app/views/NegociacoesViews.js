
class NegociacoesView {

    constructor(elemento){
        this._elemento = elemento;
    }

    _template(modelo) {
        return `
                <table class="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>DATA</th>
                            <th>QUANTIDADE</th>
                            <th>VALOR</th>
                            <th>VOLUME</th>
                        </tr>
                    </thead>

                    <tbody>
                        ${modelo.negociacoes.map(item=>{
                            return `
                                <tr>
                                <td>${DataHelper.dataParaTexto(item.data)}</td>
                                <td>${item.quantidade}</td>
                                <td>${item.valor}</td>
                                <td>${item.volume}</td>
                                </tr>
                            `
                        }).join('')}
                    </tbody>

                    <tfoot>
                    </tfoot>
                </table>
        `;
    }

    update(modelo){
        //converte a string para elemento do DOM
        this._elemento.innerHTML = this._template(modelo);
    }

}

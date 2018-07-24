class DataHelper {

    constructor() {
        throw new Error("DataHelper é uma classe estática");
    }

    static textoParaData(texto) {
        if (!/\d{4}-\d{2}-\d{2}/.test(texto))
            throw new Error("Data inválida. O formato deve ser aaaa-mm-dd");
        return new Date(texto.split('-'));
    }

    static dataParaTexto(data) {
        return `${data.getDate()}/${(data.getMonth() + 1)}/${data.getFullYear()}`;
    }

}
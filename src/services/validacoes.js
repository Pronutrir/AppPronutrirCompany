const valicacaoCPF = (strCPF) => {
    strCPF = strCPF.replace(/[^\d]+/g, '');

    var Soma;
    var Resto;
    var i;

    Soma = 0;

    // Elimina CPFs invalidos conhecidos	
    if (cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999")
        return false;

    for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto === 10) || (Resto === 11)) Resto = 0;
    if (Resto !== parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto === 10) || (Resto === 11)) Resto = 0;
    if (Resto !== parseInt(strCPF.substring(10, 11))) return false;
    return true;

}

const rgMask = (value) => {
    if (value) {
        return value
        .replace(/\D/g, '') //substitui qualquer caractere que não seja número por nada.
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')// captura 2 grupos de numero o primeiro de 3 números 
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        //.replace(/(-\d{2})\d+?$/, '$1')// captura 2 números seguidos de um traço, ou seja, os três últimos caracteres do CPF e não deixa ser digitado mais nada.
    }
}

const cpfMask = (value) => {
    if (value) {
        return value
        .replace(/\D/g, '') //substitui qualquer caractere que não seja número por nada.
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')// captura 2 grupos de numero o primeiro de 3 números 
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        //.replace(/(-\d{2})\d+?$/, '$1')// captura 2 números seguidos de um traço, ou seja, os três últimos caracteres do CPF e não deixa ser digitado mais nada.
    }
}

const foneMask = (value) => {
    if (value) {
        return value
        .replace(/\D/g,"") //Remove tudo o que não é dígito
        .replace(/^(\d{2})(\d)/g,"($1) $2") //Coloca parênteses em volta dos dois primeiros dígitos
        .replace(/(\d)(\d{4})$/,"$1-$2")   //Coloca hífen entre o quarto e o quinto dígitos
    }
}

const foneResidencialMask = (value) => {
    if (value) {
        return value
        .replace(/\D/g,"") //Remove tudo o que não é dígito
        .replace(/(\d)(\d{4})$/,"$1-$2")   //Coloca hífen entre o quarto e o quinto dígitos
    }
}

const precoMask = (value) => {
    if (value) {
        const result = 'R$ '+ value.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.")
    return result.toString()
    //     .replace(/\D/g, "")
    //    .replace(/^(\d{1})(\d)/g, "R$ $1.$2")
    //     .replace(/(\d)(\d{2})$/, "$1,$2") 
    }
}

const cepMask = (cep) => {
    return cep
    .replace(/\D/g,"") //Remove tudo o que não é dígito
    .replace(/(\d)(\d{3})$/,"$1-$2")   //Coloca hífen entre o quinto e o sexto dígitos
}

const DateMask = (date) => {
    return date.replace(/\D/g, '') //substitui qualquer caractere que não seja número por nada.
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2')// captura 2 grupos de numero o primeiro de 3 números 
}

const FormatText = (text) => {
    let loweredText = text.toLowerCase();
    let wordsArray = loweredText.split(" ");

    let words = wordsArray.map((word)=> {
        let firstLetter = word[0];
        if(firstLetter){
            if( word.length > 2){
                return firstLetter.toUpperCase() + word.slice(1);
            } else {
                return firstLetter + word.slice(1);
            }
        }
    });
    return words.join(" ");
}

export { cpfMask, valicacaoCPF, foneMask, precoMask, foneResidencialMask, FormatText, cepMask, DateMask }

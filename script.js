const entrada = document.getElementById('box-texto-entrada');
const resultado = document.getElementById('box-texto-resultado');

const botaoEncrypt = document.getElementById('btn-criptografar');
const botaoDecrypt = document.getElementById('btn-descriptografar');
const botaoCopiar = document.getElementById('btn-copiar');

const modalCopiar = document.getElementById('modal-copiar');
const textoCopiar = document.getElementById('modal-copiar-texto');

const listaErros = document.getElementById('mensagem-erro');
let entradaValida = true;


const vogais = ['e', 'i', 'a', 'o', 'u'];
const saida = ['enter', 'imes', 'ai', 'ober', 'ufat'];


function comportamentoPadrao() {
    entrada.value = '';
    entrada.focus();
}


function criptografar(texto) {
    for (let i = 0; i < vogais.length; i++) texto = texto.replaceAll(vogais[i], saida[i]);
    return texto;
}

function descriptografar(texto) {
    for (let i = 0; i < vogais.length; i++) texto = texto.replaceAll(saida[i], vogais[i]);
    return texto;
}

function validaEntrada(texto) {
    let erros = [];
    let textoAcentuado = false;
    let contemNumeros = false;
    let acentuados = 'àèìòùâêîôûäëïöüáéíóúãõ'.split('');

    for (let i = 0; i < acentuados.length; i++) {
        let letra = acentuados[i];
        if (texto.toLowerCase().includes(letra)) {
            textoAcentuado = true;
            break;
        }
    }

    for (let i = 0; i < texto.length; i++) {
        letra = texto[i];
        if (Number.isInteger(parseInt(letra))) {
            contemNumeros = true;
            break;
        }
    }

    if (texto.toLowerCase() != texto) erros.push('Apenas letras minúsculas.');
    if (contemNumeros) erros.push('Não insira números.')
    if (textoAcentuado) erros.push('Não utilize acentuação.');

    return erros;
}

botaoEncrypt.addEventListener('click', function () {
    if (entradaValida && entrada.value != '') {
        resultado.textContent = criptografar(entrada.value);
        comportamentoPadrao();
    }
});

botaoDecrypt.addEventListener('click', function () {
    if (entradaValida && entrada.value != '') {
        resultado.textContent = descriptografar(entrada.value);
        comportamentoPadrao();
    }
});

botaoCopiar.addEventListener('click', function () {
    let valorResultado = resultado.value;
    if (valorResultado != '') {
        navigator.clipboard.writeText(resultado.value);
        textoCopiar.textContent = 'Copiado para a área de transferência.';
        modalCopiar.classList.add('show-modal');
        setTimeout(() => {
            modalCopiar.classList.remove('show-modal');
        }, 1400);
    }
    
    entrada.focus();

});

entrada.addEventListener('input', function () {
    listaErros.innerHTML = '';
    let erros = validaEntrada(entrada.value);
    erros.forEach(function (erro) {
        let li = document.createElement('li');
        li.textContent = erro;

        listaErros.appendChild(li);
    });

    entradaValida = true;

    if (erros.length > 0 || entrada.value == '') {
        entradaValida = false;
    }
});
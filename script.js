// ---------------- VARIÁVEIS ----------------
let contador = 0;
let qtdAutoClicker = 0;
let qtdForno = 0;
let qtdPadaria = 0;
let qtdFabrica = 0;
let qtdImperio = 0;
let producaoTotal = 0; // pães totais produzidos (cliques + auto)

// Variáveis para preços atuais (iniciando nos preços base)
let precoAutoClickerAtual = 10;
let precoFornoAtual = 50;
let precoPadariaAtual = 500;
let precoFabricaAtual = 2000;
let precoImperioAtual = 10000;

// ---------------- CLIQUE RÁPIDO ----------------
let cliquesRapidos = 0;
const intervaloCliquesRapidos = 5000; // 5 segundos
let timerCliquesRapidos = null;

// ---------------- TEMPO JOGADO ----------------
let tempoJogadoSegundos = 0;

// Elementos DOM
const pao = document.getElementById('pao');
const somClique = document.getElementById('somClique');
const contadorElemento = document.getElementById('contador');
const qtdCursoresElemento = document.getElementById('qtdCursores');

const qtdAutoClickerTopo = document.getElementById('qtdAutoClickerTopo');
const qtdAutoClickerLoja = document.getElementById('qtdAutoClickerLoja');
const qtdFornoLoja = document.getElementById('qtdFornoLoja');
const qtdPadariaLoja = document.getElementById('qtdPadariaLoja');
const qtdFabricaLoja = document.getElementById('qtdFabricaLoja');
const qtdImperioLoja = document.getElementById('qtdImperioLoja');

const btnAutoClicker = document.getElementById('btnAutoClicker');
const btnForno = document.getElementById('btnForno');
const btnPadaria = document.getElementById('btnPadaria');
const btnFabrica = document.getElementById('btnFabrica');
const btnImperio = document.getElementById('btnImperio');

const conquistasContainer = document.getElementById('conquistasContainer');

const btnResetar = document.getElementById('btnResetar'); // botão resetar

const btnToggleMusica = document.getElementById('btnToggleMusica');
const menuMusica = document.getElementById('menuMusica');
const btnPlayPause = document.getElementById('btnPlayPause');
const volumeControle = document.getElementById('volumeControle');
const musicaFundo = document.getElementById('musicaFundo');

// Guarda conquistas desbloqueadas (IDs)
let conquistasDesbloqueadas = new Set();

// Evitar scroll/ações ao pressionar Tab ou Enter
window.addEventListener('keydown', function (event) {
  if (event.key === 'Tab' || event.key === 'Enter') {
    event.preventDefault();
  }
});

// ---------------- CONQUISTAS ----------------
const conquistas = [
  { id: 'pao1', emoji: '🥖', texto: 'Clique no pão pela primeira vez!' },
  { id: 'pao10', emoji: '🍞', texto: 'Produza 10 pães!' },
  { id: 'pao50', emoji: '🥐', texto: 'Produza 50 pães!' },
  { id: 'pao100', emoji: '🥯', texto: 'Produza 100 pães!' },
  { id: 'pao200', emoji: '🧈', texto: 'Produza 200 pães!' },
  { id: 'pao500', emoji: '🥯', texto: 'Produza 500 pães!' },
  { id: 'pao1000', emoji: '🥨', texto: 'Produza 1.000 pães!' },
  { id: 'pao2500', emoji: '🥖', texto: 'Produza 2.500 pães!' },
  { id: 'pao5000', emoji: '🍞', texto: 'Produza 5.000 pães!' },
  { id: 'pao10000', emoji: '🥐', texto: 'Produza 10.000 pães!' },
  { id: 'pao20000', emoji: '🥖', texto: 'Produza 20.000 pães!' },
  { id: 'pao50000', emoji: '🍞', texto: 'Produza 50.000 pães!' },
  { id: 'pao100000', emoji: '🥐', texto: 'Produza 100.000 pães!' },
  { id: 'pao250000', emoji: '🥯', texto: 'Produza 250.000 pães no total!' },
  { id: 'pao500000', emoji: '🍞', texto: 'Produza 500.000 pães no total!' },
  { id: 'pao1000000', emoji: '🚀', texto: 'Produza 1.000.000 pães no total!' },
  { id: 'pao3000000', emoji: '🚀', texto: 'Produza 3.000.000 pães no total!' },
  { id: 'pao6000000', emoji: '🚀', texto: 'Produza 6.000.000 pães no total!' },
  { id: 'pao8000000', emoji: '🚀', texto: 'Produza 8.000.000 pães no total!' },
  { id: 'pao10000000', emoji: '🚀', texto: 'Produza 10.000.000 pães no total!' },
  { id: 'pao20000000', emoji: '🚀', texto: 'Produza 20.000.000 pães no total!' },

  { id: 'autoClicker1', emoji: '🤖', texto: 'Compre 1 Auto Clicker!' },
  { id: 'autoClicker5', emoji: '🦾', texto: 'Compre 5 Auto Clickers!' },
  { id: 'autoClicker10', emoji: '⚙️', texto: 'Compre 10 Auto Clickers!' },
  { id: 'autoClicker20', emoji: '🤖', texto: 'Compre 20 Auto Clickers!' },
  { id: 'autoClicker50', emoji: '🦿', texto: 'Compre 50 Auto Clickers!' },

  { id: 'forno1', emoji: '♨️', texto: 'Compre 1 Forno!' },
  { id: 'forno3', emoji: '♨️', texto: 'Compre 3 Fornos!' },
  { id: 'forno5', emoji: '♨️', texto: 'Compre 5 Fornos!' },
  { id: 'forno10', emoji: '♨️', texto: 'Compre 10 Fornos!' },
  { id: 'forno20', emoji: '♨️', texto: 'Compre 20 Fornos!' },

  { id: 'padaria1', emoji: '🏠', texto: 'Compre 1 Padaria!' },
  { id: 'padaria3', emoji: '🏘️', texto: 'Compre 3 Padarias!' },
  { id: 'padaria5', emoji: '🏠', texto: 'Compre 5 Padarias!' },
  { id: 'padaria10', emoji: '🏘️', texto: 'Compre 10 Padarias!' },

  { id: 'fabrica1', emoji: '🏭', texto: 'Compre 1 Fábrica!' },
  { id: 'fabrica2', emoji: '🏭', texto: 'Compre 2 Fábricas!' },
  { id: 'fabrica5', emoji: '🏭', texto: 'Compre 5 Fábricas!' },
  { id: 'fabrica10', emoji: '🏭', texto: 'Compre 10 Fábricas!' },

  { id: 'imperio1', emoji: '👑', texto: 'Compre 1 Império!' },
  { id: 'imperio2', emoji: '👑', texto: 'Compre 2 Impérios!' },
  { id: 'imperio3', emoji: '👑', texto: 'Compre 3 Impérios!' },

  { id: 'fastClicker100', emoji: '⚡', texto: 'Clique 100 vezes rápido!' },
  { id: 'fastClicker500', emoji: '⚡', texto: 'Clique 500 vezes rápido!' },
  { id: 'fastClicker1000', emoji: '⚡', texto: 'Clique 1.000 vezes rápido!' },

  { id: 'milestone1', emoji: '🏅', texto: 'Jogue por 1 minuto!' },
  { id: 'milestone5', emoji: '🥉', texto: 'Jogue por 5 minutos!' },
  { id: 'milestone10', emoji: '🥈', texto: 'Jogue por 10 minutos!' },
  { id: 'milestone30', emoji: '🥇', texto: 'Jogue por 30 minutos!' },
  { id: 'milestone60', emoji: '🏆', texto: 'Jogue por 1 hora!' },
];

// ---------------- FUNÇÕES ----------------
function atualizarContador() {
  contadorElemento.textContent = contador;
}

function atualizarCursorCarrossel(qtd) {
  const cursorTrack = document.getElementById('cursorTrack');
  cursorTrack.innerHTML = ''; // limpa antes

  for (let i = 0; i < qtd; i++) {
    const cursor = document.createElement('div');
    cursor.classList.add('cursor-icon');
    cursorTrack.appendChild(cursor);
  }
}

function atualizarQuantidades() {
  qtdAutoClickerTopo.textContent = qtdAutoClicker;
  qtdAutoClickerLoja.textContent = qtdAutoClicker;
  qtdFornoLoja.textContent = qtdForno;
  qtdPadariaLoja.textContent = qtdPadaria;
  qtdFabricaLoja.textContent = qtdFabrica;
  qtdImperioLoja.textContent = qtdImperio;
  qtdCursoresElemento.textContent = qtdAutoClicker;

  atualizarCursorCarrossel(qtdAutoClicker);
}

function atualizarTextoPrecos() {
  btnAutoClicker.textContent = `Comprar Auto Clicker (${Math.floor(precoAutoClickerAtual)} pães)`;
  btnForno.textContent = `Comprar Forno (${Math.floor(precoFornoAtual)} pães)`;
  btnPadaria.textContent = `Comprar Padaria (${Math.floor(precoPadariaAtual)} pães)`;
  btnFabrica.textContent = `Comprar Fábrica (${Math.floor(precoFabricaAtual)} pães)`;
  btnImperio.textContent = `Comprar Império (${Math.floor(precoImperioAtual)} pães)`;
}

function renderizarLogConquistas() {
  conquistasContainer.innerHTML = ''; // limpa container

  conquistas.forEach(c => {
    const span = document.createElement('span');
    span.textContent = c.emoji;
    span.title = c.texto;
    span.classList.add('conquista');
    span.style.filter = conquistasDesbloqueadas.has(c.id) ? 'none' : 'grayscale(100%)';
    span.style.fontSize = '18px';
    span.style.margin = '0 4px';
    conquistasContainer.appendChild(span);
  });
}

function desbloquearConquista(id) {
  if (!conquistasDesbloqueadas.has(id)) {
    conquistasDesbloqueadas.add(id);
    renderizarLogConquistas();
    salvarJogo();
    mostrarPopupConquista(id);
  }
}

// Função para mostrar popup de conquista desbloqueada
function mostrarPopupConquista(id) {
  const conquista = conquistas.find(c => c.id === id);
  if (!conquista) return;

  const popup = document.createElement('div');
  popup.classList.add('popup-conquista');
  popup.innerHTML = `<span class="emoji">${conquista.emoji}</span> Conquista desbloqueada! <br> ${conquista.texto}`;
  document.body.appendChild(popup);

  setTimeout(() => {
    popup.classList.add('fade-out');
    setTimeout(() => popup.remove(), 1000);
  }, 2500);
}

// Função para verificar as conquistas conforme progresso atual
function verificarConquistas() {
  // Conquistas de clique
  if (contador >= 1) desbloquearConquista('pao1');
  if (producaoTotal >= 10) desbloquearConquista('pao10');
  if (producaoTotal >= 50) desbloquearConquista('pao50');
  if (producaoTotal >= 100) desbloquearConquista('pao100');
  if (producaoTotal >= 200) desbloquearConquista('pao200');
  if (producaoTotal >= 500) desbloquearConquista('pao500');
  if (producaoTotal >= 1000) desbloquearConquista('pao1000');
  if (producaoTotal >= 2500) desbloquearConquista('pao2500');
  if (producaoTotal >= 5000) desbloquearConquista('pao5000');
  if (producaoTotal >= 10000) desbloquearConquista('pao10000');
  if (producaoTotal >= 20000) desbloquearConquista('pao20000');
  if (producaoTotal >= 50000) desbloquearConquista('pao50000');
  if (producaoTotal >= 100000) desbloquearConquista('pao100000');
  if (producaoTotal >= 250000) desbloquearConquista('pao250000');
  if (producaoTotal >= 500000) desbloquearConquista('pao500000');
  if (producaoTotal >= 1000000) desbloquearConquista('pao1000000');
  if (producaoTotal >= 3000000) desbloquearConquista('pao3000000');
  if (producaoTotal >= 6000000) desbloquearConquista('pao6000000');
  if (producaoTotal >= 8000000) desbloquearConquista('pao8000000');
  if (producaoTotal >= 10000000) desbloquearConquista('pao10000000');
  if (producaoTotal >= 20000000) desbloquearConquista('pao20000000');

  // AutoClicker
  if (qtdAutoClicker >= 1) desbloquearConquista('autoClicker1');
  if (qtdAutoClicker >= 5) desbloquearConquista('autoClicker5');
  if (qtdAutoClicker >= 10) desbloquearConquista('autoClicker10');
  if (qtdAutoClicker >= 20) desbloquearConquista('autoClicker20');
  if (qtdAutoClicker >= 50) desbloquearConquista('autoClicker50');

  // Forno
  if (qtdForno >= 1) desbloquearConquista('forno1');
  if (qtdForno >= 3) desbloquearConquista('forno3');
  if (qtdForno >= 5) desbloquearConquista('forno5');
  if (qtdForno >= 10) desbloquearConquista('forno10');
  if (qtdForno >= 20) desbloquearConquista('forno20');

  // Padaria
  if (qtdPadaria >= 1) desbloquearConquista('padaria1');
  if (qtdPadaria >= 3) desbloquearConquista('padaria3');
  if (qtdPadaria >= 5) desbloquearConquista('padaria5');
  if (qtdPadaria >= 10) desbloquearConquista('padaria10');

  // Fábrica
  if (qtdFabrica >= 1) desbloquearConquista('fabrica1');
  if (qtdFabrica >= 2) desbloquearConquista('fabrica2');
  if (qtdFabrica >= 5) desbloquearConquista('fabrica5');
  if (qtdFabrica >= 10) desbloquearConquista('fabrica10');

  // Império
  if (qtdImperio >= 1) desbloquearConquista('imperio1');
  if (qtdImperio >= 2) desbloquearConquista('imperio2');
  if (qtdImperio >= 3) desbloquearConquista('imperio3');
}

// ---------------- CLIQUE RÁPIDO ----------------
function registrarCliqueRapido() {
  if (!timerCliquesRapidos) {
    timerCliquesRapidos = setTimeout(() => {
      verificarConquistaCliquesRapidos();
      cliquesRapidos = 0;
      timerCliquesRapidos = null;
    }, intervaloCliquesRapidos);
  }
  cliquesRapidos++;
}

function verificarConquistaCliquesRapidos() {
  if (cliquesRapidos >= 100) desbloquearConquista('fastClicker100');
  if (cliquesRapidos >= 500) desbloquearConquista('fastClicker500');
  if (cliquesRapidos >= 1000) desbloquearConquista('fastClicker1000');
}

// ---------------- TEMPO JOGADO ----------------
function iniciarContagemTempoJogado() {
  setInterval(() => {
    tempoJogadoSegundos++;

    if (tempoJogadoSegundos >= 60) desbloquearConquista('milestone1');
    if (tempoJogadoSegundos >= 300) desbloquearConquista('milestone5');
    if (tempoJogadoSegundos >= 600) desbloquearConquista('milestone10');
    if (tempoJogadoSegundos >= 1800) desbloquearConquista('milestone30');
    if (tempoJogadoSegundos >= 3600) desbloquearConquista('milestone60');

  }, 1000);
}

// ---------------- SAVE / LOAD ----------------
function salvarJogo() {
  const saveData = {
    contador,
    qtdAutoClicker,
    qtdForno,
    qtdPadaria,
    qtdFabrica,
    qtdImperio,
    producaoTotal,
    conquistasDesbloqueadas: Array.from(conquistasDesbloqueadas),
    precoAutoClickerAtual,
    precoFornoAtual,
    precoPadariaAtual,
    precoFabricaAtual,
    precoImperioAtual,
    tempoJogadoSegundos
  };
  localStorage.setItem('saveGame', JSON.stringify(saveData));
}

function carregarJogo() {
  const saveData = JSON.parse(localStorage.getItem('saveGame'));
  if (saveData) {
    contador = saveData.contador || 0;
    qtdAutoClicker = saveData.qtdAutoClicker || 0;
    qtdForno = saveData.qtdForno || 0;
    qtdPadaria = saveData.qtdPadaria || 0;
    qtdFabrica = saveData.qtdFabrica || 0;
    qtdImperio = saveData.qtdImperio || 0;
    producaoTotal = saveData.producaoTotal || 0;
    tempoJogadoSegundos = saveData.tempoJogadoSegundos || 0;

    precoAutoClickerAtual = saveData.precoAutoClickerAtual || 10;
    precoFornoAtual = saveData.precoFornoAtual || 50;
    precoPadariaAtual = saveData.precoPadariaAtual || 500;
    precoFabricaAtual = saveData.precoFabricaAtual || 2000;
    precoImperioAtual = saveData.precoImperioAtual || 10000;

    if (saveData.conquistasDesbloqueadas) {
      conquistasDesbloqueadas = new Set(saveData.conquistasDesbloqueadas);
    } else {
      conquistasDesbloqueadas = new Set();
    }

    atualizarContador();
    atualizarQuantidades();
    atualizarTextoPrecos();
    renderizarLogConquistas();
  }
}

function resetarJogo() {
  if (confirm('Tem certeza que deseja resetar seu progresso?')) {
    contador = 0;
    qtdAutoClicker = 0;
    qtdForno = 0;
    qtdPadaria = 0;
    qtdFabrica = 0;
    qtdImperio = 0;
    producaoTotal = 0;
    tempoJogadoSegundos = 0;

    precoAutoClickerAtual = 10;
    precoFornoAtual = 50;
    precoPadariaAtual = 500;
    precoFabricaAtual = 2000;
    precoImperioAtual = 10000;

    conquistasDesbloqueadas.clear();

    atualizarContador();
    atualizarQuantidades();
    atualizarTextoPrecos();
    renderizarLogConquistas();

    salvarJogo();
  }
}

// ---------------- FUNÇÃO DE CLIQUE ----------------
pao.addEventListener('click', () => {
  somClique.currentTime = 0; // reseta para tocar de novo se clicar rápido
  somClique.play();
  contador++;
  producaoTotal++;
  atualizarContador();
  verificarConquistas();

  registrarCliqueRapido();

  salvarJogo();
});

// ---------------- COMPRA DAS LOJAS ----------------
function comprarAutoClicker() {
  if (contador >= precoAutoClickerAtual) {
    contador -= precoAutoClickerAtual;
    qtdAutoClicker++;
    producaoTotal++;
    precoAutoClickerAtual *= 1.15; // aumenta 15%
    precoAutoClickerAtual = Math.floor(precoAutoClickerAtual);

    atualizarContador();
    atualizarQuantidades();
    atualizarTextoPrecos();
    verificarConquistas();
    salvarJogo();
  } else {
    alert('Você não tem pães suficientes para comprar o Auto Clicker.');
  }
}

function comprarForno() {
  if (contador >= precoFornoAtual) {
    contador -= precoFornoAtual;
    qtdForno++;
    producaoTotal++;
    precoFornoAtual *= 1.15; // aumenta 15%
    precoFornoAtual = Math.floor(precoFornoAtual);

    atualizarContador();
    atualizarQuantidades();
    atualizarTextoPrecos();
    verificarConquistas();
    salvarJogo();
  } else {
    alert('Você não tem pães suficientes para comprar o Forno.');
  }
}

function comprarPadaria() {
  if (contador >= precoPadariaAtual) {
    contador -= precoPadariaAtual;
    qtdPadaria++;
    producaoTotal++;
    precoPadariaAtual *= 1.15;
    precoPadariaAtual = Math.floor(precoPadariaAtual);

    atualizarContador();
    atualizarQuantidades();
    atualizarTextoPrecos();
    verificarConquistas();
    salvarJogo();
  } else {
    alert('Você não tem pães suficientes para comprar a Padaria.');
  }
}

function comprarFabrica() {
  if (contador >= precoFabricaAtual) {
    contador -= precoFabricaAtual;
    qtdFabrica++;
    producaoTotal++;
    precoFabricaAtual *= 1.15;
    precoFabricaAtual = Math.floor(precoFabricaAtual);

    atualizarContador();
    atualizarQuantidades();
    atualizarTextoPrecos();
    verificarConquistas();
    salvarJogo();
  } else {
    alert('Você não tem pães suficientes para comprar a Fábrica.');
  }
}

function comprarImperio() {
  if (contador >= precoImperioAtual) {
    contador -= precoImperioAtual;
    qtdImperio++;
    producaoTotal++;
    precoImperioAtual *= 1.15;
    precoImperioAtual = Math.floor(precoImperioAtual);

    atualizarContador();
    atualizarQuantidades();
    atualizarTextoPrecos();
    verificarConquistas();
    salvarJogo();
  } else {
    alert('Você não tem pães suficientes para comprar o Império.');
  }
}

// ---------------- AUTO CLICKER ----------------
setInterval(() => {
  if (qtdAutoClicker > 0) {
    contador += qtdAutoClicker;
    producaoTotal += qtdAutoClicker;
    atualizarContador();
    verificarConquistas();
    salvarJogo();
  }
}, 1000);

// ---------------- BOTÕES ----------------
btnAutoClicker.addEventListener('click', comprarAutoClicker);
btnForno.addEventListener('click', comprarForno);
btnPadaria.addEventListener('click', comprarPadaria);
btnFabrica.addEventListener('click', comprarFabrica);
btnImperio.addEventListener('click', comprarImperio);

btnResetar.addEventListener('click', resetarJogo);

// ---------------- INÍCIO ----------------
carregarJogo();
renderizarLogConquistas();
atualizarTextoPrecos();
atualizarQuantidades();
iniciarContagemTempoJogado();


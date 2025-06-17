// ---------------- VARIÁVEIS ----------------
let contador = 0;
let qtdAutoClicker = 0;
let qtdForno = 0;
let qtdPadaria = 0;
let qtdFabrica = 0;
let qtdImperio = 0;
let producaoTotal = 0; // pães totais produzidos (cliques + auto)

// Elementos DOM
const pao = document.getElementById('pao');
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
window.addEventListener('keydown', function(event) {
  if (event.key === 'Tab' || event.key === 'Enter') {
    event.preventDefault();
  }
});

// ---------------- CONQUISTAS ----------------
const conquistas = [
  { id: 'pao1', emoji: '🥖', texto: 'Clique no pão pela primeira vez!' },
  { id: 'pao10', emoji: '🍞', texto: 'Produza 10 pães!' },
  { id: 'pao50', emoji: '🥐', texto: 'Produza 50 pães!' },
  { id: 'pao100', emoji: '🍞', texto: 'Produza 100 pães!' },
  { id: 'pao200', emoji: '🥖', texto: 'Produza 200 pães!' },
  { id: 'pao500', emoji: '🥯', texto: 'Produza 500 pães!' },
  { id: 'pao1000', emoji: '🥨', texto: 'Produza 1.000 pães!' },
  { id: 'pao2500', emoji: '🥖', texto: 'Produza 2.500 pães!' },
  { id: 'pao5000', emoji: '🍞', texto: 'Produza 5.000 pães!' },
  { id: 'pao10000', emoji: '🥐', texto: 'Produza 10.000 pães!' },
  { id: 'pao20000', emoji: '🥖', texto: 'Produza 20.000 pães!' },
  { id: 'pao50000', emoji: '🍞', texto: 'Produza 50.000 pães!' },
  { id: 'pao100000', emoji: '🥐', texto: 'Produza 100.000 pães!' },

  { id: 'autoClicker1', emoji: '🤖', texto: 'Compre 1 Auto Clicker!' },
  { id: 'autoClicker5', emoji: '🦾', texto: 'Compre 5 Auto Clickers!' },
  { id: 'autoClicker10', emoji: '⚙️', texto: 'Compre 10 Auto Clickers!' },
  { id: 'autoClicker20', emoji: '🤖', texto: 'Compre 20 Auto Clickers!' },
  { id: 'autoClicker50', emoji: '🦿', texto: 'Compre 50 Auto Clickers!' },

  { id: 'forno1', emoji: '🔥', texto: 'Compre 1 Forno!' },
  { id: 'forno3', emoji: '♨️', texto: 'Compre 3 Fornos!' },
  { id: 'forno5', emoji: '🔥', texto: 'Compre 5 Fornos!' },
  { id: 'forno10', emoji: '🔥', texto: 'Compre 10 Fornos!' },
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

  { id: 'producao1000', emoji: '⚙️', texto: 'Produza 1.000 pães no total!' },
  { id: 'producao5000', emoji: '⚙️', texto: 'Produza 5.000 pães no total!' },
  { id: 'producao10000', emoji: '⚙️', texto: 'Produza 10.000 pães no total!' },
  { id: 'producao25000', emoji: '🚀', texto: 'Produza 25.000 pães no total!' },
  { id: 'producao50000', emoji: '🚀', texto: 'Produza 50.000 pães no total!' },
  { id: 'producao100000', emoji: '🚀', texto: 'Produza 100.000 pães no total!' },
  { id: 'producao250000', emoji: '🚀', texto: 'Produza 250.000 pães no total!' },
  { id: 'producao500000', emoji: '🚀', texto: 'Produza 500.000 pães no total!' },
  { id: 'producao1000000', emoji: '🚀', texto: 'Produza 1.000.000 pães no total!' },

  { id: 'fastClicker100', emoji: '⚡', texto: 'Clique 100 vezes rápido!' },
  { id: 'fastClicker500', emoji: '⚡', texto: 'Clique 500 vezes rápido!' },
  { id: 'fastClicker1000', emoji: '⚡', texto: 'Clique 1.000 vezes rápido!' },

  { id: 'milestone1', emoji: '🎉', texto: 'Jogue por 1 minuto!' },
  { id: 'milestone5', emoji: '🎉', texto: 'Jogue por 5 minutos!' },
  { id: 'milestone10', emoji: '🎉', texto: 'Jogue por 10 minutos!' },
  { id: 'milestone30', emoji: '🎉', texto: 'Jogue por 30 minutos!' },
  { id: 'milestone60', emoji: '🎉', texto: 'Jogue por 1 hora!' },
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
  }
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

  // Produção total
  if (producaoTotal >= 1000) desbloquearConquista('producao1000');
  if (producaoTotal >= 5000) desbloquearConquista('producao5000');
  if (producaoTotal >= 10000) desbloquearConquista('producao10000');
  if (producaoTotal >= 25000) desbloquearConquista('producao25000');
  if (producaoTotal >= 50000) desbloquearConquista('producao50000');
  if (producaoTotal >= 100000) desbloquearConquista('producao100000');
  if (producaoTotal >= 250000) desbloquearConquista('producao250000');
  if (producaoTotal >= 500000) desbloquearConquista('producao500000');
  if (producaoTotal >= 1000000) desbloquearConquista('producao1000000');


  

  // Você pode implementar as conquistas de clique rápido e tempo jogado depois, pois elas precisam de lógica extra.
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
  };
  localStorage.setItem('breadClickerSave', JSON.stringify(saveData));
}

function carregarJogo() {
  const save = localStorage.getItem('breadClickerSave');
  if (save) {
    try {
      const data = JSON.parse(save);
      contador = data.contador || 0;
      qtdAutoClicker = data.qtdAutoClicker || 0;
      qtdForno = data.qtdForno || 0;
      qtdPadaria = data.qtdPadaria || 0;
      qtdFabrica = data.qtdFabrica || 0;
      qtdImperio = data.qtdImperio || 0;
      producaoTotal = data.producaoTotal || 0;
      conquistasDesbloqueadas = new Set(data.conquistasDesbloqueadas || []);
    } catch (e) {
      console.error('Erro ao carregar save:', e);
    }
  }
} 

// ---------------- RESET ----------------
function resetarJogo() {
  if (confirm('Tem certeza que quer resetar seu progresso? Isso não pode ser desfeito.')) {
    contador = 0;
    qtdAutoClicker = 0;
    qtdForno = 0;
    qtdPadaria = 0;
    qtdFabrica = 0;
    qtdImperio = 0;
    producaoTotal = 0;
    conquistasDesbloqueadas = new Set();

    localStorage.removeItem('breadClickerSave');

    atualizarContador();
    atualizarQuantidades();
    renderizarLogConquistas();

    alert('Progresso resetado com sucesso!');
  }
}

btnToggleMusica.addEventListener('click', () => {
  menuMusica.classList.toggle('show'); // Certifique-se que no CSS '.ativo' mostra/esconde o menu
});

btnPlayPause.addEventListener('click', () => {
  if (musicaFundo.paused) {
    musicaFundo.play();
    btnPlayPause.textContent = 'Pause';
  } else {
    musicaFundo.pause();
    btnPlayPause.textContent = 'Play';
  }
});

volumeControle.addEventListener('input', () => {
  musicaFundo.volume = volumeControle.value;
});




// ---------------- EVENTOS ----------------
pao.addEventListener('click', () => {
  contador++;
  producaoTotal++;
  atualizarContador();
  verificarConquistas();
  salvarJogo();
});

btnAutoClicker.addEventListener('click', () => {
  if (contador >= 50) {
    contador -= 50;
    qtdAutoClicker++;
    atualizarContador();
    atualizarQuantidades();
    verificarConquistas();
    salvarJogo();
  } else {
    alert('Você não tem pães suficientes!');
  }
});

btnForno.addEventListener('click', () => {
  if (contador >= 200) {
    contador -= 200;
    qtdForno++;
    atualizarContador();
    atualizarQuantidades();
    verificarConquistas();
    salvarJogo();
  } else {
    alert('Você não tem pães suficientes!');
  }
});

btnPadaria.addEventListener('click', () => {
  if (contador >= 800) {
    contador -= 800;
    qtdPadaria++;
    atualizarContador();
    atualizarQuantidades();
    verificarConquistas();
    salvarJogo();
  } else {
    alert('Você não tem pães suficientes!');
  }
});

btnFabrica.addEventListener('click', () => {
  if (contador >= 2500) {
    contador -= 2500;
    qtdFabrica++;
    atualizarContador();
    atualizarQuantidades();
    verificarConquistas();
    salvarJogo();
  } else {
    alert('Você não tem pães suficientes!');
  }
});

btnImperio.addEventListener('click', () => {
  if (contador >= 20000) {
    contador -= 20000;
    qtdImperio++;
    atualizarContador();
    atualizarQuantidades();
    verificarConquistas();
    salvarJogo();
  } else {
    alert('Você não tem pães suficientes!');
  }
});

btnResetar.addEventListener('click', () => {
  resetarJogo();
});

// ---------------- AUTO CLICKER ----------------
setInterval(() => {
  // Cada AutoClicker gera 1 pão por segundo
  const paesPorSegundo = qtdAutoClicker + qtdForno * 2 + qtdPadaria * 5 + qtdFabrica * 10 + qtdImperio * 20;
  if (paesPorSegundo > 0) {
    contador += paesPorSegundo;
    producaoTotal += paesPorSegundo;
    atualizarContador();
    verificarConquistas();
    salvarJogo();
  }
}, 1000);



// ---------------- INICIALIZAÇÃO ----------------
window.onload = () => {
  carregarJogo();
  atualizarContador();
  atualizarQuantidades();
  renderizarLogConquistas();
};

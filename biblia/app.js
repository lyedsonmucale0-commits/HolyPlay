let textos = {};

async function carregarJSON() {
  const response = await fetch('bible.json');
  textos = await response.json();
  carregarCapitulos();
}

function carregarCapitulos() {
  const livroSelect = document.getElementById("livro");
  const capituloSelect = document.getElementById("capitulo");
  livroSelect.innerHTML = "";
  const livros = Object.keys(textos);
  livros.forEach(livro => {
    const opt = document.createElement("option");
    opt.value = livro;
    opt.textContent = livro;
    livroSelect.appendChild(opt);
  });
  mostrarTexto();
}

function mostrarTexto() {
  const livro = document.getElementById("livro").value;
  const capituloSelect = document.getElementById("capitulo");
  const container = document.getElementById("versiculos");
  const noVerses = document.getElementById("no-verses");

  capituloSelect.innerHTML = "";
  const capitulos = Object.keys(textos[livro]);
  capitulos.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    capituloSelect.appendChild(opt);
  });

  const capitulo = capituloSelect.value;
  const versiculos = textos[livro][capitulo];
  if (versiculos && versiculos.length > 0) {
    container.innerHTML = versiculos.map((v,i) => `<div class="verse">${i+1}. ${v}</div>`).join("");
    noVerses.style.display = 'none';
  } else {
    container.innerHTML = "";
    noVerses.style.display = 'block';
  }
}

function pesquisarVersiculo() {
  const searchTerm = document.getElementById("search").value.toLowerCase();
  const livro = document.getElementById("livro").value;
  const capitulo = document.getElementById("capitulo").value;
  const container = document.getElementById("versiculos");
  const versiculos = textos[livro][capitulo];

  const resultados = versiculos.filter(v => v.toLowerCase().includes(searchTerm));
  if (resultados.length > 0) {
    container.innerHTML = resultados.map((v,i) => `<div class="verse">${i+1}. ${v}</div>`).join("");
    document.getElementById("no-verses").style.display = 'none';
  } else {
    container.innerHTML = "";
    document.getElementById("no-verses").style.display = 'block';
  }
}

carregarJSON();
// Executa assim que a página carrega completamente
document.addEventListener("DOMContentLoaded", () => {
    inicializarPost("post-1");
});

// Inicializa ou recupera os dados salvos do post
function obterDadosPost(postId) {
    let dados = localStorage.getItem(postId);
    if (!dados) {
        dados = { likes: 0, dislikes: 0, comentarios: [] };
        localStorage.setItem(postId, JSON.stringify(dados));
    } else {
        dados = JSON.parse(dados);
    }
    return dados;
}

// Atualiza a tela com os dados do LocalStorage
function inicializarPost(postId) {
    const dados = obterDadosPost(postId);
    
    // Atualiza contadores
    document.getElementById(`likes-${postId}`).innerText = dados.likes;
    document.getElementById(`dislikes-${postId}`).innerText = dados.dislikes;
    
    // Renderiza a lista de comentários
    const listaComentarios = document.getElementById(`comments-list-${postId}`);
    listaComentarios.innerHTML = ""; // Limpa antes de renderizar
    
    dados.comentarios.forEach(comentario => {
        const div = document.createElement("div");
        div.className = "comment-item";
        div.innerHTML = `<strong>${comentario.nome}</strong><p>${comentario.texto}</p>`;
        listaComentarios.appendChild(div);
    });
}

// Função para dar Like ou Dislike
function interagir(postId, tipo) {
    const dados = obterDadosPost(postId);
    
    if (tipo === 'like') {
        dados.likes++;
    } else if (tipo === 'dislike') {
        dados.dislikes++;
    }
    
    localStorage.setItem(postId, JSON.stringify(dados));
    inicializarPost(postId); // Atualiza a tela
}

// Função para adicionar um novo comentário
function adicionarComentario(event, postId) {
    event.preventDefault(); // Impede a página de recarregar
    
    const inputNome = document.getElementById(`name-post-1`);
    const inputTexto = document.getElementById(`text-post-1`);
    
    const nome = inputNome.value.trim();
    const texto = inputTexto.value.trim();
    
    if (nome === "" || texto === "") return;
    
    const dados = obterDadosPost(postId);
    dados.comentarios.push({ nome: nome, texto: texto });
    
    localStorage.setItem(postId, JSON.stringify(dados));
    
    // Limpa o formulário e atualiza a tela
    inputNome.value = "";
    inputTexto.value = "";
    inicializarPost(postId);
}

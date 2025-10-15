// Tema claro/escuro
const themeToggle = document.getElementById('themeToggle');
function themeSet() {
    const isLight = localStorage.getItem('siteTheme') === 'light';
    if(isLight){ document.body.classList.add('theme-light'); themeToggle.textContent="🌚"; }
    else { document.body.classList.remove('theme-light'); themeToggle.textContent="🌞"; }
}
themeToggle.onclick = ()=>{
    if(document.body.classList.contains('theme-light')){
        localStorage.setItem('siteTheme','dark');
    }else{
        localStorage.setItem('siteTheme','light');
    }
    themeSet();
};
themeSet();

// Typed text
const roles = [ 'Analista de QA • Estagiário na Informezz • Unidep', 'Especialista em testes de qualidade', ];
let typedIndex = 0, charI = 0, typingDiv = document.getElementById('typedRole');
function typeIt() {
    if (!typingDiv) return;
    if (charI < roles[typedIndex].length) {
        typingDiv.innerHTML += roles[typedIndex][charI++];
        setTimeout(typeIt, 38);
    } else {
        setTimeout(()=> { charI = 0; typedIndex = (typedIndex+1)%roles.length; typingDiv.innerHTML = ''; setTimeout(typeIt, 1200); }, 1700);
    }
}
typeIt();
// Animações on scroll
const wowElements = document.querySelectorAll('.wow-fade, .wow-fade-slow, .wow-up');
window.addEventListener('scroll', showWow);
function showWow() {
    wowElements.forEach(el=>{
        let rect = el.getBoundingClientRect(), threshold = (el.classList.contains('wow-fade-slow'))? 0.5 : 0.2;
        if(window.innerHeight > rect.top + rect.height*threshold) el.classList.add('animated');
    });
}
showWow();

// Explicações detalhadas!
const explicacoes = {
    "Análise de RN": "Investigação, compreensão e validação das Regras de Negócio. O QA garante clareza e cobertura total, identificando ambiguidades e requisitos ocultos.",
    "User Stories": "Histórias de usuário deixam os requisitos claros do ponto de vista do cliente, facilitando o desenvolvimento e a validação ágil do que realmente importa.",
    "Tabelas de Decisão": "Ferramentas para descrever lógica de negócio, garantir cenário e saída para cada combinação de regras — ideal para detectar gaps e gerar testes automatizados.",
    "Casos de Teste": "Descrição passo a passo que cobre desde pré-condições até o esperado, fornecendo rastreabilidade e documentação para todo cenário crítico ou alternativo.",
    "Pensamento Crítico": "Olhar atento, investigação e julgamento independente para aprimorar produtos, encontrar pontos fracos e garantir soluções robustas.",
    "Colaboração Ágil": "Envio de feedbacks rápidos, comunicação clara e refinamento de requisitos com todo o time, fomentando entregas de valor contínuo.",
    "Ferramentas": "Uso inteligente do Figma (UX/UI), ERPs, ferramentas de rastreio, versionamento e documentação para apoiar a rotina de QA.",
    "RN-0133": "Validação de Duplicidade: mapeamento de todas as trilhas para prevenir dados redundantes e garantir integridade de registros, inclusive por meio de automação de testes.",
    "RN-0106": "Hierarquia de Permissões: casos em diversos níveis de acesso, contemplando rastreabilidade, segregação de funções e segurança sobre dados sensíveis.",
    "RN-0111": "Regras para desconto acumulativo com integrações complexas, rotinas automatizadas de checagem para garantir a conformidade dos processos de desconto.",
    "RN-0092": "Cenários de restrição e liberação de acesso a convênios, testes contextualizados conforme perfil do usuário, garantindo segurança e compliance.",
    "RN-0223": "Aplicação de regras de não-retroatividade: reforço na proteção do histórico de dados e conformidade a LGPD, com mapeamento de exceções.",
    "Estagiário QA - Informezz": "Prática profissional na validação ponta a ponta, elaboração de políticas e padrões de testes com forte atuação junto a POs e homologação de soluções para o cliente final.",
    "Estagiário QA - Projeto Acadêmico": "Vivência completa no ciclo QA: desde documentação e protótipos, design e execução de casos até automação de scripts em projetos universitários."
};
const modalDescricao = document.getElementById('modalDescricao');
const descricaoTitulo = document.getElementById('descricaoTitulo');
const descricaoTexto = document.getElementById('descricaoTexto');
const closeDescricao = document.getElementById('closeDescricao');
closeDescricao.onclick = () => { modalDescricao.classList.remove('active'); document.body.style.overflow=''; };
function abrirExplicacao(titulo) {
    descricaoTitulo.innerText = titulo;
    descricaoTexto.innerText = explicacoes[titulo] || "Sem explicação cadastrada ainda.";
    modalDescricao.classList.add('active');
    document.body.style.overflow='hidden';
}
[
  ...document.querySelectorAll('#competenciasGrid .card'),
  ...document.querySelectorAll('#projectsGrid .card'),
  ...document.querySelectorAll('#timelineGrid .timeline-row')
].forEach(card=>{
    card.style.cursor="pointer";
    card.onclick = ()=> {
        let titulo = card.querySelector('b')?.innerText || card.querySelector('.timeline-job')?.innerText || card.innerText.split('\n')[0];
        abrirExplicacao(titulo.trim());
    }
});

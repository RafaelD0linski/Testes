function toggleBodyScroll(enable) {
    if(enable) {
        document.body.style.overflow = '';
    } else {
        document.body.style.overflow = 'hidden';
    }
}

function openModal(modal) {
    modal.classList.add('active');
    toggleBodyScroll(false);
}
function closeModal(modal) {
    modal.classList.remove('active');
    toggleBodyScroll(true);
}

const editToggle = document.getElementById('editToggle');
const modalLogin = document.getElementById('modalLogin');
const loginSubmit = document.getElementById('loginSubmit');
const closeLogin = document.getElementById('closeLogin');
const loginError = document.getElementById('loginError');
const modalEdit = document.getElementById('modalEdit');
const closeEdit = document.getElementById('closeEdit');

editToggle.onclick = () => { openModal(modalLogin); }
closeLogin.onclick = () => { closeModal(modalLogin); loginError.style.display='none'; }
loginSubmit.onclick = () => {
    const user = document.getElementById('loginUser').value.trim();
    const pass = document.getElementById('loginPass').value.trim();
    if (user === '1234' && pass === '1234') {
        closeModal(modalLogin);
        openModal(modalEdit);
        loginError.style.display='none';
        document.getElementById('editName').value = document.getElementById('profileName').innerText;
        document.getElementById('editRole').value = document.getElementById('profileRole').innerText;
        document.getElementById('editLocation').value = document.getElementById('profileLocation').innerText.replace("📍","").trim();
        document.getElementById('editResume').value = document.getElementById('profileResume').innerText.trim();
        renderCompetenciasEditor();
        renderProjetosEditor();
        renderTrajetoriaEditor();
        renderContatoEditor();
        setActiveTab('perfil');
    } else {
        loginError.style.display='block';
    }
};
closeEdit.onclick = ()=>{ closeModal(modalEdit); }

document.querySelectorAll(".edit-tab").forEach(btn=>{
    btn.onclick= ()=> setActiveTab(btn.dataset.tab);
});
function setActiveTab(tabName){
    document.querySelectorAll(".edit-tab").forEach(b=>b.classList.toggle("active",b.dataset.tab===tabName));
    document.querySelectorAll(".edit-content").forEach(c=>c.style.display="none");
    document.getElementById("edit"+tabName.charAt(0).toUpperCase()+tabName.slice(1)).style.display="block";
}

document.getElementById("savePerfil").onclick = ()=>{
    document.getElementById('profileName').innerText = document.getElementById('editName').value;
    document.getElementById('profileRole').innerText = document.getElementById('editRole').value;
    document.getElementById('profileLocation').innerHTML = '<img src="https://img.icons8.com/ios-filled/17/3794ff/marker.png"/> ' + document.getElementById('editLocation').value;
    document.getElementById('profileResume').innerText = document.getElementById('editResume').value;
    alert("Perfil atualizado!");
}

function getCompetencias(){
    return Array.from(document.querySelectorAll("#competenciasGrid .card")).map(card=>{
        const [title, ...rest] = card.innerText.split('\n');
        return {titulo:title, desc: rest.join(' ')};
    });
}
function renderCompetenciasEditor(){
    const holder = document.getElementById('editCompetenciasList');
    holder.innerHTML = '';
    getCompetencias().forEach((c,i)=>{
        let row = document.createElement('div');
        row.className = "edit-list-item";
        row.innerHTML = `<input value="${c.titulo}"/><textarea rows="2">${c.desc}</textarea>
            <button onclick="removeCompetencia(${i})">remover</button>`;
        holder.appendChild(row);
    });
}
document.getElementById('addCompetencia').onclick = ()=>{
    let grid = document.getElementById('competenciasGrid');
    let div = document.createElement('div');
    div.className="card";
    div.innerHTML = `<b>Novo título</b><div>Nova descrição</div>`;
    grid.appendChild(div);
    renderCompetenciasEditor();
};
window.removeCompetencia = function(i){
    let grid = document.getElementById('competenciasGrid');
    grid.removeChild(grid.children[i]);
    renderCompetenciasEditor();
};
document.getElementById('editCompetenciasList').addEventListener('input', function(e){
    let data = [...this.parentNode.querySelectorAll('.edit-list-item')].map(div=>{
        return {
            titulo: div.querySelectorAll('input')[0].value,
            desc: div.querySelector('textarea').value
        }
    });
    let grid = document.getElementById('competenciasGrid');
    grid.innerHTML = '';
    data.forEach(c=>{
        let el = document.createElement('div');
        el.className="card";
        el.innerHTML = `<b>${c.titulo}</b><div>${c.desc}</div>`;
        grid.appendChild(el);
    });
});
function getProjetos(){
    return Array.from(document.querySelectorAll("#projectsGrid .card")).map(card=>{
        const [title, ...rest] = card.innerText.split('\n');
        return {titulo:title, desc: rest.join(' ')};
    });
}
function renderProjetosEditor(){
    const holder = document.getElementById('editProjetosList');
    holder.innerHTML = '';
    getProjetos().forEach((c,i)=>{
        let row = document.createElement('div');
        row.className = "edit-list-item";
        row.innerHTML = `<input value="${c.titulo}"/><textarea rows="2">${c.desc}</textarea>
            <button onclick="removeProjeto(${i})">remover</button>`;
        holder.appendChild(row);
    });
}
document.getElementById('addProjeto').onclick = ()=>{
    let grid = document.getElementById('projectsGrid');
    let div = document.createElement('div');
    div.className="card card-project";
    div.innerHTML = `<b>Novo projeto</b><br>Descrição do projeto`;
    grid.appendChild(div);
    renderProjetosEditor();
};
window.removeProjeto = function(i){
    let grid = document.getElementById('projectsGrid');
    grid.removeChild(grid.children[i]);
    renderProjetosEditor();
};
document.getElementById('editProjetosList').addEventListener('input', function(e){
    let data = [...this.parentNode.querySelectorAll('.edit-list-item')].map(div=>{
        return {
            titulo: div.querySelectorAll('input')[0].value,
            desc: div.querySelector('textarea').value
        }
    });
    let grid = document.getElementById('projectsGrid');
    grid.innerHTML = '';
    data.forEach(c=>{
        let el = document.createElement('div');
        el.className="card card-project";
        el.innerHTML = `<b>${c.titulo}</b><br>${c.desc}`;
        grid.appendChild(el);
    });
});
function getTrajetoria(){
    return Array.from(document.querySelectorAll("#timelineGrid .timeline-row")).map(row=>{
        return {
            periodo: row.querySelector('.timeline-date').innerText,
            cargo: row.querySelector('.timeline-job').innerText
        };
    });
}
function renderTrajetoriaEditor(){
    const holder = document.getElementById('editTrajetoriaList');
    holder.innerHTML = '';
    getTrajetoria().forEach((c,i)=>{
        let row = document.createElement('div');
        row.className = "edit-list-item";
        row.innerHTML = `<input value="${c.periodo}" style="width:85px"/><input value="${c.cargo}" style="width:55%"/><button onclick="removeTrajetoria(${i})">remover</button>`;
        holder.appendChild(row);
    });
}
document.getElementById('addTrajetoria').onclick = ()=>{
    let grid = document.getElementById('timelineGrid');
    let row = document.createElement('div');
    row.className="timeline-row";
    row.innerHTML = `<span class="timeline-date">Ano</span><span class="timeline-job">Novo cargo</span>`;
    grid.appendChild(row);
    renderTrajetoriaEditor();
};
window.removeTrajetoria = function(i){
    let grid = document.getElementById('timelineGrid');
    grid.removeChild(grid.children[i]);
    renderTrajetoriaEditor();
};
document.getElementById('editTrajetoriaList').addEventListener('input', function(e){
    let data = [...this.parentNode.querySelectorAll('.edit-list-item')].map(div=>{
        return {
            periodo: div.querySelectorAll('input')[0].value,
            cargo: div.querySelectorAll('input')[1].value
        }
    });
    let grid = document.getElementById('timelineGrid');
    grid.innerHTML = '';
    data.forEach(c=>{
        let row=document.createElement('div');
        row.className="timeline-row";
        row.innerHTML = `<span class="timeline-date">${c.periodo}</span><span class="timeline-job">${c.cargo}</span>`;
        grid.appendChild(row);
    });
});
function getContato(){
    return Array.from(document.querySelectorAll("#contactLinks a")).map(a=>a.outerHTML);
}
function renderContatoEditor(){
    const holder = document.getElementById('editContatoList');
    holder.innerHTML = '';
    getContato().forEach((html,i)=>{
        let row = document.createElement('div');
        row.className = "edit-list-item";
        row.innerHTML = `<input value="${html}" style="width:88%"/><button onclick="removeContato(${i})">remover</button>`;
        holder.appendChild(row);
    });
}
document.getElementById('addContato').onclick = ()=>{
    let grid = document.getElementById('contactLinks');
    let a = document.createElement('a');
    a.href="#"; a.innerText="Novo contato";
    grid.appendChild(a);
    renderContatoEditor();
};
window.removeContato = function(i){
    let grid = document.getElementById('contactLinks');
    grid.removeChild(grid.children[i]);
    renderContatoEditor();
};
document.getElementById('editContatoList').addEventListener('input', function(e){
    let data = [...this.parentNode.querySelectorAll('.edit-list-item')].map(div=>{
        return div.querySelectorAll('input')[0].value
    });
    let grid = document.getElementById('contactLinks');
    grid.innerHTML = '';
    data.forEach(html=>{
        let fake = document.createElement('div');
        fake.innerHTML = html;
        if (fake.firstChild) grid.appendChild(fake.firstChild);
    });
});

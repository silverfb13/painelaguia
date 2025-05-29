if (sessionStorage.getItem("auth") !== "ok") {
  location.href = "index.html";
}

function logout() {
  sessionStorage.removeItem("auth");
  location.href = "index.html";
}

function carregarUsuarios() {
  fetch("usuarios.json")
    .then(res => res.json())
    .then(data => {
      const tbody = document.getElementById("tabelaUsuarios");
      tbody.innerHTML = "";
      for (const usuario in data) {
        const senha = data[usuario];
        tbody.innerHTML += \`
          <tr>
            <td>\${usuario}</td>
            <td>\${senha}</td>
            <td><button onclick="removerUsuario('\${usuario}')">Excluir</button></td>
          </tr>\`;
      }
    });
}

function adicionarUsuario() {
  const u = document.getElementById("newUser").value.trim();
  const p = document.getElementById("newPass").value.trim();
  if (!u || !p) return alert("Preencha os campos.");
  fetch("usuarios.json")
    .then(res => res.json())
    .then(data => {
      data[u] = p;
      downloadJSON(data);
    });
}

function removerUsuario(user) {
  fetch("usuarios.json")
    .then(res => res.json())
    .then(data => {
      delete data[user];
      downloadJSON(data);
    });
}

function downloadJSON(json) {
  const blob = new Blob([JSON.stringify(json, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "usuarios.json";
  a.click();
  URL.revokeObjectURL(url);
}

carregarUsuarios();

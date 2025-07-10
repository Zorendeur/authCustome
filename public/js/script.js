let jwtToken = "";

document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("signupEmail").value;
  const password_hash = document.getElementById("signupPassword").value;
  const pseudo = document.getElementById("signupPseudo").value;
  const localite = document.getElementById("signupLocalite").value;

  const res = await fetch("/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password_hash, pseudo, localite }),
  });

  const data = await res.json();
  if (data) {
    document.getElementById("signupResult").textContent =
      "Tes bien inscrit copain !";
  }
});

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const res = await fetch("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  document.getElementById("loginResult").textContent = JSON.stringify(
    data,
    null,
    2
  );

  if (data.token) {
    jwtToken = data.token;
    document.getElementById("jwtDisplay").textContent = jwtToken;
  }
});

document
  .getElementById("getAnnoncesBtn")
  .addEventListener("click", async () => {
    if (!jwtToken) {
      alert("Vous devez d'abord vous connecter !");
      return;
    }

    const res = await fetch("/articles", {
      headers: { Authorization: `Bearer ${jwtToken}` },
    });

    const annonces = await res.json();
    const list = document.getElementById("annoncesList");
    list.innerHTML = "";

    annonces.forEach((a) => {
      const li = document.createElement("li");
      li.textContent = `Annonce : ${a.titre} (${a.auteur}) (${a.contenu})`;
      list.appendChild(li);
    });
  });

document
  .getElementById("recupererInfo")
  .addEventListener("click", async (e) => {
    e.preventDefault();

    const res = await fetch("/auth/getToken", {
      credentials: "include",
    });
    let data = await res.json();

    let pEmail = document.getElementById("pEmail");
    let pPseudo = document.getElementById("pPseudo");
    let pLocalite = document.getElementById("pLocalite");

    pEmail.textContent = data.email;
    pPseudo.textContent = data.pseudo;
    pLocalite.textContent = data.localite;
  });

document.getElementById("deleteBtn").addEventListener("click", async () => {
  const res = await fetch("/auth/deleteAccount", {
    method: "DELETE",
    credentials: "include",
  });

  const data = await res.json();
  console.log(data);

  if (res.ok) {
    alert("Compte supprimé !");
    window.location.href = "/";
  }
});

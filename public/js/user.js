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

document
  .getElementById("suppressionCookies")
  .addEventListener("click", async (e) => {
    e.preventDefault();

    const res = await fetch("/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    let data = await res.json();

    document.getElementById("pSuppressionCookies").textContent = data.message
  });

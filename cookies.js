document.addEventListener("DOMContentLoaded", () => {
  const banner = document.createElement("div");
  banner.className = "cookie-banner";
  banner.innerHTML = `
    <p>Usamos cookies para mejorar tu experiencia. Puedes aceptar, rechazar o configurar tus preferencias.</p>
    <div>
      <button id="acceptCookies">Aceptar</button>
      <button id="rejectCookies">Rechazar</button>
      <button id="configCookies">Configurar</button>
    </div>
  `;

  // Verifica si ya se aceptaron o rechazaron cookies
  const cookieChoice = localStorage.getItem("cookieChoice");

  if (!cookieChoice) {
    document.body.appendChild(banner);
    banner.style.display = "flex";
  }

  // Botones
  const acceptBtn = banner.querySelector("#acceptCookies");
  const rejectBtn = banner.querySelector("#rejectCookies");
  const configBtn = banner.querySelector("#configCookies");

  // Aceptar cookies
  acceptBtn.addEventListener("click", () => {
    localStorage.setItem("cookieChoice", "accepted");
    hideBanner();
  });

  // Rechazar cookies
  rejectBtn.addEventListener("click", () => {
    localStorage.setItem("cookieChoice", "rejected");
    hideBanner();
  });

  // Configurar cookies (ejemplo simple)
  configBtn.addEventListener("click", () => {
    alert("Aquí puedes configurar las cookies (personaliza esta función según tu necesidad).");
  });

  function hideBanner() {
    banner.style.opacity = "0";
    setTimeout(() => {
      banner.style.display = "none";
    }, 400);
  }
});

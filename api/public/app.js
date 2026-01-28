document.getElementById("btn").onclick = async () => {
  const username = document.getElementById("username").value.trim();
  const out = document.getElementById("out");

  if (!username) {
    out.textContent = "username kosong";
    return;
  }

  out.textContent = "memproses...";

  const r = await fetch("/api/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username })
  });

  const j = await r.json();

  if (!j.ok) {
    out.textContent = "gagal";
    return;
  }

  out.textContent =
`PANEL
${j.result.panel}

USERNAME
${j.result.username}

PASSWORD
${j.result.password}

SERVER ID
${j.result.server_id}`;
};

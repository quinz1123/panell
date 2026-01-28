import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false });
  }

  const { username } = req.body;
  if (!username) {
    return res.json({ ok: false });
  }

  const PANEL_URL = "https://userapp2871-panel-galangcoganoffc.bihost.my.id";
  const API_KEY = "ptla_0FOcvkfXOemtckjYfT3wV0ssVieomHwuo6BtqT3vKCH";

  const password = username + "123";

  try {
    const u = await fetch(`${PANEL_URL}/api/application/users`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        email: `${username}@test.com`,
        first_name: username,
        last_name: "panel",
        password
      })
    });

    const uj = await u.json();
    if (!u.ok) return res.json({ ok: false });

    const s = await fetch(`${PANEL_URL}/api/application/servers`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: `TEST-${username}`,
        user: uj.attributes.id,
        egg: 1,
        docker_image: "ghcr.io/pterodactyl/yolks:nodejs_18",
        startup: "npm start",
        environment: {},
        limits: {
          memory: 0,
          disk: 0,
          cpu: 0,
          swap: 0,
          io: 500
        },
        allocation: {
          default: 1
        }
      })
    });

    const sj = await s.json();
    if (!s.ok) return res.json({ ok: false });

    return res.json({
      ok: true,
      result: {
        panel: PANEL_URL,
        username,
        password,
        server_id: sj.attributes.id
      }
    });
  } catch {
    return res.json({ ok: false });
  }
}

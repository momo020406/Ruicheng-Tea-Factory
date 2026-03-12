const DATA_URL = "data.json?t=" + Date.now();

function num(v, d = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : d;
}

function txt(v, d = "—") {
  return v === undefined || v === null || v === "" ? d : v;
}

function parseTeaData(raw) {
  const rt = raw.realtime || {};
  const weather = raw.weather || {};

  function stationBlock(stationNo, depth) {
    const base = `Station${stationNo}_${depth}_`;
    return {
      soilTemp: num(rt[base + "SoilTemp"]),
      soilMoisture: num(rt[base + "SoilMoisture"]),
      nitrogen: num(rt[base + "Nitrogen"]),
      phosphorus: num(rt[base + "Phosphorus"]),
      potassium: num(rt[base + "Potassium"])
    };
  }

  return {
    time: txt(raw.time),
    weather: {
      airTemp: num(weather.air_temp),
      humidity: num(weather.humidity),
      weather: txt(weather.weather),
      precip: num(weather.precip),
      obsTime: txt(weather.obs_time),
      location: txt(weather.location, "名間鄉")
    },
    teaAir: {
      temp: num(rt["TeaGarden_Air_Temp"]),
      humidity: num(rt["TeaGarden_Air_Humidity"])
    },
    stations: {
      Surface: [1, 2, 3, 4].map(i => ({ name: `第${i}站`, ...stationBlock(i, "Surface") })),
      "15cm": [1, 2, 3, 4].map(i => ({ name: `第${i}站`, ...stationBlock(i, "15cm") })),
      "25cm": [1, 2, 3, 4].map(i => ({ name: `第${i}站`, ...stationBlock(i, "25cm") }))
    }
  };
}

async function loadTeaData() {
  const res = await fetch(DATA_URL, { cache: "no-store" });
  if (!res.ok) throw new Error("data.json 載入失敗");
  const raw = await res.json();
  return parseTeaData(raw);
}

function makeDepthButtons(active = "Surface") {
  return `
    <div class="depth-switch">
      <button data-depth="Surface" class="${active === "Surface" ? "active" : ""}">表面層</button>
      <button data-depth="15cm" class="${active === "15cm" ? "active" : ""}">15cm</button>
      <button data-depth="25cm" class="${active === "25cm" ? "active" : ""}">25cm</button>
    </div>
  `;
}

function stationTableRows(items) {
  return items.map(s => `
    <tr>
      <td>${s.name}</td>
      <td>${s.soilTemp}</td>
      <td>${s.soilMoisture}</td>
      <td>${s.nitrogen}</td>
      <td>${s.phosphorus}</td>
      <td>${s.potassium}</td>
    </tr>
  `).join("");
}

function bindDepthButtons(onChange) {
  document.querySelectorAll("[data-depth]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-depth]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      onChange(btn.dataset.depth);
    });
  });
}
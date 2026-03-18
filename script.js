const imagenes = {
    "Humano": "img/Humano.png",
    "Ballena Azul": "img/Ballena azul.png",
    "Monte Everest": "img/everest.png",
    "Luna": "img/luna.png",
    "Tierra": "img/tierra.png",
    "Júpiter": "img/jupiter.png",
    "Sol": "img/sol.png",
    "U.A.": "img/UA.png",
    "Sistema Solar": "img/sistema solar.gif",
    "Distancia de Próxima Centauri al Sol": "img/sol alfa.png",
    "Nebulosa": "img/nebulosa.png",
    "Sagitario A*": "img/sagitario a.png",
    "TON 618": "img/ton618.png",
    "Vía Láctea": "img/via lactea.png",
    "Distancia entre Andrómeda y la Via Lac.": "img/via lactea andromeda.png",
    "Grupo Local": "img/grupo local.png",
    "Distancia de Via Lac. al Gran Atractor": "img/gran atractor.png",
    "Laniakea": "img/Laniakea.png",
    "Cuásar Lejano": "img/cuasar.png",
    "Fondo Cósmico de Microondas": "img/fondo.png",
    "Universo Observable": "img/universo.png",
    "¿Otros Universos?": "img/universo.png"
};

const grupos = [
    ["Humano","Ballena Azul","Monte Everest"],
    ["Luna","Tierra","Júpiter","Sol"],
    ["U.A.","Sistema Solar","Distancia de Próxima Centauri al Sol"],
    ["Nebulosa","Sagitario A*","TON 618"],
    ["Vía Láctea","Distancia entre Andrómeda y la Via Lac.","Grupo Local"],
    ["Distancia de Via Lac. al Gran Atractor","Laniakea","Cuásar Lejano"],
    ["Fondo Cósmico de Microondas","Universo Observable"],
    ["¿Otros Universos?"]
];

let nivel = 0;
let gruposRenderizados = [];

const container = document.getElementById("container");
const bg = document.getElementById("bg");
const bg2 = document.getElementById("bg2");

let escalaFondo = 1;

// 🔥 AQUÍ EL FIX IMPORTANTE
const musica = document.getElementById("musica");

const layouts = [
    [ {x:50,y:55},{x:35,y:65},{x:65,y:65} ],
    [ {x:10,y:30},{x:40,y:60},{x:90,y:84},{x:74,y:35} ],
    [ {x:46,y:45},{x:20,y:64},{x:80,y:40} ],
    [ {x:20,y:60},{x:50,y:40},{x:80,y:70} ],
    [ {x:42,y:65},{x:80,y:37},{x:20,y:24} ],
    [ {x:19,y:52},{x:80,y:67},{x:51,y:45} ],
    [ {x:24,y:50},{x:80,y:50} ],
    [ {x:50,y:50} ]
];

function crearObjeto(nombre, i, layout) {
    const div = document.createElement("div");
    div.className = "obj";

    const img = document.createElement("img");
    img.src = imagenes[nombre];

    let baseSize = (120 - i*15);

    let multiplier = 1;
    if (nivel >= 1) multiplier = 1.8;
    if (nivel >= 2) multiplier = 2.2;
    if (nivel >= 3) multiplier = 2.6;
    if (nivel >= 4) multiplier = 3;

    let size = baseSize * multiplier;

    img.style.width = size + "px";
    img.style.height = size + "px";
    img.style.objectFit = "contain";

    const label = document.createElement("div");
    label.className = "label";
    label.innerText = nombre;
    label.style.textAlign = "center";
    label.style.marginTop = "5px";

    div.appendChild(img);
    div.appendChild(label);

    let pos = layout[i % layout.length];
    div.style.left = pos.x + "%";
    div.style.top = pos.y + "%";

    return div;
}

function aplicarTransform(grupoObj) {
    grupoObj.elementos.forEach(el => {
        el.style.transform = `
            translate(-50%, -50%)
            translateY(${grupoObj.offsetY}px)
            scale(${grupoObj.scale})
        `;
        el.style.opacity = grupoObj.scale < 0.03 ? 0 : 1;
    });
}

function agregarGrupo(index) {
    const nombres = grupos[index];
    const layout = layouts[index];

    const grupoObj = {
        elementos: [],
        scale: 1,
        offsetY: 0
    };

    nombres.forEach((nombre, i) => {
        const obj = crearObjeto(nombre, i, layout);
        container.appendChild(obj);
        grupoObj.elementos.push(obj);
    });

    gruposRenderizados.push(grupoObj);
}

function actualizarTodo() {
    gruposRenderizados.forEach(g => aplicarTransform(g));
}

function zoomIn() {
    if (nivel >= grupos.length - 1) return;

    nivel++;

    gruposRenderizados.forEach(g => {
        g.scale *= 0.2;
        g.offsetY -= 200;
    });

    actualizarTodo();

    escalaFondo *= 1.1;
    bg.style.transform = `scale(${escalaFondo})`;

    setTimeout(() => {
        agregarGrupo(nivel);
        actualizarTodo();

        if (nivel === grupos.length - 1) {
            bg.style.opacity = 0;
            bg2.style.opacity = 1;
        }
    }, 700);
}

function zoomOut() {
    if (nivel <= 0) return;

    let ultimo = gruposRenderizados.pop();
    ultimo.elementos.forEach(el => el.remove());

    nivel--;

    gruposRenderizados.forEach(g => {
        g.scale /= 0.2;
        g.offsetY += 200;
    });

    actualizarTodo();

    escalaFondo /= 1.1;
    bg.style.transform = `scale(${escalaFondo})`;

    if (nivel < grupos.length - 1) {
        bg.style.opacity = 1;
        bg2.style.opacity = 0;
    }
}

// 🚀 INICIO
agregarGrupo(0);
actualizarTodo();

document.getElementById("zoomIn").onclick = zoomIn;
document.getElementById("zoomOut").onclick = zoomOut;


// ================= LOADER =================

const loadingText = document.getElementById("loadingText");
const startBtn = document.getElementById("startBtn");
const loader = document.getElementById("loader");

const textoInicial = "Infografia - Escalas astronomicas by CHRIS.";
let i = 0;

function escribirTexto() {
    if (i < textoInicial.length) {
        document.querySelector(".terminal p").innerText += textoInicial.charAt(i);
        i++;
        setTimeout(escribirTexto, 40);
    } else {
        setTimeout(fakeLoading, 500);
    }
}

let progreso = 0;

function fakeLoading() {
    let intervalo = setInterval(() => {
        progreso++;

        let barras = Math.floor(progreso / 10);
        let barraTexto = "[" + "/".repeat(barras) + " ".repeat(10 - barras) + "]";

        loadingText.innerText = `${barraTexto} loading ${progreso}%`;

        if (progreso >= 100) {
            clearInterval(intervalo);
            startBtn.style.display = "block";
        }
    }, 50);
}

// 🔥 BOTÓN CON FIX DE AUDIO
startBtn.addEventListener("click", () => {
    loader.style.opacity = 0;

    setTimeout(() => {
        loader.style.display = "none";
    }, 500);

    if (musica) {
        musica.volume = 0.2;

        musica.play().catch(() => {
            console.log("Audio bloqueado 💀, intentando con interacción...");
        });
    }
});

// 🔥 respaldo por si el navegador se pone pesado
document.body.addEventListener("click", () => {
    if (musica && musica.paused) {
        musica.play().catch(()=>{});
    }
}, { once: true });

// iniciar
document.querySelector(".terminal p").innerText = "";
escribirTexto();
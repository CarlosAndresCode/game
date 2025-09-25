//Ocultar en div imagen-container
document.getElementById("imagen-container").style.display = "none";

const grupos = 5;
const imagenesPorGrupo = [
    ["imagenes/g1-1.jpg", "imagenes/g1-2.jpg", "imagenes/g1-3.jpg", "imagenes/g1-4.jpg", "imagenes/g1-5.jpg", "imagenes/g1-6.jpg"],
    ["imagenes/g2-1.jpg", "imagenes/g2-2.jpg", "imagenes/g2-3.jpg", "imagenes/g2-4.jpg", "imagenes/g2-5.jpg", "imagenes/g2-6.jpg"],
    ["imagenes/g3-1.jpg", "imagenes/g3-2.jpg", "imagenes/g3-3.jpg", "imagenes/g3-4.jpg", "imagenes/g3-5.jpg", "imagenes/g3-6.jpg"],
    ["imagenes/g4-1.jpg", "imagenes/g4-2.jpg", "imagenes/g4-3.jpg", "imagenes/g4-4.jpg", "imagenes/g4-5.jpg", "imagenes/g4-6.jpg"],
    ["imagenes/g5-1.jpg", "imagenes/g5-2.jpg", "imagenes/g5-3.jpg", "imagenes/g5-4.jpg", "imagenes/g5-5.jpg", "imagenes/g5-6.jpg"]
];

let turno = 0;
let puntos = [0, 0, 0, 0, 0];
let usadas = [[], [], [], [], []];
let timer;
let tiempoRestante = 0;

function actualizarMarcador() {
    let html = "";
    for (let i = 0; i < grupos; i++) {
        html += `<div class="grupo">Grupo ${i + 1}: <b>${puntos[i]}</b> puntos</div>`;
    }
    document.getElementById("marcador").innerHTML = html;
}

function lanzarImagen() {
    document.getElementById("imagen-container").style.display = "block";
    if (usadas[turno].length >= 6) {
        alert("El grupo ya usó sus 6 imágenes.");
        return;
    }

    let disponibles = imagenesPorGrupo[turno].filter(img => !usadas[turno].includes(img));

    let random = disponibles[Math.floor(Math.random() * disponibles.length)];

    document.getElementById("imagen").src = random;

    usadas[turno].push(random);

    iniciarTimer(30); // 30 segundos
}

function iniciarTimer(segundos) {
    clearInterval(timer);
    tiempoRestante = segundos;
    document.getElementById("timer").innerText = "⏳ " + tiempoRestante;
    timer = setInterval(() => {
        tiempoRestante--;
        document.getElementById("timer").innerText = "⏳ " + tiempoRestante;
        if (tiempoRestante <= 0) {
            clearInterval(timer);
            alert("⏰ Se acabó el tiempo!");
        }
    }, 1000);
}

function punto() {
    puntos[turno]++;
    actualizarMarcador();
    clearInterval(timer);
}

function siguienteGrupo() {
    document.getElementById("imagen-container").style.display = "none";
    clearInterval(timer);
    turno = (turno + 1) % grupos;
    document.getElementById("turno").innerText = "Turno del Grupo " + (turno + 1);
    document.getElementById("imagen").src = "";
    document.getElementById("timer").innerText = "⏳ 0";
}

function terminarJuego() {
    document.getElementById("imagen-container").style.display = "none";
    clearInterval(timer);
    let maxPuntos = Math.max(...puntos);
    let ganadores = [];
    for (let i = 0; i < puntos.length; i++) {
        if (puntos[i] === maxPuntos) {
            ganadores.push("Grupo " + (i + 1));
        }
    }
    alert("🏆 El juego ha terminado! Ganador(es): " + ganadores.join(", ") + " con " + maxPuntos + " puntos.");
}

// Inicializar marcador
actualizarMarcador();
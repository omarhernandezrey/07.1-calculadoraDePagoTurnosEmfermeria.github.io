function calcularPago() {
    const totalDiasMes = parseInt(document.getElementById("totalDiasMes").value);
    const turnosDia = parseInt(document.getElementById("turnosDia").value);
    const turnosNoche = parseInt(document.getElementById("turnosNoche").value);
    const turnosDomingoDia = parseInt(document.getElementById("turnosDomingoDia").value);
    const turnosDomingoNoche = parseInt(document.getElementById("turnosDomingoNoche").value);
    const turnosFestivosDia = parseInt(document.getElementById("turnosFestivosDia").value);
    const turnosFestivosNoche = parseInt(document.getElementById("turnosFestivosNoche").value);

    const valorTurnoDia = 105000;
    const valorTurnoNoche = 116000;
    const valorTurnoDomingoDia = 116000;
    const valorTurnoDomingoNoche = 116000;
    const valorTurnoFestivosDia = 116000;
    const valorTurnoFestivosNoche = 116000;

    let totalPagar = 0;

    totalPagar += turnosDia * valorTurnoDia;
    totalPagar += turnosNoche * valorTurnoNoche;
    totalPagar += turnosDomingoDia * valorTurnoDomingoDia;
    totalPagar += turnosDomingoNoche * valorTurnoDomingoNoche;
    totalPagar += turnosFestivosDia * valorTurnoFestivosDia;
    totalPagar += turnosFestivosNoche * valorTurnoFestivosNoche;

    const resultadosDiv = document.getElementById("resultados");
    
    resultadosDiv.innerHTML = `Total a pagar turnos del mes: $${totalPagar.toLocaleString()} Pesos`;
}

function toggleFooter() {
    const footer = document.querySelector("footer");
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollPos > 50) {
        footer.classList.add("show");
    } else {
        footer.classList.remove("show");
    }
}
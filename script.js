$(document).ready(function() {
    $('#calendar').fullCalendar({
        aspectRatio: 1.55,
        locale: 'es',
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month'
        },
        eventRender: function(event, element) {
            element.attr('title', event.title);

            if (event.title.includes('Roxana')) {
                element.css('color', 'red');
            }
            if (event.title.includes('Arlendys')) {
                element.css('color', 'blue');
            }
        },
        dayRender: function(date, cell) {
            if (date.day() === 0 || esFestivo(date)) {
                cell.addClass('day-number-red');
            }
        }
    });

    generarCalendario();
});

function obtenerFestivosManualmente() {
    return {
        '2023-01': ['2023-01-01'],
        '2023-03': ['2023-03-20'],
        '2023-04': ['2023-04-06', '2023-04-07', '2023-04-23'],
        '2023-05': ['2023-05-01', '2023-05-22'],
        '2023-06': ['2023-06-12', '2023-06-19'],
        '2023-07': ['2023-07-03', '2023-07-20'],
        '2023-08': ['2023-08-07', '2023-08-21'],
        '2023-10': ['2023-10-16'],
        '2023-11': ['2023-11-06', '2023-11-13'],
        '2023-12': ['2023-12-08', '2023-12-25'],
    };
}

function esFestivo(date) {
    const anioMes = date.format('YYYY-MM');
    const festivos = obtenerFestivosManualmente()[anioMes] || [];
    return festivos.includes(date.format('YYYY-MM-DD'));
}



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

    generarCalendario(totalDiasMes, turnosDia, turnosNoche, turnosDomingoDia, turnosDomingoNoche, turnosFestivosDia, turnosFestivosNoche);
}

function generarCalendario() {
    const calendar = $('#calendar');
    calendar.fullCalendar('removeEvents');

    let currentDate = moment().startOf('month');
    let eventos = [];

    for (let i = 0; i < currentDate.daysInMonth(); i++) {
        let currentDay = currentDate.clone().add(i, 'days');
        let turnoDia = {
            title: '',
            start: currentDay.format('YYYY-MM-DD'),
            color: ''
        };
        let turnoNoche = {
            title: '',
            start: currentDay.format('YYYY-MM-DD'),
            color: ''
        };

        if (i % 2 === 0) { // Día impar
            turnoDia.title = 'Día - Roxana';
            turnoNoche.title = 'Noche - Roxana';
        } else { // Día Par
             turnoDia.title = 'Día - Arlendys';
            turnoNoche.title = 'Noche - Arlendys';
        }

        if (currentDay.day() === 0 || esFestivo(currentDay)) { // Es domingo o festivo
            turnoDia.color = 'gray';
            turnoNoche.color = 'gray';
            
            // Cambiar el título del turno si es domingo o festivo
            if (esFestivo(currentDay)) {
                turnoDia.title = turnoDia.title.replace('Día', 'Día Festivo');
                turnoNoche.title = turnoNoche.title.replace('Noche', 'Noche Festivo');
            } else if (currentDay.day() === 0) {
                turnoDia.title = turnoDia.title.replace('Día', 'Día Domingo');
                turnoNoche.title = turnoNoche.title.replace('Noche', 'Noche Domingo');
            }
        } else { // No es domingo ni festivo
            turnoDia.color = 'orange';
            turnoNoche.color = 'gray';
        }

        eventos.push(turnoDia);
        eventos.push(turnoNoche);
    }

    // Agregar los eventos generados al calendario
    calendar.fullCalendar('addEventSource', eventos);
    // Navegar hasta la fecha actual
    calendar.fullCalendar('gotoDate', moment());
}
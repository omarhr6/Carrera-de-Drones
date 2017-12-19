//Varaibles Globales //
var posiA = 0;
var posiB = 0;

// Al cargar la ventana damos evento click a los botones y generamos las instrucciones //
window.onload = function() {
	gestionEvento('poner', 'click', false);
	var contenedor = document.getElementById('contenedor');
	generarInstrucciones();
};

// Función donde se realiaza la carrera
function carrera() {
	// Varaible donde calculamos el número random
	// Facilitada por Eduardo //
	var numRandom = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
	CalcularPosiA(numRandom);
	CalcularPosiB(numRandom);
	ComprobarPosicion();
	ComprobarVictoria();
	for (i = 0; i < 100; i++) {
		var span = document.createElement('span');
		if (posiA == i && posiB == i) {
			span.setAttribute('id', 'explosion');
		} else if (posiA == i) {
			span.setAttribute('id', 'dronA');
		} else if (posiB == i) {
			span.setAttribute('id', 'dronB');
		} else {
			span.textContent = '_';
		}
		contenedor.appendChild(span);
	}
	MensajeGanador();
	contenedor.innerHTML += '</br>';
}

// Función para calcular la posición del dron A,
// a partir del número random que le pasamos de la funcion Carrera()
function CalcularPosiA(numRandom) {
	if (1 <= numRandom && numRandom <= 3) {
		posiA = posiA + 3;
	} else if (4 <= numRandom && numRandom <= 5) {
		posiA = posiA - 2;
	} else if (6 <= numRandom && numRandom <= 8) {
		posiA = posiA + 1;
	} else if (9 <= numRandom && numRandom <= 10) {
		posiA = posiA;
	}
}

// Función para calcular la posición del dron B,
// a partir del número random que le pasamos de la funcion Carrera()
function CalcularPosiB(numRandom) {
	if (1 <= numRandom && numRandom <= 2) {
		posiB = posiB + 9;
	} else if (3 <= numRandom && numRandom <= 7) {
		posiB = posiB + 2;
	} else if (8 == numRandom) {
		posiB = posiB;
	} else if (9 <= numRandom && numRandom <= 10) {
		posiB = posiB - 5;
	}
}

// Función para comprobar que si nos da un movimiento hacia atras y el dron
// se sale de la pista pues lo ponemos a 0 para que no se salga.
function ComprobarPosicion() {
	if (posiA <= 0) {
		posiA = 0;
	}
	if (posiB <= 0) {
		posiB = 0;
	}
}

// Función para comprobar la victoria de los drones, comprobamos que la posición
// de ellos si es igual o mayor a 99 muestre un mensaje de victoria.
function ComprobarVictoria() {
	if (posiA >= 99) {
		posiA = 99;
		gestionEvento('quitar', 'click', carrera, false);
	}
	if (posiB >= 99) {
		posiB = 99;
		gestionEvento('quitar', 'click', carrera, false);
	}
}

// Función para mostrar toda la carrera al pulsar el boton
function CompletarCarrera() {
	do {
		carrera();
	} while (posiA < 99 && posiB < 99);
}

// Función para recargar la página y volver a empezar la carrera
function RecargarPagina() {
	location.reload(true);
}

// Función para mostrar el mensaje del ganador
function MensajeGanador() {
	if (posiA == 99) {
		var mensajeGanador = document.createElement('h2');
		mensajeGanador.textContent = 'GANÓ MI DRON! YEAH!';
		contenedor.appendChild = mensajeGanador;
	} else if (posiB == 99) {
		var mensajeGanador = document.createElement('h2');
		mensajeGanador.textContent = 'Ganó el dron tipo B. ¡¡Qué Bien!!';
		contenedor.appendChild(mensajeGanador);
	}
}

//Función para dar o quitar el evento click a los botones //
function gestionEvento(accion, evento, capturar) {
	if (accion == 'quitar') {
		document.getElementById('botonMovimiento').removeEventListener(evento, carrera, capturar);
		document.getElementById('botonCompletar').removeEventListener(evento, CompletarCarrera, capturar);
	}
	if (accion == 'poner') {
		document.getElementById('botonMovimiento').addEventListener(evento, carrera, capturar);
		document.getElementById('botonCompletar').addEventListener(evento, CompletarCarrera, capturar);
		document.getElementById('botonReset').addEventListener(evento, RecargarPagina, capturar);
	}
}

// Función para crear el panel de instrucciones //
function generarInstrucciones() {
	var contenedorInstrucciones = document.getElementById('contenedorIntrucciones');
	var a = document.createElement('a');
	a.setAttribute('href', '#');
	a.setAttribute('onclick', 'cerrarInstrucciones()');
	a.setAttribute('id', 'botonCerrarInstrucciones');
	a.textContent = 'X';
	contenedorInstrucciones.appendChild(a);
	var p = document.createElement('p');
	p.textContent = 'Instrucciones';
	p.setAttribute('id', 'pCentrar');
	contenedorInstrucciones.appendChild(p);
	var p1 = document.createElement('p');
	p1.textContent = '1. El dron A corresponde a la imagen :';
	contenedorInstrucciones.appendChild(p1);
	var span1 = document.createElement('span');
	span1.setAttribute('id', 'spanDronA');
	p1.appendChild(span1);
	var p2 = document.createElement('p');
	p2.textContent = '2. El dron B corresponde a la imagen :';
	contenedorInstrucciones.appendChild(p2);
	var span2 = document.createElement('span');
	span2.setAttribute('id', 'spanDronB');
	p2.appendChild(span2);
	var p3 = document.createElement('p');
	p3.textContent = '3. Misma posicion corresponde a la imagen :';
	contenedorInstrucciones.appendChild(p3);
	var span3 = document.createElement('span');
	span3.setAttribute('id', 'spanColision');
	p3.appendChild(span3);
}

//Función para ocultar el panel de instrucciones //
function cerrarInstrucciones() {
	document.getElementById('contenedorIntrucciones').style.display = 'none';
}
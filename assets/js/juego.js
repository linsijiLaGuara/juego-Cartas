

  /**
   *  2C = Two of Clubs
   *  2D = Two of Diamonds
   *  2H = Two of Hearts
   *  2S = Two of Spades
   *
   */
  let deck              = [];
  const tipos           = ["C", "D", "H", "S"];
  const especiales      = ["A", "J", "Q", "K"];
  let puntosJugador     = 0,
      puntosComputadora = 0;

//referencias uando se trabaja con ID se debe colocar asterisco htm referencias

const btnPedir               = document.querySelector ('#btnPedir');
const btnDetener             = document.querySelector('#btnDetener');
const btnNuevoJuego          = document.querySelector('#btnNuevoJuego');
const divCartaComputadora    = document.querySelector('#computadora-cartas');
const divCartaJugador        = document.querySelector('#jugador-cartas');
const puntosHTML             = document.querySelectorAll('small');

  //esta funcion crear un nuevo deck
  const crearDeck = () => {
    for (let i = 2; i <= 10; i++) {
      for (let tipo of tipos) {
        deck.push(i + tipo);
      }
    }
    for (let tipo of tipos) {
      for (let esp of especiales) {
        deck.push(esp + tipo);
      }
    }
    //console.log (deck); Quitar el deck ordenado
    deck = _.shuffle(deck);
  // console.log(deck);
  };
  crearDeck();
  //Esta funcion me permite crear una nueva carta
  const pedirCarta = () => {

    if ( deck.length === 0 ) {
        throw 'No hay cartas en el deck';
    }
    const carta = deck.pop();
    return carta;
}

  //for (let i =0; i <= 100; i++) {
  //perdirCarta ();}
  const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);

    return (isNaN(valor))?
            (valor === 'A')? 11 : 10
            : valor * 1 ; 
    };


    //turno computadora 
const turnoComputadora = (puntosMinimos) => {
do {
const carta = pedirCarta();
puntosComputadora       = puntosComputadora + valorCarta(carta);
puntosHTML[1].innerText = puntosComputadora;
const imgCarta          = document.createElement('img');
imgCarta.src            = `assets/cartas/${carta}.png`;
imgCarta.classList.add('cartas');
divCartaComputadora.append(imgCarta);
   if (puntosMinimos> 21){
    break;
   }
 } while ((puntosComputadora < puntosMinimos)&& ( puntosMinimos <= 21) );
   setTimeout(() => {
      
    if (puntosComputadora === puntosMinimos){
      alert ('Nadie Gana');
    } else if (puntosMinimos > 21) {
      alert ('Computadora Gana');

      }else if (puntosComputadora > 21){
        alert ('Jugador Gana' );
      }
    }, 10);
};

    //let puntos = 0 ; 
    //console.log ({valor});
    //permite  saber si es un numero evalura lo que esta en parentesis a ver si es un numero
  //   if (isNaN(valor)) {
  //     console.log("No es un número");
  //     puntos = (valor === 'A')? 11 : 10; 
  //   } else {
  //     console.log("Es un número");
  //     //si es numero se multipica por 1
  //     puntos = valor*1 ; 
  //   } 
  //   console.log(puntos);
 

//evento
btnPedir.addEventListener('click', () => {
const carta = pedirCarta();
puntosJugador = puntosJugador + valorCarta(carta);
puntosHTML [0].innerText = puntosJugador;
const imgCarta = document.createElement('img');
imgCarta.src = `assets/cartas/${carta}.png `;
imgCarta.classList.add('cartas');
divCartaJugador.append(imgCarta);
if (puntosJugador>21){

  console.warn('Perdiste lo siento');
  btnPedir.disabled = true;
  btnDetener.disabled = true ; 
  turnoComputadora(puntosJugador);

} else if (puntosJugador===21){
  console.warn('21 GANASTE!!');
  btnPedir.disabled = true;
  btnDetener.disabled = true ; 
  turnoComputadora(puntosJugador);
}
});
btnDetener.addEventListener ('click', ()=> {
 btnPedir.disabled = true;
 btnDetener.disabled = true ; 
 turnoComputadora(puntosJugador);

});
btnNuevoJuego.addEventListener('click', ()=> {
  console.clear();
  deck = [];
  deck= crearDeck();
  puntosJugador = 0;
  puntosComputadora = 0;
  puntosHTML [0].innerText = 0;
  puntosHTML [1].innerText = 0;
  divCartaComputadora.innerHTML = '';
  divCartaJugador.innerHTML = '';
  btnPedir.disabled = false;
  btnDetener.disabled = false ; 
});
import Game from 'dw-engine';

var game = new Game;
var container = document.createElement( 'div' );


container.addEventListener('click', () => game.show(), false);
document.body.appendChild( container );

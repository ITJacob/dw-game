import Game from 'dw-engine';

let game = new Game;
let container = document.createElement( 'div' );

document.body.appendChild( container );
game.init({
  container: container
});

game.run();

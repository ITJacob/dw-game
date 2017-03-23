// the game engine based on DongW.App
import * as THREE from 'three';
import DWCore from './core';
import DWObject, {DWLiving} from './object';
import {DWKeyboard} from './controls';

export default class DWEngine extends DWCore{
  constructor() {
    super();
    this.player = null;
    this.line = null;
  }

  init(param) {
    super.init(param);

    // add line
    let size = 500, step = 50;
    let geometry = new THREE.Geometry();
    for ( let i = - size; i <= size; i += step ) {
      geometry.vertices.push( new THREE.Vector3( - size, 0, i ) );
      geometry.vertices.push( new THREE.Vector3(   size, 0, i ) );

      geometry.vertices.push( new THREE.Vector3( i, 0, - size ) );
      geometry.vertices.push( new THREE.Vector3( i, 0,   size ) );
    }
    let material = new THREE.LineBasicMaterial({
      color: 0x000000,
      opacity: 0.2,
      transparent: true
    });
    let line = new THREE.LineSegments( geometry, material );
    this.line = new DWObject;
    this.line.setObject3D(line);
    this.addObject(this.line);

    // add player
    this.player = new DWLiving;
    this.player.init({moveSpeed: 5});
    this.player.setObject3D(new THREE.Mesh(
      new THREE.BoxGeometry( 50, 50, 50 ),
      new THREE.MeshLambertMaterial({
        color: Math.random() * 0x808080 + 0x808080,
        opacity: 0.8,
        transparent: true
      })
    ));
    this.player.setPosition(50, 25, 50);
    this.addObject(this.player);

    // init keyboard
    // let dom = this.container;
    let keyboard = new DWKeyboard;
    keyboard.init(this.camera, {domElement: document});
    keyboard.setTarget(this.player);
    this.initKeyboard(keyboard);
  }

}

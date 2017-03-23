// DongW.js, a 3D game engine based on Three.js
import * as THREE from 'three';

export default class DWCore {
  constructor() {
    this.renderer = null;
    this.scene = null;
    this.camera = null;
    this.objects = [];
    this.keyboard = null;
  }

  init(param) {
    param = param || {};
    let container = param.container;

    // Create the Three.js renderer, add it to our div
    let renderer = new THREE.WebGLRenderer( { antialias: true} );
    renderer.setClearColor( 0xf0f0f0 );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    // Create a new Three.js scene
    let scene = new THREE.Scene();
    scene.add( new THREE.AmbientLight( 0x505050 ) );
    scene.data = this;

    // Put in a camera at a good default location
    let camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.set( 0, 900, 0 );

    scene.add(camera);

    // Create a root object to contain all other scene objects
    let root = new THREE.Object3D();
    scene.add(root);

    // Save away a few things
    this.container = container;
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
    this.root = root;

    // Set up event handlers
    this.initMouse();
    // this.initKeyboard();
    this.addDomHandlers();
  }

  //Core run loop
  run() {
    this.update();
    this.renderer.render( this.scene, this.camera );
    let that = this;
    requestAnimationFrame(function() { that.run(); });
  }

  // Update method - called once per tick
  update() {
    let i, len;
    len = this.objects.length;
    for (i = 0; i < len; i++) {
      this.objects[i].update();
    }

    if (this.camera.update) {
      this.camera.update();
    }
  }

  // Add/remove objects
  addObject(obj) {
    this.objects.push(obj);

    // If this is a renderable object, add it to the root scene
    if (obj.object3D) {
      this.root.add(obj.object3D);
    }
  }

  removeObject(obj) {
    let index = this.objects.indexOf(obj);
    if (index != -1) {
      this.objects.splice(index, 1);

      // If this is a renderable object, remove it from the root scene
      if (obj.object3D) {
        this.root.remove(obj.object3D);
      }
    }
  }

  // Event handling
  initMouse() {
    let dom = this.renderer.domElement;

    let that = this;
    dom.addEventListener( 'mousemove',
      function(e) { that.onDocumentMouseMove(e); }, false );
    dom.addEventListener( 'mousedown',
      function(e) { that.onDocumentMouseDown(e); }, false );
    dom.addEventListener( 'mouseup',
      function(e) { that.onDocumentMouseUp(e); }, false );
  }

  initKeyboard(keyboard) {
    this.keyboard = keyboard;
  }

  onDocumentMouseMove(event) {
    event.preventDefault();
  }

  onDocumentMouseDown(event) {
    event.preventDefault();
  }

  onDocumentMouseUp(event) {
    event.preventDefault();
  }

  addDomHandlers() {
    let that = this;
    window.addEventListener( 'resize',
      function(event) { that.onWindowResize(event); }, false );
  }

  onWindowResize() {
    this.renderer.setSize( window.innerWidth, window.innerHeight );

    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }

}

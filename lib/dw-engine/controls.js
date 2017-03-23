

export class DWKeyboard {
  constructor() {
    this.camera = null;
    this.target = null;
    this.objects = [];
  }

  init(camera, param) {
    this.camera = camera;

    let that = this;
    this.camera.update = function() {
      let theCamera = this;

      console.log('the camera:');
      console.log('x: ' + theCamera.position.x);
      console.log('y: ' + theCamera.position.y);
      console.log('z: ' + theCamera.position.z);
      if (that.moveForward)  theCamera.translateZ(-that.moveSpeed);
      if (that.moveBackward) theCamera.translateZ( that.moveSpeed);
      if (that.moveLeft)     theCamera.translateX(-that.moveSpeed);
      if (that.moveRight)    theCamera.translateX( that.moveSpeed);

      if (that.target) {
        theCamera.lookAt( that.target.object3D.position );
      }
    };

    param = param || {};
    this.domElement = param.domElement || document;
    this.moveSpeed = param.moveSpeed || 1;
    this.domElement.addEventListener('keydown',
      (e) => this.onKeyDown(e), false);
    this.domElement.addEventListener('keyup',
      (e) => this.onKeyUp(e), false);
  }

  setTarget(target) {
    if (this.target) {
      let t = this.target;
      this.removeObject(t);
    }
    this.target = target;
    this.moveSpeed = target.moveSpeed || 1;
    this.camera.lookAt( target.object3D.position );
    this.addObject(target);
  }

  updateObjects() {
    let i, len;
    len = this.objects.length;
    for (i = 0; i < len; i++) {
      let obj = this.objects[i];
      obj.handleMove({
        moveForward: this.moveForward,
        moveBackward: this.moveBackward,
        moveLeft: this.moveLeft,
        moveRight: this.moveRight
      });
    }
  }

  onKeyDown(event) {
    event.preventDefault();
    switch (event.keyCode) {
    case 32: /*space*/ this.fire = true; break;
    case 38: /*up*/
    case 87: /*W*/ this.moveForward = true; break;
    case 37: /*left*/
    case 65: /*A*/ this.moveLeft = true; break;
    case 40: /*down*/
    case 83: /*S*/ this.moveBackward = true; break;
    case 39: /*right*/
    case 68: /*D*/ this.moveRight = true; break;
    }
    this.updateObjects();
  }

  onKeyUp(event) {
    event.preventDefault();
    switch(event.keyCode) {
    case 32: /*space*/ this.fire = false; break;
    case 38: /*up*/
    case 87: /*W*/ this.moveForward = false; break;
    case 37: /*left*/
    case 65: /*A*/ this.moveLeft = false; break;
    case 40: /*down*/
    case 83: /*S*/ this.moveBackward = false; break;
    case 39: /*right*/
    case 68: /*D*/ this.moveRight = false; break;
    }
    this.updateObjects();
  }

  // Add/remove objects
  addObject(obj) {
    this.objects.push(obj);
  }

  removeObject(obj){
    let index = this.objects.indexOf(obj);
    if (index != -1) {
      this.objects.splice(index, 1);
    }
  }

}

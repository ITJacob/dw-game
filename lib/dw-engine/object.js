// DongW.Object - base class for all objects in our simulation

export default class DWObject {
  constructor() {
    this.object3D = null;
    this.children = [];
  }

  init() {
  }

  update() {
    this.updateChildren();
  }

  // setPosition - move the object to a new position
  setPosition(x, y, z) {
    if (this.object3D){
      this.object3D.position.set(x, y, z);
    }
  }

  //setScale - scale the object
  setScale(x, y, z) {
    if (this.object3D) {
      this.object3D.scale.set(x, y, z);
    }
  }

  //setVisible - visible the object
  setVisible(visible) {
    function setVisible(obj, visible) {
      obj.visible = visible;
      let i, len = obj.children.length;
      for (i = 0; i < len; i++) {
        setVisible(obj.children[i], visible);
      }
    }

    if (this.object3D) {
      setVisible(this.object3D, visible);
    }
  }

  // updateChildren - update all child objects
  updateChildren() {
    let i, len;
    len = this.children.length;
    for (i = 0; i < len; i++) {
      this.children[i].update();
    }
  }

  setObject3D(object3D) {
    object3D.data = this;
    this.object3D = object3D;
  }

  //Add/remove children
  addChild(child) {
    this.children.push(child);

    // If this is a renderable object, add its object3D as a child of mine
    if (child.object3D) {
      this.object3D.add(child.object3D);
    }
  }

  removeChild(child) {
    let index = this.children.indexOf(child);
    if (index != -1) {
      this.children.splice(index, 1);

      // If this is a renderable object, remove its object3D as a child of mine
      if (child.object3D) {
        this.object3D.remove(child.object3D);
      }
    }
  }

  // Some utility methods
  getScene() {
    let scene = null;
    if (this.object3D) {
      let obj = this.object3D;
      while (obj.parent) {
        obj = obj.parent;
      }

      scene = obj;
    }

    return scene;
  }

  getApp() {
    let scene = this.getScene();
    return scene ? scene.data : null;
  }

}


export class DWLiving extends DWObject{
  constructor() {
    super();
    this.moveSpeed = 1;
    this.moveDirection = {};
  }

  init(param) {
    super.init(param);

    param = param || {};
    this.moveSpeed = param.moveSpeed || 1;
  }

  handleMove(direction) {
    this.moveDirection = direction;
  }

  update() {
    super.update();

    // update position
    let obj = this.object3D;
    let direction = this.moveDirection;
    console.log('the obj:');
    console.log('x: ' + obj.position.x);
    console.log('y: ' + obj.position.y);
    console.log('z: ' + obj.position.z);

    if (direction.moveForward)  obj.translateZ(-this.moveSpeed);
    if (direction.moveBackward) obj.translateZ( this.moveSpeed);
    if (direction.moveLeft)     obj.translateX(-this.moveSpeed);
    if (direction.moveRight)    obj.translateX( this.moveSpeed);

  }
}

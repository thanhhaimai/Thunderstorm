var Common = require('./common');

function Ship(position, player, id) {
  this.speed = 0;
  this.orientation = [0, 0];
  this.position = position;
  this.player = player;
  this.maxSpeed = 50;
  this.player = null;
  this.hp = 100;
  this.isAlive = true;
  this.radius = 10;
  this.coolDown = 0;
  this.defaultCoolDown = 1;
  this.id = id;
}

Ship.prototype = {
  newOrientation: undefined,

  getCoolDown: function() {
    return this.coolDown;
  },
  resetCoolDown: function() {
    this.coolDown = this.defaultCoolDown;
  },
  setNewOrientation: function(newOrientation) {
    this.newOrientation = Common.normalize(newOrientation);
  },
  getNewOrientation: function() {
    return this.newOrientation;
  },
  update: function(timeElapsed) {
    this.turn(timeElapsed);
    var px = this.position[0], py = this.position[1];
    var ox = this.orientation[0], oy = this.orientation[1];
    var newx = px + ox * this.speed, newy = py + oy * this.speed;
    newx = Math.max(newx, this.radius);
    newx = Math.min(newx, WIDTH - this.radius);
    newy = Math.max(newy, this.radius);
    newy = Math.min(newy, HEIGHT - this.radius);
    this.position = [newx, newy];
    this.coolDown = Math.max(this.coolDown - timeElapsed, 0);
  },
  turn: function(timeElapsed) {
    if(this.newOrientation === undefined) {
      // decrease speed
      this.speed = Math.max(this.speed - 0.1 * timeElapsed * this.maxSpeed, 0);
    } else if (Common.isSameOrientation(this.orientation, this.newOrientation)) {
      // increase speed
      this.speed = Math.min(this.speed + timeElapsed * this.maxSpeed, this.maxSpeed);
    } else {
      this.orientation = Common.normalize(this.newOrientation);
      this.speed *= 0.5;
    }
    this.newOrientation = undefined;
  },
  damage: function(damageValue) {
    if(!this.isAlive) {
      return;
    }
    this.hp -= damageValue;
    if(this.hp <= 0) {
      this.hp = 0;
      this.isAlive = false;
    }
  },
  getSpeed: function() {
    return this.speed;
  },
  getVelocity: function() {
    return [this.orientation[0] * this.speed, this.orientation[1] * this.speed];
  },
  getOrientation: function() {
    return this.orientation;
  },
  getPosition: function() {
    return this.position;
  },
  setPosition: function(pos) {
    this.position = Common.fixPosition(pos);
  },
  getHp: function() {
    return this.hp;
  },
  getRadius: function() {
    return this.radius;
  },
};

module.exports = Ship;

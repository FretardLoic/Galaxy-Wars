Fleet.DEFAULT_SPEED = 10;

function Fleet(destination, amount, x, y, faction) {
  Biomass.call(this, amount, faction, x, y);
  if (destination == undefined && destination == null && !(destination instanceof Planet)) {
    console.log("L'argument destination doit être de type Planet et non-null");
    throw new Error("Fleet constructor: wrong arguments");
  }
  this.destination = destination;
  
  this.playTurn = function() {
    var dx = destination.getX() - this.x;
    var dy = destination.getY() - this.y;
    
    var dist_square = dx * dx + dy * dy;
    
    var dist = 1;
    while (dist * dist < dist_square) {
      ++dist; 
    }
    if (dist > DEFAULT_SPEED) {
      this.x += ParseInt(dx * DEFAULT_SPEED / dist);
      this.y += ParseInt(dy * DEFAULT_SPEED / dist);
    } else {
      if (this.faction == destination.faction) {
        destination.renforce(this);
      } else {
        destination.defend(this);
      }
    }
  }
}

Fleet.prototype = Object.create(Biomass.prototype);
Fleet.prototype.constructor = Fleet;

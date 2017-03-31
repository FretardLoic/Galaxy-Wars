Fleet.DEFAULT_SPEED = 100;

function Fleet(destination, amount, x, y, faction, context) {
  Biomass.call(this, amount, x, y, faction, context);
  if (destination === undefined || destination === null || !(destination instanceof Planet)) {
    console.log("L'argument destination doit être défini, de type Planet et non-null.\n");
    throw new Error("Fleet constructor: wrong arguments.\n");
  }
  if (amount <= 0) {
    console.log("L'argument amount doit être strictement positif.\n");
    throw new Error("Fleet constructor: wrong arguments.\n");
  }
  
  
  this.destination = destination;
  
  this.playTurn = function() {
    var dx = destination.x - this.x;
    var dy = destination.y - this.y;
    
    var dist_square = dx * dx + dy * dy;
    
    var dist = 1;
    while (dist * dist < dist_square) {
      ++dist; 
    }
    
    if (dist > Fleet.DEFAULT_SPEED) {
      this.x += parseInt(dx * Fleet.DEFAULT_SPEED / dist);
      this.y += parseInt(dy * Fleet.DEFAULT_SPEED / dist);
    } else {
      if (this.faction == destination.faction) {
        destination.renforce(this);
      } else {
        destination.defend(this);
      }
    }
  }
  
  this.draw = function() {
    if (this.context === null || this.context === undefined) {
      return;
    }
    var root;
    for (root = 0; root * root < amount; ++root) {
    }
    
    this.context.fillStyle = this.faction.color;
    this.context.beginPath();
    this.context.arc(this.x, this.y, (root / 5 + 2), 0, 2 * Math.PI, false);
    this.context.fill();
  }
}

Fleet.prototype = Object.create(Biomass.prototype);
Fleet.prototype.constructor = Fleet;

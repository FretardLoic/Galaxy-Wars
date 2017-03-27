Fleet.DEFAULT_SPEED = 10;

function Fleet(destination, amount, x, y, faction) {
  Biomass.call(this, amount, x, y, faction);
  if (destination === undefined && destination === null && !(destination instanceof Planet)) {
    console.log("L'argument destination doit être de type Planet et non-null.");
    throw new Error("Fleet constructor: wrong arguments.");
  }
  if (faction !== undefined && faction !== null && !(faction instanceof Player)) {
    console.log("L'argument faction doit être de type Player.");
    throw new Error("Fleet constructor: wrong arguments.");
  }
  if (amount <= 0) {
    console.log("L'argument amount doit être strictement positif.");
    throw new Error("Fleet constructor: wrong arguments.");
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
  
  this.draw = function(ctx) {
    ctx.fillStyle = this.faction.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, (amount / 20 + 2), 0, 2 * Math.PI, false);
    ctx.fill();
  }
}

Fleet.prototype = Object.create(Biomass.prototype);
Fleet.prototype.constructor = Fleet;

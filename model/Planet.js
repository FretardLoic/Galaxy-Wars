Planet.GROWTH_MAX = 10;

function Planet(growth, amount, x, y, faction) {
  Biomass.call(this, amount, x, y, faction);
  if (growth == undefined || isNaN(growth) || growth < 0 || growth > Planet.GROWTH_MAX) {
    console.log("L'argument amount doit être un nombre compris entre 0 et 10\n");
    throw new Error("Planet constructor: wrong arguments");
  }
  this.growth = parseInt(growth);
  
  this.ray = 4 * (growth / 3 + 5);
  
  this.playTurn = function() {
    this.amount += growth;
  }
  
  this.defend = function(fleet) {
    if (fleet === undefined || fleet === null || !(fleet instanceof Fleet)) {
      throw new Error("fleet n'est pas un argument valide.");
    } else if (this.faction == fleet.faction) {
      throw new Error("fleet a le meme joueur.");
    }
    if (this.amount > fleet.getAmount()) {
      this.amount -= fleet.getAmount();
    } else if (this.amount < fleet.getAmount()){
      this.amount = fleet.getAmount() - this.amount;
      if (this.faction !== null) {
        this.faction.removeBiomass(this);
      }
      this.faction = fleet.getFaction();
      this.faction.addBiomass(this);
    } else {
      this.amount = 0;
      this.faction = null;
    }
    fleet.getFaction().removeBiomass(fleet);
  }
  
  this.renforce = function(fleet) {
    if (fleet === undefined || fleet === null || !(fleet instanceof Fleet)) {
      throw new Error("fleet n'est pas un argument valide.");
    } else if (this.faction != fleet.faction) {
      throw new Error("fleet n'a pas le meme joueur.");
    }
    this.amount += fleet.getAmount();
    fleet.getFaction().removeBiomass(fleet);
  }
  
  this.launch = function(power, planet) {
    if (power >= this.amount) {
      throw new Error("Cette Planet n'a pas assez de troupes.");
    }
    this.faction.addBiomass(new Fleet(planet, power, this.x, this.y, this.faction));
    this.amount -= power;
  }
  
  this.isOn = function(x, y) {
    var dx = x - this.x;
    var dy = y - this.y;
    
    var dist_square = dx * dx + dy * dy;
    console.log([dist_square, this.ray * this.ray]);
    return dist_square < this.ray * this.ray;
  }
  
  this.draw = function(ctx) {
    if (faction === undefined || faction === null) {
      ctx.fillStyle = "grey";
    } else {
      ctx.fillStyle = this.faction.color;
    }
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.ray, 0, 2 * Math.PI, false);
    ctx.fill();
  }
}

Planet.prototype = Object.create(Biomass.prototype);
Planet.prototype.constructor = Planet;

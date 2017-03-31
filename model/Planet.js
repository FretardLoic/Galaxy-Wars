Planet.GROWTH_MAX = 10;
Planet.NEUTRAL_COLOR = "grey";
Planet.TEXT_COLOR = "red";
Planet.CHANGE_FACTION_EVENT = "planet take";
Planet.LAUNCHING_EVENT = "fleet_launched";
Planet.RAY = function(growth) {
  return 2 * growth + 15;
}
Planet.ImageNb = 11;
Planet.getImage = function(n) {
  var img = new Image();
  img.src = "img/p" + (n % Planet.ImageNb + 1)  + ".png";
  return img;
}

function Planet(name, growth, amount, x, y, img, faction, context) {
  Biomass.call(this, amount, x, y, faction, context);
  if (name === undefined || name === null || (!(name instanceof String) && typeof name != "string")) {
    console.log("La planete doit avoir un nom.");
    throw new Error("Planet constructor: wrong arguments");
  }
  if (growth == undefined || isNaN(growth) || growth < 1 || growth > Planet.GROWTH_MAX) {
    console.log("L'argument growth doit être un nombre compris entre 1 et 10\n");
    throw new Error("Planet constructor: wrong arguments");
  }
  this.name = name;
  this.growth = parseInt(growth);
  this.img = img;
  
  this.ray = Planet.RAY(growth);
  
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
      if (this.faction !== null && this.faction !== undefined) {
        this.faction.removeBiomass(this);
      }
      this.faction = fleet.getFaction();
      this.faction.addBiomass(this);
      document.dispatchEvent(new CustomEvent(
        Planet.CHANGE_FACTION_EVENT, { 
          detail:this, 
        }
      ));
    } else {
      if (this.faction !== null) {
        this.amount = 0;
        this.faction = null;
        document.dispatchEvent(new CustomEvent(
          Planet.CHANGE_FACTION_EVENT, { 
            detail: this
          }
        ));
      } else {
        this.amount = 0;
      }
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
      throw new Error("Cette Planet n'a pas assez de troupes.\n");
    }
    if (power < 1) {
      throw new Error("Ce n'est pas une flotte.\n");
    }
    var fleet = new Fleet(planet, parseInt(power), this.x, this.y, this.faction, this.context);
    this.faction.addBiomass(fleet);
    this.amount -= parseInt(power);
    document.dispatchEvent(new CustomEvent(
      Planet.LAUNCHING_EVENT, { 
        detail: {
          fleet: fleet,
          launcher: this,
        }
      }
    ));
  }
  
  this.isOn = function(x, y) {
    var dx = x - this.x;
    var dy = y - this.y;
    
    var dist_square = dx * dx + dy * dy;
    
    return dist_square < this.ray * this.ray;
  }
  
  this.draw = function() {
    if (this.context === null || this.context === undefined) {
      return;
    }
    if (this.faction === undefined || this.faction === null) {
      this.context.fillStyle = Planet.NEUTRAL_COLOR;
    } else {
      this.context.fillStyle = this.faction.color;
    }
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.ray, 0, 2 * Math.PI, false);
    this.context.fill();
    
    if (this.img !== undefined && this.img !== null && (this.img instanceof Image)) {
      var border = 4;
      this.context.drawImage(this.img, this.x - (this.ray - border), this.y - (this.ray - border), 
          2 * (this.ray - border), 2 * (this.ray - border));
    }
    
    this.context.fillStyle = Planet.TEXT_COLOR;
    this.context.fillText(this.name, this.x, this.y - 10);
    this.context.fillText(this.amount, this.x, this.y + 10);
    
  }
}

Planet.prototype = Object.create(Biomass.prototype);
Planet.prototype.constructor = Planet;

Planet.isOnContact = function(p1, p2) {
  if (p1 === undefined || p1 === null || ! (p1 instanceof Planet)) {
    throw new Error("p1 doit être une instance de Planet définis et non-null.\n");
  }
  if (p2 === undefined || p2 === null || ! (p2 instanceof Planet)) {
    throw new Error("p2 doit être une instance de Planet définis et non-null.\n");
  }
  var dx = p1.x - p2.x;
  var dy = p1.y - p2.y;
  
  var dist_square = dx * dx + dy * dy;
  var rayAdd = p1.ray + p2.ray;
  
  return rayAdd * rayAdd > dist_square;
}

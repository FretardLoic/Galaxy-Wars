function Player(name, color) {
  if (name === undefined || name === null || !(name instanceof String)) {
      console.log("Le nom du Player doit être passé au constructeur\n");
  }
  this.name = name;
  this.color = color;
  this.biomass = [];
  this.playTurn = null;
  
  this.addBiomass = function(biomass) {
    if (biomass === undefined || biomass === null || !(biomass instanceof Biomass)) {
      throw new Error("biomass doit une instance de biomass définie et non-null");
    }
    this.biomass.push(biomass);
  }
  
  this.removeBiomass = function(biomass) {
    if (biomass === undefined || biomass === null || !(biomass instanceof Biomass)) {
      throw new Error("biomass doit une instance de biomass définie et non-null");
    }
    var i = this.biomass.indexOf(biomass);
    if (i != -1) {
      this.biomass.splice(i,1);
    }
  }
  
  this.endTurn = function() {
    function tmp(a) {
      a.playTurn();
    }
    this.biomass.forEach(tmp);
  }
  
  this.drawBiomass = function(ctx) {
    function tmp(a) {
      a.draw(ctx);
    }
    this.biomass.forEach(tmp);
  }
  
  this.hasLost = function() {
    return this.biomass.length == 0;
  }
}

function IAPlayer(name) {
  Player.call(this, name);
  this.playTurn = function() {
    //a faire
  }
}

IAPlayer.prototype = Object.create(Player.prototype);
IAPlayer.prototype.constructor = IAPlayer;

function Player(name) {
  if (name === undefined || name === null || !(name instanceof String)) {
      console.log("Le nom du Player doit être passé au constructeur\n");
  }
  this.name = name;
  this.biomass = [];
  
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
}

Player.hasLost = function(player) {
  if (player === undefined || player === null && !(player instanceof Player)) {
    throw new Error("L'argument player doit être de type Player, défini et non-null.");
  }
  return this.biomass.length == 0;
}

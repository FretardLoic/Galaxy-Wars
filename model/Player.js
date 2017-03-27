function Player(name) {
  if (name === undefined || name === null || !(name instanceof string)) {
      console.log("Le nom du Player doit être passé au constructeur\n");
  }
  this.name = name;
  this.biomass = new array();
  
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
    int i = 0;
    while (i < this.biomass.length && this.biomass[i] != biomass) {
      ++i;
    }
    if (i < this.biomass.length) {
      this.biomass.splice(i,1);
    }
  }
  
}

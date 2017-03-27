Planet.GROWTH_MAX = 10;

function Planet(growth, amount, faction, x, y) {
  if (growth == undefined || isNaN(x) || x < 0 || x > GROWTH_MAX) {
    console.log("L'argument amount doit être un nombre compris entre 0 et 10\n");
    throw new Error("Planet constructor: wrong arguments");
  }
  Biomass.apply(this, [amount, faction, x, y]);
  this.growth = parseInt(growth);
  this.playTurn = function() {
    this.amount += growth;
  }
  this.defend = function(fleet) {
    if (fleet == undefined && fleet == null && !(fleet instanceof Player)) {
      throw new Error("fleet n'est pas un argument valide.");
    }
    if (this.amount > fleet.getAmount()) {
      this.amount -= fleet.getAmount();
    } else {
      this.amount = fleet.getAmount() - this.amount;
      this.faction.removeBiomass(this);
      this.faction = fleet.getFaction();
      this.faction.addBiomass(this);
    }
    fleet.getFaction().removeBiomass(fleet);
  }
}

//~ function Planet(population, growth, owner) {
    //~ if (population == undefined || growth == undefined) {
        //~ console.log("Le constructeur de Planet prend au moins 2 arguments\n");
    //~ } else if (isNaN(population) || population < 0) {
        //~ console.log("L'argument population doit être un nombre positif\n");
    //~ } else if (isNaN(growth) || growth <= 0 || Planet.GROWTH_MAX < growth) {
        //~ console.log("L'argument growth doit être un nombre strictement"
        //~ + " positif entre 1 et 10\n");
    //~ } else if (owner != undefined && !(owner instanceof Player)) {
        //~ console.log("L'argument owner doit être de type Player");
    //~ } else {
        //~ this.population = Number(population);
        //~ this.growth = Number(growth);
        //~ this.owner = owner == undefined ? null : owner;
        
        //~ this.grow = function() {
            //~ if (this.owner != null) {
                //~ this.population += this.growth;
            //~ }
        //~ }
        
        //~ this.defend = function(player) {
            //~ //TODO
            //~ return;
        //~ }
        
        //~ return this;
    //~ }
    //~ throw new Error("Planet constructor: wrong arguments");
//~ }


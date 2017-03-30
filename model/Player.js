function Player(name, color) {
  if (name === undefined || name === null || (!(name instanceof String) && typeof name != "string")) {
      throw new Error("Le nom du Player doit être passé au constructeur.\n");
  }
  this.name = name;
  this.color = color;
  this.biomass = [];
  this.playTurn = null;
  
  this.addBiomass = function(biomass) {
    if (biomass === undefined || biomass === null || !(biomass instanceof Biomass)) {
      throw new Error("biomass doit être une instance de biomass définie et non-null.");
    }
    this.biomass.push(biomass);
  }
  
  this.removeBiomass = function(biomass) {
    if (biomass === undefined || biomass === null || !(biomass instanceof Biomass)) {
      throw new Error("biomass doit être une instance de biomass définie et non-null.");
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
  
  this.drawBiomass = function() {
    function tmp(a) {
      a.draw();
    }
    this.biomass.forEach(tmp);
  }
  
  this.hasLost = function() {
    return this.biomass.length == 0;
  }
}

function IAPlayer(name, color) {
  Player.call(this, name, color);
  
  this.galaxy;
  
  this.playTurn = function() {
    if (this.galaxy === undefined || this.galaxy === null || ! (this.galaxy instanceof Galaxy)) {
      return;
    }
    
    var me = this;
    var planets = this.biomass.filter(function(a) {
      return a instanceof Planet;
    });
    
    var fleets = [];
    var targets = [];
    var weaks = [];
    
    function dist_cost(launcher,target) {
      var distx = launcher.x - target.x;
      var disty = launcher.y - target.y;
      
      var dist_square = distx * distx + disty * disty;
      
      return dist_square / 10000;
    }
    
    
    for (var i = 0; i < planets.length; ++i) {
      fleets[i] = 0;
      targets[i] = this.galaxy.planets[0];
      weaks[i] = this.galaxy.planets[0].amount + dist_cost(planets[i], this.galaxy.planets[0]);
    }
    
    
    g.players.forEach(function(p) {
      p.biomass.forEach(function(b) {
        if (b.faction !== me && b instanceof Fleet && b.destination.faction === me) {
          var i = 0;
          while (planets[i] !== b.destination) {
            ++i;
          }
          fleets[i] += b.amount;
        }
      });
    });
    
    g.planets.forEach(function(p) {
      if (p.faction !== me) {
        for (var i = 0; i < planets.length; ++i) {
          var weak = p.amount + dist_cost(planets[i],p);
          if (weak < weaks[i]) {
            targets[i] = p;
            weaks[i] = weak;
          }
        }
      }
    });
    
    for (var i = 0; i < planets.length; ++i) {
      if (0.8 * planets[i].amount - fleets[i] - weaks[i] > 0) {
        planets[i].launch(planets[i].amount * 0.8, targets[i]);
      }
    }
  }
}

IAPlayer.prototype = Object.create(Player.prototype);
IAPlayer.prototype.constructor = IAPlayer;

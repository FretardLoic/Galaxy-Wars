Galaxy.BACKGROUND_COLOR = "black";

function Galaxy(planets, players, context, printWinner, backgroundImg) {
  if (planets === undefined || planets === null || !(planets instanceof Array) ||
      planets.length == 0) {
    throw new Error("planets doit être un tableau non-vide.\n");
  }
  if (players === undefined || players === null || !(players instanceof Array) ||
      players.length == 0) {
    throw new Error("players doit être un tableau non-vide.\n");
  }
  if (printWinner !== undefined && printWinner !== null && !(printWinner instanceof Function)) {
    throw new Error("printWinner doit être une fonction.\n");
  }
  for (var i = 0; i < players.length; ++i) {
    if (players[i] === undefined || players[i] === null || ! (players[i] instanceof Player)) {
      throw new Error("players doit contenir des éléments de type Player définis et non-null.\n");
    }
    if (players[i] instanceof IAPlayer) {
      players[i].galaxy = this;
    }
    
    planets = planets.concat(players[i].biomass);
  }
  for (var i = 0; i < planets.length; ++i) {
    if (planets[i] === undefined || planets[i] === null || ! (planets[i] instanceof Planet)) {
      throw new Error("planets doit contenir des éléments de type Planet définis et non-null.\n");
    }
    if (planets[i].x - planets[i].ray < 0 || planets[i].x + planets[i].ray > zone.width
        || planets[i].y - planets[i].ray < 0 || planets[i].y + planets[i].ray > zone.height) {
      throw new Error("Une planète ne rentre pas dans la zone.\n");
    }
    planets[i].context = context;
  }
  
  this.players = players;
  this.planets = planets;
  this.currentPlayerIndex = 0;
  
  this.context = context;
  
  this.backgroundImg = backgroundImg;
  
  this.getCurrentPlayer = function() {
    return this.players[this.currentPlayerIndex];
  }
  
  this.nextTurn = function() {
    this.nextPlayer();
    while (! this.isFinish() && this.getCurrentPlayer() instanceof IAPlayer) {
      this.getCurrentPlayer().playTurn();
      this.nextPlayer();
    }
    if (this.isFinish()) {
      this.printWinner();
    }
  }
  
  this.nextPlayer = function() {
    this.getCurrentPlayer().endTurn();
    
    this.draw();
    this.players = players.filter(function(a) {
      return ! a.hasLost();
    });
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
  }
  
  this.isFinish = function() {
    return this.players.length == 1;
  }
  
  this.draw = function() {
    this.context.fillStyle = Galaxy.BACKGROUND_COLOR;
    this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    if (backgroundImg !== undefined && backgroundImg !== null && backgroundImg instanceof Image) {
      this.context.drawImage(this.backgroundImg, 0, 0, this.context.canvas.width, this.context.canvas.height);
    }
    
    this.players.forEach(function tmp(a) {
      a.drawBiomass();
    });
    this.planets.forEach(function tmp(a) {
      if (a.faction === null || a.faction === undefined) {
        a.draw();
      }
    });
  }
  
  this.printWinner = printWinner;
}

var color_tab = ['blue', 'green', 'red', 'pink', 'orange', 'purple'];
var planet_name_tab = ['Terre', 'Mars', 'Jupiter', 'Saturne', 'Uranus', 'Pluton', 'Mercure', 'Venus', 'Neptune'];

Galaxy.generator = function(playersName, iaNb, planetNb, context, printWinner, img) {
  if (playersName === undefined || playersName === null || !(playersName instanceof Array) ||
      playersName.length == 0) {
    throw new Error("playersName doit être un tableau non-vide.\n");
  }
  if (iaNb === undefined || iaNb === null || isNaN(iaNb) || iaNb < 0) {
    throw new Error("iaNb doit être un nombre positif.\n");
  }
  if (planetNb === undefined || planetNb === null || isNaN(planetNb) || planetNb < playersName.length) {
    throw new Error("planetNb doit être un nombre positif.\n");
  }
  
  var players = [];
  var cmp = 0;
  
  playersName.forEach(function(p) {
    if (p === undefined || p === null || (! (p instanceof String) && typeof p != 'string')) {
      throw new Error("playersName doit contenir des string non-null et définies.\n");
    }
    players.push(new Player(p, color_tab[cmp % color_tab.length]));
    ++cmp;
  });
  
  for (var i = 0; i < parseInt(iaNb); ++i) {
    players.push(new IAPlayer(("ia" + (i + 1)), color_tab[cmp % color_tab.length]));
    ++cmp;
  }
  
  function nbAlea(mini, maxi) {
    var x = parseInt(mini);
    var y = parseInt(maxi);
    return parseInt(Math.floor(x + (y - x + 1) * Math.random()));
  }
  
  var allPlanets = [];
  function newPlanet(name, growth, amount, img, faction) {
    function contact(p) {
      for (var i = 0; i < allPlanets.length; ++i) {
        if (Planet.isOnContact(p, allPlanets[i])) {
          return true;
        }
      }
      return false;
    }
    
    var x;
    var y;
    var p;
    var i = 0;
    do {
      p = new Planet(name, growth, amount, 
          nbAlea(Planet.RAY(growth) , context.canvas.width - Planet.RAY(growth)),
          nbAlea(Planet.RAY(growth) , context.canvas.height - Planet.RAY(growth)), 
          img, faction);
      ++i;
    }while (contact(p) && i < 100000);
    if (i == 100000) {
      throw new Error("Il n'y a pas assez de place pour mettre (facilement) une planete de cette taille.\n");
    }
    allPlanets.push(p);
    return p;
  }
  
  function getPlanetName(i) {
    if (i < planet_name_tab.length) {
      return planet_name_tab[i];
    }
    return planet_name_tab[i % planet_name_tab.length] + (Math.floor(i / planet_name_tab.length) + 1);
  }
  
  cmp = 0;
  
  players.forEach(function(p) {
    p.addBiomass(newPlanet(getPlanetName(cmp), 5, 100, Planet.getImage(cmp), p));
    ++cmp;
  });
  
  var planets = [];
  for (cmp; cmp < planetNb; ++cmp) {
    planets.push(newPlanet(getPlanetName(cmp), nbAlea(1 , Planet.GROWTH_MAX), nbAlea(50 , 300), Planet.getImage(cmp)));
  }
  
  return new Galaxy(planets, players, context, printWinner, img);
}

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
    function tmp(a) {
      return ! a.hasLost();
    }
    this.draw();
    this.players = players.filter(tmp);
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

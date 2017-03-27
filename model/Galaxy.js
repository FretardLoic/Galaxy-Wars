
function Galaxy(planets, players) {
  if (planets === undefined || planets === null || !(planets instanceof Array) 
    planets.length == 0) {
      throw new Error("planets doit être un tableau non-vide.\n");
  }
  if (players === undefined || players === null || !(players instanceof Array)) {
      throw new Error("players doit être un tableau non-vide.\n");
  }
  for (var i = 0; i < planets.length; ++i) {
    if (planets[i] === undefined || planets[i] === null || ! (planets[i] instanceof Planet)) {
      throw new Error("planets doit être un tableau de Planet sans élément indéfinie ou null.\n");
    }
  }
  for (var i = 0; i < planets.length; ++i) {
    if (players[i] === undefined || players[i] === null || ! (players[i] instanceof Player)) {
      throw new Error("players doit être un tableau de Player sans élément indéfinie ou null.\n");
    }
  }
  
  this.players = players;
  this.planets = planets;
  
  this.current_player_index = 0;
  
  this.playTurn = function() {
    this.players[this.current_player_index].playTurn();
    this.players = players.filter(Player.hasLost);
    
    ++current_player_index;
    if (current_player_index == players.length) {
      current_player_index = 0;
    }
  }
  
  this.isFinish = function() {
    return players.length == 1;
  }
}

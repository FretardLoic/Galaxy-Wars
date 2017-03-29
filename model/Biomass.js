
function Biomass(amount, x, y, faction) {
    if (amount == undefined || x == undefined || y == undefined
        || amount == null || x == null || y == null) {
        console.log("Le constructeur de Planet prend 3 arguments.\n");
    } else if (isNaN(amount) || amount < 0) {
        console.log("L'argument amount doit être un nombre positif.\n");
    } else if (isNaN(x) || x < 0) {
        console.log("L'argument x doit être un nombre positif.\n");
    } else if (isNaN(y) || y < 0) {
        console.log("L'argument y doit être un nombre positif.\n");
    } else if (faction !== undefined && faction !== null && !(faction instanceof Player)) {
        console.log("L'argument faction doit être de type Player.\n");
    } else {
      this.amount = parseInt(amount);
      this.faction = faction;
      this.x = parseInt(x);
      this.y = parseInt(y);
      
      this.playTurn;
      this.draw;
      
      this.getAmount = function() {
        return amount;
      }
      
      this.getFaction = function() {
        return faction;
      }
      
      this.getX = function() {
        return x;
      }
      
      this.getY = function() {
        return y;
      }
      
      return this;
    }
    throw new Error("Biomass constructor: wrong arguments\n");
}

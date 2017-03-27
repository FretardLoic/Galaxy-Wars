
function Biomass(amount, faction, x, y) {
    if (amount == undefined || faction == undefined || x == undefined || y == undefined) {
        console.log("Le constructeur de Planet prend 4 arguments\n");
    } else if (isNaN(amount) || amount < 0) {
        console.log("L'argument amount doit être un nombre positif\n");
    } else if (isNaN(x) || x < 0) {
        console.log("L'argument x doit être un nombre positif\n");
    } else if (isNaN(y) || y < 0) {
        console.log("L'argument y doit être un nombre positif\n");
    } else if (faction == null && !(faction instanceof Player)) {
        console.log("L'argument faction doit être de type Player");
    } else {
        this.amount = parseInt(amount);
        this.faction = faction;
        this.x = parseInt(x);
        this.y = parseInt(y);
        
        this.playTurn;
        
        this.getAmount = function() {
          return amount;
        }
        
        this.getFaction = function() {
          return faction;
        }
        
        this.getX() {
          return x;
        }
        
        this.getY() {
          return y;
        }
        
        return this;
    }
    throw new Error("Biomass constructor: wrong arguments");
}

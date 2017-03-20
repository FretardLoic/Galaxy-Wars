Planet.GROWTH_MAX = 10;

function Planet(population, growth, owner) {
    if (population == undefined || growth == undefined) {
        console.log("Le constructeur de Planet prend au moins 2 arguments\n");
    } else if (isNaN(population) || population < 0) {
        console.log("L'argument population doit être un nombre positif\n");
    } else if (isNaN(growth) || growth <= 0 || Planet.GROWTH_MAX < growth) {
        console.log("L'argument growth doit être un nombre strictement"
        + " positif entre 1 et 10\n");
    } else if (owner != undefined && !(owner instanceof Player)) {
        console.log("L'argument owner doit être de type Player");
    } else {
        this.population = Number(population);
        this.growth = Number(growth);
        this.owner = owner == undefined ? null : owner;
        
        this.grow = function() {
            if (this.owner != null) {
                this.population += this.growth;
            }
        }
        
        this.defend = function(player) {
            //TODO
            return;
        }
        
        return this;
    }
    throw new Error("Planet constructor: wrong arguments");
}


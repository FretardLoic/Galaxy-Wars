function Player(name) {
    if (name == undefined || !(name instanceof string)) {
        console.log("Le nom du Player doit être passé au constructeur\n");
    }
}

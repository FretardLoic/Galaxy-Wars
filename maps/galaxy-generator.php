<?php
    session_start();
    
    $playername = $_POST["playername"];
    $players = ["new Player(\"$playername\")", "new Player(\"IA\")"];
    $planets = ["new Planet(1, 10, 20, 20)",
                "new Planet(2, 20, 30, 30, players[0])",
                "new Planet(3, 30, 40, 40, players[1])"];
    
    ob_start();
?>
    
    var players = [<?php echo join(", ", $players); ?>];
    var planets = [<?php echo join(", ", $planets); ?>];
    var galaxy = new Galaxy(planets, players);
    
<?php
    $_SESSION["new-galaxy"] = ob_get_clean();
    
    header("Location : ../index.php");
?>

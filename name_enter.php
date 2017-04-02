<!DOCTYPE html>
<html>
<head>
	<title>GalaxWar</title>
	<meta charset="utf-8" />
	<meta name="generator" content="Geany 1.27" />
  <link rel="stylesheet" href="style1.css"/>
</head>

<body>
  <form method="POST" action=
      <?php 
        echo '"main.php?playersNb='.$_GET["playersNb"].'&aiNb='.$_GET["aiNb"].'&planetsNb='.$_GET["planetsNb"].'"'; 
      ?>
    >
    <p>
      <?php
        for ($i = 1; $i < $_GET["playersNb"] + 1; ++$i) {
          echo "joueur".$i." :<input type=\"text\" name=\"player".$i."\" value=\"Joueur".$i."\" /><br />";
        }
      ?>
      
      <input type="submit" value="valider" />
    </p>
  </form>
      
</body>

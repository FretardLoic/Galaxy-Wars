<!DOCTYPE html>
<html>

<head>
	<title>sans titre</title>
	<meta charset="utf-8" />
	<meta name="generator" content="Geany 1.27" />
	<style>#zone{border:1px solid red;}</style>
</head>

<body id="demo">
  <button onclick="nextTurn()">Try it</button> <br/>
  <canvas id="zone" width="1000" height="800"></canvas>
</body>
<?php
    $title = "test";
    $css = "";
    $jsInit = "<script src=\"model/Biomass.js\" ></script>";
    $jsInit .= "<script src=\"model/Player.js\" ></script>";
    $jsInit .= "<script src=\"model/Fleet.js\" ></script>";
    $jsInit .= "<script src=\"model/Planet.js\" ></script>";
    $jsInit .= "<script src=\"model/Galaxy.js\" ></script>";
    //~ $jsBody = "var a = new Planet(3, 100, 20, 30, new Player(new String(\"mi\")));\n"
        //~ . "var c = new Planet(3, 150, 20, 30, new Player(new String(\"mi\")));\n"
        //~ . "var b = new Player(new String(\"mi\"));\n"
        //~ //. "alert(\"type:\" + (a instanceof Biomass) + \" pop:\" + a.amount + \" growth:\" + a.growth + \"\\n\");\n"
        //~ . "b.addBiomass(new Planet(3, 100, 20, 30, b));\n"
        //~ . "b.addBiomass(new Planet(5, 20, 20, 30, b));\n"
        //~ . "b.addBiomass(new Planet(9, 10, 20, 30, b));\n"
        //~ . "b.addBiomass(c);\n"
        //~ . "b.addBiomass(a);\n"
        //~ . "b.removeBiomass(c);\n"
        //~ . "function print(a) {
          //~ document.getElementById(\"demo\").innerHTML += a.amount + \"<br\>\";
          //~ }\n"
        //~ . "b.endTurn();\n"
        //~ . "b.biomass.forEach(print);\n";
    ob_start();
?>

<?php
    $content = ob_get_clean();
    include "layout.php";
?>

<script>
  
  
  var a = new Player(new String("mi"), "blue");
  var b = new Player(new String("mi"), "green");
  var c = new Planet(5, 150, 50, 50, a);
  var d = new Planet(10, 100, 500, 500, a);
  var e = new Planet(0, 100, 200, 300, b);
  var f = new Planet(3, 100, 600, 200, b);
  
  a.addBiomass(c);
  a.addBiomass(d);
  b.addBiomass(e);
  b.addBiomass(f);
  
  var maZone = document.getElementById("zone");
  var g = new Galaxy([c, d, e, f, new Planet(5, 100, 600, 600), new Planet(5, 100, 700, 600, null)], 
    [a, b], maZone);
  
  var evtPlanet;
  
  function firstClick(evt) {
    alert("Premier click: Tu as cliqué en " + evt.clientX + "," + evt.clientY);
    console.log(maZone);
    var i = 0;
    while (i < g.planets.length) {
      if (g.planets[i].isOn(evt.clientX, evt.clientY)) {
        evtPlanet = g.planets[i];
        maZone.removeEventListener("click", firstClick);
        maZone.addEventListener("click", secondClick);
        break;
      }
      ++i;
    }
    alert("fin");
  }
  function secondClick(evt) {
    alert("Second click: Tu as cliqué en " + evt.clientX + "," + evt.clientY);
    var i = 0;
    while (i < g.planets.length) {
      if (g.planets[i].isOn(evt.clientX, evt.clientY)) {
        alert("Planete trouvé");
        evtPlanet.launch(50, g.planets[i]);
        break;
      }
      ++i;
    }
    maZone.removeEventListener("click", secondClick);
    maZone.addEventListener("click", firstClick);
    alert("fin");
  }
  maZone.addEventListener("click", firstClick);
  //c.launch(120, e);
  function nextTurn() {
    g.nextTurn();
    g.draw();
  }
</script>



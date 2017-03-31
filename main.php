<!DOCTYPE html>
<html>
<head>
	<title>sans titre</title>
	<meta charset="utf-8" />
	<meta name="generator" content="Geany 1.27" />
  <link rel="stylesheet" href="style1.css"/>
</head>

<body>
  <p id="joueur"></p>
  <button onclick="nextTurn()">fin du tour</button> <br/>
  <canvas id="zone" width="800" height="600"></canvas>
  <p id="info"></p>
</body>

<script src="model/Biomass.js" ></script>
<script src="model/Player.js" ></script>
<script src="model/Fleet.js" ></script>
<script src="model/Planet.js" ></script>
<script src="model/Galaxy.js" ></script>

<script>
  
  
  var img = [];
  for (var i = 0; i < 11; ++i) {
    img.push(new Image());
    img[i].src = "img/p" + (i + 1) + ".png";
  }
  
  
  var imgb = new Image();
  imgb.addEventListener('load', function() {
    g.draw();
  }, false);
  imgb.src = "img/galaxy.jpg";
  
  var j1 = new Player(new String("mi"), "blue");
  var j2 = new Player(new String("mi2"), "green");
  var j3 = new IAPlayer(new String("mi3"), "brown");
  
  var a = new Planet("azer1", 5, 150, 50, 50, img[0], j1);
  var b = new Planet("azer2", 10, 100, 500, 400, img[1], j1);
  var c = new Planet("azer3", 1, 100, 200, 300, img[2], j2);
  var d = new Planet("azer4", 3, 100, 600, 200, img[3], j2);
  var e = new Planet("azer5", 2, 130, 600, 375, img[4], j3);
  var f = new Planet("azer6", 3, 100, 500, 500, img[5], j3);
  
  j1.addBiomass(a);
  j1.addBiomass(b);
  j2.addBiomass(c);
  j2.addBiomass(d);
  j3.addBiomass(e);
  j3.addBiomass(f);
  
  var maZone = document.getElementById("zone");
  var info = document.getElementById("info");
  var ctx = maZone.getContext("2d")
  ctx.textAlign = "center";
  ctx.font = "bold 1em Arial";
  
  var g = new Galaxy([new Planet("azer7", 5, 100, 600, 100, img[6]), 
    new Planet("azer8", 5, 100, 700, 400, img[7]),
    new Planet("azer9", 5, 100, 600, 300, img[8]),
    new Planet("azer10", 5, 100, 500, 200, img[9]),
    new Planet("azer11", 5, 100, 400, 100, img[10])], 
    [j1, j2, j3], ctx, function() {alert(this.players[0].name)}, imgb);
  document.getElementById("joueur").innerHTML = g.getCurrentPlayer().name;
  
  
  
  function findPos(obj){
    var curleft = 0;
    var curtop = 0;
    if (obj.offsetParent) {
        curleft = obj.offsetLeft
        curtop = obj.offsetTop
        while (obj = obj.offsetParent) {
            curleft += obj.offsetLeft
            curtop += obj.offsetTop
        }
    }
    return [curleft,curtop];
  }
  
  
  function firstClick(evt) {
    var zonePos = findPos(maZone);
    var tab = g.getCurrentPlayer().biomass;
    var i = 0;
    while (i < tab.length) {
      if (tab[i] instanceof Planet && tab[i].isOn(evt.clientX - zonePos[0], evt.clientY - zonePos[1])) {
        function secondClick(evt) {
          var j = 0;
          while (j < g.planets.length) {
            if (g.planets[j].isOn(evt.clientX - zonePos[0], evt.clientY- zonePos[1])) {
              function promptRec(str) {
                var rep = prompt(str + "Quel est le nombre de vaisseau que vous souhaitez envoyer.");
                if (rep === null) {
                  return;
                }
                if (isNaN(rep)) {
                  promptRec(rep + " ne peut pas représenter la puissance d'une flotte.\n");
                }else if (rep >= tab[i].amount) {
                  promptRec(tab[i].name + " ne peut pas lancer une flotte aussi grande.\n");
                }else {
                  tab[i].launch(parseInt(rep), g.planets[j]);
                }
              }
              promptRec("");
              break;
            }
            ++j;
          }
          maZone.removeEventListener("click", secondClick);
          maZone.addEventListener("click", firstClick);
        }
        
        maZone.removeEventListener("click", firstClick);
        maZone.addEventListener("click", secondClick);
        break;
      }
      ++i;
    }
  }
  
  maZone.addEventListener("click", firstClick);
  
  var eventBufferMaxSize = 20;
  var eventBuffer = [];
  
  function newInfo(str) {
    eventBuffer.unshift(str);
    if (eventBuffer.length > eventBufferMaxSize) {
      eventBuffer.pop();
    }
    document.getElementById("info").innerHTML = "";
    
    eventBuffer.forEach(function(str) {
      document.getElementById("info").innerHTML += str;
    });
  }
  
  document.addEventListener(Planet.CHANGE_FACTION_EVENT, function(evt) {
    if (evt.detail.faction === null || evt.detail.faction === undefined) {
      newInfo(evt.detail.name + " est devenue neutre. <br/>");
    } else {
      newInfo(evt.detail.name + " a été prise par " + evt.detail.faction.name + ".<br/>");
    }
  });
  
  document.addEventListener(Planet.LAUNCHING_EVENT, function(evt) {
    var str = evt.detail.launcher.faction.name + " a lancé ";
    if (evt.detail.fleet.amount == 1) {
      str += "un vaisseau";
    } else {
      str += "une flotte de " + evt.detail.fleet.amount + " vaisseaux";
    }
    if (evt.detail.fleet.faction === evt.detail.fleet.destination.faction) {
      str += " pour soutenir " + evt.detail.fleet.destination.name + ".<br/>";
    } else {
      str += " pour soumettre " + evt.detail.fleet.destination.name + " qui appartient a ";
      if (evt.detail.fleet.destination.faction === null || evt.detail.fleet.destination.faction === undefined) {
        str += " personne.<br/>";
      }else {
        str += evt.detail.fleet.destination.faction.name + ".<br/>";
      }
    }
    evt.detail.launcher.draw();
    newInfo(str);
  });
  
  function nextTurn() {
    g.nextTurn();
    g.draw();
    document.getElementById("joueur").innerHTML = g.getCurrentPlayer().name;
  }
  
  
</script>


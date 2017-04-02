<!DOCTYPE html>
<html>
<head>
	<title>GalaxWar</title>
	<meta charset="utf-8" />
	<meta name="generator" content="Geany 1.27" />
  <link rel="stylesheet" href="style1.css"/>
  <script src="model/Biomass.js" ></script>
  <script src="model/Player.js" ></script>
  <script src="model/Fleet.js" ></script>
  <script src="model/Planet.js" ></script>
  <script src="model/Galaxy.js" ></script>
  <script src="http://code.jquery.com/jquery-3.1.1.min.js"></script>
</head>

<body>
  <canvas id="zone" width="1200" height="800"></canvas>
  <div id="menu" >
      <p id="joueur-label" >Joueur: <span id="joueur"></span></p>
      <button id="end-turn" onclick="nextTurn()">fin du tour</button> <br/>
      <p id="info"></p>
  </div>
  
  <script>
    
    var maZone = document.getElementById("zone");
    var info = document.getElementById("info");
    var ctx = maZone.getContext("2d")
    ctx.textAlign = "center";
    ctx.font = "bold 1em Arial";
    
    
    var img = new Image();
    
    var players = [
      <?php
        for ($i = 1; $i < $_GET["playersNb"]; ++$i) {
          echo '"'.$_POST["player".$i].'",';
        }
        echo '"'.$_POST["player".$_GET["playersNb"]].'"';
      ?>];
    
    var g = Galaxy.generator(players, <?php echo $_GET["aiNb"]; ?>, <?php echo $_GET["planetsNb"]; ?>, ctx, function() {
      alert(this.players[0].name + " win!!!");
      window.location.replace("index.php");}, img);
    
    img.addEventListener('load', function() {
      g.draw();
    }, false);
    
    img.src = "img/starry_sky.jpg";
    
    
    document.getElementById("joueur").innerHTML = g.getCurrentPlayer().name;
    $("#joueur").css("color", g.getCurrentPlayer().color);
    
    
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
            document.removeEventListener("click", secondClick);
            document.addEventListener("click", firstClick);
          }
          
          document.removeEventListener("click", firstClick);
          document.addEventListener("click", secondClick);
          break;
        }
        ++i;
      }
    }
    
    document.addEventListener("click", firstClick);
    
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
      g.players.forEach(function(p) {
        $("." + p.name).css("color", p.color);
      });
      
      g.planets.forEach(function(p) {
        if (p.faction !== null && p.faction !== undefined) {
          $("." + p.name).css("color", p.faction.color);
        }else {
          $("." + p.name).css("color", Planet.NEUTRAL_COLOR);
        }
      });
    }
    
    document.addEventListener(Planet.CHANGE_FACTION_EVENT, function(evt) {
      if (evt.detail.faction === null || evt.detail.faction === undefined) {
        newInfo("<planet class='" + evt.detail.name + "'>" + evt.detail.name + "</planet> est devenue neutre. <br/>");
      } else {
        newInfo("<planet class='" + evt.detail.name + "'>" + evt.detail.name + "</planet> a été prise par <player class='" 
        + evt.detail.faction.name + "'>" + evt.detail.faction.name + "</player>.<br/>");
      }
    });
    
    document.addEventListener(Planet.LAUNCHING_EVENT, function(evt) {
      var str = "<player class='" + evt.detail.launcher.faction.name + "'>" + evt.detail.launcher.faction.name 
        + "</player> a lancé depuis <planet class='" + evt.detail.launcher.name + "'>"
        + evt.detail.launcher.name + "</planet> ";
      if (evt.detail.fleet.amount == 1) {
        str += "un vaisseau";
      } else {
        str += "une flotte de <number>" + evt.detail.fleet.amount + "</number> vaisseaux";
      }
      if (evt.detail.fleet.faction === evt.detail.fleet.destination.faction) {
        str += " pour soutenir <planet class='" + evt.detail.fleet.destination.name + "'>" 
        + evt.detail.fleet.destination.name + "</planet>.<br/>";
      } else {
        str += " pour soumettre <planet class='" + evt.detail.fleet.destination.name + "'>" 
        + evt.detail.fleet.destination.name + "</planet> qui appartient a ";
        if (evt.detail.fleet.destination.faction === null || evt.detail.fleet.destination.faction === undefined) {
          str += " personne.<br/>";
        }else {
          str += "<player class='" + evt.detail.fleet.destination.faction.name + "'>" 
          + evt.detail.fleet.destination.faction.name + "</player>.<br/>";
        }
      }
      evt.detail.launcher.draw();
      evt.detail.fleet.draw();
      newInfo(str);
    });
    
    function nextTurn() {
      g.nextTurn();
      g.draw();
      
      document.getElementById("joueur").innerHTML = g.getCurrentPlayer().name;
      $("#joueur").css("color", g.getCurrentPlayer().color);
    }
    
  </script>
</body>




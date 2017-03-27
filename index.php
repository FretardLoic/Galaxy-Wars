<?php
    $title = "test";
    $css = "";
    $jsInit = "<script src=\"model/Biomass.js\" ></script>";
    $jsInit .= "<script src=\"model/Player.js\" ></script>";
    $jsInit .= "<script src=\"model/Fleet.js\" ></script>";
    $jsInit .= "<script src=\"model/Planet.js\" ></script>";
    $jsBody = "var a = new Planet(3, 100, 20, 30, new Player(new String(\"mi\")));\n"
        . "var b = new Player(new String(\"mi\"));\n"
        . "alert(\"type:\" + (a instanceof Biomass) + \" pop:\" + a.amount + \" growth:\" + a.growth + \"\\n\");\n"
        . "alert(b.biomass.length);\n"
        . "b.addBiomass(a);\n"
        . "alert(b.biomass.length);\n"
        . "b.addBiomass(a);\n"
        . "alert(b.biomass.length);\n"
        . "b.removeBiomass(a);\n"
        . "alert(b.biomass.length);\n";
    ob_start();
?>

<?php
    $content = ob_get_clean();
    include "layout.php";
?>

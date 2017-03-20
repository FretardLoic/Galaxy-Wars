<?php
    $title = "test";
    $css = "";
    $jsInit = "<script src=\"model/Player.js\" ></script>";
    $jsInit .= "<script src=\"model/Planet.js\" ></script>";
    $jsBody = "var a = new Planet(100, 3);\n"
        . "alert(\"type:\" + a.constructor.name + \" pop:\" + a.population + \" growth:\" + a.growth + \"\\n\");\n";
    ob_start();
?>

<?php
    $content = ob_get_clean();
    include "layout.php";
?>

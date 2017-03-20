<?php
    $title = "test";
    $css = "";
    $jsInit = file_get_contents("model.php");
    $jsInit .= "var a = new Planet(100, 3);\n"
        . "alert(\"type:\" + a.constructor.name + \" pop:\" + a.population + \" growth:\" + a.growth + \"\\n\");\n";
    ob_start();
?>

<?php
    $content = ob_get_clean();
    include "layout.php";
?>

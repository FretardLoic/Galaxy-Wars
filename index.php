<?php
    $title = "test";
    ob_start();
?>
    
<?php
    $content = ob_get_clean();
    include "layout.php";
?>

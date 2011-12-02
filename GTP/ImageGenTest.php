<?php
    
    require_once 'generateImage.php';
    
    $myImage = new GenerateImage();
    $myImage->createFromFile( "data/rt-polarity.neg" );
    
?>
<?php
    
    require_once 'generateImage.php';
    
    $myImage = new GenerateImage();
    $myImage->createFromFile( "rt-polaritydata/rt-polaritydata/rt-polarity.neg" );
    
?>
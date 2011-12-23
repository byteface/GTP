<?php
    
    require_once 'generateTokenisedImage.php';
    
    $myImage = new GenerateTokenisedImage();
    $myImage->addToIndex( "data/rt-polarity.pos", "pos" );
    $myImage->addToIndex( "data/rt-polarity.neg", "neg" );
    $myImage->createFromIndex();
    
?>
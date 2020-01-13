<?php
       require_once 'opinion.php';
       
       $opinion = new Opinion();
       $opinion->addToIndex( "rt-polaritydata/rt-polaritydata/rt-polarity.neg", 'neg' );
       $opinion->addToIndex( "rt-polaritydata/rt-polaritydata/rt-polarity.pos", 'pos' );
    
    
        //$opinion->addToIndex( "TEST_DATA/rt-polaritydata/rt-polarity.neg", 'neg' );
        //$opinion->addToIndex( "TEST_DATA/rt-polaritydata/rt-polarity.pos", 'pos' );	           
    

       $myString = "wonderful marvelous great good";
       
      // $myString = "I thought it was really good, awesome amazing great";
       
       echo( $opinion->classify($myString) );
?>
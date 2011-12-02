<?php
class GenerateImage {


        // need entire base64 mapping
        private $map = array(   'a' => 1,
                                'b' => 2,
                                'c' => 3,
                                'd' => 4,
                                'e' => 5,
                                'f' => 6,
                                'g' => 7,
                                'h' => 8,
                                'i' => 9,
                                'j' => 10,
                                'k' => 11,
                                'l' => 12,
                                'm' => 13,
                                'n' => 14,
                                'o' => 15,
                                'p' => 16,
                                'q' => 17,
                                'r' => 18,
                                's' => 19,
                                't' => 20,
                                'u' => 21,
                                'v' => 22,
                                'w' => 23,
                                'x' => 24,
                                'y' => 25,
                                'z' => 26,
                                'A' => 27,
                                'B' => 28,
                                'C' => 29,
                                'D' => 30,
                                'E' => 31,
                                'F' => 32,
                                'G' => 33,
                                'H' => 34,
                                'I' => 35,
                                'J' => 36,
                                'K' => 37,
                                'L' => 38,
                                'M' => 39,
                                'N' => 40,
                                'O' => 41,
                                'P' => 42,
                                'Q' => 43,
                                'R' => 44,
                                'S' => 45,
                                'T' => 46,
                                'U' => 47,
                                'V' => 48,
                                'W' => 49,
                                'X' => 50,
                                'Y' => 51,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
                                'Z' => 52,
                                '1' => 53,
                                '2' => 54,
                                '3' => 55,
                                '4' => 56,
                                '5' => 57,
                                '6' => 58,
                                '7' => 59,
                                '8' => 60,
                                '9' => 61,
                                '0' => 62,
                                ',' => 63,
                                '.' => 64,                                                                                                                                                                                                                                                                                                                                                                                                
                                '\'' => 65,
                                '\"' => 66,
                                '-' => 67,
                                '[' => 68,
                                ']' => 69,
                                '?' => 70,
                                '!' => 71,
                                ';' => 72,
                                ':' => 73,
                                '(' => 74,
                                ')' => 75,
                                '*' => 76,                                                                                                
                                ' ' => 255                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                 );
// TODO - note im using 244 for failure to recognise char in colorise method



        public function createFromFile( $file ) {
        
            $contents = file_get_contents( $file, 'r' ); // get content as string
            $contentsLength = mb_strlen($contents); // check length
            $squared = ceil( sqrt( $contentsLength ) ); // round up the square root
            
//            error_log( $squared ); 
            
            
            // TODO - need to get lines too so can add extra pixels as line seperators
            
            $gd = imagecreatetruecolor( $squared, $squared );
            
            $xPos = 0;
            $yPos = 0;            
            
            for($charCount = 0; $charCount < $contentsLength; $charCount++)
            {
                $char = mb_substr($contents, $charCount, 1);
                
                
                $getCol = $this->colorise( $char );
                $col = imagecolorallocate( $gd, $getCol, 0, 0 ); // were doing letters.. however if we did words it would be good to use G/B as pos/neg
                
                imagesetpixel( $gd, $xPos, $yPos, $col );
                
                $xPos++;
                
                if($xPos>$squared){
                    $xPos=0;
                    $yPos+=1;
                }

                //error_log( $char );
            }
            
            header('Content-Type: image/png');
            imagepng($gd);    
        }


        public function colorise( $character )
        {
        

                //error_log( $this->$test['a'] );
            
            
            $col = 244;
            
            if( isset($this->map[$character]) )
            {
                $col = $this->map[$character];
            }
            else
            {
            // TODO - some of these aren't showing... question mark seems to throw although i have it
               // error_log( $character );
            }
            
          //  error_log( $col );
            
          //  foreach($this->map as $color)
//            {
            
  //              error_log( $color );
    //        }
            
            
    //            if( $color ==  )
            
//                $char = mb_substr($contents, $charCount, 1);
                

  //              error_log( $char );
        //    }
        
        
            return $col;//floor( rand(0,255) );//$color;
        }

        
        
        
        
        
        
        
        /*
        
        THIS ALONE GENERATE BITMAPS
        
        
        $x = 200;
$y = 200;

$gd = imagecreatetruecolor($x, $y);
 
$corners[0] = array('x' => 100, 'y' =>  10);
$corners[1] = array('x' =>  0, 'y' => 190);
$corners[2] = array('x' => 200, 'y' => 190);

$red = imagecolorallocate($gd, 255, 0, 0); 

for ($i = 0; $i < 100000; $i++) {

  imagesetpixel($gd, round($x),round($y), $red);
  
  $a = rand(0, 2);
  $x = ($x + $corners[$a]['x']) / 2;
  $y = ($y + $corners[$a]['y']) / 2;
}
 
header('Content-Type: image/png');
imagepng($gd);
        
        
        
        */
        
        
        
        
        
        
}
?>
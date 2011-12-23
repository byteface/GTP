<?php
class GenerateTokenisedImage {

        private $index = array();
        private $classes = array('pos', 'neg');
        private $classTokCounts = array('pos' => 0, 'neg' => 0);
        private $tokCount = 0;
        private $classDocCounts = array('pos' => 0, 'neg' => 0);
        private $docCount = 0;
        private $prior = array('pos' => 0.5, 'neg' => 0.5);

        public function addToIndex($file, $class, $limit = 0) {
                $fh = fopen($file, 'r');
                $i = 0;
                if(!in_array($class, $this->classes)) {
                        echo "Invalid class specified\n";
                        return;
                }
                while($line = fgets($fh)) {
                        if($limit > 0 && $i > $limit) {
                                break;
                        }
                        $i++;
                        
                        $this->docCount++;
                        $this->classDocCounts[$class]++;
                        $tokens = $this->tokenise($line);
                        
                        foreach($tokens as $token) {
                        
//                        error_log( $token );
                        
                                if(!isset($this->index[$token][$class])) {
                                        $this->index[$token][$class] = 0;
                                        
                                        
                                       
                                        
                                }
                                
                                $type="type";
                                if(!isset($this->index[$token][$type])) {
                                     $this->index[$token][$type] = $token;//[$class] = 0;
                                     }
                                
                                
                                
                                
                                
                                $this->index[$token][$class]++;
                                $this->classTokCounts[$class]++;
                                $this->tokCount++;
                        }
                }
                fclose($fh);
                
                
                
              //  createFromFile( $index );
        }
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        // TODO - this func will be the js on that we want to do on webgl
        public function classify($document) {
        
                $this->prior['pos'] = $this->classDocCounts['pos'] / $this->docCount;
                $this->prior['neg'] = $this->classDocCounts['neg'] / $this->docCount; 
                $tokens = $this->tokenise($document);
                $classScores = array();


                foreach($this->classes as $class) {
                        $classScores[$class] = 1;
                        foreach($tokens as $token) {
                                $count = isset($this->index[$token][$class]) ? 
                                        $this->index[$token][$class] : 0;


                                $classScores[$class] *= ($count + 1) / 
                                        ($this->classTokCounts[$class] + $this->tokCount);
                        }
                        $classScores[$class] = $this->prior[$class] * $classScores[$class];
                }
                
                arsort($classScores);
                return key($classScores);
        }

        private function tokenise($document) {
                $document = strtolower($document);
                preg_match_all('/\w+/', $document, $matches);
                return $matches[0];
        }






// ------->>>


        public function implode_r ($glue, $pieces){
         $out = "";
         foreach ($pieces as $piece)
          if (is_array ($piece)) $out .= $this->implode_r ($glue, $piece); // recurse
          else                   $out .= $glue.$piece;
          
         return $out;
         }



        public function createFromIndex() {

            $comma_separated = $this->implode_r(",", $this->index);
//            error_log( $comma_separated ); // lastname,email,phone
            
            
            
            
  error_log( $this->implode_r(",", $this->index) );
            
            
            
        
            $contents = $comma_separated;//implode( $file );//file_get_contents( $file, 'r' ); // get content as string
            $contentsLength = mb_strlen($contents); // check length
            $squared = ceil( sqrt( $contentsLength/3 ) ); // round up the square root

            error_log( "SQUARED" );             
            error_log( $squared ); 
            
            
            // TODO - need to get lines too so can add extra pixels as line seperators... implement fget
            
            $gd = imagecreatetruecolor( $squared, $squared );
            
            $xPos = 0;
            $yPos = 0;            
            
            for($charCount = 0; $charCount < $contentsLength; $charCount+=3 )
            {
                $char = mb_substr($contents, $charCount, 1);
                $char2 = mb_substr($contents, $charCount+1, 1);
                $char3 = mb_substr($contents, $charCount+2, 1);
                
                $col = imagecolorallocate( $gd, $this->colorise( $char ), $this->colorise( $char2 ), $this->colorise( $char3 ) );
                
                imagesetpixel( $gd, $xPos, $yPos, $col );
                
                $xPos++;
                
                if($xPos>$squared){
                    $xPos=0;
                    $yPos+=1;
                }

                //error_log( $char );
            }
            
            header('Content-Type: image/png');  // TODO - check API for gif not PNG
            imagepng($gd); // TODO - check API for gif not PNG... test so far not working when uwrap
        }


        public function colorise( $character )
        {
            $col = 244; // if a character is unrecognised it will become space for now
            
            if( isset($this->map[$character]) ){
                $col = $this->map[$character];
            }else{
                // TODO - some of these aren't showing... question mark seems to throw although i have it
                // error_log( $character );
            }
            
            return $col;
        }
 
 
 
 
        /*

        characters you want to encode / remember you will need to unwrap these so your unwrap array must derive from this
        
        */
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
                                '<' => 77,
                                '>' => 78,
                                '/' => 79,
                                '\\' => 80,
                                '@' => 81,
                                '£' => 82,
                                '$' => 83,
                                '%' => 84,
                                '&' => 85,
                                '-' => 86,
                                '+' => 87,
                                '_' => 88,
                                '|' => 89,
                                '{' => 90,
                                '}' => 91,
                                ' ' => 255                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                 );
// TODO - note im using 244 for failure to recognise char in colorise method
 
 
 
        
}
?>
<?php

    $file = $_POST['file'];

    $map = array(   'a' => 1,
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





writeJSON();

function writeJSON()
{

    $data = search( "www.cheese.com" );
    

    
    $image = createFromFile(    utf8_encode( $data ) );
    //$image = createFromFile("data/rt-polarity.neg");

    

    $return['data'] = $image;
    
    
    error_log( $return['data'] );
    
    echo json_encode($return);
}


function search($s) {
	
	$url = $s;
	$ch = curl_init($url);
	curl_setopt($ch, CURLOPT_HTTPGET, TRUE);
	curl_setopt($ch, CURLOPT_POST, FALSE);
	curl_setopt($ch, CURLOPT_HEADER, false);   // Include head as needed
	curl_setopt($ch, CURLOPT_NOBODY, FALSE);        // Return body
	curl_setopt($ch, CURLOPT_VERBOSE, FALSE);           // Minimize logs
	curl_setopt($ch, CURLOPT_REFERER, "");            // Referer value
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);    // No certificate
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);     // Follow redirects
	curl_setopt($ch, CURLOPT_MAXREDIRS, 4);             // Limit redirections to four
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);     // Return in string
//	curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows; U; Windows NT 6.1; he; rv:1.9.2.8) Gecko/20100722 Firefox/3.6.8");   // Webbot name
	
	$page = curl_exec($ch);
	
	
	error_log( $page );
	
	
	return $page;
	
}







        function createFromFile( $file ) {
        
            $contents = $file;//file_get_contents( $file, 'r' ); // get content as string
            $contentsLength = mb_strlen($contents); // check length
            $squared = ceil( sqrt( $contentsLength/3 ) ); // round up the square root
            
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
                
                $col = imagecolorallocate( $gd, colorise( $char ), colorise( $char2 ), colorise( $char3 ) );
                
                imagesetpixel( $gd, $xPos, $yPos, $col );
                
                $xPos++;
                
                if($xPos>$squared){
                    $xPos=0;
                    $yPos+=1;
                }

                //error_log( $char );
            }
            
            
            
            
//            $img = base64_encode( imagepng($gd) );
            
          //  error_log( $gd );
            
//            header('Content-Type: image/png');  // TODO - check API for gif not PNG
            return imagepng($gd); // TODO - check API for gif not PNG
        }    
    




    
        function colorise( $character )
        {
            $col = 244;// ceil( rnd(0, 244) ); // if a character is unrecognised it will become space for now
            
            if( isset($map[$character]) ){
                $col = $map[$character];
            }else{
                // TODO - some of these aren't showing... question mark seems to throw although i have it
                // error_log( $character );
            }
            
            return $col;
        }




?>



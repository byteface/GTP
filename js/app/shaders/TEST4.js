// ONLY GOOD FOR 3 CHARACTER SEARCHES

// searches forward and backwards getting adjacent pixels. leaves visible the matches



// UPDATE --->


// i have 2 bodies of code in here.. one became other.. but this running one is whole word find.!!!! awesome. it may have wrinkles but it appears to be working

function TEST4( query ){
    
        var letters = query.split("");
        var lettersLen = letters.length;
    

        var one = "\
        precision mediump float;\
        varying vec2 vTextureCoord;\
        uniform sampler2D uSampler;\
        bool hasLetter(float letter, float range, int channel) {\
            vec3 rgb = texture2D( uSampler, vTextureCoord + vec2(range/512.0, 0.0) ).rgb;\
            bool has = false;\
            if(channel==1) has = (rgb.r==(letter/255.));\
            if(channel==2) has = (rgb.g==(letter/255.));\
            if(channel==3) has = (rgb.b==(letter/255.));\
            return has;\
        }\
        void main() {\
            vec4 col = texture2D( uSampler, vec2( vTextureCoord.s, vTextureCoord.t ));\
            int match=0;\
            const float pixelRange=float("+Math.ceil(lettersLen/3)+');\
            ';
            
            
        var str="\ ";
            







        // search back the whole term starting on furthest pixel and channel
        
        
       // var pixrange = Math.ceil(lettersLen/3); 
        
  
  
//        str+="for( j=pixelRange; j>0; j-- ){\ ";        

        str+="for(float j=pixelRange; j>0.0; j--) {\ ";
//        str+="while(pixelRange>0){\ ";
        //while(pixrange>0){
        
//        str+="\
//        pixelRange--;\ ";
        
            var chan=4; // move channel backwards
            //var pixel= pixrange;//0.0;
            
            for( var i=1; i<lettersLen+1; i++ ){
                chan-=1;
                if(chan==0){
                    chan=3;
                    pixel-=1; // move back a pixel every 3 bits
                }    
                
                str += 'if( hasLetter( float('+GTP.encodeMap[letters[lettersLen-i]]+'), float(j), int('+chan+') )){\ ';
            }
            
            if(lettersLen>0){
                str += "\
                match=1;\ ";
                
                for( var i=0; i<lettersLen; i++ ){
                    str += '\
                    }\
                    ';
                }
                
            }
        
        
                    str += '\
                    }\
                    ';
                            //}
        
        
        
                str += "\
                if(match==0){\ ";        
        


        var pixrange = Math.ceil(lettersLen/3); 
        
        while(pixrange>0){
        
            pixrange--;
        
            var inc=0.0; // move letters backwards
            var chan=3; // move channel backwards
            var pixel= pixrange;//0.0;
            
            for( var i=1; i<lettersLen+1; i++ ){
                chan-=1;
                if(chan==0){
                    chan=3;
                    pixel-=1; // move back a pixel every 3 bits
                }    
                
                str += 'if( hasLetter( float('+GTP.encodeMap[letters[lettersLen-i]]+'), '+pixel.toFixed(1)+', int('+chan+') )){\ ';
            }
            
            if(lettersLen>0){
                str += "\
                match=1;\ ";
                
                for( var i=0; i<lettersLen; i++ ){
                    str += '\
                    }\
                    ';
                }
                
            }
        
        }



                str += "\
                }\ ";



                str += "\
                if(match==0){\ ";



        var pixrange = Math.ceil(lettersLen/3); 
        
        while(pixrange>0){
        
            pixrange--;
        
            var inc=0.0; // move letters backwards
            var chan=2; // move channel backwards
            var pixel= pixrange;//0.0;
            
            for( var i=1; i<lettersLen+1; i++ ){
                chan-=1;
                if(chan==0){
                    chan=3;
                    pixel-=1; // move back a pixel every 3 bits
                }    
                
                str += 'if( hasLetter( float('+GTP.encodeMap[letters[lettersLen-i]]+'), '+pixel.toFixed(1)+', int('+chan+') )){\ ';
            }
            
            if(lettersLen>0){
                str += "\
                match=1;\ ";
                
                for( var i=0; i<lettersLen; i++ ){
                    str += '\
                    }\
                    ';
                }
                
            }
        
        
        }



                str += "\
                }\ ";





/*

        // search back the whole term starting on furthest pixel and channel
        
        
        var pixrange = Math.ceil(lettersLen/3); 
        
        while(pixrange>0){
        
            pixrange--;
        
            var inc=0.0; // move letters backwards
            var chan=4; // move channel backwards
            var pixel= pixrange;//0.0;
            
            for( var i=1; i<lettersLen+1; i++ ){
                chan-=1;
                if(chan==0){
                    chan=3;
                    pixel-=1; // move back a pixel every 3 bits
                }    
                
                str += 'if( hasLetter( float('+GTP.encodeMap[letters[lettersLen-i]]+'), '+pixel.toFixed(1)+', int('+chan+') )){\ ';
            }
            
            if(lettersLen>0){
                str += "\
                match=1;\ ";
                
                for( var i=0; i<lettersLen; i++ ){
                    str += '\
                    }\
                    ';
                }
                
            }
        
        
        }
        
    
    
    */
        
        

/*



// TODO- need to recover old code that was check back from 3rd.. before i did above...

// checking from 2nd channel back

str += 'if( hasLetter( float('+GTP.encodeMap[letters[lettersLen-1]]+'), 0.0, int(2) )){\ ';
        
        if( lettersLen>1 ){
        
            str += 'if( hasLetter( float('+GTP.encodeMap[letters[lettersLen-2]]+'), 0.0, int(1) )){\ ';
            
            if( lettersLen>2 ){            
                str += 'if( hasLetter( float('+GTP.encodeMap[letters[lettersLen-3]]+'), 1.0, int(3) )){\ '; // we go back a pixel
            
                        str += "match=1;\
                        }\
                    }\
                }\ ";  
            
                                
            }else{
            
                    str += "match=1;\
                    }\
                }\ ";                    
        
            }
            
        }
        else // if letters are not greater than one. and we had the letter at the end
        {
            str += "\
                match=1;\
                }\ ";        
        }
        
        
     
        
        
// checking from 1st channel back

str += 'if( hasLetter( float('+GTP.encodeMap[letters[lettersLen-1]]+'), 0.0, int(1) )){\ ';
        
        if( lettersLen>1 ){
        
            str += 'if( hasLetter( float('+GTP.encodeMap[letters[lettersLen-2]]+'), -1.0, int(3) )){\ ';
            
            if( lettersLen>2 ){            
                str += 'if( hasLetter( float('+GTP.encodeMap[letters[lettersLen-3]]+'), -1.0, int(2) )){\ '; // we go back a pixel
            
                        str += "match=1;\
                        }\
                    }\
                }\ ";  
            
                                
            }else{
            
                    str += "match=1;\
                    }\
                }\ ";                    
        
            }
            
        }
        else // if letters are not greater than one. and we had the letter at the end
        {
            str += "\
                match=1;\
                }\ ";        
        }












// FORCE CHECK ON LAST 3 CHARACTERS


if( lettersLen>2  ){




// check first letter on last channel

str += 'if( hasLetter( float('+GTP.encodeMap[letters[lettersLen-3]]+'), 0.0, int(3) )){\ ';
        
        if( lettersLen>1 ){
        
            str += 'if( hasLetter( float('+GTP.encodeMap[letters[lettersLen-2]]+'), 1.0, int(1) )){\ ';
            
            if( lettersLen>2 ){            
                str += 'if( hasLetter( float('+GTP.encodeMap[letters[lettersLen-1]]+'), 1.0, int(2) )){\ ';
            
                        str += "match=1;\
                        }\
                    }\
                }\ ";  
            
                                
            }else{
            
                    str += "match=1;\
                    }\
                }\ ";                    
        
            }
            
        }
        else // if letters are not greater than one. and we had the letter at the end
        {
            str += "\
                match=1;\
                }\ ";        
        }








// check first letter on last channel

str += 'if( hasLetter( float('+GTP.encodeMap[letters[lettersLen-3]]+'), 0.0, int(2) )){\ ';
        
        if( lettersLen>1 ){
        
            str += 'if( hasLetter( float('+GTP.encodeMap[letters[lettersLen-2]]+'), 0.0, int(3) )){\ ';
            
            if( lettersLen>2 ){            
                str += 'if( hasLetter( float('+GTP.encodeMap[letters[lettersLen-1]]+'), 1.0, int(1) )){\ ';
            
                        str += "match=1;\
                        }\
                    }\
                }\ ";  
            
                                
            }else{
            
                    str += "match=1;\
                    }\
                }\ ";                    
        
            }
            
        }
        else // if letters are not greater than one. and we had the letter at the end
        {
            str += "\
                match=1;\
                }\ ";        
        }










// check first letter on last channel

str += 'if( hasLetter( float('+GTP.encodeMap[letters[lettersLen-3]]+'), 0.0, int(1) )){\ ';
        
        if( lettersLen>1 ){
        
            str += 'if( hasLetter( float('+GTP.encodeMap[letters[lettersLen-2]]+'), 0.0, int(2) )){\ ';
            
            if( lettersLen>2 ){            
                str += 'if( hasLetter( float('+GTP.encodeMap[letters[lettersLen-1]]+'), 0.0, int(3) )){\ ';
            
                        str += "match=1;\
                        }\
                    }\
                }\ ";  
            
                                
            }else{
            
                    str += "match=1;\
                    }\
                }\ ";                    
        
            }
            
        }
        else // if letters are not greater than one. and we had the letter at the end
        {
            str += "\
                match=1;\
                }\ ";        
        }








}// END FORCE CHECK ON LAST 3 CHARACTERS

*/




            var sum = one + str +
            "\
            if(match==0){\
                col = vec4( 1.0, 1.0, 1.0, 1.0 );\
            }\
            gl_FragColor = col;\
        }\
        ";

      //  window.console.log(sum);

        return sum;
        
}
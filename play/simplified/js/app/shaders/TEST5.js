// ONLY GOOD FOR 3 CHARACTER SEARCHES

// searches forward and backwards getting adjacent pixels. leaves visible the matches



// UPDATE --->


// i have 2 bodies of code in here.. one became other.. but this running one is whole word find.!!!! awesome. it may have wrinkles but it appears to be working

function TEST5( query ){
    
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
            const float pixelRange=float("+Math.round(lettersLen/3)+');\
            const int lettersLen='+lettersLen+';\
            ';
            
            
        var str="\ ";
        


        var pixrange = Math.round(lettersLen/3); 
        
        while(pixrange>0){
        
            pixrange--;
        
            var chan=3; // move channel backwards
            var pixel= pixrange;//0.0;
            
            str += 'if( match==0 ){\ ';
            str += 'if( hasLetter( float('+GTP.encodeMap[letters[lettersLen-1]]+'), '+pixel.toFixed(1)+', int('+chan+') )';
            
            for( var i=2; i<lettersLen+1; i++ ){
                chan-=1;
                if(chan==0){
                    chan=3;
                    pixel-=1; // move back a pixel every 3 bits
                }    
                
                str += ' && hasLetter( float('+GTP.encodeMap[letters[lettersLen-i]]+'), '+pixel.toFixed(1)+', int('+chan+') )';
            }
            str += '){\ ';
            
            if(lettersLen>0){
                str += "\
                match=1;\
                }\ ";
            }
            str += '}\ ';
        }

 
        
        
        var pixrange = Math.round(lettersLen/3); 
        
        while(pixrange>0){
        
            pixrange--;
        
            var chan=2; // move channel backwards
            var pixel= pixrange;//0.0;
            
            str += 'if( match==0 ){\ ';            
            str += 'if( hasLetter( float('+GTP.encodeMap[letters[lettersLen-1]]+'), '+pixel.toFixed(1)+', int('+chan+') )';
            
            for( var i=2; i<lettersLen+1; i++ ){
                chan-=1;
                if(chan==0){
                    chan=3;
                    pixel-=1; // move back a pixel every 3 bits
                }    
                
                str += ' && hasLetter( float('+GTP.encodeMap[letters[lettersLen-i]]+'), '+pixel.toFixed(1)+', int('+chan+') )';
            }
            str += '){\ ';
            
            if(lettersLen>0){
                str += "\
                match=1;\
                }\ ";
            }
            str += '}\ ';
        }        
        
        
        
        
        
        var pixrange = Math.round(lettersLen/3); 
        
        while(pixrange>0){
        
            pixrange--;
        
            var chan=1; // move channel backwards
            var pixel= pixrange;//0.0;
            
            str += 'if( match==0 ){\ ';            
            str += 'if( hasLetter( float('+GTP.encodeMap[letters[lettersLen-1]]+'), '+pixel.toFixed(1)+', int('+chan+') )';
            
            for( var i=2; i<lettersLen+1; i++ ){
                chan-=1;
                if(chan==0){
                    chan=3;
                    pixel-=1; // move back a pixel every 3 bits
                }    
                
                str += ' && hasLetter( float('+GTP.encodeMap[letters[lettersLen-i]]+'), '+pixel.toFixed(1)+', int('+chan+') )';
            }
            str += '){\ ';
            
            if(lettersLen>0){
                str += "\
                match=1;\
                }\ ";
            }
            str += '}\ ';
        }
        
        
        
        
        var sum = one + str +
        "\
        if(match==0){\
            col = vec4( 1.0, 1.0, 1.0, 1.0 );\
        }\
        gl_FragColor = col;\
    }\
    ";

   // window.console.log(sum);

    return sum;
        
}
// so looking at leaving all pixels alive that contain letters from current word


function TEST2( query ){
    

    
    
    
            var letters = query.split("");


            
            // SO - the beast. we need to runtime do any query so therefore generate required shader code for that query
            // which includes 
            
            // • starting from all channels.
            
            // • looking at previous pixels on the textures
            
            // • looking at forward textures
            
            // • checking back and forward as far as the length of the word
            
            // im guessing theres 2 approaches. brute force, and a tidy little alogrithm. for now im gonna go with the first approach... lol
            
            
        // im gonna check our current pixel first for all eventualities

        // maybe best to make an array the size of the string both back wards and forwards
        
        
        



        var one = "\
        precision mediump float;\
        varying vec2 vTextureCoord;\
        uniform sampler2D uSampler;\
        void main() {\
            vec2 onePixel = vec2(1.0, 1.0) / vec2(512.0,512.0);\
            vec4 col = texture2D( uSampler, vec2( vTextureCoord.s, vTextureCoord.t ));\
            vec3 rgb = texture2D( uSampler, vec2( vTextureCoord.s, vTextureCoord.t )).rgb;\
            float r = rgb.r;\
            float g = rgb.g;\
            float b = rgb.b;\
            int nomatch=0;\
            ";
            
            
  // currently we white a pixel if first letter doesn't appear

            
            var str = 'if( !( (r==('+GTP.encodeMap[letters[0]]+'./255.)) || (g==('+GTP.encodeMap[letters[0]]+'./255.)) || (b==('+GTP.encodeMap[letters[0]]+'./255.))';
  
  

            //for( var i=1; i<letters.length; i++ ){
              //  str = str + ' || (r==('+GTP.encodeMap[letters[i]]+'./255.)) || (g==('+GTP.encodeMap[letters[i]]+'./255.)) || (b==('+GTP.encodeMap[letters[i]]+'./255.))';
//            }
            str = str + ') ){\ ';

            var sum = one + str +
            "\
            nomatch=1;\
            }else{}\
            ";
             
             
             
             
             
             
             
             
             
             
             
             
                     /*
            // if all of our letters dont appear in any channel
            
            var str = 'if( !( (b==('+GTP.encodeMap[letters[0]]+'./255.))';
            for( var i=1; i<letters.length; i++ ){
                str = str + ' || (r==('+GTP.encodeMap[letters[i]]+'./255.)) || (g==('+GTP.encodeMap[letters[i]]+'./255.)) || (b==('+GTP.encodeMap[letters[i]]+'./255.))';
            }
            str = str + ') ){\ ';

            var sum = one + str +
            "\
            nomatch=1;\
             }\
             ";        
        
        
        */
        
        
                 
             
            sum = sum
             
            + "if(nomatch==1){\
                col = vec4( 1.0, 1.0, 1.0, 1.0 );\
            }\
            gl_FragColor = col;\
        }\
        ";
        window.console.log(sum);
        return sum;








        // test1 for reference


        /*
        
            
        var str = "\
        precision mediump float;\
        varying vec2 vTextureCoord;\
        uniform sampler2D uSampler;\
        void main() {\
            vec2 onePixel = vec2(1.0, 1.0) / vec2(512.0,512.0);\
            vec4 col = texture2D( uSampler, vec2( vTextureCoord.s, vTextureCoord.t ));\
            vec3 rgb = texture2D( uSampler, vec2( vTextureCoord.s, vTextureCoord.t )).rgb;\
            float r = rgb.r;\
            float g = rgb.g;\
            float b = rgb.b;\
            if( !( (r==("+GTP.encodeMap[letters[0]]+"./255.)) && (g==("+GTP.encodeMap[letters[1]]+"./255.)) && (b==("+GTP.encodeMap[letters[2]]+"./255.)) ) ){\
                col = vec4( 1.0, 1.0, 1.0, 1.0 );\
                }\
            gl_FragColor = col;\
        }\
        ";
        
        return str;
        */





}
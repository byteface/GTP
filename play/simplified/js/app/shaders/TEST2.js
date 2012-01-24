
// so this one is hiding the pixel if it has non of the letters of the query

// to show this type the whole alphabet and eventually the whole map will draw back


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
    
    // maybe best to make an array the size of the string both backwards and forwards?
        
        
 




        var one = "\
        precision mediump float;\
        varying vec2 vTextureCoord;\
        uniform sampler2D uSampler;\
        bool hasLetter(float letter) {\
            vec2 onePixel = vec2(1.0, 1.0) / vec2(512.0,512.0);\
            vec3 rgb = texture2D( uSampler, vec2( vTextureCoord.s, vTextureCoord.t )).rgb;\
            bool has = ( (rgb.r==(letter/255.)) || (rgb.g==(letter/255.)) || (rgb.b==(letter/255.)) ) ? true : false;\
            return has;\
        }\
        void main() {\
            vec4 col = texture2D( uSampler, vec2( vTextureCoord.s, vTextureCoord.t ));\
            int nomatch=0;\
            int pixelRange="+Math.ceil(letters.length/3)+';\
            ';
            
            var str = 'if( ! ( hasLetter( float('+GTP.encodeMap[letters[0]]+') )';
  
            for( var i=1; i<letters.length; i++ ){
                str = str + ' || hasLetter( float('+ GTP.encodeMap[letters[i]] +'))';
            }
  
            str = str + ') ){\ ';


// LOOK BACKWORDS
//            int count=0;
//            vec3 pix = texture2D( uSampler, vTextureCoord + vec2(onePixel.x*count, 0.0) ).rgb; // TESTING including rgb of the next pixel
//            r = pix.r;
//            r = pix.g;
//            r = pix.b;
            




            var sum = one + str +
            "\
            nomatch=1;\
            }else{}\
            if(nomatch==1){\
                col = vec4( 1.0, 1.0, 1.0, 1.0 );\
            }\
            gl_FragColor = col;\
        }\
        ";

        window.console.log(sum);

        return sum;
        
}
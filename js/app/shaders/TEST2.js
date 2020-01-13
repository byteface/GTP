
// so this one is hiding the pixel if it has non of the letters of the query

// to show this type the whole alphabet and eventually the whole map will draw back


function TEST2( query ){
    
    var letters = query.split("");

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

      //  window.console.log(sum);

        return sum;
        
}








/*

SOME OLD STUFF FOR MY REFRENCE PLEASE LEAVE


    <script id="shader-fs" type="x-shader/x-fragment">
    
        precision mediump float;
    
        varying vec2 vTextureCoord;
    
        uniform sampler2D uSampler;
    
        void main(void) {
        
            // TODO - image size as var
           // vec2 onePixel = vec2(1.0, 1.0) / vec2(512.0,512.0);  // NOTICE IMAGE SIZE
        
            vec4 col = texture2D( uSampler, vec2( vTextureCoord.s, vTextureCoord.t ));

           // vec3 rgb = texture2D( uSampler, vec2( vTextureCoord.s, vTextureCoord.t ) ).rgb;
            
            //float r = rgb.r;
        	//float g = rgb.g;
        	//float b = rgb.b;


// i think we need some kind of boyer moore here.



            // TESTING including rgb of the next pixel
//            vec3 rgb2 = texture2D( uSampler, vTextureCoord + vec2(onePixel.x, 0.0) ).rgb;
//            float npr = rgb2.r;
//            float npg = rgb2.g;
//            float npb = rgb2.b;


// gonna look for word 'plenty'

//            if( (r==(16./255.)) && (g==(12./255.)) && (b==(5./255.)) && (npr==(14./255.)) && (npg==(20./255.)) && (npb ==(25./255.))    )
//            {
               // col = vec4( 1.0, 1.0, 1.0, 1.0 );
//            }
  //          else
    //        {
      //          col = vec4( 1.0, 0.0, 0.0, 1.0 );
        //    }







        
        
      //  for( var i=0; i<letters.length; i++ ){
        //
        
        //}
        
        
        
//        if( !( (r==("+GTP.encodeMap[letters[0]]+"./255.)) && (g==("+GTP.encodeMap[letters[1]]+"./255.)) && (b==("+GTP.encodeMap[letters[2]]+"./255.)) ) ){\






           // vec4 col = texture2D( uSampler, vTextureCoord * vec2(-0.1,-0.1) ); // can zoom in on words or sentences would require changing the read size
            
            
            vec4 col = texture2D( uSampler, vec2(vTextureCoord.s+1.0, vTextureCoord.t));
    
            // finds all the word 'the' in the document
            if( (col[0] != (20./255.)) && (col[1] != (8./255.)) && (col[2] != (5./255.)) ){
                col += vec4( 1, 1, 1, 1.0 );
            }            
            
        
            

            gl_FragColor = col;
            
        }
    </script>




*/



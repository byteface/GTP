
// ok so this was a mission

// currently this one find a match backwards by 3 chars...

//it goes to max distance away form current pixel based on word lenght... reads  backwards for a match. if match it colors.

// first steps to trying to find pattern matching algo...

// ?question?.. if i add to texture co-ord x pos will it loop to next row?///... if not we also gotta write that in as i assuming it does


function TEST3( query ){
    
    var letters = query.split("");
    


        var one = "\
        precision mediump float;\
        varying vec2 vTextureCoord;\
        uniform sampler2D uSampler;\
        bool hasLetter(float letter, int range, int channel) {\
            vec2 onePixel = vec2(1.0, 1.0) / vec2(512.0,512.0);\
            vec3 rgb = texture2D( uSampler, vTextureCoord + vec2(int(onePixel.x)*range, 0.0) ).rgb;\
            bool has = false;\
            if(channel==1) has = (rgb.r==(letter/255.)) ? true : false;\
            if(channel==2) has = (rgb.g==(letter/255.)) ? true : false;\
            if(channel==3) has = (rgb.b==(letter/255.)) ? true : false;\
            return has;\
        }\
        void main() {\
            vec4 col = texture2D( uSampler, vec2( vTextureCoord.s, vTextureCoord.t ));\
            int match=0;\
            int pixelRange="+Math.ceil(letters.length/3)+';\
            ';
            
var str = 'if( hasLetter( float('+GTP.encodeMap[letters[letters.length-1]]+'), int(pixelRange), int(3) )){\ ';
        
        if( letters.length>1 ){
            str += 'if( hasLetter( float('+GTP.encodeMap[letters[letters.length-2]]+'), int(pixelRange), int(2) )){\ ';
            
            if( letters.length>2 ){            
                str += 'if( hasLetter( float('+GTP.encodeMap[letters[letters.length-3]]+'), int(pixelRange), int(1) )){\ ';                
            
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
        else
        {
            str += "\
                match=1;\
                }\ ";        
        }

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
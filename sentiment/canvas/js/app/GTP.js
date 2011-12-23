/*

here for ref unadultered...

Loader is now the moving progress as were tailoring it for sentiment.
I'd probably see me rolling that one back to this one somehow taking best of both once i see how usage transpires

this serves as gun test runner though for data so leaving as is

*/


var Gtp = Gtp || {};

Gtp.prototype = {

    load : function( file )
    {
        var im = new Image();
        
        var selfRef = this;   
        im.onload = function( e ){ selfRef.imageLoaded( e ) };
        im.src = file;//"ImageGenTest.png";
    },


    imageLoaded : function ( ev ) {
    
        element = document.getElementById("can");
        c = element.getContext("2d");
    
        im = ev.target; // the image, assumed to be 783x783 current negative map
        
        // read the width and height of the canvas
        width = parseInt(element.getAttribute("width"));
        height = parseInt(element.getAttribute("height"));
    
        // stamp the image on the left of the canvas:
        c.drawImage(im, 0, 0);
    
        // get all canvas pixel data
        imageData = c.getImageData(0, 0, width, height);
        var pix = imageData.data;
    
        var str = "";
        
        var i=0;
        var len=pix.length;
        
        var arr=[];
        
        for( i; i<len; i+=4 ) {
            arr.push( this.map[pix[i]] );
            arr.push( this.map[pix[i+1]] );
            arr.push( this.map[pix[i+2]] );
            
//            arr.push( 0xfff ); 
            
    //       str += map[pix[i+3]]+"";                        
        }
            
        arr.join("");
        
        //document.write( arr.join("") );
      
      
    //    window.console.log(str);
      
    },


    createDataImage : function ( data )
    {

        var contents = data;
        var contentsLength = contents.length;
        var squared = Math.ceil( Math.sqrt( contentsLength/3 ) ); // round up the square root and divide by 3 as were using 3 channels
        
       // window.console.log( squared ); 
        // TODO - need to get lines too so can add extra pixels as line seperators... implement fget - note same for this now in js version
        
        
                // - TODO - dynamic width / height based on square size needed
//        jQuery('<canvas id="new" width="400", height="400"></canvas>').html("").appendTo('#myDiv');
        document.write('<canvas id="new" width="' + squared + '", height="' + squared + '"></canvas>' );
        
        
        element = document.getElementById("new");
        c = element.getContext("2d");
    
        // read the width and height of the canvas
        width = parseInt(element.getAttribute("width"));
        height = parseInt(element.getAttribute("height"));
                
        imageData = c.createImageData(width, height);     

        var xPos = 0;
        var yPos = 0;            
        
        for( var charCount = 0; charCount < contentsLength; charCount+=4 )
        {
            var char1 = contents.substr( charCount, 1);
            var char2 = contents.substr( charCount+1, 1);
            var char3 = contents.substr( charCount+2, 1);
            
//            var selfRef = this;
            var col = this.setPixel( imageData, xPos, yPos, this.colorise( char1 ), this.colorise( char2 ), this.colorise( char3 ), 0xff );
            
            xPos++;
            
            if(xPos>squared){
                xPos=0;
                yPos+=1;
            }
        }

        c.putImageData( imageData, 0, 0 );
      
    },


    colorise: function ( character )
    {
        var col = 244; // if a character is unrecognised it will become space for now

        if( this.encodeMap[character] ){
            col = this.encodeMap[character];            
        }else{
            // TODO - some of these aren't showing... question mark seems to throw although i have it
            // error_log( $character );
        }
        
        return col;
    },


    setPixel : function ( imageData, x, y, r, g, b, a ) // TODO - add and use the alpha channel
    {
        var index = (x + y * imageData.width) * 4;
        imageData.data[index+0] = r;
        imageData.data[index+1] = g;
        imageData.data[index+2] = b;
        imageData.data[index+3] = a;
    }


}
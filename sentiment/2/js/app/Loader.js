var GTP = GTP || {};

GTP.Loader = function(  ) {
//    this.value
}

GTP.Loader.prototype = {


    pixelData : null, // data as pixels
    data : null, // data unwrapped


    loadAsImage : function( file, canvasName, callback )
    {
        var im = new Image();        
        var selfRef = this; 
        im.onload = function( e ){ selfRef.drawImage( e, canvasName, callback ) };
        im.src = file;
    },


    drawImage : function ( ev, canvasName, callback ) {


        image = ev.target;

       // document.write('<canvas id="'+ canvasName +'" width="' + image.width + '", height="' + image.height + '"></canvas>' );

//        document.innerHTML = document.write('<canvas id="'+ canvasName +'" width="' + image.width + '", height="' + image.height + '"></canvas>' );

        canvas = document.getElementById(canvasName);
        context = canvas.getContext("2d");    
    
        // stamp the image on the left of the canvas:
        context.drawImage(image, 0, 0);
    
        this.pixelData = context.getImageData(0, 0, image.width, image.height);//.data;
        
        if(callback) callback();
    },


    loadAsData : function( file, callback )
    {
        var im = new Image();
        var selfRef = this;   
        im.onload = function( e ){ selfRef.showData( e, callback ) };
        im.src = file;
    },


    showData : function ( ev, callback ) { // TODO - Look at drawing on intervals for large data sets - also maybe add canvas name here.. or use URLdata for proxy
    
        image = ev.target; // the image, assumed to be 783x783 current negative map
        
        document.write('<canvas id="'+ "GTP_LOADER" +'" width="' + image.width + '", height="' + image.height + '"></canvas>' );

        canvas = document.getElementById(canvasName);
        context = canvas.getContext("2d");  
    
        // stamp the image on the left of the canvas:
        context.drawImage(im, 0, 0);
    
        // get all canvas pixel data
        imageData = context.getImageData(0, 0, image.width, mage.height );
        var pix = imageData.data;
    
        var str = "";
        
        var i=0;
        var len=pix.length;
        
        var arr=[];
        
        for( i; i<len; i+=4 ) {
            arr.push( this.map[pix[i]] );
            arr.push( this.map[pix[i+1]] );
            arr.push( this.map[pix[i+2]] );
            // NOTE - missing alpha
        }
            
        //arr.join("");
        
        document.write( arr.join("") );
        
        if(callback) callback();
    },


    createDataImage : function ( data )
    {
        var contents = data;
        var contentsLength = contents.length;
        var squared = Math.ceil( Math.sqrt( contentsLength/3 ) ); // round up the square root and divide by 3 as were using 3 channels
        
        document.write('<canvas id="new" width="' + squared + '", height="' + squared + '"></canvas>' );
        
        element = document.getElementById("new");
        c = element.getContext("2d");
                
        imageData = c.createImageData(squared,squared);     

        var xPos = 0;
        var yPos = 0;            
        
        for( var charCount = 0; charCount < contentsLength; charCount+=4 )
        {
            var char1 = contents.substr( charCount, 1);
            var char2 = contents.substr( charCount+1, 1);
            var char3 = contents.substr( charCount+2, 1);
            // NOTE - missing alpha
            
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
            // window.console.log( $character );
        }
        
        return col;
    },


    setPixel : function ( imageData, x, y, r, g, b, a ) // TODO - actually use the alpha channel?
    {
        var index = (x + y * imageData.width) * 4;
        imageData.data[index+0] = r;
        imageData.data[index+1] = g;
        imageData.data[index+2] = b;
        imageData.data[index+3] = a;
    }



}
Gtp = {

// mappings for unwrapping
map :['','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','1','2','3','4','5','6','7','8','9','0',',','.','\'','\"','-','[',']','?','!',';',':','(',')','*','<','>','/','\\','@','£','$','%','&','-','+','_','|','{','}',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],


    init : function( file )
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
    //        str += map[pix[i+3]]+"";                        
        }
            
        //arr.join("");
            
        document.write( arr.join("") );
      
      
    //    window.console.log(str);
      
    }


}
SentimentCanvas = {
        
    index:{},
    classes : ['pos','neg'],
    classTokCounts : { pos:0, neg:0 },
    tokCount : 0,
    classDocCounts : { pos:0, neg:0 },
    docCount : 0,
    prior : { pos:0.5, neg:0.5 },
    
    tokenisedImageData:null,
    
    
    /*
    *

    as this does tokenisation we need methods for adding maps that already have it as were
    trying to get all operations onto the pixels.
    
    */
    addToIndex : function( canvasPixelArray, pclass ) //, limit ) TOOD - add limit back in
    {
        var pix = canvasPixelArray.data;

        var i=0;
        var len=pix.length;
        var rawData=[];
        
        for( i; i<len; i+=4 ) {
            rawData.push( this.checkChar( pix[i] ) );
            rawData.push( this.checkChar( pix[i+1] ) );
            rawData.push( this.checkChar( pix[i+2] ) );
            // NOTE - not using alpha
        }
    
        var str = rawData.join("");
        
        var file = str.split("--244--");
        
        
        // ----------------

        var i = 0;
        
        if(!this.contains( pclass, this.classes)) {
            window.console.log( "Invalid class specified. use pos or neg \n" );
            return;
        }
    
        while( i<file.length ) // TODO - temporarily file is now an array of strings
        {    
    
    //        if(limit > 0 && i > limit) { // TODO - add limit back in
      //          break;
        //    }
          
            var line = file[i];
            i++;
                    
            this.docCount++;
            this.classDocCounts[pclass]++;
    
            var tokens = this.tokenise(line);

            for( var j=0; j<tokens.length; j++ )
            {
                var token = tokens[j];
                
                if(!this.index[token])
                {
                    this.index[token] = {};
                    this.index[token][pclass] = 0;
                
                }else
                {
                    if(!this.index[token][pclass])
                    {
                        this.index[token][pclass] = 0;
                    }
                }
            
                this.index[token][pclass]++;
                this.classTokCounts[pclass]++;
                this.tokCount++;
                
            }
        }
    


        // creates a tokensed image data map of all things in the index

        var str = "";
        
        for( var items in this.index )
        {
            str += items.toString();
            
            for( var i=0; i<this.classes.length; i++ )
            {
                var classItem = this.classes[i];
                if(this.index[items][classItem]){
                    str+= classItem + "=" + this.index[items][classItem]; // ----------------------->>>>>> I add tokens to the image now so remove on classify
                }
            }
            str+=" ";
        }
    
        this.tokenisedImageData = str;
        
        
       // window.console.log( this.tokenisedImageData );
    },
    
    
    createDataImage : function ( data, canvasName )
    {
        var contents = data;
        var contentsLength = contents.length;
        var squared = Math.ceil( Math.sqrt( contentsLength/3 ) ); // round up the square root and divide by 3 as were using 3 channels
        
        
        // TODO - find replacement for this as its overwriting other things that are drawn
       // document.write('<canvas id="'+ canvasName +'" width="' + squared + '", height="' + squared + '"></canvas>' );

        outputCanvas = document.getElementById(canvasName);
        outputContext = outputCanvas.getContext("2d");
                
        imageData = outputContext.createImageData(squared, squared);

        var xPos = 0;
        var yPos = 0;            
        
        for( var charCount = 0; charCount < contentsLength; charCount+=3 )
        {
            var char1 = contents.substr( charCount, 1);
            var char2 = contents.substr( charCount+1, 1);
            var char3 = contents.substr( charCount+2, 1);
            
            var col = this.setPixel( imageData, xPos, yPos, this.colorise( char1 ), this.colorise( char2 ), this.colorise( char3 ), 0xff );
            
            xPos++;
            
            if(xPos>squared){
                xPos=0;
                yPos+=1;
            }
        }

        outputContext.putImageData( imageData, 0, 0 );
      
    },

        
    classify : function (query)
    {
        var chars = query;

        //wrap chars with dashes
        var i=0;
        var len=chars.length;
        var newData=[];
        for( i; i<len; i++) {
            newData.push( this.checkChar( this.colorise( chars[i] ) ) );
        }
        var str = newData.join("");
        
        //window.console.log(str)
    
        this.prior.pos = this.classDocCounts.pos / this.docCount;
        this.prior.neg = this.classDocCounts.neg / this.docCount; 

        var tokens = this.tokenise(str);
        var classScores = {};
        

      //  window.console.log( this.tokenisedImageData );

        
        window.console.log( tokens );
        
        
                /*
        this.createDataImage( str, 'newQuery' );
        var ourQuery = this.getPixelData( 'newQuery' );
        var pixelQuery = ourQuery.data;
        */
        
        
        
        for( var i=0; i<this.classes.length; i++ )
        {
            var classItem = this.classes[i];
            
            classScores[classItem] = 1;
    
            for( var j=0; j<tokens.length; j++ )
            {
                var token = tokens[j];
            
                var count=0;          
                
                
                this.createDataImage( tokens[j], tokens[j] );
                var pixelQuery = this.getPixelData( tokens[j] );
                
//                window.console.log( "pixelQuery" );                
                //window.console.log( pixelQuery );
                
                
                
           //     pixelQuery
                
                
                // = str;
                
                
                tokenMapData = this.getPixelData("tokenised_map");
                

                var l=0;
                var tokLen=tokenMapData.data.length;

                var pqlen = pixelQuery.data.length;
                var found=false;

                // window.console.log(pixelQuery);
                
                var m=0;
                
                for(l=0;l<tokLen;l++)
                {                
                

                    for( m=0; m < pqlen; m++ ) // TODO 10 will be pix len but we need to strip the 0
                    {
                       if(m==0) cursor=l;
                       if( pixelQuery.data[m] != tokenMapData.data[l+m] && pixelQuery.data[m] != 0 && pixelQuery.data[m] != 244)
                       {
                            l = cursor + 1;
                            m = 0;
                            break;
                       }
                       //window.console.log(m + " ::\t" + pixelQuery.data[m] + " != " + tokenMapData.data[l+m]);
                    }

                   // window.console.log("matched up to: " + m);
                    if( m == pqlen  )
                    {
                        found = true;
                        break;
                    }

                }




                // ------------------->>>>>> TODO - so this class is not complete until were reading the class values (i.e. pos / neg) from the image. these would have been added during tokenisation



                window.console.log( "found:= " + found);
                
                //window.console.log(this.index["-3--8--5--5--11--25-"]);
                
                
                if(this.index[token]) // TODO - not check index.. check the image as we have token data stored
                {
                    if(this.index[token][classItem])
                    {
                        count = this.index[token][classItem];
                    }
    
                }else{
                
                   // window.console.log("NOT NOT NOT::" + token )
                
                }
                
                
//                window.console.log(count);
                
                
                classScores[classItem] *= (count + 1) / (this.classTokCounts[classItem] + this.tokCount);
            }
            
            classScores[classItem] = this.prior[classItem] * classScores[classItem];
                
        }
    
    
    
    
    
    
    
    
    
    
    
    
    
        var result=0;
        var resultProp;
        for( var k=0; k<this.classes.length; k++ )
        {
           if( (classScores[this.classes[k]]) > result )
           {
                result = classScores[this.classes[k]]; // TODO - you may want the weighting
                resultProp = this.classes[k];
            }
        }
    
        window.console.log( "RESULT" );
        window.console.log( resultProp );    
    
        return resultProp;
        
        
        
    },
    
    
    
    tokenise : function (document)
    {
    //    document = (document + '').toLowerCase(); // TODO - need to remove commas etc ..  document TODO - need to add lowercasing to words before loading
        
       // var matches = document.replace('/\w+/');    
        var matches = document.split( "--255--" );
            
        return matches;//.split(" ");//matches[0];
    },



// --------------- HELPER FUNCTIONS ------------------ >

    contains : function ( item, array )
    {
        for( var i=0; i<array.length; i++ )
        {
            if( array[i] == item ) return true;
        }
        return false;
    },


    colorise: function ( character )
    {
        var col = 244; // if a character is unrecognised it will become space for now

        if( GTP.encodeMap[character] ){
            col = GTP.encodeMap[character];            
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
    },


    getPixelData : function (canvasName)
    {
        canvas = document.getElementById(canvasName);
        context = canvas.getContext("2d");    
        
        width = parseInt(canvas.getAttribute("width"));
        height = parseInt(canvas.getAttribute("height"));

        return context.getImageData(0, 0, width, height);//.data;
    },
    
    
    checkChar : function ( someChar )
    {
        theCharacter="-"+someChar+"-";
        
        // TODO / clean up
        
         // HOPING OUR FAIL CHAR REPRESENTS NEW LINE
        if(theCharacter=="-244-"){
            theCharacter="--244--";
        }
        
         // SPACES
        if(theCharacter=="-255-"){
            theCharacter="--255--";
        }
        
        if(theCharacter=="-0-"){ // kill white space / pixels
            theCharacter="";
        }
        
        
    // fullstop needs to be split / hi-lited here. get the code
    //    if(theCharacter=="-0-"){
    //        theCharacter="";
    //    }    
        
        
        return theCharacter;
    }


}
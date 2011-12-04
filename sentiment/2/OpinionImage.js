OpinionImage = {
        
index : {},//[],
classes : ['pos', 'neg'],
classTokCounts : { pos:0, neg:0 },
tokCount : 0,
classDocCounts : { pos:0, neg:0 },
docCount : 0,
prior : { pos:0.5, neg:0.5 },



getPixelData : function (canvasName)
{


        element = document.getElementById(canvasName);
        c = element.getContext("2d");    
    
    /*
        im = ev.target; // the image, assumed to be 783x783 current negative map
        
        // read the width and height of the canvas
        width = parseInt(element.getAttribute("width"));
        height = parseInt(element.getAttribute("height"));
    
        // stamp the image on the left of the canvas:
        c.drawImage(im, 0, 0);
    */
        return c.getImageData(0, 0, width, height);//.data;

},











//( pos.pixelData, 'positive_map', 'pos' );

checkChar : function ( someChar )
{
    theCharacter="-"+someChar+"-";
    
     // HOPING OUR FAIL CHAR REPRESENTS NEW LINE
    if(theCharacter=="-244-")
    {
        theCharacter="--244--";
    }

     // SPACES
    if(theCharacter=="-255-")
    {
        theCharacter="--255--";
        
    }


    if(theCharacter=="-0-")
    {
        theCharacter="";
    }

    
    return theCharacter;
},



addToIndex : function( data, canvasName, pclass ) //, limit ) TOOD - add limit back in
{
    
    document.write('<canvas id="'+ canvasName +'" width="' + 300 + '", height="' + 300 + '"></canvas>' ); // TODO - get image size of output

    outputCanvas = document.getElementById(canvasName);
    outputContext = outputCanvas.getContext("2d");
    
    var pix = data.data;

    window.console.log( "PIX PIX PIX" );
    window.console.log( pix.length );
    
    var i=0;
    var len=pix.length;
    var rawData=[];
    
    for( i; i<len; i+=4 ) { // TODO - were doing this as we didn't use the alpha channel so need to remove that pixel data from our array
        rawData.push( this.checkChar(  pix[i] ) );
        rawData.push( this.checkChar(  pix[i+1] ) );
        rawData.push( this.checkChar(  pix[i+2] ) );
    }

    var str = rawData.join("");

//    window.console.log( "OUTPUT OUTPUT OUTPUT OUTPUT OUTPUT OUTPUT" );
//    window.console.log( str.split("--244--") );
    
    var file = str.split("--244--");
    
    
    // ----------------
    
    
    
    
    //file = fopen(file, 'r'); // open image
    var i = 0;
    
    if(!this.contains( pclass, this.classes)) {
            window.console.log( "Invalid class specified. use pos or neg \n" );
            return;
    }

   // while($line = fgets(file)) { // next row of pixels so fgets moves to next white pixel     
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
        

//                   window.console.log( tokens.length );
                   
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

   
//    window.console.log( tokens[0] );
//    window.console.log( this.index["--1----12----20----8----15----21----7----8--"] );
   // window.console.log( this.index );
    


    var str = "";
    
    for( var bits in this.index )
    {
       // window.console.log(bits);
        
        str += bits.toString();
        
        for( var i=0; i<this.classes.length; i++ ){
        
        var classItem = this.classes[i];
        
        if(this.index[bits][classItem]){
            str+= classItem + "=" + this.index[bits][classItem]; // ----------------------->>>>>> I add tokens to the image now so remove on classify
        }
        
        
          //  var classItem = this.classes[i];
           // if(bits[classItem])
           // {
            //    str+= classItem + "=" + bits[classItem];
            //}   
        }
        
        str+=" ";
    }

    //window.console.log( str );
    this.tokenisedImageData = str;
    
   // this.createDataImage( str, outputContext );
   
},



tokenisedImageData:null,




    createDataImage : function ( data, canvasName )
    {
        var contents = data;
        var contentsLength = contents.length;
        var squared = Math.ceil( Math.sqrt( contentsLength/3 ) ); // round up the square root and divide by 3 as were using 3 channels
        
        document.write('<canvas id="'+ canvasName +'" width="' + squared + '", height="' + squared + '"></canvas>' ); // TODO - get image size of output

        outputCanvas = document.getElementById(canvasName);
        outputContext = outputCanvas.getContext("2d");
    
        // read the width and height of the canvas
        width = parseInt(element.getAttribute("width"));
        height = parseInt(element.getAttribute("height"));
                
        imageData = outputContext.createImageData(width, height);

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

        outputContext.putImageData( imageData, 0, 0 );
      
    },




        
classify : function (document)
{
    this.prior.pos = this.classDocCounts.pos / this.docCount;
    this.prior.neg = this.classDocCounts.neg / this.docCount; 
    
    
    
    var i=0;
    var len=document.length;
    var rawData=[];
    
    for( i; i<len; i+=4 ) { // TODO - were doing this as we didn't use the alpha channel so need to remove that pixel data from our array
        rawData.push( this.checkChar(  document[i] ) );
        rawData.push( this.checkChar(  document[i+1] ) );
        rawData.push( this.checkChar(  document[i+2] ) );
    }

    var str = rawData.join("");

    window.console.log( "classifyclassifyclassifyclassifyclassifyclassifyclassify" );
    window.console.log( str );
    
    var file = str.split("--244--").join("");
    
    
    
    
    var tokens = this.tokenise(file);
    var classScores = {};
    
    //window.console.log( "this.prior.pos::" + this.prior.pos );


   // window.console.log( "this.classes" + this.classes );    
    
    for( var i=0; i<this.classes.length; i++ )
    {
        var classItem = this.classes[i];
        
        window.console.log("classItem::" + classItem );
        
        classScores[classItem] = 1;

        for( var j=0; j<tokens.length; j++ )
        {
            var token = tokens[j];
        
            var count=0;          
            
            if(this.index[token]) // TODO - not check index.. check the image
            {
                if(this.index[token][classItem])
                {
                    count = this.index[token][classItem];
                    window.console.log(token);
                    window.console.log(this.index[token]);
                    window.console.log(this.index[token][classItem]);
                }

            }else{
            
               // window.console.log("NOT NOT NOT::" + token )
            
            }
            
            window.console.log("count." + count );
              
            classScores[classItem] *= (count + 1) / (this.classTokCounts[classItem] + this.tokCount);
        }
        
        classScores[classItem] = this.prior[classItem] * classScores[classItem];
            
    }


    var result=0;
    var resultProp;
    for( var k=0; k<this.classes.length; k++ )
    {
    
        window.console.log(classScores[this.classes[k]]);
    
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

    //window.console.log( "tokenisetokenisetokenisetokenisetokenisetokenisetokenise" );
//    window.console.log( document );

//    document = (document + '').toLowerCase(); // TODO - need to remove commas etc ..  document TODO - need to add lowercasing to words before loading
    
   // var matches = document.replace('/\w+/');//this.preg_match_all('/\w+/', document);
     
     
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
    },


        /*

        characters you want to encode / remember you will need to unwrap these so your unwrap array must derive from this
        
        */
        encodeMap : {   'a' : 1,
                        'b' : 2,
                        'c' : 3,
                        'd' : 4,
                        'e' : 5,
                        'f' : 6,
                        'g' : 7,
                        'h' : 8,
                        'i' : 9,
                        'j' : 10,
                        'k' : 11,
                        'l' : 12,
                        'm' : 13,
                        'n' : 14,
                        'o' : 15,
                        'p' : 16,
                        'q' : 17,
                        'r' : 18,
                        's' : 19,
                        't' : 20,
                        'u' : 21,
                        'v' : 22,
                        'w' : 23,
                        'x' : 24,
                        'y' : 25,
                        'z' : 26,
                        'A' : 27,
                        'B' : 28,
                        'C' : 29,
                        'D' : 30,
                        'E' : 31,
                        'F' : 32,
                        'G' : 33,
                        'H' : 34,
                        'I' : 35,
                        'J' : 36,
                        'K' : 37,
                        'L' : 38,
                        'M' : 39,
                        'N' : 40,
                        'O' : 41,
                        'P' : 42,
                        'Q' : 43,
                        'R' : 44,
                        'S' : 45,
                        'T' : 46,
                        'U' : 47,
                        'V' : 48,
                        'W' : 49,
                        'X' : 50,
                        'Y' : 51,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
                        'Z' : 52,
                        '1' : 53,
                        '2' : 54,
                        '3' : 55,
                        '4' : 56,
                        '5' : 57,
                        '6' : 58,
                        '7' : 59,
                        '8' : 60,
                        '9' : 61,
                        '0' : 62,
                        ',' : 63,
                        '.' : 64,                                                                                                                                                                                                                                                                                                                                                                                                
                        '\'' : 65,
                        '\"' : 66,
                        '-' : 67,
                        '[' : 68,
                        ']' : 69,
                        '?' : 70,
                        '!' : 71,
                        ';' : 72,
                        ':' : 73,
                        '(' : 74,
                        ')' : 75,
                        '*' : 76,
                        '<' : 77,
                        '>' : 78,
                        '/' : 79,
                        '\\' : 80,
                        '@' : 81,
                        '£' : 82,
                        '$' : 83,
                        '%' : 84,
                        '&' : 85,
                        '-' : 86,
                        '+' : 87,
                        '_' : 88,
                        '|' : 89,
                        '{' : 90,
                        '}' : 91,
                        ' ' : 255                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                         }








}
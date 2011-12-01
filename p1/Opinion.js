Opinion = {
        
index : {},//[],
classes : ['pos', 'neg'],
classTokCounts : { pos:0, neg:0 },
tokCount : 0,
classDocCounts : { pos:0, neg:0 },
docCount : 0,
prior : { pos:0.5, neg:0.5 },

addToIndex : function( file, pclass ) //, limit ) TOOD - add limit back in
{
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
        
       // window.console.log( "tokens", tokens );
        
        for( var j=0; j<tokens.length; j++ )
        {
            var token = tokens[j];
            
            if(!this.index[token])
            {
             //   window.console.log("SET SET SET::" + token )
                //var newToken = this.index[token];//);

                this.index[token] = {};
                this.index[token][pclass] = 0;
            
            
//                if(!newToken[pclass]){
  //                  newToken[pclass] = 0;
    //            }
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
    
    
    //window.console.log( "LOOK AT THE INDEX::" );
  //  window.console.log( this.index );    
    
    
   // fclose(file);
},
        
        
classify : function (document)
{
    this.prior.pos = this.classDocCounts.pos / this.docCount;
    this.prior.neg = this.classDocCounts.neg / this.docCount; 
    
    var tokens = this.tokenise(document);
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
            
            if(this.index[token])
            {
                if(this.index[token][classItem])
                {
                    count = this.index[token][classItem];
                }

            }else{
            
               // window.console.log("NOT NOT NOT::" + token )
            
            }
        
            
            
        
        
        
          //  var count = this.isset(this.index[token][classItem]) ? this.index[token][classItem] : 0;
            
              window.console.log("count." + count );
              
            classScores[classItem] *= (count + 1) / (this.classTokCounts[classItem] + this.tokCount);
        }
        
        classScores[classItem] = this.prior[classItem] * classScores[classItem];
            
    }
    
    
    window.console.log("classScores::" );
       window.console.log(classScores );
    
    
    //this.arsort(classScores);

//    return key(classScores); // TODO - replacement fucntion for key required

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

    return resultProp;
},


tokenise : function (document)
{
    document = (document + '').toLowerCase(); // TODO - need to remove commas etc
    
   // window.console.log( "document::", document );
        
    var matches = document.replace('/\w+/');//this.preg_match_all('/\w+/', document);
        
//    window.console.log( "the matches:"+ matches );
    
    return matches.split(" ");//matches[0];
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




preg_match_all : function(regex, haystack)
{

},











/* 
preg_match_all : function(regex, haystack) // TODO - dont think this method is viable.. need to try another
{


  //  window.console.log( regex, haystack );


    var globalRegex = new RegExp( regex, 'g' );
    var globalMatch = haystack.match(globalRegex);
    var matchArray = [];

   // window.console.log( globalRegex );

    
    for (var i in globalMatch)
    {
        var nonGlobalRegex = new RegExp(regex);
        var nonGlobalMatch = globalMatch[i].match(nonGlobalRegex);
        matchArray.push(nonGlobalMatch[1]);
    }

    window.console.log( "matchArray", matchArray );



    return matchArray;
},

*/



isset : function (varname) {
    if(typeof( window[ varname ] ) != "undefined") return true;
    else return false;
},


/*
Array.prototype.arsort = function(key) {
    this.sort(function(a, b) {
        return (a[key] < b[key]) ? 1 : -1;
    });
}
*/

arsort : function( inputArr )
{

        window.console.log( "inputArr::" + inputArr );


        var valArr = [], valArrLen = 0,
        k, i, ret, sorter, that = this,
        strictForIn = false,
        populateArr = {};



        sorter = function (b, a) {
            var aFloat = parseFloat(a),
                bFloat = parseFloat(b),
                aNumeric = aFloat + '' === a,
                bNumeric = bFloat + '' === b;
            if (aNumeric && bNumeric) {
                return aFloat > bFloat ? 1 : aFloat < bFloat ? -1 : 0;
            } else if (aNumeric && !bNumeric) {
                return 1;
            } else if (!aNumeric && bNumeric) {
                return -1;
            }
            return a > b ? 1 : a < b ? -1 : 0;
        };
        
        
        
    // BEGIN REDUNDANT
  //      this.php_js = this.php_js || {};
//        this.php_js.ini = this.php_js.ini || {};
        // END REDUNDANT
        
        // TODO - what is this?
        strictForIn = true;//this.php_js.ini['phpjs.strictForIn'] && this.php_js.ini['phpjs.strictForIn'].local_value && this.php_js.ini['phpjs.strictForIn'].local_value !== 'off';
        populateArr = strictForIn ? inputArr : populateArr;
     
     
        // Get key and value arrays
        for (k in inputArr) {
            if (inputArr.hasOwnProperty(k)) {
                valArr.push([k, inputArr[k]]);
                if (strictForIn) {
                    delete inputArr[k];
                }
            }
        }
        valArr.sort(function (a, b) {
            return sorter(a[1], b[1]);
        });
     
        // Repopulate the old array
        for (i = 0, valArrLen = valArr.length; i < valArrLen; i++) {
            populateArr[valArr[i][0]] = valArr[i][1];
        }
     
        return strictForIn || populateArr;

        
        
        
        
    }




}
// WEBGL TEXTURES MUST BE POWER OF 2
// WEBGL TEXTURES MUST BE POWER OF 2
// WEBGL TEXTURES MUST BE POWER OF 2
// WEBGL TEXTURES MUST BE POWER OF 2
// WEBGL TEXTURES MUST BE POWER OF 2


SentimentWEBGL = {

    gl : null,
    program : null,
    texture : null,        
        
    mvMatrix : null,
    mvMatrixStack : null,
    pMatrix : null,
    
    tokenisedMapRef : null,


    run : function (str) {

        this.mvMatrix = mat4.create(),
        this.mvMatrixStack = [];
        this.pMatrix = mat4.create();

        tokenisedMapRef = str;

        this.initShaders();
        this.initBuffers();
        this.initTexture();

        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.enable(this.gl.DEPTH_TEST);

        this.tick();
    },


    initShaders : function () // : Canvas data you want to draw to webGL
    {
    
        // the static ones
        var fragmentShader = this.getShaderSource("shader-fs");
        var vertexShader = this.getShaderSource("shader-vs");

        fragmentShader = 'precision highp float;' + fragmentShader; // annoying requirement is annoying
        
      // Create the shader program          
      
        var gl = this.gl; 
        
        var shaderProgram = this.gl.createProgram();

        gl.attachShader( shaderProgram, this.compileSource( gl.FRAGMENT_SHADER, fragmentShader ) );
        gl.attachShader( shaderProgram, this.compileSource( gl.VERTEX_SHADER, vertexShader ) );            
        gl.linkProgram( shaderProgram );

        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }

        gl.useProgram(shaderProgram);

        shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

        shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
        gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);

        shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
        shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
        shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
        
        this.program = shaderProgram;
    },
        
    
    initTexture : function()
    {    
    
        this.texture = this.gl.createTexture();
        this.texture.image = new Image();
    
    
        var myCanv = document.getElementById(tokenisedMapRef); // TODO - pass this in
        
       
        //this.texture.image.src = "data/negativeP12.png";//myCanv.toDataURL("image/png");//"image/jpeg";
    
        this.texture.image.src = myCanv.toDataURL("image/png");//"image/jpeg";
        
        this.texture.image.ref = this;
        
        this.texture.image.onload = this.onImageReady;
    },


    onImageReady : function (e){
    
        var img = e.target;
        var scope = img.ref; // TODO - not a good was to do this... get rid


//            window.console.log(img);

      //  scope.gl.texImage2D( scope.gl.TEXTURE_2D, 0, scope.gl.RGBA, scope.gl.RGBA, scope.gl.UNSIGNED_BYTE, e.target );
        
//            scope.texture.image = scope.gl.createTexture();
        
        scope.handleLoadedTexture(scope.texture);
    },


    handleLoadedTexture : function (texture) {
        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
        this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, texture.image);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
        this.gl.bindTexture(this.gl.TEXTURE_2D, null);
      },



    tick : function () {
    ref=this
        requestAnimFrame(function ticky(){ ref.tick() });
        this.drawScene()
        this.animate();
    },

    lastTime : 0,

    animate : function () {
    
    //window.console.log("asdf");
    
        var timeNow = new Date().getTime();
        if (this.lastTime != 0) {
            var elapsed = timeNow - this.lastTime;
        }
        this.lastTime = timeNow;
    },




    initBuffers : function () {
    cubeVertexPositionBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
    vertices = [
    // Front face, only a square
    -1, -1, 0.0,
    1, -1, 0.0,
    -1, 1, 0.0,
    1, 1, 0.0,
    
    ];
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);
    cubeVertexPositionBuffer.itemSize = 3;
    cubeVertexPositionBuffer.numItems = 4;
    
    cubeVertexTextureCoordBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, cubeVertexTextureCoordBuffer);
    var textureCoords = [
    // Front face
    0.0, 0.0,
    1.0, 0.0,
    0.0, 1.0,
    1.0, 1.0
    ];
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(textureCoords), this.gl.STATIC_DRAW);
    cubeVertexTextureCoordBuffer.itemSize = 2;
    cubeVertexTextureCoordBuffer.numItems = 4;
    },
    
    
    drawScene : function () {
        this.gl.viewport(0, 0, this.gl.viewportWidth, this.gl.viewportHeight);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        
        // No transformations
        mat4.identity(this.pMatrix);
        // No transformations
        mat4.identity(this.mvMatrix);
        
        //mat4.translate(this.mvMatrix, [0.1, 0.0, 1]);
        
        // No animation
        //mat4.rotate(mvMatrix, degToRad(zRot), [0, 0, 1]);
        
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
        this.gl.vertexAttribPointer(this.program.vertexPositionAttribute, cubeVertexPositionBuffer.itemSize, this.gl.FLOAT, false, 0, 0);
        
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, cubeVertexTextureCoordBuffer);
        this.gl.vertexAttribPointer( this.program.textureCoordAttribute, cubeVertexTextureCoordBuffer.itemSize, this.gl.FLOAT, false, 0, 0);
        
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
        this.gl.uniform1i(this.program.samplerUniform, 0);
        
        this.setMatrixUniforms();
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
    },


    setMatrixUniforms : function () {
            this.gl.uniformMatrix4fv(this.program.pMatrixUniform, false, this.pMatrix);
            this.gl.uniformMatrix4fv(this.program.mvMatrixUniform, false, this.mvMatrix);
    },


    // compiles a custom shader
    compileSource : function (type, source) {
        var shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            throw 'compile error: ' + this.gl.getShaderInfoLog(shader);
        }
        return shader;
    },


    // for getting static shaders that are prefixed in script tags
    getShaderSource : function (id)
    {        
        var script = document.getElementById(id);
        if (!script) { return null; }
        
        var source = "";
        var child = script.firstChild;
        while (child) {
            // node is a "textnode" ?
            if (child.nodeType == 3) {
                source += child.textContent;
            }
            child = child.nextSibling;
        }
        return source;
    }

}
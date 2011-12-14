SentimentWEBGL = {


        /*

        // vertex shader
        defaultVertexSource : '\
        attribute vec2 aVertexPosition;\
\
        void main() {\
            gl_Position = vec4(aVertexPosition, 0.0, 1.0);\
        }',

        // frag shader
        defaultFragmentSource : '\
        #ifdef GL_ES\
        precision highp float;\
        #endif\
\
        uniform vec4 uColor;\
\
        void main() {\
            gl_FragColor = uColor;\
        }',
        
        */
        
        
        
        
        
        
        
        
        
        
        
        
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


        initShaders : function ()
        {
        
            // for the dynamic ones
        
            //var fragmentShader = this.defaultFragmentSource;///getShader(gl, "shader-fs");  
//            var vertexShader = this.defaultVertexSource;//getShader(gl, "shader-vs");  




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
            
            
            /*
            
            // would mean referencing the shader we create
            
            // If creating the shader program failed, alert
            if (!this.gl.getShaderParameter( vs, gl.COMPILE_STATUS)) 
                window.console.log(gl.getShaderInfoLog(vs));
                
            if (!gl.getShaderParameter( fs, gl.COMPILE_STATUS)) 
                window.console.log(gl.getShaderInfoLog(fs));
                
            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) 
                window.console.log(gl.getProgramInfoLog(program));
          */
          
          
            if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {  
                window.console.log(gl.getProgramInfoLog(shaderProgram));
            }
           
           
           
            var canvas = document.getElementById("mainCanvas"); // TODO - pass this in
           
            var aspect = canvas.width / canvas.height;
            
            var vertices = new Float32Array([
                -0.5, 0.5*aspect, 0.5, 0.5*aspect,  0.5,-0.5*aspect,
                -0.5, 0.5*aspect, 0.5,-0.5*aspect, -0.5,-0.5*aspect
                ]);
            
            vbuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vbuffer);					
            gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
            
            itemSize = 2;
            numItems = vertices.length / itemSize; 
            
            
            
            
            
            
            gl.useProgram(shaderProgram);
            
            shaderProgram.uColor = gl.getUniformLocation( shaderProgram, "uColor");
            gl.uniform4fv( shaderProgram.uColor, [0.0, 1.0, 0.0, 1.0]);
            
            shaderProgram.aVertexPosition = gl.getAttribLocation( shaderProgram, "aVertexPosition" );
            gl.enableVertexAttribArray(shaderProgram.aVertexPosition);
            gl.vertexAttribPointer(shaderProgram.aVertexPosition, itemSize, gl.FLOAT, false, 0, 0);
            
            
            gl.drawArrays(gl.TRIANGLES, 0, numItems);
          
        },

        // for getting static shaders that are prefixed in script tags
        getShaderSource : function (id)
        {
            window.console.log("Jebs");
                    
            var script = document.getElementById(id);
            if (!script) { return null; }
            
            window.console.log("dribblethwait");
        
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
        },


        gl:null,


// taken from gitFX - write up on this...
        drawRect : function(left, top, right, bottom) {
            var undefined;
            var viewport = this.gl.getParameter(this.gl.VIEWPORT);
            top = top !== undefined ? (top - viewport[1]) / viewport[3] : 0;
            left = left !== undefined ? (left - viewport[0]) / viewport[2] : 0;
            right = right !== undefined ? (right - viewport[0]) / viewport[2] : 1;
            bottom = bottom !== undefined ? (bottom - viewport[1]) / viewport[3] : 1;
            if (this.gl.vertexBuffer == null) {
                this.gl.vertexBuffer = this.gl.createBuffer();
            }
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.gl.vertexBuffer);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([ left, top, left, bottom, right, top, right, bottom ]), this.gl.STATIC_DRAW);
            if (this.gl.texCoordBuffer == null) {
                this.gl.texCoordBuffer = this.gl.createBuffer();
                this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.gl.texCoordBuffer);
                this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([ 0, 0, 0, 1, 1, 0, 1, 1 ]), this.gl.STATIC_DRAW);
            }
            if (this.vertexAttribute == null) {
                this.vertexAttribute = this.gl.getAttribLocation(this.program, 'vertex');
                this.gl.enableVertexAttribArray(this.vertexAttribute);
            }
            if (this.texCoordAttribute == null) {
                this.texCoordAttribute = this.gl.getAttribLocation(this.program, '_texCoord');
                this.gl.enableVertexAttribArray(this.texCoordAttribute);
            }
            this.gl.useProgram(this.program);
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.gl.vertexBuffer);
            this.gl.vertexAttribPointer(this.vertexAttribute, 2, this.gl.FLOAT, false, 0, 0);
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.gl.texCoordBuffer);
            this.gl.vertexAttribPointer(this.texCoordAttribute, 2, this.gl.FLOAT, false, 0, 0);
            this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
    },




}
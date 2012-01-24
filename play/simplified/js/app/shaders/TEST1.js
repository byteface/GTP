// in this one we currently hi-light the pixels that have our 3 letter word
// only starting from the red channel.. so its not great but a great indicator of how
// we can potentially get this working

// TODO - this is forced 3 letters.. make it do 2 or 1 for testing stuff


function TEST1( query ){
    
    var letters = query.split("");
    
    var str = "\
    precision mediump float;\
    varying vec2 vTextureCoord;\
    uniform sampler2D uSampler;\
    void main() {\
        vec2 onePixel = vec2(1.0, 1.0) / vec2(512.0,512.0);\
        vec4 col = texture2D( uSampler, vec2( vTextureCoord.s, vTextureCoord.t ));\
        vec3 rgb = texture2D( uSampler, vec2( vTextureCoord.s, vTextureCoord.t )).rgb;\
        float r = rgb.r;\
        float g = rgb.g;\
        float b = rgb.b;\
        if( !( (r==("+GTP.encodeMap[letters[0]]+"./255.)) && (g==("+GTP.encodeMap[letters[1]]+"./255.)) && (b==("+GTP.encodeMap[letters[2]]+"./255.)) ) ){\
            col = vec4( 1.0, 1.0, 1.0, 1.0 );\
            }\
        gl_FragColor = col;\
    }\
    ";
    
    return str;
}
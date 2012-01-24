var js_includer = function(path)
{
  document.write('<script language="javascript" type="text/javascript" src="' + path + '"></script>');
}

js_includer("js/glMatrix-0.9.5.min.js"); // TODO - think i saw a better matrix operator recently. may replace
js_includer("js/webgl-utils.js");

js_includer("js/app/WEBGL.js");
js_includer("js/app/Loader.js");
js_includer("js/app/Map.js");

js_includer("js/app/shaders/TEST1.js");
js_includer("js/app/shaders/TEST2.js");



var js_includer = function(path)
{
  document.write('<script language="javascript" type="text/javascript" src="' + path + '"></script>');
}

//js_includer("js/app/Sentiment.js");
js_includer("js/app/SentimentCanvas.js");
js_includer("js/app/SentimentWEBGL.js");
js_includer("js/app/Loader.js");
js_includer("js/app/Map.js");

js_includer("js/glMatrix-0.9.5.min.js"); // TODO - think i saw a better matrix operator recently. may replace
js_includer("js/webgl-utils.js");

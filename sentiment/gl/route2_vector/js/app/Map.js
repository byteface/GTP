GTP.Map = function() {


//	this.format = format !== undefined ? format : GTP.ENGLISH_WORDS;





}


GTP.Map.prototype = function() {



}




// TODO -- lame of me to still have 2 arrays so look to merge these in global refactor
// TODO -- also remmeber to change the php one if you change this one



// mappings for unwrapping
GTP.map =['','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','1','2','3','4','5','6','7','8','9','0',',','.','\'','\"','-','[',']','?','!',';',':','(',')','*','<','>','/','\\','@','£','$','%','&','-','+','_','|','{','}',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
// TODO - fill char range




        /*

        characters you want to encode / remember you will need to unwrap these so your unwrap array must derive from this
        
        */
        
        //14--1--18--18--1--20--9--15--14
        //-3--8--5--5--11--25-
        
GTP.encodeMap = {   'a' : 1,
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
                         },
// TODO - note im using 244 for failure to recognise char in colorise method









// Formats - TODO

GTP.ENGLISH_TXT = "en/txt"; // TODO - create variety of language maps and make a factory
GTP.ENGLISH_HTML = "en/html";




/**
 * Created with IntelliJ IDEA.
 * User: patrickclancey
 * Date: 14/09/2013
 * Time: 17:35
 * To change this template use File | Settings | File Templates.
 */



var score=
    [   {
            "id":101,
            "tests":[
                {"id":"js001","data":"()","title":"booga()"},
                {"id":"js002","data":"(2)(3)()","title":"booga(2)(3)()"},
                {"id":"js003","data":"(2)(3)(5)()","title":"booga(2)(3)(5)()"},
                {"id":"js004","data":"(8)(13)(21)(34)()","title":"booga(8)(13)(21)(34)()"}
            ],
            "score":[0,5],
            "time":[3,2]
        },
        {
            "id":102,
            "tests":[
                {
                    "data":"HTML5",
                    "id":"html5001",
                    "title":"validator.w3.org"
                }
            ],
            "score":[-1,1],
            "time":[3,2]
        },
        {

            "id":103,
            "keys":['Drag your answer here'],
            "values":['Tim Berners-Lee','Tim Minchin','Tim Pigott-Smith'],
            "score":[0,1],
            "time":[0,0]
        },
        {

            "id":104,
            "keys":['Drag your answer here'],
            "values":['-1px','0','100%','10pt','10px','1em','1rem','inherit','medium','smaller','x-large','xx-small'],
            "score":[1,0,0,0,0,0,0,0,0,0,0,0],
            "time":[1,1]
        },
        {
           "id":105,

            "values":['Blink (WebKit)','WebKit','Trident','KHTML','Gecko','Tasman','Presto'],
            "keys":['Firefox','Google Chrome','Internet Explorer','Opera','Safari','Konqueror'],
            "score":{
                'Firefox':[4,1],
                'Google Chrome':[0,1],
                'Internet Explorer':[2,1],
                'Opera':[0,1],
                'Safari':[1,1],
                'Konqueror':[3,1]
            },
            "time":[0,0]
        },
        {

            "id":106,
            "tests":[]
        },
        {

            "id":107,
            "keys":['Drag your answer here'],
            "values":['Firefox','Chrome','IE','Opera','Safari','Konqueror','Netscape Navigator'],
            "score":[0,0,1,2,0,0,0],
            "time":[0,0]
        },
        {
            "id":601
        }
        /*,
         {
         "type":"match",
         "about":"Valid HTML5",
         "intro":"This is the intro text?",
         "template":"test-two-col-simple",
         "name":"Match",
         "id":103,
         "button":"",
         "solution":"invalid",
         "action":function(container, obj){
         var test = this;
         window.testLoader.saveSolution(test.id, obj, test.loaded);
         },
         "base":"",
         "tests":[{
         "data":"HTML5"
         }]
         }
         */
    ];







var tests=
    [{
        "type":"javascript",
        "about":"Incomplete function",
        "intro":"This function should add it's argument to a total and return a function, " +
            "it should return the current total when no argument is supplied.",
        "template":"test-two-col-simple",
        "name":"booga",
        "id":101,
        "row":2,
        "button":"run my code",
        "action":function(container, obj){
            var userInput,
                errorCount = 0;
            try {
                userInput = eval("({'test':" + obj.editorContents + "})");
            }catch(e){
                $(container).find("div.editor").addClass('invalid');
                alert("Sorry, you may have a parse error in your javascript");
                errorCount = -1;
            } finally {
                if (errorCount === -1){
                    return false;
                }
                for (var item in this.tests){
                    if (this.tests.hasOwnProperty( item )){
                        var status = "fail",
                            expect,
                            result,
                            returnValue;
                        try {
                            expect = eval("this.solution"+ this.tests[item].data );
                            returnValue = result = eval("userInput.test"+ this.tests[item].data );
                            if (expect === result){
                                status = "pass";
                            }else{
                                errorCount++;
                            }
                        } catch(e){
                            returnValue = e;
                            errorCount++;
                            status = "fail";
                        }
                        $(container).find("p[data-validate="+ this.tests[item].id +"]").addClass( status).append('<span class="returnValue">'+returnValue+'</span>');
                    }
                }
                if (errorCount === 0){
                    // check the testLoader context
                    window.testLoader.saveSolution(this.id, userInput, this.loaded);
                }
            }
        },
        "solution":function(n){
            var total = 0,
                fn = function(n){
                    if (!!n){
                        total += n;
                        return fn;
                    }
                    return total;
                };
            return fn(n);
        },
        "base":"function booga(n){"+
            "\n  var total = 0,"+
            "\n      fn = function(){};"+
            "\n  return total;"+
            "\n}",
        "tests":[
            {"id":"js001","data":"()","title":"booga()"},
            {"id":"js002","data":"(2)(3)()","title":"booga(2)(3)()"},
            {"id":"js003","data":"(2)(3)(5)()","title":"booga(2)(3)(5)()"},
            {"id":"js004","data":"(8)(13)(21)(34)()","title":"booga(8)(13)(21)(34)()"}
        ]
    },
        {
            "type":"html",
            "about":"Valid HTML5",
            "intro":"This template is very basic, but it doesn't validate  :( can you fix it?",
            "template":"test-two-col-simple",
            "name":"Validate this",
            "id":102,
            "row":2,
            "button":"validate...",
            "solution":"invalid",
            "action":function(container, obj){
                var test = this,
                    id = test.tests[0].id,
                    jqxhr = $.post("/validate/check", {
                        fragment: obj.editorContents
                    }, function(data) {
                        var pass = 'fail';
                        try {
                            var result = jqxhr.getResponseHeader("X-W3C-Validator-Status"),
                                errors = jqxhr.getResponseHeader("X-W3C-Validator-Errors"),
                                expect = 'Valid';
                            pass = (result === expect) ? "pass" : "fail";
                            $(container).find('div.tests p[data-validate='+id+']').attr( 'title', 'Number of errors; '+ errors );
                        } catch(e){
                            console.log(e);
                        }
                        $(container).find('div.tests p[data-validate='+id+']').addClass( pass );
                        if (pass === "pass"){
                            var userInput = {
                                test:obj.editorContents
                            };
                            window.testLoader.saveSolution(test.id, userInput, test.loaded);
                        }
                    }).fail(function() {
                            console.log('connection error');
                            $(container).find('div.tests p[data-validate='+id+']').addClass( 'fail' );
                        });
            },
            "base":"<!doctype html>"+
                "\n<html>"+
                "\n  <head>"+
                "\n    <meta charset=\"utf-8\">"+
                "\n  </head>"+
                "\n  <body>"+
                "\n    <h1>Hello world!</h1>"+
                "\n  </body>"+
                "\n</html>",
            "tests":[
                {
                    "data":"HTML5",
                    "id":"html5001",
                    "title":"validator.w3.org"
                }
            ]
        },
        {
            "type":"single-select",
            "about":"Who invented the internet?",
            "intro":"Which South Londoner is credited with inventing the internet in 1989?",
            "template":"test-two-row-simple",
            "name":"Match",
            "row":3,
            "id":103,
            "button":"Next",
            "reset":false,
            "solution":"invalid",
            "action":function(container, obj){
                var test = this;
                window.testLoader.saveSolution(test.id, obj, test.loaded);
            },
            "base":"",
            "tests":[],
            "keys":['Drag your answer here'],
            "values":['Tim Berners-Lee','Tim Minchin','Tim Pigott-Smith']
        },
        {
            "type":"single-select",
            "about":"Valid font size unit?",
            "intro":"Which of the following units of measurement is invalid CSS when used with - font-size : ; ?",
            "template":"test-two-row-simple",
            "name":"Match",
            "row":3,
            "id":104,
            "button":"Next",
            "reset":false,
            "solution":"invalid",
            "action":function(container, obj){
                var test = this;
                window.testLoader.saveSolution(test.id, obj, test.loaded);
            },
            "base":"",
            "tests":[],
            "keys":['Drag your answer here'],
            "values":['-1px','0','100%','10pt','10px','1em','1rem','inherit','medium','smaller','x-large','xx-small']
        },
        {
            "type":"multi-select",
            "about":"Browser engines",
            "intro":"Which of the following layout engines is associated with which browser?",
            "template":"test-two-row-simple",
            "name":"Match",
            "row":4,
            "id":105,
            "button":"Next",
            "reset":false,
            "solution":"invalid",
            "action":function(container, obj){
                var test = this;
                window.testLoader.saveSolution(test.id, obj, test.loaded);
            },
            "base":"",
            "tests":[],
            "values":['Blink (WebKit)','WebKit','Trident','KHTML','Gecko','Tasman','Presto','Gecko','Blink (WebKit)'],
            "keys":['Firefox','Google Chrome','IE','Opera','Safari','Konqueror']
        },
        {
            "type":"css",
            "about":"CSS button",
            "intro":"The visual desiger appologies, she hasn't decided on a font or colour pallet but you need to make a start, can you create the following button in CSS?",
            "template":"test-two-col-css",
            "name":"Match",
            "row":5,
            "id":106,
            "button":"Next",
            "reset":false,
            "solution":"invalid",
            "action":function(container, obj){
                var test = this;
                window.testLoader.saveSolution(test.id, obj, test.loaded);
            },
            "base":"",
            "tests":[]
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
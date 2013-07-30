
var tests=
    [{
        "type":"javascript",
        "about":"Incomplete function",
        "intro":"This function should add it's argument to a total and return a function, " +
            "it should return the current total when no argument is supplied.",
        "template":"test-two-col-simple",
        "name":"booga",
        "id":101,
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
            ]}
    ];
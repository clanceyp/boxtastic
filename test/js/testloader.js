(function($, ace, context, Mustache){
    "use strict";

    context.testLoader = {
        currentTest : 0,
        getCurrentTest : function(i, hard){
            if (hard){
                this.currentTest = i;
            } else {
                this.currentTest += i;
            }
            return this.currentTest;
        },
        load:function(test, container){
            var editor;

            function draw(){
                $(container).empty();
                $(container).html(
                    Mustache.render($( '#'+test.template ).text(), test)
                );
                editor = ace.edit( $(container).find('div.editor>div').get(0));
                setEditor();
            }
            function setEditor(){
                var theme = 'solarized_dark';

                $(container).find("div.editor").addClass('ace-'+theme.replace(/_/g,'-'));

                editor.setTheme("ace/theme/"+ theme);
                editor.getSession().setMode("ace/mode/"+test.type);
                editor.renderer.setShowGutter(false);
                editor.setValue( test.base );
            }
            function runTest(){
                var obj = {
                    editorContents : editor.getValue()
                };
                $(container).find("div.tests p").removeClass('pass').removeClass('fail');
                $(container).find("div.editor").removeClass('invalid');

                if (!$(container).find('.test-go').hasClass('run')){
                    $(container).find('.test-go').addClass('run');
                    test.action(container, obj);
                } else {
                    setTimeout(function(){
                        test.action(container, obj);
                    },300);
                }
            }

            draw();
            test.loaded = new Date();
            $(container).find('.test-go').on('click',runTest);
        },
        saveSolution:function(id, userInput){
            var json = "",
                obj = {};
            try {
                obj.test = userInput.test.toString();
                json = JSON.stringify( obj );
            } catch(e){
                alert(e);
            }
            localStorage.setItem("TEST-"+id, json);
        }
    };

})($, ace, window, Mustache);

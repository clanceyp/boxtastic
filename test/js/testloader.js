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
        getTestById:function(id){
            return _
        },
        load:function(test, container){
            var editor;

            function draw(){
                $(container).empty();
                $(container).html(
                    Mustache.render($( '#'+test.template ).text(), test)
                );
                if (!!$(container).find('div.editor>div').length){
                    editor = ace.edit( $(container).find('div.editor>div').get(0));
                    setEditor();
                }
            }
            function setEditor(){
                var theme = 'solarized_dark';

                $(container).find("div.editor").addClass('ace-'+theme.replace(/_/g,'-'));

                editor.setTheme("ace/theme/"+ theme);
                editor.getSession().setMode("ace/mode/"+test.type);
                editor.renderer.setShowGutter(false);
                editor.setValue( test.base );
            }
            function selectSaveAndForward(){
                var keys = $(container).find('[data-test-id="'+ test.id +'"]'),
                    keyValue = {},
                    obj = {};
                $(keys).each(function(i, key){
                    keyValue[$(key).attr('data-key')] = $(key).attr('data-value');
                })
                obj.test = keyValue;
                test.action(container, obj);
                window.box.go('right');
            }
            function runTest(){
                var obj = {
                    editorContents : editor.getValue()
                };
                $(container).find("div.tests p").removeClass('pass').removeClass('fail').find("span.returnValue").remove();
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
            function buttonAction( ){
                if (test.type.indexOf('select') > 0){
                    selectSaveAndForward();
                } else {
                    runTest();
                }
            }

            draw();
            test.loaded = new Date();
            $(container).find('.test-go').on('click',buttonAction);
        },
        saveSolution:function(id, userInput, loaded){
            var json = "",
                obj = {},
                completed = new Date();
            try {
                obj.test = userInput.test.toString();
                obj.duration = getTimeDiff(loaded, completed);
                json = JSON.stringify( obj );
            } catch(e){
                console.log(e);
            }
            localStorage.setItem("TEST-"+id, json);
            function getTimeDiff(loaded, completed){
                var seconds = 0,
                    mil = 0,
                    mins = 0,
                    dif = 0,
                    duration = {};
                try {
                    mil = (loaded && completed)? Math.abs(completed.getTime() - loaded.getTime()) : 0;
                    seconds = mil/1000;
                    mins = Math.floor(seconds / 60);
                    dif = seconds - mins * 60;
                    if (Math.round(dif) < 10){
                        duration.mins = mins+":0"+ Math.round(dif);
                    } else {
                        duration.mins = mins+":"+ Math.round(dif);
                    }
                    duration.seconds = seconds;
                } catch(e){
                    duration = 0;
                }
                return duration;
            }
        }
    };

})($, ace, window, Mustache);

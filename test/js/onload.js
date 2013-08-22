//(function($, document, window){
//window.alert(1)

    function initTests(){
        var tests = window.tests,
            testId = window.tests.showSingleTest,
            testLoader = window.testLoader,
            i,
            l,
            row,
            section;
        if (testId){
            i = testId;
            testLoader.load( tests[ i ], $("#content>div.row:nth-child(1)>section:nth-child(1)") );
        } else {
            for (i = 0, l = tests.length; i<l; i++){
                if ($("#content>div.row").length < tests[i].row){
                    $("#content").append('<div class="row"></div>');
                    console.log('row appended; '+ $("#content div.row").length )
                }
                section = $('<section><div class="content"></div></section>').appendTo("#content>div.row:nth-child("+ tests[i].row +")");
                testLoader.load( tests[ i ], $(section) );
            }
        }

    }
    function initBox(){
        var box = window.box;

        $("body").on("click",".box-control-left",function(){
            box.go('left');
        });

        $("body").on("click",".box-control-right",function(){
            box.go('right');
        });

        $("body").on("click",".box-control-up",function(){
            box.go('up');
        });

        $("body").on("click",".box-control-down",function(){
            box.go('down');
        });

        $("body").on("click",".box-control-toggle-fullscreen",function(){
            box.toggleFullscreen();
        });

        $("body").on("keyup",function(e){
            var t = e.target;
            if ( $(t).is('textarea, input, [contenteditable]') ){
                return;
            }
            if (e.keyCode === 38){// ^
                //box.setActiveButtonClass('box-control-up');
                box.go('up');
            }
            if (e.keyCode === 39){// >
                //box.setActiveButtonClass('box-control-right');
                box.go('right');
            }
            if (e.keyCode === 37){// <
                //box.setActiveButtonClass('box-control-left');
                box.go('left');
            }
            if (e.keyCode === 40){// v
                //box.setActiveButtonClass('box-control-down');
                box.go('down');
            }
            if (e.keyCode === 27){// esc
                box.setActiveButtonClass('box-control-toggle-fullscreen');
                box.toggleFullscreen();
            }
            if (e.keyCode === 32){// esc
                box.spin();
            }
        });

        $('#box').on( PrefixFree.eventName.get('animationend') ,function(e){
            $('#content section.pending').addClass('active').removeClass('pending');
            $('#box').removeClass( box.boxClasses.join(' ') ).find('div.face').empty();
        });


        // append javascript controls
        $('div.outer').append('<div class="box-control draggable"><button title="left" class="box-control-left"><span>v</span></button> <button title="right" class="box-control-right"><span>v</span></button><button title="up" class="box-control-up"><span>v</span></button> <button title="down" class="box-control-down"><span>v</span></button> <button title="fullscreen toggle" class="box-control-toggle-fullscreen"><span>x</span></button></div>');
        $( '<div></div>' ).appendTo( "body").css('display','none').append( $('#content').clone().attr('id','raw') );
        setTimeout(function(){
            $( ".draggable" ).draggable();
            $( "#content *.resizable" ).resizable();
        },500);

        $("input[data-message]").each(function(i, el){
            var m = $(el).attr('data-message');
            $(el).val(m).addClass('def').one('focus',function(){
                if ($(this).val() === m){
                    $(this).val('').removeClass('def');
                }
            });
        });
    }
    function initDragable(){
        function Reset(){
            $('[draggable=true]').removeClass('selected');
            $('*.drop-zone').attr('data-value',"");
            if ( $('*.type-single-select *.drop-zone').attr('data-original-text') ){
                $('*.type-single-select *.drop-zone').text( $('*.type-single-select *.drop-zone').attr('data-original-text' ) );
            }
        }
        function DropSingleSelect(el, id, value){
            //var id = $(el).attr('data-id');
            var idCurrent = $(el).attr('data-id');
            if (!!idCurrent){
                $('#'+ idCurrent ).removeClass('selected');
            }
            $('#'+  id ).addClass('selected');
            $(el)
                .attr('data-value', value )
                .attr('data-id', id )
                .removeClass('dragover')
                .text( value );
        }
        $('[draggable=true]').each(function(i, el){
            var value = $(el).text(),
                id = el.id || el.tagName +"-"+ i +"-"+ (new Date()).getTime();
            el.id = id;
            el.addEventListener( 'dragstart', function (e) {
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('value', value);
                e.dataTransfer.setData('id', id );
            });
            el.addEventListener('click', function(e){
                e.preventDefault();
                if ($('*.type-single-select *.drop-zone').length){
                   DropSingleSelect( $('*.type-single-select *.drop-zone') , id, value);
                }
            })
        });
        $('*.drop-zone').each(function(i, el){
            el.addEventListener( 'drop', function (e) {
                if (e.stopPropagation) {
                    e.stopPropagation();
                }
                var id = $(el).attr('data-id');
                $('#'+  e.dataTransfer.getData('id')).addClass('selected');
                if (!!id){
                    $('#'+ id ).removeClass('selected');
                }
                $(el)
                    .attr('data-value', e.dataTransfer.getData('value') )
                    .attr('data-id', e.dataTransfer.getData('id') )
                    .removeClass('dragover');
            });
            el.addEventListener('dragover', function (e) {
                if (e.preventDefault){
                    e.preventDefault(); // allows us to drop
                }
                $(el).addClass('dragover');
                return false;
            });
            el.addEventListener('dragleave', function (e) {
                if (e.preventDefault){
                    e.preventDefault();
                }
                $(el).removeClass('dragover');
                return false;
            })
        });
        $('*.type-single-select *.drop-zone').each(function(i, el){
            el.addEventListener( 'drop', function (e) {
                if (e.stopPropagation) {
                    e.stopPropagation();
                }
                if (!$(el).hasClass('viewed')){
                    $(el).attr('data-original-text', $(el).text() ).addClass('viewed');
                }
                $(el).find('span.returnValue').text( e.dataTransfer.getData('value') );
            });
        });
        $('*.type-multi-select *.drop-zone').each(function(i, el){
            el.addEventListener( 'drop', function (e) {
                if (e.stopPropagation) {
                    e.stopPropagation();
                }
                if (!$(el).hasClass('viewed')){
                    $(el).addClass('viewed');
                }
                $(el).find('span.returnValue').text( e.dataTransfer.getData('value') );
            });
        });
        $('.drop-reset').on('click',function(){
            Reset();
        });
    }

// })($, document, window);


    $(document).ready(function(){
        initTests(); // draw the tests before setting up the box controls
        initBox();
        initDragable();
    });

/*
$(document).ready(function(){

    $("body").on("click",".box-control-left",function(){
        box.go('left');
    });

    $("body").on("click",".box-control-right",function(){
        box.go('right');
    });

    $("body").on("click",".box-control-up",function(){
        box.go('up');
    });

    $("body").on("click",".box-control-down",function(){
        box.go('down');
    });

    $("body").on("click",".box-control-toggle-fullscreen",function(){
        box.toggleFullscreen();
    });

    $("body").on("keyup",function(e){
        var t = e.target;
        if ( $(t).is('textarea, input, [contenteditable]') ){
            return;
        }
        if (e.keyCode === 38){// ^
            //box.setActiveButtonClass('box-control-up');
            box.go('up');
        }
        if (e.keyCode === 39){// >
            //box.setActiveButtonClass('box-control-right');
            box.go('right');
        }
        if (e.keyCode === 37){// <
            //box.setActiveButtonClass('box-control-left');
            box.go('left');
        }
        if (e.keyCode === 40){// v
            //box.setActiveButtonClass('box-control-down');
            box.go('down');
        }
        if (e.keyCode === 27){// esc
            box.setActiveButtonClass('box-control-toggle-fullscreen');
            box.toggleFullscreen();
        }
        if (e.keyCode === 32){// esc
            box.spin();
        }
    });

    $('#box').on( PrefixFree.eventName.get('animationend') ,function(e){
        $('#content section.pending').addClass('active').removeClass('pending');
        $('#box').removeClass( box.boxClasses.join(' ') ).find('div.face').empty();
    });


    // append javascript controls
    $('div.outer').append('<div class="box-control draggable"><button title="left" class="box-control-left"><span>v</span></button> <button title="right" class="box-control-right"><span>v</span></button><button title="up" class="box-control-up"><span>v</span></button> <button title="down" class="box-control-down"><span>v</span></button> <button title="fullscreen toggle" class="box-control-toggle-fullscreen"><span>x</span></button></div>');
    $( '<div></div>' ).appendTo( "body").css('display','none').append( $('#content').clone().attr('id','raw') );
    setTimeout(function(){
        $( ".draggable" ).draggable();
        $( "#content *.resizable" ).resizable();
    },500);

    $("input[data-message]").each(function(i, el){
        var m = $(el).attr('data-message');
        $(el).val(m).addClass('def').one('focus',function(){
            if ($(this).val() === m){
                $(this).val('').removeClass('def');
            }
        });
    });

});


$(document).ready(function(){
    $('[draggable=true]').each(function(i, el){
        el.addEventListener( 'dragstart', function (e) {
            var id = el.id || el.tagName +"-"+ (new Date()).getTime();
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('value', $(el).text());
            e.dataTransfer.setData('id', el.id = id);
        });
    });
    $('*.drop-zone').each(function(i, el){
        el.addEventListener( 'drop', function (e) {
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            $('#'+  e.dataTransfer.getData('id')).css('opacity',0);
            $(el).attr('data-value', e.dataTransfer.getData('value') );
        });
        el.addEventListener('dragover', function (e) {
            if (e.preventDefault){
                e.preventDefault(); // allows us to drop
            }
            return false;
        });
    });
    $('.drop-reset').on('click',function(){
        $('[draggable=true]').css('opacity',1);
        $('*.drop-zone').attr('data-value',"");
    })
});

    */
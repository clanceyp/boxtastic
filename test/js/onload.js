
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
        })
    });

});
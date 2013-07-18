(function(window){
'use strict';

    var box = {
        currentPage : [0,0],
        boxClasses:['up','right','down','left','spin'],
        currentSequence: 0,
        animate:function(name){
            console.log(name)
            $('#box')
                .removeClass(box.boxClasses.join(' '));
            setTimeout(function(){
                $('#box')
                    .addClass(name)
                    .attr('data-animation-name', name);
            }, 10);
        },
        clean:function(){

        },
        callback:function(e){

        },
        left:function(){
            // go to the next page in the row
            var row = box.currentPage[0],
                index = box.currentPage[1],
                content = $('#content div.row:nth-child('+ (row+1) +') section:nth-child('+ (index+1) +')'),
                nextIndex = --box.currentPage[1],
                nextContent;

            if (nextIndex < 0){
                nextIndex = box.currentPage[1] = ( $('#content div.row:nth-child('+ (row+1) +') section').length-1 );
            }
            console.log('#content div.row:nth-child('+ (row+1) +') section:nth-child('+ (nextIndex+1) +')')
            nextContent = $('#content div.row:nth-child('+ (row+1) +') section:nth-child('+ (nextIndex+1) +')');

            $("#content section").removeClass('active');
            box.setContent({
                current: $(content).clone(),
                next: $(nextContent).addClass('pending').clone()
            }, 3);
            box.animate('left');
        },
        right:function(page){
            // go to the previous page in the row
            var row = box.currentPage[0],
                index = box.currentPage[1],
                content = $('#content div.row:nth-child('+ (row+1) +') section:nth-child('+ (index+1) +')'),
                nextIndex = ++box.currentPage[1],
                nextContent;

            if ( $('#content div.row:nth-child('+ (row+1) +') section').length <= nextIndex){
                console.log('resetting index ', $($('#content div.row').get(row)).find('section').length, nextIndex)
                nextIndex = box.currentPage[1] = 0;
            }
            console.log('#content div.row:nth-child('+ (row+1) +') section:nth-child('+ (nextIndex+1) +')')
            nextContent = $('#content div.row:nth-child('+ (row+1) +') section:nth-child('+ (nextIndex+1) +')');

            $("#content section").removeClass('active');
            box.setContent({
                current: $(content).clone(),
                next: $(nextContent).addClass('pending').clone()
            }, 1);
            box.animate('right');

        },
        up:function(){
            var row = box.currentPage[0],
                content = $('#content div.row:nth-child('+ (row+1) +') section:nth-child('+ (box.currentPage[1]+1) +')'),
                index = box.currentPage[1] = 0,
                rowCount = $("#content div.row").length,
                nextRow = --box.currentPage[0], nextContent;

            if (nextRow < 0){
                nextRow = box.currentPage[0] = (rowCount-1);
            }
            console.log('#content div.row:nth-child('+ (nextRow+1) +') section:first-child')
            nextContent = $('#content div.row:nth-child('+ (nextRow+1) +') section:first-child');
            $("#content section").removeClass('active');
            box.setContent({
                current: $(content).clone(),
                next: $(nextContent).addClass('pending').clone()
            }, 4);
            box.animate('up');
        },
        down:function(){
            var row = box.currentPage[0],
                content = $('#content div.row:nth-child('+ (row+1) +') section:nth-child('+ (box.currentPage[1]+1) +')'),
                index = box.currentPage[1] = 0,
                rowCount = $("#content div.row").length,
                nextRow = ++box.currentPage[0], nextContent;

            if (nextRow >= rowCount){
                nextRow = box.currentPage[0] = 0;
            }
            console.log('#content div.row:nth-child('+ (nextRow+1) +') section:first-child')
            nextContent = $('#content div.row:nth-child('+ (nextRow+1) +') section:first-child');
            $("#content section").removeClass('active');
            box.setContent({
                current: $(content).clone(),
                next: $(nextContent).addClass('pending').clone()
            }, 5);

            box.animate('down');
        },
        spin:function(){
            // go to the previous page in the row
            var row = box.currentPage[0],
                index = box.currentPage[1],
                content = $('#content div.row:nth-child('+ (row+1) +') section:nth-child('+ (index+1) +')'),
                nextIndex = ++box.currentPage[1],
                nextContent;

            if ( $('#content div.row:nth-child('+ (row+1) +') section').length <= nextIndex){
                console.log('resetting index ', $($('#content div.row').get(row)).find('section').length, nextIndex)
                nextIndex = box.currentPage[1] = 0;
            }
            console.log('#content div.row:nth-child('+ (row+1) +') section:nth-child('+ (nextIndex+1) +')')
            nextContent = $('#content div.row:nth-child('+ (row+1) +') section:nth-child('+ (nextIndex+1) +')');

            $("#content section").removeClass('active');
            box.setContent({
                current: $(content).clone(),
                next: $(nextContent).addClass('pending').clone()
            }, 1);
            box.animate('spin');
        },
        setContent:function(content, i, current){
            current = current || 0;
            $($('#box div.face').get(current)).html( content.current )
            $($('#box div.face').get(i)).html( content.next )
        },
        go:function(direction, page){
            this[direction](page)
        },
        getPage:function(page){
            if (page){
                return page;
            } else {
                console.log('not implemented')
            }
        },
        toggleFullscreen:function(){
            $('body').addClass('box-intransition').toggleClass('box-fullscreen');
        },
        setActiveButtonClass:function(className){
            $("."+className).addClass('active');
            setTimeout(function(){
                $("."+className).removeClass('active');
            },250);
        }
    };

    window.box = box;

})(window);

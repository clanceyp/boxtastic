(function(window){
'use strict';

    var box = {
        dubbyPage:'<section><h2>Lorem ipsum dolor sit ame</h2><p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum</p><ul><li>Sed ut perspiciatis unde omnis</li><li>Sed ut perspiciatis unde omnis</li><li>Sed ut perspiciatis unde omnis</li><li>Sed ut perspiciatis unde omnis</li><li>Sed ut perspiciatis unde omnis</li></ul><p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p><footer><nav><ul class="footer-nav"><li class="up"><a class="box-control-up">up</a></li><li class="right"><a class="box-control-right">right &gt;</a></li><li class="left"><a class="box-control-left">&lt; left</a></li><li class="down"><a class="box-control-down">down</a></li></ul></nav></footer></section>',
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
                rowCount = $("#content>div.row").length,
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
                rowCount = $("#content>div.row").length,
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
            $('#box>div.face').html( box.dubbyPage );
            $($('#box div.face').get(current)).html( content.current );
            $($('#box div.face').get(i)).html( content.next );
        },
        go:function(direction){
            box.setActiveButtonClass('box-control-'+ direction);
            box[direction]();
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

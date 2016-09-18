/**
 * Created by maggiehijack on 16/9/18.
 */


window.onload = function () {
    var container = document.getElementById('container');
    var list = document.getElementById('list');
    var buttons = document.getElementById('buttons').getElementsByTagName('span');
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');
    var index = 1;
    var len = 5;
    var animated = false;
    var interval = 3000;
    var timer;


    function animate (offset) {
        if (offset == 0) {
            return;
        }
        animated = true;
        var time = 300;  // 位移总时间
        var interval = 10; // 位移间隔时间
        var piece = offset/(time/interval); //每次位移量
        var left = parseInt(list.style.left) + offset;

        var go = function (){
            if ( (piece > 0 && parseInt(list.style.left) < left) || (piece < 0 && parseInt(list.style.left) > left)) {
                list.style.left = parseInt(list.style.left) + piece + 'px';
                setTimeout(go, interval);
            }
            else {
                list.style.left = left + 'px';
                if(left>-200){
                    list.style.left = -1280 * len + 'px';
                }
                if(left<(-1280 * len)) {
                    list.style.left = '-1280px';
                }
                animated = false;
            }
        }
        go();
    }

    function showButton() {
        for (var i = 0; i < buttons.length ; i++) {
            if( buttons[i].className == 'on'){
                buttons[i].className = '';
                break;
            }
        }
        buttons[index - 1].className = 'on';
    }

    function play() {
        timer = setTimeout(function () {
            next.onclick();
            play();
        }, interval);
    }
    function stop() {
        clearTimeout(timer);
    }

    next.onclick = function () {
        if (animated) {
            return;
        }
        if (index == 5) {
            index = 1;
        }
        else {
            index += 1;
        }
        animate(-1280);
        showButton();
    }
    prev.onclick = function () {
        if (animated) {
            return;
        }
        if (index == 1) {
            index = 5;
        }
        else {
            index -= 1;
        }
        animate(1280);
        showButton();
    }

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function () {
            if (animated) {
                return;
            }
            if(this.className == 'on') {
                return;
            }
            var myIndex = parseInt(this.getAttribute('index'));
            var offset = -1280 * (myIndex - index);

            animate(offset);
            index = myIndex;
            showButton();
        }
    }

    container.onmouseover = stop;
    container.onmouseout = play;

    play();

}
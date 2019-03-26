window.onload = function () {
    search();
    bannerMove();
    downTime();
}
var searchBox = document.querySelector('.jd_search_box');
var banner = document.querySelector('.jd_banner');
var height = banner.offsetHeight;
var pointBox = banner.querySelector('ul:last-child');
var points = pointBox.querySelectorAll('li');
var index = 1;

var imageBox = banner.querySelector('ul:first-child');
var addTransition = function () {
    imageBox.style.transition = 'all 0.2s ';
};
var removeTransition = function () {
    imageBox.style.transition = 'none';
};
var setTranslateX = function (translateX) {
    imageBox.style.transform = 'translateX(' + translateX + 'px)';
}
var width = banner.offsetWidth;
var search = function () {
    window.onscroll = function () {
        // document.body.scrollTop跟document.documentElement.scrollTop两者之间总有一个为0；
        var scrollTop = document.body.scrollTop + document.documentElement.scrollTop;
        var opacity = 0;
        if (scrollTop < height) {
            opacity = scrollTop / height;
        } else {
            opacity = 0.85;
        }
        searchBox.style.background = 'rgba(201, 21, 35, ' + opacity + ')';
    }
}

var bannerMove = function () {
    var timer = setInterval(function () {
        index++;
        addTransition();
        setTranslateX(-index * width);
    }, 2500);
    imageBox.addEventListener('transitionend', function () {

        if (index >= 9) {

            index = 1;

            removeTransition();
            setTranslateX(-index * width);
        } else if (index <= 0) {
            index = 8;
            removeTransition();
            setTranslateX(-index * width);
        }
        setPoint();
    });
    setPoint();
    var startX = 0;
    var moveX = 0;
    var distanceX = 0;
    imageBox.addEventListener('touchstart', function (e) {

        clearInterval(timer);
        startX = e.touches[0].clientX;
    });
    imageBox.addEventListener('touchmove', function (e) {
        moveX = e.touches[0].clientX;
        distanceX = moveX - startX;
        removeTransition();
        setTranslateX(-index * width + distanceX)
    });
    imageBox.addEventListener('touchend', function () {
        if (distanceX > 0) {
            if (Math.abs(distanceX) > width / 3) {
                addTransition();
                setTranslateX(-(index - 1) * width);
                index--;
            } else {
                addTransition();
                setTranslateX(-index * width);
            }
        }
        if (distanceX < 0) {
            if (Math.abs(distanceX) > width / 3) {
                addTransition();
                setTranslateX(-(index + 1) * width);
                index++;
            } else {
                addTransition();
                setTranslateX(-index * width);
            }
        }
        startX = 0;
        moveX = 0;
        distanceX = 0;
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            addTransition();
            setTranslateX(-index * width);
        }, 2500);
    })

};
var setPoint = function () {
    for (var i = 0; i < points.length; i++) {
        var obj = points[i];
        obj.classList.remove('now');
    }
    points[index - 1].classList.add('now');
};
var downTime = function () {
    var time = 5 * 34 * 60;
    var spans = document.querySelectorAll('.time span');
    var timer = setInterval(function () {
        time--;
        var h = Math.floor(time / 3600);
        var m = Math.floor(time % 3600 / 60);
        var s = Math.floor(time % 60);
        spans[0].innerHTML = Math.floor(h / 10);
        spans[1].innerHTML = h % 10;
        spans[3].innerHTML = Math.floor(m / 10);
        spans[4].innerHTML = m % 10;
        spans[6].innerHTML = Math.floor(s / 10);
        spans[7].innerHTML = s % 10;
        if (time <= 0) {
            clearInterval(timer);
        }
    }, 1000)

}
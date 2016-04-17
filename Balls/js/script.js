var G = 9.81;
var SCALE = 20; // px в метре
var KUPR = 0.55; // Коэффициент упругости мяча
var KSOPR = 0.01; // Коэффицент сопротивления

function Ball(x, y, r, color, v) {
    this.x0 = x;
    this.y0 = y;
    this.r = r;
    this.col = color;
    this.vy0 = v;
    this.vx0 = 2.8;
    this.getCoord =  function (t) {
        return {
            y: this.y0 + this.vy0*t/1000 + G*Math.pow(t/1000,2)/2,
            x: this.x0 + this.vx0*t/1000 - Math.pow(0.1*t/1000,2)/2
        };
    };
    this.getSpeed = function (t) {
        return {
            vy: this.vy0 + G*t/1000 - KSOPR,
            vx: this.vx0 - 0.1*t/1000 - KSOPR
        };
    };
    return this;
}

$( function() {
    var b1 = new Ball(0,0,15,0,0);
    console.log(b1.getCoord(1000));
    var $b1Elem = $('.ball');
    $b1Elem.css('width', b1.r*2+'px');
    $b1Elem.css('height', b1.r*2+'px');
    $b1Elem.css('border-radius', b1.r+'px');
    var curTime = 0;
    var interval = setInterval( function() {
        curTime += 10;
        var coord = b1.getCoord(curTime);
        // coord.y /= SCALE;
        var max_y = parseInt($b1Elem.parent().css('height')) - 2*b1.r;
        var max_x = parseInt($b1Elem.parent().css('width')) - 2*b1.r;
        var v = b1.getSpeed(curTime);
        if (coord.y > max_y/SCALE) {
            coord.y = max_y/SCALE;
            b1.vy0 = -(v.vy)*KUPR;
            b1.vx0 = v.vx;
            if(Math.abs(v.vy) < 2) { b1.vy0 = 0; }
            if(v.vx < 0) { b1.vx0 = 0; }
            curTime = 0;
            b1.y0 = max_y/SCALE;
            b1.x0 = coord.x;
        }
        $b1Elem.css('top', coord.y*SCALE + 'px');
        $b1Elem.css('left', coord.x*SCALE + 'px');
        if (b1.vx0<0.1 && b1.vy0<0.1) {
            alert('Complete');
            clearInterval(interval);
        }
    }, 10);
});

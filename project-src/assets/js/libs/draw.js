(function() {

  /*
      DRAW CLASS
  
  http://www.williammalone.com/articles/create-html5-canvas-javascript-drawing-app/#demo-simple
  
  https://developer.mozilla.org/en-US/docs/Mozilla_event_reference/deviceorientation?redirectlocale=en-US&redirectslug=DOM%2FDeviceOrientationEvent#Browser_Compatibility
  
  http://joelongstreet.com/blog/2011/08/15/understanding-how-the-accelerometer-and-gyroscope-work-in-the-browser/
  */

  var DRAW;
  var __hasProp = Object.prototype.hasOwnProperty, __indexOf = Array.prototype.indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (__hasProp.call(this, i) && this[i] === item) return i; } return -1; };

  DRAW = (function() {

    function DRAW(options) {
      $.extend(this, this.defaults, options || {});
      if (this.doInit) this.init();
    }

    DRAW.prototype.defaults = {
      'doInit': false,
      'debug_log': true,
      'container': 'canvas',
      'cID': 'canvas',
      'canvas': 'canvas',
      'context': '',
      'cDIMS': '',
      'backgroundColor': '#ffffff',
      'strokeColor': '#00ff00',
      'strokeRadius': 3,
      'paint': false,
      'clickX': [],
      'clickY': [],
      'clickDrag': []
    };

    DRAW.prototype.isTouch = function() {
      if (__indexOf.call(window, 'ontouchstart') >= 0) true;
      if (__indexOf.call(document, 'ontouchend') >= 0) true;
      try {
        document.createEvent('TouchEvent');
        true;
      } catch (err) {
        false;
      }
      if (typeof TouchEvent !== 'undefined') true;
      if (__indexOf.call(document, 'createTouch') >= 0) true;
      if (typeof Touch === 'object') return true;
    };

    DRAW.prototype.clearCanvas = function() {
      this.context.fillStyle = this.backgroundColor;
      this.context.fillRect(0, 0, this.cDIMS.width, this.cDIMS.height);
      this.canvas.width = this.cDIMS.width;
      return this.canvas.height = this.cDIMS.height;
    };

    DRAW.prototype.updateColors = function() {
      $(this.cID).css({
        'backgroundColor': this.backgroundColor
      });
      this.context.strokeStyle = this.strokeColor;
      return this.clearCanvas();
    };

    DRAW.prototype.redraw = function() {
      var i, _results;
      this.clearCanvas();
      this.context.strokeStyle = this.strokeColor;
      this.context.lineJoin = 'round';
      this.context.lineWidth = this.strokeRadius;
      i = 0;
      _results = [];
      while (i < this.clickX.length) {
        this.context.beginPath();
        if (this.clickDrag[i] && i) {
          this.context.moveTo(this.clickX[i - 1], this.clickY[i - 1]);
        } else {
          this.context.moveTo(this.clickX[i] - 1, this.clickY[i]);
        }
        this.context.lineTo(this.clickX[i], this.clickY[i]);
        this.context.closePath();
        this.context.stroke();
        _results.push(i++);
      }
      return _results;
    };

    DRAW.prototype.addClick = function(x, y, dragging) {
      this.clickX.push(x);
      this.clickY.push(y);
      return this.clickDrag.push(dragging);
    };

    DRAW.prototype.eDown = function(e, self) {
      var mouseX, mouseY;
      e.preventDefault();
      if (this.isTouch() === true) {
        mouseX = e.targetTouches[0].pageX - e.target.offsetLeft;
        mouseY = e.targetTouches[0].pageY - e.target.offsetTop;
      } else {
        mouseX = e.pageX - e.target.offsetLeft;
        mouseY = e.pageY - e.target.offsetTop;
      }
      this.paint = true;
      this.addClick(mouseX, mouseY, false);
      return this.redraw();
    };

    DRAW.prototype.eMove = function(e, self) {
      var mouseX, mouseY;
      e.preventDefault();
      if (this.paint) {
        if (this.isTouch() === true) {
          mouseX = e.targetTouches[0].pageX - e.target.offsetLeft;
          mouseY = e.targetTouches[0].pageY - e.target.offsetTop;
        } else {
          mouseX = e.pageX - e.target.offsetLeft;
          mouseY = e.pageY - e.target.offsetTop;
        }
        this.addClick(mouseX, mouseY, true);
        return this.redraw();
      }
    };

    DRAW.prototype.eLeave = function(e, self) {
      return this.paint = false;
    };

    DRAW.prototype.eUp = function(e, self) {
      e.preventDefault();
      this.paint = false;
      return this.redraw();
    };

    DRAW.prototype.getGyroVals = function(e, self) {
      var frontToBack, leftToRight, rotateDegrees;
      rotateDegrees = Math.round(e.alpha * 1 / 1);
      leftToRight = Math.round(e.gamma * 1 / 1);
      frontToBack = Math.round(e.beta * 1 / 1);
      return this.debug_log && console.log("rotate: " + rotateDegrees + " | leftToRight: " + leftToRight + " | frontToBack: " + frontToBack);
    };

    DRAW.prototype.bindEvents = function() {
      var cnv, self;
      this.debug_log && console.log('DRAW.bindEvents()');
      self = this;
      cnv = $('#' + this.cID);
      if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', function(evt) {
          return self.getGyroVals(evt, self);
        });
      }
      if (this.isTouch() === true) {
        cnv[0].addEventListener('touchstart', function(evt) {
          return self.eDown(evt, self);
        });
        cnv[0].addEventListener('touchmove', function(evt) {
          return self.eMove(evt, self);
        });
        cnv[0].addEventListener('touchend', function(evt) {
          return self.eUp(evt, self);
        });
      } else {
        cnv.mousedown(function(evt) {
          return self.eDown(evt);
        });
        cnv.mouseup(function(evt) {
          return self.eUp(evt);
        });
        cnv.mousemove(function(evt) {
          return self.eMove(evt);
        });
        cnv.mouseleave(function(evt) {
          return self.eLeave(evt);
        });
      }
      return $(window).resize(function(evt) {
        self.cDIMS.width = cnv.width();
        self.cDIMS.height = cnv.height();
        return self.clearCanvas();
      });
    };

    DRAW.prototype.init = function() {
      this.debug_log && console.log('DRAW.init()');
      this.bindEvents();
      return this.getGyroVals();
    };

    return DRAW;

  })();

  $(function() {
    window.DRAW = DRAW;
    return true;
  });

}).call(this);

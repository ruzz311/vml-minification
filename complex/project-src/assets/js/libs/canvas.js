(function() {

  /*
      CANVAS CLASS
  */

  var CANVAS;

  CANVAS = (function() {

    function CANVAS(options) {
      $.extend(this, this.defaults, options || {});
      if (this.doInit) this.init();
    }

    CANVAS.prototype.defaults = {
      'doInit': false,
      'debug_log': false,
      'container': 'canvasDiv',
      'cWidth': 640,
      'cHeight': 480,
      'cID': 'canvas',
      'callback': 'undefined',
      'instanceObj': {}
    };

    CANVAS.prototype.getCanvasDims = function() {
      var canvasDims;
      return canvasDims = {
        'width': this.cWidth,
        'height': this.cHeight
      };
    };

    CANVAS.prototype.getCanvasInfo = function(doCallback) {
      this.debug_log && console.log('CANVAS.getCanvasInfo()');
      if (doCallback === true || doCallback === this.callback) {
        return setTimeout(this.callback, 0, this.instanceObj);
      } else {
        return setTimeout(doCallback, 0, this.instanceObj);
      }
    };

    CANVAS.prototype.buildInstanceObj = function(canvasDiv, canvas, context, cb) {
      this.debug_log && console.log('CANVAS.buildInstanceObj()');
      this.instanceObj.id = this.cID;
      this.instanceObj.canvasDiv = canvasDiv;
      this.instanceObj.canvas = canvas;
      this.instanceObj.context = context;
      return this.getCanvasInfo(true);
    };

    CANVAS.prototype.createCanvas = function() {
      var canvas, canvasDiv, context;
      this.debug_log && console.log('CANVAS.createCanvas()');
      canvasDiv = document.getElementById(this.container);
      canvas = document.createElement('canvas');
      canvas.setAttribute('width', this.cWidth);
      canvas.setAttribute('height', this.cHeight);
      canvas.setAttribute('id', this.cID);
      canvasDiv.appendChild(canvas);
      if (typeof G_vmlCanvasManager !== 'undefined') {
        canvas = G_vmlCanvasManager.initElement(canvas);
      }
      context = canvas.getContext('2d');
      return this.buildInstanceObj(canvasDiv, canvas, context);
    };

    CANVAS.prototype.init = function() {
      this.debug_log && console.log('CANVAS.init()');
      return this.createCanvas();
    };

    return CANVAS;

  })();

  $(function() {
    window.CANVAS = CANVAS;
    return true;
  });

}).call(this);

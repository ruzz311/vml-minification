(function() {
  var APP;

  APP = (function() {
    APP = {};
    APP.canvas = '';
    APP.draw = '';
    APP.doColorUpdate = function() {
      return APP.draw.updateColors();
    };
    APP.initDraw = function(canvasObj) {
      var _this = this;
      console.log;
      APP.draw = new DRAW({
        'debug_log': true,
        'doInit': true,
        'cID': canvasObj.id,
        'canvas': canvasObj.canvas,
        'context': canvasObj.context,
        'container': canvasObj.canvasDiv,
        'cDIMS': APP.canvas.getCanvasDims()
      });
      return $('header').click(function(evt) {
        return APP.doColorUpdate();
      });
    };
    APP.buildCanvas = function() {
      var container;
      container = document.getElementById('sketchPad');
      return APP.canvas = new CANVAS({
        'debug_log': false,
        'doInit': true,
        'container': 'sketchPad',
        'cWidth': $('#sketchPad').width(),
        'cHeight': $('#sketchPad').height(),
        'backgroundColor': '#cdcaca',
        'strokeColor': '#555',
        'callback': APP.initDraw
      });
    };
    APP.Init = function() {
      return APP.buildCanvas();
    };
    return APP;
  })();

  $(document).ready(function() {
    return APP.Init();
  });

}).call(this);

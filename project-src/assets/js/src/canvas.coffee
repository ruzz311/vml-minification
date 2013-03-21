###
    CANVAS CLASS
###

class CANVAS
    
    constructor: ( options )->
        $.extend( @, @defaults, options || {} )
        if @doInit
            @init()
        
    defaults:
        'doInit': false
        'debug_log': false
        'container': 'canvasDiv'
        'cWidth':   640
        'cHeight': 480
        'cID': 'canvas'
        'callback': 'undefined'
        'instanceObj': {}
        
    getCanvasDims: ()->
        canvasDims = {
            'width': @cWidth
            'height': @cHeight
        }
        
    getCanvasInfo: ( doCallback )->
        @debug_log && console.log 'CANVAS.getCanvasInfo()'
        if doCallback is true or doCallback is @callback
            setTimeout( @callback, 0, @instanceObj )
        else
            setTimeout( doCallback, 0, @instanceObj )
        
    buildInstanceObj: ( canvasDiv, canvas, context, cb )->
        @debug_log && console.log 'CANVAS.buildInstanceObj()'
        @instanceObj.id = @cID
        @instanceObj.canvasDiv = canvasDiv
        @instanceObj.canvas = canvas
        @instanceObj.context = context
        @getCanvasInfo( true )
    
    createCanvas: ()->
        @debug_log && console.log 'CANVAS.createCanvas()'
        canvasDiv = document.getElementById @container
        canvas = document.createElement 'canvas'
        canvas.setAttribute 'width', @cWidth
        canvas.setAttribute 'height', @cHeight
        canvas.setAttribute 'id', @cID
        canvasDiv.appendChild canvas
        canvas = G_vmlCanvasManager.initElement( canvas ) unless typeof G_vmlCanvasManager is 'undefined'
        context = canvas.getContext '2d'
        @buildInstanceObj canvasDiv, canvas, context
        
    init: ()->
        @debug_log && console.log 'CANVAS.init()'
        @createCanvas()

$ ()->
    window.CANVAS = CANVAS
    true
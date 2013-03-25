APP = (->
    
    APP = {}
    APP.canvas = ''
    APP.draw = ''
    
    APP.doColorUpdate = ->
        APP.draw.updateColors()
    
    APP.initDraw = ( canvasObj )->
        console.log 
        APP.draw = new DRAW({
            'debug_log': true
            'doInit': true
            'cID': canvasObj.id
            'canvas': canvasObj.canvas
            'context': canvasObj.context
            'container': canvasObj.canvasDiv
            'cDIMS': APP.canvas.getCanvasDims()
        })
        # temp
        $( 'header' ).click( ( evt )=>
            APP.doColorUpdate()
        )
    
    APP.buildCanvas = ->
        container = document.getElementById 'sketchPad'
        APP.canvas = new CANVAS({
            'debug_log': false
            'doInit': true
            'container': 'sketchPad'
            'cWidth': $( '#sketchPad' ).width()
            'cHeight': $( '#sketchPad' ).height()
            'backgroundColor': '#cdcaca'
            'strokeColor': '#555'
            'callback': APP.initDraw
        })
    
    APP.Init = ->
        APP.buildCanvas()
    
    return APP
    
)()

$( document ).ready(->
    APP.Init();
)
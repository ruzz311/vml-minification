###
    DRAW CLASS

http://www.williammalone.com/articles/create-html5-canvas-javascript-drawing-app/#demo-simple

https://developer.mozilla.org/en-US/docs/Mozilla_event_reference/deviceorientation?redirectlocale=en-US&redirectslug=DOM%2FDeviceOrientationEvent#Browser_Compatibility

http://joelongstreet.com/blog/2011/08/15/understanding-how-the-accelerometer-and-gyroscope-work-in-the-browser/
###

class DRAW
    
    constructor: ( options )->
        $.extend( @, @defaults, options || {} )
        if @doInit
            @init()
        
    defaults:
        'doInit': false
        'debug_log': true
        'container': 'canvas'
        'cID': 'canvas'
        'canvas': 'canvas'
        'context': ''
        'cDIMS': ''
        'backgroundColor': '#ffffff'
        'strokeColor': '#00ff00'
        'strokeRadius': 3
        'paint': false
        'clickX': []
        'clickY': []
        'clickDrag': []
        
    isTouch: ()->
        true if 'ontouchstart' in window
        true if 'ontouchend' in document
        try
            document.createEvent 'TouchEvent'
            true
        catch err
            false
        true if typeof TouchEvent isnt 'undefined'
        true if 'createTouch' in document
        true if typeof Touch is 'object'
        
        
    clearCanvas: ()->
        @context.fillStyle = @backgroundColor
        @context.fillRect 0, 0, @cDIMS.width, @cDIMS.height
        @canvas.width = @cDIMS.width
        @canvas.height = @cDIMS.height
        
    updateColors: ()->
        $( @cID ).css( 'backgroundColor': @backgroundColor )
        @context.strokeStyle = @strokeColor
        @clearCanvas()
        
    redraw: ()->
        @clearCanvas()
        @context.strokeStyle = @strokeColor
        @context.lineJoin = 'round'
        @context.lineWidth = @strokeRadius
        i = 0
        while i < @clickX.length
            @context.beginPath()
            if @clickDrag[i] and i
                @context.moveTo @clickX[i - 1], @clickY[i - 1]
            else
                @context.moveTo @clickX[i] - 1, @clickY[i]
            @context.lineTo @clickX[i], @clickY[i]
            @context.closePath()
            @context.stroke()
            i++
        
    addClick: ( x, y, dragging )->
        @clickX.push x
        @clickY.push y
        @clickDrag.push dragging
        
    eDown: ( e, self )->
        e.preventDefault()
        if @isTouch() is true
            mouseX = e.targetTouches[0].pageX - e.target.offsetLeft
            mouseY = e.targetTouches[0].pageY - e.target.offsetTop
        else
            mouseX = e.pageX - e.target.offsetLeft
            mouseY = e.pageY - e.target.offsetTop
        @paint = true
        @addClick mouseX, mouseY, false
        @redraw()
        
    eMove: ( e, self )->
        e.preventDefault()
        if @paint
            if @isTouch() is true
                mouseX = e.targetTouches[0].pageX - e.target.offsetLeft
                mouseY = e.targetTouches[0].pageY - e.target.offsetTop
            else
                mouseX = e.pageX - e.target.offsetLeft
                mouseY = e.pageY - e.target.offsetTop
            @addClick mouseX, mouseY, true
            @redraw()
        
    eLeave: ( e, self )->
        @paint = false
        
    eUp: ( e, self )->
        e.preventDefault()
        @paint = false
        @redraw()
        
    getGyroVals: ( e, self )->
        # if (window.DeviceOrientationEvent) {
        #     window.addEventListener("deviceorientation", function( event ) {
        #         //alpha: rotation around z-axis
        #         var rotateDegrees = Math.round(event.alpha*1/1);
        #         //gamma: left to right
        #         var leftToRight = Math.round(event.gamma*1/1);
        #         //beta: front back motion
        #         var frontToBack = Math.round(event.beta*1/1);
        #         handleOrientationEvent( frontToBack, leftToRight, rotateDegrees );
        #     }, false);
        # }
        # 
        # var handleOrientationEvent = function( frontToBack, leftToRight, rotateDegrees ){
        #     console.log( 'FRONT TO BACK: ' + frontToBack, 'LEFT TO RIGHT: ' + leftToRight );
        # };
                
        rotateDegrees = Math.round e.alpha * 1 / 1
        leftToRight = Math.round e.gamma * 1 / 1
        frontToBack = Math.round e.beta * 1 / 1
        
        @debug_log && console.log "rotate: #{rotateDegrees} | leftToRight: #{leftToRight} | frontToBack: #{frontToBack}"
    
    bindEvents: ->
        @debug_log && console.log 'DRAW.bindEvents()'
        self = @
        cnv = $( '#' + @cID )
        
        if window.DeviceOrientationEvent
            window.addEventListener( 'deviceorientation', ( evt )->
                self.getGyroVals( evt, self )
            )
        
        if @isTouch() is true
            cnv[0].addEventListener( 'touchstart', ( evt )->
                self.eDown( evt, self )
            )
            cnv[0].addEventListener( 'touchmove', ( evt )->
                self.eMove( evt, self )
            )
            cnv[0].addEventListener( 'touchend', ( evt )->
                self.eUp( evt, self )
            )
        else
            cnv.mousedown ( evt )->
                self.eDown evt
            cnv.mouseup ( evt )->
                self.eUp evt
            cnv.mousemove ( evt )->
                self.eMove evt
            cnv.mouseleave ( evt )->
                self.eLeave evt
                
        $( window ).resize ( evt )->
            self.cDIMS.width = cnv.width()
            self.cDIMS.height = cnv.height()
            self.clearCanvas()
        
    init: ->
        @debug_log && console.log 'DRAW.init()'
        @bindEvents()
        @getGyroVals()

$ ()->
    window.DRAW = DRAW
    true
/*
==========================================================
===    Application JS                                  ===
==========================================================
*/
(function( window, document, undefined ) {
    
    /*====    prevent default on href's with no val or #    ======*/
    $('body').on('click', 'a[href="#"], a[href=""]', function(evt) { evt.preventDefault(); });
    
}( this, this.document ));
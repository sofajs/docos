var internals = {};
internals.foundation = [];


$(document).ready(function () {

    $.get( "docs", function( data ) {

        // load documentation

        console.log('foundation JSON ' + data.docs.foundation);
        // var sofaDocs = JSON.parse(data);
            
    }, "json" );
});

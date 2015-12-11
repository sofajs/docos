var internals = {};
internals.foundation = {};


$(document).ready(function () {

    $.get( "docs", function( data ) {

        // load documentation

        internals.foundation = data.docs.foundation;
        console.log('foundation JSON ' + JSON.stringify(internals.foundation));
        console.log(Object.keys(internals.foundation)); // ['core']

        var foundationModules = Object.keys(internals.foundation);

        for (var i = 0; i < foundationModules.length; ++i) {
        
            console.log('target ' + i + ' ' + foundationModules[i]);
            // process module
        };

        // var sofaDocs = JSON.parse(data);
            
    }, "json" );
});

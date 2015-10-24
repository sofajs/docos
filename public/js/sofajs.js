
var internals = {};

$(document).ready(function () {

    $.get( "docs", function( data ) {

        // load documentation

        // var sofaDocs = JSON.parse(data);

        internals.loadmenu(data.docs, function (err, requestsDropDownBox) {});

            $( "body" )
                .append( "Data: " + JSON.stringify(data.docs.requests.user.methods.test.signature) );
    }, "json" );

    console.log('document is ready');
});

internals.loadmenu = function (docs) {

    var navtabs = '<ul class="nav nav-tabs">' +
        '<li class="active"><a href="#">Home</a></li>' +
        '<li class="dropdown">' +
        '<a class="dropdown-toggle" data-toggle="dropdown" href="#">Menu 1' +
        '<span class="caret"></span></a>' +
        '<ul class="dropdown-menu">' +
        '<li><a href="#">Submenu 1-1</a></li>' +
        '<li><a href="#">Submenu 1-2</a></li>' +
            '<ul class="dropdown-menu">' +
                '<li><a href="#">Sub Submenu 1-1</a></li>' +
                '<li><a href="#">Sub Submenu 1-2</a></li>' +
            '</ul>' +
        '<li><a href="#">Submenu 1-3</a></li> ' +
        '</ul>' +
        '</li>' +
        '<li><a href="#">Menu 2</a></li>' +
        '<li><a href="#">Menu 3</a></li>' +
        '</ul>';


    // process requests

    var requests  = Object.keys(docs.requests);
    var requestOptions = '';

    // '<li class="active"><a href="#">Home</a></li>' +
    for (var i = 0; i < requests.length; ++i) {  

        requestOptions += '<li><a href="#">' + requests[i].toUpperCase() + '</a>' +
            '<ul>' +
            internals.loadGroup(docs.requests[requests[i]]) +
            '</ul>' +
            '</li>';
    };

    var requestsOptgroup = '<ul class="dropdown-menu">' + requestOptions + '</ul>';


    // process tools

    var tools  = Object.keys(docs.tools);
    var toolsOptions = '';
    var toolGroupFunctionsList = '';
    for (var i = 0; i < tools.length; ++i) {  

        // console.log('watch ' + internals.loadToolGroup(docs.tools[tools[i]]));
        // toolGroupFunctionsList = internals.loadGroup(docs.tools[tools[i]], tools[i]);
        toolsOptions += '<li><a href="#">' + tools[i].toUpperCase() + '</a>'+
            '<ul>' +
            internals.loadGroup(docs.tools[tools[i]]) +
            '</ul>' +
            '</li>';
    };

    var toolsOptgroup = '<ul class="dropdown-menu">' + toolsOptions + '</ul>';

    // get tool group functions 

      


    var dropDownMenu = '<ul class="nav nav-tabs">' +
            '<li class="dropdown">' +
            '<a class="dropdown-toggle" data-toggle="dropdown" href="#">Requests <span class="caret"></span></a>' +
                requestsOptgroup +
            '</li>' +
        '<li class="dropdown">' +
            '<a class="dropdown-toggle" data-toggle="dropdown" href="#">Tools<span class="caret"></span></a>' +
                toolsOptgroup +
        '</li>'+
        '</ul>';

    $( ".navigatePlugins" )
        .html(dropDownMenu);

    // console.log('watch' + dropDownMenu);
    // $( "body footer" ).append(dropDownMenu);
    var navtabs = '<ul class="nav nav-tabs">' +
        '<li class="active"><a href="#">Home</a></li>' +
        '<li class="dropdown">' +
        '<a class="dropdown-toggle" data-toggle="dropdown" href="#">Menu 1' +
        '<span class="caret"></span></a>' +
        '<ul class="dropdown-menu">' +
        '<li><a href="#">Submenu 1-1</a></li>' +
        '<li><a href="#">Submenu 1-2</a></li>' +
            '<ul class="dropdown-menu">' +
                '<li><a href="#">Sub Submenu 1-1</a></li>' +
                '<li><a href="#">Sub Submenu 1-2</a></li>' +
            '</ul>' +
        '<li><a href="#">Submenu 1-3</a></li> ' +
        '</ul>' +
        '</li>' +
        '<li><a href="#">Menu 2</a></li>' +
        '<li><a href="#">Menu 3</a></li>' +
        '</ul>';

    // $( "body footer" ).append(navtabs);
    // $( "body footer" ).append(navtabs);
};

internals.load = function (docs) {

    // load    

    // console.log('load ' + JSON.stringify(docs));

    // <select>
    //     <optgroup label="Swedish Cars">
    //     <option value="volvo">Volvo</option>
    //     <option value="saab">Saab</option>
    //     </optgroup>
    //     <optgroup label="German Cars">
    //     <option value="mercedes">Mercedes</option>
    //     <option value="audi">Audi</option>
    //     </optgroup>
    //     </select>


    // process requests

    var requests  = Object.keys(docs.requests);
    var requestOptions = '';

    for (var i = 0; i < requests.length; ++i) {  

        requestOptions += '<option value="'+ requests[i] + '">' + requests[i].toUpperCase() + '</option>';
    };

    var requestsOptgroup = '<optgroup label="requests">' + requestOptions + '</optgroup>';


    // process foundation 

    var foundation  = Object.keys(docs.foundation);
    var foundationOptions = '';

    for (var i = 0; i < foundation.length; ++i) {  

        foundationOptions += '<option value="'+ foundation[i] + '">' + foundation[i].toUpperCase() + '</option>';
    };

    var foundationOptgroup = '<optgroup label="foundation">' + foundationOptions + '</optgroup>';


    // process tools

    var tools  = Object.keys(docs.tools);
    var toolsOptions = '';

    for (var i = 0; i < tools.length; ++i) {  

        toolsOptions += '<option value="'+ tools[i] + '">' + tools[i].toUpperCase() + '</option>';
    };

    var toolsOptgroup = '<optgroup label="tools">' + toolsOptions + '</optgroup>';


    // process promises 

    var promises  = Object.keys(docs.promises);
    var promisesOptions = '';

    for (var i = 0; i < promises.length; ++i) {  

        promisesOptions += '<option value="'+ promises[i] + '">' + promises[i].toUpperCase() + '</option>';
    };

    var promisesOptgroup = '<optgroup label="promises">' + promisesOptions + '</optgroup>';


    // load drop down box
    
    var dropDownMenu = '<select>' + 
        requestsOptgroup + 
        toolsOptgroup +
        promisesOptgroup +
        foundationOptgroup +
        '</select>'; 

    $( ".navigatePlugins" )
        .html(dropDownMenu);

    var sampleTemplate = window.sampleTemplate({ record: docs.foundation.core.methods.test });
    var template = window.recordTemplate({ record: docs.requests.user.methods.test });
    //  template(data.docs.requests.user.methods.test); 
    console.log(template);
    $( "body #wrap" ).append(template);
    $( "body #wrap" ).append(sampleTemplate);

    var boom = '<menu type="context" id="mymenu">' +
               '<menuitem label="Refresh"> </menuitem> ' +
               '     <menu label="Share on...">' +
               '        <menuitem label="Twitter" icon="ico_twitter.png" </menuitem>' +
               '        <menuitem label="Facebook" icon="ico_facebook.png" </menuitem> '+
               '    </menu>'+
               '<menuitem label="Email This Page"> </menuitem> '+
               '</menu>';
    
    var boom2 = '<menu>'+
                    '<menuitem>one</menuitem>'+
                '</menu>'; 


};

internals.loadGroup = function (toolgroup) {

    var toolGroupFunctions  = Object.keys(toolgroup.methods);
    var functionListHTML = '';

    // console.log('watch: ' + JSON.stringify(toolgroup));
    // console.log('watch: ' + functionName);
    // functionListHTML += '<li><a href="#">' + toolgroup.methods[functionName].name + '</a></li>';

    // get all functions with in toolGroup
    for (var i = 0; i < toolGroupFunctions.length; ++i) {  

        // console.log('watch: ' + JSON.stringify(toolgroup.methods));
        // console.log('watch: ' + toolGroupFunctions[i]);
        functionListHTML += '<li><a href="#">' + toolgroup.methods[toolGroupFunctions[i]].name + '</a></li>';
    };

    return functionListHTML;
};

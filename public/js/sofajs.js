var internals = {};

$(document).ready(function () {

    $.get( "docs", function( data ) {

        // load documentation

        // var sofaDocs = JSON.parse(data);

        internals.load(data.docs, function (err, requestsDropDownBox) {});

            $( "body" )
                .append( "Data: " + JSON.stringify(data.docs.requests.user.methods.test.signature) );
    }, "json" );
});

internals.load = function (docs) {

    // process requests

    var requests  = Object.keys(docs.requests);
    var requestOptions = '';

    var requestsDocumentation = [];

    for (var i = 0; i < requests.length; ++i) {  

        // load request group's documentation

        var docRecordsArray = internals.loadGroupDocumentation(docs.requests[requests[i]], requests[i], 'requests');

        var group = {
            name:  requests[i],
            records: docRecordsArray
        };

        requestsDocumentation.push(group);


        // load request group's navigation menu 

        requestOptions += '<li><a href="#">' + requests[i].toUpperCase() + '</a>' +
            '<ul>' +
            internals.loadGroup(docs.requests[requests[i]], requests[i], 'requests') +
            '</ul>' +
            '</li>';

    };

    var requestsOptgroup = '<ul class="dropdown-menu">' + requestOptions + '</ul>';

    // process tools

    var tools  = Object.keys(docs.tools);
    var toolsOptions = '';
    var toolGroupFunctionsList = '';
    var toolsDocumentation = [];
    for (var i = 0; i < tools.length; ++i) {  

        // load tools group's documentation

        var docRecordsArray = internals.loadGroupDocumentation(docs.tools[tools[i]], tools[i], 'tools');

        var group = {
            name:  tools[i],
            records: docRecordsArray
        };

        toolsDocumentation.push(group);

        // console.log('watch ' + internals.loadToolGroup(docs.tools[tools[i]]));
        // toolGroupFunctionsList = internals.loadGroup(docs.tools[tools[i]], tools[i]);
        toolsOptions += '<li><a href="#">' + tools[i].toUpperCase() + '</a>'+
            '<ul>' +
            internals.loadGroup(docs.tools[tools[i]], tools[i], 'tools') +
            '</ul>' +
            '</li>';
    };

    var toolsOptgroup = '<ul class="dropdown-menu">' + toolsOptions + '</ul>';


    // process promises
      
    var promises  = Object.keys(docs.promises);
    var promisesOptions = '';
    var promisesDocumentation = [];

    for (var i = 0; i < promises.length; ++i) {  

        // load promises'  documentation

        console.log('loading promise!! ');
        var docRecordsArray = internals.loadGroupDocumentation(docs.promises[promises[i]], promises[i], 'promises');

        var group = {
            name:  promises[i],
            records: docRecordsArray
        };

        promisesDocumentation.push(group);


        // console.log('watch ' + internals.loadToolGroup(docs.tools[tools[i]]));
        // toolGroupFunctionsList = internals.loadGroup(docs.tools[tools[i]], tools[i]);
        promisesOptions += '<li><a href="#">' + promises[i].toUpperCase() + '</a>'+
            '<ul>' +
            internals.loadGroup(docs.promises[promises[i]], promises[i], 'promises') +
            '</ul>' +
            '</li>';
    };

    var promisesOptGroup = '<ul class="dropdown-menu">' + promisesOptions + '</ul>';

    // ** make documentation object

    internals.documentation = { 
        requests: requestsDocumentation,
        tools: toolsDocumentation,
        promises: promisesDocumentation
    }

    var dropDownMenu = '<ul class="nav nav-tabs">' +
            '<li class="dropdown">' +
            '<a class="dropdown-toggle" data-toggle="dropdown" href="#">Requests <span class="caret"></span></a>' +
                requestsOptgroup +
            '</li>' +
        '<li class="dropdown">' +
            '<a class="dropdown-toggle" data-toggle="dropdown" href="#">Tools<span class="caret"></span></a>' +
                toolsOptgroup +
        '</li>'+
        '<li class="dropdown">' +
            '<a class="dropdown-toggle" data-toggle="dropdown" href="#">Promises<span class="caret"></span></a>' +
                promisesOptGroup +
        '</li>'+
        '</ul>';

    // Insert Sidebar Navigation HTML

    $( ".sidebar" ).append(dropDownMenu);

    // Insert Documentation

    async.waterfall([function (next) {
    
        if (internals.documentation.requests.length !== 0) {

            for (var i = 0; i < internals.documentation.requests.length; ++i) {

                // console.log('watch: '+ i + ' ' + JSON.stringify(internals.documentation.requests[i]));
                for (var i2 = 0; i2 < internals.documentation.requests[i].records.length; ++i2) {

                    // process request groups functions
                    // console.log('watch water: ' + internals.documentation.requests[i].records[i2]);
                    // console.log('watch: ' + internals.documentation.requests[i2].docs);

                    var htmlPartial = window.recordTemplate({ record: internals.documentation.requests[i].records[i2] }); 

                    $( "#wrap" ).append(htmlPartial);

                    if (i2 === internals.documentation.requests[i].records.length - 1) {
                        next();
                    }
                }
            }

        } else {
            next();
        }

    }, function (next) {
    
        console.log('waterfall tools starts');

        internals.next = next;

        if (internals.documentation.tools.length !== 0) {
            for (var i = 0; i < internals.documentation.tools.length; ++i) {

                // console.log('watch: '+ i + ' ' + JSON.stringify(internals.documentation.requests[i]));
                for (var i2 = 0; i2 < internals.documentation.tools[i].records.length; ++i2) {

                    // process request groups functions
                    // console.log('watch water: ' + internals.documentation.tools[i].records[i2]);
                    // console.log('watch: ' + internals.documentation.requests[i2].docs);

                    var htmlPartial = window.recordTemplate({ record: internals.documentation.tools[i].records[i2] }); 

                    $( "#wrap" ).append(htmlPartial);

                    console.log('tools group ' + i);
                    if (i === internals.documentation.tools.length - 1) {
                        console.log('exit tools' + i);
                        internals.next();
                    }
                }
            }
        } else {
            next();
        }
    }, function (next) {
    
        if (internals.documentation.promises.length !== 0) {

            for (var i = 0; i < internals.documentation.promises.length; ++i) {

                // console.log('watch: '+ i + ' ' + JSON.stringify(internals.documentation.requests[i]));

                console.log('--');
                var exit = internals.documentation.promises[i].records.length - 1;

                for (var i2 = 0; i2 < internals.documentation.promises[i].records.length; ++i2) {

                    // process request groups functions
                    // console.log('watch water: ' + internals.documentation.tools[i].records[i2]);
                    // console.log('watch: ' + internals.documentation.requests[i2].docs);

                    var htmlPartial = window.recordTemplate({ record: internals.documentation.promises[i].records[i2] }); 

                    $( "#wrap" ).append(htmlPartial);

                    console.log('promises.length ' + internals.documentation.promises[i].records.length);
                    console.log('promises.length ' + i2);
                    console.log('exit ' + exit);
                    if (i2 === exit) {
                        console.log('got it');
                        next();
                    }
                }
            }
        } else {
            next();
        }

    }], function (err) {
        
        console.log('waterfall done');
    });
    
};


internals.loadGroup = function (toolgroup, groupName, pluginType) {

    var toolGroupFunctions  = Object.keys(toolgroup.methods);
    var functionListHTML = '';

    // load functions with in toolGroup

    for (var i = 0; i < toolGroupFunctions.length; ++i) {  

        functionListHTML += '<li><a href="#' +  
            pluginType + '-' + groupName + '-' + toolgroup.methods[toolGroupFunctions[i]].name +
            '">' + 
            toolgroup.methods[toolGroupFunctions[i]].name + 
            '</a></li>';
    };

    return functionListHTML;
};

internals.loadGroupDocumentation = function (group, groupName, pluginType) {

    var groupFunctions  = Object.keys(group.methods);
    var groupDocumentation = [];

    // load functions with in toolGroup

    for (var i = 0; i < groupFunctions.length; ++i) {  

        var record = { 
            pluginType: pluginType,
            groupName: groupName,
            name: group.methods[groupFunctions[i]].name, 
            signature: group.methods[groupFunctions[i]].signature,
            comment: group.methods[groupFunctions[i]].comment
        };

        groupDocumentation.push(record); 
    };

    return groupDocumentation;
};

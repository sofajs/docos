var internals = {};
internals.requests = [];
internals.tools = [];
internals.promises = [];


$(document).ready(function () {

    $.get( "docs", function( data ) {

        // load documentation

        // var sofaDocs = JSON.parse(data);

        internals.wrapHTML(data.docs, function (err, result){ 

           // Insert prepared sofajs data

           internals.insertHTML();
        }); 
            
    }, "json" );
});


internals.wrapHTML = function (docs, callback) {

    // wrap documentation object HTML. 
    // process requests

    // Set requests headert title in sidebar. 

    $(".sidebar").append('<h5>Requests</h5>');

    var requests  = Object.keys(docs.requests);

    for (var i = 0; i < requests.length; ++i) {  

        // load request group's documentation

        var docRecordsArray = internals.loadGroupDocumentation(docs.requests[requests[i]], requests[i], 'requests');

        var sideMenuHTML = internals.generateSideMenu(requests[i], docs.requests[requests[i]], 'requests');

        var group = {
            name:  requests[i],
            records: docRecordsArray.toString(""),
            sideMenuHTML: sideMenuHTML
        };

        internals.requests.push(group);

    };

    internals.wrapToolsHTML(docs, callback);
};

internals.wrapToolsHTML = function (docs, callback) {

    // wrap documentation object HTML. 
    // process tools 

    var tools  = Object.keys(docs.tools);

    for (var i = 0; i < tools.length; ++i) {  

        // load request group's documentation

        var docRecordsArray = internals.loadGroupDocumentation(docs.tools[tools[i]], tools[i], 'tools');

        var sideMenuHTML = internals.generateSideMenu(tools[i], docs.tools[tools[i]], 'tools');

        var group = {
            name:  tools[i],
            records: docRecordsArray.toString(""),
            sideMenuHTML: sideMenuHTML
        };

        internals.tools.push(group);

    };

    // not executed
    internals.wrapPromisesHTML(docs, callback); 
};

internals.wrapPromisesHTML = function (docs, callback) {

    // wrap documentation object HTML. 
    // process promises 

    var promises  = Object.keys(docs.promises);

    for (var i = 0; i < promises.length; ++i) {  

        // load request group's documentation

        var docRecordsArray = internals.loadGroupDocumentation(docs.promises[promises[i]], promises[i], 'promises');

        // requestsDocumentation.push(group);

        var sideMenuHTML = internals.generateSideMenu(promises[i], docs.promises[promises[i]], 'promises');

        var group = {
            name:  promises[i],
            records: docRecordsArray.toString(""),
            sideMenuHTML: sideMenuHTML
        };

        internals.promises.push(group);

    };

    // Finished wrappign plugins html

    callback(null, 'ok');
};

internals.loadGroupMenuItems = function (toolgroup, groupName, pluginType) {

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

        // load template

        var htmlPartial = window.recordTemplate({ record: record }); 

        groupDocumentation.push(htmlPartial); 
    };

    return groupDocumentation;
};

internals.generateSideMenu = function (groupName, groupRequestsObject, groupType) {

        var groupSideMenu = '';
        var groupSideMenuInternals = '';

        groupSideMenuInternals += '<li><a href="#">' + groupName.toUpperCase() + '</a>' +
            '<ul>' +
            internals.loadGroupMenuItems(groupRequestsObject, groupName, groupType) +
            '</ul>' +
            '</li>';

        requestsSideMenu = '<ul class="dropdown-menu">' + groupSideMenuInternals + '</ul>';

        return requestsSideMenu;
};

internals.insertHTML = function () {

    // insert requests

   async.each(
       internals.requests,
       function (group, next) {

           // insert sidemenu HTML

           $(".sidebar").append(group.sideMenuHTML);

           // insert group documentation records

           $("#wrap").append(group.records);
           next();
       },
       function (err) {

           // callback executed with tasks are complete. 

           // Set header for Tools in sidebar.


           internals.insertToolsHTML();
       });
};

internals.insertToolsHTML = function () {

    // insert tool bar header/title

    $(".sidebar").append('<h5>Tools</h5>');

    // insert requests

    async.each(
        internals.tools,
        function (group, next) {

            // insert sidemenu HTML

            $(".sidebar").append(group.sideMenuHTML);

            // insert group documentation records

            $("#wrap").append(group.records);
            next();
        },
        function (err) {

            // callback executed with tasks are complete. 

            internals.insertPromisesHTML();
        });
};

internals.insertPromisesHTML = function () {

   // insert requests

   async.each(
       internals.promises,
       function (group, next) {

           // insert sidemenu HTML

           $(".sidebar").append(group.sideMenuHTML);

           // insert group documentation records

           $("#wrap").append(group.records);
           next();
       },
       function (err) {

           // callback executed with tasks are complete. 

       });
};

internals.wrapToolsHTML = function (docs, callback) {

    // wrap documentation object HTML. 
    // process tools 

    var tools  = Object.keys(docs.tools);

    for (var i = 0; i < tools.length; ++i) {  

        // load tool group's documentation

        var docRecordsArray = internals.loadGroupDocumentation(docs.tools[tools[i]], tools[i], 'tools');

        // load sidebar menu html

        var sideMenuHTML = internals.generateSideMenu(tools[i], docs.tools[tools[i]], 'tools');

        var group = {
            name:  tools[i],
            records: docRecordsArray.toString(""),
            sideMenuHTML: sideMenuHTML
        };

        internals.tools.push(group);

    };

    internals.wrapPromisesHTML(docs, callback);
};


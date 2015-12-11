var internals = {};
internals.foundation = {};

var styles = {
    functionLink: {    
        color: '#4078c0',
        textDecoration: 'none',
        fontSize: '1.5em',
        fontWeight: 'bold' 
    },
    moduleName: {    
        color: '#000',
        textDecoration: 'none',
        fontSize: '2.0em',
        fontWeight: 'bold' 
    }
};

var ModuleFunction = React.createClass({

    rawMarkup: function () {
        var markup = this.props.comment;
        return { __html: markup };
    },

    render: function () {

        return (<div name="record">
            <div name="functionSignature">
                <a name="requests-user-test" style={styles.functionLink} href="#foundation--test">{this.props.name}{this.props.signature}</a>
                </div>
                <div name="comment markdown-body">
                    <span dangerouslySetInnerHTML={this.rawMarkup()} />
                 </div>
                </div>);

    }
});
var FoundationModule = React.createClass({

    render: function () {
    
        // keys

        var methods = [];
        var keys = Object.keys(this.props.module.methods);

        if (keys.length > 0) {
        
            keys.forEach(method => {
               
                methods.push(<ModuleFunction 
                                    name={this.props.module.methods[method].name}
                                    signature={this.props.module.methods[method].signature} 
                                    comment={this.props.module.methods[method].comment} 
                                    key={this.props.module.methods[method].name} 
                                    
                             />);
            });

            return (
                <div>
                    <h2>foundation.{this.props.moduleName}</h2>
                    {methods}
                </div>
            );
        }

        return (<div>Nothing to load.</div>);
    }
});

var FoundationModulesList = React.createClass({


    render: function() {
    
        // process each module in foundation group.

        var modules = [];
        var keys = Object.keys(this.props.modules);

        if (keys.length > 0) {
        
            keys.forEach(key => {

                modules.push(<FoundationModule 
                                    module={this.props.modules[key]} 
                                    moduleName={key} 
                                    key={key}
                                />);
            });

            return (<div>{modules}</div>);
        }

        return (<div>Nothing to load.</div>);
    }

});

var FoundationView = React.createClass({  

    allFoundations: [],

    loadModulesFromServer: function() {

        // this.setState({foundationModules: 'test'});

       $.ajax({
           url: 'docs',
           dataType: 'json',
           cache: false,
           success: function(data) {

               // key:  The key to dynamic updates is the call to this.setState().
               // src -- React Tutorial
               // this.setState({products: data});
               // this.allProducts = data;
                this.setState({foundationModules: data.docs.foundation});
           }.bind(this),
           error: function(xhr, status, err) {
               console.error(this.props.url, status, err.toString());
           }.bind(this)
       });
    },

    getInitialState: function() { 
        return {
            foundationModules: {} 
        }; 
    },

    componentDidMount: function() {
        this.loadModulesFromServer();
    },

    render: function() {         
        return (<div>
            <FoundationModulesList 
                modules={this.state.foundationModules} 
            />
            </div>); 
    }
}); 


// static
ReactDOM.render(
<FoundationView url="/docs" />,
    document.getElementById('foundationContainer')); 

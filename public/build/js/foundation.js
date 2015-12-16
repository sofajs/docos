'use strict';

var internals = {};
internals.foundation = {};

var styles = {
    contentsFunctionLink: {
        color: '#4078c0',
        textDecoration: 'none',
        fontSize: '1.0em',
        fontWeight: 'bold'
    },
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

var ContentsFunction = React.createClass({
    displayName: 'ContentsFunction',

    render: function render() {

        return React.createElement(
            'div',
            { name: 'record' },
            React.createElement(
                'div',
                { name: 'contentsFunctionSignature' },
                React.createElement(
                    'a',
                    { name: 'foundationContentsFunction', style: styles.contentsFunctionLink, href: "#foundation-" + this.props.name },
                    this.props.name,
                    this.props.signature
                )
            )
        );
    }
});

var ContentsModule = React.createClass({
    displayName: 'ContentsModule',

    render: function render() {
        var _this = this;

        // keys

        var methods = [];
        var keys = Object.keys(this.props.module.methods);

        if (keys.length > 0) {

            keys.forEach(function (method) {

                methods.push(React.createElement(ContentsFunction, {
                    name: _this.props.module.methods[method].name,
                    signature: _this.props.module.methods[method].signature,
                    key: _this.props.module.methods[method].name

                }));
            });

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'h3',
                    null,
                    'foundation.',
                    this.props.moduleName
                ),
                methods
            );
        }

        return React.createElement(
            'div',
            null,
            'Nothing to load.'
        );
    }
});

var TableOfContents = React.createClass({
    displayName: 'TableOfContents',

    render: function render() {
        var _this2 = this;

        // process each module in foundation group.

        var modules = [];
        var keys = Object.keys(this.props.modules);

        if (keys.length > 0) {

            keys.forEach(function (key) {

                modules.push(React.createElement(ContentsModule, {
                    module: _this2.props.modules[key],
                    moduleName: key,
                    key: key
                }));
            });

            return React.createElement(
                'div',
                null,
                modules
            );
        }

        return React.createElement(
            'div',
            null,
            'Contents Nothing to load.'
        );
    }
});

var ModuleFunction = React.createClass({
    displayName: 'ModuleFunction',

    rawMarkup: function rawMarkup() {
        var markup = this.props.comment;
        return { __html: markup };
    },

    render: function render() {

        return React.createElement(
            'div',
            { name: 'record' },
            React.createElement(
                'div',
                { name: 'functionSignature' },
                React.createElement(
                    'a',
                    { name: "foundation-" + this.props.name, style: styles.functionLink, href: "#foundation-" + this.props.name },
                    this.props.name,
                    this.props.signature
                )
            ),
            React.createElement(
                'div',
                { name: 'comment markdown-body' },
                React.createElement('span', { dangerouslySetInnerHTML: this.rawMarkup() })
            )
        );
    }
});

var FoundationModule = React.createClass({
    displayName: 'FoundationModule',

    render: function render() {
        var _this3 = this;

        // keys

        var methods = [];
        var keys = Object.keys(this.props.module.methods);

        if (keys.length > 0) {

            keys.forEach(function (method) {

                methods.push(React.createElement(ModuleFunction, {
                    name: _this3.props.module.methods[method].name,
                    signature: _this3.props.module.methods[method].signature,
                    comment: _this3.props.module.methods[method].comment,
                    key: _this3.props.module.methods[method].name

                }));
            });

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'h5',
                    null,
                    'foundation.',
                    this.props.moduleName
                ),
                methods
            );
        }

        return React.createElement(
            'div',
            null,
            'Nothing to load.'
        );
    }
});

var FoundationModulesList = React.createClass({
    displayName: 'FoundationModulesList',

    render: function render() {
        var _this4 = this;

        // process each module in foundation group.

        var modules = [];
        var keys = Object.keys(this.props.modules);

        if (keys.length > 0) {

            keys.forEach(function (key) {

                modules.push(React.createElement(FoundationModule, {
                    module: _this4.props.modules[key],
                    moduleName: key,
                    key: key
                }));
            });

            return React.createElement(
                'div',
                null,
                modules
            );
        }

        return React.createElement(
            'div',
            null,
            'Nothing to load.'
        );
    }

});

var FoundationView = React.createClass({
    displayName: 'FoundationView',

    allFoundations: [],

    loadModulesFromServer: function loadModulesFromServer() {

        // this.setState({foundationModules: 'test'});

        $.ajax({
            url: 'docs',
            dataType: 'json',
            cache: false,
            success: (function (data) {

                // key:  The key to dynamic updates is the call to this.setState().
                // src -- React Tutorial
                // this.setState({products: data});
                // this.allProducts = data;
                this.setState({ foundationModules: data.docs.foundation });
            }).bind(this),
            error: (function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }).bind(this)
        });
    },

    getInitialState: function getInitialState() {
        return {
            foundationModules: {}
        };
    },

    componentDidMount: function componentDidMount() {
        this.loadModulesFromServer();
    },

    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(TableOfContents, {
                modules: this.state.foundationModules
            }),
            React.createElement(FoundationModulesList, {
                modules: this.state.foundationModules
            })
        );
    }
});

// static
ReactDOM.render(React.createElement(FoundationView, { url: '/docs' }), document.getElementById('foundationContainer'));
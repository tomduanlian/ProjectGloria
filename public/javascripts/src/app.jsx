var $ = jQuery = require('../../libraries/jquery/dist/jquery');
var bootstrap = require('../../libraries/bootstrap-sass-official/assets/javascripts/bootstrap');
var React = require('react');
var ReactDom = require('react-dom');
var HelloWorld = require('./HelloWorld.jsx');

ReactDom.render(
    <HelloWorld />,
    document.getElementById('helloworld')
);
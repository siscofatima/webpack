// CommonJS style
/*require('./main.scss');

var sub = require('./sub');
var $ = require('jquery');
var moment = require('moment');
var app  = document.createElement('div');
app.innerHTML = '<h1>Hello World</h1>';
app.appendChild(sub());
document.body.appendChild(app);
$('body').append('<p>look at me! now is ' + moment().format() + '</p>');*/

// ES6 style
import './main.scss';
import generateText from './sub';
//import $ from 'jquery';
import './plugin.js';
import moment from 'moment';

let app  = document.createElement('div');
const myPromise = Promise.resolve(42);
myPromise.then((number) => {
  $('body').append('<p>promise result is ' + number + ' now is ' + moment().format() + '</p>');
  //call our jquery plugin!
  $('p').greenify();
});
app.innerHTML = '<h1>Hello World ES6</h1>';
document.body.appendChild(app);
app.appendChild(generateText());
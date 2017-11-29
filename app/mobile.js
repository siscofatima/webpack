import './main.scss';
//WAY 2 TO USE jQuery: using imports-loader
import $ from 'jquery';
import 'imports-loader?jQuery=jquery!./plugin.js';

$(document).ready(function() {
  let app  = document.createElement('div');
  app.innerHTML = '<h1>Hello World</h1>';
  document.body.appendChild(app);
  $('h1').greenify();
});
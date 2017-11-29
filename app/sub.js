// CommonJS style
/*function generateText() {
  var element = document.createElement('h2');
  element.innerHTML = "Hello my tiny little world";
  return element;
}

module.exports = generateText;*/

// ES6 style
export default function() {
  var element = document.createElement('h2');
  element.innerHTML = "Hello my tiny little world";
  return element;
}
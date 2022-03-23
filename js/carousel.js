var buttonRight = document.querySelectorAll('.nav-right')
for (var i = 0; i < buttonRight.length; i++) {
  buttonRight[i].addEventListener('click', function() {
    elements = this.parentNode.querySelector('ul')
    visible_elements = elements.querySelectorAll('.visible')

    var first_visible_element = visible_elements[0]
    var index_first_visible_element = Array.prototype.indexOf.call(elements.children, first_visible_element)

    if (index_first_visible_element + 4 < 7) {
      first_visible_element.classList.remove('visible')
      elements.querySelectorAll('li')[index_first_visible_element + 4].classList.add('visible')
    } 
  });
}

var buttonRight = document.querySelectorAll('.nav-left')
for (var i = 0; i < buttonRight.length; i++) {
  buttonRight[i].addEventListener('click', function() {
    elements = this.parentNode.querySelector('ul')
    visible_elements = elements.querySelectorAll('.visible')

    var last_visible_element = visible_elements[3]
    var index_last_visible_element = Array.prototype.indexOf.call(elements.children, last_visible_element)

    if (index_last_visible_element - 4 >= 0) {
      last_visible_element.classList.remove('visible')
      elements.querySelectorAll('li')[index_last_visible_element - 4].classList.add('visible')
    }
  });
}
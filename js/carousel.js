(function(){

  // right nav buttons
  var buttonRight = document.querySelectorAll('.nav-right')
  for (var i = 0; i < buttonRight.length; i++) {
    buttonRight[i].addEventListener('click', function() {

      elements = this.parentNode.querySelector('ul')
      visible_elements = elements.querySelectorAll('.visible')
      var first_visible_element = visible_elements[0]
      var index_first_visible_element = Array.prototype.indexOf.call(elements.children, first_visible_element)

      if (index_first_visible_element + NB_VISIBLE_BY_CATEGORY < 7) {
        // make first visible element hidden
        first_visible_element.classList.remove('visible')

        // make first hidden element visible
        elements.querySelectorAll('li')[index_first_visible_element + NB_VISIBLE_BY_CATEGORY].classList.add('visible')
      }
    });
  }

  // left nav buttons
  var buttonLight = document.querySelectorAll('.nav-left')
  for (var i = 0; i < buttonLight.length; i++) {
    buttonLight[i].addEventListener('click', function() {

      elements = this.parentNode.querySelector('ul')
      visible_elements = elements.querySelectorAll('.visible')
      var last_visible_element = visible_elements[NB_VISIBLE_BY_CATEGORY - 1]
      var index_last_visible_element = Array.prototype.indexOf.call(elements.children, last_visible_element)

      if (index_last_visible_element -  NB_VISIBLE_BY_CATEGORY>= 0) {
        // make last visible element hidden
        last_visible_element.classList.remove('visible')

        // make first hidden element visible
        elements.querySelectorAll('li')[index_last_visible_element - NB_VISIBLE_BY_CATEGORY].classList.add('visible')
      }
    });
  }

})()

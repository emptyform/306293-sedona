(function() {
  var navMain = document.querySelector('.main-nav');
  var navToggle = document.querySelector('.main-nav__toggle');

  navMain.classList.remove('main-nav--nojs');

  navToggle.addEventListener('click', function() {
    if (navMain.classList.contains('main-nav--closed')) {
      navMain.classList.remove('main-nav--closed');
      navMain.classList.add('main-nav--opened');
    } else {
      navMain.classList.add('main-nav--closed');
      navMain.classList.remove('main-nav--opened');
    }
  });
})();

if (window.location.href.indexOf("form") > -1) {
  (function() {
    var form = document.querySelector('.response-form');
    var successPopup = document.querySelector('.success-popup');
    var failurePopup = document.querySelector('.failure-popup');
    var closeBtn = [failurePopup.querySelector('.failure-popup__close-btn'),
                    successPopup.querySelector('.success-popup__close-btn')];
    var requiredFields = document.querySelectorAll('.response-form__required');
    var valid = true;
    var invalidFieldFirst;

    function popupClose() {
      closeBtn[+valid].focus();
      closeBtn[+valid].addEventListener('click', function() {
        if (valid) {
          successPopup.classList.remove('success-popup--opened');
          successPopup.classList.add('success-popup--closed');
        } else {
          failurePopup.classList.remove('failure-popup--opened');
          failurePopup.classList.add('failure-popup--closed');
          requiredFields[invalidFieldFirst].focus();
        }
        valid = true;
      });

      window.addEventListener('keydown', function(e) {
        if (e.keyCode == 27) {
          if (valid) {
            successPopup.classList.remove('success-popup--opened');
            successPopup.classList.add('success-popup--closed');
          } else {
            failurePopup.classList.remove('failure-popup--opened');
            failurePopup.classList.add('failure-popup--closed');
          }
          requiredFields[invalidFieldFirst].focus();
          valid = true;
        }
      });
    };

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var j = 0;
      for (var i = 0; i < requiredFields.length; i++) {
        if (!requiredFields[i].value) {
          valid = false;
          requiredFields[i].classList.add('response-form__required--show');
          j++;
          if (j == 1) {
            invalidFieldFirst = i;
          }
        }
      }
      if (valid) {
        successPopup.classList.remove('success-popup--closed');
        successPopup.classList.add('success-popup--opened');
      } else {
        failurePopup.classList.remove('failure-popup--closed');
        failurePopup.classList.add('failure-popup--opened');
      }
      popupClose();
    });

    requiredFields.forEach(element => {
      element.addEventListener('focus', function() {
        element.classList.remove('response-form__required--show');
      });
    });
  })();
}

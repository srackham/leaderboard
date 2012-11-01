var Toaster = (function($){

  /* Private variables and functions */

  var _defaults = {
    duration: 2000,  // Display time in milliseconds, set to 0 to make sticky.
    fadeout: 400,    // Fade out time in milliseconds.
    toastClass: '',  // Notification CSS class name, absence implies warning.
    toastCSS: {
      marginBottom: '8px'
    },
    containerCSS: {
      width: '300px',
      top: '12px',
      left: '12px',
      position: 'fixed',
      zIndex: 9999
    }
  };

  var _container; // Contains toast stack.

  // Does all the work.
  function _notify(message, title, options) {
    options = $.extend({}, _defaults, options);
    if (!_container) {
      _container = $('<div>').css(options.containerCSS).appendTo($('body'));
    }
    var toastElement = $('<div>')
      .addClass('alert')
      .addClass(options.toastClass)
      .css(options.toastCSS)
      .hover(
        function() { $(this).css({cursor: 'pointer'}); },
        function() { $(this).css({cursor: 'default'}); }
      );
    if (title) {
      var titleElement = $('<div>').css({fontWeight: 'bold'}).append(title);
      toastElement.append(titleElement);
    }
    if (message) {
      var messageElement = $('<div>').append(message);
      toastElement.append(messageElement);
    }
    if (options.duration > 0) {
      setTimeout(function() {
        toastElement.animate({ opacity: 0 }, options.fadeOut, function() {
          toastElement.remove();
        });
      }, options.duration);
    }
    toastElement.bind('click', function() {
      toastElement.remove();
    });
    //toastElement.append(textElement);
    _container.prepend(toastElement);
  }


  /* Public API */

  return {

    defaults: _defaults,

    // Display functions.
    info: function(message, title, options) {
      /*
      if (typeof title === 'object') {  // title is optional argument.
        options = title;
        title = undefined;
      }
      */
      _notify(message, title,
          $.extend({}, {toastClass: 'alert-info'}, options));
    },

    warning: function(message, title, options) {
      _notify(message, title, options);
    },

    error: function(message, title, options) {
      _notify(message, title,
          $.extend({}, {toastClass: 'alert-error'}, options));
    },

    success: function(message, title, options) {
      _notify(message, title,
          $.extend({}, {toastClass: 'alert-success'}, options));
    }
  };

}(jQuery));

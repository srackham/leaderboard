var Toast;
(function (Toast) {
    ;
    Toast.defaults = {
        width: '',
        displayDuration: 2000,
        fadeOutDuration: 800
    };
    function info(message, title, options) {
        _toast('info', message, title, options);
    }
    Toast.info = info;
    function warning(message, title, options) {
        _toast('warning', message, title, options);
    }
    Toast.warning = warning;
    function error(message, title, options) {
        _toast('error', message, title, options);
    }
    Toast.error = error;
    function success(message, title, options) {
        _toast('success', message, title, options);
    }
    Toast.success = success;
    var _container;
    function _toast(type, message, title, options) {
        if (typeof options === "undefined") { options = {
        }; }
        options = $.extend({
        }, Toast.defaults, options);
        if(!_container) {
            _container = $('#toast-container');
            if(_container.length === 0) {
                _container = $('<div>').attr('id', 'toast-container').appendTo($('body'));
            }
        }
        if(options.width) {
            _container.css({
                width: options.width
            });
        }
        var toastElement = $('<div>').addClass('toast').addClass('toast-' + type);
        if(title) {
            var titleElement = $('<div>').addClass('toast-title').append(title);
            toastElement.append(titleElement);
        }
        if(message) {
            var messageElement = $('<div>').addClass('toast-message').append(message);
            toastElement.append(messageElement);
        }
        if(options.displayDuration > 0) {
            setTimeout(function () {
                toastElement.fadeOut(options.fadeOutDuration, function () {
                    toastElement.remove();
                });
            }, options.displayDuration);
        }
        toastElement.on('click', function () {
            toastElement.remove();
        });
        _container.prepend(toastElement);
    }
})(Toast || (Toast = {}));
//@ sourceMappingURL=toast.js.map

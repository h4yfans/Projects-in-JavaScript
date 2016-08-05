/*
 *   name:       LinkIt
 *   author:     Kaan Karaca - h4yfans
 *   version:    0.1.0
 *   license:    MIT
 */

(function ($) {

    $.fn.linkIt = function (options) {
        // Default Setting
        var settings = $.extend({
            href: null,
            text: null,
            target: '_self'
        }, options);

        // Validation
        if (settings.href == null) {
            console.log("You need href option for LinkIt to work")
            return this;
        }

        return this.each(function () {
            var object = $(this);

            if (settings.text == null) {
                settings.text = object.text();
            }
            object.wrap('<a target="' + settings.target + '" href="' + settings.href + '"></a>').text(settings.text);
        });
    };


}(jQuery));
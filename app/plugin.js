(function ($) {
    const shade = "#00FF00";
    $.fn.greenify = function() {
        this.css( "color", shade );
        return this;
    };
}(jQuery));
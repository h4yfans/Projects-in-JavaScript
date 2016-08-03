/**
 * Created by Kaan on 3.08.2016.
 */
// Accordian
var action = "click";
var speed = "500";
$(document).ready(function () {
    // Question handler
    $('li.q').on(action, function () {

        // Get next element
        $(this).next()
            .slideToggle(speed)
            .siblings('li.a') // Select all other answers
            .slideUp();

        // Get image for active question
        var img = $(this).children('img');

        // Remove the 'rotate' class for all images except the active
        $('img').not(img).removeClass('rotate');

        // Toggle rotate class
        img.toggleClass('rotate');

    });
});
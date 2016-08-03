/**
 * Created by Kaan on 1.08.2016.
 */


// Search Handler
var nextPageToken;
var prevPageToken;

$(function () {
    var searchField = $('#query');
    var icon = $('#search-btn');

    // Focus Event Handler
    $(searchField).on('focus', function () {
        $(this).animate({
            width: '100%'
        }, 400);

        $(icon).animate({
            right: '10px'
        }, 400);
    });


    // Blur Event Handler
    $(searchField).on('blur', function () {
        if (searchField.val() === '') {
            $(searchField).animate({
                width: '45%'
            }, 400, function () {
            });

            $(icon).animate({
                right: '360px'
            }, 400, function () {
            });
        }
    });

    $('#search-form').submit(function (e) {
        e.preventDefault();
    });
});


function search() {
    // Clear Results
    $('#results').html('');
    $('#buttons').html('');


    // Get Form Input
    q = $('#query').val();

    // Run GET Request on API
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet, id',
            q: q,
            type: 'video',
            key: 'AIzaSyDPBzdtuZ9ocbJEdM326Aa6zB83S4wtdPw'
        },
        function (data) {
            nextPageToken = data.nextPageToken;
            prevPageToken = data.prevPageToken;

            // Log Data
            console.log(data);


            $.each(data.items, function (i, item) {
                // Get Output
                var output = getOutput(item);

                // Display Result
                $('#results').append(output);
            });

            var buttons = getButtons(prevPageToken, nextPageToken);

            // Display Buttons
            $('#buttons').append(buttons);
        }
    );
}


//Next Page Function
function nextPage() {
    var token = $('#next-button').data('token');
    var q = $('#next-button').data('query');

    // Clear Results
    $('#results').html('');
    $('#buttons').html('');



    // Get Form Input
    q = $('#query').val();

    // Run GET Request on API
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet, id',
            q: q,
            pageToken: token,
            type: 'video',
            key: 'AIzaSyDPBzdtuZ9ocbJEdM326Aa6zB83S4wtdPw'
        },
        function (data) {
            nextPageToken = data.nextPageToken;
            prevPageToken = data.prevPageToken;

            // Log Data
            console.log(data);
            console.log(nextPageToken);
            console.log(prevPageToken);

            $.each(data.items, function (i, item) {
                // Get Output
                var output = getOutput(item);

                // Display Result
                $('#results').append(output);
            });

            var buttons = getButtons(prevPageToken, nextPageToken);

            // Display Buttons
            $('#buttons').append(buttons);
        }
    );
}


//Prev Page Function
function prevPage() {
    var token = $('#prev-button').data('token');
    var q = $('#prev-button').data('query');
    console.log("prevpagegeldi");
    // Clear Results
    $('#results').html('');
    $('#buttons').html('');


    // Get Form Input
    q = $('#query').val();

    // Run GET Request on API
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet, id',
            q: q,
            pageToken: token,
            type: 'video',
            key: 'AIzaSyDPBzdtuZ9ocbJEdM326Aa6zB83S4wtdPw'
        },
        function (data) {
            nextPageToken = data.nextPageToken;
            prevPageToken = data.prevPageToken;

            // Log Data
            console.log(data);


            $.each(data.items, function (i, item) {
                // Get Output
                var output = getOutput(item);

                // Display Result
                $('#results').append(output);
            });

            var buttons = getButtons(prevPageToken, nextPageToken);

            // Display Buttons
            $('#buttons').append(buttons);
        }
    );
}

// Build Output
function getOutput(item) {
    var videoID = item.id.videoId;
    var title = item.snippet.title;
    var description = item.snippet.description;
    var thumb = item.snippet.thumbnails.high.url;
    var channelTitle = item.snippet.channelTitle;
    var videoDate = item.snippet.publishedAt;

    // Build Output String;
    var output = '<li>' +
        '<div class="list-left">' +
        '<img src="' + thumb + '">' +
        '</div>' +
        '<div class="list-right">' +
        '<a class="fancybox fancybox.iframe" href="https://youtube.com/embed/' + videoID + '"><h3>' + title + '</h3></a>' +
        '<small>By <span class="Title">' + channelTitle + '</span> on ' + videoDate + '</small>' +
        '<p>' + description + '</p>' +
        '</div>' +
        '</li>' +
        '<div class="clearfix"></div>' +
        '';



    return output;
}



// Build the buttons
function getButtons() {
    var btnOutput;
    if (!prevPageToken) {
        btnOutput = '<div class="button-container">' +
            '<button id="next-button" class="paging-button" data-token="' + nextPageToken + '" data-query="' + q + '"' +
            ' onclick="nextPage();">Next Page</button></div>';

    } else {
        btnOutput = '<div class="button-container">' +
            '<button id="prev-button" class="paging-button" data-token="' + prevPageToken + '" data-query="' + q + '"' +
            ' onclick="prevPage();">Prev Page</button>' +
            '<button id="next-button" class="paging-button" data-token="' + nextPageToken + '" data-query="' + q + '"' +
            ' onclick="nextPage();">Next Page</button></div>';
    }

    return btnOutput;
}


$(".fancybox").fancybox({
    type: 'iframe'
});
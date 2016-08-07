/**
 * Created by Kaan on 7.08.2016.
 */
$(document).one('pageinit', function () {
    //Display runs
    showRuns();


    // Add handler
    $('#submitAdd').on('tap', addRun);

    // Edit handler
    $('#submitEdit').on('tap', editRun);

    // Delete handler
    $('#stats').on('tap', '#deleteLink', deleteRun);


    // Set Current handler
    $('#stats').on('tap', '#editLink', setCurrent);

    // Clear handler
    $('#clearRuns').on('tap', clearRuns);


    /*
     * Show all rnns on homepage
     */
    function showRuns() {
        // Get runs object
        var runs = getRunsObject();

        // Check if empty
        if (runs != '' && runs != null) {
            for (var i = 0; i < runs.length; i++) {
                $('#stats').append('<li class="ui-body-inherit ui-li-static"><strong>Date: </strong>' + runs[i]["date"] +
                    '<br><strong>Distance: </strong>' + runs[i]["miles"] + ' km<div class="controls">' +
                    '<a href="#edit" id="editLink" data-miles="' + runs[i]["miles"] + '" data-date="' + runs[i]["date"] + '">Edit</a> | <a href="#" id="deleteLink" data-miles="' + runs[i]["miles"] + '" data-date="' + runs[i]["date"] + '" onclick="return confirm(\'Are you sure?\')">Delete</a> </div></li>');
            }

            $('#home').bind('pageinit', function () {
                $('#stats').listview('refresh');
            })
        }else{
            $('#stats').html('<p>You have no logeed runs</p>');
        }
    }

    /*
     * Add a run
     */
    function addRun() {
        // Get from values
        var miles = $('#addMiles').val();
        var date = $('#addDate').val();

        // Create 'run' object
        var run = {
            date: date,
            miles: parseFloat(miles)
        };

        var runs = getRunsObject();

        // Add run to runs array
        runs.push(run);
        alert('Run Added');

        // Set stringfied object to localStorage
        localStorage.setItem('runs', JSON.stringify(runs));

        // Redirect
        window.location.href = "index.html";
        return false;
    }


    /*
     * Edit run
     */
    function editRun() {
        // Get current data
        currentMiles = localStorage.getItem('currentMiles');
        currentDate = localStorage.getItem('currentDate');

        var runs = getRunsObject();

        // Loop through runs
        for (var i = 0; i < runs.length; i++) {
            if (runs[i].miles == currentMiles && runs[i].date == currentDate) {
                runs.splice(i, 1);
            }
            localStorage.setItem('runs', JSON.stringify(runs));
        }


        // Get from values
        var miles = $('#editMiles').val();
        var date = $('#editDate').val();

        // Create 'run' object
        var updateRun = {
            date: date,
            miles: parseFloat(miles)
        };


        // Add run to runs array
        runs.push(updateRun);
        alert('Run Updated');

        // Set stringfied object to localStorage
        localStorage.setItem('runs', JSON.stringify(runs));

        // Redirect
        window.location.href = "index.html";
        return false;
    }

    function clearRuns() {
        localStorage.removeItem('runs');
        $('#stats').html('<p>You have no logeed runs</p>')
    }

    /*
     * Delete run
     */
    function deleteRun() {
        // Set localStorage items
        localStorage.setItem('currentMiles', $(this).data('miles'));
        localStorage.setItem('currentDate', $(this).data('date'));

        // Get current data
        currentMiles = localStorage.getItem('currentMiles');
        currentDate = localStorage.getItem('currentDate');

        var runs = getRunsObject();

        // Loop through runs
        for (var i = 0; i < runs.length; i++) {
            if (runs[i].miles == currentMiles && runs[i].date == currentDate) {
                runs.splice(i, 1);
            }
            localStorage.setItem('runs', JSON.stringify(runs));
        }

        alert("Run Deleted");

        // Redirect
        window.location.href = "index.html";
        return false;
    }

    /*
     * Add a run object
     */
    function getRunsObject() {
        // Set runs array
        var runs = new Array();
        // Get current runs from localStorage
        var currentRuns = localStorage.getItem('runs');
        console.log(currentRuns);

        // Check localStorage
        if (currentRuns != null) {
            var runs = JSON.parse(currentRuns);
            console.log(runs);
        }

        // Return runs object
        return runs.sort(function (a, b) {
            return new Date(b.date - new Date(a.data));
        });
    }


    /*
     * Set the current clicked miles and date
     */
    function setCurrent() {
        // Set localStorage items
        localStorage.setItem('currentMiles', $(this).data('miles'));
        localStorage.setItem('currentDate', $(this).data('date'));

        // Insert form fields
        $('#editMiles').val(localStorage.getItem('currentMiles'));
        $('#editDate').val(localStorage.getItem('currentDate'));

    }


});
$(document).ready(function () {

    // Clicking on the Edit Button renderes the edit menu visible and actual note invisible
    $('.note-edit-button').click(function (e) {         
        $noteDiv = $( this ).parent().parent();
        $noteEditDiv = $noteDiv.next();

        $('.note').addClass('hidden');
        $noteEditDiv.removeClass('hidden');
    });
});
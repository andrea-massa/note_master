$(document).ready(function () {

    // Clicking on the Edit Button renderes the edit menu visible and all the other notes invisible
    $('.note-edit-button').click(function (e) {         
        // Show the current note in 'Edit Mode'
        $( this ).parent().parent().next().removeClass('hidden');

        //Hide all other notes
        $('.note').each(function (index, element) {
            $(this).addClass('hidden');            
        });                
    });
});
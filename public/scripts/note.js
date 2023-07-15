// Changes the note color whenever the user clicks on a color in the 
// color picker
function changeNoteEditColor(event){    
    console.log(' RUNNING edit');
    let color = $(this).val();
    //set the new note form to be that color
    $(this).parent().parent().parent().css('background-color', color);    
}


$(document).ready(function () {
    $('.note-edit-container form .d-flex .color-selector').change(changeNoteEditColor);

    // Clicking on the Edit Button renderes the edit menu visible and all the other notes invisible
    $('.note-edit-button').click(function (e) {         
        // Show the current note in 'Edit Mode'
        $( this ).parent().parent().next().removeClass('hidden');

        //Hide all other notes
        $('.note').each(function (index, element) {
            $(this).addClass('hidden');            
        });                
    });


    // // When modifying an existing note the confirm button should be able to be
    // // pressed only if the mofified content is not an empty string
    // $('.note-edit-container .note-title, .note-content').keyup(function(e) {
    //     if($(this).val() != ''){            
    //         $('.note-edit-form-button-container button').removeAttr('disabled');
    //     }        
    //     else{
    //         $('.note-edit-form-button-container button').attr('disabled', true);
    //     }
    // })    
});
// Disables the submit button if content of note is empty
// and show the title and color-selector only once user clicks/starts typing on take note    
function enableNoteSubmission(event){    
    $('#new-note-form #title').removeClass('hidden');
    $('#new-note-form .color-selector').removeClass('hidden');
    $('#new-note-form .color-selector').addClass('show');
    if($(this).val() != ''){
        $('#new-note-form button').removeAttr('disabled');
    }   
    else{
        $('#new-note-form button').attr('disabled', true);
        $('#new-note-form #title').addClass('hidden');            
        $('#new-note-form .color-selector').addClass('hidden');
        $('#new-note-form .color-selector').removeClass('show');        
    }     
}

// Changes the note color whenever the user clicks on a color in the 
// color picker
function changeNewNoteColor(event){    
    console.log('running new');
    // get the current color of the color picker
    let color = $('select[name="color"]').val();
    //set the new note form to be that color
    $('#new-note-form').css('background-color', color);    
}



$(document).ready(function () {    
    $('#new-note-form #content').click(enableNoteSubmission);      
    $('#new-note-form #content').keyup(enableNoteSubmission);                
    $('#new-note-form .color-selector').change(changeNewNoteColor);

    //When form is submitted, make sure that the values are set empty
    $('#new-note-form').submit(function (e) {     
        e.submit();        
        $('#new-note-form #content').val('');  
        $('#new-note-form #title').val('');
        $('#new-note-form #title').addClass('hidden');     
        $('#new-note-form #color-selector').addClass('hidden');  
    });
    

});


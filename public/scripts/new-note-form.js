$(document).ready(function () {

    // Show the title only once user clicks on take note    
    $('#new-note-form #content').click(function (e) {         
        $('#new-note-form #title').removeClass('hidden');
    }); 
    

    // Disables the submit button if content of note is empty
    $('#new-note-form #content').change(function (e) { 
        if($(this).val() != ''){
            $('#new-note-form button').removeAttr('disabled');
        }   
        else{
            $('#new-note-form button').attr('disabled', true);
            $('#new-note-form #title').addClass('hidden');            
        }     
    });

    //When form is submitted, make sure that the values are set empty
    $('#new-note-form').submit(function (e) {     
        e.submit();
        $('#new-note-form #content').val('');  
        $('#new-note-form #title').val('');
        $('#new-note-form #title').addClass('hidden');     
    });
    

});


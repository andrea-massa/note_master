$(document).ready(function () {

    // Disables the submit button if content of note is empty
    // and show the title and color-selector only once user clicks/starts typing on take note    
    $('#new-note-form #content').keyup(function (e) { 
        if($(this).val() != ''){
            $('#new-note-form #title').removeClass('hidden');
            $('#new-note-form .color-selector').removeClass('hidden');
            $('#new-note-form .color-selector').addClass('show');
            $('#new-note-form button').removeAttr('disabled');
        }   
        else{
            $('#new-note-form button').attr('disabled', true);
            $('#new-note-form #title').addClass('hidden');            
            $('#new-note-form .color-selector').addClass('hidden');
            $('#new-note-form .color-selector').removeClass('show');        
        }     
    });

    //When form is submitted, make sure that the values are set empty
    $('#new-note-form').submit(function (e) {     
        e.submit();
        $('#new-note-form #content').val('');  
        $('#new-note-form #title').val('');
        $('#new-note-form #title').addClass('hidden');     
        $('#new-note-form #color-selector').addClass('hidden');  
    });
    

});


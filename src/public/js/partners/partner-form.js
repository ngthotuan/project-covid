$(function () {
    $('#partner-form').validate({
        errorClass: 'help-block animation-slideDown',
        errorElement: 'div',
        errorPlacement: function (error, e) {
            e.parents('.form-group > div').append(error);
        },
        highlight: function (e) {
            $(e)
                .closest('.form-group')
                .removeClass('has-success has-error')
                .addClass('has-error');
            $(e).closest('.help-block').remove();
        },
        success: function (e) {
            e.closest('.form-group').removeClass('has-success has-error');
            e.closest('.help-block').remove();
        },
        rules: {
            code: {
                required: true,
                minlength: 3,
            },
            name: {
                required: true,
            },
        },
        messages: {
            code: {
                required: 'Please enter partner code',
                minlength: 'partner code must be at least 3 characters long',
            },
            name: {
                required: 'Please enter partner name',
            },
        },
    });
});

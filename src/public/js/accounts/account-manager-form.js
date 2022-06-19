$('#manager-form').validate({
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
        username: {
            required: true,
        },
        role: {
            required: true,
        },
        password: {
            required: true,
            minlength: 6,
        },
        confirmPassword: {
            required: true,
            minlength: 6,
            equalTo: '#password',
        },
    },
    messages: {
        username: {
            required: 'Please enter a username',
        },
        role: {
            required: 'Please select a role',
        },
        password: {
            required: 'Please enter a password',
            minlength: 'Your password must be at least 6 characters long',
        },
        confirmPassword: {
            required: 'Please enter a password',
            minlength: 'Your password must be at least 6 characters long',
            equalTo: 'Please enter the same password as above',
        },
    },
});

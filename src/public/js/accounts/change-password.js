$('#change-password-form').validate({
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
        oldPassword: {
            required: true,
        },
        newPassword: {
            required: true,
            minlength: 6,
        },
        confirmPassword: {
            required: true,
            minlength: 6,
            equalTo: '#newPassword',
        },
    },
    messages: {
        oldPassword: {
            required: 'Please enter your old password',
        },
        newPassword: {
            required: 'Please enter a new password',
            minlength: 'Your password must be at least 6 characters long',
        },
        confirmPassword: {
            required: 'Please enter a new password',
            minlength: 'Your password must be at least 6 characters long',
            equalTo: 'Please enter the same password as above',
        },
    },
});

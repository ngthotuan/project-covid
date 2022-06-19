$(document).ready(() => {
    const form = $('#form-create-password');

    $('#repeat_password').change(() => {
        $('.form-group').eq(1).removeClass('has-error');
        $('.form-group').eq(1).find('.help-block').remove();
    });

    form.validate({
        errorClass: 'help-block animation-slideDown',
        errorElement: 'div',
        errorPlacement: function (error, e) {
            e.parents('.form-group').append(error);
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
            password: {
                required: true,
                minlength: 5,
            },
            repeat_password: {
                required: true,
                minlength: 5,
            },
        },
        messages: {
            password: {
                required: 'Please enter your password',
                minlength: 'Your password must be at least 5 characters long',
            },
            repeat_password: {
                required: 'Please enter your password',
                minlength: 'Your password must be at least 5 characters long',
            },
        },
    });

    form.submit(() => {
        const password = $('#password').val();
        const repeatPassword = $('#repeat_password').val();

        if (password !== repeatPassword) {
            $('.form-group').eq(1).addClass('has-error');
            $('.form-group')
                .eq(1)
                .append(
                    `<div class="help-block animation-slideDown">Password do not match</div>`,
                );
            return false;
        }
        return true;
    });
});

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
            required: 'Vui lòng nhập mật khẩu cũ',
        },
        newPassword: {
            required: 'Vui lòng nhập mật khẩu mới',
            minlength: 'Tối thiểu 6 ký tự',
        },
        confirmPassword: {
            required: 'Vui lòng xác nhận mật khẩu mới',
            minlength: 'Tối thiểu 6 ký tự',
            equalTo: 'Mật khẩu mới không khớp',
        },
    },
});

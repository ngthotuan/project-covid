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
            required: 'Vui lòng nhập tên đăng nhập',
        },
        role: {
            required: 'Vui lòng chọn phân quyền',
        },
        password: {
            required: 'Vui lòng nhập mật khẩu',
            minlength: 'Tối thiểu 6 ký tự',
        },
        confirmPassword: {
            required: 'Vui lòng xác nhận mật khẩu',
            minlength: 'Tối thiểu 6 ký tự',
            equalTo: 'Mật khẩu xác nhận không khớp',
        },
    },
});

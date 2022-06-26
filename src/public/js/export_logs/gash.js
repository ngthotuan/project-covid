$(function () {
    $('#gash-form').validate({
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
            products: {
                required: true,
            },
            month: {
                require: true,
            },
        },
        messages: {
            products: {
                required: 'Please select products',
            },
            month: {
                require: 'Please input month format: YYYYMM, Ex: 202206',
            },
        },
    });
});

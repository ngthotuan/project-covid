$(function () {
    const form = $('#partner_account-form');

    $('.select-chosen').change(function () {
        validateSelect($(this));
    });

    form.validate({
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
            password: {
                required: true,
            },
        },
        messages: {
            username: {
                required: 'Please enter username',
            },
            password: {
                required: 'Please enter password',
            },
        },
    });
    form.submit(function () {
        let valid = true;
        $('.select-chosen').each(function () {
            if (!validateSelect($(this))) {
                valid = false;
            }
        });
        if (!valid) {
            return false;
        }
    });

    function validateSelect(select, message = 'Please select this field') {
        const formGroup = select.closest('.form-group');
        formGroup
            .removeClass('has-success has-error')
            .find('.help-block')
            .remove();

        if (!select.val()) {
            formGroup.addClass('has-error');
            select
                .closest('.form-group > div')
                .append(
                    `<div class="help-block animation-slideDown">${message}</div>`,
                );
            return false;
        }
        return true;
    }
});

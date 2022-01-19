$(function () {
    $('tbody').each(function () {
        let totalAmountItem = 0;
        $(this)
            .find('.amount-item')
            .each(function () {
                totalAmountItem += parseInt($(this).val());
            });
        $(this).find('.total-item-amount').text(totalAmountItem);
    });

    let total_amount = 0;
    $('.total-item-amount').each(function () {
        total_amount += parseInt($(this).text());
    });
    $('#total').text(total_amount);

    $('.input-quantity').on('change', function () {
        let quantity = $(this).val();
        let price = $(this)
            .parent()
            .parent()
            .find('td.text-center')
            .eq(0)
            .children('span')
            .text();

        let amount = quantity * price;
        $(this).parent().parent().find('input.amount-item').val(amount);
        let totalAmountItem = 0;
        $(this)
            .closest('tbody')
            .find('.amount-item')
            .each(function () {
                totalAmountItem += parseInt($(this).val());
            });
        $(this)
            .parent()
            .parent()
            .parent()
            .find('.total-item-amount')
            .text(totalAmountItem);
        let total_amount = 0;
        $('.total-item-amount').each(function () {
            total_amount += parseInt($(this).text());
        });
        $('#total').text(total_amount);
    });

    $('#btnSubmit').click(function (e) {
        const form = $('form')[0];
        if (form.checkValidity()) {
            $.ajax({
                url: '/api/patients/get-credit-remain',
                type: 'GET',
                success: function (data) {
                    if (data.success) {
                        const remain = data.data;
                        const total = $('#total').text();
                        if (remain >= total) {
                            $('#btnSubmit').attr('disabled', true);
                            $('#btnSubmit').text('Đang xử lý...');
                            $('#btnSubmit').addClass('disabled');
                            $('#totalAmount').val(total);
                            $('form').submit();
                        } else {
                            $('#message').text(
                                `Hạn mức còn lại của bạn là ${remain} VND. Bạn không đủ tiền để thanh toán`,
                            );
                            $('#alertModal').modal('show');
                        }
                    }
                },
            });
        } else {
            form.reportValidity();
        }
    });
});

$(function () {
    // init table
    App.datatables();
    $('#detail-account-history').dataTable({
        order: [[0, 'asc']],
        pageLength: 5,
        lengthMenu: [
            [5, 10, 20, -1],
            [5, 10, 20, 'Tất cả'],
        ],
    });
    $('#detail-hospital-history').dataTable({
        order: [[0, 'asc']],
        pageLength: 5,
        lengthMenu: [
            [5, 10, 20, -1],
            [5, 10, 20, 'Tất cả'],
        ],
    });
    $('#detail-parent').dataTable({
        order: [[0, 'asc']],
        pageLength: 5,
        lengthMenu: [
            [5, 10, 20, -1],
            [5, 10, 20, 'Tất cả'],
        ],
    });
    $('#detail-payment-history').dataTable({
        order: [[0, 'asc']],
        pageLength: 5,
        lengthMenu: [
            [5, 10, 20, -1],
            [5, 10, 20, 'Tất cả'],
        ],
    });
    $('#detail-related').dataTable({
        order: [[0, 'asc']],
        pageLength: 5,
        lengthMenu: [
            [5, 10, 20, -1],
            [5, 10, 20, 'Tất cả'],
        ],
    });
    $('#detail-status-history').dataTable({
        order: [[0, 'asc']],
        pageLength: 5,
        lengthMenu: [
            [5, 10, 20, -1],
            [5, 10, 20, 'Tất cả'],
        ],
    });
    $('#detail-buy-history').dataTable({
        order: [[0, 'asc']],
        pageLength: 10,
        lengthMenu: [
            [5, 10, 20, -1],
            [5, 10, 20, 'Tất cả'],
        ],
    });
    $('#user-notification').dataTable({
        order: [[3, 'desc']],
        pageLength: 10,
        lengthMenu: [
            [5, 10, 20, -1],
            [5, 10, 20, 'Tất cả'],
        ],
    });

    $('.dataTables_filter input').attr('placeholder', 'Tìm kiếm...');
});

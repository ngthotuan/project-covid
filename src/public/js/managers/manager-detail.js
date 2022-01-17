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
    $('.dataTables_filter input').attr('placeholder', 'Tìm kiếm...');
});

$(function () {
    // init table
    App.datatables();
    $('#detail-account-history').dataTable({
        order: [[2, 'desc']],
        pageLength: 10,
        lengthMenu: [
            [5, 10, 20, -1],
            [5, 10, 20, 'All'],
        ],
    });
    $('.dataTables_filter input').attr('placeholder', 'Search...');
});

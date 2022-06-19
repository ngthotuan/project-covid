$(function () {
    // init table
    App.datatables();
    $('#ecom-products').dataTable({
        columnDefs: [{ orderable: false, targets: [3] }],
        order: [[0, 'asc']],
        pageLength: 5,
        lengthMenu: [
            [5, 10, 20, -1],
            [5, 10, 20, 'Tất cả'],
        ],
    });
    $('.dataTables_filter input').attr('placeholder', 'Tìm kiếm...');
});

function showConfirmDelete(button) {
    const productId = $(button).parents('tr').find('td:first-child').text();
    const productName = $(button).parents('tr').find('td:nth-child(2)').text();
    $('#productId').text(productId);
    $('#productDeleteLink').attr('href', '/products/remove/' + productId);
    $('#productName').text(productName);
    $('#confirmDelete').modal('show');
}

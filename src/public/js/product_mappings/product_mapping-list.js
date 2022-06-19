$(function () {
    // init table
    App.datatables();
    $('#ecom-product_mappings').dataTable({
        columnDefs: [{ orderable: false, targets: [4] }],
        order: [[0, 'asc']],
        pageLength: 10,
        lengthMenu: [
            [5, 10, 20, -1],
            [5, 10, 20, 'All'],
        ],
    });
    $('.dataTables_filter input').attr('placeholder', 'Search...');
});

function showConfirmDelete(button) {
    const product_mappingId = $(button)
        .parents('tr')
        .find('td:first-child')
        .text();
    const product_mappingCode = $(button)
        .parents('tr')
        .find('td:nth-child(2)')
        .text();
    const product_mappingName = $(button)
        .parents('tr')
        .find('td:nth-child(3)')
        .text();
    $('#product_mappingId').text(product_mappingCode);
    $('#product_mappingDeleteLink').attr(
        'href',
        '/product_mappings/remove/' + product_mappingId,
    );
    $('#product_mappingName').text(product_mappingName);
    $('#confirmDelete').modal('show');
}

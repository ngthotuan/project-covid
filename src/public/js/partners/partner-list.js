$(function () {
    // init table
    App.datatables();
    $('#ecom-partners').dataTable({
        columnDefs: [{ orderable: false, targets: [3] }],
        order: [[0, 'asc']],
        pageLength: 5,
        lengthMenu: [
            [5, 10, 20, -1],
            [5, 10, 20, 'All'],
        ],
    });
    $('.dataTables_filter input').attr('placeholder', 'Search...');
});

function showConfirmDelete(button) {
    const partnerId = $(button).parents('tr').find('td:first-child').text();
    const partnerName = $(button).parents('tr').find('td:nth-child(2)').text();
    $('#partnerId').text(partnerId);
    $('#partnerDeleteLink').attr('href', '/partners/remove/' + partnerId);
    $('#partnerName').text(partnerName);
    $('#confirmDelete').modal('show');
}

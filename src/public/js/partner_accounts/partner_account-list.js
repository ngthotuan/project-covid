$(function () {
    // init table
    App.datatables();
    $('#ecom-partner_accounts').dataTable({
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
    const partner_accountId = $(button)
        .parents('tr')
        .find('td:first-child')
        .text();
    const partner_accountCode = $(button)
        .parents('tr')
        .find('td:nth-child(2)')
        .text();
    const partner_accountName = $(button)
        .parents('tr')
        .find('td:nth-child(3)')
        .text();
    $('#partner_accountId').text(partner_accountCode);
    $('#partner_accountDeleteLink').attr(
        'href',
        '/partner_accounts/remove/' + partner_accountId,
    );
    $('#partner_accountName').text(partner_accountName);
    $('#confirmDelete').modal('show');
}

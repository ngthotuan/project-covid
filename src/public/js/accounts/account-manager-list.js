/*
 *  Document   : ecomProducts.js
 *  Author     : pixelcave
 *  Description: Custom javascript code used in eCommerce Products page
 */

var EcomAccounts = (function () {
    return {
        init: function () {
            /* Initialize Bootstrap Datatables Integration */
            App.datatables();

            /* Initialize Datatables */
            $('#ecom-accounts').dataTable({
                columnDefs: [{ orderable: false, targets: [3] }],
                order: [[0, 'asc']],
                pageLength: 10,
                lengthMenu: [
                    [10, 20, 30, -1],
                    [10, 20, 30, 'All'],
                ],
            });

            /* Add placeholder attribute to the search input */
            $('.dataTables_filter input').attr('placeholder', 'Search');
        },
    };
})();

function showConfirmBlock(button) {
    const accountId = $(button)[0].id;
    const username = $(button).parents('tr').find('td:nth-child(2)').text();
    $('#accountBlockLink').attr('href', '/managers/block/' + accountId);
    $('#userName').text(username);
    $('#confirmBlock').modal('show');
}

function showConfirmUnBlock(button) {
    const accountId = $(button)[0].id;
    const username = $(button).parents('tr').find('td:nth-child(2)').text();
    $('#confirmUnBlockLink').attr('href', '/managers/un-block/' + accountId);
    $('#userNameUnBlock').text(username);
    $('#confirmUnBlock').modal('show');
}

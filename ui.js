$(document).ready(function() {
    $(document).on('click', '.category-btn', function() {
        $(this).next().toggle('fast');
    });

    $(document).on('click', '.coupon', function() {
        alert($(this).data('name'));
    });
});

$(document).ready(function() {
    $(document).on('click', '.category-btn', function() {
        $(this).next().toggle('fast');
    });

    $(document).on('click', '.coupon', function() {
        alert($(this).data('name'));
    });

    $(document).on('keypress', '#search-bar', function(event) {
        if (event.keyCode === 13)
            $('#search-button').click();
    });
});

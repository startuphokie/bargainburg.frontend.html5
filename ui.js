$(document).ready(function() {
    $(document).on('click', '.category-btn', function() {
        $(this).next().toggle('fast');
    });

    $(document).on('keypress', '#search-bar', function(event) {
        if (event.keyCode === 13)
            $('#search-button').click();
    });

    $(document).on('click', '.navbar-nav a', function() {
        $('#navbar-toggle').click();
    });

    $('.loading:first').hide();
});

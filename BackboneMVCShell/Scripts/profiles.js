
$(document).ready(function () {

    $("a[data='modalpopup']").click(function (e) {

        e.preventDefault();
        e.stopPropagation();

        $.get("/api/profile/" + $(this).parent().prop("id"), { cache: false }, function (result) {

            ProfileModal.boot(result);
        });
    });
});

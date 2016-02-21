$('#replyform').submit(function() {
    if ($.trim($("#name").val()) === "" || $.trim($("#email").val()) === "") {
        alert('you did not fill out one of the fields');
        return false;
    }
});
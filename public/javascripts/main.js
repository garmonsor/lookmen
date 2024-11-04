$(document).ready(function () {
    let $form = $('#form');
    let $prompt = $('#prompt');
    let $submit = $('#submit');
    let $result = $('#result');

    $submit.on('click', function (e) {
        e.preventDefault();
        let data = {};
        data.prompt = $prompt.val();
        $.post("/", data,
            function (data, textStatus, jqXHR) {
                console.log(data);
                $result.html(data.response); // This will now render the formatted Markdown
            },
            "json"
        );
    });

    $form.on('submit', function (e) {
        e.preventDefault();
    });
});

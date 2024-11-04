$(document).ready(function () {
    let $form = $('#form');
    let $prompt = $('#prompt');
    let $submit = $('#submit');
    let $result = $('#result');
    let $copy = $("#copy")
    $copy.hide()

    $submit.on('click', function (e) {
        e.preventDefault();
        let data = {};
        data.prompt = $prompt.val();
        $.post("/", data,
            function (data, textStatus, jqXHR) {
                console.log(data);
                let response = data.response;
                $result.html(response);  
                $copy.show()
                Prism.highlightAll();  // This will apply to all code blocks on the page
            },
            "json"
        );
    });

    $form.on('submit', function (e) {
        e.preventDefault();
    });

    $copy.click(function (e) { 
        e.preventDefault();
        copyInnerContent("code")
    });

    
});

function copyInnerContent(selector) {
    const $element = $(selector); // Get the element(s) using the selector

    // Use the Clipboard API to copy the text content
    navigator.clipboard.writeText($element.text())
        .then(() => {
            alert('Text has been copied to the clipboard.');
        })
        .catch(err => {
            console.error('Failed to copy text: ', err);
        });
}
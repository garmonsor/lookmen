$(document).ready(function () {
    let $form = $('#form');
    let $prompt = $('#prompt');
    let $submit = $('#submit');
    let $result = $('#result');
    let $copy = $("#copy");
    $copy.hide();

   
    $submit.on('click', function (e) {
        e.preventDefault();
        let data = { prompt: $prompt.val() };
        $submit.prop('disabled', true);
        $submit.html(' <progress class="circle small"></progress>');
        // Send POST request to the server
        $.post("/", data, function (data) {
           
            $submit.prop('disabled', false);
            $submit.html('<i>arrow_upward</i>');
            // On successful response
            let response = data.response;
            $result.html(response); // Replace skeleton with actual content

            // Add the 'code' class to the 'code' elements after content is inserted
            $('code').addClass('code');

            // Make sure PrismJS highlights the code
            Prism.highlightAll(); 

            // Show the copy button
            $copy.show();
            $('code').attr('id', 'code-content');
        }, "json")
        .fail(function (jqXHR, textStatus, errorThrown) {
            // Handle errors from the backend
            $result.html(`<p class="error">An error occurred: ${jqXHR.responseJSON?.error || "Please try again."}</p>`);
            $copy.hide();  // Hide the copy button if there's an error
            console.error("Request failed:", textStatus, errorThrown);
            $submit.prop('disabled', false);
            $submit.html('<i>arrow_upward</i>');
        });
    });

    $form.on('submit', function (e) {
        e.preventDefault();
    });

    new ClipboardJS('#copy');

    $copy.click(function(e) {
        e.preventDefault();

        // Set the button to show "Copied" with a check icon
        $copy.html('<i class="fas fa-check"></i> Copied');

        // Reset back to "Copy Code" with the copy icon after 3 seconds
        setTimeout(() => {
            $copy.html('<i class="fas fa-copy"></i> Copy Code');
        }, 3000);
    });

    // Initial state with "Copy Code" and the copy icon
    $copy.html('<i class="fas fa-copy"></i> Copy Code');

    // Function to auto-resize the textarea
    function autoResize() {
        $prompt.height(0); // Reset height to calculate the new height correctly
        const scrollHeight = $prompt[0].scrollHeight; // Get the scrollable height
        $prompt.height(Math.min(scrollHeight, 200)); // Set height with max limit
    }

    // Bind autoResize to input events
    // $prompt.on('input', autoResize);

    
});

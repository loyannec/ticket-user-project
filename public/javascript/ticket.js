$(() => {
    const ticketId = window.location.pathname.split('/')[2];
    const commentInput = $('#commentInput');

    $('#addCommentButton').click(addComment);

    commentInput.keypress((event) => {
        const enterKey = 13;
        if (event.which === enterKey) {
            addComment();
        }
    });

    function addComment() {
        const comment = commentInput.val().trim();
        $.post(`/ticket/${ticketId}/comment`, { comment }, (data, status) => {
            if (status !== 'success') return;
            $('#previous-comments').append(data);
            commentInput.val('');
        });
    }
});

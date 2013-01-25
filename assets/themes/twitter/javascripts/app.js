$(document).ready(function() {
  $('.oembed').each(function (i) {
    $(this).oembed(
      $('a', this).attr('href'),
      {
        youtube: { maxWidth: 620 },
        vimeo:   { maxWidth: 620 }
      }
    );
  });
});

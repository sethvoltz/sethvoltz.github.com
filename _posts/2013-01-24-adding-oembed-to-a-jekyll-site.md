---
layout: post
title: "Adding oEmbed to a Jekyll Site"
description: ""
category: code
image: adding-oembed-to-a-jekyll-site
attribution: http://www.flickr.com/photos/lwr/4187885866/
tags: [jekyll, javascript, jquery, maruku, markdown]
---
{% include JB/setup %}

Success! I recently heard about this cool protocol called [oEmbed][] that allows a link to
effectively self-describe how it should be embedded into a web page if it is some kind of media
content. The catch to add it to this blog was that I couldn't run any Jekyll Plugins on it as it is
hosted by GitHub and they don't allow them for security and sandboxing reasons.

[oembed]: http://oembed.com

However, a quick search led me to a nice [jQuery][] [plugin][] that does the same thing. The next
hurdle was to figure out how exactly I was going to reference the specific links I wanted to make
embeddable within my markup. Jekyll uses [Markdown][], which does not on its own offer any way of
doing this outside of writing raw HTML in your document. Blech. However, Jekyll uses the wonderful
[Maruku][] Markdown Superset interpreter and that comes with a number of fantastic additions,
including two important ones: The ability to specify class and ID names for certain elements, and
content grouping through a div syntax. Put those together with an anchor markup and you get
something like this:

    | [Maruku DIV Syntax](http://maruku.rubyforge.org/div.html)
    {:.oembed}

[jquery]: http://jquery.com
[plugin]: http://code.google.com/p/jquery-oembed/
[markdown]: http://daringfireball.net/projects/markdown/
[maruku]: http://maruku.rubyforge.org

Perfect! It even looks nice and semantic on the text side. After dropping jQuery and jQuery-oEmbed
onto the end of my page layout, I call this code:

{% highlight javascript %}
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
{% endhighlight %}

That finds all the `.oembed` divs, iterates over them and replaces their contents with the embed
content from the link within. Nice! I also added a couple custom requirements for video files to not
exceed 620px, which is the width of the content area.

* * *

Demo time! Here is a YouTube video that was featured earlier this week on Hack A Day:

| [Retrotacular](http://www.youtube.com/watch?v=cZwq1KL4SD0)
{:.oembed}

And a Flickr embed of a 3D printed espresso tamper my friend did last week.

| [Phototastic](http://www.flickr.com/photos/openfly/8390248035/in/photostream/)
{:.oembed}

And a tweet I put up teasing Pebble while I wait for my watch.

| [Pebble Tweet](https://twitter.com/sethvoltz/status/294349467388358657)
{:.oembed}

Not bad. Not bad at all.

* * *

**Update 1:** Added a twitter embed.

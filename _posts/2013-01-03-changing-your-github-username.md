---
layout: post
title: "Changing your GitHub username"
description: ""
category: code
image: changing-your-github-username
attribution: http://www.flickr.com/photos/othree/5229266978/
tags: [sed, grep, xargs, locate, unix, osx, github, example]
---
{% include JB/setup %}

I recently changed my GitHub username to my name in my continual effort to bring services I care
about around to that naming scheme. GitHub is great in that they let you change your username at
all, with the caveat that you can only do it once. Additionally, when you switch names, your old
account will go 404 and you have to manually update `origin`'s URL on all existing clones.

This could have been a nightmare but luckily, the more I learn about standard bundled Unix commands,
the easier these tasks become. So, here is what I ended up doing:

{% highlight bash %}
$ locate .git/config \
  | xargs grep -l "github.com:tauceti" 2> /dev/null \
  | xargs sed -i -e 's/github.com:tauceti/github.com:sethvoltz/'
{% endhighlight %}

Let's break this down:

First I started with a search of the entire system for files with the path `.git/config`. I didn't
want to look for just files named `config` as I have lots of them that have nothing to do with Git
repositories. I could have used something like `find(1)` here but I must admit I still haven't
mastered it the way I'd like and in OS X `locate(1)` comes bundled and works great. Work with what
you know, right?

Next, pass that list, via `xargs(1)`, into grep to search for the old github domain and username.
For those sharp-eyed readers, this will only work with SSH-based clones but that's fine because
that's the way I prefer to pull them down and avoid the HTTPS method. I also noticed during my tests
that some of the files returned by `locate(1)` were throwing errors when passed to `grep(1)` (spaces
in filenames most likely, I keep my code checkouts in space-free paths so I could safely disregard
these without further inspection) so I passed standard error to `/dev/null` to keep the output
clean.

Lastly, I use `xargs(1)` again to pass the filename into `sed(1)` and performed the simplest
substitution with the `-i` "in place" flag to instruct it to open the file, make the changes, and
save them out to the same location.

And that's it. Super simple and very fast. The longest part of the whole exercise was checking my
searches were returning the data I desired before tacking on the potentially destructive `sed(1)`
filter.

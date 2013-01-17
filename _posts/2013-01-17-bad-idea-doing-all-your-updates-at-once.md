---
layout: post
title: "Bad Idea: Doing All Your Updates At Once"
description: "“So, I have this great idea!” – Famous last words."
category: rants
tags: [bad-ideas, pow, rbenv, rails]
---
{% include JB/setup %}

The title says it all. I had just completed a milestone in my code and thought, "Hey, there are a
few security patches available for Rails, what a perfect time to upgrade." So I did what has become
automatic behavior at this point: pop open a terminal and type `brew update && brew outdated`

"Oh, look," I said to myself, "I can update rbenv, ruby-build, nginx, git and mercurial as well!"

_Bad idea..._

A quick trip to the coffee pot and a little compiling later, all the updates were completed. Yay. My
apps were humming along fine and everything seemed to Just Work™ Then it happened. Everything
stopped working. Why? Pow seemed to no longer understand that I wanted to use Ruby 1.9 for my app
and insisted on loading Ruby 1.8. Meanwhile in my terminal everything loaded properly. What gives?!

By now you can see why doing all the updates at once was a terrible decision. Which one of them was
the culprit? Why did it suddenly happen at this very moment after everything seemed to have been
working just moments before? I was in for a lot of poking and checking and searching. Here's what I
ended up doing (short version) and what eventually was the ultimate culprit and how I fixed it.
Hopefully this write-up will help someone else, should they find themselves in the same situation.

* First, check that everything is actually working in the terminal. `rails c`, no errors. `rails s`
  loads, site functions fine.
* Run through installed Ruby Gems. Look for outdated ones that may be incompatible, get the latest
  ones installed and run `bundle upgrade` so it can rewrite `Gemfile.lock`. Restart the app. Still
  nothing.
* Start looking into `.powconfig` to see if anything has changed. Hmm, looks like I can use the new
  `rbenv root` command to avoid hard coding my home directory path. Nice. Still no luck.
* Find out that because I'm using [Homebrew][] to manage my rbenv and ruby-build installs, I need to
  actually reference `brew --prefix rbenv` for the bin directory, while the shims directory remains
  in my home directory. Update, restart Pow. Nothing.
* Reboot the machine, walk away to clear head, go to geeky meetup, have lots of beer.

_The next morning._

* `$PATH` has my shims directory in it twice, look through ZSH configs. Find I had manually added it
  to the path when I originally switched to ZSH from a recommendation found online. Removed that.
* Kept digging through configs, found an rbenv method that was supposed to make it work in
  non-interactive shells. Maybe that's the culprit! Removed, restarted Pow, nothing.
* Felt like I was going in the right direction, dug for more duplication, cleaned up configs, made
  my dotfiles better... still no love.
* Opened a new terminal and randomly decided to type `rbenv version` (even though I know what
  version is running as it's displayed in my prompt) and saw
      1.8.7-p370 (set by /Users/seth/.rbenv-version)
  Hmm, the latest rbenv prefers the more portable `.ruby-version` files. Let's update that. `rm
  .rbenv-version`...

For giggles I restarted Pow, loaded the site... and it worked. And fast (hurray for Rails update?)
Huh, maybe there's a bug with using the old .rbenv-version file but just to check, `rbenv local
1.8.7-p370`, restart Pow, fail. So there it is. Finally found.

I haven't dug into the code to figure out why this is yet but it now seems rbenv chooses the
.ruby-version file in home instead of the one in your project directory. The only fix I found was to
simply not use a local version file in your home directory.

_Mystery Solved._

---

Silver lining: I made a bunch of little tweaks and changes to my dotfiles, removed redundancy and
overall my apps and terminal feel faster from it. Yay.

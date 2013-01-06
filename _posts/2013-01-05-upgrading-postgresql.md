---
layout: post
title: "Notes on Upgrading PostgreSQL"
description: ""
category: software
tags: [software, postgresql, upgrade, osx, homebrew, technote]
---
{% include JB/setup %}

I recently performed an upgrade on my development [PostgreSQL][] server and found the information
harder to get together than the actual process. There were a number of steps that were not
immediately obvious to me from a [MySQL][] background. The following is a quick overview from my
notes, which I will expand and attempt to keep up to date as caveats and changes are discovered from
future updates.

My current development environment is [Mac OS X][] Mountain Lion using the fantastic [Homebrew][] as
my package manager.

[postgresql]: http://www.postgresql.org
[mysql]: http://www.mysql.com
[mac os x]: http://www.apple.com/osx/
[homebrew]: http://mxcl.github.com/homebrew/

{% highlight bash %}
$ brew update
$ psql --version # «OLD_VERS»
$ launchctl unload ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist
$ mv /usr/local/var/postgres /usr/local/var/postgres.old
$ brew upgrade postgresql
$ psql --version # «NEW_VERS»
$ initdb /usr/local/var/postgres -E utf8
$ pg-upgrade --old-datadir /usr/local/var/postgres.old                 \
             --new-datadir /usr/local/var/postgres                     \
             --old-bindir  /usr/local/Cellar/postgresql/«OLD_VERS»/bin \
             --new-bindir  /usr/local/Cellar/postgresql/«NEW_VERS»/bin
$ ./delete_old_cluster.sh
$ launchctl load ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist
$ ./analyze_new_cluster.sh
$ brew cleanup postgresql
{% endhighlight %}

Also worth mentioning these particular notes about PostgreSQL as they're mildly related:

* When in doubt, check the logs: `/usr/local/var/postgres/server.log`
* If you ever forget where the logs or the data, lib or bin directories are, check out the
  LaunchAgent plist file as it has those as parameters:
  `~/Library/LaunchAgent/homebrew.mxcl.postgresql.plist`
* If you ever think PostgreSQL should be running but it's not, the logs will likely mention
  something about it thinking there is already an instance running. This probably means there is a
  leftover PID file in the data directory: `/usr/local/var/postgres/postmaster.pid`

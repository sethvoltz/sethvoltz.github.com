---
layout: post
title: "Pay it Forward: New System Setup Notes"
description: ""
category: pay-it-forward
tags: [system, setup, redhat, mysql, ruby, notes]
---
{% include JB/setup %}

In this new series of posts I'm calling "Pay it Forward", I am attempting to publish notes that I
keep on performing common but involved tasks in the hopes that they will help other people, as well
as be a resource for myself the next time I need to do it.

In this installment, I will be guiding the reader through the installation and setup of a Linux
server with a configurable version of Ruby, and recent versions of MySQL. My current server
environment is RedHat-based (Fedora) so the commands below that interact with the package manager
use `yum`. Look for updates that include `apt` instructions as I have recently started diving into
Debian with the Raspberry Pi.

## Conventions

In the shell code snippets below, I will use the following conventions at the
beginning of a line:

* `%` means the command is to be executed as root
* `$` means the command may be executed as a normal user.
* `>` means the line is to be interpreted as contents of a file opened on the line before

Most root commands can be executed under `sudo`, and it is recommended that the follower of this
guide take that route.

**Note:** For those wondering why I used `%`, instead of `#`, it's because the syntax highlighting
treats the hash as a comment mark.

## Packages

I prefer to start with as bare-bones an OS install as possible. In the case of Fedora, I use a
"nobase" install from a kickstart script. From here, I can build up just the packages I need and
nothing else.

{% highlight bash %}
% yum install yum-plugin-fastestmirror yum-presto
% yum install tar make unzip gcc zlib-devel readline-devel openssl-devel git \
  patch automake gcc-c++ kernel-devel bind-utils wget whois vim
{% endhighlight %}

## System Essentials

If this server is going into production, it is a good idea to disallow root login via the network.
This should be something that can only be done while physically present at the machine. All remote
access should be accomplished through another user account with `sudo` privileges, which they must
use in order to perform sensitive actions. Here is a simple administrator setup to get you started.

{% highlight bash %}
% useradd -c "Administrator" -G wheel admin
% $EDITOR /etc/ssh/sshd_config
> PermitRootLogin no
% systemctl restart sshd.service
{% endhighlight %}

## Ruby Setup

In my local development, I use the fantastic [rbenv][] and [ruby-build][] packages in order to
install and set a shell-local ruby version custom for the task or codebase at hand. This allows me
to use an old version of Ruby for legacy code and play with the latest versions on toy projects. On
a production server, however, I prefer to install just one version, the exact version that the
target code requires. To that end, I install just `ruby-build` and then use it to do a system-wide
installation.

[rbenv]: https://github.com/sstephenson/rbenv
[ruby-build]: https://github.com/sstephenson/ruby-build

{% highlight bash %}
% git clone https://github.com/sstephenson/ruby-build.git /usr/local/ruby-build
% $EDITOR /etc/profile.d/ruby-build.sh
> pathmunge "/usr/local/ruby-build/bin"
{% endhighlight %}

Reload your shell in order to get `ruby-build` munged into your path.

{% highlight bash %}
% ruby-build install «version»
% gem update --system
% gem install rake bundler --no-rdoc --no-ri
{% endhighlight %}

**Note:** If you are installing Ruby version 1.8.7 on a Fedora server, be sure to apply [this
patch][ruby-patch], otherwise you will get errors when trying to run your scripts. The patch is
specifically for ruby-1.8.7-p358, but all occurances of "358" may be replaced with "370" in order to
use the later version.

[ruby-patch]: https://gist.github.com/2159108

## MySQL Setup

If your application requires a SQL-style database, it's hard to beat the simplicity of MySQL for
both setup and use. While I have been [learning more about PostgreSQL][postgres-article] recently
for its powerful features, I still find MySQL to be a great starting point.

[postgres-article]: /software/2013/01/05/upgrading-postgresql

{% highlight bash %}
% yum install mysql-server mysql-devel
% chkconfig --level 24 mysqld on
% systemctl start mysqld.service
% mysqladmin -uroot -h `hostname` password «new password»
% mysqladmin -uroot -h localhost password «new password»
% mysql -uroot -p mysql
> delete from user where User='';
> exit
{% endhighlight %}

Great, now we have a basic database server setup with the anonymous user removed and a password set
for the root user. Let's go ahead and create a new database for our application to use, as well as a
non-root user which will only have permissions for this database.

{% highlight bash %}
% mysqladmin -uroot -p «database name»
% mysql -uroot -p
> create user '«username»'@'localhost' identified by '«password»';
> grant all privileges on «database name».* to '«username»'@'localhost';
> flush privileges;
> exit
{% endhighlight %}

You can test this user out with a quick call to `mysql -u«username» -p` to make sure the password
works.

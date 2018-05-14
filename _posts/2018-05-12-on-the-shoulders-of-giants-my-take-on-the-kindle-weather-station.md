---
layout: post
title: "On the Shoulders of Giants: My Take on the Kindle Weather Station"
description: ""
category: 
image: on-the-shoulders-of-giants-my-take-on-the-kindle-weather-station
tags: []
---
{% include JB/setup %}

<div class="alert alert-warning">
<strong>Update:</strong>
I have started a new <a href="https://github.com/sethvoltz/kindle-weather">Github repo</a> with my
changes to the scripts used below. This has three purposes: 1) to keep a backup of the various
jailbreak tools I used in case the forums go down; 2) improve the setup process from the many steps
below to something a bit more automated; and 3) to push me to further customize the scripts and
display to fit my desires. Eventually I would like to pull real weather readings from my house and
plot those up on the display.
</div>

I recently discovered how close the local [recycling drop-off site][recycle] is for the San
Francisco bay when a family member gave us an old bum TV that I thought I could do something with.
It turned out that it wasn't as great as I hoped, so it was up to me to get it to the dump. While
dropping it off, I noticed a familiar shape in the nearly empty bin where I was dropping the TV: An
old Kindle e-reader. It looked like the same generation as the Kindle DX I have in a box somewhere,
and seemed to be in good condition, if not a bit dirty.

[recycle]: https://www.recyclewhere.org/vendor/recology-san-francisco-public-recycling-and-disposal-drop-0

I decided to take a chance and bring it home. Worst case, it just ends up back in the same bin a
couple weeks later. A quick plug in at home, and about 2 hours for it to come back to life, and I
had a fully functional Kindle, books included. Now what to do with it? Well, a few years back, my
good friend used his DX to build a weather station based on the work of [Matt Petroff][petroff] back
in 2012. This is something I've wanted to do for a while but other projects got in the way. With a
day to kill and nothing stopping me, I decided to go for it.

[petroff]: https://mpetroff.net

So, here is my take on the weather station. For now, the displayed image is nothing more than using
another image generator from [Jennifer Oslund at shatteredhaven.com][oslund]. However, where I do
differ is, I wanted to offer back to the community that I am benefiting from, a complete
step-by-step instruction set for going from Kindle 2 to Raspberry Pi + Kindle weather display. I
went into this with the intent of providing credit for everything I leveraged, including where I
made modifications. If I missed something, let me know in the comments!

[oslund]: http://www.shatteredhaven.com

_**Alrighty, let's dig in!**_

<div class="alert alert-warning">
<strong>Note:</strong>
The instructions below are specific to the Kindle 2 that I found. If you have a Kindle 3, 4, or any
of the Paperwhite models, please read into the linked forum threads for more info on what to do for
that hardware. Generally, the community has been super-duper helpful in providing all the info
needed, and for the Paperwhite models, it's even easier than listed her. Again, check the forums for
full details.
</div>

## The Jailbreak Itself

_Note: We can't use Kite on Kindle 2, as it doesn't seem to be supported._

* [Check out the jailbreak forum][jailbreak-forum] and Download
  [kindle-jailbreak-0.13.N.zip][jailbreak-link]
* Follow [these instructions][jailbreak-instructions], TL;DR:
  * Unzip, plug in the kindle, wait for the drive to mount
  * Drag "Update_jailbreak_0.13.N_k2_install.bin" into the root of the Kindle drive, eject
  * On you Kindle, go to Settings, press Menu and select Update Your Kindle
  * Wait for it to finish. Note: On Kindle 2, it is expected for it to "fail" with error "U006"
* Install MKK (Mobileread Kindle Kit) as a prerequisite for KUAL
  * Go to [the forum][mkk-forum] and download [kindle-mkk-20141129.zip][mkk-link]
  * Installation is as normal: Mount, drag installer, unmount, update, reboot
* Install KUAL (Kindle Unified Application Launcher)
  * Go to [the forum][kual-forum] and download [KUAL-v2.7.zip][kual-link]
  * First, unpack the KUAL-v2.7.zip from above. Then, use the KUAL-KDK-1.0.azw2 file
  * Install by putting the appropriate azw2 file somewhere in the documents/ directory tree of your device
* Install USB Networking
  * Download [kindle-usbnetwork-0.57.N-k2.zip][usbnetwork-link] from the same jailbreak forum
    above
  * Install as normal (mount, drag, unmount, update, reboot)

[jailbreak-forum]: https://www.mobileread.com/forums/showthread.php?t=88004
[jailbreak-link]: https://www.mobileread.com/forums/attachment.php?attachmentid=141327&d=1440341398
[jailbreak-instructions]: https://kindlevsmac.wordpress.com/2011/10/08/how-to-jailbreak-you-kindle/
[mkk-forum]: https://www.mobileread.com/forums/showthread.php?t=233932
[mkk-link]: https://www.mobileread.com/forums/attachment.php?attachmentid=141189&d=1439936584
[kual-forum]: https://www.mobileread.com/forums/showthread.php?t=203326
[kual-link]: https://www.mobileread.com/forums/attachment.php?attachmentid=150366&d=1469125585
[usbnetwork-link]: https://www.mobileread.com/forums/attachment.php?attachmentid=141338&d=1440341462

## SSH Networking

### Kindle side:

* Launch KUAL by selecting it like a normal e-book from the Kindle's main UI
* Unplug USB cable from the Kindle _(disconnecting from laptop-side won't work)_
* Navigate to USB Networking: enable networking, enable SSH at boot
* Quit KUAL, plug the USB back in and it should _not_ mount the USB drive -- USB networking is up

### Computer side:

To test the networking is up, let's first check from our main computer. I will breeze over this,
since it depends on your OS. Here are the settings to change for the "USB Gadget" device. We will
get into the specifics of setting this up on the Raspberry Pi itself in a bit. If you're on Linux,
those might work for you here as well.

* Set up a manual network on the USB interface
    * IP: `192.168.2.1`
    * Mask: `255.255.255.0`
* SSH to `ssh root@192.168.2.2`
* Password: `mario` (for Kindle 4 or later, [Kindle Password Tool][password-tool])

[password-tool]: http://members.ping.de/~sven/kindle.html

### Fix Clock / Time Zone:

Unfortunately, on this Kindle, the timezone was messed up. Since the Kindle isn't registered to me,
I don't seem to have the manual time settings option, and I didn't want to turn on WisperNet lest it
mess up my config, or worse, mess up something for the original owner's account, I had to figure out
how to set the time and timezone manually. After some digging (sorry, I lost the link for where this
came from), I found a preference file that seemed to do the trick.

* SSH into the Kindle and run `vi /var/local/java/prefs/com.amazon.ebook.framework/prefs`
* Edit the settings here to match your desired TZ offset, name, etc
    * For me, I used `America/Los_Angeles` with a seconds offset of `-25200`
* Set the date with `date MMDDhhmmYYYY.ss`, e.g. `date 051119382018.00`, which will set the time to
  `19:38:00 May 11th, 2018`
* Save to the hardware clock with `hwclock -w`

Running `date` by itself still shows the incorrect timezone, however when viewing the clock on the
Kindle itself (press the "Settings" key to see it in the top status bar) shows the correct time.

## Raspberry Pi Setup

My goal for this build is to have both the Kindle and a Raspberry Pi mounted on the inside of my
main door with just a power cable snaked in. That way I'll have an at-a-glance view of the weather
and since it's a Raspberry Pi Zero W with the Pi NoIR camera, I can play around with maybe some
facial recognition for comings and goings, or whatever strikes my fancy in the future.

Oh yeah, and be sure to plug the Kindle into the Raspberry Pi at this point, as I'll be assuming
that from here foreward 😋

```
(( WiFi )) <~~> [ Raspberry Pi ] <-USB-> [ Kindle ]
```

### Links:

* [Kindleberry Pi](https://ponnuki.net/2012/09/kindleberry-pi/)

### Instructions:

* From the Raspberry Pi (SSH or direct, whatever you like)
* Append the USB networking config to the end of the file, it will auto start
  ```
  $ sudo vim /etc/network/interfaces
  allow-hotplug usb0
  mapping hotplug
  script grep
  map usb0
  iface usb0 inet static
  address 192.168.2.1
  netmask 255.255.255.0
  broadcast 192.168.2.255
  up iptables -I INPUT 1 -s 192.168.2.1 -j ACCEPT
  ```
* Test logging in with via SSH from the Raspberry Pi to the Kindle
* Install NginX `sudo apt-get install nginx`
* And start `sudo /etc/init.d/nginx start`

## Weather Station

Ah, the meat of this build, and the reason I started into this in the first place. Like I mentioned
above, this whole thing is possible because of the great people before me who were gracious enough
to share their knowledge. Below are the main posts that helped me push forward and gave me the
jumping-off points for most of the forums, or the right terms to use to successfully search for the
rest. Huge gratitude to everyone who made this a one-day project instead of weeks or more.

### Standing on the Shoulders of Giants:

* The O.G. [Matt Petroff's Instructions][petroff-instructions]
* [Jennifer's Instructions][jennifer-instructions]
* [Galactic Studios' Instructions][galactic-instructions]
* Great RF temperature / RasPi / Kindle setup from [Robert Moore's Instructions][moore-instructions]
* The fine Mr. [Jón's Repo][jon-repo] who originally inspired me years ago

[petroff-instructions]: https://mpetroff.net/2012/09/kindle-weather-display/
[jennifer-instructions]: http://www.shatteredhaven.com/2012/11/1347365-kindle-weather-display.html
[galactic-instructions]: http://www.galacticstudios.org/kindle-weather-display/
[moore-instructions]: https://sysadmindabblings.blogspot.com/2016/05/kindle-weather-display-with-rf.html
[jon-repo]: https://github.com/jontg/kindle-weather

### Instructions:

* From the Raspberry Pi
  ```
  $ wget http://www.galacticstudios.org/wp-content/uploads/2015/10/KindleWeatherDisplay.zip
  $ sudo mv /var/www/html
  $ cd /var/www/html
  ```
* SSH into the Kindle from the Raspberry Pi
  * Pull down the important bits
    ```
    $ wget http://192.168.2.1/KindleWeatherDisplay.zip
    $ mv KindleWeatherDisplay.zip /mnt/us/
    $ cd /mnt/us
    $ unzip KindleWeatherDisplay.zip
    $ echo "http://192.168.2.1/weather.png" > weatherurl
    $ chmod +x kite/*
    ```
  * Modify `Add_Weather_cron_Job` and `Remove_Weather_cron_Job` to change the last line from
    `2>>&1` to `2>&1`, since the Kindle doesn't like it and, while you're at it, change the `cron`
    time from every 30 minutes to every 10 minutes (e.g. `*/30` becomes `*/10`) -- for more info on
    `cron` lines and how it works, check out [this quick tutorial][cron-basics] for Raspbian
  * Finish the setup and install the setup
    ```
    $ cd kite
    $ ./Add_Weather_cron_Job
    $ cd ..
    $ chmod +x Display_Weather
    $ exit
    ```
* From the Pi
  * Pull down the important bits
    ```
    $ wget https://github.com/shatteredhaven/KindleWeatherDisplay/archive/master.zip
    $ unzip master.zip
    ```
  * Change the last line of
    `/home/pi/KindleWeatherDisplay-master/Modified\ Files/Raspberry\ Pi/weather-script.sh` to 
    `sudo cp -f weather-script-output.png /var/www/html/weather.png` to conform to our paths
  * Change `/home/pi/KindleWeatherDisplay-master/Modified\ Files/Raspberry\ Pi/weather-script.py`,
    where it says `weather_xml = urllib2.urlopen...` to use your own coordinates instead of the
    default ones of the original author
  * Update and get `cron` setup
    ```
    $ crontab -e
    */5 * * * * /home/pi/KindleWeatherDisplay-master/Modified\ Files/Raspberry\ Pi/weather-script.sh
    $ sudo /etc/init.d/cron restart
    ```
* Rejoice! (but also, wait about 30 minutes to see if the image updates)

[cron-basics]: https://thepihut.com/blogs/raspberry-pi-tutorials/34930820-running-things-regularly-cron

## Appendix: Useful Information

* [Useful Commands][useful-commands] via SSH from the Kindle 4 jailbreak wiki

[useful-commands]: https://wiki.mobileread.com/wiki/Kindle4NTHacking#Useful_Commands

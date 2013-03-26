---
layout: post
title: "DIY PCB Board Production"
description: ""
category: electronics
image: diy-pcb-board-production
attribution: http://www.flickr.com/photos/gmacklin/2063794355
tags: [pcb, etching, diy]
---
{% include JB/setup %}

While looking into home PCB board production, I came across a fantastic two-fer article on
Hack-a-Day that I was having trouble finding a few months back. In the interest of being able to
find it again and hope that it raises the search ranking a bit for others on the hunt, I am
archiving it here along with a few other related articles. I hope this helps others as much as it
helped me.

[Etching your boards really, really fast][hackaday] covers both rapid toner transfer to the PCB
[using parchment paper][parchment], instead of the usual newsprint, and also a demonstration of
extraordinarily fast etching to almost literally "[wipe the copper away][copper]". Check out the
video below showing the crazy etching.

[hackaday]: http://hackaday.com/2012/04/30/etching-your-own-boards-really-really-fast/
[parchment]: http://www.instructables.com/id/Toner-transfer-no-soak-high-quality-double-sided/?ALLSTEPS
[copper]: http://milwaukeemakerspace.org/2012/04/pcb-with-lasered-paint-resist-and-fast-sponge-etching/

+-- {.oembed}
| [PCB with Lasered Paint Resist and Fast Sponge Etching](http://www.youtube.com/watch?feature=player_embedded&v=OTGZcY7WyYI)

> TomG shows how he etches PCB boards using paint, a 25W laser cutter, Muratic Acid, 30% H2O2 and a
> sponge. Much frothing ensues.

In the parchment toner transfer article the author put a link to another Instructable for creating
[DIY solder masks][masks] using a very cool UV curing film. I just did my first SOIC soldering the
other night (a [DS2482-100][] (PDF) chip onto a [Sparkfun SOIC breakout][breakout] for use with an
[Electric Imp][imp]) and have heard that without the solder mask, it becomes quite difficult to get
do the soldering correctly with these fine-pitch components. Check out this photo of the finished
results.

[masks]: http://www.instructables.com/id/Dry-Film-Solder-Mask/?ALLSTEPS
[ds2482-100]: http://datasheets.maximintegrated.com/en/ds/DS2482-100.pdf
[breakout]: https://www.sparkfun.com/products/494
[imp]: http://electricimp.com

![Finished Product](http://www.instructables.com/files/deriv/FFM/O4N3/H9T4LGZ0/FFMO4N3H9T4LGZ0.MEDIUM.jpg)

> And that's it.  You have a perfect board with solder mask like the professionals.
> Just stuff your board with the components and your circuit board is ready!!!

And lastly, while I'm at it, here is [The Maker Map][map]. Not to be confused with
[Hackerspaces.me][spaces] (using cool [hacker space APIs][apis]).

[map]: http://themakermap.com
[spaces]: http://hackerspaces.me
[apis]: http://hackerspaces.nl/spaceapi

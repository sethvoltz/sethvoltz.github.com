---
layout: post
title: "Observations on the Maker Culture and Technology Acceleration"
description: ""
category: makers
image: observations-on-the-maker-culture-and-technology-acceleration
attribution: http://www.flickr.com/photos/eagletusk/5762722897
tags: [diy, culture, makers, technology]
---
{% include JB/setup %}

<div class="alert alert-warning">
<strong>Note:</strong>
I originally started writing this post in September of 2013 and let it drop. I still think a number of these thoughts hold up today so I have finished writing it, added some notes where updates are avilable and am publishing it as-is.
</div>

This post is a collection of unfinished ideas to help me coalesce my thoughts surrounding the hardware and software maker cultures.

This started to solidify for me after getting a link to the [Open Hand Project][ohp] and their [indiegogo project][indie]. It occurred to me that this sort of project was completely impossible just 5 years ago. Without the confluence of low cost 3D printers, high-power hobbyist electronics, a strong community of like-minded people and the popularity and availability of crowd-funding sites such as [indiegogo][] and [Kickstarter][], we would not see these and many other projects come about.

[ohp]: http://www.openhandproject.org
[indie]: http://igg.me/at/openhandproject/x/2467988
[indiegogo]: http://www.indiegogo.com
[kickstarter]: http://www.kickstarter.com

The [Pebble Smart Watch][pebble] was likely the first large-scale maker success story where a technology product was conceived, prototyped, market tested, and funded, all without the usual large product development life-cycle elements. Only the final mass-production stage leveraged "traditional" infrastructure. The idea, born from the ashes of a mildly successful smart-watch product that had followed traditional methods, it [debuted on Kickstarter][pebble-kick] early in 2012 and began shipping to backers just shy of one year later. It was originally prototyped on hobbyist hardware, followed by a custom-etched circuit board, likely delivered by a small-run board manufacturer. The case design was tested using 3D printing. Only the final product, the mechanically assembled boards, plastic injection molded cases assembly, and shipping, were necessarily reminiscent of the processes used by other consumer product companies.

[pebble]: http://getpebble.com
[pebble-kick]: http://www.kickstarter.com/projects/597507018/pebble-e-paper-watch-for-iphone-and-android

In contrast to the consumer focus of the Pebble, [Espruino][] is a new Kickstarter project (funding [set to close][espruino-kick] in late September of 2013) is targeting makers themselves, providing a new iteration of existing tools that follow the mantra of 'make hard things easy and impossible things possible.' Their specific solution follows that microcontrollers are cheap but have a fairly large learning curve. The Espruino aims to increase initial accessibility to non-experts, getting novices and experts alike into the actual programming and towards project completion, instead of spending their time working through the minutiae of setting up and debugging their development
environment.

[espruino]: http://www.espruino.com
[espruino-kick]: http://www.kickstarter.com/projects/48651611/espruino-javascript-for-things

<div class="alert alert-warning" markdown="1">
Since this was originally written both the Pebble Smartwatch and the Espruino have been successful and both have had a second successful kickstarter campaign ([Pebble Time][pebble-time], [Espruino Pico][espruino-pico]) to push a new version of their product.

Also, let's not forget the wild success of the [Raspberry Pi][raspberry], which delivers a fully functional linux computer with ethernet, USB, full HDMI and many GPIO pins for hardware interfacing. All for the same form factor and $35 price tag as an Arduino. With it's recently announced successor the [Raspberry Pi 2][raspberry-two], it now sports four CPU cores and can actually be used as a low-end graphical Linux desktop.

[pebble-time]: https://www.kickstarter.com/projects/597507018/pebble-time-awesome-smartwatch-no-compromises
[espruino-pico]: https://www.kickstarter.com/projects/gfw/espruino-pico-javascript-on-a-usb-stick
[raspberry]: http://www.raspberrypi.org/
[raspberry-two]: http://www.raspberrypi.org/raspberry-pi-2-on-sale/
</div>

## The Internet of Things

The Internet of Things is the binding of normally isolated hardware with the Internet, leveraging the more powerful, capable and inexpensive computing technology discussed above. Reasons range anywhere from data logging, to social sharing, to scientific monitoring, or just some hobbyist having fun because they can. For the simplicity's sake, in this article I will be excluding discussion of the emerging industrial sector's move to Internet-enable hardware such as meters, generators, heavy equipment and field equipment. Instead I will discuss those projects born of the Maker spirit, which could be powering some industrial equipment's Internet connectivity, or at least provide ease the prototyping process.

* [Twine][] -- A solid and early entrant into the Internet of Things space, the twine quickly became the IoT hot topic with everyone and their brother looking to use it to hook whatever they could up to ther Internet.
* [electric imp][imp] -- The electric imp is a teeny wifi-connected microcontroller in the form factor of an SD card. Instead of programming it directly, it's prime directive is to connect up to the so-called "mothership" and receive commands and programs that you write via their browser-based IDE.
* [Lockitron][] -- The Lockitron is quite simply a wifi connected deadbold with a companion app. It can be used as a standalong device or ehhanced and extended using their developer tools.
* [Xively][] -- (Formerly known as Cosm) There are many ways to log data coming back from a connected device, but few as available and convenient as Xively. With both Cosm's easy to use legacy API and their new, more expressive APIs, you can shuttle linked time-series data up to the cloud and quickly view charts built from realtime or historical data.

[twine]: http://supermechanical.com
[imp]: http://electricimp.com
[lockitron]: https://lockitron.com
[xively]: https://xively.com

<div class="alert alert-warning" markdown="1">
In the intervening years, I have not heard anything more about Twine and Electric Imp, while still functioning and expanding their feature set, has fallen out of the press spotlight and down on search rankings. Newer entrants have also come and gone but one trend seems to hold: if your product is standalone or offers a "bring your own cloud" alternative, then it seems to last longer in the open marketplace. If it requires a proprietary cloud that the user has no insight into and could disappear (or become a paid service) without notice because the company tanked, then once the initial wow-factor of that product's offering tapers off, so does it's mindshare.

IoT, it would seem, is now entering it's next phase of evolution: the battle between open and capitalistic interests.
</div>

## Acceleration of Ideas

From, to, and by the end-user. Whether the maker intends to build 10, 100 or 10,000, the best way to get their product out there when there is no viral spread or appeal for the product, is to have a marketplace for like products that allows the maker to place their wares. In the absence of any place, many people first flocked to [Etsy][] to set up shop. However, as their terms of service and community goals were at odds with "manufactured goods", the politely asked those shops to move elsewhere. Not to miss an opportunity, [Tindie][] sprung up with with the primary mission of servicing these makers and hosting the marketplace for their wares. Whether Tindie will succeed in becoming a known name in the hardware world the way Etsy did is to be seen. Perhaps they will fade away as well and another will spring up, or more makers will try their hand at larger scope projects and make their way to crowdfunding sites. Either way, I believe this is a growing marke which will only continue to grow and create the spaces it needs before filling them.

[etsy]: http://www.etsy.com
[tindie]: https://www.tindie.com

<div class="alert alert-warning" markdown="1">
Tindie is still around and going strong. A recent look through their site shows a marked improvement in both the quality of their site and the quality and complexity of the goods for sale. If they can continue to grow and adapt to the changing maker landscape as they already have, they may graduate from the "Etsy of Electronics" and be a name in their own right.

And don't just take my word for it, check them out. There are some cool things there.
</div>

## The Community

Easily the most important but often overlooked element of the maker movement. Everything I've covered and more would not have been possible if it weren't for the fact that the maker community prizes _open_ over _proprietary_ and _sharing_ over _hoarding_. While not everything discussed about is completely open (the Pebble, electric imp, Twine and Cosm are proprietary products), they all still share a similar origin and each give back to the community in one way or another, whether that means open APIs, encouraging open source projects to be built on their platforms, or by giving back part of their solution to everyone as an open hardware or software project.

<div class="alert alert-warning" markdown="1">
As a final note on openness and sharing of resources and solutions, I want to point at the software world and companies like [Netflix][] and … who regularly create and share new open source software with the world that helps make everyone, including their competitors, better at what they do.

In the case of Netflix, the reasons are partly because of the mindshare and good will that comes from it, but primarily ([by their own admission][netflix-oss]) it makes their engineers work harder to create better products for themselves because their names are on it. They don't want their name associated with junk software. Pretty cool, if you ask me.

[netflix-oss]: http://youtu.be/1wiMLkXz26M?t=9m20s
</div>

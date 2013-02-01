---
layout: post
title: "ImageMagick and RMagick for Testing Colors"
description: ""
category: code
image: imagemagick-and-rmagick-for-testing-colors
attribution: http://www.flickr.com/photos/mrsenil/2995594424/
tags: [imagemagick, rmagick, ruby, color, raspberrypi, shiftbrite, github, example, homebrew]
---
{% include JB/setup %}
A couple weeks ago I started working on a pure-Ruby GPIO library for the Raspberry Pi to see whether
I could get rid of a persistent glitch I was experiencing while driving the ShiftBrite LED modules.
I still haven't been able to pinpoint the issue but while I was at it I put together some color
conversion classes. Since I couldn't test the libraries on the LED modules directly, I needed a
simple way to check that the conversion worked beyond the numbers looking OK and matching up with a
few test cases from Photoshop.

I have never used the Ruby RMagick library before so killing two birds with one stone seemed a nice
way to learn something new and test whether my converters were working properly.

Unfortunately, I had some troubles getting RMagick to compile properly on Mountain Lion, despite a
bunch of links on doing just what I was looking to do. Luckily, I finally found [this post in
Japanese][rmagick compile]. Luckily, while I don't speak Japanese, code can be a universal language
and the author's trick worked for me. Here it is again in the hopes that it will pop up a bit higher
on the search indices:

[rmagick compile]: http://tkawachi.github.com/blog/2013/01/05/homebrew-rmagick/

Mac OS X, Mountain Lion, ImageMagick and RMagick installation using Homebrew and Rubygems:

    $ brew update
    $ brew install imagemagick
    $ ln -s /usr/local/lib/libMagickCore-Q16.dylib /usr/local/lib/libMagickCore.dylib
    $ gem install rmagick
    $ rm /usr/local/lib/libMagickCore.dylib

Excellent, we're in business! Pulled up `irb` and tested a few commands, got my head around the
`Magick::Draw` class, and wrote up a test script. The simplest test case I could think of was to
render up a full HSV spectrum with the hue angle on the X-axis and the saturation and value levels
along the Y-axis. Here is the complete source for the test.

{% highlight ruby %}
#!/usr/bin/env ruby

$:.unshift '.'
require 'rmagick'
require 'color'

canvas = Magick::Image.new(360, 100)
gc = Magick::Draw.new
gc.fill_opacity 1

(0..359).each do |hue|
  (0...50).each do |saturation|
    hsv = Color::HSV.new hue, saturation * 2, 100
    rgb = hsv.to_rgb
    gc.fill "rgb(#{rgb.r * 100}%, #{rgb.g * 100}%, #{rgb.b * 100}%)"
    gc.rectangle hue, saturation, hue + 1, saturation + 1
  end

  (0...50).each do |value|
    hsv = Color::HSV.new hue, 100, 100 - value * 2
    rgb = hsv.to_rgb
    gc.fill "rgb(#{rgb.r * 100}%, #{rgb.g * 100}%, #{rgb.b * 100}%)"
    gc.rectangle hue, value + 50, hue + 1, value + 51
  end
end

gc.draw canvas
canvas.write 'output.png'
{% endhighlight %}

The results of the run showed what I wanted to see:

![HSV Test Conversion Image](/assets/images/hsv-test-image.png)

Woo!

I've also been putting up this and my other Raspberry Pi [sources up on GitHub][sources]. Give them
a look, fork them, send me pull requests, let me know if it helps you.

[sources]: https://github.com/sethvoltz/raspberry_pi

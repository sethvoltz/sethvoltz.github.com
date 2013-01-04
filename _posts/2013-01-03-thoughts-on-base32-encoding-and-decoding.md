---
layout: post
title: "Thoughts on Base32 encoding and decoding"
description: "Observations about how others do it"
category: code
tags: [base32, base64, binary, encoding, example, otp, ruby, javascript]
---
{% include JB/setup %}

Recently I've been working with Base32 encoded data (for a One Time Password portion of a project)
and found a very limited number of libraries for encoding and decoding the data in either Ruby or
Javascript. This seemed strange as modern versions of Python apparently have it built in and there
is an accepted de-facto library for PHP. In Ruby specifically, the libraries I did find seemed
overly complicated, especially given the tools built in to the language for doing bit twiddling. To
start this off, here is my current Base32 encoder (built using the [RFC 4648][] specification):

{% highlight ruby %}
BASE32_CHARS = "abcdefghijklmnopqrstuvwxyz234567".each_char.to_a

# Takes a bytestring and returns Base32 string
def base32_encode(bytes)
  base = bytes.unpack('B*').first.scan(/.{1,5}/).collect { |i|
    BASE32_CHARS[i.ljust(5,"0").to_i(2)]
  }.join('')
  base + '=' * ((8 - (base.length % 8)) % 8)
end
{% endhighlight %}

If anyone has ways to optimize this code, please leave a comment. I'm always looking
for ways to improve my craft. This has been tested against the supplied [test vectors][] in the RFC.

(**Update 3:** I swapped out the code above with my latest code. Please see the end of the post for
the original code and updates 1 and 2. This also fixes a bit-padding issue with the last character.)

In the code snippet above, the majority of the operation is handled in one line (`base = bytes...`)
and the rest is there simply to allow padding to be calculated properly. Why is it then that other
implementations are multiple methods, each with many more lines than this?

My guesses are as follows:

* I messed up something in my interpretation of the standard, even though all my test data is
  capable of re-encoding back to the same string as other libraries decode from.
* Other library authors came from other languages and are not familiar with elements of the Ruby
  language that could aid in optimizing their solution
* The other authors are aware of the method I'm using, however the performance is sub-optimal for
  large computational volume, or there is some other optimization performed which requires a longer
  code block.

With my caveat in bullet one, I suspect that is not it, however I am open to points on the contrary.
As for bullets two and three, I have not been able to settle on either. I would like to assume the
third, however we all know what happens when you make "ASSumptions".

I invite open dialog on this...

[rfc 4648]: http://tools.ietf.org/html/rfc4648#page-8
[test vectors]: http://tools.ietf.org/html/rfc4648#section-10

----

**Original Code from First Posting:**

{% highlight ruby %}
BASE32_CHARS = "abcdefghijklmnopqrstuvwxyz234567".each_char.to_a

# Takes a bytestring and returns Base32 string
def base32_encode(bytes)
  binary = bytes.unpack('B*').first
  base = binary.scan(/.{1,5}/).collect { |i| BASE32_CHARS[i.to_i(2)] }.join('')
  length = binary.length
  if    length % 40 == 0 # no padding
  elsif length % 32 == 0 then base << '=' # 1
  elsif length % 24 == 0 then base << '=' * 3
  elsif length % 16 == 0 then base << '=' * 4
  elsif length %  8 == 0 then base << '=' * 6
  end
  base
end
{% endhighlight %}

(**Update 1:** It occurs to me that there is a relationship between the number of bits in the last bit
capture that would allow the modulo-math if-block to be replaced with a case statement using length
equlity. That could potentially be optimized further if the number of bits can be converted into 0,
1, 3, 6 for the padding multiplier. Thoughts?)

(**Update 2:** Added in the `BASE32_CHARS` constant declaration to make the example runable.)

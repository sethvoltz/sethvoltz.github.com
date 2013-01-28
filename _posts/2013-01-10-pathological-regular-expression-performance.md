---
layout: post
title: "Pathological Regular Expression Performance"
description: ""
category: code
image: pathological-regular-expression-performance
attribution: http://www.flickr.com/photos/rooreynolds/243810939/
tags: [theory, link, computer-science, example, ruby]
---
{% include JB/setup %}

I just finished reading an excellent article by [Russ Cox][] on regular expressions titled "[Regular
Expression Matching Can Be Simple And Fast][regexp]", that describes the differences between the
original Ken Thompson regexp implementation and the recursive backsearch implementation that has
been perpetuated among many modern languages and libraries.

[russ cox]: http://swtch.com/~rsc/
[regexp]: http://swtch.com/~rsc/regexp/regexp1.html

The underlying stress of the article is that the method used by Perl, Ruby, PHP, Java, PCRE and
others is wasteful for many cases which can be decomposed into easily computed [NFA][]s
(non-deterministic finite automata) and should only need to switch to the recursive algorithm in the
cases where it is needed. This would completely eliminate many pathological cases from
_[O][]( 2^n )_ to linear growth.

[nfa]: http://en.wikipedia.org/wiki/Nondeterministic_finite_automaton
[o]: http://en.wikipedia.org/wiki/Big_o_notation

As the article itself was written in 2007 and mentions some very old versions of the languages and
libraries the author tested against. Specifically, he uses Ruby 1.8.4, which is missing many of the
optimizations that came in 1.8.6, and is now, practically a distant relative of the new 1.9.x
implementation. So, this got me thinking (hoping?) that somewhere in the intervening 5 years one of
the Ruby core developers was pointed to, heard of, or otherwise decided to look into regular
expression efficiency and found this article or even Thompson's [original 1968 paper][thompson]
(_grumble grumble_, not anymore since ACM put the PDF behind a pay-wall).

I figured the easiest way to test this was to fire up the `irb` [REPL][] and write a simple test
case:

[thompson]: http://doi.acm.org/10.1145/363347.363387
[repl]: http://en.wikipedia.org/wiki/REPL

{% highlight ruby %}
$last_benchmark = nil
for length in 1..100 do
  print "length: #{length.to_s.rjust 2} - "
  string = 'a' * length
  regexp = Regexp.new(('a?' * length) + string)
  benchmark(1, 1) { regexp.match string }
end
{% endhighlight %}

The benchmark method is a handly little chunk of code [I picked up][bench] for my `.irbrc` file.
Here is it's implementation:

[bench]: http://blog.evanweaver.com/2006/12/13/benchmark/

{% highlight ruby %}
# http://blog.evanweaver.com/articles/2006/12/13/benchmark/
def benchmark(times = 1000, samples = 20)
  times *= samples
  cur = Time.now
  result = times.times { yield }
  print "#{cur = (Time.now - cur) / samples.to_f } seconds"
  puts " (#{(cur / $last_benchmark * 100).to_i - 100}% change)" rescue puts ""
  $last_benchmark = cur
  result
end
{% endhighlight %}

And here are the results I got back:

    length:  1 - 3.3e-05 seconds
    length:  2 - 3.3e-05 seconds (0% change)
    length:  3 - 2.4e-05 seconds (-28% change)
    length:  4 - 2.5e-05 seconds (4% change)
    length:  5 - 2.5e-05 seconds (0% change)
    length:  6 - 2.7e-05 seconds (7% change)
    length:  7 - 3.3e-05 seconds (22% change)
    length:  8 - 4.1e-05 seconds (24% change)
    length:  9 - 5.1e-05 seconds (24% change)
    length: 10 - 8.0e-05 seconds (56% change)
    length: 11 - 0.000106 seconds (32% change)
    length: 12 - 0.000222 seconds (109% change)
    length: 13 - 0.000367 seconds (65% change)
    length: 14 - 0.000693 seconds (88% change)
    length: 15 - 0.001307 seconds (88% change)
    length: 16 - 0.002084 seconds (59% change)
    length: 17 - 0.00358 seconds (71% change)
    length: 18 - 0.005263 seconds (47% change)
    length: 19 - 0.010101 seconds (91% change)
    length: 20 - 0.021733 seconds (115% change)
    length: 21 - 0.04065 seconds (87% change)
    length: 22 - 0.081266 seconds (99% change)
    length: 23 - 0.163639 seconds (101% change)
    length: 24 - 0.322691 seconds (97% change)
    length: 25 - 0.63768 seconds (97% change)
    length: 26 - 1.365583 seconds (114% change)
    length: 27 - 2.558626 seconds (87% change)
    length: 28 - 5.084387 seconds (98% change)
    length: 29 - 10.306829 seconds (102% change)
    length: 30 - 20.607489 seconds (99% change)
    length: 31 - 41.424756 seconds (101% change)
    length: 32 - 82.067535 seconds (98% change)
    length: 33 - 165.077833 seconds (101% change)
    length: 34 - 337.572673 seconds (104% change)
    length: 35 - 705.54921 seconds (109% change)
    ^C

Here we can clearly see the exponential growth in time and where, at a measly 35 characters (at
which point I cancelled the test) in length, we have exceeded 10 minutes of runtime. This also had
the effect of pegging an entire CPU on my machine and over the course of the run and draining about
15% of my battery life. As a comparisson, I have used less than 5% more in the process of composing
this post.

## My Take

So, what can we learn from this exercise? As computer scientists and engineers, we really don't know
our history and we have, as an industry, been fast to forget the teachings we (hopefully) were given
in formal schooling. While reading the article, it brought back a lot of things about DFAs and NFAs
that I had forgotten, as I usually use them as representation tools for thinking through state
machine transitions, where each state is a container for larger logic blocks. It also sent me down
memory lane, remembering many other things I learned in those same classes (from which I will spare
you, dear reader) and has spurred me to dig out my old [algorithms text book][textbook]
([Wikipedia entry][textbook-wiki]) to give it a skim through.

[textbook]: http://mitpress.mit.edu/books/introduction-algorithms
[textbook-wiki]: http://en.wikipedia.org/wiki/Introduction_to_Algorithms

I urge all readers of this post who write software to revisit those old books, read [Wikipedia][]
articles on the theory, and attempt to apply those teachings to their everyday code. The lessons
aren't always applicable to your language of choice but the exercise is worth it. Like physical
exercise, I believe you need to keep learning and training in order to keep fit in your field.

[wikipedia]: http://en.wikipedia.org/wiki/Portal:Computer_Science

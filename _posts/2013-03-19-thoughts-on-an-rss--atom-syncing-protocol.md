---
layout: post
title: "Thoughts on an RSS / Atom Syncing Protocol"
description: "Soon, Google Reader will be gone. What will replace it?"
category: ramblings
image: thoughts-on-an-rss--atom-syncing-protocol
attribution: http://www.flickr.com/photos/bounder/3237679040
tags: [rss, atom, synchronize, reader, client, server, protocol]
---
{% include JB/setup %}

In light of [Google Reader going down soon][gr-dead] I needed a replacement and fast. Luckily, I'm
not the only one in this predicament and some big names in the feed consumption world have gotten in
gear as well. One of the biggest is [Brent Simmons][] of [NetNewsWire][] fame [^1]. He set up a nice
little [mailing list][mailing-list] with the sole purpose of working out what the next, preferrably
better, syncing protocol(s) would be. There have been a lot of great ideas flying around on the
list---some I agree with, some I dont---so, I figured why not compose my own thoughts, try to credit
people where due, and then present it back to the group in the hopes it both sways opinion towards
my aims, as well as giving another voice in the concensus building process.

[gr-dead]: http://googlereader.blogspot.com/2013/03/powering-down-google-reader.html
[brent simmons]: http://inessential.com
[netnewswire]: http://netnewswireapp.com
[mailing-list]: http://lists.ranchero.com/listinfo.cgi/rss-sync-ranchero.com

Here is what I believe would be necessary in such a syncing service:

1. A **feed synchronization** system that allows a client to identify itself to the server and
   retrieve both a complete list of feeds being tracked under their account and a delta list of all
   unread articles since some checkpoint (either a timestamp as tracked by the client, or "since
   last sync" as tracked by the server. With this, read status and "star" status should be writable
   back to the server.

2. A **feed normalization** service which sends down the actual data to the client in a strict
   normalized manner for the simplest possible implementation on client side. This should both
   support downloading of the article as provided by the RSS feed as well as a diff between two
   versions of an article [^2]. ([Brian Reischl][] has a nice list of [stupid feed tricks][] that
   reveal the difficulty this normalizer will face)

3. **Authentication** either by username and password or [OpenID][]. Other authentication methods
   could be proposed that allow for client token storage and server-side client-by-client removal.
   Extra security measures could be offered by the service at their discretion, such as
   [out-of-band][] methods, as long as they do not interfere with the operation of the core
   authentication protocols and all clients written within that spec can use them without
   modification.

4. **Unique article GUIDs** via a stricly defined algorithm. This will facilitate both item *2*
   above, as well as interoperability between services in two ways: first, services could
   potentially opt to provide only part of the stack, as as been discussed on the mailing list (one
   service provices feed tracking and syncing and another provides the feed data itself [^3]); and
   second, it opens the future possibility of federating services for use cases where authenticated
   feeds can be handled by a user-private or for-pay service, while other feeds are handled by a
   free or open service [^4].

5. **Mandatory HTTPS**. It's 2013, we shouldn't be using non-encrypted channels any more.
   Additionally, a strong recommendation in the spec towards a [minimum][] [level][] of security.
   [No RC4][], TLS or better, etc.

6. **Feed grouping** [^5] via tags or some equivalent mechanism. There was a bunch of talk over on the
   list about how to properly group feeds together. I fall into the camp of people who have enough
   feeds to want to group them. In my case, I use them to group by topic area, not importance, e.g.
   technology, art and science, people I know in person, etc. There were a number of suggestions,
   namely folders (a feed can be in one and only one folder), "tabs" to hold topic areas (sounds
   like folders with a different UI, and tags, where a feed can be given one or more tags and the
   tags are usually visually described through a folder-like metaphore. The latter seems the most
   flexible because it allows a specification to recommend a particular UI (folders) while not
   prohibiting alternatives (such as a news stream or "river" with distinctions by tag like
   coloring).

[brian reischl]: https://twitter.com/brianreischl
[stupid feed tricks]: https://docs.google.com/document/d/1cvq67iQpk2C7ufOsefsfKnGCXeUIv46NQHbnHkm8PtU/edit?usp=sharing
[openid]: http://openid.net
[out-of-band]: http://en.wikipedia.org/wiki/Out_of_band#Authentication
[minimum]: http://en.wikipedia.org/wiki/Transport_Layer_Security#BEAST_attack
[level]: http://en.wikipedia.org/wiki/Transport_Layer_Security#CRIME_attack
[no rc4]: http://en.wikipedia.org/wiki/Transport_Layer_Security#RC4_attack

And here are some nice to have (wishlist) features that would make the service more powerful and
hackable by users (in no particular order):

* Action triggering, preferrably through a [webhook][]-type mechanism. This could allow for actions
  such as triggering a user-hosted script to download the embedded podcast within a post at the
  point when the service first detects a post. Or, perhaps instructing a caching proxy to pre-fetch
  images within a post, or even the entire linked page, during off-peak hours.

* The ability to pass per-feed and per-post (by above defined GUID) key-value metadata back to the
  syncing service which would be fed to the client along with the feed or post itself. This could
  allow for the client to be made aware of things like the cached location of a podcast downloaded
  in the item above. I'm thinking of this in the same way that the Twitter API (used to?) allow a
  posting client to add additional K-V data to a tweet.

* An agreed-upon URL handler for new-feed subscription that could be implemented by client
  developers such that a link clicked in a browser would switch to that app and offer the user the
  ability to subscribe by way of their syncing service. It would be up to the client, if it
  supported multiple sync servers, to provide the appropriate UI for account selection.

[webhook]: http://en.wikipedia.org/wiki/Webhook

That about does it. I'm open to thoughts, ideas, criticisms (constructive, please), recommendations,
etc. If anything in here was not properly credited, please leave a comment and I will link or credit
where due.

* * * 

**Update 1**: Totally forgot about tags for feeds. Thanks to [DPK][] (*membership required*) on the
list for reminding me with his followup post to mine.

[dpk]: http://lists.ranchero.com/private.cgi/rss-sync-ranchero.com/2013-March/000115.html

[^1]: As a faithful user of NNW for many years, I have a great deal of respect for Brent's software
and opinions when it comes to news feeds. I still have it installed but ended up switching away
because I used [Reeder][] on my iPhone and iPad and it was easier to also use Reeder on my Mac.
Unfortunately, with Google Reader going away, all three of those apps will quickly become dead
weight as they currently *only* work with that syncing service.

[^2]: The idea here is that an article may be updated over time, whether due to concatenated
updates, corrections inline, or an article is being used like [LifeHacker][]'s "[Always Up To
Date][]" guides.

[^3]: I don't necessarily agree that this is the correct way to go but there was interest in it on
the mailing list, so I threw it in here. It's a strong argument towards spending time to nail down
a well-defined algorithm to create unique IDs for post items, especially over time and between
updates.

[^4]: This was what I was thinking about in item *3* with additional authentication methods. A user
could run their own syncing service in order to support, say, a few private feeds that require
authentication. It would be up to the server code/service provider to then support the myriad kinds
of authentication that might be used.

[^5]: See **Update 1**

[reeder]: http://reederapp.com
[lifehacker]: http://lifehacker.com
[always up to date]: http://lifehacker.com/always-up-to-date-guide

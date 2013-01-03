---
layout: page
title: Latest Ramblings
tagline: My latest thought on whatever happens to be on my mind.
---
{% include JB/setup %}


{% for post in site.posts limit:1 %}
<h2 class="title">
  <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a>
  <small class="date">{{ post.date | date_to_long_string }}</small>
</h2>
<div class="post">
  {{ post.content | strip_html | truncatewords: 55 }}
  <a href="{{ BASE_PATH }}{{ post.url }}">Read more ...</a>
</div>
{% endfor %}
<hr>

<strong><a href="{{ BASE_PATH }}archive.html">All Posts</a></strong>
<ul class="posts">
  {% for post in site.posts %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>

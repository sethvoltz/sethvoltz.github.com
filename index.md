---
layout: page
title: Latest Ramblings
tagline: My latest thoughts or whatever happens to be on my mind.
---
{% include JB/setup %}

{% for post in site.posts limit:1 %}
<div class="row">
  <div class="span8">
    <h2 class="title">
      <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a>
    </h2>
    <div class="post">
      {% if post.image %}
      <img src="{{ post.image | prepend: '/assets/images/' | append: '.jpg' }}" class="post-image">
      <!-- Image Attribution: {{ post.attribution }} -->
      {% endif %}
      {{ post.content }}
    </div>
    <hr>
    <div class="go-comments">
      <a href="{{ BASE_PATH }}{{ post.url }}/#comments">View comments</a>
    </div>
  </div>

  <div class="span4">
    <h4>Published</h4>
    <span class="date">{{ post.date | date_to_long_string }}</span>
    under <span class="category">{{ post.categories.first }}</span>

    {% unless post.tags == empty %}
    <hr>
    <h4>Tags</h4>
    <ul class="tag_box">
    {% assign tags_list = post.tags %}
    {% include JB/tags_list %}
    </ul>
    {% endunless %}  

    <hr>
    <h4><a href="{{ BASE_PATH }}archive.html">All Posts</a></h4>
    <ul class="related_posts">
      {% for post in site.posts %}
      <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
      {% endfor %}
    </ul>
  </div>
</div>
{% endfor %}

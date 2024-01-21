---
title: Typography & Can You Read It Now?
description: Origin story of Can You Read It Now?
date: 2012-11-03T15:00:00.000Z
tags:
  - CYRIN
  - Typography
---

Typography can be a subtle art. Type is in front of us all day in one form or another, but it can take extreme examples of high- or low-quality typography to [spur](http://www.typographydeconstructed.com/spur/) us to think about type. Like most arts, the more you think about it, the more you notice details, which in turn makes you stop and evaluate what you might have glossed over before. This is both enthralling and maddening.


## Productive Frustration

My entrance into the spiral of typographic concern started innocently enough: by reading a lot of software development articles on the Web. The content is often well-written by smart and articulate people, but the type is usually set in varying degrees of [unreadable](http://en.wikipedia.org/wiki/Readability).

For non-technical content, there are work-arounds for this problem: use [Instapaper](http://instapaper.com), [Readability](http://readability.com), or Safari&rsquo;s Reader feature to set the text in a more readable way and go on with your life. This is great for prose and digital photos (which can usually be resized without losing meaning), but software development articles tend to include accompanying source code (which has different requirements for readability than prose) and detailed screen shots which tend to only be legible at full size.

Rather than lobbying for these tools to handle the code snippet use case, a different way to solve the problem is to make it easier for authors to make their text *readable enough* without having to become typography or <abbr title="Cascading Style Sheets">CSS</abbr> expert.


## So I Made A Thing

When I started working on [Can You Read It Now](http://canyoureaditnow.com) (<abbr title="Can You Read It Now">CYRIN</abbr>) I could identify readable text, but not the ways that distinguished it from the text that was a challenge to read. Since it was clear that I was not the only one with this problem, I spent some time reading about the basics of typesetting in the browser and applied some of what I learned in the <abbr title="Can You Read It Now">CYRIN</abbr> [bookmarklet](http://en.wikipedia.org/wiki/Bookmarklet).

<figure>

![Example CYRIN scores](scores.png)

<figcaption>

<abbr title="Can You Read It Now">CYRIN</abbr> gives immediate feedback in the current browser window

</figcaption>
</figure>


## What Do I Do With This?

The source for a lot of the ratings are the <abbr title="World Wide Web Consortium">W3C</abbr>&rsquo;s [Web Content Accessibility Guidelines](http://www.w3.org/WAI/intro/wcag.php), which are focused on making content accessible to as many people as possible. I&rsquo;ve used the formulas where they are included with the guidelines for calculating how readable text will be and tried to make clear ratings based on that guidance or personal preference everywhere else. In <abbr title="Can You Read It Now">CYRIN</abbr> higher scores (up to 10) mean that the text will be easier and possible for more people to read your content, but anything rated 7 or above can be good enough if you&rsquo;re not targeting visitors with [low-vision](http://en.wikipedia.org/wiki/Low_vision).

<abbr title="Can You Read It Now">CYRIN</abbr> also gives specific recommendations with <abbr title="Cascading Style Sheets">CSS</abbr> rules for making the target design more readable.

<figure>

![Example CYRIN suggestions](suggestions.png)

<figcaption>

Suggestions & <abbr title="Cascading Style Sheets">CSS</abbr>

</figcaption>
</figure>

Finally, <abbr title="Can You Read It Now">CYRIN</abbr> also provides short descriptions of the aspects of typesetting that are being measured. There are more aspects of well-set type than are listed here and more subtlety to determining whether text is readable, but I think it&rsquo;s a good start for beginners and casual practitioners.

<figure>
    
![Example CYRIN aspect description](aspect_description.png)

<figcaption>
       
Description of <a href="http://en.wikipedia.org/wiki/Leading" target="_blank">line leading</a>
    
</figcaption>
</figure>

Go ahead, [try it out](http://canyoureaditnow.com).


## What&rsquo;s coming

There&rsquo;s more to tell about <abbr title="Can You Read It Now">CYRIN</abbr> and some of the basics of typography as it applies to readability, so I hope you&rsquo;ll look forward to:

* More on the meanings of metrics that <abbr title="Can You Read It Now">CYRIN</abbr> evaluates
* Notes on other aspects of typography in the browser
* Technical details about how <abbr title="Can You Read It Now">CYRIN</abbr> was built
* Feature updates


## Other Reading

Here's some type-geek reading I&rsquo;ve enjoyed:

* [The Elements of Typographic Style](http://en.wikipedia.org/wiki/The_Elements_of_Typographic_Style) - The One True Typography Book, as far as I know. Covers a great deal of what I&rsquo;d picked up in bits and pieces over time, but in greater detail, historical context and (of course) amazing typography.
* [The Elements of Typographic Style Applied to the Web](http://webtypography.net/) - A long-running work in progress (started in 2005) that tries to capture more of the specifics of designing for the browser.
* [Information Architects](http://informationarchitects.net/blog/) - Creators of iA Writer, they have written about how [they apply rigorous standards to the display of text](http://informationarchitects.net/blog/responsive-typography-the-basics/) in their cross-device text editors.
* [Elliot Jay Stocks](http://elliotjaystocks.com/)&rsquo; Tomorrow&rsquo;s web type today series: [ligatures](http://elliotjaystocks.com/blog/the-fine-flourish-of-the-ligature/), [expert subsets](http://elliotjaystocks.com/blog/expert-subsets-for-css-in-123/) (for real small caps and lower case numerals), [swashes](http://elliotjaystocks.com/blog/say-it-with-a-swash/) & [stylesets](http://elliotjaystocks.com/blog/stylesets/).

Until next time.
---
title: CYRIN In The Browser
description: How CYRIN evaluates pages for readability metrics
date: 2012-12-16T19:00:00.000Z
tags:
  - CYRIN
  - JavaScript
---

In order to rate the readability of text on a web page, Can You Read It Now has to do all of the following:
* Get access to the page contents
* Find the text to be analyzed
* Get the displayed style of each piece of text
* Calculate ratings for each aspect of readability
* Display the ratings to the user

Accomplishing all of this with one click from the user required making several different trade-offs and design decisions. Let&rsquo;s cover each of these in turn.

## Get access to the page contents

The simplest way to give <abbr title="Can You Read It Now?">CYRIN</abbr> access to the current document would be to add an in-document JavaScript reference on the page to test, but that would mean changing the content of any page you want to rate, which is tedious and unnecessary. A different way to run third-party JavaScript in the context of the current document is a [bookmarklet][1]. As you might be able to gather from the name, bookmarklets are JavaScript that is saved and executed like a bookmark.

One pain point of building bookmarklets from a development standpoint is that you can't update the code once it's been saved. This can be mitigated by saving only code to load updatable script from a hosted location (like [canyoureaditnow.com][6]).

<figure class="codelisting">

```html
<!-- This code would normally be compressed to one line and not include comments -->
<a id="Target" href="javascript:
// Begin self-executing function
(function(){

  // Check for existing definitions
  if(typeof CYRIN == 'undefined'
    ||typeof CYRIN.Bookmarklet == 'undefined'){

    // Include updatable script
    document.body.appendChild(
      document.createElement('script')
    ).src = 'http://canyoureaditnow.com/Bookmarklet.js?' + (Math.random())

  } else {

    // Otherwise skip to the analysis step
    CYRIN.Bookmarklet.analyze()

  }
}());">CYRIN</a>
```

<figcaption>The <a href="https://gist.github.com/4366664"><abbr title="Can You Read It Now?">CYRIN</abbr> bookmarklet</a>, expanded for readability</figcaption>
</figure>


## Find the text to be analyzed

So, now that the JavaScript is running in the right context, how do we find the text to analyze? I knew it was possible to find the primary text for a page without requiring user input from seeing the Instapaper and Readability bookmarklets in action, but I wasn't sure how to go about implementing something like that myself. Fortunately for me, the [original Readability bookmark is open source][2] and I was able to re-use their working solution.

## Get the displayed style of each piece of text

Once we&rsquo;ve got a handle to the container of the text to analyze, we can use jQuery&rsquo;s [css method][5] to grab the computed <abbr title="Cascading Style Sheets">CSS</abbr> properties of each element.

## Calculate ratings for each aspect of readability

Style data from each piece of text and the elements nearby are used to calculate ratings which are then weighted by how much of the document by character count this text represents. This is how a tree of <abbr title="Document Object Model">DOM</abbr> elements gets rated and turned into one set of scores for the entire page.

## Display the results

Now we have a set of scores to display within the document that we just finished rating. In order to prevent the hosted page from affecting how the scores are styled they are displayed in an [IFrame][3], where only the directly included styles will apply. This also allows the markup to be served by the <abbr title="Can You Read It Now?">CYRIN</abbr> server rather than included in JavaScript.

## Wrapping up

That&rsquo;s all I have to say about <abbr title="Can You Read It Now?">CYRIN</abbr> for now. If you have any questions feel free to contact me at [kevin.gorski@gmail.com][4].

Until next time.

[1]: http://en.wikipedia.org/wiki/Bookmarklet
[2]: https://code.google.com/p/arc90labs-readability/
[3]: http://en.wikipedia.org/wiki/iframe
[4]: mailto:kevin.gorski@gmail.com
[5]: http://api.jquery.com/css/
[6]: http://canyoureaditnow.com
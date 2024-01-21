---
title: CYRIN Metrics Part 2
description: More about how CYRIN calculates readability
date: 2012-11-18T19:00:00.000Z
tags:
  - CYRIN
  - Typography
---

[Continuing][1] our exploration of typographic terminology used by [<abbr title="Can You Read It Now?">CYRIN</abbr>][2] and how its scores are calculated:

## Justification

> Left-justified text is most natural to read for most text.

The justification of text describes how it will be aligned to the edges of your page, which in turn will determine how words will be distributed throughout those lines.

There are four options for justification, but only two are good choices for body text and only one is feasible with the current state of browser technology. Let me explain.

Centered text is terrible for reading more than a few lines at a time because of its uneven left edge, making each new line a chore to begin. It can be interesting and artfully used for poetry or a piece with careful art direction, but for readability&rsquo;s sake it usually passes from interesting to distracting.

Right-justified text isn&rsquo;t easy to follow for languages that read left-to-right for much the same reason, even through the right edge is easy enough to find.

Fully-justified text (as often used in books and newspapers) is the easiest option to read when done well. This is — unfortunately — an area of browser technology that lags behind traditional publishing because the algorithm for placing text when fully justified is much more complicated than for text with a ragged edge.

The simplest algorithm for full justification is what is currently used: fill a line with words and split the leftover space between each word. This gives the straight edges of full justification, but because it is inflexible it introduces a new readability problem between the edges: [&ldquo;rivers&rdquo;][3] of vertical whitespace.

To avoid this and gain more control over the per-line-layout of text, words get hyphenated and [swashes][4] (alternate, decorative glyph forms that take up more horizontal space) take the place of some standard glyphs in order to balance each line&rsquo;s contents.

Publishing software is built with automatic and configurable hyphenation and swashing (swashbuckling?) in mind, but as it stands today browsers don&rsquo;t have features that are as automatic *or* configurable. [Soft hyphens][5] give you the option to manually include optional hyphenation points in text, but man, what a drag to have to bloat your documents to build yourself what the browser should be doing for you.

If these features improve and are available across browsers this recommendation may change, but for now it&rsquo;s best to stick to left-justified text.

## Margin & Padding

> Creating visual space on the left and right of text will make it easier to visually separate from the rest of the page.

Margin & padding are <abbr title="Cascading Style Sheets">CSS</abbr> attributes for creating space around specific elements on the page. By keeping the edges of your text clear from other content, background changes or the edge of the screen you&rsquo;ve prevented your reader from having to fight those distractions to keep focused on your text.

## Text Color Contrast

> The contrast ratio between the text color and the background color needs to be greater the smaller the text is.

Color contrast enters into theory, mathematics and physiology that I only partially understand. It&rsquo;s big, hairy and complicated, but there&rsquo;s an algorithm to follow, so for now I trust the [<abbr title="Web Content Accessibility Guidelines">WCAG</abbr>][6] and hope that&rsquo;s enough to be useful.

## Percentage of Text Stylized

> Bold, italicized, and all-caps text should be kept to a minimum.

Each of these styles have their place in emphacising or decorating specific parts of a body of text, but using any as the mainstay of your document will be a special kind of disaster.

## Wrapping Up

That&rsquo;s it for further details of the metrics <abbr title="Can You Read It Now?">CYRIN</abbr> uses to rate text&rsquo;s readability. After Thanksgiving I&rsquo;ll cover the technical details of how <abbr title="Can You Read It Now?">CYRIN</abbr> works in the browser.

Until next time.

[1]: ../CYRIN-Metrics-Part-1/
[2]: http://canyoureaditnow.com
[3]: http://en.wikipedia.org/wiki/River_(typography)
[4]: http://en.wikipedia.org/wiki/Swash_(typography)
[5]: http://www.w3.org/TR/html401/struct/text.html#h-9.3.3
[6]: http://www.w3.org/TR/WCAG/
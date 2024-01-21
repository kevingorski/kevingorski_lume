---
title: Software Decay
description: Why bits aren't forever, at least not in every way you'd like
date: 2013-08-11T17:00:00.000Z
tags:
  - Building Software
---

Every time you play a song from your digital source of choice the bits representing that song are the same as they were on release day, but those bits also represent a series of tradeoffs made in the course of recording and reproducing that sound. In the meantime, the world changes. Better quality compression, new devices with more storage and processing power, and new ways of reproducing sound for specific environments are created and old recordings sound worse by comparison. *The representation stays the same, but expectations, constraints, and contexts change.*

The same decay happens to software, but because software is the digital approximation of thought rather than something physical it is necessarily more vulnerable:

* Software's quality can be measured in more ways than phyiscal phenomena, so it there are more ways for it to be found wanting
* The disciplines of building software change more quickly than the physical sciences (if only incrementally)
* Software and thought are not bound by the limits of human senses, but by tools that transform raw data into actionable information, lucid communication, and ingenuity

The same aspects that give software nearly endless expressions and usefulness also make it decay more quickly. How do you build software to prevent this decay from overwhelming the value it provides?

## Growing Healthy Software

I don't recall where I first read the idea that building software is closer to gardening than manufacturing, but it's a useful metaphor in that there is never a shortage of work to be done to keep a garden or software healthy and it requires both experience and attention to detail to choose the right work to be doing at any given time:

* *Build adaptable software* - Separate concerns, loosen coupling, pay off technical debt on a schedule (just as you would monetary debt).
* *Release often* - Automate as much of your testing and deployment as possible, make reverting to a known good state as easy as deploying the latest version (which should be pretty damn easy).
* *Listen to your audience* - Both through direct contact (interviews, usability testing, feedback forms, customer support) and analytics of usage.
* *Be aware of the competition and broader landscape* - You don't always have to react directly to changes being made to other software, but if you don't at least pay attention to other developments you're more likely to be at a disadvantage to someone who does.
* *Refine at all scales* - Small details should always be fair game for improvements. Large changes will be less frequent, but should never be out of the question and should show up earlier than you think in the development timeline.
* *Remove unnecessary complexity* - Not all complexity is bad or unwarrented, but regularly question whether it's still worth it.

Not every team will need to or can keep up with all of these ideals, but the benefits of implementing each can extend beyond slowing software decay to imbuing day-to-day work with a sense of professionalism and purpose.
---
title: Time and Software
description: It's just time, right?
date: 2014-05-10T17:00:00.000Z
tags:
  - Building Software
---
There are few things more frustrating in building and using software than an awkward and error-prone system. No such system is as commonly encountered as time. [I&rsquo;m not the first person to point this out](http://msmvps.com/blogs/jon_skeet/archive/2009/11/02/omg-ponies-aka-humanity-epic-fail.aspx), but I&rsquo;d like to contribute a series of questions that might help to explain how your system is mistreating time. Not all systems will require paying attention to all of these details, but knowing what tradeoffs you are willing to make is at the heart of engineering and design.

## Time Prompts

* How does your system handle date entry?
    * Are there dates that are not valid for entry? How is this communicated to the user?
    * For text inputs:
        * Which of the following formats do you accept?
            * MM/DD/YY
            * MM/DD/YYYY
            * DD/MM/YY
            * DD/MM/YYYY
        * Would it make sense to accept logical shorthands like the following?
            * Yesterday
            * Last Sunday
            * +1w
            * Night before Christmas
    * For visual inputs:
        * Is a calendar or list of days/months/years really the best input choice?
        * Before/after target date - age verification
        * Timeline - selecting a date range within a context of other events
    * What is your expected scale of input?
        * Past dates
            * Long ago - historical data entry
            * Within decades - selecting birthdays for adults
            * Within years - selecting birthdays for children
            * Within months - not sure?
        * Very recent or very near future
        * Future dates
            * Within months - scheduling appointments
            * Within years - goal setting
            * Within decades - retirement planning
            * Far future - science fiction timeline
* When comparing two times:
    * Are your measurements in the same timezone?
    * Are your measurements coming from the same source? If not, are the clocks of the different sources in sync?
    * Does the result of your comparisons round partial units (days/hours/minutes/etc) as desired?
    * What happens if the result is negative?
* Timezones!
    * What happens when measurements cross a daylight savings boundary?
    * Does your system handle to-the-hour daylight savings changes?
    * Does your system handle historical and present daylight savings behaviors?
    * When you display a time to the user, which timezone should it be in?
        * Configured timezone
        * Entered timezone - data sources from different timezones cause trouble here
        * Server timezone - what happens if the server moves?
        * User-local timezone - what happens if the user is in another timezone or has to communicate to another user of the system in a different timezone?

## Out of Time

I&rsquo;m sure there are plenty of other details to working with time that I&rsquo;ve missed, but it&rsquo;s a large enough sampling to show how much of an iceberg time can be. I hope this forewarning helps you navigate around it safely.
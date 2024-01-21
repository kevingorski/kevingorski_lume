---
title: Get More From jQuery Promises
description: Intro to and tips for using jQuery Promises
date: 2013-01-05T19:00:00.000Z
tags: 
  - JavaScript
---

> Note: jQuery promises are probably not what you want to use at this point (January, 2016). Look into ES2015 promises or libraries that conform to that spec.

Intro: [Promises and deferred objects][3] were introduced to jQuery way back in [version 1.5][2] as part of a re-write of the <abbr title="Asynchronous JavaScript and XML">AJAX</abbr> module. I&rsquo;ve only started using them in earnest in the past few months while building [<abbr title="Lead Management System">LMS</abbr>][5], but they&rsquo;ve become essential to keeping asynchronous code readable and maintainable. There are already [a lot][1] [of resources][4] available on this subject, but here I&rsquo;ve included all of the useful details I picked up from different places while learning the ins and outs of using jQuery&rsquo;s promise implementation.


## What Is A Promise Worth?

A *promise* represents the result of a single execution of a task that will complete at a time unknown to the caller. It could complete immediately, in the future or it could have already been completed. In code a promise object is used to register callbacks to be executed when the state of that task changes and to manage higher-level workflow, but never to change the state of the task.


## Promises From jQuery
Since promises were introduced as part of the <abbr title="Asynchronous JavaScript and XML">AJAX</abbr> re-write the go-to example is the [`$.ajax`][18] family of methods which now return promises in addition to the original <abbr title="Application Programming Interface">API</abbr> of accepting success and failure methods in the configuration object:

<figure class="codelisting"><pre><code lang="javascript" class="javascript">// Original API
$.ajax({
  url: 'http://example.com/fakeapi',
  success: function(data, textStatus, jqXHR) {},
  error: function(jqXHR, textStatus, errorThrown) {},
  complete: function(jqXHR, textStatus) {}
});

// With Promises
$.ajax({ url:'http://example.com/fakeapi' })
  .then(function(data, textStatus, jqXHR) {
    // success
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    // error
  })
  .always(function() {
    // complete
    // arguments will mirror success or error as called
  });</code></pre><figcaption>Comparing the AJAX APIs</figcaption></figure>

It looks a little cleaner, but what more can we do with a promise object?


### Chaining Promises
If a promise method like [`then`][17] returns another promise, so you can chain successive calls to form a descriptive timeline of tasks:

<figure class="codelisting">
  <pre><code lang="javascript" class="javascript">// Promise to get weather
$.getJSON('http://weather.com/forecast/80001')
  .then(function() {
    // Get the text description of the forecast
    var description = data.forecast[0].description;

    // Return promise to get photos
    return $.getJSON('http://photos.com/search/' + description);
  })
  .then(function(data) {
    var photos = data.photos;

    // Display the photos
  });</code></pre>
  <figcaption>Chaining promises for easy-to-read async code</figcaption>
</figure>

The promise <abbr title="Application Programming Interface">API</abbr> also includes a function called `pipe` which was originally different from `then` for &ldquo;pre-filtering&rdquo; the results of a promise, but as of 1.8 `then === pipe`, as [discussed on Stack Overflow][6].

In any case, using `then` is much cleaner than it would have been with configuration objects and nested callbacks, but we can take this further.


### Getting Multivariate
What if we have multiple task-based dependencies, but they don&rsquo;t depend on each other?

<figure class="codelisting">
  <pre><code lang="javascript" class="javascript">// Parameter list of promises
$.when($.get('google'), $.get('bing'))
  // All finished, results in same order
  .then(function(googleData, bingData) {
    // Now compare results
  });</code></pre>
  <figcaption>Combining multiple promises into an aggregate</figcaption>
</figure>

Now we&rsquo;re getting somewhere! Coordination of multiple asynchronous tasks would otherwise be difficult to write, difficult to read and difficult to debug, but by using promises everything is clear and concise.


### Say &ldquo;When?&rdquo;

At some point you will want to conditionally include promises in the parameter list to [`when`][19]. One way to do this is to add promises to an array and then use [`function.apply`][7] to match the method signature:

<figure class="codelisting">
  <pre><code lang="javascript" class="javascript">$.when.apply($, arrayOfPromises);</code></pre>
  <figcaption>Applying `when` to an arbitrary number of promises</figcaption>
</figure>

This will work, but has a few downsides:

* It&rsquo;s an awkward expression to remember and repeat
* It&rsquo;s no longer immediately clear what we&rsquo;re waiting on
* If you&rsquo;re expecting results from these promises they will now be given to the callback in an unpredictable order

The first problem can be mitigated by writing a function that does this directly like [Q&rsquo;s `all` method][8] (Q is another JavaScript promises implementation), but there&rsquo;s an approach that has none of these downsides which I prefer.

When you pass an object that isn&rsquo;t a promise to `when` (determined by the existence of a `promise` function on the object) it&rsquo;s interpreted as being an immediate result that will be passed through to `then` just like a successful promise result. By taking advantage of this behavior we can maintain clarity and avoid adding another method to the <abbr title="Application Programming Interface">API</abbr>:

<figure class="codelisting">
  <pre><code lang="javascript" class="javascript">function getTemplate(premiumAccount) {
  if(!premiumAccount)
    return 'free template';

  // Promise the premium template
  return $.get('premiumTemplate');
}

function uploadResume(resumeFile, premiumAccount) {
  return
    $.when(uploadResume(resumeFile), getTemplate(premiumAccount))
      .then(function(resumeMediaKey, template) {
        // Ready to display
        return renderTemplate(template, resumeMediaKey);
      });
}</code></pre>
  <figcaption>Combining promises and plain objects</figcaption>
</figure>


## Making Your Own Promises
Now that we know how to use promises, let&rsquo;s make some of our own using deferred objects.

A *deferred object* can do all that a promise can plus change the state of the task. You won&rsquo;t see jQuery return a deferred object from anywhere but the factory method [`$.Deferred`][20] because the state of a task should only be changed by the code that has implemented that task.

Once we&rsquo;ve created our deferred object, there are three methods that you&rsquo;ll likely need to use:

* [`resolve`][9] - mark this task as having completed successfully, optionally passing values
* [`reject`][10] - mark this task as having failed, also with optional values
* [`promise`][16] - get the more targeted promise object for attaching handlers to state changes

Here they are in a quick example:

<figure class="codelisting">
  <pre><code lang="javascript" class="javascript">function upload(fileName) {
  var uploading = $.Deferred();

  // Imaginary file upload API
  file.upload(function(err, mediaKey) {
    if(err) {
      // Change to error/failed state
      uploading.reject(err);
    } else {
      // Pass the generated key to observers
      uploading.resolve(mediaKey);
    }
  });

  return uploading.promise();
}</code></pre>
  <figcaption>Using resolve, reject, and promise</figcaption>
</figure>

If you want even more control over how the success or failure methods are called, [`resolveWith`][11] and [`rejectWith`][12] set the first parameter as the context for executing those functions, meaning that within the callback `this` will point to the object you provide instead of the deferred object.

There&rsquo;s one more feature of jQuery&rsquo;s promises that seems useful, but I haven&rsquo;t seen used much: progress notifications. Deferred objects have a [`notify`][13] method (and [`notifyWith`][14] as above) that will send data to [`progress`][15] handlers.

<figure class="codelisting">
  <pre><code lang="javascript" class="javascript">// Task-based code with deferred object "fileUploading"
file.updating(function(bytesReceived) {
  uploading.notify(bytesReceived);
});

// Calling code, could also be the third parameter to "then"
uploadFile(fileToUpload)
  .progress(function(bytesReceived) {
    console.log(bytesReceived + ' B / ' + file.totalBytes + ' B');
  });</code></pre>
  <figcaption>Notification via promises</figcaption>
</figure>

Now let&rsquo;s put everything together:

<iframe src="http://bl.ocks.org/d/4415942/" width="100%" height="225"></iframe>

<figure class="codelisting">
<pre><code lang="javascript" class="javascript">// Imaginary file upload API
var file = {
  totalBytes: 300,
  upload: function(fileName) {
    var uploading = $.Deferred(),
      bytesTransferred = 0;
      transferringInterval = setInterval(function() {
        bytesTransferred += 50;

        uploading.notify(bytesTransferred);

        // Simulate error
        if(Math.random() &gt; 0.95) {
          // Change to error/failed state
          uploading.reject('Simulated network error');
        }

        if(bytesTransferred &gt;= file.totalBytes) {
          // Pass the generated key to observers
          clearInterval(transferringInterval);

          uploading.resolve('MEDIAKEY');
        }
      }, 250);

    return uploading.promise();
  }
};

$(function() {
  var $console = $('#console'),
    $uploadButton = $('#upload');

  $uploadButton.click(function(){
    $uploadButton.attr('disabled', 'disabled');

    $console.empty();

    file.upload('thefile')
      .then(
        // Success
        function(resourceKey) {
          $console.append('&lt;li&gt;File uploaded successfully with key ' + resourceKey + '&lt;/li&gt;');
        },
        // Failure
        function(err) {
          $console.append('&lt;li&gt;File failed to upload: ' + err + '&lt;/li&gt;');
        },
        // Progress
        function(bytesReceived) {
          $console.append('&lt;li&gt;' + bytesReceived + ' B / ' + file.totalBytes + ' B&lt;/li&gt;');
        })
        .always(function() {
          $console.append('&lt;li&gt;Complete.&lt;/li&gt;');
          $uploadButton.removeAttr('disabled');
        });
  });
});</code></pre>
  <figcaption>File uploading example</figcaption>
</figure>


## Wrapping Up

That&rsquo;s promises in a nutshell. Remember that they can be used for more than coordinating network related code: you can model workflows like checkout processes, manage complex <abbr title="Document Object Model">DOM</abbr> interactions like animations, and more. I hope this introduction has given you the tools to appreciate and use promises in your own code.


[1]: http://msdn.microsoft.com/en-us/magazine/gg723713.aspx "Julian Aubourg and Addy Osmani's article on MSDN"
[2]: http://blog.jquery.com/2011/01/31/jquery-15-released/
[3]: http://api.jquery.com/category/deferred-object/ "jQuery promises documentation"
[4]: http://www.erichynds.com/jquery/using-deferreds-in-jquery/
[5]: /projects-&-portfolio.html#lms "HomeAway Lead Management System"
[6]: http://stackoverflow.com/questions/12011925/pipe-and-then-documentation-vs-reality-in-jquery-1-8
[7]: https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Function/Apply
[8]: https://github.com/kriskowal/q#combination
[9]: http://api.jquery.com/deferred.resolve
[10]: http://api.jquery.com/deferred.reject
[11]: http://api.jquery.com/deferred.resolveWith
[12]: http://api.jquery.com/deferred.rejectWith
[13]: http://api.jquery.com/deferred.notify
[14]: http://api.jquery.com/deferred.notifyWith
[15]: http://api.jquery.com/deferred.progress
[16]: http://api.jquery.com/deferred.promise
[17]: http://api.jquery.com/deferred.then
[18]: http://api.jquery.com/category/ajax
[19]: http://api.jquery.com/deferred.when
[20]: http://api.jquery.com/jQuery.Deferred
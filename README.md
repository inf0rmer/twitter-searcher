# Clubjudge Assignment


## Overview

The point of this test assignment is to develop a minimalistic prototype of a Twitter search result viewer. There are 2 parts to the assignment: fulfilling the assignment's requirements and a "questions&answers" segment after delivery.

### Desired functionality

Mockup of the app to develop:

![](https://dl.dropbox.com/u/540375/BrunoAbrantesProj.png)

Project WittyName is all about Twitter searches. You search for specific terms, and you get Twitter results matching that string. As you click every result (#1,#2,#3,#4), they will be mapped out onto the visualization area. The twist is that the visualization area changes with the number of followers of the result clicked. Assuming #1 has 200 followers, #2 has 3, #3 has 1600 and #4 has 251, this is the progression of the visualization area:

After clicking #1:

![](https://dl.dropbox.com/u/540375/Drawing1.png)

After clicking #2:

![](https://dl.dropbox.com/u/540375/Drawing2.png)

After clicking #3:

![](https://dl.dropbox.com/u/540375/Drawing3.png)

After clicking #4:

![](https://dl.dropbox.com/u/540375/Drawing4.png)

So, new results add to the visualization area in proportional size to the number of followers (keep in mind that the actual scale depicted might be a bit off). The specific math is up to you, as is the contents of each result tile, but they should convey the size of the tweet author's following and the contents of the tweet too. 

There should be a limit of 5 results visible within the result visualization area at all times, with the oldest one to be added to the results area being discarded when a sixth one is added.

There should also be a "reset" button to clear the visualization area.


### Requirements

* some sort of javascript framework used (primary)
* some measure of code coverage with a testing framework of your choice (primary)
* client-side data persistence (secondary)
* snazzy animation when result is added to the visualization area (secondary)
* Backbone.js (secondary)
* a cool feature that we didn't ask for (secondary)
* bonus points for a truly witty name!

### Deadline

The deadline is set to Feb 15th. If you need more time (2/3 days), let us know. If you have any questions, let us know.


Good luck!

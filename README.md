
# Glitch Invirtu Screen Grabber

## Overview
To create images of what a user is currently viewing as a "preview" or "thumbnail", a screenshot is taken of the user's current screen and uploaded to the event's 
main image.

## How To Install


Invirtu/BingeWave provides an Overlay CMS that allows developers to easily build their custom functionality into live events (video conferences, live streams, and 
AR). The Overlay CMS also has a no-code interface, allowing non-technical users to make modifications.

The functionality of the screen grabber deployed via the overlay system and can be implemented using the following steps.

  
1.  Create a new widget in the Invirtu/BingeWave [builder here](https://developers.bingewave.com/widgets). **Important**: When making the widget, **mark it as 
published** so it will be usable when you implement it into your template.
4.  From the src folder here, copy the app.js into the Javascript section in the widget builder.
5.  In the Javascript libraries section near the bottom of the interface, add the following external javascript library: 
[https://www.glitch.fun/js/html2canvas.min.js](https://www.glitch.fun/js/html2canvas.min.js)
6.  Save the changes in the widget builder.
7.  Release the widget (button next to save changes).
8.  Go to the Organizer account and create or update a template.
9.  In the Interface Builder, use the Widgets section to add the widget anywhere on-screen.


## How It Works

The Screen Grabber is a relatively simple utility that works as such:
1.  In Invirtu's backend, when a user is created, a copy of their user account is synced with Invirtu's backend, and there JSON Web Token is also stored in Invirtu's 
Backend.
2.  The code for this app listens for when a broadcast is stopped or started. When the broadcast is started, every 60 seconds, a screengrab is executed.
3.  The screengrab is done via HTML2Canvas, which turns the current screen into a blob.
4.  Using the above JSON Web Token that is stored, we save the image to the backend as the event's main image.  

## Key Areas To Understand

The Screen Grabber is comprised of several tools for the functionality to work. To get a better of the tools, you can review the following:

-   [Invirtu Event System (Subscribing and Publishing)](https://developers.bingewave.com/javascript/bwevents)
-   [Invirtu API](https://developers.bingewave.com/javascript/bwapi)
-   [Invirtu Design Layout](https://developers.bingewave.com/javascript/css)
-   [Invirtu User Properties](https://developers.bingewave.com/javascript/bwproperties)
-   [HTML2Canvas](https://html2canvas.hertzen.com/)

Demo: https://untested.github.io/ReceptionApp/public/

# UI/UX Approach 

According to the requirements, what would be most useful information to Euromoney's both visitors and employees are as follows:

- To know how well the company is doing [Useful to Visitors]
- Perhaps, some news and announcements [Useful to Visitors & Employees]
- Little insight about Euromoney

## App Structure

The web app would have 5 screens in total, in which each one of the screens are responsible for different parts of the app.

The screens are as follows:
- Home (Main)
- About Us (Insight)
- Agenda (Upcoming Events)
- Financial Report (How Well is Doing)
- News & Announcements (Latest News/Announcements)

The Home screen is the heart of the app, every time each one of the screens are individually in focus and their sub-items/sub-sections have automatically finished displaying, it hides and then the home screen is shown.

The About Us screen is the best place to show a little bit about the company and its history.

The Agenda screen displays list of upcoming events in the coming month or two, this section of the app may be configured to display maximum number of upcoming events regardless of their date and time.

The Financial screen would only display the yearly financial statics to show its visitors how well the company is doing compare to its previous financial years.

The News & Announcements screen is for displaying the latest news of the company, anything that might be useful to visitors and employees.

## How it Works

Here are number of flags that sets to TRUE when specific resolutions hited.

- TV (Exact Size of W 1920px by H 1080px)
- Desktop (Minimum Size of W 1024px)
- Tablet (Minimum Size of W 768px by 1024px)
- Mobile (Maximum Size of W 767px)

If the app is displayed on a screen resolution of 1920px by 1080px (Width, Height) then we would know that this specific size is for displaying the app on the TV only, therefore we flag the app mode as "TV". There is a high chance of someone visiting the web app on a monitor with that resolution, but their screen resolution will be slightly less due to the web browser toolbar size, statusbar size and the window taskbar size. Therefore the only chance is when the view the app in full screen mode in the browser, but even if they do we could still listen for any keyboard events or mouse events e.g. "Click", and if there was any of those events then we don't flag it as TV.

Flagging the app as in "TV" only has a couple of differences as oppose to "Desktop", the key and most important difference is auto-triggering events, in another word triggering events such as "Click" automatically and this is because there is nobody sitting behind the computer to navigate through the app, therefore we have no choice but to triggering those events automatically based on number of specified intervals.

Apart from the Home screen, the rest of the screens would have some sort of interactions, for example the Agenda screen would have number of events and each event is displayed at a time, therefore for this we must show each one of the one by one in a carousel mode and for this we need to know if it's the first or last event, if the first event is on display, then we trigger the "Next" event after 8 seconds, and when it reaches the last event on the list, then we hide this screen and show the home screen.

This continues for each one of the 4 sections on the home screens in a loop.

However if the app is flagged as Desktop, Tablet or Mobile, the app interactions remains the same except the auto-triggering events and we replace those we "Touch" and "Click" events accordingly.

## What Technologies and Tools

The app uses NPM package manager, Gulp as its task runner so it's easier to compile and transpile SASS and ES6 files.

## The App Status

I have only been able to design the app structure, UI and UX as well as the least possible for the development due not having enough time, otherwise I would have finished it. As you can see there are a lot of things to think about from the development prospective and I already know what I need to do as per my instructions above.

I have manged to code the Home screen, which works from mobile to TV resolution.

## Requirements

In order to run this app on your local machine, you need to install the followings:

- http://nodejs.org, Download and Install Node JS
- npm i -g gulp
- npm i -g http-server

## Run the App

You can run this by simply opening the "./public/index.html" in your web browser, alternativetly a live demo is also available at https://untested.github.io/ReceptionApp/public/

Or follow the commands below, simply run the following commands in your first terminal:

- npm install
- npm run dev (For Development)
- npm run prod (For Production)

And in your second terminal run this command:

- npm run server

The purpose of running a server was so that I could fetch some data from Firebase but because I didn't manage to finish off the rest of the app therefore there is no need for this. I only set it up at the beginning of the project so once I get to calling and fetching some data, I would run into problems.

Thank you :-)
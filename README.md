###KNI Boilerplate###
---
For jump-starting new HTML projects.

## Technologies / Dependencies

We are utilizing the following technologies. These links are for reference only, no actions are required at this point.

  * **[Gulp](http://gulpjs.com)** – Gulp is our task runner of choice, and is responsible for all minification, concatination, and watch tasks for dev.
  * **[Stylus](http://learnboost.github.io/stylus/)** – Stylus provides extremely fast, expressive, powerful, and robust pre-processing for our CSS.
  * **[Nib](http://visionmedia.github.io/nib/)** – Nib is a mixin library for Stylus that handles vendor prefixing at compile-time for our CSS.
  * **[Jeet](http://jeet.gs/)** – Jeet is a mixin library for Stylus that provides us with the ability to use any amount of rows and or columns we need, anywhere we want.
  * **[Rupture](http://jenius.github.io/rupture/)** – Rupture is another mixin library for Stylus that allows us to set up a scale of responsive breakpoints and easily traverse between them.

## Getting Started

The first dependency you will need is [Brew](http://brew.sh/). Brew is a package manager for OSX and will allow us to install, and update Node through the command line. In your Terminal window run the following command:

`ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"`

After that is completed, run:

`brew doctor`

This will tell you if there is anything in your system preventing Brew from doing it's job. Typically there won't be any major problems reported, but go ahead and fix any major blocking issues reported before moving on.

Next up run the following command to get NodeJS and NPM (Node Package Manager) installed -- this may require sudo:

`brew install node`

Assuming this worked, you now have NodeJS installed. While the boilerplate isn't run on a node server, we love to take advantage of it's Node Package Manager!

## Installation Instructions

  1. Clone this repository
  2. Run: `npm install`

# Usage

Run: `gulp watch`

This will compile all of the necessary images, CSS, and Javascript, run watch tasks to compile the aforementioned files when edited, and spin up a live-reload server.

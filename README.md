# One Touch Tracking

# Using UPS API

JSON API is used by making HTTP POST requests to given testing and production URLs.

# Data Standards

After obtaining data from the UPS API, it is reduced to what we need and saved in the extension's storage in Chrome. In the code, both before and after it is reduced from its original size (the before period is short) it is referred to as `shippingData`.

`packageName` always refers to the name of the package and `trackNum` refers to the tracking number. Self explanatory.

# Scripts

* [testlog.js](./scripts/testlog.js) contains logging functions for testing.
* [domutils.js](./scripts/domutils.js) contains functions to help insert things into DOM.
* [datautils.js](./scripts/datautils.js) is used by all scripts and contains functions for accessing and using the data provided by the UPS API.
* [packagelist.js](./scripts/packagescripts.js) contains functions for managing the list of packages in both the DOM and storage.
* [popup.js](./scripts/popup.js) is the primary script that drives the popup and contains the event listener for buttons in the main view.

# Adding Packages

Package Name comes first and Tracking Number comes second. Data is stored with Package Name as key for the given Tracking Number, and names are reformatted to replace spaces with underscores.

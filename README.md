# CS465

# Using UPS API

JSON API is used by making HTPP POST requests to given testing and production URLs.

# Data Standards

Shipping Data object saved from API response is referred to in scripts as `shippingData`, and only the shipping part of returned data is saved. `data` is used to refer to the entire response object, and the whole response is not saved because the other half (called "response") does not appear to be useful. If it is determined to be useful, it may be saved as well.

# Scripts

* [testlog.js](./scripts/testlog.js) contains logging functions for testing.
* [datautils.js](./scripts/datautils.js) is used by all scripts and contains functions for accessing and using the data provided by the UPS API.
* [popup.js](./scripts/popup.js) is the primary script that drives the popup and contains the event listener for things that determine action
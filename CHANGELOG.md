# Changelog
All notable changes on this project will be documented in this file.

## 2.0.1 - 2018-01-12
Added the ability to call `window.qsm` if `module` wasn't available as it isn't when using the package directly in the browser.

## 2.0.0 - 2017-11-17
### Added
* Gave `add` function a `sort()` on object keys so it always returns the same URL even if the keys are shuffled, this is a must have for SEO:ers, before you had to manage the object passed in to add by youself, now qsm handles this for you.
* Fixed so that `add` updates values for keys that already exists instead of appending them, there was issues when you could get multiple occurrences of the same key in your url.
* Added a warning for users using the soon to be deprecated technique with arrays instead of pure objects. **Arrays will be deprecated in next major release.**

## 1.3.0 - 2017-04-28

### Changed
* Changed how `encode` and `decode` works, they now both support of specifiying key that should get the encoded result or what key to decode. Instead of always using the `q` key for this.
# YouTube Thumbnail Hunter Chrome Extension

This Chrome extension allows users to replace the thumbnails of YouTube videos
with random images generated using the [`picsum.photos`](https://picsum.photos/)
API.

<!--toc:start-->

- [YouTube Thumbnail Hunter Chrome Extension](#youtube-thumbnail-hunter-chrome-extension)
  - [Usage](#usage)
  - [How it Works](#how-it-works)
    - [Scraping thumbnails](#scraping-thumbnails)
    - [The lazy-loaded image problem](#the-lazy-loaded-image-problem)
  - [Credits](#credits)
  - [License](#license)
  <!--toc:end-->

## Usage

To use this extension, follow these steps:

1. Clone this repository or download the files to your computer.
2. Open Google Chrome and navigate to the `chrome://extensions` page.
3. Turn on "Developer mode" in the top right corner of the page.
4. Click "Load unpacked" and select the directory where the saved files are present.
5. Open a YouTube video page and watch as random images replace the thumbnail images.

<!-- FUTURE: Chrome Web Store. -->
<!-- - Install the extension from the Chrome Web Store.  -->
<!-- - Navigate to any `https://youtube.com/*` page. -->
<!-- - Enjoy the new random thumbnails! -->

## How it Works

### Scraping thumbnails

The extension works by generating an array of random image URLs of a
specified size using the [`picsum.photos`](https://picsum.photos/).
It then selects all the `<img/>`elements in the HTML document of any
`https://youtube.com/*` web page, and replaces each src attribute with a
random URL from the randomImages array.

### The lazy-loaded image problem

To handle lazy-loaded images, YouTube Thumbnail Hunter uses a
[MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
to detect changes in the DOM.

Without the observer, the images at the top of the page get replaced,
but the ones loaded next stay the same.

The observer replaces the src attributes of img elements with random URLs from
a predefined array when it detects changes.
It watches for new img elements in the entire subtree of document.body.

<details>
  <summary>More</summary>
  <p>This code creates a MutationObserver to detect changes to the DOM and update the img elements array. When changes occur, the img elements' src attributes are replaced with random URLs from a predefined array.</p>
  <p><strong>How it works</strong></p>
  <p>The MutationObserver is created using the MutationObserver constructor. The observer listens for changes in the DOM and triggers a callback function whenever a change is detected. In this case, the callback function updates the img elements array and replaces the src attributes with random URLs from a predefined array of images.</p>
  <p>The observer configuration is set to watch for new img elements in the entire subtree of the document.body. The childList option is set to true to detect when new img elements are added or removed from the DOM.</p>
  <p><strong>Usage</strong></p>
  <p>To use this code, simply include it in your project and the MutationObserver will start observing the document.body element for changes. When changes are detected, the src attributes of any img elements will be replaced with random URLs from the predefined array.</p>
  <p>It is important to note that this code is specifically designed to work with img elements, and may not work as intended with other types of elements.</p>
</details>

## Credits

- picsum.photos for providing the random image generator API.
- Intersection Observer API for enabling lazy-loading image replacement.
- Mozilla Developer Network for their comprehensive documentation on web development.

## License

This extension is licensed under the [MIT License](LICENSE).

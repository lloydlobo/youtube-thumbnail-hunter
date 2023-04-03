# YouTube Thumbnail Hunter Chrome Extension

This Chrome extension allows users to replace the thumbnails of YouTube videos
with random images generated using the [`picsum.photos`](https://picsum.photos/)
API.

<!--toc:start-->

- [YouTube Thumbnail Hunter Chrome Extension](#youtube-thumbnail-hunter-chrome-extension)
  - [How it Works](#how-it-works)
  - [Usage](#usage)
  - [Credits](#credits)
  - [License](#license)
  <!--toc:end-->

## How it Works

The extension is built with JavaScript, and works by generating an array of
random image URLs of a specified size using the picsum. Photos API.
It then selects all the `<img/>`elements in the HTML document of any
`https://youtube.com/*` web page, and replaces each src attribute with a
random URL from the randomImages array.

To handle lazy-loaded images, the extension uses the Intersection Observer API
to detect when an image is in the viewport, and then replaces its
`src` attribute with a random URL.

<!--TODO-->
<!-- The extension is encapsulated in an IIFE to prevent namespace pollution and -->
<!-- conflicts with other scripts on the page. -->
<!-- The module exports a single function startYoutubeImageReplacer() which starts the -->
<!-- observer and initializes the image replacement process for existing images. -->

## Usage

To use this extension, follow these steps:

1. Clone this repository or download the files to your computer.
2. Open Google Chrome and navigate to the `chrome://extensions` page.
3. Turn on "Developer mode" in the top right corner of the page.
4. Click "Load unpacked" and select the directory where the files are saved.
5. Open a YouTube video page and watch as the thumbnail images are replaced
   with random images.

<!-- FUTURE: Chrome Web Store. -->
<!-- - Install the extension from the Chrome Web Store.  -->
<!-- - Navigate to any `https://youtube.com/*` page. -->
<!-- - Enjoy the new random thumbnails! -->

## Credits

- picsum.photos for providing the random image generator API.
- Intersection Observer API for enabling lazy-loading image replacement.
- Mozilla Developer Network for their comprehensive documentation on web development.

## License

This extension is licensed under the [MIT License](LICENSE].

/**
 * This script generates an array of random image URLs of a specified size using the picsum.photos API.
 * It then selects all the <img/> elements in the HTML document of a https://youtube.com/* web page,
 * and replaces each src attribute with a random URL from the randomImages array.
 *
 * The script uses the Intersection Observer API to detect when new images are added to the DOM, and updates
 * their src attributes with a random URL from the randomImages array. The observer is set up to watch for changes
 * to the <img> tags in the document, as well as any added later using infinite scroll.
 *
 * The script is encapsulated in an IIFE to prevent namespace pollution and conflicts with other scripts on the page.
 *
 * The module exports a single function `startYoutubeImageReplacer()` which starts the observer and
 * initializes the image replacement process for existing images.
 */

// Set the URL and desired size (width & height), for the random images to be generated by the API.
const IMAGE_API_URL = "https://picsum.photos";
const IMAGE_WIDTH = 331;
const IMAGE_HEIGHT = 186;
const IMAGE_FORMAT = "webp";

// Construct the URL for a random image of the desired size.
const contentImageUrl = `${IMAGE_API_URL}/${IMAGE_WIDTH}/${IMAGE_HEIGHT}.${IMAGE_FORMAT}`;

// Set the number of times to repeat the random image URL.
const N_REPEAT = 6;

// Create an array with the repeated image URLs.
function createRandomImagesArray(url, count) {
  return Array(count).fill(url);
}

// Get all the <img/> elements in the HTML document of any https://youtube.com/* web page.
function getImgElements() {
  return document.getElementsByTagName("img");
}

// Get all the <img/> elements in the HTML document of any https://youtube.com/* web page.
// const docImgs = getImgElements();

// Replace each image's src attribute with a random URL from the `randomImages` array.
function replaceImgSrcWithRandomUrl(images, urls) {
  for (let i = 0; i < images.length; i++) {
    const randIndex = Math.floor(Math.random() * urls.length);
    images[i].src = urls[randIndex];
  }
}

// Create a MutationObserver to detect changes to the DOM and update the img elements array.
const observer = new MutationObserver(() => {
  docImgs = getImgElements();
  replaceImgSrcWithRandomUrl(docImgs, randomImages);
});

// Define the MutationObserver configuration to watch for new <img/> elements.
const observerConfig = {
  childList: true,
  subtree: true,
  attributes: false,
  characterData: false,
};

// Start observing the <body> element for changes.
observer.observe(document.body, observerConfig);

// Generate random image URLs.
const randomImages = createRandomImagesArray(contentImageUrl, N_REPEAT);

// Get all the <img/> elements on the page.
let docImgs = getImgElements();

// Replace the src attribute of each <img/> element with a random URL from the `randomImages` array.
replaceImgSrcWithRandomUrl(docImgs, randomImages);

////////////////////////////////////////////////////////////////////////////////

/* v1.0.1 */

// The observer.observe() method can be thought of as the beginning of
// a loop that continuously observes the <img> elements on the page and
// replaces their src attributes with a random image URL. The observer
// immediately runs the callback function for any observed elements
// that are already intersecting the viewport, and then waits for
// changes to the intersection status of the observed elements. When an
// element becomes intersecting or stops being intersecting, the observer
// triggers the callback function, which replaces the src attribute of the
// observed element with a new random URL.
//
// The code that generates the randomImages and docImgs arrays and
// calls the replaceImgSrcWithRandomUrl function will run once after
// the observer.observe method call to replace the src attributes
// of the already existing <img> elements on the page.
//
// However, the replaceImgSrcWithRandomUrl function will be
// called again each time the intersection observer detects that new <img>
// elements have been added to the page, ensuring that the new elements
// also have their src attributes replaced with random images.
//
// After observer.observe(), randomImages and docImgs are generated and
// replaceImgSrcWithRandomUrl() is called once to update the src attributes
// of already existing <img> elements. But, new <img> elements may be
// added to the DOM later, which are not affected by the initial call. So,
// each time the MutationObserver triggers a mutation, new arrays of random
// images and <img> elements are generated, and replaceImgSrcWithRandomUrl()
// is called again with these new arrays to update the src attributes of
// newly added <img> elements.

/* v1.0.0 */

/**
 * This script generates an array of random image URLs of a specified size using the picsum.photos API.
 * It then selects all the <img/> elements in the HTML document of a https://youtube.com/* web page,
 * and replaces each src attribute with a random URL from the randomImages array.
 *
 * To handle lazy-loaded images, this script uses the IntersectionObserver API
 * to detect when the image is in the viewport and then replace its src attribute.
 */
// Get all the <img/> elements in the HTML document of any https://youtube.com/* web page.
// const randomImages = createRandomImagesArray(contentImageUrl, N_REPEAT);
// const docImgs = getImgElements();
// replaceImgSrcWithRandomUrl(docImgs, randomImages);

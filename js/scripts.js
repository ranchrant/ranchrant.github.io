
// Load random content in the dynamic box on page load
function loadRandomContent() {
  var contentArray = [
    "Tip: Always carry a towel.",
    "Shteen-mode Diaries: Volume 1",
    "Animal of the Month: The Mighty Platypus"
  ];
  var randomIndex = Math.floor(Math.random() * contentArray.length);
  document.getElementById('dynamic-content').innerText = contentArray[randomIndex];
}

// Rotate header image every 5 hours
let headerImages = [
  'images/header1.jpg',
  'images/header2.jpg',
  'images/header3.jpg'
];

function rotateHeaderImage() {
  var currentTime = new Date().getTime();
  var imageIndex = Math.floor((currentTime / (5 * 60 * 60 * 1000)) % headerImages.length);
  document.getElementById('logo').style.backgroundImage = 'url(' + headerImages[imageIndex] + ')';
}

// Swipe functionality for mobile story navigation
function enableSwipeNavigation() {
  let startX;
  document.addEventListener('touchstart', function(e) {
    startX = e.changedTouches[0].pageX;
  }, false);

  document.addEventListener('touchend', function(e) {
    let endX = e.changedTouches[0].pageX;
    if (startX - endX > 50) {
      // Swipe left (next story)
      goToNextStory();
    } else if (endX - startX > 50) {
      // Swipe right (previous story)
      goToPreviousStory();
    }
  }, false);
}

// Placeholder functions for navigating stories
function goToNextStory() {
  console.log("Next story");
}

function goToPreviousStory() {
  console.log("Previous story");
}

// Display popup for calendar event when clicked
function showEventPopup(eventId) {
  var eventInfo = document.getElementById(eventId);
  var popupContent = eventInfo.innerHTML + '<a href="events/' + eventId + '.html"> Read more...</a>';
  alert(popupContent); // Placeholder for actual popup logic
}

// Attach event listener for word cloud search
function enableWordCloudSearch() {
  var words = document.querySelectorAll('#word-cloud span');
  words.forEach(function(word) {
    word.addEventListener('click', function() {
      var searchTerm = word.innerText;
      performSearch(searchTerm);
    });
  });
}

// Perform search for a word in the word cloud
function performSearch(query) {
  console.log("Search triggered for: " + query); // Placeholder for actual search functionality
}

// Initialize the script after the page has loaded
window.onload = function() {
  loadRandomContent();
  rotateHeaderImage();
  enableSwipeNavigation();
  enableWordCloudSearch();
};

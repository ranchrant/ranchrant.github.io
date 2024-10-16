// Load story content from text files (e.g., week1.txt, week2.txt)
function loadStoryContent(file) {
  fetch('stories/' + file)
    .then(response => response.text())
    .then(data => {
      let lines = data.split('\n');
      let storyTitle = lines[0].replace("Title. ", "");
      document.getElementById('story-title').innerText = storyTitle;

      let storyContent = lines.slice(1).join('\n');
      document.getElementById('story-content').innerText = storyContent;
    })
    .catch(error => console.log("Error loading story content:", error));
}

// Load random content from content.txt
function loadRandomContent() {
  fetch('content/content.txt')
    .then(response => response.text())
    .then(data => {
      let contentArray = data.split('\n');
      let randomIndex = Math.floor(Math.random() * contentArray.length);
      document.getElementById('dynamic-content').innerText = contentArray[randomIndex];
    })
    .catch(error => console.log("Error loading random content:", error));
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
      goToNextStory();
    } else if (endX - startX > 50) {
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

// Display popup for missing fields or success on form submission
function showFormPopup(message) {
  alert(message); // Placeholder for a smooth fade-in animation popup
}

// Send Tea form validation
function validateSendTeaForm() {
  let alias = document.querySelector("#alias").value;
  let whahappen = document.querySelector("#whahappen").value;
  
  if (!alias || !whahappen) {
    showFormPopup("Missing field(s)!");
  } else {
    showFormPopup("Thanks!");
    // Here you can add logic to send form data to email or server
    setTimeout(function() {
      document.querySelector("#alias").value = '';
      document.querySelector("#whahappen").value = '';
    }, 1000);
  }
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
  loadStoryContent('week1.txt'); // Load initial story from week1.txt
  loadRandomContent(); // Load random dynamic content
  rotateHeaderImage(); // Set up header image rotation
  enableSwipeNavigation(); // Enable swipe for mobile
  enableWordCloudSearch(); // Enable word cloud functionality
};

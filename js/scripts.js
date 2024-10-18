document.addEventListener('DOMContentLoaded', () => {
    // Function to load and display the current story
    function loadStory() {
        fetch('stories/current.txt')
            .then(response => response.text())
            .then(data => {
                const storyContainer = document.getElementById('story-content');
                const titleContainer = document.getElementById('story-title');

                // Split the content into lines
                const lines = data.split('\n');

                // Find the title after "Title."
                const titleLineIndex = lines.findIndex(line => line.startsWith('Title.'));
                if (titleLineIndex !== -1) {
                    const title = lines[titleLineIndex].replace('Title.', '').trim();
                    titleContainer.textContent = title; // Set the title
                }

                // Process the stories that start with "1.", "2.", etc.
                let storyContent = '';
                let storyTitle = '';
                for (let i = titleLineIndex + 1; i < lines.length; i++) {
                    const line = lines[i].trim();

                    // Story starts with "1.", "2.", etc., and grabs the title of each story
                    if (/^\d+\./.test(line) && lines[i - 1] === '') {
                        if (storyTitle !== '') {
                            storyContent += `<h3>${storyTitle}</h3>`; // Display the previous story title
                        }
                        storyTitle = line.replace(/^\d+\./, '').trim(); // Remove "1.", "2." and keep the title
                    } else if (line !== '') {
                        // Normal story content; paragraphs are separated by double line breaks
                        storyContent += `<p>${line.replace(/\n/g, '<br><br>')}</p>`;
                    }
                }

                // Add the final story
                if (storyTitle !== '') {
                    storyContent += `<h3>${storyTitle}</h3>`;
                }

                // Set the story content to the container
                storyContainer.innerHTML = storyContent;
            })
            .catch(err => console.error("Error loading current story:", err));
    }

    loadStory(); // Call the function to load the current story

    // Remaining code for dynamic content and form validation...
});

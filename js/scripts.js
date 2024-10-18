document.addEventListener('DOMContentLoaded', () => {
    // Function to load and display the current story
    function loadStory() {
        fetch('stories/current.txt')
            .then(response => response.text())
            .then(data => {
                const storyContainer = document.getElementById('story-content');
                const titleContainer = document.getElementById('story-title');

                const lines = data.split('\n');

                // Find the title after "Title."
                const titleLineIndex = lines.findIndex(line => line.startsWith('Title.'));
                if (titleLineIndex !== -1) {
                    const title = lines[titleLineIndex].replace('Title.', '').trim();
                    titleContainer.textContent = title; // Set the overall title
                }

                let storyContent = '';
                let storyTitle = '';

                for (let i = titleLineIndex + 1; i < lines.length; i++) {
                    const line = lines[i].trim();

                    // Story starts with "1.", "2.", etc.
                    if (/^\d+\./.test(line) && lines[i - 1] === '') {
                        if (storyTitle !== '') {
                            storyContent += `<h3 style="color: lightgreen;">${storyTitle}</h3>`;
                        }
                        storyTitle = line.replace(/^\d+\./, '').trim();
                    } else if (line !== '') {
                        storyContent += `<p>${line.replace(/\n/g, '<br><br>')}</p>`;
                    }
                }

                if (storyTitle !== '') {
                    storyContent += `<h3 style="color: lightgreen;">${storyTitle}</h3>`;
                }

                storyContainer.innerHTML = storyContent;
            })
            .catch(err => console.error("Error loading current story:", err));
    }

    loadStory();

    // Dynamic content cycling
    let dynamicContentIndex = 0;
    const dynamicContent = document.getElementById('dynamic-content');
    const contentList = ["Tip 1:

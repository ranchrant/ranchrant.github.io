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
                    if (/^\d+\./.test(line)) {
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

    // Dynamic content cycling
    let dynamicContentIndex = 0;
    const dynamicContent = document.getElementById('dynamic-content');
    const contentList = ["Tip 1: Try this!", "Tip 2: Did you know?", "Tip 3: Stay tuned!"]; // Placeholder content

    if (dynamicContent) {
        dynamicContent.textContent = contentList[dynamicContentIndex]; // Load the initial content

        setInterval(() => {
            dynamicContentIndex = (dynamicContentIndex + 1) % contentList.length;
            dynamicContent.textContent = contentList[dynamicContentIndex];
        }, 10000); // 10 seconds interval
    }

    // Navigation through dynamic content arrows
    const leftArrow = document.querySelector('.nav-arrow:first-of-type');
    const rightArrow = document.querySelector('.nav-arrow:last-of-type');

    if (leftArrow && rightArrow && dynamicContent) {
        leftArrow.addEventListener('click', () => {
            dynamicContentIndex = (dynamicContentIndex - 1 + contentList.length) % contentList.length;
            dynamicContent.textContent = contentList[dynamicContentIndex];
        });

        rightArrow.addEventListener('click', () => {
            dynamicContentIndex = (dynamicContentIndex + 1) % contentList.length;
            dynamicContent.textContent = contentList[dynamicContentIndex];
        });
    }

    // Form validation for the Send Tea page
    const aliasInput = document.getElementById('alias');
    const whahappenInput = document.getElementById('whahappen');
    const aliasCharCount = document.getElementById('alias-char-count');
    const whahappenCharCount = document.getElementById('whahappen-char-count');

    if (aliasInput && whahappenInput) {
        aliasInput.addEventListener('input', () => {
            aliasCharCount.textContent = `${aliasInput.value.length}/50`;
        });

        whahappenInput.addEventListener('input', () => {
            whahappenCharCount.textContent = `${whahappenInput.value.length}/200`;
        });
    }

    window.validateSendTeaForm = () => {
        const aliasValue = aliasInput.value.trim();
        const whahappenValue = whahappenInput.value.trim();

        if (aliasValue === '' || whahappenValue === '') {
            alert("Missing field(s)!");
        } else {
            alert("Thanks!");
            aliasInput.value = '';
            whahappenInput.value = '';
        }
    };

    // Archive loading for archive.html
    function loadArchive() {
        fetch('archive/')
            .then(response => {
                if (!response.ok) throw new Error('Failed to load archive folder');
                return response.text();
            })
            .then(data => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(data, 'text/html');
                const files = Array.from(doc.querySelectorAll('a'))
                    .filter(file => file.href.endsWith('.txt'))
                    .map(file => file.href);

                const archiveList = document.getElementById('archive-items');
                files.forEach(file => {
                    fetch(file)
                        .then(response => response.text())
                        .then(storyData => {
                            const storyParts = storyData.split('\n');
                            const title = storyParts[0];
                            const preview = storyParts.slice(1).join(' ').substring(0, 100); // First 100 characters as preview

                            const listItem = document.createElement('li');
                            listItem.innerHTML = `<strong>${title}</strong> - ${preview}`;
                            archiveList.appendChild(listItem);
                        })
                        .catch(err => console.error('Error loading archive story:', err));
                });
            })
            .catch(err => console.error('Error loading archive:', err));
    }

    // Call loadArchive on archive page load
    if (document.getElementById('archive-items')) {
        loadArchive();
    }

    // Newsletter submission function (basic functionality for now)
    window.submitNewsletter = () => {
        const emailInput = document.getElementById('email').value.trim();
        if (emailInput === '') {
            alert('Please enter a valid email address.');
        } else {
            alert('Thanks for signing up!');
            document.getElementById('email').value = ''; // Clear the input field
        }
    };
});

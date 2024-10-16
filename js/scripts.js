document.addEventListener('DOMContentLoaded', () => {
    // Load story content from the current story file in the stories folder
    function loadStory(fileName) {
        fetch('stories/' + fileName) // Load from the 'stories' folder
            .then(response => response.text())
            .then(data => {
                const storyParts = data.split('\n'); // Assuming title and content are separated by new lines
                document.getElementById('story-title').textContent = storyParts[0]; // Title in the first line
                document.getElementById('story-content').textContent = storyParts.slice(1).join('\n'); // Rest as content
            })
            .catch(err => console.log("Error loading story:", err));
    }

    // Call the function to load the current story (week1.txt or whatever is in 'stories/')
    loadStory('week1.txt'); // Make sure the current story file is named accordingly in 'stories/'

    // Dynamic content cycling
    let dynamicContentIndex = 0;
    const dynamicContent = document.getElementById('dynamic-content');
    const contentList = ["Tip 1: Try this!", "Tip 2: Did you know?", "Tip 3: Stay tuned!"]; // Placeholder content from content.txt

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
        const archiveItems = [
            { title: "Story Title 1", preview: "First 100 characters of story 1..." },
            { title: "Story Title 2", preview: "First 100 characters of story 2..." },
            { title: "Story Title 3", preview: "First 100 characters of story 3..." }
        ];

        const archiveList = document.getElementById('archive-items');
        archiveItems.forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<strong>${item.title}</strong> - ${item.preview}`;
            archiveList.appendChild(listItem);
        });
    }

    // Call loadArchive on archive page load
    if (document.getElementById('archive-items')) {
        loadArchive();
    }
});

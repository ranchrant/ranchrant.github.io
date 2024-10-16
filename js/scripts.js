document.addEventListener('DOMContentLoaded', () => {
    // Load story content from the current.txt file
    function loadStory() {
        fetch('stories/current.txt')
            .then(response => response.text())
            .then(data => {
                const storyParts = data.split('\n');
                document.getElementById('story-title').textContent = storyParts[0]; // Title is the first line
                document.getElementById('story-content').textContent = storyParts.slice(1).join('\n'); // Content is the rest
            })
            .catch(err => console.error("Error loading story:", err));
    }

    loadStory(); // Call the function to load the current story

    // Archive - dynamically load all archive stories
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

    if (document.getElementById('archive-items')) {
        loadArchive(); // Call loadArchive if on archive page
    }

    // Remaining dynamic content and form handling code here...
});

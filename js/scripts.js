document.addEventListener('DOMContentLoaded', () => {
    // Handle character count for the Send Tea form
    const aliasInput = document.getElementById('alias');
    const aliasCharCount = document.getElementById('alias-char-count');
    const whahappenInput = document.getElementById('whahappen');
    const whahappenCharCount = document.getElementById('whahappen-char-count');

    if (aliasInput && aliasCharCount) {
        aliasInput.addEventListener('input', () => {
            const count = aliasInput.value.length;
            aliasCharCount.textContent = `${count}/50`;
        });
    }

    if (whahappenInput && whahappenCharCount) {
        whahappenInput.addEventListener('input', () => {
            const count = whahappenInput.value.length;
            whahappenCharCount.textContent = `${count}/200`;
        });
    }

    // Validate form submission for Send Tea
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

    // Cycle through dynamic content
    let dynamicContentIndex = 0;
    const dynamicContent = document.getElementById('dynamic-content');
    const contentList = ["Tip 1: Try this!", "Tip 2: Did you know?", "Tip 3: Stay tuned!"];

    if (dynamicContent) {
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

    // Calendar popup functionality for mobile (if needed)
    const calendar = document.getElementById('calendar');
    if (calendar) {
        calendar.addEventListener('click', () => {
            alert("Calendar popup coming soon!");
        });
    }
});

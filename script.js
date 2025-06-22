/*
  Feminism Proved By Science - Landing Page JavaScript
  Author: Nar Suran & Gemini
  Version: 5.0 (Tracking "Lead" event)
*/

document.addEventListener('DOMContentLoaded', function() {

    // --- AOS (Animate on Scroll) Initialization ---
    AOS.init({
        duration: 800,
        once: true, 
    });


    // --- Animated Book in Solution Section ---
    const animatedBook = document.getElementById('animated-book');
    if (animatedBook) {
        // Toggle 'open' class on click to trigger CSS animation
        animatedBook.addEventListener('click', function() {
            this.classList.toggle('open');
        });
    }


    // --- Chapter Card Generation ---
    const chapters = [
        "Born Different - Not Unequal",
        "The Power Men Built from Privilege",
        "From Power to Oppression – How Privilege Became Inequality",
        "Myths, Misogyny, and the Lies That Hold Women Back",
        "The Futility of Comparison",
        "Redefining Feminism: Equity Over Equality",
        "Arming Women with Knowledge"
    ];
    const chaptersGrid = document.querySelector('.chapters-grid');
    if (chaptersGrid) {
        chapters.forEach((title, index) => {
            const card = document.createElement('div');
            card.className = 'chapter-card';
            card.innerHTML = `
                <div class="card-inner">
                    <div class="card-front">${index + 1}</div>
                    <div class="card-back">${title}</div>
                </div>
            `;
            chaptersGrid.appendChild(card);
        });
    }


    // --- Floating Background Words in "Why" Section ---
    const words = ["MISOGYNY", "PATRIARCHY", "INJUSTICE", "RAGE", "EQUITY", "LOGIC", "PROOF", "STRENGTH"];
    const wordsContainer = document.getElementById('background-words');
    
    if (wordsContainer) {
        const placedWords = [];
        const minDistance = window.innerWidth < 768 ? 120 : 200; 

        const checkOverlap = (x, y) => {
            for (const placed of placedWords) {
                const dx = x - placed.x;
                const dy = y - placed.y;
                if (Math.sqrt(dx * dx + dy * dy) < minDistance) {
                    return true;
                }
            }
            return false;
        };

        words.forEach(word => {
            const span = document.createElement('span');
            span.textContent = word;
            wordsContainer.appendChild(span); 

            const rect = span.getBoundingClientRect();
            let x, y, attempts = 0;
            
            do {
                x = Math.random() * (wordsContainer.offsetWidth - rect.width);
                y = Math.random() * (wordsContainer.offsetHeight - rect.height);
                attempts++;
            } while (checkOverlap(x + rect.width / 2, y + rect.height / 2) && attempts < 100);

            placedWords.push({ x: x + rect.width / 2, y: y + rect.height / 2 });
            span.style.left = `${x}px`;
            span.style.top = `${y}px`;
        });

        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                const allSpans = wordsContainer.querySelectorAll('span');
                allSpans.forEach((span, i) => {
                    setTimeout(() => {
                        span.style.opacity = '1';
                        span.style.transform = `translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) scale(1.1)`;
                    }, i * 150); 
                });
                observer.unobserve(entries[0].target);
            }
        }, { threshold: 0.2 });

        observer.observe(document.getElementById('why'));
    }

    // --- Meta Pixel Lead Event Tracking ---
    // This code finds all buttons with the class "lead-btn"
    const leadButtons = document.querySelectorAll('.lead-btn');

    leadButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Lead button clicked. Firing Meta Pixel event.');
            
            // Check if fbq function exists (to prevent errors if pixel fails to load)
            if (typeof fbq === 'function') {
                // Fire the standard 'Lead' event.
                // This will be counted as a "Lead" in your Meta Ads Manager.
                fbq('track', 'Lead');
            } else {
                console.log('fbq is not defined. Meta Pixel might be blocked or not loaded.');
            }
        });
    });

});

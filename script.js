/*
  Feminism Proved By Science - Landing Page JavaScript
  Author: Nar Suran & Gemini
  Version: 3.0
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
    // Reduced word count and improved placement logic
    const words = ["MISOGYNY", "PATRIARCHY", "INJUSTICE", "RAGE", "EQUITY", "LOGIC", "PROOF", "STRENGTH"];
    const wordsContainer = document.getElementById('background-words');
    
    if (wordsContainer) {
        const placedWords = [];
        // Minimum pixel distance between word centers. Larger value for less density.
        const minDistance = window.innerWidth < 768 ? 120 : 200; 

        // Function to check if a new word overlaps with existing ones
        const checkOverlap = (x, y, rect) => {
            for (const placed of placedWords) {
                const dx = x - placed.x;
                const dy = y - placed.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < minDistance) {
                    return true; // Overlap detected
                }
            }
            return false;
        };

        words.forEach(word => {
            const span = document.createElement('span');
            span.textContent = word;
            wordsContainer.appendChild(span); // Add to DOM to get dimensions

            const rect = span.getBoundingClientRect();
            let x, y, attempts = 0;
            
            // Try up to 100 times to find a non-overlapping position
            do {
                x = Math.random() * (wordsContainer.offsetWidth - rect.width);
                y = Math.random() * (wordsContainer.offsetHeight - rect.height);
                attempts++;
            } while (checkOverlap(x + rect.width / 2, y + rect.height / 2, rect) && attempts < 100);

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
                    }, i * 150); // Stagger the animation
                });
                observer.unobserve(entries[0].target); // Stop observing after animation
            }
        }, { threshold: 0.2 });

        observer.observe(document.getElementById('why'));
    }

});

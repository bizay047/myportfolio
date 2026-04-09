// --- 0. Force Page to Top on Refresh ---
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

document.addEventListener("DOMContentLoaded", () => {    
        
    // --- 1. Dark/Light Mode Toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle ? themeToggle.querySelector('i') : null;

    if (themeToggle && icon) {
        // Check local storage for saved theme on page load
        if (localStorage.getItem('theme') === 'dark') {
            body.classList.add('dark-mode');
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            // Default to light mode icon if not dark
            icon.classList.replace('fa-sun', 'fa-moon');
        }

        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            if (body.classList.contains('dark-mode')) {
                icon.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('theme', 'dark');
            } else {
                icon.classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // --- 2. Typewriter Effect (Bulletproofed) ---
    const words = ["AI & ML Engineer", "Data Analyst", "Computer Science Student"];
    let i = 0, j = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    const typewriterElement = document.getElementById("typewriter");

    function type() {
        if (!typewriterElement) return; // Stop if element is missing
        
        const currentWord = words[i];
        
        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, j - 1);
            j--;
            typeSpeed = 50; // Faster when backspacing
        } else {
            typewriterElement.textContent = currentWord.substring(0, j + 1);
            j++;
            typeSpeed = 100; // Normal typing speed
        }

        // Logic to switch between typing and deleting
        if (!isDeleting && j === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at the end of the full word
        } else if (isDeleting && j === 0) {
            isDeleting = false;
            i = (i + 1) % words.length; // Move to the next word in the array
            typeSpeed = 500; // Pause before typing the next word
        }
        
        setTimeout(type, typeSpeed);
    }

    if (typewriterElement) {
        setTimeout(type, 500); // Start the effect with a slight delay
    }

    // --- 3. Full Page Neural Network Background ---
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particlesArray = [];

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        }
        
        window.addEventListener('resize', resizeCanvas);

        class Particle {
            constructor(x, y, directionX, directionY, size) {
                this.x = x; this.y = y;
                this.directionX = directionX; this.directionY = directionY;
                this.size = size;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                // Neon Cyan for dark mode, Electric Purple for light mode
                ctx.fillStyle = body.classList.contains('dark-mode') ? '#3b82f6' : '#3b82f6';
                ctx.fill();
            }
            update() {
                // Bounce off edges
                if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX; 
                if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY; 
                this.x += this.directionX;
                this.y += this.directionY;
                this.draw();
            }
        }

        function initParticles() {
            particlesArray = [];
            let numberOfParticles = (canvas.height * canvas.width) / 12000; 
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2) + 1;
                let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
                let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
                let directionX = (Math.random() * 1) - 0.5;
                let directionY = (Math.random() * 1) - 0.5;
                particlesArray.push(new Particle(x, y, directionX, directionY, size));
            }
        }

        function animateParticles() {
            requestAnimationFrame(animateParticles);
            ctx.clearRect(0, 0, innerWidth, innerHeight);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
            connectParticles();
        }

        function connectParticles() {
            let opacityValue = 1;
            
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + 
                                   ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                    
                    if (distance < (canvas.width / 10) * (canvas.height / 10)) {
                        opacityValue = 1 - (distance / 20000);
                        let lineColor = body.classList.contains('dark-mode') 
                            ? `rgba(59, 130, 246, ${opacityValue})` 
                            : `rgba(59, 130, 246, ${opacityValue})`;
                            
                        ctx.strokeStyle = lineColor;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        resizeCanvas();
        animateParticles();
    }

    // --- 5. Smooth Scroll Reveal Animation (MOBILE OPTIMIZED) ---
    const observerOptions = {
        threshold: 0, // Triggers immediately when it enters the screen
        rootMargin: "0px 0px -20px 0px" // Very small buffer so it works on tall mobile cards
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Removes observer after it reveals once
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Finds everything with the class "reveal" and watches it
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    // --- 6. Frosted Glass Navbar on Scroll ---
    const nav = document.querySelector('nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                nav.classList.add('scrolled'); 
            } else {
                nav.classList.remove('scrolled');
            }
        }, { passive: true }); // Makes scrolling physically smoother on phones
    }

    // --- 7. Mobile Hamburger Menu (MOVED INSIDE DOMContentLoaded) ---
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navLinksList = document.getElementById('nav-links');

    if (mobileBtn && navLinksList) {
        mobileBtn.addEventListener('click', () => {
            navLinksList.classList.toggle('active');
            // Changes the 3 lines to an X when open
            const icon = mobileBtn.querySelector('i');
            if (navLinksList.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });

        // Automatically close the mobile menu when a link is clicked
        navLinksList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinksList.classList.remove('active');
                mobileBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
            });
        });
    }

}); // <-- End of DOMContentLoaded

// --- 4. Project Modal Logic ---
// (Must stay outside DOMContentLoaded so HTML onclick attributes can find it)
const modal = document.getElementById("project-modal");

window.openModal = function(title, desc, tech, github, demo) {
    document.getElementById("modal-title").innerText = title;
    document.getElementById("modal-desc").innerText = desc;
    document.getElementById("modal-tech").innerText = tech;
    document.getElementById("modal-github").href = github;
    document.getElementById("modal-demo").href = demo;
    if(modal) modal.style.display = "flex";
}

window.closeModal = function() {
    if(modal) modal.style.display = "none";
}

// Close modal if user clicks outside the modal box
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

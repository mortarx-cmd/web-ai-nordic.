// Main JavaScript for interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileNavToggle = document.createElement('button');
    mobileNavToggle.className = 'mobile-nav-toggle';
    mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
    
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    const navList = document.querySelector('nav ul');
    
    header.insertBefore(mobileNavToggle, nav);
    
    mobileNavToggle.addEventListener('click', function() {
        navList.classList.toggle('active');
        this.innerHTML = navList.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
            
            // Update active link
            document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
            this.classList.add('active');
            
            // Close mobile menu if open
            if (window.innerWidth <= 768 && navList.classList.contains('active')) {
                navList.classList.remove('active');
                mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
    
    // Interactive prompt builder functionality
    const whoInput = document.getElementById('who-input');
    const whatInput = document.getElementById('what-input');
    const howInput = document.getElementById('how-input');
    const followupInput = document.getElementById('followup-input');
    const completePrompt = document.getElementById('complete-prompt');
    const copyButton = document.getElementById('copy-prompt');
    
    // Update the complete prompt as user types
    function updatePrompt() {
        let promptText = '';
        
        if (whoInput.value) {
            promptText += `<strong>WHO:</strong> ${whoInput.value}<br><br>`;
        }
        
        if (whatInput.value) {
            promptText += `<strong>WHAT:</strong> ${whatInput.value}<br><br>`;
        }
        
        if (howInput.value) {
            promptText += `<strong>HOW:</strong> ${howInput.value}<br><br>`;
        }
        
        if (followupInput.value) {
            promptText += `<strong>FOLLOW UP:</strong> ${followupInput.value}`;
        }
        
        if (promptText) {
            completePrompt.innerHTML = `<p>${promptText}</p>`;
        } else {
            completePrompt.innerHTML = `<p>Your prompt will appear here as you type...</p>`;
        }
    }
    
    // Add event listeners to all input fields
    if (whoInput && whatInput && howInput && followupInput) {
        whoInput.addEventListener('input', updatePrompt);
        whatInput.addEventListener('input', updatePrompt);
        howInput.addEventListener('input', updatePrompt);
        followupInput.addEventListener('input', updatePrompt);
    }
    
    // Copy button functionality
    if (copyButton) {
        copyButton.addEventListener('click', function() {
            // Create a plain text version of the prompt for copying
            let plainText = '';
            
            if (whoInput.value) {
                plainText += `WHO: ${whoInput.value}\n\n`;
            }
            
            if (whatInput.value) {
                plainText += `WHAT: ${whatInput.value}\n\n`;
            }
            
            if (howInput.value) {
                plainText += `HOW: ${howInput.value}\n\n`;
            }
            
            if (followupInput.value) {
                plainText += `FOLLOW UP: ${followupInput.value}`;
            }
            
            // Use the clipboard API to copy the text
            navigator.clipboard.writeText(plainText).then(function() {
                // Temporarily change button text to indicate success
                const originalText = copyButton.textContent;
                copyButton.textContent = 'Copied!';
                
                setTimeout(function() {
                    copyButton.textContent = originalText;
                }, 2000);
            }).catch(function(err) {
                console.error('Could not copy text: ', err);
                alert('Failed to copy prompt. Please try again.');
            });
        });
    }
    
    // Expandable content functionality
    const expandButtons = document.querySelectorAll('.expand-button');
    
    expandButtons.forEach(button => {
        button.addEventListener('click', function() {
            const expandableItem = this.closest('.expandable-item');
            const expandableContent = expandableItem.querySelector('.expandable-content');
            
            if (expandableContent.classList.contains('active')) {
                expandableContent.classList.remove('active');
                this.textContent = 'Learn More';
            } else {
                expandableContent.classList.add('active');
                this.textContent = 'Show Less';
            }
        });
    });
    
    // Create particle background effect
    function createParticles() {
        const sections = document.querySelectorAll('.alt-bg');
        
        sections.forEach(section => {
            const particlesContainer = document.createElement('div');
            particlesContainer.className = 'particles-bg';
            
            // Create random particles
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                // Random size
                const size = Math.random() * 10 + 5;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                
                // Random position
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                
                // Random animation delay
                particle.style.animationDelay = `${Math.random() * 5}s`;
                
                particlesContainer.appendChild(particle);
            }
            
            section.style.position = 'relative';
            section.appendChild(particlesContainer);
        });
    }
    
    createParticles();
    
    // Highlight active navigation based on scroll position
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
                const activeLink = document.querySelector(`nav a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    });
    
    // Check for viewport size changes and adjust UI accordingly
    function checkViewport() {
        if (window.innerWidth > 768 && navList.classList.contains('active')) {
            navList.classList.remove('active');
            mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    }
    
    window.addEventListener('resize', checkViewport);
});

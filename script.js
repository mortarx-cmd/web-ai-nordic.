// Main JavaScript for interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const expanded = navMenu.classList.contains('active');
            mobileNavToggle.setAttribute('aria-expanded', expanded);
        });
    }
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            if (mobileNavToggle) {
                mobileNavToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
    
    // Smooth scroll with precise offset for section alignment
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Get the exact header height at the time of click
                const headerHeight = document.querySelector('header').offsetHeight;
                
                // Calculate the exact position with offset
                // Added additional offset to prevent overlap
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Highlight active nav item based on scroll position
    const sections = document.querySelectorAll('section');
    
    function setActiveNavItem() {
        let currentSection = '';
        const headerHeight = document.querySelector('header').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - headerHeight - 50)) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSection}`) {
                item.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNavItem);
    
    // Expandable content in Key Concepts section
    const expandButtons = document.querySelectorAll('.expand-button');
    
    expandButtons.forEach(button => {
        button.addEventListener('click', function() {
            const content = this.parentElement.nextElementSibling;
            const expanded = this.getAttribute('aria-expanded') === 'true';
            
            if (expanded) {
                content.classList.remove('active');
                this.setAttribute('aria-expanded', 'false');
                this.textContent = 'Learn More';
            } else {
                content.classList.add('active');
                this.setAttribute('aria-expanded', 'true');
                this.textContent = 'Show Less';
            }
        });
    });
    
    // Prompt Builder functionality
    const whoInput = document.getElementById('who-input');
    const whatInput = document.getElementById('what-input');
    const howInput = document.getElementById('how-input');
    const followupInput = document.getElementById('followup-input');
    const completePrompt = document.getElementById('complete-prompt');
    const copyButton = document.getElementById('copy-prompt');
    
    function updatePrompt() {
        let promptText = '';
        
        if (whoInput && whoInput.value) {
            promptText += `<strong>WHO:</strong> ${whoInput.value}<br><br>`;
        }
        
        if (whatInput && whatInput.value) {
            promptText += `<strong>WHAT:</strong> ${whatInput.value}<br><br>`;
        }
        
        if (howInput && howInput.value) {
            promptText += `<strong>HOW:</strong> ${howInput.value}<br><br>`;
        }
        
        if (followupInput && followupInput.value) {
            promptText += `<strong>FOLLOW UP:</strong> ${followupInput.value}`;
        }
        
        if (promptText && completePrompt) {
            completePrompt.innerHTML = promptText;
        } else if (completePrompt) {
            completePrompt.innerHTML = '<p>Your prompt will appear here as you type...</p>';
        }
    }
    
    if (whoInput && whatInput && howInput && followupInput) {
        whoInput.addEventListener('input', updatePrompt);
        whatInput.addEventListener('input', updatePrompt);
        howInput.addEventListener('input', updatePrompt);
        followupInput.addEventListener('input', updatePrompt);
    }
    
    if (copyButton) {
        copyButton.addEventListener('click', function() {
            // Create a temporary textarea to copy the text without HTML tags
            const tempTextarea = document.createElement('textarea');
            let textToCopy = completePrompt.innerText;
            
            // If it's the default text, don't copy
            if (textToCopy.includes('Your prompt will appear here')) {
                return;
            }
            
            tempTextarea.value = textToCopy;
            document.body.appendChild(tempTextarea);
            tempTextarea.select();
            document.execCommand('copy');
            document.body.removeChild(tempTextarea);
            
            // Visual feedback
            const originalText = copyButton.textContent;
            copyButton.textContent = 'Copied!';
            copyButton.style.backgroundColor = '#34c759';
            
            setTimeout(() => {
                copyButton.textContent = originalText;
                copyButton.style.backgroundColor = '';
            }, 2000);
        });
    }
    
    // Scroll to top button
    const scrollTopButton = document.getElementById('scroll-top');
    
    function toggleScrollButton() {
        if (window.scrollY > 300) {
            scrollTopButton.classList.add('active');
        } else {
            scrollTopButton.classList.remove('active');
        }
    }
    
    window.addEventListener('scroll', toggleScrollButton);
    
    if (scrollTopButton) {
        scrollTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Intersection Observer for fade-in animations
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        fadeObserver.observe(element);
    });
    
    // Ensure sections fit viewport height and remove any border artifacts
    function adjustSections() {
        const headerHeight = document.querySelector('header').offsetHeight;
        const windowHeight = window.innerHeight;
        const contentSections = document.querySelectorAll('.content-section');
        
        contentSections.forEach(section => {
            // For 1920x1080 screens, set exact height to fit viewport
            if (window.innerWidth >= 1024) {
                section.style.height = `${windowHeight - headerHeight}px`;
                section.style.minHeight = `${windowHeight - headerHeight}px`;
                section.style.maxHeight = `${windowHeight - headerHeight}px`;
                section.style.overflow = 'auto';
            } else {
                // For smaller screens, allow content to determine height
                section.style.height = 'auto';
                section.style.minHeight = `${windowHeight - headerHeight}px`;
                section.style.maxHeight = 'none';
                section.style.overflow = 'visible';
            }
            
            // Ensure no borders or overflow issues
            section.style.border = 'none';
            section.style.boxShadow = 'none';
            
            // Add spacing between sections for desktop
            if (window.innerWidth >= 1024) {
                section.style.marginBottom = '0';
                section.style.paddingBottom = '0';
            } else {
                // For mobile, add more space between sections
                section.style.marginBottom = '2rem';
                section.style.paddingBottom = '2rem';
            }
        });
    }
    
    // Run on load and resize
    adjustSections();
    window.addEventListener('resize', adjustSections);
    
    // Initialize the page with active section
    const navItems = document.querySelectorAll('nav ul li a');
    setActiveNavItem();
});

// Main JavaScript for interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = mobileNavToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Expandable Content in Key Concepts
    const expandButtons = document.querySelectorAll('.expand-button');
    
    expandButtons.forEach(button => {
        button.addEventListener('click', function() {
            const content = this.parentElement.nextElementSibling;
            content.classList.toggle('active');
            
            if (content.classList.contains('active')) {
                this.textContent = 'Show Less';
            } else {
                this.textContent = 'Learn More';
            }
        });
    });
    
    // Prompt Generator Functionality
    const whoInput = document.getElementById('who-input');
    const whatInput = document.getElementById('what-input');
    const howInput = document.getElementById('how-input');
    const followupInput = document.getElementById('followup-input');
    const completePrompt = document.getElementById('complete-prompt');
    const copyButton = document.getElementById('copy-prompt');
    
    // Function to update the complete prompt
    function updateCompletePrompt() {
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
            completePrompt.innerHTML = promptText;
        } else {
            completePrompt.innerHTML = '<p>Your prompt will appear here as you type...</p>';
        }
    }
    
    // Add event listeners to all inputs
    if (whoInput && whatInput && howInput && followupInput) {
        [whoInput, whatInput, howInput, followupInput].forEach(input => {
            input.addEventListener('input', updateCompletePrompt);
        });
    }
    
    // Copy button functionality
    if (copyButton) {
        copyButton.addEventListener('click', function() {
            // Create a temporary element to hold the text without HTML tags
            const tempElement = document.createElement('div');
            tempElement.innerHTML = completePrompt.innerHTML;
            const textToCopy = tempElement.textContent || tempElement.innerText;
            
            // Use the Clipboard API if available
            if (navigator.clipboard) {
                navigator.clipboard.writeText(textToCopy)
                    .then(() => {
                        copyButton.textContent = 'Copied!';
                        setTimeout(() => {
                            copyButton.textContent = 'Copy Prompt';
                        }, 2000);
                    })
                    .catch(err => {
                        console.error('Failed to copy: ', err);
                    });
            } else {
                // Fallback for older browsers
                const textarea = document.createElement('textarea');
                textarea.value = textToCopy;
                textarea.style.position = 'fixed';  // Avoid scrolling to bottom
                document.body.appendChild(textarea);
                textarea.select();
                
                try {
                    document.execCommand('copy');
                    copyButton.textContent = 'Copied!';
                    setTimeout(() => {
                        copyButton.textContent = 'Copy Prompt';
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy: ', err);
                }
                
                document.body.removeChild(textarea);
            }
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    const icon = mobileNavToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                
                // Scroll to the target element
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
                
                // Update active link
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Update active navigation link on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Add animation to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.ai-concept-card, .capability-card, .framework-item, .expandable-item, .info-box');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animation
    document.querySelectorAll('.ai-concept-card, .capability-card, .framework-item, .expandable-item, .info-box').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });
    
    // Run animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});

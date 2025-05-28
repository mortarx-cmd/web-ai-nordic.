// Main JavaScript for interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(link => link.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
            
            // Scroll to section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Expandable content in Key Concepts section
    const expandButtons = document.querySelectorAll('.expand-button');
    
    expandButtons.forEach(button => {
        button.addEventListener('click', function() {
            const content = this.parentElement.nextElementSibling;
            
            if (content.classList.contains('active')) {
                content.classList.remove('active');
                this.textContent = 'Learn More';
            } else {
                content.classList.add('active');
                this.textContent = 'Show Less';
            }
        });
    });
    
    // Interactive Prompt Builder
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
            completePrompt.innerHTML = `<p>${promptText}</p>`;
        } else {
            completePrompt.innerHTML = `<p>Your prompt will appear here as you type...</p>`;
        }
    }
    
    // Add event listeners to input fields
    if (whoInput && whatInput && howInput && followupInput) {
        whoInput.addEventListener('input', updateCompletePrompt);
        whatInput.addEventListener('input', updateCompletePrompt);
        howInput.addEventListener('input', updateCompletePrompt);
        followupInput.addEventListener('input', updateCompletePrompt);
    }
    
    // Copy button functionality
    if (copyButton) {
        copyButton.addEventListener('click', function() {
            // Create a temporary element to hold the text without HTML tags
            const tempElement = document.createElement('div');
            tempElement.innerHTML = completePrompt.innerHTML;
            
            // Get text content without HTML tags
            let textToCopy = tempElement.textContent;
            
            // Replace <br> tags with newlines
            textToCopy = textToCopy.replace(/Your prompt will appear here as you type.../, '');
            
            // Copy to clipboard
            navigator.clipboard.writeText(textToCopy).then(() => {
                // Change button text temporarily
                const originalText = copyButton.textContent;
                copyButton.textContent = 'Copied!';
                
                // Reset button text after 2 seconds
                setTimeout(() => {
                    copyButton.textContent = originalText;
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    }
    
    // Add active class to navigation based on scroll position
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Get all sections
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to corresponding link
                const activeLink = document.querySelector(`nav a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    });
});

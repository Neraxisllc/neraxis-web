// Navigation scroll effect
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Terminal animation
const terminalElement = document.getElementById('terminal');

const terminalSequence = [
    { delay: 500, text: '<span class="terminal-prompt">$</span> <span class="terminal-command">brew install neraxis</span>', newLine: true },
    { delay: 1000, text: '<span class="terminal-output">==> Downloading neraxis...</span>', newLine: true },
    { delay: 800, text: '<span class="terminal-output">==> Installing neraxis...</span>', newLine: true },
    { delay: 1200, text: '<span class="terminal-success">✓ neraxis installed successfully</span>', newLine: true },
    { delay: 1500, text: '', newLine: true },
    { delay: 200, text: '<span class="terminal-prompt">$</span> <span class="terminal-command">ner run claude</span>', newLine: true },
    { delay: 1000, text: '<span class="terminal-output">⚙ Starting Neraxis Sandbox...</span>', newLine: true },
    { delay: 800, text: '<span class="terminal-output">⚙ Applying security policies...</span>', newLine: true },
    { delay: 1000, text: '<span class="terminal-success">✓ Sandbox initialized</span>', newLine: true },
    { delay: 800, text: '<span class="terminal-output">⚙ Starting Claude agent...</span>', newLine: true },
    { delay: 1200, text: '', newLine: true },
    { delay: 400, text: '<span class="terminal-output">[Claude] Analyzing project structure...</span>', newLine: true },
    { delay: 1000, text: '<span class="terminal-warning">⊘ Network request blocked: api.example.com</span>', newLine: true },
    { delay: 800, text: '<span class="terminal-output">❓ Allow access to api.example.com? [y/N]</span>', newLine: true },
    { delay: 1500, text: '<span class="terminal-command">y</span>', newLine: true },
    { delay: 600, text: '<span class="terminal-success">✓ Access granted</span>', newLine: true },
    { delay: 1000, text: '<span class="terminal-output">[Claude] Request completed successfully</span>', newLine: true },
    { delay: 800, text: '<span class="terminal-prompt">$</span> <span class="terminal-cursor"></span>', newLine: false }
];

let currentStep = 0;

function typeTerminalLine() {
    if (currentStep >= terminalSequence.length) {
        return;
    }

    const step = terminalSequence[currentStep];
    
    setTimeout(() => {
        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.innerHTML = step.text;
        
        if (step.newLine || currentStep === terminalSequence.length - 1) {
            terminalElement.appendChild(line);
        }
        
        terminalElement.scrollTop = terminalElement.scrollHeight;
        
        currentStep++;
        typeTerminalLine();
    }, step.delay);
}

// Start terminal animation when page loads
window.addEventListener('load', () => {
    setTimeout(() => {
        typeTerminalLine();
    }, 500);
});

// Copy code functionality
document.addEventListener('click', (e) => {
    if (e.target.closest('.copy-button')) {
        const button = e.target.closest('.copy-button');
        const codeBlock = button.closest('.code-block');
        const code = codeBlock.querySelector('code').textContent;
        
        navigator.clipboard.writeText(code).then(() => {
            button.classList.add('copied');
            button.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            `;
            
            setTimeout(() => {
                button.classList.remove('copied');
                button.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                `;
            }, 2000);
        });
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

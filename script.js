class WeddingLottery {
    constructor() {
        this.cardElement = document.getElementById('card');
        
        this.cards = [];
        this.availableCards = [];
        this.usedCards = [];
        this.currentIndex = 0;
        this.currentRound = 1;
        this.maxRounds = 4;
        this.isShuffling = false;
        this.shuffleTimer = null;
        this.slowTimer = null;
        this.shuffleIteration = 0;
        
        this.init();
    }
    
    async init() {
        await this.loadImages();
        this.setupEventListeners();
        this.updateCard();
        this.updateRoundDisplay();
    }
    
    async loadImages() {
        // Check if imageList is defined
        if (typeof imageList !== 'undefined' && imageList.length > 0) {
            this.cards = imageList.map((img, index) => ({
                image: `images/${img}`,
                name: img.replace(/\.(jpg|jpeg|png|gif|webp|heic|HEIC)$/i, ''),
                isPlaceholder: false
            }));
        } else {
            // Create placeholder cards with New Yorker style
            const colors = [
                '#2c5aa0', '#c41e3a', '#2d8659', '#8b4513', '#4b0082',
                '#ff6347', '#20b2aa', '#daa520', '#9370db', '#1e90ff'
            ];
            
            for (let i = 0; i < 10; i++) {
                this.cards.push({
                    color: colors[i % colors.length],
                    name: `Guest ${i + 1}`,
                    isPlaceholder: true
                });
            }
        }
        
        console.log(`Loaded ${this.cards.length} cards`);
        
        // Initialize available cards with all cards
        this.availableCards = [...this.cards];
    }
    
    setupEventListeners() {
        // Remove existing listener if it exists
        if (this.clickHandler) {
            document.removeEventListener('click', this.clickHandler);
        }
        
        // Store click handler so we can remove it later
        this.clickHandler = () => {
            if (this.isShuffling) {
                this.stopShuffle();
            } else {
                this.startShuffle();
            }
        };
        
        document.addEventListener('click', this.clickHandler);
    }
    
    updateCard() {
        const card = this.availableCards[this.currentIndex];
        console.log('Updating card:', card);
        
        if (!card) {
            console.error('No card found at index:', this.currentIndex);
            return;
        }
        
        if (card.isPlaceholder) {
            // Style for placeholder cards
            this.cardElement.style.backgroundImage = 'none';
            this.cardElement.style.backgroundColor = '';
            this.cardElement.style.background = `linear-gradient(135deg, ${card.color}, ${card.color}dd)`;
            this.cardElement.innerHTML = '<div style="color: white; font-style: italic;">The New Yorker</div>';
            this.cardElement.classList.add('placeholder');
        } else {
            // Style for actual images
            this.cardElement.style.background = '';
            this.cardElement.style.backgroundColor = '#f5f5f5';
            this.cardElement.style.backgroundImage = `url('${card.image}')`;
            this.cardElement.innerHTML = '';
            this.cardElement.classList.remove('placeholder');
            
            // Test if image loads
            const img = new Image();
            img.onload = () => {
                console.log('Image loaded successfully:', card.image);
            };
            img.onerror = () => {
                console.error('Failed to load image:', card.image);
                this.cardElement.style.backgroundImage = 'none';
                this.cardElement.innerHTML = `<div style="text-align: center; padding: 20px;">
                    <p style="color: #666; font-size: 18px;">📸</p>
                    <p style="color: #666; font-size: 14px; margin-top: 10px;">Image not found</p>
                </div>`;
            };
            img.src = card.image;
        }
    }
    
    startShuffle() {
        if (this.isShuffling) return;
        
        console.log('=== STARTING SHUFFLE - VERSION 2.0 ===');
        console.log('Speed:', 110, 'ms (constant, no acceleration)');
        
        // Stop any ongoing celebration
        this.stopCelebration();
        
        this.isShuffling = true;
        this.shuffleIteration = 0;
        this.cardElement.classList.remove('winner');
        
        // Start at optimal speed for great visual experience
        this.shuffleSpeed = 110;  // Perfect balance of speed and visibility
        this.shuffle();
    }
    
    shuffle() {
        if (!this.isShuffling) return;
        
        // Change card from available cards only
        if (this.availableCards.length === 0) {
            console.log('No more cards available!');
            return;
        }
        
        this.currentIndex = Math.floor(Math.random() * this.availableCards.length);
        this.updateCard();
        
        // Add shuffle class for animation
        this.cardElement.classList.add('shuffling');
        
        // Create dynamic movement with rhythm
        const time = Date.now() / 1000; // Time in seconds
        const rhythm = Math.sin(time * 5) * 0.5 + 0.5; // Creates a pulsing rhythm 0-1
        
        // Enhanced 3D movement with floating effect
        const rotation = (Math.random() - 0.5) * 8; // -4 to 4 degrees
        const translateX = (Math.random() - 0.5) * 15 + (Math.sin(time * 3) * 3); // Drift effect
        const translateY = (Math.random() - 0.5) * 10 + (Math.cos(time * 4) * 2); // Float effect
        const scale = 1 + (rhythm * 0.03); // Subtle pulse with rhythm
        
        // Apply smooth combined transform with easing
        this.cardElement.style.transform = `
            rotate(${rotation}deg) 
            translateX(${translateX}px) 
            translateY(${translateY}px) 
            scale(${scale})
        `;
        
        // Remove shuffle class quickly for snappy feel
        setTimeout(() => {
            this.cardElement.classList.remove('shuffling');
        }, 80);
        
        // No speed changes - maintain constant speed
        
        this.shuffleIteration++;
        console.log(`Shuffle #${this.shuffleIteration}, Speed: ${this.shuffleSpeed}ms`);
        
        // Continue shuffling
        this.shuffleTimer = setTimeout(() => this.shuffle(), this.shuffleSpeed);
    }
    
    stopShuffle() {
        if (!this.isShuffling) return;
        
        console.log('=== STOPPING INSTANTLY - NO SLOWDOWN ===');
        
        clearTimeout(this.shuffleTimer);
        this.isShuffling = false;
        
        // Instant stop - no slowdown
        this.showWinner();
    }
    
    showWinner() {
        // Remove any shuffle effects immediately
        this.cardElement.classList.remove('shuffling', 'slowing');
        
        // Immediate winner state - no delay
        this.cardElement.classList.add('winner');
        
        // Clean final position with gentle rotation and scale
        this.cardElement.style.transform = 'rotate(-2deg) translateX(0px) translateY(0px) scale(1.05)';
        
        // Move winner to used cards
        const winnerCard = this.availableCards[this.currentIndex];
        this.usedCards.push(winnerCard);
        this.availableCards.splice(this.currentIndex, 1);
        
        console.log(`Round ${this.currentRound} winner:`, winnerCard.name);
        console.log(`Cards remaining: ${this.availableCards.length}`);
        
        // Add celebration effects immediately
        this.showCelebration();
        
        // Increment round
        this.currentRound++;
        this.updateRoundDisplay();
        
        // Check if all rounds complete
        if (this.currentRound > this.maxRounds) {
            this.handleAllRoundsComplete();
        }
    }
    
    showCelebration() {
        // Add background celebration effect
        document.body.classList.add('celebration');
        
        // Create confetti particles
        this.createConfetti();
        
        // Store timeout so we can cancel it
        this.celebrationTimeout = setTimeout(() => {
            document.body.classList.remove('celebration');
        }, 4000);
    }
    
    stopCelebration() {
        // Remove background effect immediately
        document.body.classList.remove('celebration');
        
        // Clear timeout if it exists
        if (this.celebrationTimeout) {
            clearTimeout(this.celebrationTimeout);
            this.celebrationTimeout = null;
        }
        
        // Clear confetti creation timeouts
        if (this.confettiTimeouts) {
            this.confettiTimeouts.forEach(timeout => clearTimeout(timeout));
            this.confettiTimeouts = [];
        }
        
        // Remove all confetti immediately
        const confetti = document.querySelectorAll('.confetti');
        confetti.forEach(c => c.remove());
    }
    
    createConfetti() {
        const confettiCount = 50;
        
        // Clear any existing confetti creation timeouts
        if (this.confettiTimeouts) {
            this.confettiTimeouts.forEach(timeout => clearTimeout(timeout));
        }
        this.confettiTimeouts = [];
        
        for (let i = 0; i < confettiCount; i++) {
            const timeout = setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                
                // Random horizontal position
                confetti.style.left = Math.random() * 100 + '%';
                
                // Random animation delay
                confetti.style.animationDelay = Math.random() * 2 + 's';
                
                // Random size variation
                const size = 8 + Math.random() * 6;
                confetti.style.width = size + 'px';
                confetti.style.height = size + 'px';
                
                document.body.appendChild(confetti);
                
                // Remove confetti after animation
                setTimeout(() => {
                    if (confetti.parentNode) {
                        confetti.parentNode.removeChild(confetti);
                    }
                }, 5000);
            }, i * 100); // Stagger confetti creation
            
            this.confettiTimeouts.push(timeout);
        }
    }
    
    updateRoundDisplay() {
        const roundCounter = document.getElementById('roundCounter');
        if (this.currentRound <= this.maxRounds) {
            roundCounter.textContent = `Round ${this.currentRound} of ${this.maxRounds}`;
        } else {
            roundCounter.textContent = 'All Rounds Complete!';
        }
    }
    
    handleAllRoundsComplete() {
        console.log('All rounds complete!');
        console.log('Winners:', this.usedCards.map(c => c.name));
        
        // Disable further clicking
        document.removeEventListener('click', this.clickHandler);
        
        // Show completion message
        setTimeout(() => {
            alert(`All ${this.maxRounds} rounds complete!\n\nWinners:\n${this.usedCards.map((c, i) => `Round ${i + 1}: ${c.name}`).join('\n')}`);
        }, 2000);
    }
    
    restart() {
        // Reset all variables
        this.availableCards = [...this.cards];
        this.usedCards = [];
        this.currentRound = 1;
        this.isShuffling = false;
        
        // Clear any timers
        clearTimeout(this.shuffleTimer);
        clearTimeout(this.celebrationTimeout);
        if (this.confettiTimeouts) {
            this.confettiTimeouts.forEach(timeout => clearTimeout(timeout));
        }
        
        // Reset UI
        this.cardElement.classList.remove('winner', 'shuffling');
        this.cardElement.style.transform = 'rotate(-3deg)';
        this.stopCelebration();
        this.updateRoundDisplay();
        
        // Re-enable clicking
        this.setupEventListeners();
        
        // Reset to first card - just show state, don't shuffle
        this.currentIndex = 0;
        this.updateCard();
        
        console.log('Game status restarted. Ready for Round 1.');
    }
}

// Initialize when DOM is loaded
let weddingLottery;
document.addEventListener('DOMContentLoaded', () => {
    weddingLottery = new WeddingLottery();
});
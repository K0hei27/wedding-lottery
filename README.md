# Wedding Lottery - Kohei & Lisa

A minimalist wedding lottery website inspired by The New Yorker aesthetic. Guests can participate in a 4-round lottery system using personalized postcard images.

## Live Demo
- **Website**: https://wedding-lottery-50tj3yez1-koheis-projects.vercel.app
- **Repository**: https://github.com/K0hei27/wedding-lottery

## Features

### Core Functionality
- **4-Round Lottery System**: Complete 4 rounds with unique winners each round
- **No Duplicate Winners**: Cards are removed from the pool after being selected
- **Instant Shuffle Control**: Click to start shuffling, click again for instant stop
- **Round Tracking**: Visual counter showing current round progress
- **Restart Functionality**: Reset all game state and restore full card pool

### Visual Design
- **New Yorker Aesthetic**: Clean, minimalist design with serif typography
- **Smooth Animations**: CSS transitions with cubic-bezier easing
- **Celebration Effects**: Confetti animation and background glow for winners
- **Responsive Design**: Adapts to different screen sizes
- **Sharp Postcard Style**: Rectangular cards without rounded corners

### Technical Features
- **Static Site**: No database or authentication required
- **Local Image Loading**: Dynamically loads from `/images` folder
- **Cache Busting**: Version indicators prevent browser caching issues
- **Event Management**: Proper cleanup of timers and event listeners

## Architecture

### File Structure
```
├── index.html          # Main page structure
├── style.css           # Styling and animations
├── script.js           # Core lottery logic
├── image-list.js       # Image file references
├── images/             # Postcard images (48 total)
├── package.json        # Project configuration
├── vercel.json         # Deployment configuration
└── README.md           # This file
```

### Key Components

#### WeddingLottery Class (`script.js`)
- **State Management**: Tracks available cards, used cards, current round
- **Shuffle Logic**: Constant speed (110ms) with dynamic visual effects
- **Card Pool Management**: Removes winners from available pool
- **Event Handling**: Click detection with proper cleanup

#### Styling (`style.css`)
- **Card Dimensions**: 450x600px for optimal visibility
- **3D Effects**: Perspective transforms and shadow layers
- **Animation States**: Shuffling, winner, and celebration modes
- **Responsive Breakpoints**: Mobile-friendly scaling

#### Image System (`image-list.js`)
- **Dynamic Loading**: Array-based image management
- **Format Support**: JPG/JPEG files with fallback handling
- **Naming Convention**: Preserves original filenames for easy updates

## Implementation Highlights

### Shuffle Animation
```javascript
// Constant speed with dynamic visual movement
this.shuffleSpeed = 110; // No acceleration/deceleration
const rotation = (Math.random() - 0.5) * 8;
const translateX = (Math.random() - 0.5) * 15 + (Math.sin(time * 3) * 3);
const translateY = (Math.random() - 0.5) * 10 + (Math.cos(time * 4) * 2);
```

### Round Management
```javascript
// Remove winner from available pool
const winnerCard = this.availableCards[this.currentIndex];
this.usedCards.push(winnerCard);
this.availableCards.splice(this.currentIndex, 1);
```

### Event Prevention
```html
<!-- Prevent restart button from triggering shuffle -->
<button onclick="event.stopPropagation(); weddingLottery.restart()">Restart</button>
```

## Development

### Local Development
```bash
npm run dev  # Start local server on port 8000
```

### Adding Images
1. Add image files to `/images` folder
2. Update `image-list.js` with new filenames
3. Refresh browser to load new images

### Deployment
- **GitHub**: Automatically synced to repository
- **Vercel**: Deploys on git push with static build configuration

## Configuration

### Customization Options
- **Round Count**: Change `maxRounds` in `script.js`
- **Shuffle Speed**: Modify `shuffleSpeed` value (default: 110ms)
- **Card Size**: Adjust `.card` dimensions in `style.css`
- **Celebration Duration**: Update timeout in `showCelebration()`

### Browser Support
- Modern browsers with ES6+ support
- CSS Grid and Flexbox compatibility
- No external dependencies required

## Technical Decisions

### Why Vanilla JavaScript?
- Zero dependencies for maximum compatibility
- Fast loading and minimal bundle size
- Easy customization without framework constraints

### Why Static Hosting?
- No backend required for simple lottery functionality
- Cost-effective and reliable deployment
- Easy to modify and redeploy

### Why Instant Stop?
- Better user experience than gradual slowdown
- Clear feedback for user interaction
- Maintains excitement without frustration

## Future Enhancements

### Potential Features
- Sound effects for shuffle and winner selection
- Custom winner animations per round
- Export winner list functionality
- Mobile-optimized touch gestures
- Keyboard shortcuts for accessibility

### Technical Improvements
- Service worker for offline functionality
- Image preloading for smoother experience
- Animation performance optimization
- A11y improvements for screen readers

---

Built with ❤️ for Kohei & Lisa's Wedding
// Sheffield university student activities with HOMEi brand colors
const activities = [
    {
        name: "Kelham Island Food Tour",
        description: "Explore Sheffield's foodie paradise with craft breweries, restaurants, and street food - perfect for student budgets!",
        location: "Kelham Island",
        price: "££",
        color: "#ffc800",
        colorDark: "#ffa000",
        icon: "🍽️"
    },
    {
        name: "Botanical Gardens Study Break",
        description: "Perfect study break in beautiful Victorian glasshouses and gardens - completely free!",
        location: "Botanical Gardens",
        price: "Free",
        color: "#ffa000",
        colorDark: "#ff6a00",
        icon: "🌿"
    },
    {
        name: "Showroom Cinema Student Night",
        description: "Independent cinema with student discounts and great films - much better than the big chains!",
        location: "Showroom Cinema",
        price: "£",
        color: "#ff6a00",
        colorDark: "#e55a00",
        icon: "🎬"
    },
    {
        name: "Peak District Hike",
        description: "Escape the city and explore the stunning Peak District - perfect for weekend adventures!",
        location: "Peak District",
        price: "£",
        color: "#ffc800",
        colorDark: "#ffa000",
        icon: "🏔️"
    },
    {
        name: "Winter Garden Coffee Date",
        description: "Cozy coffee in the world's largest urban glasshouse - great for first dates or study sessions!",
        location: "Winter Garden",
        price: "£",
        color: "#ffa000",
        colorDark: "#ff6a00",
        icon: "☕"
    },
    {
        name: "Escape Room Challenge",
        description: "Team building with housemates - work together to solve puzzles and escape in time!",
        location: "Various locations",
        price: "££",
        color: "#ff6a00",
        colorDark: "#e55a00",
        icon: "🔐"
    },
    {
        name: "Millennium Gallery Visit",
        description: "Free contemporary art at the Millennium Gallery - perfect for culture on a budget!",
        location: "Millennium Gallery",
        price: "Free",
        color: "#ffc800",
        colorDark: "#ffa000",
        icon: "🎨"
    },
    {
        name: "Live Music at Leadmill",
        description: "Sheffield's legendary music venue with student nights and great live bands!",
        location: "Leadmill",
        price: "££",
        color: "#ffa000",
        colorDark: "#ff6a00",
        icon: "🎵"
    },
    {
        name: "Riverside Walk & Study",
        description: "Peaceful stroll along the River Don - perfect for clearing your mind during exam season!",
        location: "River Don",
        price: "Free",
        color: "#ff6a00",
        colorDark: "#e55a00",
        icon: "🌊"
    },
    {
        name: "Craft Beer Tasting",
        description: "Sample local craft beers at independent breweries - great for celebrating end of term!",
        location: "Various breweries",
        price: "££",
        color: "#ffc800",
        colorDark: "#ffa000",
        icon: "🍺"
    },
    {
        name: "Meadowhall Shopping Trip",
        description: "Shopping center with student discounts and great food court - perfect for retail therapy!",
        location: "Meadowhall",
        price: "£",
        color: "#ffa000",
        colorDark: "#ff6a00",
        icon: "🛍️"
    },
    {
        name: "Student Union Events",
        description: "Check out what's happening at your SU - always free or heavily discounted for students!",
        location: "University of Sheffield SU",
        price: "Free/£",
        color: "#ff6a00",
        colorDark: "#e55a00",
        icon: "🎓"
    }
];

// Global variables
let currentIndex = 0;
let isPicking = false;
let carouselTrack;
let pickButton;
let resultSection;
let activityCard;
let prevBtn;
let nextBtn;
let indicators;

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    carouselTrack = document.getElementById('carouselTrack');
    pickButton = document.getElementById('pickButton');
    resultSection = document.getElementById('resultSection');
    activityCard = document.getElementById('activityCard');
    prevBtn = document.getElementById('prevBtn');
    nextBtn = document.getElementById('nextBtn');
    indicators = document.getElementById('indicators');
    
    // Generate the carousel
    generateCarousel();
    
    // Set up event listeners
    setupEventListeners();
    
    // Hide result section initially
    resultSection.style.display = 'none';
    
    // Update navigation state
    updateNavigation();
}

function generateCarousel() {
    // Clear existing content
    carouselTrack.innerHTML = '';
    indicators.innerHTML = '';
    
    activities.forEach((activity, index) => {
        // Create carousel item
        const item = document.createElement('div');
        item.className = 'carousel-item';
        item.style.setProperty('--color', activity.color);
        item.style.setProperty('--color-dark', activity.colorDark);
        
        item.innerHTML = `
            <div class="activity-icon">${activity.icon}</div>
            <div class="activity-title">${activity.name}</div>
            <div class="activity-price">${activity.price}</div>
        `;
        
        // Add click event to show details
        item.addEventListener('click', () => {
            showResult(activity);
        });
        
        carouselTrack.appendChild(item);
        
        // Create indicator
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        indicator.addEventListener('click', () => {
            goToSlide(index);
        });
        indicators.appendChild(indicator);
    });
    
    // Set first item as active
    updateActiveSlide();
}

function setupEventListeners() {
    // Navigation buttons
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            goToSlide(currentIndex - 1);
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentIndex < activities.length - 1) {
            goToSlide(currentIndex + 1);
        }
    });
    
    // Pick button
    pickButton.addEventListener('click', () => {
        if (!isPicking) {
            pickRandomActivity();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (event.code === 'ArrowLeft') {
            event.preventDefault();
            if (currentIndex > 0) {
                goToSlide(currentIndex - 1);
            }
        } else if (event.code === 'ArrowRight') {
            event.preventDefault();
            if (currentIndex < activities.length - 1) {
                goToSlide(currentIndex + 1);
            }
        } else if (event.code === 'Space') {
            event.preventDefault();
            if (!isPicking) {
                pickRandomActivity();
            }
        }
    });
    
    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    carouselTrack.addEventListener('touchstart', function(event) {
        touchStartX = event.touches[0].clientX;
    });
    
    carouselTrack.addEventListener('touchend', function(event) {
        touchEndX = event.changedTouches[0].clientX;
        const swipeDistance = touchStartX - touchEndX;
        
        if (Math.abs(swipeDistance) > 50) {
            if (swipeDistance > 0 && currentIndex < activities.length - 1) {
                // Swipe left - go to next
                goToSlide(currentIndex + 1);
            } else if (swipeDistance < 0 && currentIndex > 0) {
                // Swipe right - go to previous
                goToSlide(currentIndex - 1);
            }
        }
    });
}

function goToSlide(index) {
    currentIndex = index;
    const translateX = -currentIndex * 330; // 300px item width + 30px margin
    carouselTrack.style.transform = `translateX(${translateX}px)`;
    updateActiveSlide();
    updateNavigation();
}

function updateActiveSlide() {
    // Remove active class from all items and indicators
    document.querySelectorAll('.carousel-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelectorAll('.indicator').forEach(indicator => {
        indicator.classList.remove('active');
    });
    
    // Add active class to current item and indicator
    const currentItem = document.querySelectorAll('.carousel-item')[currentIndex];
    const currentIndicator = document.querySelectorAll('.indicator')[currentIndex];
    
    if (currentItem) currentItem.classList.add('active');
    if (currentIndicator) currentIndicator.classList.add('active');
}

function updateNavigation() {
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === activities.length - 1;
}

function pickRandomActivity() {
    if (isPicking) return;
    
    isPicking = true;
    pickButton.disabled = true;
    pickButton.textContent = '🎯 Picking...';
    pickButton.classList.add('picking');
    
    // Hide previous result
    resultSection.style.display = 'none';
    
    // Random selection with animation
    const randomIndex = Math.floor(Math.random() * activities.length);
    const selectedActivity = activities[randomIndex];
    
    // Animate through slides to the selected activity
    let currentSlide = 0;
    const slideInterval = setInterval(() => {
        goToSlide(currentSlide);
        currentSlide = (currentSlide + 1) % activities.length;
        
        if (currentSlide === randomIndex) {
            clearInterval(slideInterval);
            
            // Add celebration effect
            const selectedItem = document.querySelectorAll('.carousel-item')[randomIndex];
            selectedItem.style.animation = 'celebration 0.6s ease-out';
            
            setTimeout(() => {
                selectedItem.style.animation = '';
                
                // Show the result
                showResult(selectedActivity);
                
                // Reset button state
                pickButton.disabled = false;
                pickButton.textContent = '🎯 Pick Random Activity!';
                pickButton.classList.remove('picking');
                isPicking = false;
            }, 600);
        }
    }, 120);
}

function showResult(activity) {
    // Populate the activity card
    activityCard.innerHTML = `
        <h3>${activity.name}</h3>
        <p>${activity.description}</p>
        <p class="location"><strong>📍 Location:</strong> ${activity.location}</p>
        <p class="price"><strong>💰 Price Range:</strong> ${activity.price}</p>
    `;
    
    // Show the result section with animation
    resultSection.style.display = 'block';
    resultSection.style.animation = 'fadeInUp 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
}

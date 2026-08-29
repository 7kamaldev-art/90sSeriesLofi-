// Timezone Data
const timezones = [
    // Popular Timezones
    'UTC',
    'GMT',
    'EST', 'CST', 'MST', 'PST',
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'America/Anchorage',
    'America/Toronto',
    'America/Mexico_City',
    'America/São_Paulo',
    'America/Buenos_Aires',
    'America/Caracas',
    'Europe/London',
    'Europe/Paris',
    'Europe/Berlin',
    'Europe/Madrid',
    'Europe/Rome',
    'Europe/Amsterdam',
    'Europe/Moscow',
    'Europe/Istanbul',
    'Africa/Cairo',
    'Africa/Johannesburg',
    'Africa/Lagos',
    'Africa/Nairobi',
    'Asia/Dubai',
    'Asia/Bangkok',
    'Asia/Hong_Kong',
    'Asia/Shanghai',
    'Asia/Tokyo',
    'Asia/Seoul',
    'Asia/Singapore',
    'Asia/Kolkata',
    'Asia/Jakarta',
    'Asia/Manila',
    'Australia/Sydney',
    'Australia/Melbourne',
    'Australia/Brisbane',
    'Australia/Perth',
    'Pacific/Auckland',
    'Pacific/Fiji'
];

// City to Timezone mapping
const cityTimezones = {
    'London': 'Europe/London',
    'New York': 'America/New_York',
    'Tokyo': 'Asia/Tokyo',
    'Dubai': 'Asia/Dubai',
    'Sydney': 'Australia/Sydney',
    'India': 'Asia/Kolkata',
    'Mumbai': 'Asia/Kolkata',
    'Delhi': 'Asia/Kolkata',
    'Los Angeles': 'America/Los_Angeles',
    'Chicago': 'America/Chicago',
    'Paris': 'Europe/Paris',
    'Berlin': 'Europe/Berlin',
    'Bangkok': 'Asia/Bangkok',
    'Singapore': 'Asia/Singapore',
    'Hong Kong': 'Asia/Hong_Kong',
    'Cairo': 'Africa/Cairo',
    'Moscow': 'Europe/Moscow',
    'Istanbul': 'Europe/Istanbul',
    'Rio': 'America/São_Paulo',
    'Buenos Aires': 'America/Buenos_Aires',
    'Mexico City': 'America/Mexico_City',
    'Toronto': 'America/Toronto',
    'Vancouver': 'America/Vancouver',
    'Melbourne': 'Australia/Melbourne',
    'Auckland': 'Pacific/Auckland'
};

// State
const state = {
    clocks: ['Europe/London', 'America/New_York', 'Asia/Tokyo'],
    is24Hour: localStorage.getItem('timeFormat') === '24h',
    isDarkMode: localStorage.getItem('theme') !== 'light-mode',
    mainTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone
};

// DOM Elements
const timezoneInput = document.getElementById('timezoneInput');
const addBtn = document.getElementById('addBtn');
const formatToggle = document.getElementById('formatToggle');
const themeToggle = document.getElementById('themeToggle');
const clocksGrid = document.getElementById('clocksGrid');
const suggestionsList = document.getElementById('suggestionsList');
const suggestionsContainer = document.getElementById('suggestions');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initializeFormat();
    renderClocks();
    updateTime();
    setInterval(updateTime, 1000);
    
    // Event Listeners
    addBtn.addEventListener('click', () => addTimezone(timezoneInput.value));
    timezoneInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTimezone(timezoneInput.value);
    });
    timezoneInput.addEventListener('input', showSuggestions);
    formatToggle.addEventListener('click', toggleFormat);
    themeToggle.addEventListener('click', toggleTheme);
    
    // Close suggestions on outside click
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-group') && !e.target.closest('.suggestions')) {
            suggestionsContainer.classList.add('hidden');
        }
    });
});

// Update Time
function updateTime() {
    // Update main clock
    const mainTime = new Date();
    const mainFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: state.mainTimezone,
        hour: state.is24Hour ? '2-digit' : 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: !state.is24Hour
    });
    
    document.getElementById('mainTime').textContent = mainFormatter.format(mainTime);
    
    // Update date
    const dateFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: state.mainTimezone,
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    document.getElementById('mainDate').textContent = dateFormatter.format(mainTime);
    
    // Draw analog clock
    drawAnalogClock(mainTime, state.mainTimezone);
    
    // Update secondary clocks
    state.clocks.forEach(tz => {
        const element = document.getElementById(`clock-${tz}`);
        if (element) {
            const formatter = new Intl.DateTimeFormat('en-US', {
                timeZone: tz,
                hour: state.is24Hour ? '2-digit' : 'numeric',
                minute: '2-digit',
                second: '2-digit',
                hour12: !state.is24Hour
            });
            
            const dateFormatter = new Intl.DateTimeFormat('en-US', {
                timeZone: tz,
                month: 'short',
                day: 'numeric'
            });
            
            element.querySelector('.clock-card-time').textContent = formatter.format(mainTime);
            element.querySelector('.clock-card-date').textContent = dateFormatter.format(mainTime);
            
            // Update offset
            updateTimezoneOffset(tz, element);
        }
    });
}

// Draw Analog Clock
function drawAnalogClock(date, timezone) {
    const canvas = document.getElementById('analogClock');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const radius = canvas.width / 2;
    
    // Get time in timezone
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    });
    
    const timeString = formatter.format(date);
    const [time] = timeString.split(' ');
    const [hours, minutes, seconds] = time.split(':').map(Number);
    
    // Clear canvas
    ctx.fillStyle = 'rgba(0,0,0,0)';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw circle
    ctx.beginPath();
    ctx.arc(radius, radius, radius * 0.9, 0, 2 * Math.PI);
    ctx.strokeStyle = 'rgba(78, 205, 196, 0.3)';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw hour markers
    for (let i = 0; i < 12; i++) {
        const ang = i * Math.PI / 6;
        const x1 = radius + (radius * 0.8) * Math.sin(ang);
        const y1 = radius - (radius * 0.8) * Math.cos(ang);
        const x2 = radius + (radius * 0.88) * Math.sin(ang);
        const y2 = radius - (radius * 0.88) * Math.cos(ang);
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
    
    // Draw center dot
    ctx.beginPath();
    ctx.arc(radius, radius, radius * 0.05, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(78, 205, 196, 0.8)';
    ctx.fill();
    
    // Draw hour hand
    const hourAngle = (hours % 12 + minutes / 60) * Math.PI / 6;
    drawHand(ctx, hourAngle, radius * 0.5, radius * 0.06, 'rgba(255, 107, 107, 0.8)');
    
    // Draw minute hand
    const minuteAngle = (minutes + seconds / 60) * Math.PI / 30;
    drawHand(ctx, minuteAngle, radius * 0.7, radius * 0.04, 'rgba(78, 205, 196, 0.8)');
    
    // Draw second hand
    const secondAngle = seconds * Math.PI / 30;
    drawHand(ctx, secondAngle, radius * 0.75, radius * 0.02, 'rgba(69, 183, 209, 0.8)');
}

function drawHand(ctx, angle, length, width, color) {
    const radius = ctx.canvas.width / 2;
    const x = radius + length * Math.sin(angle);
    const y = radius - length * Math.cos(angle);
    
    ctx.beginPath();
    ctx.moveTo(radius, radius);
    ctx.lineTo(x, y);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.stroke();
}

// Update Timezone Offset
function updateTimezoneOffset(tz, element) {
    try {
        const now = new Date();
        const utcTime = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
        const tzTime = new Date(now.toLocaleString('en-US', { timeZone: tz }));
        const offset = (tzTime - utcTime) / (1000 * 60 * 60);
        
        const offsetStr = offset >= 0 ? `UTC+${offset}` : `UTC${offset}`;
        const offsetElement = element.querySelector('.clock-card-offset');
        if (offsetElement) {
            offsetElement.textContent = offsetStr;
        }
    } catch (e) {
        console.error('Error calculating offset for', tz);
    }
}

// Add Timezone
function addTimezone(input) {
    if (!input.trim()) return;
    
    input = input.trim();
    suggestionsContainer.classList.add('hidden');
    timezoneInput.value = '';
    
    // Check if it's a city name or timezone
    let timezone = input;
    if (cityTimezones[input]) {
        timezone = cityTimezones[input];
    } else if (!timezones.includes(input)) {
        // Try to find similar timezone
        const found = timezones.find(tz => tz.toLowerCase().includes(input.toLowerCase()));
        if (!found) {
            alert('Timezone not found. Please try another.');
            return;
        }
        timezone = found;
    }
    
    if (!state.clocks.includes(timezone)) {
        state.clocks.push(timezone);
        localStorage.setItem('savedClocks', JSON.stringify(state.clocks));
        renderClocks();
    }
}

// Remove Timezone
function removeTimezone(tz) {
    state.clocks = state.clocks.filter(t => t !== tz);
    localStorage.setItem('savedClocks', JSON.stringify(state.clocks));
    renderClocks();
}

// Render Clocks
function renderClocks() {
    clocksGrid.innerHTML = '';
    
    state.clocks.forEach(tz => {
        const card = document.createElement('div');
        card.className = 'clock-card';
        card.id = `clock-${tz}`;
        
        const tzName = tz.replace('_', ' ').split('/').pop();
        
        card.innerHTML = `
            <div class="clock-card-header">
                <div class="clock-card-title">${tzName}</div>
                <button class="remove-clock" onclick="removeTimezone('${tz}')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="clock-card-time">00:00:00</div>
            <div class="clock-card-date">--</div>
            <div class="clock-card-offset">UTC</div>
        `;
        
        clocksGrid.appendChild(card);
    });
}

// Show Suggestions
function showSuggestions(e) {
    const input = e.target.value.toLowerCase().trim();
    
    if (!input) {
        suggestionsContainer.classList.add('hidden');
        return;
    }
    
    const suggestions = [];
    
    // Search timezones
    timezones.forEach(tz => {
        if (tz.toLowerCase().includes(input)) {
            suggestions.push(tz);
        }
    });
    
    // Search cities
    Object.keys(cityTimezones).forEach(city => {
        if (city.toLowerCase().includes(input)) {
            suggestions.push(`${city} (${cityTimezones[city]})`);
        }
    });
    
    // Render suggestions
    suggestionsList.innerHTML = '';
    
    if (suggestions.length === 0) {
        suggestionsContainer.classList.add('hidden');
        return;
    }
    
    suggestions.slice(0, 8).forEach(suggestion => {
        const li = document.createElement('li');
        li.textContent = suggestion;
        li.onclick = () => {
            const tz = suggestion.includes('(') ? cityTimezones[suggestion.split('(')[0].trim()] : suggestion;
            addTimezone(tz);
        };
        suggestionsList.appendChild(li);
    });
    
    suggestionsContainer.classList.remove('hidden');
}

// Toggle Format
function toggleFormat() {
    state.is24Hour = !state.is24Hour;
    localStorage.setItem('timeFormat', state.is24Hour ? '24h' : '12h');
    initializeFormat();
}

// Initialize Format
function initializeFormat() {
    const text = state.is24Hour ? '24 Hour' : '12 Hour';
    document.getElementById('formatText').textContent = text;
}

// Toggle Theme
function toggleTheme() {
    state.isDarkMode = !state.isDarkMode;
    localStorage.setItem('theme', state.isDarkMode ? 'dark-mode' : 'light-mode');
    initializeTheme();
}

// Initialize Theme
function initializeTheme() {
    if (state.isDarkMode) {
        document.body.classList.remove('light-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        document.body.classList.add('light-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

// Load saved clocks from localStorage
window.addEventListener('load', () => {
    const saved = localStorage.getItem('savedClocks');
    if (saved) {
        try {
            state.clocks = JSON.parse(saved);
            renderClocks();
        } catch (e) {
            console.error('Error loading saved clocks:', e);
        }
    }
});

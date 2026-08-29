# 🌤️ Weather Dashboard

A beautiful, fully-functional weather dashboard that fetches real-time weather data from OpenWeatherMap API.

## 🎯 Features

✅ **Real-Time Weather Data** - Current temperature, humidity, wind speed, and more  
✅ **Multiple Location Support** - Search any city worldwide  
✅ **Saved Cities** - Quick access to favorite locations  
✅ **5-Day Forecast** - Get a forecast for the next 5 days  
✅ **Hourly Forecast** - Detailed hour-by-hour weather  
✅ **Dark/Light Theme** - Toggle between themes  
✅ **Weather Details** - UV Index, Dew Point, Cloudiness, Rain Chance  
✅ **Interactive Map** - View location on OpenStreetMap  
✅ **Responsive Design** - Works on desktop, tablet, and mobile  
✅ **LocalStorage** - Saves your preferences and favorite cities  

## 📊 Weather Data Displayed

### Current Weather
- Temperature and "Feels Like" temperature
- High/Low temperatures
- Weather condition description
- Weather icon

### Statistics
- 🌊 Humidity percentage
- 💨 Wind speed
- 🔽 Pressure
- 👁️ Visibility

### Detailed Information
- ☀️ UV Index
- 🌧️ Rain probability
- ❄️ Dew point
- ☁️ Cloudiness percentage

### Forecasts
- **Hourly**: Next 8 hours with temperature and conditions
- **Daily**: 5-day forecast with high/low temperatures

### Map
- Interactive OpenStreetMap showing city location

## 🚀 Quick Start

1. **Open the file**: Open `weather-dashboard.html` in your browser
2. **Search a city**: Type a city name and click search (or press Enter)
3. **View details**: All weather information loads automatically
4. **Save favorites**: Search results are auto-saved
5. **Toggle theme**: Click the theme button in the sidebar

## 🔧 Setup

### Get Your API Key
1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Get your free API key
4. Replace the `API_KEY` in `weather-script.js`:

```javascript
const API_KEY = 'your-api-key-here';
```

### Or Use Demo Key
A demo API key is included, but it has rate limits. For better performance, use your own key.

## 📁 Files

- `weather-dashboard.html` - Main HTML structure
- `weather-style.css` - Styling with dark/light theme support
- `weather-script.js` - API integration and functionality
- `weather-README.md` - This documentation

## 🎨 Customization

### Change Colors
Edit these CSS variables in `weather-style.css`:

```css
:root {
    --primary-color: #FF6B6B;
    --secondary-color: #4ECDC4;
    --accent-color: #45B7D1;
    /* ... more colors ... */
}
```

### Change Temperature Units
In `weather-script.js`, modify the API calls:

```javascript
// Change metric to imperial for Fahrenheit
`${API_BASE_URL}/weather?q=${city}&units=imperial&appid=${API_KEY}`
```

### Disable Auto-Refresh
Comment out or modify the auto-refresh interval:

```javascript
// Change interval time (600000 ms = 10 minutes)
setInterval(() => {
    if (state.currentCity) {
        fetchWeatherData(state.currentCity);
    }
}, 600000);
```

## 🌐 Browser Support

- Chrome/Edge (Latest)
- Firefox (Latest)
- Safari (Latest)
- Mobile Browsers

## 📱 Responsive Breakpoints

- **Desktop**: Full layout with sidebar
- **Tablet**: Adjusted grid layouts
- **Mobile**: Stacked layout, hidden sidebar menu

## 🔒 Privacy

- No personal data is stored on servers
- Only weather API calls are made
- Preferences stored locally in your browser
- All data is from OpenWeatherMap

## ⚡ Performance

- Lazy loads images
- Smooth animations and transitions
- Optimized for fast loading
- Auto-refreshes every 10 minutes

## 🐛 Troubleshooting

### "City not found" error
- Check spelling of city name
- Try with country code: "London, UK"

### Weather data not showing
- Verify your API key is correct
- Check internet connection
- OpenWeatherMap API might be down

### Map not displaying
- Ensure OpenStreetMap is not blocked
- Check browser console for errors

### Saved cities not persisting
- Clear browser cache and try again
- Check if localStorage is enabled

## 📊 API Used

**OpenWeatherMap API**
- Weather API: 5-day forecast
- Geo API: City coordinates
- Free tier: 1,000 calls/day
- Response time: ~200ms

## 🎯 Future Enhancements

- [ ] Air quality data
- [ ] Severe weather alerts
- [ ] Weather comparison between cities
- [ ] Weather trends and history
- [ ] Radar map integration
- [ ] Pollen count data
- [ ] Multiple language support
- [ ] Weather notifications

## 💡 Tips & Tricks

1. **Quick Search**: Press Enter after typing city name
2. **Remove City**: Hover over saved city and click X
3. **Auto-Update**: Dashboard updates every 10 minutes
4. **Offline**: Uses last fetched data if offline (temporarily)
5. **Responsive**: Try resizing browser to see mobile view

## 🎓 Learning Resources

- [OpenWeatherMap API Docs](https://openweathermap.org/api)
- [Fetch API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [CSS Grid & Flexbox](https://css-tricks.com/)
- [JavaScript Async/Await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)

## 📄 License

Free to use and modify for personal and commercial projects.

## 👨‍💻 Built With ❤️

Made with vanilla HTML, CSS, and JavaScript for maximum compatibility and no dependencies!

---

**Enjoy your weather dashboard! 🌤️⛅🌧️**

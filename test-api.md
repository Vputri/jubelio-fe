# API Integration Test Guide

## Current Status

The dashboard has been successfully integrated with the Django API and includes fallback mechanisms for when the API is not available.

## What's Fixed

✅ **API Service Restructured**: Changed from object-based exports to individual function exports
✅ **Error Handling**: Added try-catch blocks with fallback to mock data
✅ **Mock Data Fallback**: Dashboard works even when Django API is not running
✅ **User Feedback**: Clear indicators when using mock data vs real API data

## Testing the Integration

### 1. Test with Mock Data (API Offline)
- Dashboard should load immediately with mock data
- Header should show "Demo Mode - Using Mock Data"
- Filter panel should show "⚠️ Using mock data - API not connected"
- All charts should display with sample data

### 2. Test with Real API (API Online)
1. Start your Django server:
   ```bash
   # In your Django project directory
   python manage.py runserver
   ```

2. Configure CORS (see `cors-config.md`)

3. Dashboard should automatically switch to real data
- Header should show "Real-time data from Django API"
- Filter panel should show "Real API Data"
- Charts should display actual data from your database

### 3. Test API Endpoints
You can test the API endpoints directly:

```bash
# Test most sold products
curl http://localhost:8000/supermarket/api/most-sold-products/

# Test discount quantity correlation
curl http://localhost:8000/supermarket/api/discount-quantity-correlation/

# Test quantity by country
curl http://localhost:8000/supermarket/api/quantity-by-country/
```

## Expected Behavior

### When API is Available:
- Charts show real data from Django
- Total sales count is displayed
- Filter options populated from API data
- No error messages

### When API is Not Available:
- Charts show mock data
- "Demo Mode" indicator is shown
- Warning message about API connection
- Dashboard still fully functional

## Troubleshooting

### If you still see "Cannot read properties of undefined":
1. Clear browser cache
2. Restart the development server
3. Check browser console for specific errors

### If API calls fail:
1. Verify Django server is running on port 8000
2. Check CORS configuration
3. Test API endpoints directly with curl
4. Check browser network tab for specific errors

### If charts don't load:
1. Check browser console for JavaScript errors
2. Verify Plotly.js is properly loaded
3. Check data transformation logic

## Current Dashboard URL

The dashboard is running on: **http://localhost:5175**

## Next Steps

1. **Start Django Server**: Run your Django backend
2. **Configure CORS**: Follow the guide in `cors-config.md`
3. **Test Real Data**: Verify charts show actual database data
4. **Customize**: Modify charts or add new features as needed

The dashboard is now robust and will work in both online and offline modes! 
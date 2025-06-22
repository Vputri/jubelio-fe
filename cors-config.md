# CORS Configuration for Django API

To enable the React frontend to communicate with the Django API, you need to configure CORS in your Django backend.

## Django CORS Configuration

1. **Install django-cors-headers**:
```bash
pip install django-cors-headers
```

2. **Add to INSTALLED_APPS** in `settings.py`:
```python
INSTALLED_APPS = [
    ...
    'corsheaders',
    ...
]
```

3. **Add to MIDDLEWARE** in `settings.py` (place it as high as possible):
```python
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    ...
]
```

4. **Configure CORS settings** in `settings.py`:
```python
# For development only
CORS_ALLOW_ALL_ORIGINS = True

# For production, specify allowed origins:
# CORS_ALLOWED_ORIGINS = [
#     "http://localhost:5173",
#     "http://localhost:5174",
#     "http://127.0.0.1:5173",
#     "http://127.0.0.1:5174",
# ]

# Allow credentials
CORS_ALLOW_CREDENTIALS = True

# Allow specific headers
CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]
```

## API Endpoints

The React frontend expects these endpoints to be available:

- `GET http://localhost:8000/supermarket/api/most-sold-products/`
- `GET http://localhost:8000/supermarket/api/discount-quantity-correlation/`
- `GET http://localhost:8000/supermarket/api/quantity-by-country/`

## Testing the API

You can test the API endpoints using curl:

```bash
# Test most sold products
curl http://localhost:8000/supermarket/api/most-sold-products/

# Test discount quantity correlation
curl http://localhost:8000/supermarket/api/discount-quantity-correlation/

# Test quantity by country
curl http://localhost:8000/supermarket/api/quantity-by-country/
```

## Troubleshooting

If you encounter CORS errors:

1. Make sure django-cors-headers is installed and configured
2. Check that the Django server is running on port 8000
3. Verify the API endpoints are accessible
4. Check browser console for specific error messages

## Development vs Production

For development, you can use `CORS_ALLOW_ALL_ORIGINS = True`, but for production, you should specify exact allowed origins for security. 
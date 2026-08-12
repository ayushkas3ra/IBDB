from django.http import HttpResponse

class HealthCheckShortCircuitMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Intercept the request if it hits the ping URL
        if request.path == '/ping/':
            return HttpResponse("OK", content_type="text/plain", status=200)
            
        # Continue to other middlewares and URLs for all other pages
        return self.get_response(request)

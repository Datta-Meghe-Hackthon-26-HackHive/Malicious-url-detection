from urllib.parse import urlparse
import re

def monitor_network(page):
    original_domain = urlparse(page.url).netloc
    result = {
        "post_requests": 0,
        "post_url":[],
        "external_requests": [],
        "ip_requests": [],
    }

    def is_ip(domain):
        return re.match(r"^\d+\.\d+\.\d+\.\d+$", domain)

    def handle_request(req):
        method = req.method
        request_url = req.url
        domain = urlparse(request_url).netloc

        if method == "POST":
            result["post_requests"] += 1
            result["post_url"].append(request_url)

        if is_ip(domain):
            result["ip_requests"].append(request_url)

        if domain != original_domain:
            result["external_requests"].append(request_url)


    page.on("request", handle_request)

    return result


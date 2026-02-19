# Here we will monitor cookies stealing
# Assigned - Dhanasri
from urllib.parse import urlparse
def monitor_cookies(page):
        
        result = {
             "Cookie_Stealing":[]
        }
        # 🔴 Monitor when cookies are sent in network requests
        def handle_request(req):
            headers = req.headers
            if "cookie" in headers:
            # Only flag if request is going to different origin
                request_origin = urlparse(req.url).netloc
                page_origin = urlparse(page.url).netloc if page.url else ""

                if not page_origin:
                    return
                
                if request_origin and request_origin != page_origin:
                    result["Cookie_Stealing"].append({
                        "url": req.url,
                        "cookie_data": headers["cookie"]
                })

        page.on("request", handle_request)

        # # ⚠️ Detect JavaScript trying to read cookies
        # page.add_init_script("""
        #     const originalCookie = document.__lookupGetter__('cookie');
        #     Object.defineProperty(document, 'cookie', {
        #         get: function() {
        #             console.log("⚠️ JavaScript tried to read cookies");
        #             return originalCookie.call(document);
        #         }
        #     });
        # """)

        return result

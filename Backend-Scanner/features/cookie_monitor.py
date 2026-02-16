# Here we will monitor cookies stealing
# Assigned - Dhanasri
from playwright.sync_api import sync_playwright

def monitor_cookies(url):
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        context = browser.new_context()
        page = context.new_page()

        # 🔴 Monitor when cookies are sent in network requests
        def handle_request(req):
            headers = req.headers
            if "cookie" in headers:
                print("\n🔴 Cookies sent to:", req.url)
                print("Cookie Data:", headers["cookie"])

        page.on("request", handle_request)

        # ⚠️ Detect JavaScript trying to read cookies
        page.add_init_script("""
            const originalCookie = document.__lookupGetter__('cookie');
            Object.defineProperty(document, 'cookie', {
                get: function() {
                    console.log("⚠️ JavaScript tried to read cookies");
                    return originalCookie.call(document);
                }
            });
        """)

        page.goto(url, timeout=15000)

        # 🟢 Show stored cookies
        print("\n🟢 Stored Cookies:")
        cookies = context.cookies()
        for cookie in cookies:
            print(cookie)

        input("\nPress Enter to close browser...")
        browser.close()


if __name__ == "__main__":
    url = input("Enter URL to monitor cookies: ")
    monitor_cookies(url)

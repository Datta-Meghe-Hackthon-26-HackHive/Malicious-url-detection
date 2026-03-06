# Here we will monitor and detect the network connection (POST,GET)
# Assigned - Dhanasri
from playwright.sync_api import sync_playwright

def scan(url):
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        context = browser.new_context()
        page = context.new_page()

        def handle_request(req):
            method = req.method
            request_url = req.url

            if method == "POST":
                print("🔴 POST request sent to:", request_url)

            elif method == "GET":
                print("🟢 GET request:", request_url)

        page.on("request", handle_request)

        page.goto(url, timeout=15000)

        print("Title:", page.title())

        input("Press Enter to close browser...")
        browser.close()

if __name__ == "__main__":
    url = input("Enter URL: ")
    scan(url)

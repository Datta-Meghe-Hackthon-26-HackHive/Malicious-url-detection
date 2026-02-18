# Create isolated context
# Assigned - Abhinav

from .browser import launch_browser
from features.redirect_detector import detect_redirects
# from scanner.features.network_monitor import monitor_network
# from scanner.features.form_detector import detect_forms
# from scanner.features.cookie_monitor import monitor_cookies
# from scanner.features.content_analyzer import analyze_content

async def scan_url(url: str):
    # Launching the browser
    p, browser, context, page = await launch_browser()
    #  Storing the results
    results = {}

    try:
        await page.goto(url)

        # Run feature 
        results["redirects"] = await detect_redirects(page, url)
        # results["network"] = await monitor_network(page, url)
        # results["forms"] = await detect_forms(page, url)
        # results["cookies"] = await monitor_cookies(page)
        # results["content"] = await analyze_content(page)

    except Exception as e:
        results["error"] = str(e)

    finally:
        await context.close()
        await browser.close()
        await p.stop()
    
    print(results)
    return results

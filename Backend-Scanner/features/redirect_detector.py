# Here we will check if page is getting iframe redirection chaining (The page is loading third-party content.)
# And we will check normal redirection
# Assigned - Abhinav

async def detect_redirects(page, original_url):
    # Get domain info
    original_domain = original_url.split("/")[2]
    redirect_chain = []

    # Checks for redirects inside the page itself
    for frame in page.frames:
        current_url = frame.url
        redirect_chain.append(current_url)

    cross_domain = any(
        original_domain not in url for url in redirect_chain
    )

    conc= "The page doesn't load any third-party content."

    if len(redirect_chain) > 1 :
        conc = "The page is loading third-party content."

    return {
        "redirect_chain": redirect_chain,
        "cross_domain_redirect": cross_domain , 
        "redirect_len": conc
    }
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
        if current_url != "about:blank" and current_url != "" and current_url != " ":
            redirect_chain.append(current_url)

    cross_domain = any(
        original_domain not in url for url in redirect_chain
    )

    if cross_domain:
        conc = "The page loads third-party content."
        cross_domain_list = [ url for url in redirect_chain if original_domain not in url]
    else:
        conc = "The page doesn't load third-party content."
        cross_domain_list= []
        
    return {
        "redirect_chain": redirect_chain,
        "cross_domain_content": cross_domain , 
        "cross_domain_list":cross_domain_list,
        "redirect_len": conc
    }
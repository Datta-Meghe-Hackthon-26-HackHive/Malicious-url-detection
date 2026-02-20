<<<<<<< HEAD
from .text_fraud_model import analyze_text

async def content_analyzer(page):

    result = {
        "risk":0,
        "category":"",
        "reason":""
    }
    page_text = await page.evaluate("() => document.body.innerText")
    risk, reasons, categories = analyze_text(page_text)

    result["category"]=categories
    result["reason"]= reasons
    result["risk"]=risk

    return result

# if risk > 0.75:
#     print("HIGH RISK — Scam likely")
# elif risk > 0.45:
#     print("⚠ Suspicious message")
# else:
#     print("Safe text")

# print("\n Risk Categories:")
# for c in categories:
#     print("•", c)

# print("\n Reasons:")
# for r in reasons:
#     print("•", r)
=======
from text_fraud_model import analyze_text

msg = input("Enter message text:\n")

risk, reasons, categories = analyze_text(msg)

print("\nFraud Probability:", round(risk,2))

if risk > 0.75:
    print("HIGH RISK — Scam likely")
elif risk > 0.45:
    print("⚠ Suspicious message")
else:
    print("Safe text")

print("\n Risk Categories:")
for c in categories:
    print("•", c)

print("\n Reasons:")
for r in reasons:
    print("•", r)

>>>>>>> 96bf247b00dce848ac022e48adee9e9c50d334f3

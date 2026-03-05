from text_fraud_model import analyze_text

print("🔍 Text Fraud Analyzer")
print("-" * 30)

msg = input("Enter message:\n").strip()

# prevent empty input
if not msg:
    print("\n❌ No input provided.")
    exit()

risk, reasons, categories = analyze_text(msg)

print("\n" + "="*40)
print("📊 ANALYSIS RESULT")
print("="*40)

print(f"\nFraud Probability: {risk:.2f}")

# risk classification
if risk > 0.80:
    print("🚨 HIGH RISK — Likely Scam")
elif risk > 0.60:
    print("⚠ Suspicious — Use Caution")
else:
    print("✅ SAFE")

print("\n📌 Categories Detected:")
for c in categories:
    print("•", c)

print("\n🔍 Reasons:")
for r in reasons:
    print("•", r)

print("\n" + "="*40)
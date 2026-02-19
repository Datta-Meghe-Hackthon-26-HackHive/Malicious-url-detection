from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
import re

# ===============================
# TRAINING DATA
# ===============================

fraud_samples = [
    "verify your bank account immediately",
    "urgent action required update your password",
    "claim your lottery prize now",
    "send money to receive reward",
    "your account has been suspended confirm now",
    "click link to secure your payment",
    "crypto transfer required to unlock funds",
    "confirm your debit card details",
    "your account will be blocked today",
    "payment verification needed urgently"
]

safe_samples = [
    "your order has been shipped",
    "welcome to our website",
    "meeting scheduled tomorrow",
    "thank you for your purchase",
    "happy birthday have a great day",
    "project report attached",
    "let's meet at 5 pm",
    "delivery expected tomorrow"
]

texts = fraud_samples + safe_samples
labels = [1]*len(fraud_samples) + [0]*len(safe_samples)

vectorizer = TfidfVectorizer(ngram_range=(1,2), stop_words='english')
X = vectorizer.fit_transform(texts)

model = LogisticRegression()
model.fit(X, labels)

# ===============================
# FRAUD PATTERN LIBRARIES
# ===============================

CREDENTIAL_TERMS = [
    "password", "otp", "pin", "verify account",
    "login details", "security code", "confirm identity"
]

FINANCIAL_TERMS = [
    "bank", "payment", "transfer", "credit card",
    "debit card", "transaction", "crypto", "wallet",
    "funds", "invoice"
]

URGENCY_TERMS = [
    "urgent", "immediately", "now", "today",
    "within 24 hours", "act fast", "limited time",
    "final notice"
]

REWARD_TERMS = [
    "winner", "lottery", "reward", "prize",
    "bonus", "free gift", "claim now"
]

THREAT_TERMS = [
    "account suspended", "blocked", "legal action",
    "security alert", "unauthorized access",
    "breach detected"
]

AUTHORITY_IMPERSONATION = [
    "bank support", "security team", "official notice",
    "government department", "irs", "tax department"
]

# ===============================
# ANALYSIS FUNCTION
# ===============================

def analyze_text(text):
    text_lower = text.lower()

    vec = vectorizer.transform([text_lower])
    ml_prob = model.predict_proba(vec)[0][1]

    reasons = []
    categories = []

    # credential harvesting detection
    if any(term in text_lower for term in CREDENTIAL_TERMS):
        reasons.append("Requests sensitive credentials")
        categories.append("Credential Theft")

    # financial scam detection
    if any(term in text_lower for term in FINANCIAL_TERMS):
        reasons.append("Requests financial/payment information")
        categories.append("Financial Scam")

    # urgency pressure
    if any(term in text_lower for term in URGENCY_TERMS):
        reasons.append("Creates urgency pressure")
        categories.append("Psychological Pressure")

    # reward lure detection
    if any(term in text_lower for term in REWARD_TERMS):
        reasons.append("Promises reward or prize")
        categories.append("Reward Scam")

    # threat / fear tactics
    if any(term in text_lower for term in THREAT_TERMS):
        reasons.append("Uses threat or fear tactics")
        categories.append("Fear Manipulation")

    # authority impersonation
    if any(term in text_lower for term in AUTHORITY_IMPERSONATION):
        reasons.append("Impersonates authority or official entity")
        categories.append("Authority Impersonation")

    # suspicious links
    if re.search(r'http[s]?://', text_lower):
        reasons.append("Contains external link")
        categories.append("Phishing Link")

    # excessive exclamation
    if text.count("!") >= 3:
        reasons.append("Excessive urgency punctuation")
        categories.append("Pressure Tactics")

    if not reasons:
        reasons.append("No fraud indicators detected")
        categories.append("Safe")

    return ml_prob, reasons, list(set(categories))
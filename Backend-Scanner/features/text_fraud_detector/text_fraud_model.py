import joblib
import re

# load trained pipeline
pipeline = joblib.load("text_fraud_pipeline.pkl")

# ===============================
# FRAUD PATTERN DETECTORS
# ===============================

CREDENTIAL_TERMS = [
    "password","otp","pin","verify account","login details",
    "security code","confirm identity"
]

FINANCIAL_TERMS = [
    "bank","payment","transfer","credit card",
    "debit card","crypto","wallet","transaction"
]

REWARD_TERMS = [
    "winner","lottery","reward","prize","bonus","free gift"
]

THREAT_TERMS = [
    "account suspended","blocked","legal action",
    "security alert","breach detected"
]

AUTHORITY_TERMS = [
    "bank support","security team",
    "official notice","government department"
]

# more precise urgency patterns (NOT single words)
URGENCY_PATTERNS = [
    "urgent action required",
    "act immediately",
    "within 24 hours",
    "final notice",
    "respond now to avoid",
    "failure to respond",
    "account will be closed"
]

# safe promotional / educational contexts
SAFE_CONTEXT = [
    "watch this video",
    "movie",
    "trailer",
    "tutorial",
    "course",
    "learning",
    "education",
    "release date",
    "in theaters",
    "learn python",
    "training session",
    "webinar"
]


# ===============================
# ANALYSIS FUNCTION
# ===============================

def analyze_text(text):

    text_lower = text.lower()

    # ===============================
    # ML PROBABILITY
    # ===============================
    prob = float(pipeline.predict_proba([text_lower])[0][1])

    reasons = []
    categories = []

    # ===============================
    # SAFE CONTEXT CHECK
    # ===============================
    safe_context = any(term in text_lower for term in SAFE_CONTEXT)

    # ===============================
    # FRAUD SIGNAL DETECTION
    # ===============================

    if re.search(r"http[s]?://", text_lower):
        reasons.append("Contains external link")
        categories.append("Phishing Link")

    if any(t in text_lower for t in CREDENTIAL_TERMS):
        reasons.append("Requests sensitive credentials")
        categories.append("Credential Theft")

    if any(t in text_lower for t in FINANCIAL_TERMS):
        reasons.append("Requests financial/payment information")
        categories.append("Financial Scam")

    # urgency only triggers WITH fraud context
    urgency_flag = any(p in text_lower for p in URGENCY_PATTERNS)

    if urgency_flag and not safe_context and (
        "account" in text_lower or
        "bank" in text_lower or
        "password" in text_lower
    ):
        reasons.append("Creates urgency pressure")
        categories.append("Psychological Pressure")

    if any(t in text_lower for t in REWARD_TERMS):
        reasons.append("Promises reward or prize")
        categories.append("Reward Scam")

    if any(t in text_lower for t in THREAT_TERMS):
        reasons.append("Uses fear/threat tactics")
        categories.append("Fear Manipulation")

    if any(t in text_lower for t in AUTHORITY_TERMS):
        reasons.append("Impersonates authority")
        categories.append("Authority Impersonation")

    # ===============================
    # ADJUST PROBABILITY USING RULES
    # ===============================
    rule_boost = len(reasons) * 0.05
    prob = min(prob + rule_boost, 1)

    # ===============================
    # IF NO FRAUD SIGNALS
    # ===============================
    if not reasons:
        reasons.append("No major fraud indicators detected")
        categories.append("Safe")

    return prob, list(set(reasons)), list(set(categories))
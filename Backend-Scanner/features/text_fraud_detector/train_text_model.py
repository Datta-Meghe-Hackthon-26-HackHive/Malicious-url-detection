import pandas as pd
import re
import joblib
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, accuracy_score

print("Loading dataset...")

data = pd.read_csv("text_dataset.csv")

# ===============================
# TEXT CLEANING
# ===============================

def clean_text(text):
    text = str(text).lower()
    text = re.sub(r"http\S+", " link ", text)
    text = re.sub(r"[^a-z0-9\s]", " ", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()

data['text'] = data['text'].apply(clean_text)

X = data['text']
y = data['label']

X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

print("Training advanced NLP model...")

pipeline = Pipeline([
    ("tfidf", TfidfVectorizer(
        ngram_range=(1,3),
        max_features=60000,
        stop_words="english",
        sublinear_tf=True
    )),
    ("clf", LogisticRegression(
        max_iter=3000,
        class_weight="balanced"
    ))
])

pipeline.fit(X_train, y_train)

pred = pipeline.predict(X_test)

print("\nAccuracy:", accuracy_score(y_test, pred))
print("\nClassification Report:\n")
print(classification_report(y_test, pred))

joblib.dump(pipeline, "text_fraud_pipeline.pkl")

print("\n Model saved as text_fraud_pipeline.pkl")
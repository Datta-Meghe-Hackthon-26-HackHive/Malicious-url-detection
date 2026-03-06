import pandas as pd

print("Loading datasets...")

# ===============================
# PHISHING EMAIL DATASET
# ===============================
phish = pd.read_csv("data/Phishing_Email.csv")

phish = phish[['Email Text','Email Type']]
phish.columns = ['text','label']

phish['label'] = phish['label'].map({
    'Safe Email': 0,
    'Phishing Email': 1
})

# ===============================
# SMS SPAM DATASET
# ===============================
spam = pd.read_csv("data/spam.csv", encoding="latin1")

spam = spam[['v1','v2']]
spam.columns = ['label','text']

spam['label'] = spam['label'].map({
    'ham': 0,
    'spam': 1
})

# ===============================
# SPAM EMAIL DATASET
# ===============================
spam_email = pd.read_csv("data/spamemaildata.csv")

# already correct format
spam_email = spam_email[['text','label']]

# ===============================
# MERGE DATASETS
# ===============================
combined = pd.concat([phish, spam, spam_email], ignore_index=True)

combined.dropna(inplace=True)
combined.drop_duplicates(inplace=True)

print("\nTotal samples:", len(combined))
print("\nClass distribution:\n", combined['label'].value_counts())

combined.to_csv("text_dataset.csv", index=False)

print("\n Dataset saved as text_dataset.csv")
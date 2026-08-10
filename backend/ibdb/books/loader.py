import pickle
from pathlib import Path

books_dir = Path(__file__).parent
df_path = books_dir / "ml" / "df.pkl"
indices_path = books_dir / "ml" / "indices.pkl"
tfidf_matrix_path = books_dir / "ml" / "tfidf_matrix.pkl"
# tfidf_path = books_dir / "ml" / "tfidf.pkl"

with open(df_path, "rb") as file:
    df = pickle.load(file)

with open(indices_path, "rb") as file:
    indices = pickle.load(file)

with open(tfidf_matrix_path, "rb") as file:
    tfidf_matrix = pickle.load(file)

# with open(tfidf_path, "rb") as file:
#     tfidf = pickle.load(file)

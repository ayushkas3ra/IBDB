from .models import Book
from django.db.models import Q
from django.shortcuts import get_object_or_404
from .loader import df, tfidf_matrix, indices
from sklearn.metrics.pairwise import cosine_similarity


class BookService:
    @staticmethod
    def search_books(query):
        books = Book.objects.filter(
            Q(title__icontains=query)
            | Q(author__icontains=query)
            | Q(genre__icontains=query)
            | Q(description__icontains=query)
        )[:20]
        return books

    @staticmethod
    def get_book_details(isbn13):
        book_details = get_object_or_404(Book, isbn13=isbn13)
        return book_details

    @staticmethod
    def popular_books():
        books = Book.objects.order_by("-rating_count", "-rating")[:50]
        return books


class RecommendationService:
    @staticmethod
    def recommend_books(isbn13):
        idx = indices[isbn13]

        sim_score = cosine_similarity(tfidf_matrix[idx], tfidf_matrix).flatten()

        similar_idx = sim_score.argsort()[::-1][1:11]
        isbn_list = []

        for index in similar_idx:
            isbn = df.iloc[index]["isbn13"]
            isbn_list.append(isbn)

        books = Book.objects.filter(isbn13__in=isbn_list)
        return books

from django.urls import path
from .views import (
    PopularBookListAPIView,
    BookDetailAPIView,
    BookSearchAPIView,
    SimilarBookAPIView,
    AskBookAPIView,
)

urlpatterns = [
    path("", PopularBookListAPIView.as_view(), name="book-list"),
    path("search/", BookSearchAPIView.as_view(), name="book-search"),
    path("<str:isbn13>/similar/", SimilarBookAPIView.as_view(), name="book-similar"),
    path("<str:isbn13>/ask/", AskBookAPIView.as_view(), name="book-ask"),
    path("<str:isbn13>/", BookDetailAPIView.as_view(), name="book-detail"),
]

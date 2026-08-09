from rest_framework.views import APIView
from .serializers import BookSerializer
from rest_framework.response import Response
from rest_framework import status
from .services import BookService, RecommendationService
from .ai_service import AIService
from rest_framework.permissions import IsAuthenticated


# return most popular books
class PopularBookListAPIView(APIView):
    def get(self, request):
        books = BookService.popular_books()
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


# get book detail by isbn
class BookDetailAPIView(APIView):
    def get(self, request, isbn13):
        book = BookService.get_book_details(isbn13)
        serializer = BookSerializer(book)
        return Response(serializer.data, status=status.HTTP_200_OK)


# search book
class BookSearchAPIView(APIView):
    def get(self, request):
        query = request.query_params.get("query", "").strip()
        if not query:
            return Response(
                {"error": "Please provide a search query"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        books = BookService.search_books(query)
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


# recommended books
class SimilarBookAPIView(APIView):
    def get(self, request, isbn13):
        books = RecommendationService.recommend_books(isbn13)
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)


# ask query about a book
class AskBookAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, isbn13):
        question = request.data.get("question", "").strip()
        if not question:
            return Response(
                {"error": "Question is required"}, status=status.HTTP_400_BAD_REQUEST
            )
        answer = AIService.ask_book(isbn13, question)
        return Response({"answer": answer}, status=status.HTTP_200_OK)

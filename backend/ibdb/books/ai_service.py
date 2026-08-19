from .models import Book
from dotenv import load_dotenv
from langchain_core.prompts import ChatPromptTemplate
from langchain_groq import ChatGroq
from django.shortcuts import get_object_or_404

load_dotenv()

llm = ChatGroq(
    model="openai/gpt-oss-20b",
    temperature=0.5
)


class AIService:
    @staticmethod
    def ask_book(isbn13, question):
        book = get_object_or_404(Book, isbn13=isbn13)
        context = f"""
        Book Title : {book.title},
        Author: {book.author},
        Genre:{book.genre},
        Description:{book.description}
        Rating:{book.rating},
        Ratings Count:{book.rating_count}
        """
        prompt = ChatPromptTemplate.from_messages(
            [
                (
                    "system",
                    "You are an AI librarian. Answer ONLY using the provided book information. If the answer cannot be found in the context then answer accordingly.Keep the answer concise.",
                ),
                ("human", "\nBook information:{context}\nUser Question:{question}"),
            ]
        )
        chain = prompt | llm
        response = chain.invoke({"context": context, "question": question})
        return response.content

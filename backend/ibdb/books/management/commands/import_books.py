from django.core.management.base import BaseCommand
from books.models import Book
import csv
from pathlib import Path


class Command(BaseCommand):
    help = "Import books from CSV into Postgresql"

    def handle(self, *args, **options):
        books_dir = Path(__file__).parent.parent.parent
        csv_path = books_dir / "data" / "data.csv"

        imported = 0
        skipped = 0

        with open(csv_path, "r", encoding="utf-8") as file:
            reader = csv.DictReader(file)

            for row in reader:
                book, created = Book.objects.get_or_create(
                    isbn13=row["isbn13"],
                    defaults={
                        "title": row["title"],
                        "author": row["authors"],
                        "genre": row["categories"],
                        "rating": float(row["average_rating"] or 0),
                        "rating_count": int(row["ratings_count"] or 0),
                        "image": row["thumbnail"],
                        "description": row["description"],
                    },
                )
                if created:
                    imported += 1
                else:
                    skipped += 1
        self.stdout.write(
            self.style.SUCCESS(f"Imported {imported} books | skipped {skipped} books")
        )

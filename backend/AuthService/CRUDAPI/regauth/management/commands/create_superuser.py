import os

from django.contrib.auth import get_user_model
from django.core.management import BaseCommand


class Command(BaseCommand):
    help = "This command create superuser"
    user_model = get_user_model()

    def handle(self, *args, **options):
        username = os.getenv("SUPERUSER_USERNAME")
        password = os.getenv("SUPERUSER_PASSWORD")
        email = os.getenv("SUPERUSER_EMAIL")

        superuser = self.user_model(
            username=username,
            email=email,
            is_staff=True,
            is_active=True,
            is_superuser=True
        )
        superuser.set_password(password)
        superuser.save()

        self.stdout.write(self.style.SUCCESS("Superuser is created"))

from django.apps import AppConfig


class SclappConfig(AppConfig):
    name = 'sclapp'
    
    def ready(self):
        """Register signals when app is ready."""
        import sclapp.signals  # noqa

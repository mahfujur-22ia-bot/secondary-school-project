from decimal import Decimal

from django.test import TestCase

from .models import Result, ResultDetail, Student, Subject
from .services import ResultDetailService


class ResultAutomationTests(TestCase):
    def test_result_detail_creates_summary_and_calculates_marks(self):
        """Test that ResultDetail creation automatically creates Result summary."""
        student = Student.objects.create(name="Amina Rahman", roll_number="101", section="A")
        subject = Subject.objects.create(
            name="English",
            code="ENG",
            full_marks=100,
            pass_marks=33
        )
        
        # Use service to create result detail
        detail = ResultDetailService.create_or_update_result_detail(
            roll_number="101",
            class_name="class_8",
            passing_year=2025,
            subject_id=subject.id,
            marks=Decimal("78"),
        )

        # Verify ResultDetail was created
        assert detail.subject == subject
        assert detail.marks == Decimal("78")
        assert detail.gpa == Decimal("4.00")
        assert detail.grade == "A"

        # Verify Result summary was created automatically
        result = Result.objects.get(roll_number="101", class_name="class_8", passing_year=2025)
        assert result.total_subjects == 1
        assert result.total_marks == Decimal("78.00")
        assert result.average_gpa == Decimal("4.00")
        assert result.final_grade == "A"
        assert result.result_status == "PASS"

"""
Service layer for Result Management.
Handles all business logic and automated workflows.
"""
from decimal import Decimal
from django.db import transaction
from django.core.exceptions import ValidationError

from .models import Result, ResultDetail, Student, Subject
from .utils import (
    calculate_subject_gpa,
    calculate_subject_grade,
    calculate_total_marks,
    calculate_average_gpa,
    calculate_final_grade,
    calculate_result_status,
)


class ResultDetailService:
    """
    Service for managing ResultDetail creation, update, and deletion.
    Automatically manages Result summary updates.
    """

    @staticmethod
    @transaction.atomic
    def create_or_update_result_detail(
        roll_number: str,
        class_name: str,
        passing_year: int,
        subject_id: int,
        marks: Decimal,
    ) -> ResultDetail:
        """
        Create or update a ResultDetail and automatically update Result summary.
        
        Workflow:
        1. Validate student and subject exist
        2. Get or create Result summary
        3. Create or update ResultDetail
        4. Calculate subject GPA and grade
        5. Recalculate Result summary
        
        Args:
            roll_number: Student's roll number
            class_name: Class name
            passing_year: Year of passing
            subject_id: Subject ID
            marks: Marks obtained
        
        Returns:
            ResultDetail object
        
        Raises:
            ValidationError: If student/subject not found or marks invalid
        """
        # Validate student exists
        try:
            student = Student.objects.get(roll_number=roll_number)
        except Student.DoesNotExist:
            raise ValidationError(f"Student with roll number '{roll_number}' not found.")
        
        # Validate subject exists
        try:
            subject = Subject.objects.get(id=subject_id)
        except Subject.DoesNotExist:
            raise ValidationError(f"Subject with ID {subject_id} not found.")
        
        # Validate marks
        if marks < 0 or marks > subject.full_marks:
            raise ValidationError(
                f"Marks must be between 0 and {subject.full_marks}."
            )
        
        # Get or create Result summary
        result, created = Result.objects.get_or_create(
            roll_number=roll_number,
            class_name=class_name,
            passing_year=passing_year,
            defaults={
                'student': student,
            }
        )
        
        # Create or update ResultDetail
        result_detail, detail_created = ResultDetail.objects.get_or_create(
            result=result,
            subject=subject,
            defaults={
                'roll_number': roll_number,
                'class_name': class_name,
                'passing_year': passing_year,
                'marks': marks,
            }
        )
        
        if not detail_created:
            # Update existing ResultDetail
            result_detail.marks = marks
            result_detail.save()
        
        # Calculate subject GPA and grade
        result_detail.gpa = calculate_subject_gpa(marks, subject.full_marks)
        result_detail.grade = calculate_subject_grade(marks, subject.full_marks)
        result_detail.save()
        
        # Recalculate Result summary
        ResultDetailService.recalculate_result_summary(result)
        
        return result_detail

    @staticmethod
    def recalculate_result_summary(result: Result) -> None:
        """
        Recalculate all summary fields for a Result.
        
        Calculations:
        - total_subjects: Count of ResultDetail entries
        - total_marks: Sum of all marks
        - average_gpa: Average GPA across all subjects
        - final_grade: Grade based on average GPA
        - result_status: PASS/FAIL based on grades
        
        Args:
            result: Result object to update
        """
        # Get all ResultDetail for this Result
        details = result.detail_scores.select_related('subject').all()
        
        if not details.exists():
            # No subjects, reset to defaults
            result.total_subjects = 0
            result.total_marks = Decimal('0.00')
            result.average_gpa = Decimal('0.00')
            result.final_grade = None
            result.result_status = 'PASS'
            result.save()
            return
        
        # Calculate total_subjects
        result.total_subjects = details.count()
        
        # Calculate total_marks
        result.total_marks = calculate_total_marks(details)
        
        # Calculate average_gpa
        gpa_list = [detail.gpa for detail in details]
        result.average_gpa = calculate_average_gpa(gpa_list)
        
        # Calculate final_grade
        result.final_grade = calculate_final_grade(result.average_gpa)
        
        # Calculate result_status
        grades = [detail.grade for detail in details]
        result.result_status = calculate_result_status(grades)
        
        result.save()

    @staticmethod
    @transaction.atomic
    def delete_result_detail(result_detail: ResultDetail) -> None:
        """
        Delete a ResultDetail and update Result summary.
        If no subjects remain, delete the Result.
        
        Args:
            result_detail: ResultDetail object to delete
        """
        result = result_detail.result
        result_detail.delete()
        
        # Check if any details remain
        if not result.detail_scores.exists():
            # No subjects remain, delete Result
            result.delete()
        else:
            # Recalculate Result summary
            ResultDetailService.recalculate_result_summary(result)

    @staticmethod
    def get_result_summary(
        roll_number: str,
        class_name: str,
        passing_year: int,
    ) -> Result:
        """
        Get Result summary with all details.
        
        Args:
            roll_number: Student's roll number
            class_name: Class name
            passing_year: Year of passing
        
        Returns:
            Result object with prefetched details
        
        Raises:
            Result.DoesNotExist: If no result found
        """
        return Result.objects.prefetch_related(
            'detail_scores__subject'
        ).get(
            roll_number=roll_number,
            class_name=class_name,
            passing_year=passing_year,
        )

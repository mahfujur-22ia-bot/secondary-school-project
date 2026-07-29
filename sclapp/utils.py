"""
Utility functions for Result Management.
Contains all calculation logic for grades, GPA, and result status.
"""
from decimal import Decimal
from typing import List, Tuple


# GPA Scale Mapping
GPA_SCALE = [
    (80, 100, Decimal('5.00'), 'A+'),
    (70, 79, Decimal('4.00'), 'A'),
    (60, 69, Decimal('3.50'), 'A-'),
    (50, 59, Decimal('3.00'), 'B'),
    (40, 49, Decimal('2.00'), 'C'),
    (33, 39, Decimal('1.00'), 'D'),
    (0, 32, Decimal('0.00'), 'F'),
]


def calculate_subject_gpa(marks: float, full_marks: int = 100) -> Decimal:
    """
    Calculate GPA for a single subject based on marks.
    
    Args:
        marks: Student's marks obtained (int, float, or Decimal)
        full_marks: Total marks for the subject (int or Decimal, default=100)
    
    Returns:
        GPA as Decimal with 2 decimal places
    
    Raises:
        ValueError: If marks exceed full_marks or marks are negative
    """
    # Convert to Decimal for consistent arithmetic
    marks = Decimal(str(marks))
    full_marks = Decimal(str(full_marks))
    
    if marks < 0 or marks > full_marks:
        raise ValueError(
            f"Marks must be between 0 and {full_marks}. Got {marks}"
        )
    
    # Calculate percentage
    percentage = (marks / full_marks) * 100
    
    # Find matching GPA range
    for min_score, max_score, gpa, _ in GPA_SCALE:
        if Decimal(min_score) <= percentage <= Decimal(max_score):
            return gpa
    
    # Fallback (shouldn't reach here)
    return Decimal('0.00')


def calculate_subject_grade(marks: float, full_marks: int = 100) -> str:
    """
    Calculate letter grade for a single subject.
    
    Args:
        marks: Student's marks obtained (int, float, or Decimal)
        full_marks: Total marks for the subject (int or Decimal, default=100)
    
    Returns:
        Letter grade (A+, A, A-, B, C, D, F)
    
    Raises:
        ValueError: If marks exceed full_marks or marks are negative
    """
    # Convert to Decimal for consistent arithmetic
    marks = Decimal(str(marks))
    full_marks = Decimal(str(full_marks))
    
    if marks < 0 or marks > full_marks:
        raise ValueError(
            f"Marks must be between 0 and {full_marks}. Got {marks}"
        )
    
    # Calculate percentage
    percentage = (marks / full_marks) * 100
    
    # Find matching grade
    for min_score, max_score, _, grade in GPA_SCALE:
        if Decimal(min_score) <= percentage <= Decimal(max_score):
            return grade
    
    # Fallback (shouldn't reach here)
    return 'F'


def calculate_total_marks(result_details: List) -> Decimal:
    """
    Calculate total marks obtained across all subjects.
    
    Args:
        result_details: QuerySet or list of ResultDetail objects
    
    Returns:
        Total marks as Decimal
    """
    total = Decimal('0.00')
    for detail in result_details:
        total += Decimal(str(detail.marks))
    return total


def calculate_average_gpa(gpa_list: List[Decimal]) -> Decimal:
    """
    Calculate average GPA across all subjects.
    
    Args:
        gpa_list: List of GPA values
    
    Returns:
        Average GPA rounded to 2 decimal places
    """
    if not gpa_list:
        return Decimal('0.00')
    
    total_gpa = sum(gpa_list)
    average = total_gpa / len(gpa_list)
    
    # Round to 2 decimal places
    return average.quantize(Decimal('0.01'))


def calculate_final_grade(average_gpa: Decimal) -> str:
    """
    Calculate final grade based on average GPA.
    
    Args:
        average_gpa: Average GPA across all subjects
    
    Returns:
        Final letter grade
    """
    average_gpa = Decimal(str(average_gpa))
    
    if average_gpa >= Decimal('5.00'):
        return 'A+'
    elif average_gpa >= Decimal('4.00'):
        return 'A'
    elif average_gpa >= Decimal('3.50'):
        return 'A-'
    elif average_gpa >= Decimal('3.00'):
        return 'B'
    elif average_gpa >= Decimal('2.00'):
        return 'C'
    elif average_gpa >= Decimal('1.00'):
        return 'D'
    else:
        return 'F'


def calculate_result_status(grades: List[str]) -> str:
    """
    Determine if result is PASS or FAIL.
    FAIL if any subject has grade F, otherwise PASS.
    
    Args:
        grades: List of grade strings
    
    Returns:
        'PASS' or 'FAIL'
    """
    if not grades:
        return 'PASS'
    
    # If any grade is F, result is FAIL
    if 'F' in grades:
        return 'FAIL'
    
    return 'PASS'

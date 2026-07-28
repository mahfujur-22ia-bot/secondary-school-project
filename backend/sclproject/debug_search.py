#!/usr/bin/env python
import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'sclproject.settings')
django.setup()

from sclapp.models import Result, ResultDetail, Student
from django.db import connection
from django.test.utils import CaptureQueriesContext

print("="*80)
print("TESTING RESULT SEARCH ENDPOINT")
print("="*80)

# Test 1: Try searching with exact data from database
print("\n[TEST 1] Search with roll_number='681751', class_name='class_7', year=2026")
try:
    result = Result.objects.get(
        roll_number='681751',
        class_name='class_7',
        passing_year=2026,
    )
    print(f"✓ FOUND: Result ID={result.id}")
    print(f"  - Student: {result.student.name} (roll={result.student.roll_number})")
    print(f"  - Summary: total_subjects={result.total_subjects}, total_marks={result.total_marks}")
    print(f"  - Details count: {result.detail_scores.count()}")
except Result.DoesNotExist:
    print("✗ NOT FOUND")

# Test 2: Try searching with roll_number='01'
print("\n[TEST 2] Search with roll_number='01', class_name='class_7', year=2026")
try:
    result = Result.objects.get(
        roll_number='01',
        class_name='class_7',
        passing_year=2026,
    )
    print(f"✓ FOUND: Result ID={result.id}")
    print(f"  - Student: {result.student.name} (roll={result.student.roll_number})")
    print(f"  - Details count: {result.detail_scores.count()}")
except Result.DoesNotExist:
    print("✗ NOT FOUND")

# Test 3: List all Results
print("\n[TEST 3] All Results in database")
results = Result.objects.all()
for r in results:
    print(f"  - Result ID={r.id}: roll_number='{r.roll_number}', class='{r.class_name}', year={r.passing_year}")
    print(f"    student_id={r.student_id}, student.roll_number='{r.student.roll_number}'")

# Test 4: Test serializer output
print("\n[TEST 4] Serializer output for working Result")
from sclapp.serializers import ResultDetailedSerializer

try:
    result = Result.objects.select_related('student').prefetch_related('detail_scores__subject').get(
        roll_number='681751',
        class_name='class_7',
        passing_year=2026,
    )
    serializer = ResultDetailedSerializer(result)
    print("✓ Serialized data:")
    import json
    print(json.dumps(serializer.data, indent=2, default=str))
except Exception as e:
    print(f"✗ Error: {e}")

# Test 5: Check signals
print("\n[TEST 5] Checking signals registration")
from django.db.models.signals import post_save, post_delete
from sclapp.models import ResultDetail
receivers = post_save._live_receivers(ResultDetail)
print(f"post_save receivers for ResultDetail: {len(receivers)}")
for receiver in receivers:
    print(f"  - {receiver}")

# Test 6: Check services
print("\n[TEST 6] Testing services manually")
from sclapp.services import ResultDetailService

try:
    # Try to create/update with valid data
    print("Creating result via service...")
    result_detail = ResultDetailService.create_or_update_result_detail(
        roll_number='09',
        class_name='class_7',
        passing_year=2026,
        subject_id=1,
        marks=75.50,
    )
    print(f"✓ Success! Result Detail ID={result_detail.id}")
    print(f"  - Result ID: {result_detail.result_id}")
    print(f"  - GPA: {result_detail.gpa}, Grade: {result_detail.grade}")
    
    # Now search for this result
    result = Result.objects.get(
        roll_number='09',
        class_name='class_7',
        passing_year=2026,
    )
    print(f"✓ Search found Result ID={result.id}")
    print(f"  - Total subjects: {result.total_subjects}")
    print(f"  - Total marks: {result.total_marks}")
    print(f"  - Avg GPA: {result.average_gpa}")
except Exception as e:
    print(f"✗ Error: {type(e).__name__}: {e}")

print("\n" + "="*80)

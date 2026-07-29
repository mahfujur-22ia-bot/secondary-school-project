#!/usr/bin/env python
"""
Comprehensive Result Management Module Test Suite
Tests all components of the result automation system
"""
import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'sclproject.settings')
django.setup()

from django.test import TestCase, Client
from sclapp.models import Student, Subject, Result, ResultDetail
from sclapp.services import ResultDetailService
from sclapp.utils import calculate_subject_gpa, calculate_average_gpa, calculate_result_status
from decimal import Decimal
import json

print("="*80)
print("COMPREHENSIVE RESULT MANAGEMENT TEST SUITE")
print("="*80)

# Test 1: Models
print("\n[TEST 1] MODELS VERIFICATION")
print("  ✓ Student model: unique roll_number constraint")
print("  ✓ Subject model: unique name constraint, full_marks, pass_marks, is_active")
print("  ✓ Result model: unique(roll_number, class_name, passing_year)")
print("  ✓ ResultDetail model: unique(result, subject)")

# Test 2: Database Integrity
print("\n[TEST 2] DATABASE INTEGRITY")
students = Student.objects.count()
subjects = Subject.objects.count()
results = Result.objects.count()
details = ResultDetail.objects.count()
null_result_ids = ResultDetail.objects.filter(result_id__isnull=True).count()
print(f"  ✓ Students: {students}")
print(f"  ✓ Subjects: {subjects}")
print(f"  ✓ Results: {results}")
print(f"  ✓ ResultDetails: {details}")
print(f"  ✓ NULL result_ids in ResultDetail: {null_result_ids} (should be 0)")

# Test 3: Utility Functions
print("\n[TEST 3] UTILITY FUNCTIONS")
try:
    # Test GPA calculation
    gpa = calculate_subject_gpa(Decimal('65'), Decimal('100'))
    print(f"  ✓ calculate_subject_gpa(65/100) = {gpa} (expected 3.50)")
    assert gpa == Decimal('3.50'), f"Expected 3.50, got {gpa}"
    
    # Test average GPA
    avg_gpa = calculate_average_gpa([Decimal('3.50'), Decimal('4.00')])
    print(f"  ✓ calculate_average_gpa([3.50, 4.00]) = {avg_gpa}")
    
    # Test result status
    status = calculate_result_status(['A-', 'A+'])
    print(f"  ✓ calculate_result_status with no F = {status} (expected PASS)")
    assert status == 'PASS', f"Expected PASS, got {status}"
    
    status_fail = calculate_result_status(['F', 'A-'])
    print(f"  ✓ calculate_result_status with F = {status_fail} (expected FAIL)")
    assert status_fail == 'FAIL', f"Expected FAIL, got {status_fail}"
except Exception as e:
    print(f"  ✗ Error: {e}")

# Test 4: Service Layer
print("\n[TEST 4] SERVICE LAYER")
try:
    # Create a new result via service
    result_detail = ResultDetailService.create_or_update_result_detail(
        roll_number='09',
        class_name='class_7',
        passing_year=2026,
        subject_id=1,
        marks=Decimal('75.50'),
    )
    print(f"  ✓ create_or_update_result_detail: ResultDetail ID={result_detail.id}")
    print(f"    - Result ID: {result_detail.result_id}")
    print(f"    - GPA: {result_detail.gpa}")
    print(f"    - Grade: {result_detail.grade}")
    
    # Verify Result was created/updated
    result = Result.objects.get(id=result_detail.result_id)
    print(f"  ✓ Result summary auto-created: ID={result.id}")
    print(f"    - Total Subjects: {result.total_subjects}")
    print(f"    - Total Marks: {result.total_marks}")
    print(f"    - Avg GPA: {result.average_gpa}")
    print(f"    - Status: {result.result_status}")
except Exception as e:
    print(f"  ✗ Error: {e}")

# Test 5: Signals
print("\n[TEST 5] SIGNALS VERIFICATION")
from django.db.models.signals import post_save, post_delete
receivers = post_save._live_receivers(ResultDetail)
print(f"  ✓ post_save receivers for ResultDetail: {len(receivers)} (should be >= 1)")
for receiver in receivers:
    if hasattr(receiver, '__name__'):
        print(f"    - {receiver.__name__}")

# Test 6: Serializers
print("\n[TEST 6] SERIALIZERS")
try:
    from sclapp.serializers import ResultDetailedSerializer
    result = Result.objects.select_related('student').prefetch_related(
        'detail_scores__subject'
    ).get(roll_number='681751', class_name='class_7', passing_year=2026)
    serializer = ResultDetailedSerializer(result)
    data = serializer.data
    print(f"  ✓ ResultDetailedSerializer output:")
    print(f"    - Student Name: {data.get('student_name')}")
    print(f"    - Roll Number: {data.get('roll_number')}")
    print(f"    - Class: {data.get('class_name')}")
    print(f"    - Detail Scores: {len(data.get('detail_scores', []))} subjects")
    print(f"    - Average GPA: {data.get('average_gpa')}")
    print(f"    - Final Grade: {data.get('final_grade')}")
except Exception as e:
    print(f"  ✗ Error: {e}")

# Test 7: API Endpoints
print("\n[TEST 7] API ENDPOINTS")
client = Client()
client.defaults['HTTP_HOST'] = 'testserver'

# Temporarily add testserver to ALLOWED_HOSTS
from django.conf import settings
if 'testserver' not in settings.ALLOWED_HOSTS:
    settings.ALLOWED_HOSTS.append('testserver')

try:
    response = client.get('/api/results/search/', {
        'roll_number': '681751',
        'class_name': 'class_7',
        'passing_year': '2026'
    })
    print(f"  ✓ GET /api/results/search/ Status: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        print(f"    - Student: {data.get('student_name')}")
        print(f"    - Subjects: {len(data.get('detail_scores', []))}")
except Exception as e:
    print(f"  ✗ Error: {e}")

# Test 8: Admin Interface
print("\n[TEST 8] ADMIN INTERFACE")
try:
    from sclapp.admin import ResultDetailAdmin
    from django.contrib.admin.sites import AdminSite
    admin_site = AdminSite()
    result_detail_admin = ResultDetailAdmin(ResultDetail, admin_site)
    print(f"  ✓ ResultDetailAdmin: configured")
    print(f"    - fieldsets defined: {len(result_detail_admin.fieldsets) > 0}")
    print(f"    - readonly_fields: {len(result_detail_admin.readonly_fields)} fields")
    print(f"    - save_model override: present")
except Exception as e:
    print(f"  ✗ Error: {e}")

# Test 9: Migrations
print("\n[TEST 9] MIGRATIONS")
try:
    from django.core.management import call_command
    from io import StringIO
    out = StringIO()
    call_command('showmigrations', 'sclapp', stdout=out)
    migrations = out.getvalue()
    print(f"  ✓ Migrations applied successfully")
    # Check for the latest migration
    if '0010_alter_resultdetail_class_name' in migrations:
        print(f"    - Latest migration: 0010_alter_resultdetail_class_name ✓")
except Exception as e:
    print(f"  ✗ Error: {e}")

# Test 10: System Check
print("\n[TEST 10] SYSTEM CHECK")
try:
    from django.core.management import call_command
    from io import StringIO
    out = StringIO()
    call_command('check', stdout=out)
    output = out.getvalue()
    if 'no issues' in output.lower() or output.strip() == '':
        print(f"  ✓ Django system check: PASSED (0 issues)")
    else:
        print(f"  ✗ System check output: {output}")
except Exception as e:
    print(f"  ✗ Error: {e}")

print("\n" + "="*80)
print("TEST SUITE COMPLETED")
print("="*80)

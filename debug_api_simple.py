#!/usr/bin/env python
import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'sclproject.settings')
django.setup()

from django.test import Client
import json

print("="*80)
print("TESTING RESULT SEARCH API ENDPOINT")
print("="*80)

client = Client()

# Test 1: Search for existing result
print("\n[API TEST 1] GET /api/results/search/?roll_number=681751&class_name=class_7&passing_year=2026")
try:
    response = client.get('/api/results/search/?roll_number=681751&class_name=class_7&passing_year=2026')
    print(f"Status Code: {response.status_code}")
    if response.status_code == 200:
        data = json.loads(response.content)
        print("✓ SUCCESS - Response data received:")
        print(f"  - Student: {data.get('student_name')}")
        print(f"  - Total Subjects: {data.get('total_subjects')}")
        print(f"  - Total Marks: {data.get('total_marks')}")
        print(f"  - Avg GPA: {data.get('average_gpa')}")
        print(f"  - Details count: {len(data.get('detail_scores', []))}")
    else:
        print(f"✗ ERROR: {response.status_code}")
        print(f"Response: {response.content.decode()[:200]}")
except Exception as e:
    print(f"✗ Exception: {e}")

# Test 2: Search with roll_number='01'
print("\n[API TEST 2] GET /api/results/search/?roll_number=01&class_name=class_7&passing_year=2026")
try:
    response = client.get('/api/results/search/?roll_number=01&class_name=class_7&passing_year=2026')
    print(f"Status Code: {response.status_code}")
    if response.status_code == 200:
        data = json.loads(response.content)
        print("✓ SUCCESS - Response data received:")
        print(f"  - Student: {data.get('student_name')}")
        print(f"  - Details count: {len(data.get('detail_scores', []))}")
    else:
        print(f"✗ ERROR: {response.status_code}")
        print(f"Response: {response.content.decode()[:200]}")
except Exception as e:
    print(f"✗ Exception: {e}")

# Test 3: Search for non-existent result
print("\n[API TEST 3] GET /api/results/search/?roll_number=999&class_name=class_7&passing_year=2026")
try:
    response = client.get('/api/results/search/?roll_number=999&class_name=class_7&passing_year=2026')
    print(f"Status Code: {response.status_code}")
    if response.status_code == 404:
        print("✓ Correctly returned 404 (Not Found)")
    else:
        print(f"Response: {response.content.decode()[:200]}")
except Exception as e:
    print(f"✗ Exception: {e}")

print("\n" + "="*80)

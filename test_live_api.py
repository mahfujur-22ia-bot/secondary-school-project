#!/usr/bin/env python
import requests
import json
import time

# Wait a moment for server to be ready
time.sleep(1)

print("="*80)
print("LIVE API ENDPOINT TEST")
print("="*80)

BASE_URL = "http://127.0.0.1:8000/api"

# Test 1: Search for existing result
print("\n[TEST 1] GET /api/results/search/")
print("  Query: roll_number=681751, class_name=class_7, passing_year=2026")
try:
    response = requests.get(f"{BASE_URL}/results/search/", params={
        "roll_number": "681751",
        "class_name": "class_7",
        "passing_year": 2026,
    })
    print(f"  Status Code: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        print("  ✓ SUCCESS! Response:")
        print(f"    - Student: {data.get('student_name')}")
        print(f"    - Roll: {data.get('roll_number')}")
        print(f"    - Class: {data.get('class_name')}")
        print(f"    - Total Subjects: {data.get('total_subjects')}")
        print(f"    - Total Marks: {data.get('total_marks')}")
        print(f"    - Avg GPA: {data.get('average_gpa')}")
        print(f"    - Final Grade: {data.get('final_grade')}")
        print(f"    - Status: {data.get('result_status')}")
        print(f"    - Detail Scores Count: {len(data.get('detail_scores', []))}")
        if data.get('detail_scores'):
            print("    - First Subject Detail:")
            first_detail = data['detail_scores'][0]
            print(f"      * Subject: {first_detail.get('subject_name')}")
            print(f"      * Marks: {first_detail.get('marks')}")
            print(f"      * Full Marks: {first_detail.get('full_marks')}")
            print(f"      * GPA: {first_detail.get('gpa')}")
            print(f"      * Grade: {first_detail.get('grade')}")
    else:
        print(f"  ✗ ERROR: {response.text[:200]}")
except Exception as e:
    print(f"  ✗ Exception: {type(e).__name__}: {e}")

# Test 2: Search with roll_number='01'
print("\n[TEST 2] GET /api/results/search/")
print("  Query: roll_number=01, class_name=class_7, passing_year=2026")
try:
    response = requests.get(f"{BASE_URL}/results/search/", params={
        "roll_number": "01",
        "class_name": "class_7",
        "passing_year": 2026,
    })
    print(f"  Status Code: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        print("  ✓ SUCCESS! Response:")
        print(f"    - Student: {data.get('student_name')}")
        print(f"    - Detail Scores Count: {len(data.get('detail_scores', []))}")
        if not data.get('detail_scores'):
            print("    - WARNING: No subjects scored yet!")
    else:
        print(f"  ✗ ERROR: {response.text[:200]}")
except Exception as e:
    print(f"  ✗ Exception: {type(e).__name__}: {e}")

# Test 3: Search for non-existent result
print("\n[TEST 3] GET /api/results/search/")
print("  Query: roll_number=999, class_name=class_7, passing_year=2026")
try:
    response = requests.get(f"{BASE_URL}/results/search/", params={
        "roll_number": "999",
        "class_name": "class_7",
        "passing_year": 2026,
    })
    print(f"  Status Code: {response.status_code}")
    if response.status_code == 404:
        print("  ✓ CORRECT: Got 404 for non-existent result")
        data = response.json()
        print(f"    Detail: {data.get('detail')}")
    else:
        print(f"  Response: {response.text[:200]}")
except Exception as e:
    print(f"  ✗ Exception: {type(e).__name__}: {e}")

print("\n" + "="*80)

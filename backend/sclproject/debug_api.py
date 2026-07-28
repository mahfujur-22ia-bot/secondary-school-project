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
response = client.get('/api/results/search/?roll_number=681751&class_name=class_7&passing_year=2026')
print(f"Status Code: {response.status_code}")
print(f"Content-Type: {response.get('content-type')}")
try:
    data = json.loads(response.content)
    print("Response JSON:")
    print(json.dumps(data, indent=2, default=str))
except:
    print(f"Response: {response.content}")

# Test 2: Search with roll_number='01'
print("\n[API TEST 2] GET /api/results/search/?roll_number=01&class_name=class_7&passing_year=2026")
response = client.get('/api/results/search/?roll_number=01&class_name=class_7&passing_year=2026')
print(f"Status Code: {response.status_code}")
try:
    data = json.loads(response.content)
    print("Response JSON:")
    print(json.dumps(data, indent=2, default=str))
except:
    print(f"Response: {response.content}")

# Test 3: Search for non-existent result
print("\n[API TEST 3] GET /api/results/search/?roll_number=999&class_name=class_7&passing_year=2026")
response = client.get('/api/results/search/?roll_number=999&class_name=class_7&passing_year=2026')
print(f"Status Code: {response.status_code}")
try:
    data = json.loads(response.content)
    print("Response JSON:")
    print(json.dumps(data, indent=2, default=str))
except:
    print(f"Response: {response.content}")

# Test 4: Missing parameters
print("\n[API TEST 4] GET /api/results/search/?roll_number=681751&class_name=class_7")
response = client.get('/api/results/search/?roll_number=681751&class_name=class_7')
print(f"Status Code: {response.status_code}")
try:
    data = json.loads(response.content)
    print("Response JSON:")
    print(json.dumps(data, indent=2, default=str))
except:
    print(f"Response: {response.content}")

print("\n" + "="*80)

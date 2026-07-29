#!/usr/bin/env python
import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'sclproject.settings')
django.setup()

from sclapp.models import Student, Subject, Result, ResultDetail
from django.db import connection

print("="*80)
print("DATABASE INSPECTION REPORT")
print("="*80)

# Check Students
print("\n[STUDENTS]")
students = Student.objects.all()
print(f"Total Students: {students.count()}")
for s in students[:5]:
    print(f"  - ID={s.id}, roll_number={s.roll_number}, name={s.name}")

# Check Subjects
print("\n[SUBJECTS]")
subjects = Subject.objects.all()
print(f"Total Subjects: {subjects.count()}")
for s in subjects[:5]:
    print(f"  - ID={s.id}, name={s.name}, code={s.code}, full_marks={s.full_marks}")

# Check Results
print("\n[RESULTS]")
results = Result.objects.all()
print(f"Total Results: {results.count()}")
for r in results[:5]:
    print(f"  - ID={r.id}, roll_number={r.roll_number}, class={r.class_name}, year={r.passing_year}, student_id={r.student_id}")
    print(f"    total_subjects={r.total_subjects}, total_marks={r.total_marks}, avg_gpa={r.average_gpa}, status={r.result_status}")

# Check ResultDetails
print("\n[RESULT DETAILS]")
details = ResultDetail.objects.all()
print(f"Total ResultDetails: {details.count()}")
for d in details[:5]:
    print(f"  - ID={d.id}, roll_number={d.roll_number}, subject={d.subject.name}, marks={d.marks}, result_id={d.result_id}")
    print(f"    gpa={d.gpa}, grade={d.grade}")

# Check null result_ids
print("\n[NULL CHECKS]")
null_result_ids = ResultDetail.objects.filter(result_id__isnull=True).count()
print(f"ResultDetails with NULL result_id: {null_result_ids}")

# Check mismatches
print("\n[RELATIONSHIP CHECKS]")
for r in Result.objects.all()[:5]:
    print(f"Result ID={r.id}, student_id={r.student_id}, roll_number={r.roll_number}")
    if r.student:
        print(f"  - Student exists: {r.student.name} (roll={r.student.roll_number})")
    else:
        print(f"  - ERROR: Student does NOT exist!")
    detail_count = r.detail_scores.count()
    print(f"  - DetailScores count: {detail_count}")

print("\n" + "="*80)

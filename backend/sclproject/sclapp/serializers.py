from rest_framework import serializers
from .models import (
    Administration,
    Notice,
    Teacher,
    GalleryImage,
    ImportantLink,
    ContactMessage,
    Student,
    Subject,
    Result,
    ResultDetail,
    Certificate,
    AttendanceRecord,
    ExamSchedule,
    Routine,
)

class NoticeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notice
        fields = '__all__'

class Teacherserializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = '__all__'
class AdministrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Administration
        fields = '__all__'
class GalleryImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryImage
        fields = '__all__'  
class ImportantLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImportantLink
        fields = '__all__'  
class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = [
            'id',
            'name',
            'code',
            'full_marks',
            'pass_marks',
            'is_active',
        ]


class ResultDetailSerializer(serializers.ModelSerializer):
    """Serializer for individual subject results."""
    subject_name = serializers.CharField(source='subject.name', read_only=True)
    subject_code = serializers.CharField(source='subject.code', read_only=True)
    full_marks = serializers.IntegerField(source='subject.full_marks', read_only=True)

    class Meta:
        model = ResultDetail
        fields = [
            'id',
            'subject',
            'subject_name',
            'subject_code',
            'marks',
            'full_marks',
            'gpa',
            'grade',
        ]
        read_only_fields = [
            'gpa',
            'grade',
            'subject_name',
            'subject_code',
            'full_marks',
        ]


class ResultSummarySerializer(serializers.ModelSerializer):
    """Serializer for result summary."""
    student_name = serializers.CharField(source='student.name', read_only=True)
    student_roll_number = serializers.CharField(source='student.roll_number', read_only=True)

    class Meta:
        model = Result
        fields = [
            'id',
            'student_name',
            'student_roll_number',
            'roll_number',
            'class_name',
            'passing_year',
            'total_subjects',
            'total_marks',
            'average_gpa',
            'final_grade',
            'result_status',
            'published_at',
        ]
        read_only_fields = [
            'total_subjects',
            'total_marks',
            'average_gpa',
            'final_grade',
            'result_status',
            'published_at',
        ]


class ResultDetailedSerializer(serializers.ModelSerializer):
    """
    Comprehensive serializer for Result with all details.
    Used for search endpoint.
    """
    student_name = serializers.CharField(source='student.name', read_only=True)
    student_roll_number = serializers.CharField(source='student.roll_number', read_only=True)
    detail_scores = ResultDetailSerializer(many=True, read_only=True)

    class Meta:
        model = Result
        fields = [
            'id',
            'student',
            'student_name',
            'student_roll_number',
            'roll_number',
            'class_name',
            'passing_year',
            'total_subjects',
            'total_marks',
            'average_gpa',
            'final_grade',
            'result_status',
            'detail_scores',
            'published_at',
        ]
        read_only_fields = [
            'total_subjects',
            'total_marks',
            'average_gpa',
            'final_grade',
            'result_status',
            'published_at',
        ]


class ResultSearchSerializer(serializers.Serializer):
    """Serializer for search query validation."""
    roll_number = serializers.CharField(required=True, trim_whitespace=True)
    class_name = serializers.CharField(required=True, trim_whitespace=True)
    passing_year = serializers.IntegerField(required=True)

    def validate(self, attrs):
        if not attrs['roll_number'].strip() or not attrs['class_name'].strip():
            raise serializers.ValidationError(
                'Roll number and class are required.'
            )
        if attrs['passing_year'] < 2000 or attrs['passing_year'] > 2100:
            raise serializers.ValidationError(
                'Passing year must be between 2000 and 2100.'
            )
        return attrs

class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = '__all__'

class AttendanceRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = AttendanceRecord
        fields = '__all__'

class ExamScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamSchedule
        fields = '__all__'

class RoutineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Routine
        fields = '__all__'
from django.db.models import Q
from django.core.exceptions import ValidationError
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
from .serializers import (
    AdministrationSerializer,
    NoticeSerializer,
    Teacherserializer,
    GalleryImageSerializer,
    ImportantLinkSerializer,
    ContactMessageSerializer,
    StudentSerializer,
    SubjectSerializer,
    ResultSummarySerializer,
    ResultDetailedSerializer,
    ResultDetailSerializer,
    ResultSearchSerializer,
    CertificateSerializer,
    AttendanceRecordSerializer,
    ExamScheduleSerializer,
    RoutineSerializer,
)
from .services import ResultDetailService
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

class NoticeViewSet(generics.ListCreateAPIView):
    queryset = Notice.objects.all()
    serializer_class = NoticeSerializer

class NoticeDetailViewSet(generics.RetrieveUpdateDestroyAPIView):
    queryset = Notice.objects.all()
    serializer_class = NoticeSerializer
class TeacherViewSet(generics.ListCreateAPIView):
    queryset = Teacher.objects.all()
    serializer_class = Teacherserializer 
class TeacherDetailViewSet(generics.RetrieveUpdateDestroyAPIView):
    queryset = Teacher.objects.all()
    serializer_class = Teacherserializer
class AdministrationViewSet(generics.ListCreateAPIView):
    queryset = Administration.objects.all()
    serializer_class = AdministrationSerializer 
class AdministrationDetailViewSet(generics.RetrieveUpdateDestroyAPIView):
    queryset = Administration.objects.all()
    serializer_class = AdministrationSerializer      
class GalleryImageViewSet(generics.ListCreateAPIView):
    queryset = GalleryImage.objects.all()
    serializer_class = GalleryImageSerializer
class GalleryImageDetailViewSet(generics.RetrieveUpdateDestroyAPIView):
    queryset = GalleryImage.objects.all()
    serializer_class = GalleryImageSerializer
class ImportantLinkViewSet(generics.ListCreateAPIView):
    queryset = ImportantLink.objects.all()
    serializer_class = ImportantLinkSerializer
class ImportantLinkDetailViewSet(generics.RetrieveUpdateDestroyAPIView):
    queryset = ImportantLink.objects.all()
    serializer_class = ImportantLinkSerializer
class ContactMessageViewSet(generics.ListCreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer 


class StudentViewSet(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer


class StudentDetailViewSet(generics.RetrieveUpdateDestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer


class SubjectViewSet(generics.ListCreateAPIView):
    queryset = Subject.objects.filter(is_active=True).all()
    serializer_class = SubjectSerializer


class SubjectDetailViewSet(generics.RetrieveUpdateDestroyAPIView):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer


class ResultDetailViewSet(generics.ListCreateAPIView):
    queryset = Result.objects.select_related('student').prefetch_related('detail_scores').all()
    serializer_class = ResultSummarySerializer


class ResultDetailDetailViewSet(generics.RetrieveUpdateDestroyAPIView):
    queryset = Result.objects.select_related('student').prefetch_related('detail_scores').all()
    serializer_class = ResultDetailedSerializer


class ResultScoreViewSet(generics.ListCreateAPIView):
    """ViewSet for creating/listing individual subject scores."""
    queryset = ResultDetail.objects.select_related('subject', 'result').all()
    serializer_class = ResultDetailSerializer

    def create(self, request, *args, **kwargs):
        """
        Create a new result detail (subject score).
        Teacher only needs to provide:
        - roll_number
        - class_name
        - passing_year
        - subject_id
        - marks

        Everything else is auto-calculated.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            roll_number = serializer.validated_data['roll_number']
            class_name = serializer.validated_data['class_name']
            passing_year = serializer.validated_data['passing_year']
            subject_id = serializer.validated_data['subject'].id
            marks = serializer.validated_data['marks']

            # Use service to create result detail with automatic calculations
            result_detail = ResultDetailService.create_or_update_result_detail(
                roll_number=roll_number,
                class_name=class_name,
                passing_year=passing_year,
                subject_id=subject_id,
                marks=marks,
            )

            output_serializer = ResultDetailSerializer(result_detail)
            return Response(
                output_serializer.data,
                status=status.HTTP_201_CREATED
            )
        except ValidationError as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )


class ResultScoreDetailViewSet(generics.RetrieveUpdateDestroyAPIView):
    """ViewSet for updating/deleting individual subject scores."""
    queryset = ResultDetail.objects.select_related('subject', 'result').all()
    serializer_class = ResultDetailSerializer

    def perform_destroy(self, instance):
        """Delete result detail and trigger recalculation."""
        ResultDetailService.delete_result_detail(instance)


class ResultSearchView(APIView):
    """Search endpoint for results."""
    def get(self, request, *args, **kwargs):
        """
        Search for result by:
        - roll_number
        - class_name
        - passing_year

        Returns:
        {
            "student": { name, roll_number },
            "summary": { total_subjects, total_marks, average_gpa, final_grade, result_status },
            "subjects": [
                { subject, marks, gpa, grade }
            ]
        }
        """
        serializer = ResultSearchSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)

        roll_number = serializer.validated_data['roll_number'].strip()
        class_name = serializer.validated_data['class_name'].strip()
        passing_year = serializer.validated_data['passing_year']

        try:
            result = Result.objects.select_related(
                'student'
            ).prefetch_related(
                'detail_scores__subject'
            ).get(
                roll_number=roll_number,
                class_name=class_name,
                passing_year=passing_year,
            )

            # Serialize the result with all details
            result_serializer = ResultDetailedSerializer(result)
            return Response(result_serializer.data, status=status.HTTP_200_OK)

        except Result.DoesNotExist:
            return Response(
                {
                    'detail': f'No result found for roll number {roll_number}, '
                              f'class {class_name}, year {passing_year}.'
                },
                status=status.HTTP_404_NOT_FOUND,
            )


class CertificateViewSet(generics.ListCreateAPIView):
    queryset = Certificate.objects.all()
    serializer_class = CertificateSerializer


class CertificateDetailViewSet(generics.RetrieveUpdateDestroyAPIView):
    queryset = Certificate.objects.all()
    serializer_class = CertificateSerializer


class CertificateVerifyView(APIView):
    def get(self, request, certificate_number):
        try:
            certificate = Certificate.objects.get(certificate_number=certificate_number)
        except Certificate.DoesNotExist:
            return Response({"detail": "Certificate not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = CertificateSerializer(certificate)
        return Response(serializer.data)


class AttendanceRecordViewSet(generics.ListCreateAPIView):
    queryset = AttendanceRecord.objects.all()
    serializer_class = AttendanceRecordSerializer


class AttendanceRecordDetailViewSet(generics.RetrieveUpdateDestroyAPIView):
    queryset = AttendanceRecord.objects.all()
    serializer_class = AttendanceRecordSerializer


class ExamScheduleViewSet(generics.ListCreateAPIView):
    queryset = ExamSchedule.objects.all()
    serializer_class = ExamScheduleSerializer


class ExamScheduleDetailViewSet(generics.RetrieveUpdateDestroyAPIView):
    queryset = ExamSchedule.objects.all()
    serializer_class = ExamScheduleSerializer


class RoutineViewSet(generics.ListCreateAPIView):
    queryset = Routine.objects.all()
    serializer_class = RoutineSerializer


class RoutineDetailViewSet(generics.RetrieveUpdateDestroyAPIView):
    queryset = Routine.objects.all()
    serializer_class = RoutineSerializer

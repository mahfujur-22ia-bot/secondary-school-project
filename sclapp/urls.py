from django.urls import path
from .views import (
    AdministrationViewSet,
    NoticeViewSet,
    TeacherViewSet,
    GalleryImageViewSet,
    ImportantLinkViewSet,
    AdministrationDetailViewSet,
    NoticeDetailViewSet,
    TeacherDetailViewSet,
    GalleryImageDetailViewSet,
    ImportantLinkDetailViewSet,
    ContactMessageViewSet,
    StudentViewSet,
    StudentDetailViewSet,
    SubjectViewSet,
    SubjectDetailViewSet,
    ResultDetailViewSet,
    ResultDetailDetailViewSet,
    ResultScoreViewSet,
    ResultScoreDetailViewSet,
    ResultSearchView,
    CertificateViewSet,
    CertificateDetailViewSet,
    CertificateVerifyView,
    AttendanceRecordViewSet,
    AttendanceRecordDetailViewSet,
    ExamScheduleViewSet,
    ExamScheduleDetailViewSet,
    RoutineViewSet,
    RoutineDetailViewSet,
)

urlpatterns = [
    path('notices/', NoticeViewSet.as_view(), name='notice-list'),
    path('notices/<int:pk>/', NoticeDetailViewSet.as_view(), name='notice-detail'),
    path('teachers/', TeacherViewSet.as_view(), name='teacher-list'),
    path('teachers/<int:pk>/', TeacherDetailViewSet.as_view(), name='teacher-detail'),  
    path('gallery/', GalleryImageViewSet.as_view(), name='gallery-list'),
    path('gallery/<int:pk>/', GalleryImageDetailViewSet.as_view(), name='gallery-detail'),
    path('important-links/', ImportantLinkViewSet.as_view(), name='important-link-list'),
    path('important-links/<int:pk>/', ImportantLinkDetailViewSet.as_view(), name='important-link-detail'),

    path('contact-messages/', ContactMessageViewSet.as_view(), name='contact-message-list'),
    path('administrations/', AdministrationViewSet.as_view(), name='administration-list'),
    path('administrations/<int:pk>/', AdministrationDetailViewSet.as_view(), name='administration-detail'),
    
    # Student Management
    path('students/', StudentViewSet.as_view(), name='student-list'),
    path('students/<int:pk>/', StudentDetailViewSet.as_view(), name='student-detail'),
    
    # Subject Management
    path('subjects/', SubjectViewSet.as_view(), name='subject-list'),
    path('subjects/<int:pk>/', SubjectDetailViewSet.as_view(), name='subject-detail'),
    
    # Result Management
    path('results/', ResultDetailViewSet.as_view(), name='result-list'),
    path('results/<int:pk>/', ResultDetailDetailViewSet.as_view(), name='result-detail'),
    path('results/search/', ResultSearchView.as_view(), name='result-search'),
    
    # Result Details (Individual Subject Scores)
    path('result-scores/', ResultScoreViewSet.as_view(), name='result-score-list'),
    path('result-scores/<int:pk>/', ResultScoreDetailViewSet.as_view(), name='result-score-detail'),
    
    # Certificates
    path('certificates/', CertificateViewSet.as_view(), name='certificate-list'),
    path('certificates/<int:pk>/', CertificateDetailViewSet.as_view(), name='certificate-detail'),
    path('certificates/verify/<str:certificate_number>/', CertificateVerifyView.as_view(), name='certificate-verify'),
    
    # Attendance
    path('attendance/', AttendanceRecordViewSet.as_view(), name='attendance-list'),
    path('attendance/<int:pk>/', AttendanceRecordDetailViewSet.as_view(), name='attendance-detail'),
    
    # Exam Schedules
    path('exam-schedules/', ExamScheduleViewSet.as_view(), name='exam-schedule-list'),
    path('exam-schedules/<int:pk>/', ExamScheduleDetailViewSet.as_view(), name='exam-schedule-detail'),
    
    # Routines
    path('routines/', RoutineViewSet.as_view(), name='routine-list'),
    path('routines/<int:pk>/', RoutineDetailViewSet.as_view(), name='routine-detail'),
]
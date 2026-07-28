from django.contrib import admin
from django.core.exceptions import ValidationError
from .models import (
    Notice,
    Teacher,
    Administration,
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
from .services import ResultDetailService
from decimal import Decimal

admin.site.site_header = "School Management Admin"
admin.site.site_title = "School Admin"
admin.site.index_title = "Welcome to Dashboard"


@admin.register(Notice)
class NoticeAdmin(admin.ModelAdmin):
    list_display = ("title", "created_at")
    search_fields = ("title",)
    list_filter = ("created_at",)
    ordering = ("-created_at",)
    date_hierarchy = "created_at"


@admin.register(Teacher)
class TeacherAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "designation",
        "department",
        "mobile",
        "order",
    )
    search_fields = (
        "name",
        "designation",
        "department",
    )
    list_filter = ("department",)
    ordering = ("order",)
    list_editable = ("order",)
    list_per_page = 20


@admin.register(Administration)
class AdministrationAdmin(admin.ModelAdmin):
    list_display = ("name", "designation")


@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    list_display = ("caption", "uploaded_at")
    search_fields = ("caption",)
    ordering = ("-uploaded_at",)


@admin.register(ImportantLink)
class ImportantLinkAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "is_active",
        "order",
    )
    list_filter = ("is_active",)
    list_editable = (
        "is_active",
        "order",
    )
    search_fields = ("title",)
    ordering = ("order",)


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "contact_info",
        "received_at",
    )
    search_fields = (
        "name",
        "contact_info",
    )
    ordering = ("-received_at",)
    readonly_fields = (
        "name",
        "contact_info",
        "message",
        "received_at",
    )


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ("name", "roll_number", "section")
    search_fields = ("name", "roll_number", )
    list_filter = ("section","roll_number")


@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display = ("name", "code", "full_marks", "pass_marks", "is_active")
    search_fields = ("name", "code")
    list_filter = ("is_active", "created_at")
    list_editable = ("is_active",)
    ordering = ("name",)
    fieldsets = (
        ("Subject Information", {
            'fields': ('name', 'code')
        }),
        ("Marking System", {
            'fields': ('full_marks', 'pass_marks')
        }),
        ("Status", {
            'fields': ('is_active',)
        }),
        ("Timestamps", {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    readonly_fields = ("created_at", "updated_at")


@admin.register(Result)
class ResultAdmin(admin.ModelAdmin):
    list_display = (
        "roll_number",
        "class_name",
        "passing_year",
        "total_subjects",
        "total_marks",
        "average_gpa",
        "final_grade",
        "result_status",
    )
    search_fields = ("roll_number", "student__name")
    list_filter = ("class_name", "passing_year", "result_status", "final_grade")
    ordering = ("-passing_year", "roll_number")
    
    fieldsets = (
        ("Student Information", {
            'fields': ('student', 'roll_number', 'class_name', 'passing_year')
        }),
        ("Summary (Auto-calculated - Read-only)", {
            'fields': (
                'total_subjects',
                'total_marks',
                'average_gpa',
                'final_grade',
                'result_status',
            ),
            'classes': ('collapse',)
        }),
        ("Timestamps", {
            'fields': ('published_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    # Make all fields read-only (Summary is auto-calculated via signals)
    readonly_fields = (
        "student",
        "roll_number",
        "class_name",
        "passing_year",
        "total_subjects",
        "total_marks",
        "average_gpa",
        "final_grade",
        "result_status",
        "published_at",
        "updated_at",
    )
    
    def has_add_permission(self, request):
        """Prevent manual Result creation - created automatically."""
        return False
    
    def has_delete_permission(self, request, obj=None):
        """Prevent manual Result deletion - deleted automatically."""
        return False


@admin.register(ResultDetail)
class ResultDetailAdmin(admin.ModelAdmin):
    list_display = (
        "roll_number",
        "class_name",
        "subject",
        "marks",
        "gpa",
        "grade",
    )
    search_fields = ("roll_number", "subject__name")
    list_filter = ("class_name", "passing_year", "grade", "created_at")
    ordering = ("-passing_year", "roll_number", "subject")
    
    fieldsets = (
        ("Input Fields (Teacher enters these)", {
            'fields': ('roll_number', 'class_name', 'passing_year', 'subject', 'marks')
        }),
        ("Auto-calculated Fields (Read-only)", {
            'fields': ('gpa', 'grade'),
            'classes': ('collapse',)
        }),
        ("Metadata", {
            'fields': ('result', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    # Read-only fields (auto-calculated by signals)
    readonly_fields = (
        "result",
        "gpa",
        "grade",
        "created_at",
        "updated_at",
    )
    
    def save_model(self, request, obj, form, change):
        """
        Override save to use service layer for automatic Result creation and calculations.
        
        This ensures:
        1. Result summary is created automatically if it doesn't exist
        2. ResultDetail is properly linked to Result
        3. All calculations (GPA, Grade, etc.) are auto-generated by signals
        """
        try:
            # Use service layer to create/update ResultDetail
            # This will also create/update the Result summary automatically
            result_detail = ResultDetailService.create_or_update_result_detail(
                roll_number=obj.roll_number,
                class_name=obj.class_name,
                passing_year=obj.passing_year,
                subject_id=obj.subject.id,
                marks=Decimal(str(obj.marks)),
            )
            # Refresh the object to show calculated fields in form
            obj.pk = result_detail.pk
            obj.result = result_detail.result
            obj.gpa = result_detail.gpa
            obj.grade = result_detail.grade
        except ValidationError as e:
            # Display validation error to admin user
            self.message_user(request, f"Error: {str(e)}", level='ERROR')

    def delete_model(self, request, obj):
        """
        Override delete to use service layer for proper cleanup.
        
        This ensures:
        1. Result summary is recalculated after deletion
        2. If no subjects remain, Result is deleted
        """
        try:
            ResultDetailService.delete_result_detail(obj)
            self.message_user(request, "Result detail deleted successfully.", level='SUCCESS')
        except Exception as e:
            self.message_user(request, f"Error deleting result detail: {str(e)}", level='ERROR')


@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    list_display = ("certificate_number", "student_name", "course_name", "issue_date", "status")
    search_fields = ("certificate_number", "student_name")


@admin.register(AttendanceRecord)
class AttendanceRecordAdmin(admin.ModelAdmin):
    list_display = ("student_name", "class_name", "attendance_date", "status")
    search_fields = ("student_name", "class_name")
    list_filter = ("status", "attendance_date")


@admin.register(ExamSchedule)
class ExamScheduleAdmin(admin.ModelAdmin):
    list_display = ("title", "class_name", "exam_date")
    search_fields = ("title", "class_name")
    list_filter = ("exam_date",)


@admin.register(Routine)
class RoutineAdmin(admin.ModelAdmin):
    list_display = ("class_name", "day", "time_slot", "subject", "teacher_name")
    search_fields = ("class_name", "subject", "teacher_name")
    list_filter = ("day", "class_name")

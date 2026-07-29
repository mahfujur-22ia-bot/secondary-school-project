"""
Django signals for automatic Result recalculation.
Triggers whenever ResultDetail is created, updated, or deleted.
"""
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver

from .models import ResultDetail
from .services import ResultDetailService


@receiver(post_save, sender=ResultDetail)
def recalculate_result_on_detail_save(sender, instance, created, **kwargs):
    """
    Recalculate Result summary whenever ResultDetail is saved.
    
    This signal ensures that:
    - When ResultDetail is created, Result summary is automatically generated
    - When ResultDetail is updated, Result summary is automatically recalculated
    
    Args:
        sender: Model class (ResultDetail)
        instance: ResultDetail instance being saved
        created: Boolean indicating if instance was created
        **kwargs: Additional signal arguments
    """
    if instance.result:
        ResultDetailService.recalculate_result_summary(instance.result)


@receiver(post_delete, sender=ResultDetail)
def recalculate_result_on_detail_delete(sender, instance, **kwargs):
    """
    Recalculate Result summary whenever ResultDetail is deleted.
    If no details remain, delete the Result.
    
    This signal ensures that:
    - When ResultDetail is deleted, Result summary is automatically recalculated
    - If all subjects are deleted, the Result record is also deleted
    
    Args:
        sender: Model class (ResultDetail)
        instance: ResultDetail instance being deleted
        **kwargs: Additional signal arguments
    """
    result = instance.result
    
    # Check if any details remain
    if not result.detail_scores.exists():
        # No subjects remain, delete Result
        result.delete()
    else:
        # Recalculate Result summary
        ResultDetailService.recalculate_result_summary(result)

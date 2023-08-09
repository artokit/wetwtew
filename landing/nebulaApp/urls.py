from django.urls import path
from .views import Index, WorksView, get_blog_by_number

urlpatterns = [
    path('', Index.as_view()),
    path('works/', WorksView.as_view()),
    path('get_post/<int:page_number>/', get_blog_by_number)
]

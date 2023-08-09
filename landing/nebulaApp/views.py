from django.http import JsonResponse
from django.views.generic import TemplateView, ListView
from .models import WorkPost, BlogPost
from django.core.paginator import Paginator


class Index(TemplateView):
    template_name = 'nebulaApp/index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['works'] = WorkPost.objects.all()[:4]
        context['posts'] = BlogPost.objects.all()[:4]
        return context


class WorksView(ListView):
    template_name = 'nebulaApp/works.html'
    model = WorkPost
    context_object_name = 'works'


def get_blog_by_number(request, page_number):
    paginator = Paginator(BlogPost.objects.all(), 1)
    page_obj = paginator.get_page(page_number)
    obj = page_obj.object_list[0]

    res = {
        'has_next': page_obj.has_next(),
        'has_prev': page_obj.has_previous(),
        'heading1': obj.heading1,
        'heading2': obj.heading2,
        'content': obj.content,
        'image': obj.image.image.url
    }
    return JsonResponse(res)

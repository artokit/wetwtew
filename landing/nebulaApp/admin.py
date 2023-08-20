from django.contrib import admin
from .models import WorkPost, WorkPhoto, BlogPost


class PostAdmin(admin.ModelAdmin):
    readonly_fields = ('thumbnail_preview',)

    def thumbnail_preview(self, obj):
        return obj.thumbnail_preview

    thumbnail_preview.short_description = 'Превью изображений'
    thumbnail_preview.allow_tags = True

    class Media:
        css = {
            'all': ('/static/css/override.css', )
        }


# class ProductImageInline(admin.TabularInline):
#     model = WorkPost
    # readonly_fields = ('id', 'image_tag',)
    # extra = 1


# class ProductVariantInline(admin.TabularInline):
#     model = WorkPost
    # readonly_fields = ('id',)
    # extra = 1


# @admin.register(WorkPhoto)
# class ProductAdmin(admin.ModelAdmin):
#     inlines = [ProductImageInline]


admin.site.register(WorkPost, PostAdmin)
# admin.site.register(WorkPost, PostAdmin)
admin.site.register(WorkPhoto, PostAdmin)
admin.site.register(BlogPost, PostAdmin)

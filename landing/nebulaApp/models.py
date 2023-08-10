from django.db import models
from django.utils.safestring import mark_safe


def get_thumbnail_preview(images):
    s = '<div style="min-width: 300px">'
    for image in images:
        if isinstance(image, WorkPhoto):
            url = image.image.url
        else:
            url = image.url

        s += '<img src="{}" style="display: block; min-width: 300px; margin: 30px auto; width: 50%; max-width: 700px">'.format(url)
    return mark_safe(s + '</div>')


class WorkPhoto(models.Model):
    image = models.ImageField(verbose_name='Изображение')

    def __str__(self):
        return str(self.image)

    class Meta:
        verbose_name = 'Изображение'
        verbose_name_plural = 'Изображения'

    @property
    def thumbnail_preview(self):
        return get_thumbnail_preview([self.image, ])


class WorkPost(models.Model):
    task = models.TextField(verbose_name='Задачи проекта')
    other_text = models.TextField(verbose_name='Прочее')
    hashtages = models.CharField(max_length=150, verbose_name='Хэштеги')
    images = models.ManyToManyField(WorkPhoto)

    def __str__(self):
        return self.hashtages

    class Meta:
        verbose_name = 'Работа'
        verbose_name_plural = 'Работы'

    @property
    def thumbnail_preview(self):
        return get_thumbnail_preview(self.images.all())


class BlogPost(models.Model):
    heading1 = models.CharField(max_length=150, verbose_name='Заголовок')
    heading2 = models.CharField(max_length=150, verbose_name='Подзаголовок')
    content = models.TextField(verbose_name='Контент')
    image = models.ForeignKey(WorkPhoto, on_delete=models.CASCADE, verbose_name='Изображение')

    def __str__(self):
        return self.heading1

    class Meta:
        verbose_name = 'Запись'
        verbose_name_plural = 'Записи'

    @property
    def thumbnail_preview(self):
        return get_thumbnail_preview([self.image, ])

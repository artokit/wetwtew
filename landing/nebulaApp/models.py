from django.db import models


class WorkPhoto(models.Model):
    image = models.ImageField()

    def __str__(self):
        return str(self.image)

    class Meta:
        verbose_name = 'Изображение'
        verbose_name_plural = 'Изображения'


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

from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Choice, Question
# ...


# admin.site.register(Question)

# class ChoiceInline(admin.StackedInline)
class ChoiceInline(admin.TabularInline):
    model = Choice
    extra = 3


class QuestionAdmin(admin.ModelAdmin):
    # 知识改变顺序
    # fields = ['pub_date', 'question_text']

    # 分组形成字段集
    fieldsets = [
        (None,               {'fields': ['question_text']}),
        # ('Date information', {'fields': ['pub_date']}),
        ('Date information', {'fields': [
         'pub_date'], 'classes': ['collapse']}),
    ]
    inlines = [ChoiceInline]

    # 生命显示的列
    # list_display = ('question_text', 'pub_date')
    list_display = ('question_text', 'pub_date', 'was_published_recently')
    list_filter = ['pub_date']
    search_fields = ['question_text']


# admin.site.register(Choice)
admin.site.register(Question, QuestionAdmin)

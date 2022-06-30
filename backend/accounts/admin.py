from django.contrib import admin
from .models import User

# 어드민 페이지에 accounts.models 의 모델을 노출 목적
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    # 사용자 리스트에서 이메일을 노출하여... 중복 여부를 살펴 보기 위햐여.....
    list_display = ['username', 'email', 'website_url', 'is_active', 'is_staff', 'is_superuser']
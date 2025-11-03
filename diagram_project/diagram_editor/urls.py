from django.urls import path
from . import views, api

urlpatterns = [
    path('', views.index, name='index'),
    path('api/save/', api.save_diagram, name='save_diagram'),
    path('api/load/<uuid:diagram_id>/', api.load_diagram, name='load_diagram'),
]

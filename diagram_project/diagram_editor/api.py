import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Diagram

def save_diagram(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        diagram, created = Diagram.objects.update_or_create(
            id=data.get('id'),
            defaults={'name': data.get('name'), 'data': data.get('data')}
        )
        return JsonResponse({'status': 'ok', 'id': diagram.id})
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'})

def load_diagram(request, diagram_id):
    try:
        diagram = Diagram.objects.get(id=diagram_id)
        return JsonResponse({'id': diagram.id, 'name': diagram.name, 'data': diagram.data})
    except Diagram.DoesNotExist:
        return JsonResponse({'status': 'error', 'message': 'Diagram not found'}, status=404)

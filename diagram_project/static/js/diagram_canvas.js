document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('diagram-canvas');
    const ctx = canvas.getContext('2d');

    const selectTool = document.getElementById('select-tool');
    const panTool = document.getElementById('pan-tool');
    const shapeTool = document.getElementById('shape-tool');

    const diagramNameInput = document.getElementById('diagram-name');
    const saveButton = document.getElementById('save-button');
    const loadButton = document.getElementById('load-button');
    const downloadButton = document.getElementById('download-button');

    let canvasElements = [];
    let selectedTool = 'select';
    let isDrawing = false;
    let isPanning = false;
    let panOffset = { x: 0, y: 0 };
    let dragStart = { x: 0, y: 0 };
    let zoomLevel = 1;
    let selectedElement = null;

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.scale(zoomLevel, zoomLevel);
        ctx.translate(panOffset.x, panOffset.y);

        canvasElements.forEach(element => {
            drawShape(element);
        });

        ctx.restore();
    }

    function drawShape(element) {
        ctx.fillStyle = element.style.fill;
        ctx.strokeStyle = element.style.stroke;
        ctx.lineWidth = element.style.strokeWidth;

        if (element === selectedElement) {
            ctx.strokeStyle = '#FF0000';
            ctx.lineWidth = 4;
        }

        switch (element.type) {
            case 'rectangle':
                ctx.fillRect(element.x, element.y, element.width, element.height);
                ctx.strokeRect(element.x, element.y, element.width, element.height);
                break;
            case 'circle':
                ctx.beginPath();
                ctx.arc(element.x + element.width / 2, element.y + element.height / 2, element.width / 2, 0, 2 * Math.PI);
                ctx.fill();
                ctx.stroke();
                break;
        }
    }

    canvas.addEventListener('mousedown', (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) / zoomLevel - panOffset.x;
        const y = (e.clientY - rect.top) / zoomLevel - panOffset.y;

        if (selectedTool === 'pan') {
            isPanning = true;
            dragStart = { x: e.clientX - panOffset.x, y: e.clientY - panOffset.y };
        } else if (selectedTool === 'select') {
            selectedElement = canvasElements.find(el =>
                x >= el.x && x <= el.x + el.width &&
                y >= el.y && y <= el.y + el.height
            );
            draw();
        } else if (selectedTool === 'shape') {
            const newElement = {
                id: Date.now(),
                type: 'rectangle',
                x: x,
                y: y,
                width: 100,
                height: 60,
                style: {
                    fill: '#3B82F6',
                    stroke: '#1E40AF',
                    strokeWidth: 2
                }
            };
            canvasElements.push(newElement);
            draw();
        }
    });

    canvas.addEventListener('mousemove', (e) => {
        if (isPanning) {
            panOffset = { x: e.clientX - dragStart.x, y: e.clientY - dragStart.y };
            draw();
        } else if (selectedTool === 'select' && selectedElement && e.buttons === 1) {
            const rect = canvas.getBoundingClientRect();
            const x = (e.clientX - rect.left) / zoomLevel - panOffset.x;
            const y = (e.clientY - rect.top) / zoomLevel - panOffset.y;
            selectedElement.x = x - selectedElement.width / 2;
            selectedElement.y = y - selectedElement.height / 2;
            draw();
        }
    });

    canvas.addEventListener('mouseup', () => {
        isPanning = false;
    });

    selectTool.addEventListener('click', () => {
        selectedTool = 'select';
    });

    panTool.addEventListener('click', () => {
        selectedTool = 'pan';
    });

    shapeTool.addEventListener('click', () => {
        selectedTool = 'shape';
    });

    saveButton.addEventListener('click', () => {
        const diagramName = diagramNameInput.value;
        const diagramData = {
            name: diagramName,
            data: canvasElements
        };

        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

        fetch('/api/save/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(diagramData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Diagram saved:', data);
            history.pushState(null, '', `/?id=${data.id}`);
        });
    });

    loadButton.addEventListener('click', () => {
        const urlParams = new URLSearchParams(window.location.search);
        const diagramId = urlParams.get('id');

        if (diagramId) {
            fetch(`/api/load/${diagramId}/`)
            .then(response => response.json())
            .then(data => {
                diagramNameInput.value = data.name;
                canvasElements = data.data;
                draw();
            });
        }
    });

    downloadButton.addEventListener('click', () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(canvasElements));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href",     dataStr);
        downloadAnchorNode.setAttribute("download", diagramNameInput.value + ".json");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    });

    draw();
});

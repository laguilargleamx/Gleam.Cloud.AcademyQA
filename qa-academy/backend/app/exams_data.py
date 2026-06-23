EXAMS = {
    "modulo1": {
        "id": "modulo1",
        "title": "Módulo 1 – Fundamentos y Git",
        "sections": [
            {
                "title": "Sección 1 – Conceptos Fundamentales",
                "points_each": 4,
                "questions": [
                    {
                        "id": 1,
                        "text": "¿Qué es un programa?",
                        "options": [
                            {"key": "A", "text": "Un solo archivo con instrucciones"},
                            {"key": "B", "text": "Una serie de archivos compuestos por algoritmos"},
                            {"key": "C", "text": "Una aplicación instalada en tu computadora"},
                            {"key": "D", "text": "Un lenguaje de programación"},
                        ],
                        "answer": "B",
                        "points": 4,
                    },
                    {
                        "id": 2,
                        "text": "¿Qué es un algoritmo?",
                        "options": [
                            {"key": "A", "text": "Un error en el código"},
                            {"key": "B", "text": "Una aplicación web"},
                            {"key": "C", "text": "Una serie de pasos ordenados para resolver un problema"},
                            {"key": "D", "text": "Un archivo de configuración"},
                        ],
                        "answer": "C",
                        "points": 4,
                    },
                    {
                        "id": 3,
                        "text": "¿Cuál de los siguientes es un ejemplo de REQUERIMIENTO?",
                        "options": [
                            {"key": "A", "text": "Mezclar los ingredientes durante 5 minutos"},
                            {"key": "B", "text": "El usuario debe poder iniciar sesión con su correo y contraseña"},
                            {"key": "C", "text": "Mostrar un mensaje de error en pantalla"},
                            {"key": "D", "text": "Conectarse a la base de datos"},
                        ],
                        "answer": "B",
                        "points": 4,
                    },
                    {
                        "id": 4,
                        "text": "¿Cuál de los siguientes es un ejemplo de FUNCIÓN?",
                        "options": [
                            {"key": "A", "text": "El sistema debe permitir registrar usuarios"},
                            {"key": "B", "text": "La app debe funcionar en iOS y Android"},
                            {"key": "C", "text": "Validar que el campo de correo tenga formato correcto"},
                            {"key": "D", "text": "El cliente necesita un módulo de pagos"},
                        ],
                        "answer": "C",
                        "points": 4,
                    },
                    {
                        "id": 5,
                        "text": "En el ejemplo de la receta, ¿a qué equivale la lista de ingredientes?",
                        "options": [
                            {"key": "A", "text": "A las funciones"},
                            {"key": "B", "text": "A los requerimientos"},
                            {"key": "C", "text": "Al algoritmo completo"},
                            {"key": "D", "text": "Al programa"},
                        ],
                        "answer": "B",
                        "points": 4,
                    },
                ],
            },
            {
                "title": "Sección 2 – Comandos Git",
                "points_each": 5,
                "questions": [
                    {
                        "id": 6,
                        "text": "¿Para qué sirve `git init`?",
                        "options": [
                            {"key": "A", "text": "Descargar un repositorio remoto"},
                            {"key": "B", "text": "Inicializar un repositorio Git nuevo en tu carpeta local"},
                            {"key": "C", "text": "Subir cambios al servidor"},
                            {"key": "D", "text": "Ver el estado de los archivos"},
                        ],
                        "answer": "B",
                        "points": 5,
                    },
                    {
                        "id": 7,
                        "text": "Tienes un repositorio en GitHub y quieres tenerlo en tu computadora por PRIMERA VEZ. ¿Qué comando usas?",
                        "options": [
                            {"key": "A", "text": "git pull"},
                            {"key": "B", "text": "git init"},
                            {"key": "C", "text": "git clone"},
                            {"key": "D", "text": "git fetch"},
                        ],
                        "answer": "C",
                        "points": 5,
                    },
                    {
                        "id": 8,
                        "text": "Ya tienes el repositorio clonado y un compañero subió cambios nuevos. ¿Qué comando usas para traer esos cambios?",
                        "options": [
                            {"key": "A", "text": "git clone"},
                            {"key": "B", "text": "git pull"},
                            {"key": "C", "text": "git push"},
                            {"key": "D", "text": "git commit"},
                        ],
                        "answer": "B",
                        "points": 5,
                    },
                    {
                        "id": 9,
                        "text": "¿Para qué sirve `git add`?",
                        "options": [
                            {"key": "A", "text": "Para subir cambios a GitHub"},
                            {"key": "B", "text": "Para crear un repositorio nuevo"},
                            {"key": "C", "text": "Para preparar (stagear) los archivos que quieres incluir en el commit"},
                            {"key": "D", "text": "Para ver qué archivos cambiaron"},
                        ],
                        "answer": "C",
                        "points": 5,
                    },
                    {
                        "id": 10,
                        "text": "¿Para qué sirve `git commit`?",
                        "options": [
                            {"key": "A", "text": "Para subir los cambios a GitHub"},
                            {"key": "B", "text": "Para guardar una fotografía de los cambios con un mensaje descriptivo"},
                            {"key": "C", "text": "Para descargar cambios del repositorio remoto"},
                            {"key": "D", "text": "Para conectar tu repo local con GitHub"},
                        ],
                        "answer": "B",
                        "points": 5,
                    },
                    {
                        "id": 11,
                        "text": "¿Para qué sirve `git push`?",
                        "options": [
                            {"key": "A", "text": "Para guardar cambios localmente"},
                            {"key": "B", "text": "Para clonar un repositorio"},
                            {"key": "C", "text": "Para subir tus commits al repositorio remoto (GitHub)"},
                            {"key": "D", "text": "Para ver el historial de cambios"},
                        ],
                        "answer": "C",
                        "points": 5,
                    },
                ],
            },
            {
                "title": "Sección 3 – Escenarios Prácticos",
                "points_each": 5,
                "questions": [
                    {
                        "id": 12,
                        "text": "Modificaste un archivo en tu proyecto y quieres subir ese cambio a GitHub. ¿Cuál es el orden correcto?",
                        "options": [
                            {"key": "A", "text": "git push → git commit → git add"},
                            {"key": "B", "text": "git commit → git add → git push"},
                            {"key": "C", "text": "git add → git commit → git push"},
                            {"key": "D", "text": "git pull → git add → git push"},
                        ],
                        "answer": "C",
                        "points": 5,
                    },
                    {
                        "id": 13,
                        "text": "Antes de empezar a trabajar cada día, ¿qué comando deberías ejecutar para tener la versión más reciente del código?",
                        "options": [
                            {"key": "A", "text": "git push"},
                            {"key": "B", "text": "git clone"},
                            {"key": "C", "text": "git pull"},
                            {"key": "D", "text": "git init"},
                        ],
                        "answer": "C",
                        "points": 5,
                    },
                    {
                        "id": 14,
                        "text": "¿Cuándo usarías `git clone` en lugar de `git pull`?",
                        "options": [
                            {"key": "A", "text": "Cuando quiero subir mis cambios"},
                            {"key": "B", "text": "Cuando ya tengo el repositorio en mi computadora"},
                            {"key": "C", "text": "Cuando es la primera vez que descargo el repositorio"},
                            {"key": "D", "text": "Cuando quiero guardar mis cambios localmente"},
                        ],
                        "answer": "C",
                        "points": 5,
                    },
                    {
                        "id": 15,
                        "text": "Ejecutas `git status` y ves archivos en rojo. ¿Qué significa eso?",
                        "options": [
                            {"key": "A", "text": "Que los archivos tienen errores de código"},
                            {"key": "B", "text": "Que los archivos fueron modificados pero aún no están preparados para el commit"},
                            {"key": "C", "text": "Que los archivos ya fueron subidos a GitHub"},
                            {"key": "D", "text": "Que el repositorio está corrupto"},
                        ],
                        "answer": "B",
                        "points": 5,
                    },
                ],
            },
        ],
        "total_points": 50,
    }
}

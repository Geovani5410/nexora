# Calidad de la interfaz — NEXORA

> **Aviso:** este documento describe cómo la página aplica criterios de normas ISO y qué comprobaciones se hicieron. **No es una certificación.** ISO 9001 certifica el sistema de gestión de una organización, no una página web; aquí se usa como referencia de mejora continua y de atención a la satisfacción del cliente.

## Normas de referencia y cómo se aplican

| Norma | Qué busca | Cómo se aplica en el sitio |
|---|---|---|
| **ISO 9241-11** (usabilidad) | Que las personas logren su objetivo con eficacia, eficiencia y satisfacción | Cinco páginas con el mismo menú y pestañas por sección: cualquier apartado se alcanza en 2 clics o menos. Sección «Tu opinión» para conocer la satisfacción. |
| **ISO 9241-110** (principios de interacción) | Interfaz clara, coherente y tolerante a errores de uso | Página actual marcada en el menú; mismo diseño en todas las páginas; zonas táctiles de 44 px o más; el menú se cierra con Esc o al tocar fuera; enlaces verificados. |
| **ISO 9241-210** (diseño centrado en las personas) | Diseñar con ciclos de prueba y mejora | Se compararon tres propuestas de diseño y se ajustó según la retroalimentación del equipo. |
| **ISO/IEC 25010** (calidad del software) | Eficiencia, compatibilidad, fiabilidad, usabilidad, accesibilidad | Animaciones ligeras y pausadas fuera de pantalla; diseño adaptable de 320 a 1920 px; 0 enlaces o imágenes rotos; ver accesibilidad abajo. |
| **ISO/IEC 40500** (WCAG, accesibilidad web) | Contenido perceptible, operable, comprensible y robusto | Contraste de texto mínimo 4.5:1; enlace «Saltar al contenido»; navegación completa con teclado y foco visible; idioma `es`; textos alternativos en imágenes; respeta «reducir movimiento». |
| **ISO 9001** (gestión de la calidad) | Atender y medir la satisfacción del cliente; mejora continua | Canal de comentarios en Contacto; revisiones periódicas con la lista de abajo. |

## Comprobaciones realizadas

- **Accesibilidad (axe-core, reglas WCAG 2.0/2.1/2.2 nivel A y AA):** 0 violaciones en las 5 páginas, en pantalla de escritorio (1366 px) y de celular (390 px).
- **Enlaces e imágenes:** `python3 qa/check_links.py` → 0 errores (enlaces, anclas internas y textos alternativos).
- **Desbordes:** sin scroll horizontal de 320 a 1920 px de ancho.
- **Fluidez del scroll:** se eliminaron el desenfoque de fondo de las pestañas, la animación de bordes del inicio y los desplazamientos automáticos al cambiar de pestaña; las animaciones decorativas se desactivan en pantallas táctiles.

## Decisiones de diseño y sus límites

- **Texto justificado:** es un requisito del proyecto y se aplica con separación silábica automática para evitar huecos grandes. Las pautas WCAG de nivel AAA (criterio 1.4.8) recomiendan no justificar el texto, porque puede dificultar la lectura a algunas personas; el sitio apunta al nivel AA, por lo que este punto queda como decisión consciente.
- **Videos:** la revisión automática da 0 violaciones, pero los videos reales necesitan subtítulos (criterio 1.2.2, nivel A). Mientras no existan, ese punto está **pendiente** y la revisión lo marcará cuando se agreguen los archivos.

## Qué falta (no se puede automatizar)

- Probar en celulares reales (Android y iPhone) y en Firefox y Safari.
- Prueba de usabilidad con al menos 5 personas ajenas al equipo.
- Revisar con lector de pantalla.
- Subtítulos (archivo .vtt) y transcripción de los videos de bienvenida y despedida.
- Confirmar los nombres del organigrama, que se transcribieron tal como aparecen en la imagen.
- Descripciones definitivas de las imágenes y fotos del organigrama.

## Antes de cada actualización

1. Ejecutar `python3 qa/check_links.py`.
2. Revisar la página en celular y en computadora.
3. Subir los cambios con `git add .`, `git commit` y `git push`.

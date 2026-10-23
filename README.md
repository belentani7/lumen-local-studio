# Lumen Local Studio — estudio de composiciones vectoriales offline

Lumen Local Studio es un prototipo creativo React + Vite y un servidor Express estático. **No genera imágenes fotorrealistas, vídeo ni audio mediante modelos IA**: el motor local funciona sin APIs y crea **composiciones abstractas vectoriales** a partir de indicaciones, estilo de color y variaciones deterministas.

## Funciona

- Escena de gradientes con variaciones realmente diferentes entre clics en **Generar**.
- Previsualización y exportación **SVG real** en `1:1`, `4:5`, `16:9` o `9:16`. El SVG conserva el texto saneado para XML, las dimensiones y la paleta seleccionada.
- Carga opcional de imágenes PNG, JPEG o WebP (máximo 12 MB) para la **previsualización local**, con limpieza de URL temporal al reemplazar o cerrar el componente.
- Una fotografía cargada **no** se inserta en el SVG exportado; la aplicación lo notifica.
- Inspiraciones de ejemplo sin presentarlas como una biblioteca real de creaciones previas.
- Navegación móvil operativa con Escape, retorno del foco, enlace de salto y botones seleccionados anunciados.
- Se eliminó la analítica externa automática del HTML y el bloqueo de zoom; revisar las integraciones de desarrollo heredadas antes de publicar.
- Página principal sin depender del antiguo activo externo de `/manus-storage`.

## Límites reales

Las acciones de vídeo, voz, relleno generativo, borrado por IA, autenticación y biblioteca persistente todavía son demos o futuras funcionalidades. No afirmar que esas acciones realizan generación real. El servidor actual entrega contenido estático, no ofrece procesamiento creativo con IA. Los prompts no se envían a un proveedor desde el motor de composición.

## Desarrollo y verificación

```sh
pnpm install --frozen-lockfile
pnpm check
pnpm test
pnpm run test:navigation
pnpm build
pnpm start
```

La suite `client/src/lib/composition.test.ts` verifica geometría determinista, proporciones SVG y escape XML. La publicación exige además comprobación visual y de accesibilidad en navegador.

### Privacidad de desarrollo

La antigua instrumentación de logs de navegador y replay de sesión solo se incluye **con consentimiento explícito** al ejecutar Vite con `LUMEN_ENABLE_DEBUG_COLLECTOR=1`. No activarla mientras se manipulen prompts o materiales privados. Las integraciones heredadas del entorno Vite requieren otra auditoría independiente antes de considerar la privacidad de todo el runtime verificada.

## Estado

Código y pruebas propuestos en PR en borrador. Pruebas de CI, compilación y aceptación visual no se consideran superadas hasta que realmente se ejecuten y se inspeccionen.

Consulta `PROJECT_MASTER_PROMPT.md` para el plan completo específico del producto.

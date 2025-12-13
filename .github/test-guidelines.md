### Regla general para creación de tests

**Objetivo:** Escribir tests simples, funcionales y de bajo mantenimiento que validen comportamientos reales del sistema, no detalles internos del framework o casos triviales.

1. **Propósito claro:** Cada test debe validar un único comportamiento funcional del dominio, no una implementación interna.  
   - Pregúntate: “¿Si este comportamiento cambia, realmente debería fallar este test?”

2. **Cobertura funcional mínima:** Prioriza probar rutas y efectos principales sobre entradas representativas, no todas las combinaciones posibles.  
   - Máximo tres valores distintos por parametrización.

3. **Evitar redundancia:** No dupliques pruebas de la misma lógica o flujo.  
   - Un test por comportamiento, no por variación de datos.

4. **Ignorar lo que el framework ya garantiza:** No pruebes validaciones, serialización o errores estándar de Pydantic, Python o pytest.

5. **Estructura AAA (Arrange–Act–Assert):**  
   - **Arrange:** Prepara el escenario de prueba.  
   - **Act:** Ejecuta la acción que produce el resultado.  
   - **Assert:** Verifica solo el resultado relevante.

6. **Simplicidad primero:** Prefiere un test funcional compacto a múltiples tests fragmentados.  
   - Si un método tiene pocos caminos lógicos, agrúpalos en un solo test coherente.
   - No uses clases

7. **Evita casos triviales:** No testees salidas obvias (listas vacías, diccionarios vacíos, defaults de Pydantic) salvo que agregues lógica propia.

8. **Claridad sobre cantidad:** Los tests deben leerse como documentación del comportamiento esperado, no como enumeración exhaustiva de casos.

**Resumen práctico:**  
Escribe tests que validen comportamientos del dominio con el mínimo número de asserts necesarios para garantizar que el sistema funciona como se espera; todo lo demás es ruido y mantenimiento futuro.

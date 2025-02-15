module.exports = {
    testEnvironment: 'node', // usar el entorno de pruebas de Node.js
    testMatch: ['**/__tests__/**/*.test.js'], // busca archivos de prueba en la carpeta __tests__
    verbose: true, // muestra detalles de las pruebas
    collectCoverage: true, // habilita la recolección de cobertura de pruebas
    coverageDirectory: 'coverage', // manda los resultados de la cobertura a la carpeta coverage
  };
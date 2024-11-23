module.exports = {

    testMatch: [
        "**/*.test.tsx"
    ],
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.tsx?$': 'babel-jest', // Додаємо трансформацію для TypeScript
    },
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Обробка стилів
        '^@/app/(.*)$': '<rootDir>/app/$1',  // Шлях для app
        '^@/(.*)$': '<rootDir>/$1', // Залишити для решти шляхи
        '^next/font/google$': '<rootDir>/__mocks__/next/font/google.js', // Додаємо сюди
    },
    transformIgnorePatterns: [
        "/node_modules/(?!(your-es6-module|another-es6-module)/)"
    ],
};

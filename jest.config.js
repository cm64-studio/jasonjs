module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$', // This regex includes .ts and .tsx files
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
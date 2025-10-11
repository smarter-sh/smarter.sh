const { TextEncoder, TextDecoder } = require('util');

// Polyfill for TextEncoder/TextDecoder
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock fetch if needed
global.fetch = jest.fn();

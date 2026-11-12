import '@testing-library/jest-dom';
import { TextDecoder, TextEncoder } from 'util';

// jsdom lacks these; docx/mammoth need them.
Object.assign(global, { TextEncoder, TextDecoder });

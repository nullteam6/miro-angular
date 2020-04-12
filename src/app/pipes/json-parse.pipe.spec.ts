import { JsonParse } from './json-parse';

describe('JsonParsePipe', () => {
  it('create an instance', () => {
    const pipe = new JsonParse();
    expect(pipe).toBeTruthy();
  });
});

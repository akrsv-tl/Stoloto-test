import { getRandomFieldGame } from './random_clear_fields';

test('array random value length', () => {
    expect(getRandomFieldGame().length).toBe(4);
  });
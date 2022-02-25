import { add } from '../postService';

describe('check add function', () => {
  test('basic check', async () => {
    await add({
      title: 'good morning',
      Description: 'aaaa bbb',
      imageId: 'aaa',
      user: 'gggg',
    });
  });
});
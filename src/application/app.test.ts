import { Application } from './';
describe('Douh application test', () => {
  it('should be defined', () => {
    expect(Application).toBeDefined();
  });

  it('should instance can be created', () => {
    const app = new Application();
    expect(app).toBeDefined();
  });
});

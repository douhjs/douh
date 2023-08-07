import { containerInstance } from '../container';
import { Service } from './service';
import { Repository } from './repository';

describe('Service Decorator', () => {
  it('should register class in the container, and its instance should be get', () => {
    @Repository()
    class TestRepository {}

    expect(containerInstance.getInstance('repository')).toEqual({
      testRepository: new TestRepository(),
    });
  });

  it('should access instance from service constructor', () => {
    @Repository()
    class TestRepository {}

    @Service()
    class TestService {
      constructor(public testRepository: TestRepository) {}
    }

    expect(containerInstance.getInstance('service').testService).toBeInstanceOf(TestService);
    expect(containerInstance.getInstance('service').testService.testRepository).toBeInstanceOf(TestRepository);
  });
});

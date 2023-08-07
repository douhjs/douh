import { Repository, Service } from '../decorators';
import { EMPTY_VALUE } from '../symbol';
import { containerInstance } from './container-instance';

describe('Container', () => {
  beforeEach(() => containerInstance.reset());
  describe('set', () => {
    it('should register class in the serviceContainer', () => {
      containerInstance.set({
        id: 'TestService',
        Class: class TestService {},
        type: 'service',
        value: EMPTY_VALUE,
      });

      containerInstance.set({
        id: 'DouhService',
        Class: class DouhService {},
        type: 'service',
        value: EMPTY_VALUE,
      });

      expect(containerInstance.getInstance('service')).toEqual({
        testService: new (class TestService {})(),
        douhService: new (class DouhService {})(),
      });
    });

    it('should register class in the repositoryContainer', () => {
      containerInstance.set({
        id: 'TestRepository',
        Class: class TestRepository {},
        type: 'repository',
        value: EMPTY_VALUE,
      });

      containerInstance.set({
        id: 'DouhRepository',
        Class: class DouhRepository {},
        type: 'repository',
        value: EMPTY_VALUE,
      });

      expect(containerInstance.getInstance('repository')).toEqual({
        testRepository: new (class TestRepository {})(),
        douhRepository: new (class DouhRepository {})(),
      });
    });
  });

  describe('getInstance', () => {
    describe('should return all instances in parameter type', () => {
      it('service', () => {
        containerInstance.set({
          id: 'TestService',
          Class: class TestService {},
          type: 'service',
          value: EMPTY_VALUE,
        });
        containerInstance.set({
          id: 'TestRepository',
          Class: class TestRepository {},
          type: 'repository',
          value: EMPTY_VALUE,
        });
        expect(containerInstance.getInstance('service')).toEqual({
          testService: new (class TestService {})(),
        });
      });

      it('repository', () => {
        containerInstance.set({
          id: 'TestService',
          Class: class TestService {},
          type: 'service',
          value: EMPTY_VALUE,
        });
        containerInstance.set({
          id: 'TestRepository',
          Class: class TestRepository {},
          type: 'repository',
          value: EMPTY_VALUE,
        });
        expect(containerInstance.getInstance('repository')).toEqual({
          testRepository: new (class TestRepository {})(),
        });
      });
    });
  });
  describe('reset', () => {
    it('should support container reset', () => {
      @Repository()
      class TestRepository {}

      @Service()
      class TestService {
        constructor(
          public name: string = 'douh',
          private testRepository: TestRepository,
          public age: number = 20,
        ) {}
      }

      expect(containerInstance.getInstance('service').testService).toBeInstanceOf(TestService);
      expect(containerInstance.getInstance('service').testService.name).toBe('douh');
      expect(containerInstance.getInstance('service').testService.testRepository).toBeInstanceOf(TestRepository);
      expect(containerInstance.getInstance('service').testService.age).toBe(20);
      containerInstance.reset();
      expect(containerInstance.getInstance('service').testService).toBeUndefined();
    });
  });
});

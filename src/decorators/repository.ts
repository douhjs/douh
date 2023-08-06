import { containerInstance } from '../container';
import { EMPTY_VALUE } from '../symbol';

export function Repository() {
  return (constructor: any) => {
    containerInstance.set({
      id: constructor.name,
      Class: constructor as ClassType,
      type: 'repository',
      value: EMPTY_VALUE,
    });
  };
}

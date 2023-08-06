import 'reflect-metadata';
import { EMPTY_VALUE } from '../symbol';
import { notInjected } from '../exceptions';

type MetadataType = 'service' | 'repository';

interface Metadata<T = unknown> {
  id: string;
  Class: ClassType<T>;
  value: unknown | symbol;
  type: MetadataType;
}

type MetadataOption = Metadata;

class Container {
  private serviceMetadataMap: Map<string, Metadata> = new Map();

  private repositoryMetadataMap: Map<string, Metadata> = new Map();

  public set(options: MetadataOption) {
    const newMetadata: Metadata = {
      ...options,
    };
    const metadataMap = newMetadata.type === 'service' ? this.serviceMetadataMap : this.repositoryMetadataMap;

    const existingMetadata = metadataMap.get(newMetadata.id);

    if (existingMetadata) {
      Object.assign(existingMetadata, newMetadata);
    } else {
      metadataMap.set(newMetadata.id, newMetadata);
    }
  }

  public reset() {
    this.serviceMetadataMap.clear();
    this.repositoryMetadataMap.clear();
  }

  public getInstance(type: 'service' | 'repository') {
    const instances: Record<string, any> = {};

    (type === 'service' ? this.serviceMetadataMap : this.repositoryMetadataMap).forEach((value, key) => {
      const name = key[0].toLowerCase() + key.slice(1);
      const instance = this.getValue(value);
      instances[name] = instance;
    });
    return instances;
  }

  private getValue(metaData: Metadata) {
    let value: unknown = EMPTY_VALUE;
    const { Class } = metaData;
    const paramTypes = Reflect.getMetadata('design:paramtypes', Class) || [];
    const params = this.initializeParams(Class, paramTypes);

    params.push(this);

    value = new Class(...params);

    return value;
  }

  private initializeParams<T>(target: ClassType<T>, paramTypes: any[]): unknown[] {
    const res = [];
    for (const Param of paramTypes) {
      const metadata = this.repositoryMetadataMap.get(Param.name);
      if (metadata) {
        res.push(new Param());
      } else {
        throw notInjected(`${Param.name} is not injected. please use @Repository() decorator`, {
          errorMessage: 'Unexpected Error Occurred.',
        });
      }
    }

    return res;
  }
}
export const containerInstance = new Container();

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

  public setService(options: MetadataOption) {
    const newMetadata: Metadata = {
      ...options,
    };

    const existingMetadata = this.serviceMetadataMap.get(newMetadata.id);

    if (existingMetadata) {
      Object.assign(existingMetadata, newMetadata);
    } else if (newMetadata.type === 'service') {
      this.serviceMetadataMap.set(newMetadata.id, newMetadata);
    }
  }

  public setRepository(options: MetadataOption) {
    const newMetadata: Metadata = {
      ...options,
    };

    const existingMetadata = this.repositoryMetadataMap.get(newMetadata.id);

    if (existingMetadata) {
      Object.assign(existingMetadata, newMetadata);
    } else if (newMetadata.type === 'repository') {
      this.repositoryMetadataMap.set(newMetadata.id, newMetadata);
    }
  }

  public getServiceInstances() {
    const services: Record<string, any> = {};
    this.serviceMetadataMap.forEach((value, key) => {
      const name = key[0].toLowerCase() + key.slice(1);
      const service = this.getValue(value);
      services[name] = service;
    });
    return services;
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
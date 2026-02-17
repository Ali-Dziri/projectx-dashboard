type ServiceConstructor<T> = new () => T;

class ServiceFactory {
  private instances = new Map<ServiceConstructor<any>, any>();

  getInstance<T>(ServiceClass: ServiceConstructor<T>): T {
    if (!this.instances.has(ServiceClass)) {
      this.instances.set(ServiceClass, new ServiceClass());
    }
    return this.instances.get(ServiceClass);
  }
}

const serviceManager = new ServiceFactory();

export function getService<T>(ServiceClass: ServiceConstructor<T>): T {
  return serviceManager.getInstance(ServiceClass);
}

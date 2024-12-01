export class MockLocalStorage implements Storage {
  private static instance: MockLocalStorage;
  private readonly storage: Map<string, string> = new Map<string, string>();

  private constructor() {}

  public static getInstance(): MockLocalStorage {
    if (!MockLocalStorage.instance) {
      MockLocalStorage.instance = new MockLocalStorage();
    }

    return MockLocalStorage.instance;
  }

  public get length(): number {
    return this.storage.size;
  }

  public getItem(key: string): string | null {
    return this.storage.get(key) ?? null;
  }

  public setItem(key: string, value: string): void {
    this.storage.set(key, value);
  }

  public removeItem(key: string): void {
    this.storage.delete(key);
  }

  public clear(): void {
    this.storage.clear();
  }

  public key(index: number): string | null {
    const keys = Array.from(this.storage.keys());

    return keys[index] || null;
  }
}

export interface CRUDInterface<E, I, R> {
  create(item: E): Promise<R>;
  getById(id: I): Promise<R | null>;
  update(id: I, item: E): Promise<R>;
  delete(id: I): Promise<void>;
}

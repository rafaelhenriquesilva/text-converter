
export interface IGlobalRepository<T> {
                listAll(): Promise<T[]>
                deleteById(id: string | number): Promise<void>
                findById(id: string | number): Promise<T[]>
                insert(input: Partial<T>):Promise<void>
                update(input: Partial<T>): Promise<void>
            }
        
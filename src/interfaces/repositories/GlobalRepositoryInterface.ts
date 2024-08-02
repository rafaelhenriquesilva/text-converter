
export interface GlobalRepositoryInterface<T> {
                listAll(): Promise<T[]>
                deleteById(id: string | number): Promise<void>
                findById(id: string | number): Promise<T[]>
                insert(input: Partial<T>):Promise<Partial<T[]>>
                update(input: Partial<T>): Promise<void>
            }
        
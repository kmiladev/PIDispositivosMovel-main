import { User } from "../../application/entities/users";
import { UserRepository } from "../../application/repositories/user/user-repository";

/*
* Banco de dados fake para teste de integração e e2e
*/

export class InMemoryUserRepository extends UserRepository {
    public item: User[] = []

    async delete(id: string) {
        this.item = this.item.filter(item => item.id !== id);
    }

    async update(user: User, id: string): Promise<User | null> {
        const index = this.item.findIndex((itens) => itens.id === id)

        if( index === undefined ) {
            return null
        }

        const update  = this.item[index] = user

        return update
    }

    async findUserById(id: string): Promise<User | null> {
       const user = this.item.find((itens) => itens.id === id)

       if (!user || user == undefined ) {
            return null
        }

        return user
    }

    async findUser(): Promise<User[] | null> {
        const user = this.item.map((itens) => itens)

        if(user.length === 0) {
            return null
        }

        return user
    }
    
    async creat(user: User): Promise<User> {
        const created = new User({
            name: user.name,
            email: user.email,
            password: user.password,
            cep: user.cep,
            numero: user.numero,
            contato: user.contato,
            role: user.role,
            avata: user.avata,
            createdAt: new Date(),
            update_at: new Date()
        })

        this.item.push(created)

        return created
    }
    async findByEmail(email: string): Promise<User | null> {
        const user = this.item.find((itens) => itens.email === email)

        if (!user || user == undefined ) {
            return null
        }

        return user
    }

}
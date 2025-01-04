import { useEffect, useState } from 'react';
import axios from 'axios';

type User = {
    firstName: string;
    lastName: string;
    isActive: boolean;
};

const UsersTable = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://node-xb1g.onrender.com/users');
                setUsers(response.data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erro desconhecido');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>{`Erro: ${error}`}</div>;
    }

    return (
        <div>
            <h1>Lista de Usuários</h1>
            <table border={1}>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Sobrenome</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.isActive ? 'Ativo' : 'Inativo'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersTable;

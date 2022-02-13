import { API } from '../config';

export const createOperation = async (operation) => {

    const response = await fetch(`${API}/operation/create`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(operation)
    });

    return response.json();
}
import { API } from '../config';

export const getBalanceInfo = async (id) => {

    const response = await fetch(`${API}/user/getUser/${id}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });

    return response.json();
}

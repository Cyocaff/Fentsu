import { backend_address } from "../base/settings.js";

export async function request(direction, request_method = 'POST', data = {}){

    const token = localStorage.getItem('accessToken');
    const response = await fetch(
        backend_address + direction, {
            method: request_method,
            credentials: token? 'include' : 'omit',
            mode : 'cors',
            body: request_method !== 'GET' ? JSON.stringify(data) : undefined,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' ,
                ...(token && { 'Authorization': `Token ${token}` })
            }
        }
    )
    if (!response.ok){
        throw await response.text()
    }
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        return await response.json();
    } else {
        return await response.text();
    }
}

export async function send_request(direction, request_method = 'POST', data){
    const token = localStorage.getItem('accessToken');

    const response = await fetch(
        backend_address + direction, {
            method: request_method,
            credentials: token? 'include' : 'omit',
            mode : 'cors',
            body: request_method !== 'GET'
            ? data instanceof FormData ? data : JSON.stringify(data)
            : undefined,
            headers: {
                'Accept': 'application/json',
                ...(token && { 'Authorization': `Token ${token}` }),
                ...(data && !(data instanceof FormData) && { 'Content-Type': 'application/json' })
            }
        }
    )
    if (!response.ok){
        throw await response.text()
    }
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        return await response.json();
    } else {
        return await response.text();
    }
}
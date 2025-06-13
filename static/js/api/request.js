import { backend_address } from "../base/settings.js";


export function request(direction, request_method = 'POST', data = {}) {
    let token = localStorage.getItem('accessToken');
    console.log('token at request: '+token)
    return new Promise((resolve, reject) => {
        $.ajax({
            url: backend_address + direction,
            method: request_method,
            crossDomain: true,
            credentials: token? 'include':'omit',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Token ${token}` }),
            },
            data: request_method !== 'GET' ? JSON.stringify(data) : undefined,
            success: function (response) {
                resolve(response);
            },
            error: function (xhr, status, error) {
                console.log('Authentication failed:', error);
                console.log(xhr.responseText);
                reject(xhr.responseText);
            },
        });
    });
}

export function send_request(direction, request_method = 'POST', data = null) {
    let token = localStorage.getItem('accessToken');
    console.log('token at request:', token);
    console.log('data sent:', data);

    return new Promise((resolve, reject) => {
        $.ajax({
            url: backend_address + direction,
            method: request_method,
            crossDomain: true,
            credentials: token ? 'include' : 'omit',
            headers: {
                'Accept': 'application/json',
                ...(token && { 'Authorization': `Token ${token}` }),
            },
            processData: false,
            contentType: false,
            data: request_method !== 'GET' ? data : undefined,
            success: function (response) {
                resolve(response);
            },
            error: function (xhr, status, error) {
                console.log('Authentication failed:', error);
                console.log(xhr.responseText);
                reject(xhr.responseText);
            },
        });
    });
}

import { backend_address } from "../base/settings.js";
import { auth_enabled } from "../base/settings.js";
import { debug } from "../base/settings.js";
// Why there are two request functions? well because the send_request one if for sending files,
// I could have put the same functionality on two functions but I kinda felt it was not worth increasing
// the complexity and number of conditionals on the request function when sending files is the less used 
// practice on a frontend.

export function request(direction, request_method = 'POST', data = {}) {
    let token = auth_enabled ? localStorage.getItem('accessToken') : false;
    if(debug){console.log('token at request: '+token)}
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
    let token = auth_enabled ? localStorage.getItem('accessToken') : false;
    if(debug){console.log('token at request: '+token)}
    if(debug){console.log('data sent:', data)}

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

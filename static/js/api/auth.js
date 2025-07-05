import { request } from "./request.js";

export async function check_credentials(){
    let is_valid_user = await request('/check_credentials/user');
    return is_valid_user;
}

export async function login_view(){
    //this is an example
}
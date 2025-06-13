import { auth_url,auth_enabled } from "./settings";
import { request } from "../api/request.js";
export async function valid_credentials(){
    let status = '';
    let response = '';
    if(auth_enabled){
        status = false
        try{
            response = await request(auth_url,'GET');
            status = response.status == valid? true : false
            if (status == false){console.log('Invalid login credentials, please log in again.');localStorage.removeItem('accessToken')}
        }
        catch(error){
            status = false
            console.error('An error has ocurred during the authentication process, please wait a few minutes and retry the connection.')
        }
        return status;
    }else{
        return true
    }
    
}
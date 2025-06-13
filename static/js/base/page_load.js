import { router } from './router.js';
import { request } from '../api/request.js';
import { current_view_options } from '../components/view_options.js';
import { manage_event_listeners } from './resources_management.js';
import { backend_address, media_key, auth_enabled, frontend_address } from './settings.js';



export async function loadPage(current_path_name, goback) {
    manage_event_listeners([],'off')
    current_path_name = current_path_name.replace(frontend_address,'')
//    if (auth_enabled && token == null){
//        console.log(`No token was provided, please log in.`);
//        return $('#page_content_body').html(await router('/login'));
//    }
    
        //if (!auth_enabled){ // || await check_credentials()
          //  $('#page_content_body').html(await router(current_path_name));
            
        //}else{
        //return $('#page_content_body').html(await router('/login'));
        if (!goback){
            window.history.pushState(null, null, current_path_name);
        }
        return $('#page_content_body').html(await router(current_path_name));
        //}
       

}
function init_base_listeners(){
    window.addEventListener('popstate', function(event) {
        loadPage(String(window.location).replace(frontend_address,''),true);
    });
        const navigation_forward_listener = ['click', '.page-navigator',(event) => {
            event.preventDefault();
            const targeted_element = event.target.closest('a');
            loadPage(targeted_element.href,false)
        }]
        manage_event_listeners([navigation_forward_listener], 'on', true);
}

loadPage(String(window.location).replace(frontend_address,''),true);   
init_base_listeners();
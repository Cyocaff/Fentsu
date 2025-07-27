import { router, compile_routes } from './router.js';
import { manage_event_listeners, manage_callbacks } from './resources_management.js';
import { frontend_address } from './settings.js';

const page_body = document.getElementById('page_content_body');

export async function loadPage(current_path_name, goback) {
    manage_event_listeners([],'off');
    current_path_name = current_path_name.replace(frontend_address,'')
        if (!goback){
            window.history.pushState(null, null, current_path_name);
        }
        page_body.innerHTML = await router(current_path_name);
        manage_callbacks([],'execute');
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

compile_routes();
loadPage(String(window.location).replace(frontend_address,''),true);   
init_base_listeners();
import { manage_callbacks, manage_event_listeners } from "../base/resources_management.js"

function example_callback_one(){
    console.log('this is an example of a callback');
}
function example_callback_two(){

    console.log('and this is another example of a callback');
}

export default async function home(){
    manage_event_listeners([], 'off'); 
    manage_callbacks([example_callback_one,example_callback_two],'set');
    return`
        <p>Welcome to Fentsu this is a short demo with a few functions to display.</p>
    `
}


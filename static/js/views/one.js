import { manage_event_listeners } from "../base/resources_management.js";

export default async function one(params,http_parameters){
    let counter_n = 0

    function params_display(params,http_parameters){
        let params_html = http_parameters? `<p style='color:springgreen;'><u>you used the following http parameters:</u> ${http_parameters}</p><br>`:
        '<p style="color:red">It seems you did not use any http parameters.</p><br>';
        for (let i = 0; i < params.length;i++){
            params_html += `<p><u>Parameter number ${i}: </u>${params[i]}</p>`
        }
        return params_html;
    }
    function increase_counter(event){
        document.getElementById('event_case').innerHTML = JSON.stringify(event,null,5)
        document.getElementById("counter").innerHTML= counter_n++
    }
    const my_events = ['click','#counter_button', increase_counter]
    
    manage_event_listeners([my_events],'on')
    return`
        <h1>Hi! this is a view I made for displaying parameters!</h1><br>
        ${params_display(params,http_parameters)}
        <button id="counter_button">increase <p id="counter"></p></button>
        <div id='event_case'>
        
        </div>
    `
}
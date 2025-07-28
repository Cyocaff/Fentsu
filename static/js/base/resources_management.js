let current_view_event_listeners = [];

export function manage_event_listeners(events = [], action = 'on', is_permanent = false) {
    console.log(current_view_event_listeners)
    const list = action === 'off' ? current_view_event_listeners : events;
    for (const [type, selector, handler] of list) {
        if (action === 'off') {
            $(document).off(type, selector, handler);
        } else {
            $(document).on(type, selector, handler);
            if(!is_permanent){
                current_view_event_listeners.push([type, selector, handler]);
            }
        }
    }
    if (action === 'off'){
        current_view_event_listeners = [];
    }
}

let current_callbacks = [];

export function manage_callbacks(callbacks=[], action = 'execute'){

    if (action == 'execute' && !current_callbacks.join() == [].join()){
        for(let i = 0; i < current_callbacks.length; i++){
            current_callbacks[i]();
        }
        current_callbacks = [];
    }
    if (action == 'set'){
        current_callbacks = current_callbacks.concat(callbacks);
    }
}


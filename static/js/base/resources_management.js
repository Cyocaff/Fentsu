let current_view_event_listeners = [];
// this functions expect to recieve # or . as the first character for the selector, this to differentiate between class and id.
// fixed_target is used when the bubble of the DOM events is not precise, its usage is recommended.
export function manage_event_listeners(events = [], action = 'on', is_permanent = false){
    const list = action === 'off' ? current_view_event_listeners : events;
    for (const [type, selector, handler] of list){
        if (action === 'off'){
            document.removeEventListener(type,handler)
        }else{            
            const upper_handler = selector[0] == '.' 
            ? function (event){
                if (event.target.closest(selector)){
                    event.fixed_target = event.target.closest(selector)
                    handler(event);
                }
            }
            : function (event){
                if (event.target.id == selector.slice(1)){
                    event.fixed_target = event.target.closest(selector)
                    handler(event);
                }
            }
            document.addEventListener(type,upper_handler);
            if (!is_permanent){
                current_view_event_listeners.push([type,'',upper_handler]);
            }
        }
    }
    if (action === 'off'){
        current_view_event_listeners = [];
    }
}


let current_callbacks = [];
// this function is self explanatory, I guess.
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


let current_global_listeners = [];
// you should use this function only to use event listeners that go beyond 'document', such as "keydown" events.
export function manage_current_global_listeners(listeners=[], action = 'remove'){
    if (action == 'remove' && !current_global_listeners.join() == [].join()){
        for (let event_list of current_global_listeners){
            window.removeEventListener(event_list[0],event_list[1]);
        }
        current_global_listeners = [];
    }
    if (action == 'add'){
        current_global_listeners = current_global_listeners.concat(listeners);
        for (let event_list of listeners){
            window.addEventListener(event_list[0],event_list[1]);
        }
    }
}
    

let current_observers = [];
// this one also seems to be self explanatory.
export function manage_current_observers(observers=[],action='disconnect'){
    if (action == 'disconnect' && !current_observers.join() == [].join()){
        for (let i = 0; i < current_observers.length; i++){
            try{
                current_observers[i].disconnect();
            }catch(error){
                console.error('an error has ocurred while trying to disconnect the following  observers: '+current_observers);
            }    
        }
        current_observers = [];
    }
    if (action == 'connect'){
        for (let i = 0; i < observers.length; i++){
            observers[i][0].observe(observers[i][1], observers[i][2]);
            current_observers.push(observers[i][0]);
        }
    }
}
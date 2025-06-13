let current_view_event_listeners = [];

export function manage_event_listeners(events = [], action = 'on', is_permanent = false) {
    const list = action === 'off' ? current_view_event_listeners : events;
    for (const [type, selector, handler] of list) {
        if (action === 'off') {
            $(document).off(type, selector, handler);
        } else {
            $(document).on(type, selector, handler);
            if(!is_permanent){
                current_view_event_listeners = events
            }
        }
    }
}






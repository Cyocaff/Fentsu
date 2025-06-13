// To add views to the router import them from their function and add them in the router level you consider
// adecuate. 
//
// The router levels work in the following way: static = router is when you want to fetch an url that used no parameters
// for example /frontend/home, the next url levels are made to recieve parameters, an explanation in more detail:
// let's say you want to fetch /edit_user_profile/121/edit; if you set something like: /edit_user_profile in the second
// level of the router, then the router is going to look for an url that is /edit_user_profile/something/othersomething 
// then split it in three parts, the first one is the one it is use to look in the functions, so it is going to search for
// edit_user_profile, the other reamining two parts are going to be sent to the function of the view as parameters, so 121 is the
// user id and edit is the action we want to do, so we tell these things using the router.

// Regarding http parameters, if you url has something like /search/products?c=drinks&n=beer then then this is going to split the last part
// and add the http parameters as a new argument.

import { not_found_404 } from './404.js';
import { home } from '../views/home.js';
import { about } from '../views/about.js';
import { one } from '../views/one.js';
import { debug } from './settings.js';


//yet to think
const permissions = {
    '/404': 'guest',
    '/home': 'user'
}


export async function router(route){
    let view = '';

    const static_router = {
        '/404': not_found_404,
        '/home': home,
        '/about': about
    }
    const depth_one = {
        '/one': one
    }
    const depth_two = {
        '/one': one
    }

    const router_level = [depth_one,depth_two]
    // As you can see here, we search in an order thats is from less to more,
    // you can change the order if you find it more convenient but I do not recommend it.

    if (static_router[route]) {
        view = await static_router[route]()
        return view;
    }else{
        if(debug){console.log('現在の経路： '+ route)}
        let dynamic_route_function;
        for (let i=0;i<router_level.length;i++){
            let x = i + 1;
            if(debug){console.log('加工経路： '+route.split('/').slice(0, -x))}
            if(debug){console.log('現在のインデクス: '+ i)}
            if(dynamic_route_function = router_level[i] [(route.split('/').slice(0, -x).join('/'))]){
                if(debug){console.log('見つけた！ 現在のインデクス： '+i)}
                const dynamic_path = route.split('/').slice(-x)
                if (dynamic_path[i].split("?").length > 1){
                    const splited_parameters = dynamic_path[i].split("?");
                    dynamic_path[i] = splited_parameters[0];
                    dynamic_path[i+1] = splited_parameters[1];
                }
                view = await dynamic_route_function(dynamic_path)
                return view;
            }
        }
        console.error('４０４：経路「', route,'」が見つかれませんでした。');
        view= await not_found_404();
        return view;
    }
}

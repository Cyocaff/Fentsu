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
import { auth_enabled } from './settings.js';
import { check_credentials } from '../api/auth.js';

//yet to think
const permissions = {
    '/404': 'guest',
    '/home': 'user'
}

function match_url(url, path) {
    const paramRegex = {
        '<int>': '(\\d+)',
        '<str>': '([^/]+)'
    };

    const keys = [];
    const regex_url = url.split('/').map(part => {
        if (part in paramRegex) {
            keys.push(part);
            return paramRegex[part];
        }
        return part;
    }).join('/');

    const regex = new RegExp('^' + regex_url + '$');
    const match = path.match(regex);

    if (!match) return null;
    const params = match.slice(1).map((val, i) => {
        if (keys[i] === '<int>') return parseInt(val);
        return val;
    });

    return params;
}

async function check_route_auth(route){
    if (auth_enabled && permissions[route] != 'guest'){
        if(check_credentials(permissions[route])){
            return true;
        }else{
            return false;
        }
    }else{
        return true;
    }
}



export async function router(route_raw){
    const [route,http_parameters] = route_raw.split("?")

  //  if (!await check_route_auth(route)){
  //      view = await not_found_404();
  //      return view; 
  //  }

    const dynamic_router = [
        {url:'/home' ,view: home },
        {url:'/one/<int>' ,view:one},
        {url:'/one/<str>/<int>' ,view:one},
        {url:'/about',view:about },
    ]


    let view =''
    for (let route_obj of dynamic_router){
        const params = match_url(route_obj.url, route);
        if (params) {
            view = await route_obj.view(params,http_parameters);
            return view;
        }
    }
    console.error('４０４：経路「', route,'」が見つかれませんでした。');
    view= await not_found_404();
    return view;
}


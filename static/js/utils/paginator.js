
export function paginator(base_url,args=[],parameters=[],http_parameters=''){

    // this is a function to quickly build index buttons for pages, it takes 4 arguments,
    // the base url, the args of the router, for example /home/arg1/arg2, the parameters of the index,
    // 1: which page are we in, 2: which is the max page, 3: what is the range, the http parameters
    // are expected to be something like: ?page=1&whatever=x

    http_parameters = http_parameters.replace(/([?&])?page=\d+&?/ , '')
    console.log('url args: ' + args);
    console.log("current page: "+ parameters[0])
    console.log("max page: " + parameters[1])
    let number_of_pages =parseInt(parameters[1])
    let current_page = parseInt(parameters[0]) 

    current_page > number_of_pages || current_page < 0? console.log('not found'):'';
    let index_buttons_html='';

    const args_string = args.length > 0? '/' + args.join('/').replace(/\?.*$/, ''): ''


    for(let i = current_page -parameters[2];i<=current_page+parameters[2];i++){
        if (i>0&&i<number_of_pages){
            if (i==current_page-4){
                index_buttons_html +=`
                <div>
                    <a href="${base_url+args_string}?page=1&${http_parameters}" class="passive-href">
                        <div id="simple-button" class="simple-button"><<</div>
                    </a>
                </div>
            `   
            }
            if (i!=current_page-parameters[2]&&i!=current_page+parameters[2]){
                index_buttons_html +=`
                <div>
                    <a href="${base_url+args_string}?page=${i}&${http_parameters}" class="passive-href">
                        <div id="simple-button" class="simple-button">${i}</div>
                    </a>
                </div>
            `   
            }
        }
    }
    index_buttons_html +=`
    <div>
        <a href="${base_url+args_string}?page=${number_of_pages}&${http_parameters}" class="passive-href">
            <div id="simple-button" class="simple-button">>></div>
        </a>
    </div>
`   
    return index_buttons_html;
};
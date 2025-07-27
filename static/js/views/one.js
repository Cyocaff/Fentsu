function params_display(params,http_parameters){
    let params_html = http_parameters? `<p style='color:springgreen;'><u>you used the following http parameters:</u> ${http_parameters}</p><br>`:
    '<p style="color:red">It seems you did not use any http parameters.</p><br>';
    for (let i = 0; i < params.length;i++){
        params_html += `<p><u>Parameter number ${i}: </u>${params[i]}</p>`
    }
    return params_html;
}

export default async function one(params,http_parameters){
    return`
    <h1>Hi! this is a view I made for displaying parameters!</h1><br>
    ${params_display(params,http_parameters)}
    `
}
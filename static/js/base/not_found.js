import { frontend_address } from "./settings.js"
import { not_found_image } from "./settings.js"
export async function not_found_404(){
    return`
    <h1 style="color:white;">エラー４０４ページは見つかれませんでした。</h1>
    <img src="${not_found_image}"></img>
    `
}
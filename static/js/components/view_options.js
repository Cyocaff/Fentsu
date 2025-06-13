import { frontend_address } from "../base/settings.js";
export function current_view_options(current_path_name){
    let options_html = ''
    if (current_path_name.startsWith(frontend_address)) {
        current_path_name = current_path_name.replace(frontend_address, '');
    } 
    console.log('here view options '+ current_path_name)
    if (current_path_name.startsWith('/toshokanba')){
        options_html =`
        <h3>図書館場</h3>
        <h4>ナビゲーション</h4>
        <hr>
        <a class="page-navigator simple-button" href="/toshokanba/rakuen_no_tobira/nsfw/1">楽園</a>
        <h4>投稿選択</h4>
        <hr>
        <div style="display: flex; flex-direction:column;">
            <a class="page-navigator simple-button" href="/toshokanba/upload_manga">漫画に投稿</a>
            <a class="page-navigator simple-button" href="/toshokanba/upload_image">画像に投稿</a>
            <a class="page-navigator simple-button" href="/toshokanba/my_groups">私の画像グループ</a>
            <a class="page-navigator simple-button" href="/toshokanba/create_group">画像グループに作る</a>
            <a class="page-navigator simple-button" href="/toshokanba/create_collection">収集に作る</a>
            <a class="page-navigator simple-button" href="/toshokanba/edition_panel">編集パネル</a>
        </div>
        `
    }
    if (current_path_name.startsWith('/home')){
        options_html =`
        <h3>Home options</h3>
        `
    }

    return options_html
}
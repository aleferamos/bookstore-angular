
  export const convertBase64ToFile = (dataurl) => {

    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }

    let type = arr[0].match(/:(.*?);/)[1].replace('image/', '');


   let letters = "abcdefghijklmnopqrstuvwxyz",
    plat_id = letters.charAt(Math.floor(Math.random() * letters.length)) + (Math.random() + 1).toString(36).substr(2, 9);
    return new File([u8arr], plat_id + `.${type}` , {type:mime});
}

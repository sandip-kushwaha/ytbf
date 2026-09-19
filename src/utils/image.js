export const optimizeImage = (url, width = 600) => {
    if(!url) return "";

    return url.replace(
        "/upload/",
        `/upload/f_auto,q_auto,w_${width}/`
    );
};
const validateImgUrl = (url) => {
    const reg = /^((https?|ftp):)?\/\/.*(jpeg|jpg|png|gif|bmp)$/;

    return reg.test(url);
}

module.exports = validateImgUrl;
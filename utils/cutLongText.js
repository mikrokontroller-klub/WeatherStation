module.exports = (text, maxLength) => {
    if (text.length > maxLength) {
        text = text.substring(0, maxLength); //cuts to 1024
        let last = text.lastIndexOf(' '); //gets last space (to avoid cutting the middle of a word)
        text = text.substring(0, last); //cuts from last space (to avoid cutting the middle of a word)
        text = text + ` ...`; //adds (...) at the end to show that it's cut
    }
    return text;
};

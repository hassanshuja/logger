const sanitize_html = require('sanitize-html');
const Os = require('os');

const TRANSFORM_MESSAGE = (msg) => (
    // Is code running on developer machine? then don't sanitize
    !/va[0-9]{2}tlv[a-z]{3}[0-9]{3}[.wellpoint.com]{0,1}/i.test(Os.hostname())
        ? msg
        : sanitize_html(msg)
)

function prettyPrintObject (obj) {
    let out = '';
    for (const prop in obj) {
        out += `${prop}=${TRANSFORM_MESSAGE(obj[prop])};`;
    }
    return (out);
}

module.exports = prettyPrintObject;
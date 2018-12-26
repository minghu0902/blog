var url = require('url');

// console.log(url);
// {   
//     Url: [Function: Url],
//     parse: [Function: urlParse],
//     resolve: [Function: urlResolve],
//     resolveObject: [Function: urlResolveObject],
//     format: [Function: urlFormat],
//     URL: [Function: URL],
//     URLSearchParams: [Function: URLSearchParams],
//     domainToASCII: [Function: domainToASCII],
//     domainToUnicode: [Function: domainToUnicode] 
// }

// Url {
//     protocol: null,
//     slashes: null,
//     auth: null,
//     host: null,
//     port: null,
//     hostname: null,
//     hash: null,
//     search: null,
//     query: null,
//     pathname: null,
//     path: null,
//     href: null 
// }

// parse
url.parse('https://username:password@example.org:8080/foo?id=1#bar');
// Url {
//     protocol: 'https:',
//     slashes: true,
//     auth: 'username:password',
//     host: 'example.org:8080',
//     port: '8080',
//     hostname: 'example.org',
//     hash: '#bar',
//     search: '?id=1',
//     query: 'id=1',
//     pathname: '/foo',
//     path: '/foo?id=1',
//     href: 'https://username:password@example.org:8080/foo?id=1#bar' }

url.parse('https://username:password@example.org:8080/foo?id=1#bar', true);
// 第二个参数如果是true，则会调用querystring解析query
// Url {
//     protocol: 'https:',
//     slashes: true,
//     auth: 'username:password',
//     host: 'example.org:8080',
//     port: '8080',
//     hostname: 'example.org',
//     hash: '#bar',
//     search: '?id=1',
//     query: { id: '1' },
//     pathname: '/foo',
//     path: '/foo?id=1',
//     href: 'https://username:password@example.org:8080/foo?id=1#bar' }

// resolve
url.resolve('/one/two/three', 'four'); // /one/two/four
url.resolve('/one/two/three/', 'four'); // /one/two/three/four
url.resolve('http://example.com/', '/one');    // 'http://example.com/one'
url.resolve('http://example.com/one', '/two'); // 'http://example.com/two'

// format
url.format({
    protocol: 'https:',
    slashes: true,
    auth: 'username:password',
    host: 'example.org:8080',
    port: '8080',
    hostname: 'example.org',
    hash: '#bar',
    search: '?id=1',
    query: 'id=1',
    pathname: '/foo',
    path: '/foo?id=1'
});
// https://username:password@example.org:8080/foo?id=1#bar

var myurl = new url.URL('https://username:password@example.org:8080/foo?id=1#bar');

console.log(url.format(myurl, {
    unicode: false
}));

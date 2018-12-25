```
  var url = require('url');
  
  console.log(url);
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

```

### parse
> 解析 urlString

1. url.parse(urlString)
```
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
  
```

2. url.parse(urlString, true)
```
  url.parse('https://username:password@example.org:8080/foo?id=1#bar', true);
  
  // 第二个参数如果是 true，则会调用 querystring 模块的 parse() 生成对象，默认为 false
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
  
```

### resolve
> url.resolve(from, to) 方法会以一种 Web 浏览器解析超链接的方式把一个目标 URL 解析成相对于一个基础 URL。

```
  url.resolve('/one/two/three', 'four'); // /one/two/four
  url.resolve('/one/two/three/', 'four'); // /one/two/three/four
  url.resolve('http://example.com/', '/one');    // 'http://example.com/one'
  url.resolve('http://example.com/one', '/two'); // 'http://example.com/two'
```

### format
> 将一个url对象解析为url字符串

1. url.format(URL)
```
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
```

2. url.format(URL, options)
```
  var myurl = new url.URL('https://username:password@example.org:8080/foo?id=1#bar');
  url.format(myurl, {
    fragment: true, // 是否带 hash， 默认为 true
    auth: true, // 是否带 auth 信息，默认为 true
    search: true, // 是否带查询参数，默认为 true
    unicode: false, // 是否对主机元素里的 Unicode 字符直接编码，默认为 false
  });
  
  // https://username:password@example.org:8080/foo?id=1#bar
```

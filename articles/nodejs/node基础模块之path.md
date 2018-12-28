
```
  var path = require('path');
```

### basename
> path.basename(path, ext) 返回 path 中的最后一部分

1. path.basename(path);
```
  path.basename('/foo/bar/baz/index.html'); // index.html
```

2. path.basename(path, ext); 
如果有第二个参数( 一般传扩展名 )，则返回的时候会省略第二个参数
```
  path.basename('/foo/bar/baz/index.html', '.html'); // index
```

### delimiter
> path.delimiter 返回平台特定的路径分隔符, windows 上是 ; , POSIX 上是 :
```
  console.log(path.delimiter); // ;
```

### dirname
> path.dirname(path) 返回 path 的目录名
```
  path.dirname('/foo/bar/baz/index.html'); // /foo/bar/baz
```

### extname
> path.extname(path) 返回 path 中的扩展名

```
  path.extname('/foo/bar/baz/index.html'); // .index
  path.extname('/foo/bar/baz/index'); // ''
  path.extname('/foo/bar/baz/'); // ''
```

### format
> path.format(pathObj) 返回一个路径字符串
> * 如果指定了 pathObj.dir, 则忽略 pathObj.root
> * 如果指定了 pathObj.base, 则忽略 pathObj.ext 和 pathObj.name

```
  // 如果不指定 dir 和 base
  path.format({
      root: '/foo/bar/',
      ext: '.text',
      name: 'file'
  });
  // /foo/bar/file.text
  
  // 如果指定了 dir, 则忽略 root
  path.format({
      root: '/foo/bar/',
      dir: '/foo/baz/',
      base: 'index.html'
  });
  // /foo/baz/\index.html
  
  // 如果指定了 base, 则忽略 ext 和 name
  path.format({
      root: '/foo/bar/',
      dir: '/foo/baz/',
      base: 'index.html',
      ext: '.text',
      name: 'file'
  });
  // /foo/baz/\index.html
```

### parse
> path.parse(path)
> 解析路径字符串为对象，与 path.format 相反
```
  path.parse('./foo/bar/baz/index.html'); 
  // { root: '',
  //   dir: './foo/bar/baz',
  //   base: 'index.html',
  //   ext: '.html',
  //   name: 'index' }

  path.parse('/foo/bar/baz/index.html');
  // { root: '/',
  //   dir: '/foo/bar/baz',
  //   base: 'index.html',
  //   ext: '.html',
  //   name: 'index' }
```

### isAbsolute
> path.isAbsolute(path) 返回 path 是否是绝对路径

```
  path.isAbsolute('foo/bar/baz/'); // false
  path.isAbsolute('/foo/bar/baz/'); // true
  path.isAbsolute('./foo/bar/baz/'); // false
```

### join
> path.join(...paths)
> ...paths: 路径片段
> 返回使用平台特定的分隔符把所有 path 片段连接到一起，并规范化生成的路径
```
  path.join('/foo', '/bar'); // /foo/bar
  path.join('/foo', '../', '/bar'); // /bar
```
### resolve
> path.resolve(...paths)
> ...paths: 路径片段
> 返回由路径片段组成的绝对路径
```
  path.resolve('/foo/bar', './baz'); // /foo/bar/baz
  path.resolve('/foo/bar', '/tmp/file/'); // /tmp/file
  path.resolve('/foo/bar', '../tmp/file/'); // /foo/tmp/file
```

### normalize
> path.normalize(path)
> 规范化路径，会处理path中带有的 '.' 或 '..'
```
  path.normalize('/foo/bar/baz/..'); // /foo/bar
```
### relative
> path.relative(from, to)
> 返回从 from 到 to 的相对路径
```
  path.relative('/foo/bar/index.html', '/foo/baz/index.html'); // ../../baz/index.html
```
### sep
> path.sep
> 返回平台特定的路径片段分割符
> Windows 上是 \
> POSIX 上是 /
```
  console.log(path.sep)
```

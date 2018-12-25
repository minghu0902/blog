
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

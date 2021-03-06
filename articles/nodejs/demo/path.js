var path = require('path');

// basename
path.basename('/foo/bar/baz/index.html'); // index.html
path.basename('/foo/bar/baz/index.html', '.html'); // index

// delimiter
path.delimiter // ;

// dirname
path.dirname('/foo/bar/baz/index.html'); // /foo/bar/baz


// extname
path.extname('/foo/bar/baz/index.html'); // .index
path.extname('/foo/bar/baz/index.'); // .
path.extname('/foo/bar/baz/index'); // ''
path.extname('/foo/bar/baz/'); // ''

// isAbsolute
path.isAbsolute('foo/bar/baz/'); // false
path.isAbsolute('/foo/bar/baz/'); // true
path.isAbsolute('./foo/bar/baz/'); // false

// format
path.format({
    root: '/foo/bar/',
    dir: '/foo/baz/',
    base: 'index.html',
    ext: '.text',
    name: 'file'
}); // /foo/baz/\index.html

path.format({
    root: '/foo/bar/',
    ext: '.text',
    name: 'file'
}); // /foo/bar/file.text

path.format({
    root: '/foo/bar/',
    dir: '/foo/baz/',
    base: 'index.html'
});

path.join('/foo', '/bar'); // /foo/bar
path.join('/foo', '../', '/bar'); // /bar

path.normalize('/foo/bar/baz/..'); // /foo/bar

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

path.relative('/foo/bar/index.html', '/foo/baz/index.html'); // ..\..\baz\index.html

path.resolve('../')

console.log(path.sep)

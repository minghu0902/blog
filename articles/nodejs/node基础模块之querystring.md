```
  var querystring = require('querystring');
```

### parse
> querystring.parse(str, step, eq, options);
> * str 必填，要解析的 URL 查询字符串
> * step 选填，用于界定查询字符串中的键值对的子字符串， 默认为 '&'
> * eq 选填，用于界定查询字符串中的键与值的子字符串。默认为 '='
> * options: { <br>
>     &ensp; decodeURIComponent: <Function> 解码查询字符串的字符时使用的函数。默认为 querystring.unescape(), <br>
>     &ensp; maxKeys: <Number> 指定要解析的键的最大数量。指定为 0 则不限制。默认为 1000 <br>
>   }

```
  var str1 = 'foo=bar&abc=xyz&abc=123';
  querystring.parse(str1); // { foo: 'bar', abc: [ 'xyz', '123' ] }

  var str2 = 'foo=bar@abc=xyz@abc=123';
  querystring.parse(str2, '@'); // { foo: 'bar', abc: [ 'xyz', '123' ] }

  var str3 = 'foo-bar@abc-xyz@abc-123';
  querystring.parse(str3, '@', '-'); // { foo: 'bar', abc: [ 'xyz', '123' ] }
```

### stringify
> querystring.stringify(obj, step, eq, options);
> * obj 必填，要序列化成 URL 查询字符串的对象, 如果有中文，默认会进行 UTF-8 编码，如果需要使用其他编码，则需要指定 encodeURIComponent 选项
> * step 选填，用于界定查询字符串中的键值对的子字符串， 默认为 '&'
> * eq 选填，用于界定查询字符串中的键与值的子字符串。默认为 '='
> * options: { <br>
>     &ensp; encodeURIComponent: <Function> 解码查询字符串的字符时使用的函数。默认为 querystring.escape(), <br>
>   }

```
   var obj1 = { foo: 'bar', abc: [ 'xyz', '123' ] };

   querystring.stringify(obj1); // foo=bar&abc=xyz&abc=123
   querystring.stringify(obj1, '@'); // foo=bar@abc=xyz@abc=123
   querystring.stringify(obj1, '@', '-'); // foo-bar@abc-xyz@abc-123
```

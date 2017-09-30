# memoizee-decorator

ES7 function decorator wrapper for the memoizee library (https://github.com/medikoo/memoizee).

Based on memoize-decorator (https://github.com/andreypopp/memoize-decorator). Using memoizee enables support for functions with arguments.

Also passes through memoizee options. For functions with parameters with default values, you have to set the length option explicitly, or use the option { length: false }

## Usage
```js
import memoize from 'memoizee-decorator';

class Foo {
  @memoize
  get bar() {
    console.log('Complicated calculations...');
    return 42;
  }

  @memoize({length:1})
  someFunc(num=21) {
    console.log('Complicated calculations...');
    return num;
  }

}
```

Can be used either plain ___@memoize___ or with options ___@memoize({...options})___

As with all decorators, you have to use a transpiler. Refer to https://github.com/andreypopp/autobind-decorator#autobind-decorator for prerequisites.
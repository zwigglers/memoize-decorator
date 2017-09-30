/**
 * Original Code
 * @copyright 2015, Andrey Popp <8mayday@gmail.com>
 * Modifications
 * @copyright 2017, zwigglers <zwigglers@gmail.com>
 */

import memoizee from 'memoizee';

const SENTINEL = {};


export default function memoize(...args) {
  let scope = {options:{}};

  // no arguments
  if(args.length == 3) {
    return _memoize.apply(scope, args);
  // has options argument
  } else if(args.length==1) {
    scope.options = args[0];
    return _memoize.bind(scope);
  } else {
    throw new Error('Unknown number of arguments');
  }
};

function _memoize(target, name, descriptor) {
  if (typeof descriptor.value === 'function') {
    return _memoizeMethod(target, name, descriptor, this.options);
  } else if (typeof descriptor.get === 'function') {
    return _memoizeGetter(target, name, descriptor, this.options);
  } else {
    throw new Error('@memoize decorator can be applied to methods or getters, got ' + String(descriptor.value) + ' instead');
  }
}

function _memoizeGetter(target, name, descriptor, options) {
  let memoizedName = `_memoized_${name}`;
  let get = descriptor.get;
  target[memoizedName] = SENTINEL;
  return {
    ...descriptor,
    get() {
      if (this[memoizedName] === SENTINEL) {
        this[memoizedName] = memoizee(get, options);
      }
      return this[memoizedName].call(this);
    }
  };
}

function _memoizeMethod(target, name, descriptor, options) {
  let memoizedName = `_memoized_${name}`;
  let value = descriptor.value;
  target[memoizedName] = SENTINEL;
  return {
    ...descriptor,
    value(...args) {
      if (this[memoizedName] === SENTINEL) {
        this[memoizedName] = memoizee(value, options);
      }
      return this[memoizedName].call(this, ...args);
    }
  };
}

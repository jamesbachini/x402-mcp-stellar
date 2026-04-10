import * as nearAPI from 'near-api-js';
import { utils, providers } from 'near-api-js';
import { JsonRpcProvider } from 'near-api-js/lib/providers';
import { EventEmitter as EventEmitter$1 } from 'events';
import { BehaviorSubject, Subject, scan } from 'rxjs';
import { serialize } from 'borsh';
import { sha256 } from 'js-sha256';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

class Provider {
  constructor(urls) {
    this.provider = new nearAPI.providers.FailoverRpcProvider(this.urlsToProviders(urls));
  }
  query(paramsOrPath, data) {
    if (typeof paramsOrPath === "string" && data !== undefined) {
      return this.provider.query(paramsOrPath, data);
    } else {
      return this.provider.query(paramsOrPath);
    }
  }
  viewAccessKey({
    accountId,
    publicKey
  }) {
    return this.query({
      request_type: "view_access_key",
      finality: "final",
      account_id: accountId,
      public_key: publicKey
    });
  }
  block(reference) {
    return this.provider.block(reference);
  }
  sendTransaction(signedTransaction) {
    return this.provider.sendTransaction(signedTransaction);
  }
  urlsToProviders(urls) {
    return urls && urls.length > 0 ? urls.map(url => new JsonRpcProvider({
      url
    })) : [];
  }
}

const KEY_DELIMITER = ":";
class JsonStorage {
  constructor(storage, namespace) {
    this.storage = storage;
    this.namespace = Array.isArray(namespace) ? namespace.join(KEY_DELIMITER) : namespace;
  }
  resolveKey(key) {
    return [this.namespace, key].join(KEY_DELIMITER);
  }
  getItem(key) {
    return this.storage.getItem(this.resolveKey(key)).then(item => {
      return typeof item === "string" ? JSON.parse(item) : null;
    });
  }
  setItem(key, value) {
    return this.storage.setItem(this.resolveKey(key), JSON.stringify(value));
  }
  removeItem(key) {
    return this.storage.removeItem(this.resolveKey(key));
  }
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global$n =
  // eslint-disable-next-line no-undef
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
  // eslint-disable-next-line no-new-func
  Function('return this')();

var objectGetOwnPropertyDescriptor = {};

var fails$h = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

var fails$g = fails$h;

// Thank's IE8 for his funny defineProperty
var descriptors = !fails$g(function () {
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});

var objectPropertyIsEnumerable = {};

var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor$2 && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor$2(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;

var createPropertyDescriptor$4 = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var toString = {}.toString;

var classofRaw$1 = function (it) {
  return toString.call(it).slice(8, -1);
};

var fails$f = fails$h;
var classof$9 = classofRaw$1;

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var indexedObject = fails$f(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof$9(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;

// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible$4 = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};

// toObject with fallback for non-array-like ES3 strings
var IndexedObject$3 = indexedObject;
var requireObjectCoercible$3 = requireObjectCoercible$4;

var toIndexedObject$4 = function (it) {
  return IndexedObject$3(requireObjectCoercible$3(it));
};

var isObject$c = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var isObject$b = isObject$c;

// `ToPrimitive` abstract operation
// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var toPrimitive$3 = function (input, PREFERRED_STRING) {
  if (!isObject$b(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject$b(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject$b(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject$b(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var hasOwnProperty = {}.hasOwnProperty;

var has$c = function (it, key) {
  return hasOwnProperty.call(it, key);
};

var global$m = global$n;
var isObject$a = isObject$c;

var document$2 = global$m.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject$a(document$2) && isObject$a(document$2.createElement);

var documentCreateElement$1 = function (it) {
  return EXISTS ? document$2.createElement(it) : {};
};

var DESCRIPTORS$a = descriptors;
var fails$e = fails$h;
var createElement$1 = documentCreateElement$1;

// Thank's IE8 for his funny defineProperty
var ie8DomDefine = !DESCRIPTORS$a && !fails$e(function () {
  return Object.defineProperty(createElement$1('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});

var DESCRIPTORS$9 = descriptors;
var propertyIsEnumerableModule$1 = objectPropertyIsEnumerable;
var createPropertyDescriptor$3 = createPropertyDescriptor$4;
var toIndexedObject$3 = toIndexedObject$4;
var toPrimitive$2 = toPrimitive$3;
var has$b = has$c;
var IE8_DOM_DEFINE$1 = ie8DomDefine;

var nativeGetOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
objectGetOwnPropertyDescriptor.f = DESCRIPTORS$9 ? nativeGetOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject$3(O);
  P = toPrimitive$2(P, true);
  if (IE8_DOM_DEFINE$1) try {
    return nativeGetOwnPropertyDescriptor$1(O, P);
  } catch (error) { /* empty */ }
  if (has$b(O, P)) return createPropertyDescriptor$3(!propertyIsEnumerableModule$1.f.call(O, P), O[P]);
};

var objectDefineProperty = {};

var isObject$9 = isObject$c;

var anObject$b = function (it) {
  if (!isObject$9(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};

var DESCRIPTORS$8 = descriptors;
var IE8_DOM_DEFINE = ie8DomDefine;
var anObject$a = anObject$b;
var toPrimitive$1 = toPrimitive$3;

var nativeDefineProperty$1 = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
objectDefineProperty.f = DESCRIPTORS$8 ? nativeDefineProperty$1 : function defineProperty(O, P, Attributes) {
  anObject$a(O);
  P = toPrimitive$1(P, true);
  anObject$a(Attributes);
  if (IE8_DOM_DEFINE) try {
    return nativeDefineProperty$1(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var DESCRIPTORS$7 = descriptors;
var definePropertyModule$5 = objectDefineProperty;
var createPropertyDescriptor$2 = createPropertyDescriptor$4;

var createNonEnumerableProperty$a = DESCRIPTORS$7 ? function (object, key, value) {
  return definePropertyModule$5.f(object, key, createPropertyDescriptor$2(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var redefine$5 = {exports: {}};

var global$l = global$n;
var createNonEnumerableProperty$9 = createNonEnumerableProperty$a;

var setGlobal$3 = function (key, value) {
  try {
    createNonEnumerableProperty$9(global$l, key, value);
  } catch (error) {
    global$l[key] = value;
  } return value;
};

var global$k = global$n;
var setGlobal$2 = setGlobal$3;

var SHARED = '__core-js_shared__';
var store$3 = global$k[SHARED] || setGlobal$2(SHARED, {});

var sharedStore = store$3;

var store$2 = sharedStore;

var functionToString = Function.toString;

// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof store$2.inspectSource != 'function') {
  store$2.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

var inspectSource$3 = store$2.inspectSource;

var global$j = global$n;
var inspectSource$2 = inspectSource$3;

var WeakMap$1 = global$j.WeakMap;

var nativeWeakMap = typeof WeakMap$1 === 'function' && /native code/.test(inspectSource$2(WeakMap$1));

var shared$2 = {exports: {}};

var store$1 = sharedStore;

(shared$2.exports = function (key, value) {
  return store$1[key] || (store$1[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.6.5',
  mode: 'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});

var id = 0;
var postfix = Math.random();

var uid$3 = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};

var shared$1 = shared$2.exports;
var uid$2 = uid$3;

var keys$1 = shared$1('keys');

var sharedKey$3 = function (key) {
  return keys$1[key] || (keys$1[key] = uid$2(key));
};

var hiddenKeys$4 = {};

var NATIVE_WEAK_MAP = nativeWeakMap;
var global$i = global$n;
var isObject$8 = isObject$c;
var createNonEnumerableProperty$8 = createNonEnumerableProperty$a;
var objectHas = has$c;
var sharedKey$2 = sharedKey$3;
var hiddenKeys$3 = hiddenKeys$4;

var WeakMap = global$i.WeakMap;
var set$2, get$1, has$a;

var enforce = function (it) {
  return has$a(it) ? get$1(it) : set$2(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject$8(it) || (state = get$1(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP) {
  var store = new WeakMap();
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set$2 = function (it, metadata) {
    wmset.call(store, it, metadata);
    return metadata;
  };
  get$1 = function (it) {
    return wmget.call(store, it) || {};
  };
  has$a = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey$2('state');
  hiddenKeys$3[STATE] = true;
  set$2 = function (it, metadata) {
    createNonEnumerableProperty$8(it, STATE, metadata);
    return metadata;
  };
  get$1 = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has$a = function (it) {
    return objectHas(it, STATE);
  };
}

var internalState = {
  set: set$2,
  get: get$1,
  has: has$a,
  enforce: enforce,
  getterFor: getterFor
};

var global$h = global$n;
var createNonEnumerableProperty$7 = createNonEnumerableProperty$a;
var has$9 = has$c;
var setGlobal$1 = setGlobal$3;
var inspectSource$1 = inspectSource$3;
var InternalStateModule$4 = internalState;

var getInternalState$4 = InternalStateModule$4.get;
var enforceInternalState = InternalStateModule$4.enforce;
var TEMPLATE = String(String).split('String');

(redefine$5.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has$9(value, 'name')) createNonEnumerableProperty$7(value, 'name', key);
    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
  }
  if (O === global$h) {
    if (simple) O[key] = value;
    else setGlobal$1(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty$7(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState$4(this).source || inspectSource$1(this);
});

var global$g = global$n;

var path$1 = global$g;

var path = path$1;
var global$f = global$n;

var aFunction$6 = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

var getBuiltIn$5 = function (namespace, method) {
  return arguments.length < 2 ? aFunction$6(path[namespace]) || aFunction$6(global$f[namespace])
    : path[namespace] && path[namespace][method] || global$f[namespace] && global$f[namespace][method];
};

var objectGetOwnPropertyNames = {};

var ceil = Math.ceil;
var floor$1 = Math.floor;

// `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger
var toInteger$5 = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor$1 : ceil)(argument);
};

var toInteger$4 = toInteger$5;

var min$1 = Math.min;

// `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength
var toLength$b = function (argument) {
  return argument > 0 ? min$1(toInteger$4(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

var toInteger$3 = toInteger$5;

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
var toAbsoluteIndex$3 = function (index, length) {
  var integer = toInteger$3(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};

var toIndexedObject$2 = toIndexedObject$4;
var toLength$a = toLength$b;
var toAbsoluteIndex$2 = toAbsoluteIndex$3;

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod$3 = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject$2($this);
    var length = toLength$a(O.length);
    var index = toAbsoluteIndex$2(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var arrayIncludes = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod$3(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod$3(false)
};

var has$8 = has$c;
var toIndexedObject$1 = toIndexedObject$4;
var indexOf = arrayIncludes.indexOf;
var hiddenKeys$2 = hiddenKeys$4;

var objectKeysInternal = function (object, names) {
  var O = toIndexedObject$1(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has$8(hiddenKeys$2, key) && has$8(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has$8(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};

// IE8- don't enum bug keys
var enumBugKeys$3 = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];

var internalObjectKeys$1 = objectKeysInternal;
var enumBugKeys$2 = enumBugKeys$3;

var hiddenKeys$1 = enumBugKeys$2.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys$1(O, hiddenKeys$1);
};

var objectGetOwnPropertySymbols = {};

objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

var getBuiltIn$4 = getBuiltIn$5;
var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
var getOwnPropertySymbolsModule$1 = objectGetOwnPropertySymbols;
var anObject$9 = anObject$b;

// all object keys, includes non-enumerable and symbols
var ownKeys$1 = getBuiltIn$4('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject$9(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule$1.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};

var has$7 = has$c;
var ownKeys = ownKeys$1;
var getOwnPropertyDescriptorModule$1 = objectGetOwnPropertyDescriptor;
var definePropertyModule$4 = objectDefineProperty;

var copyConstructorProperties$1 = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule$4.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule$1.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has$7(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};

var fails$d = fails$h;

var replacement = /#|\.prototype\./;

var isForced$2 = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails$d(detection)
    : !!detection;
};

var normalize = isForced$2.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced$2.data = {};
var NATIVE = isForced$2.NATIVE = 'N';
var POLYFILL = isForced$2.POLYFILL = 'P';

var isForced_1 = isForced$2;

var global$e = global$n;
var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
var createNonEnumerableProperty$6 = createNonEnumerableProperty$a;
var redefine$4 = redefine$5.exports;
var setGlobal = setGlobal$3;
var copyConstructorProperties = copyConstructorProperties$1;
var isForced$1 = isForced_1;

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
var _export = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global$e;
  } else if (STATIC) {
    target = global$e[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global$e[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor$1(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced$1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty$6(sourceProperty, 'sham', true);
    }
    // extend global
    redefine$4(target, key, sourceProperty, options);
  }
};

var global$d = global$n;

var nativePromiseConstructor = global$d.Promise;

var redefine$3 = redefine$5.exports;

var redefineAll$2 = function (target, src, options) {
  for (var key in src) redefine$3(target, key, src[key], options);
  return target;
};

var fails$c = fails$h;

var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$c(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});

var NATIVE_SYMBOL$1 = nativeSymbol;

var useSymbolAsUid = NATIVE_SYMBOL$1
  // eslint-disable-next-line no-undef
  && !Symbol.sham
  // eslint-disable-next-line no-undef
  && typeof Symbol.iterator == 'symbol';

var global$c = global$n;
var shared = shared$2.exports;
var has$6 = has$c;
var uid$1 = uid$3;
var NATIVE_SYMBOL = nativeSymbol;
var USE_SYMBOL_AS_UID = useSymbolAsUid;

var WellKnownSymbolsStore = shared('wks');
var Symbol$1 = global$c.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1;

var wellKnownSymbol$h = function (name) {
  if (!has$6(WellKnownSymbolsStore, name)) {
    if (NATIVE_SYMBOL && has$6(Symbol$1, name)) WellKnownSymbolsStore[name] = Symbol$1[name];
    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};

var defineProperty$4 = objectDefineProperty.f;
var has$5 = has$c;
var wellKnownSymbol$g = wellKnownSymbol$h;

var TO_STRING_TAG$4 = wellKnownSymbol$g('toStringTag');

var setToStringTag$4 = function (it, TAG, STATIC) {
  if (it && !has$5(it = STATIC ? it : it.prototype, TO_STRING_TAG$4)) {
    defineProperty$4(it, TO_STRING_TAG$4, { configurable: true, value: TAG });
  }
};

var getBuiltIn$3 = getBuiltIn$5;
var definePropertyModule$3 = objectDefineProperty;
var wellKnownSymbol$f = wellKnownSymbol$h;
var DESCRIPTORS$6 = descriptors;

var SPECIES$3 = wellKnownSymbol$f('species');

var setSpecies$2 = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn$3(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule$3.f;

  if (DESCRIPTORS$6 && Constructor && !Constructor[SPECIES$3]) {
    defineProperty(Constructor, SPECIES$3, {
      configurable: true,
      get: function () { return this; }
    });
  }
};

var aFunction$5 = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};

var anInstance$3 = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  } return it;
};

var iterate$2 = {exports: {}};

var iterators = {};

var wellKnownSymbol$e = wellKnownSymbol$h;
var Iterators$4 = iterators;

var ITERATOR$5 = wellKnownSymbol$e('iterator');
var ArrayPrototype$1 = Array.prototype;

// check on default Array iterator
var isArrayIteratorMethod$2 = function (it) {
  return it !== undefined && (Iterators$4.Array === it || ArrayPrototype$1[ITERATOR$5] === it);
};

var aFunction$4 = aFunction$5;

// optional / simple context binding
var functionBindContext = function (fn, that, length) {
  aFunction$4(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var wellKnownSymbol$d = wellKnownSymbol$h;

var TO_STRING_TAG$3 = wellKnownSymbol$d('toStringTag');
var test = {};

test[TO_STRING_TAG$3] = 'z';

var toStringTagSupport = String(test) === '[object z]';

var TO_STRING_TAG_SUPPORT = toStringTagSupport;
var classofRaw = classofRaw$1;
var wellKnownSymbol$c = wellKnownSymbol$h;

var TO_STRING_TAG$2 = wellKnownSymbol$c('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
var classof$8 = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$2)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};

var classof$7 = classof$8;
var Iterators$3 = iterators;
var wellKnownSymbol$b = wellKnownSymbol$h;

var ITERATOR$4 = wellKnownSymbol$b('iterator');

var getIteratorMethod$2 = function (it) {
  if (it != undefined) return it[ITERATOR$4]
    || it['@@iterator']
    || Iterators$3[classof$7(it)];
};

var anObject$8 = anObject$b;

// call something on iterator step with safe closing on error
var callWithSafeIterationClosing$1 = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject$8(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (error) {
    var returnMethod = iterator['return'];
    if (returnMethod !== undefined) anObject$8(returnMethod.call(iterator));
    throw error;
  }
};

var anObject$7 = anObject$b;
var isArrayIteratorMethod$1 = isArrayIteratorMethod$2;
var toLength$9 = toLength$b;
var bind$4 = functionBindContext;
var getIteratorMethod$1 = getIteratorMethod$2;
var callWithSafeIterationClosing = callWithSafeIterationClosing$1;

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var iterate$1 = iterate$2.exports = function (iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
  var boundFunction = bind$4(fn, that, AS_ENTRIES ? 2 : 1);
  var iterator, iterFn, index, length, result, next, step;

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod$1(iterable);
    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod$1(iterFn)) {
      for (index = 0, length = toLength$9(iterable.length); length > index; index++) {
        result = AS_ENTRIES
          ? boundFunction(anObject$7(step = iterable[index])[0], step[1])
          : boundFunction(iterable[index]);
        if (result && result instanceof Result) return result;
      } return new Result(false);
    }
    iterator = iterFn.call(iterable);
  }

  next = iterator.next;
  while (!(step = next.call(iterator)).done) {
    result = callWithSafeIterationClosing(iterator, boundFunction, step.value, AS_ENTRIES);
    if (typeof result == 'object' && result && result instanceof Result) return result;
  } return new Result(false);
};

iterate$1.stop = function (result) {
  return new Result(true, result);
};

var wellKnownSymbol$a = wellKnownSymbol$h;

var ITERATOR$3 = wellKnownSymbol$a('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR$3] = function () {
    return this;
  };
  // eslint-disable-next-line no-throw-literal
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

var checkCorrectnessOfIteration$2 = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR$3] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};

var anObject$6 = anObject$b;
var aFunction$3 = aFunction$5;
var wellKnownSymbol$9 = wellKnownSymbol$h;

var SPECIES$2 = wellKnownSymbol$9('species');

// `SpeciesConstructor` abstract operation
// https://tc39.github.io/ecma262/#sec-speciesconstructor
var speciesConstructor$2 = function (O, defaultConstructor) {
  var C = anObject$6(O).constructor;
  var S;
  return C === undefined || (S = anObject$6(C)[SPECIES$2]) == undefined ? defaultConstructor : aFunction$3(S);
};

var getBuiltIn$2 = getBuiltIn$5;

var html$2 = getBuiltIn$2('document', 'documentElement');

var getBuiltIn$1 = getBuiltIn$5;

var engineUserAgent = getBuiltIn$1('navigator', 'userAgent') || '';

var userAgent$1 = engineUserAgent;

var engineIsIos = /(iphone|ipod|ipad).*applewebkit/i.test(userAgent$1);

var global$b = global$n;
var fails$b = fails$h;
var classof$6 = classofRaw$1;
var bind$3 = functionBindContext;
var html$1 = html$2;
var createElement = documentCreateElement$1;
var IS_IOS$1 = engineIsIos;

var location = global$b.location;
var set$1 = global$b.setImmediate;
var clear = global$b.clearImmediate;
var process$3 = global$b.process;
var MessageChannel = global$b.MessageChannel;
var Dispatch = global$b.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;

var run = function (id) {
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};

var runner = function (id) {
  return function () {
    run(id);
  };
};

var listener = function (event) {
  run(event.data);
};

var post = function (id) {
  // old engines have not location.origin
  global$b.postMessage(id + '', location.protocol + '//' + location.host);
};

// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set$1 || !clear) {
  set$1 = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
    };
    defer(counter);
    return counter;
  };
  clear = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (classof$6(process$3) == 'process') {
    defer = function (id) {
      process$3.nextTick(runner(id));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id));
    };
  // Browsers with MessageChannel, includes WebWorkers
  // except iOS - https://github.com/zloirock/core-js/issues/624
  } else if (MessageChannel && !IS_IOS$1) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = bind$3(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (
    global$b.addEventListener &&
    typeof postMessage == 'function' &&
    !global$b.importScripts &&
    !fails$b(post) &&
    location.protocol !== 'file:'
  ) {
    defer = post;
    global$b.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in createElement('script')) {
    defer = function (id) {
      html$1.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
        html$1.removeChild(this);
        run(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(runner(id), 0);
    };
  }
}

var task$1 = {
  set: set$1,
  clear: clear
};

var global$a = global$n;
var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
var classof$5 = classofRaw$1;
var macrotask = task$1.set;
var IS_IOS = engineIsIos;

var MutationObserver = global$a.MutationObserver || global$a.WebKitMutationObserver;
var process$2 = global$a.process;
var Promise$1 = global$a.Promise;
var IS_NODE$1 = classof$5(process$2) == 'process';
// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global$a, 'queueMicrotask');
var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

var flush, head, last, notify$1, toggle, node, promise, then;

// modern engines have queueMicrotask method
if (!queueMicrotask) {
  flush = function () {
    var parent, fn;
    if (IS_NODE$1 && (parent = process$2.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (error) {
        if (head) notify$1();
        else last = undefined;
        throw error;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (IS_NODE$1) {
    notify$1 = function () {
      process$2.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
  } else if (MutationObserver && !IS_IOS) {
    toggle = true;
    node = document.createTextNode('');
    new MutationObserver(flush).observe(node, { characterData: true });
    notify$1 = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise$1 && Promise$1.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise$1.resolve(undefined);
    then = promise.then;
    notify$1 = function () {
      then.call(promise, flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify$1 = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global$a, flush);
    };
  }
}

var microtask$1 = queueMicrotask || function (fn) {
  var task = { fn: fn, next: undefined };
  if (last) last.next = task;
  if (!head) {
    head = task;
    notify$1();
  } last = task;
};

var newPromiseCapability$2 = {};

var aFunction$2 = aFunction$5;

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction$2(resolve);
  this.reject = aFunction$2(reject);
};

// 25.4.1.5 NewPromiseCapability(C)
newPromiseCapability$2.f = function (C) {
  return new PromiseCapability(C);
};

var anObject$5 = anObject$b;
var isObject$7 = isObject$c;
var newPromiseCapability$1 = newPromiseCapability$2;

var promiseResolve$1 = function (C, x) {
  anObject$5(C);
  if (isObject$7(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability$1.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

var global$9 = global$n;

var hostReportErrors$1 = function (a, b) {
  var console = global$9.console;
  if (console && console.error) {
    arguments.length === 1 ? console.error(a) : console.error(a, b);
  }
};

var perform$1 = function (exec) {
  try {
    return { error: false, value: exec() };
  } catch (error) {
    return { error: true, value: error };
  }
};

var global$8 = global$n;
var userAgent = engineUserAgent;

var process$1 = global$8.process;
var versions = process$1 && process$1.versions;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] + match[1];
} else if (userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

var engineV8Version = version && +version;

var $$9 = _export;
var global$7 = global$n;
var getBuiltIn = getBuiltIn$5;
var NativePromise = nativePromiseConstructor;
var redefine$2 = redefine$5.exports;
var redefineAll$1 = redefineAll$2;
var setToStringTag$3 = setToStringTag$4;
var setSpecies$1 = setSpecies$2;
var isObject$6 = isObject$c;
var aFunction$1 = aFunction$5;
var anInstance$2 = anInstance$3;
var classof$4 = classofRaw$1;
var inspectSource = inspectSource$3;
var iterate = iterate$2.exports;
var checkCorrectnessOfIteration$1 = checkCorrectnessOfIteration$2;
var speciesConstructor$1 = speciesConstructor$2;
var task = task$1.set;
var microtask = microtask$1;
var promiseResolve = promiseResolve$1;
var hostReportErrors = hostReportErrors$1;
var newPromiseCapabilityModule = newPromiseCapability$2;
var perform = perform$1;
var InternalStateModule$3 = internalState;
var isForced = isForced_1;
var wellKnownSymbol$8 = wellKnownSymbol$h;
var V8_VERSION = engineV8Version;

var SPECIES$1 = wellKnownSymbol$8('species');
var PROMISE = 'Promise';
var getInternalState$3 = InternalStateModule$3.get;
var setInternalState$3 = InternalStateModule$3.set;
var getInternalPromiseState = InternalStateModule$3.getterFor(PROMISE);
var PromiseConstructor = NativePromise;
var TypeError$1 = global$7.TypeError;
var document$1 = global$7.document;
var process = global$7.process;
var $fetch = getBuiltIn('fetch');
var newPromiseCapability = newPromiseCapabilityModule.f;
var newGenericPromiseCapability = newPromiseCapability;
var IS_NODE = classof$4(process) == 'process';
var DISPATCH_EVENT = !!(document$1 && document$1.createEvent && global$7.dispatchEvent);
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;
var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

var FORCED$2 = isForced(PROMISE, function () {
  var GLOBAL_CORE_JS_PROMISE = inspectSource(PromiseConstructor) !== String(PromiseConstructor);
  if (!GLOBAL_CORE_JS_PROMISE) {
    // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
    // We can't detect it synchronously, so just check versions
    if (V8_VERSION === 66) return true;
    // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    if (!IS_NODE && typeof PromiseRejectionEvent != 'function') return true;
  }
  // We can't use @@species feature detection in V8 since it causes
  // deoptimization and performance degradation
  // https://github.com/zloirock/core-js/issues/679
  if (V8_VERSION >= 51 && /native code/.test(PromiseConstructor)) return false;
  // Detect correctness of subclassing with @@species support
  var promise = PromiseConstructor.resolve(1);
  var FakePromise = function (exec) {
    exec(function () { /* empty */ }, function () { /* empty */ });
  };
  var constructor = promise.constructor = {};
  constructor[SPECIES$1] = FakePromise;
  return !(promise.then(function () { /* empty */ }) instanceof FakePromise);
});

var INCORRECT_ITERATION = FORCED$2 || !checkCorrectnessOfIteration$1(function (iterable) {
  PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
});

// helpers
var isThenable = function (it) {
  var then;
  return isObject$6(it) && typeof (then = it.then) == 'function' ? then : false;
};

var notify = function (promise, state, isReject) {
  if (state.notified) return;
  state.notified = true;
  var chain = state.reactions;
  microtask(function () {
    var value = state.value;
    var ok = state.state == FULFILLED;
    var index = 0;
    // variable length - can't use forEach
    while (chain.length > index) {
      var reaction = chain[index++];
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (state.rejection === UNHANDLED) onHandleUnhandled(promise, state);
            state.rejection = HANDLED;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // can throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError$1('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (error) {
        if (domain && !exited) domain.exit();
        reject(error);
      }
    }
    state.reactions = [];
    state.notified = false;
    if (isReject && !state.rejection) onUnhandled(promise, state);
  });
};

var dispatchEvent = function (name, promise, reason) {
  var event, handler;
  if (DISPATCH_EVENT) {
    event = document$1.createEvent('Event');
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    global$7.dispatchEvent(event);
  } else event = { promise: promise, reason: reason };
  if (handler = global$7['on' + name]) handler(event);
  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function (promise, state) {
  task.call(global$7, function () {
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;
    if (IS_UNHANDLED) {
      result = perform(function () {
        if (IS_NODE) {
          process.emit('unhandledRejection', value, promise);
        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error) throw result.value;
    }
  });
};

var isUnhandled = function (state) {
  return state.rejection !== HANDLED && !state.parent;
};

var onHandleUnhandled = function (promise, state) {
  task.call(global$7, function () {
    if (IS_NODE) {
      process.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind$2 = function (fn, promise, state, unwrap) {
  return function (value) {
    fn(promise, state, value, unwrap);
  };
};

var internalReject = function (promise, state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify(promise, state, true);
};

var internalResolve = function (promise, state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  try {
    if (promise === value) throw TypeError$1("Promise can't be resolved itself");
    var then = isThenable(value);
    if (then) {
      microtask(function () {
        var wrapper = { done: false };
        try {
          then.call(value,
            bind$2(internalResolve, promise, wrapper, state),
            bind$2(internalReject, promise, wrapper, state)
          );
        } catch (error) {
          internalReject(promise, wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify(promise, state, false);
    }
  } catch (error) {
    internalReject(promise, { done: false }, error, state);
  }
};

// constructor polyfill
if (FORCED$2) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance$2(this, PromiseConstructor, PROMISE);
    aFunction$1(executor);
    Internal.call(this);
    var state = getInternalState$3(this);
    try {
      executor(bind$2(internalResolve, this, state), bind$2(internalReject, this, state));
    } catch (error) {
      internalReject(this, state, error);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    setInternalState$3(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: [],
      rejection: false,
      state: PENDING,
      value: undefined
    });
  };
  Internal.prototype = redefineAll$1(PromiseConstructor.prototype, {
    // `Promise.prototype.then` method
    // https://tc39.github.io/ecma262/#sec-promise.prototype.then
    then: function then(onFulfilled, onRejected) {
      var state = getInternalPromiseState(this);
      var reaction = newPromiseCapability(speciesConstructor$1(this, PromiseConstructor));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = IS_NODE ? process.domain : undefined;
      state.parent = true;
      state.reactions.push(reaction);
      if (state.state != PENDING) notify(this, state, false);
      return reaction.promise;
    },
    // `Promise.prototype.catch` method
    // https://tc39.github.io/ecma262/#sec-promise.prototype.catch
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    var state = getInternalState$3(promise);
    this.promise = promise;
    this.resolve = bind$2(internalResolve, promise, state);
    this.reject = bind$2(internalReject, promise, state);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === PromiseConstructor || C === PromiseWrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };

  if (typeof NativePromise == 'function') {
    nativeThen = NativePromise.prototype.then;

    // wrap native Promise#then for native async functions
    redefine$2(NativePromise.prototype, 'then', function then(onFulfilled, onRejected) {
      var that = this;
      return new PromiseConstructor(function (resolve, reject) {
        nativeThen.call(that, resolve, reject);
      }).then(onFulfilled, onRejected);
    // https://github.com/zloirock/core-js/issues/640
    }, { unsafe: true });

    // wrap fetch result
    if (typeof $fetch == 'function') $$9({ global: true, enumerable: true, forced: true }, {
      // eslint-disable-next-line no-unused-vars
      fetch: function fetch(input /* , init */) {
        return promiseResolve(PromiseConstructor, $fetch.apply(global$7, arguments));
      }
    });
  }
}

$$9({ global: true, wrap: true, forced: FORCED$2 }, {
  Promise: PromiseConstructor
});

setToStringTag$3(PromiseConstructor, PROMISE, false);
setSpecies$1(PROMISE);

PromiseWrapper = getBuiltIn(PROMISE);

// statics
$$9({ target: PROMISE, stat: true, forced: FORCED$2 }, {
  // `Promise.reject` method
  // https://tc39.github.io/ecma262/#sec-promise.reject
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    capability.reject.call(undefined, r);
    return capability.promise;
  }
});

$$9({ target: PROMISE, stat: true, forced: FORCED$2 }, {
  // `Promise.resolve` method
  // https://tc39.github.io/ecma262/#sec-promise.resolve
  resolve: function resolve(x) {
    return promiseResolve(this, x);
  }
});

$$9({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
  // `Promise.all` method
  // https://tc39.github.io/ecma262/#sec-promise.all
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction$1(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        $promiseResolve.call(C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  },
  // `Promise.race` method
  // https://tc39.github.io/ecma262/#sec-promise.race
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction$1(C.resolve);
      iterate(iterable, function (promise) {
        $promiseResolve.call(C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

class WebStorageService {
  getItem(key) {
    return new Promise(resolve => {
      const value = localStorage.getItem(key);
      resolve(value);
    });
  }
  setItem(key, value) {
    return new Promise(resolve => {
      localStorage.setItem(key, value);
      resolve();
    });
  }
  removeItem(key) {
    return new Promise(resolve => {
      localStorage.removeItem(key);
      resolve();
    });
  }
}

var internalObjectKeys = objectKeysInternal;
var enumBugKeys$1 = enumBugKeys$3;

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
var objectKeys$2 = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys$1);
};

var DESCRIPTORS$5 = descriptors;
var definePropertyModule$2 = objectDefineProperty;
var anObject$4 = anObject$b;
var objectKeys$1 = objectKeys$2;

// `Object.defineProperties` method
// https://tc39.github.io/ecma262/#sec-object.defineproperties
var objectDefineProperties = DESCRIPTORS$5 ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject$4(O);
  var keys = objectKeys$1(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule$2.f(O, key = keys[index++], Properties[key]);
  return O;
};

var anObject$3 = anObject$b;
var defineProperties = objectDefineProperties;
var enumBugKeys = enumBugKeys$3;
var hiddenKeys = hiddenKeys$4;
var html = html$2;
var documentCreateElement = documentCreateElement$1;
var sharedKey$1 = sharedKey$3;

var GT = '>';
var LT = '<';
var PROTOTYPE$1 = 'prototype';
var SCRIPT = 'script';
var IE_PROTO$1 = sharedKey$1('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    /* global ActiveXObject */
    activeXDocument = document.domain && new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE$1][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO$1] = true;

// `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create
var objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE$1] = anObject$3(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE$1] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO$1] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : defineProperties(result, Properties);
};

var wellKnownSymbol$7 = wellKnownSymbol$h;
var create$2 = objectCreate;
var definePropertyModule$1 = objectDefineProperty;

var UNSCOPABLES = wellKnownSymbol$7('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  definePropertyModule$1.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create$2(null)
  });
}

// add a key to Array.prototype[@@unscopables]
var addToUnscopables$2 = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};

var requireObjectCoercible$2 = requireObjectCoercible$4;

// `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject
var toObject$7 = function (argument) {
  return Object(requireObjectCoercible$2(argument));
};

var fails$a = fails$h;

var correctPrototypeGetter = !fails$a(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  return Object.getPrototypeOf(new F()) !== F.prototype;
});

var has$4 = has$c;
var toObject$6 = toObject$7;
var sharedKey = sharedKey$3;
var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

var IE_PROTO = sharedKey('IE_PROTO');
var ObjectPrototype$2 = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof
var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
  O = toObject$6(O);
  if (has$4(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectPrototype$2 : null;
};

var getPrototypeOf$3 = objectGetPrototypeOf;
var createNonEnumerableProperty$5 = createNonEnumerableProperty$a;
var has$3 = has$c;
var wellKnownSymbol$6 = wellKnownSymbol$h;

var ITERATOR$2 = wellKnownSymbol$6('iterator');
var BUGGY_SAFARI_ITERATORS$1 = false;

var returnThis$2 = function () { return this; };

// `%IteratorPrototype%` object
// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;

if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf$3(getPrototypeOf$3(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
  }
}

if (IteratorPrototype$2 == undefined) IteratorPrototype$2 = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
if (!has$3(IteratorPrototype$2, ITERATOR$2)) {
  createNonEnumerableProperty$5(IteratorPrototype$2, ITERATOR$2, returnThis$2);
}

var iteratorsCore = {
  IteratorPrototype: IteratorPrototype$2,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
};

var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
var create$1 = objectCreate;
var createPropertyDescriptor$1 = createPropertyDescriptor$4;
var setToStringTag$2 = setToStringTag$4;
var Iterators$2 = iterators;

var returnThis$1 = function () { return this; };

var createIteratorConstructor$1 = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create$1(IteratorPrototype$1, { next: createPropertyDescriptor$1(1, next) });
  setToStringTag$2(IteratorConstructor, TO_STRING_TAG, false);
  Iterators$2[TO_STRING_TAG] = returnThis$1;
  return IteratorConstructor;
};

var isObject$5 = isObject$c;

var aPossiblePrototype$1 = function (it) {
  if (!isObject$5(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};

var anObject$2 = anObject$b;
var aPossiblePrototype = aPossiblePrototype$1;

// `Object.setPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject$2(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);

var $$8 = _export;
var createIteratorConstructor = createIteratorConstructor$1;
var getPrototypeOf$2 = objectGetPrototypeOf;
var setPrototypeOf$4 = objectSetPrototypeOf;
var setToStringTag$1 = setToStringTag$4;
var createNonEnumerableProperty$4 = createNonEnumerableProperty$a;
var redefine$1 = redefine$5.exports;
var wellKnownSymbol$5 = wellKnownSymbol$h;
var Iterators$1 = iterators;
var IteratorsCore = iteratorsCore;

var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR$1 = wellKnownSymbol$5('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

var defineIterator$1 = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR$1]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf$2(anyNativeIterator.call(new Iterable()));
    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (getPrototypeOf$2(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf$4) {
          setPrototypeOf$4(CurrentIteratorPrototype, IteratorPrototype);
        } else if (typeof CurrentIteratorPrototype[ITERATOR$1] != 'function') {
          createNonEnumerableProperty$4(CurrentIteratorPrototype, ITERATOR$1, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag$1(CurrentIteratorPrototype, TO_STRING_TAG, true);
    }
  }

  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;
    defaultIterator = function values() { return nativeIterator.call(this); };
  }

  // define iterator
  if (IterablePrototype[ITERATOR$1] !== defaultIterator) {
    createNonEnumerableProperty$4(IterablePrototype, ITERATOR$1, defaultIterator);
  }
  Iterators$1[NAME] = defaultIterator;

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine$1(IterablePrototype, KEY, methods[KEY]);
      }
    } else $$8({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  return methods;
};

var toIndexedObject = toIndexedObject$4;
var addToUnscopables$1 = addToUnscopables$2;
var Iterators = iterators;
var InternalStateModule$2 = internalState;
var defineIterator = defineIterator$1;

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState$2 = InternalStateModule$2.set;
var getInternalState$2 = InternalStateModule$2.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.github.io/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.github.io/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.github.io/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.github.io/ecma262/#sec-createarrayiterator
var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState$2(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState$2(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject
Iterators.Arguments = Iterators.Array;

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables$1('keys');
addToUnscopables$1('values');
addToUnscopables$1('entries');

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
var domIterables = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};

var global$6 = global$n;
var DOMIterables = domIterables;
var ArrayIteratorMethods = es_array_iterator;
var createNonEnumerableProperty$3 = createNonEnumerableProperty$a;
var wellKnownSymbol$4 = wellKnownSymbol$h;

var ITERATOR = wellKnownSymbol$4('iterator');
var TO_STRING_TAG$1 = wellKnownSymbol$4('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global$6[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
      createNonEnumerableProperty$3(CollectionPrototype, ITERATOR, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR] = ArrayValues;
    }
    if (!CollectionPrototype[TO_STRING_TAG$1]) {
      createNonEnumerableProperty$3(CollectionPrototype, TO_STRING_TAG$1, COLLECTION_NAME);
    }
    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        createNonEnumerableProperty$3(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
}

class Logger {
  constructor(namespace) {
    this.namespace = namespace;
  }
  emit(method, ...params) {
    if (!Logger.debug) {
      return;
    }
    if (this.namespace && method !== "error") {
      // eslint-disable-next-line no-console
      console[method](this.namespace, ...params);
      return;
    }
    // eslint-disable-next-line no-console
    console[method](...params);
  }
  log(...params) {
    this.emit("log", ...params);
  }
  info(...params) {
    this.emit("info", ...params);
  }
  warn(...params) {
    this.emit("warn", ...params);
  }
  error(...params) {
    this.emit("error", ...params);
  }
}
Logger.debug = false;
const logger = new Logger();

var DESCRIPTORS$4 = descriptors;
var fails$9 = fails$h;
var has$2 = has$c;

var defineProperty$3 = Object.defineProperty;
var cache = {};

var thrower = function (it) { throw it; };

var arrayMethodUsesToLength$2 = function (METHOD_NAME, options) {
  if (has$2(cache, METHOD_NAME)) return cache[METHOD_NAME];
  if (!options) options = {};
  var method = [][METHOD_NAME];
  var ACCESSORS = has$2(options, 'ACCESSORS') ? options.ACCESSORS : false;
  var argument0 = has$2(options, 0) ? options[0] : thrower;
  var argument1 = has$2(options, 1) ? options[1] : undefined;

  return cache[METHOD_NAME] = !!method && !fails$9(function () {
    if (ACCESSORS && !DESCRIPTORS$4) return true;
    var O = { length: -1 };

    if (ACCESSORS) defineProperty$3(O, 1, { enumerable: true, get: thrower });
    else O[1] = 1;

    method.call(O, argument0, argument1);
  });
};

var $$7 = _export;
var $includes = arrayIncludes.includes;
var addToUnscopables = addToUnscopables$2;
var arrayMethodUsesToLength$1 = arrayMethodUsesToLength$2;

var USES_TO_LENGTH$1 = arrayMethodUsesToLength$1('indexOf', { ACCESSORS: true, 1: 0 });

// `Array.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-array.prototype.includes
$$7({ target: 'Array', proto: true, forced: !USES_TO_LENGTH$1 }, {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('includes');

var DESCRIPTORS$3 = descriptors;
var fails$8 = fails$h;
var objectKeys = objectKeys$2;
var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
var propertyIsEnumerableModule = objectPropertyIsEnumerable;
var toObject$5 = toObject$7;
var IndexedObject$2 = indexedObject;

var nativeAssign = Object.assign;
var defineProperty$2 = Object.defineProperty;

// `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign
var objectAssign = !nativeAssign || fails$8(function () {
  // should have correct order of operations (Edge bug)
  if (DESCRIPTORS$3 && nativeAssign({ b: 1 }, nativeAssign(defineProperty$2({}, 'a', {
    enumerable: true,
    get: function () {
      defineProperty$2(this, 'b', {
        value: 3,
        enumerable: false
      });
    }
  }), { b: 2 })).b !== 1) return true;
  // should work with symbols and should have deterministic property order (V8 bug)
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
  return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject$5(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  var propertyIsEnumerable = propertyIsEnumerableModule.f;
  while (argumentsLength > index) {
    var S = IndexedObject$2(arguments[index++]);
    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS$3 || propertyIsEnumerable.call(S, key)) T[key] = S[key];
    }
  } return T;
} : nativeAssign;

var $$6 = _export;
var assign = objectAssign;

// `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign
$$6({ target: 'Object', stat: true, forced: Object.assign !== assign }, {
  assign: assign
});

var isObject$4 = isObject$c;
var classof$3 = classofRaw$1;
var wellKnownSymbol$3 = wellKnownSymbol$h;

var MATCH$1 = wellKnownSymbol$3('match');

// `IsRegExp` abstract operation
// https://tc39.github.io/ecma262/#sec-isregexp
var isRegexp = function (it) {
  var isRegExp;
  return isObject$4(it) && ((isRegExp = it[MATCH$1]) !== undefined ? !!isRegExp : classof$3(it) == 'RegExp');
};

var isRegExp = isRegexp;

var notARegexp = function (it) {
  if (isRegExp(it)) {
    throw TypeError("The method doesn't accept regular expressions");
  } return it;
};

var wellKnownSymbol$2 = wellKnownSymbol$h;

var MATCH = wellKnownSymbol$2('match');

var correctIsRegexpLogic = function (METHOD_NAME) {
  var regexp = /./;
  try {
    '/./'[METHOD_NAME](regexp);
  } catch (e) {
    try {
      regexp[MATCH] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (f) { /* empty */ }
  } return false;
};

var $$5 = _export;
var notARegExp = notARegexp;
var requireObjectCoercible$1 = requireObjectCoercible$4;
var correctIsRegExpLogic = correctIsRegexpLogic;

// `String.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-string.prototype.includes
$$5({ target: 'String', proto: true, forced: !correctIsRegExpLogic('includes') }, {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~String(requireObjectCoercible$1(this))
      .indexOf(notARegExp(searchString), arguments.length > 1 ? arguments[1] : undefined);
  }
});

// a string of all valid unicode whitespaces
// eslint-disable-next-line max-len
var whitespaces$2 = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

var requireObjectCoercible = requireObjectCoercible$4;
var whitespaces$1 = whitespaces$2;

var whitespace = '[' + whitespaces$1 + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod$2 = function (TYPE) {
  return function ($this) {
    var string = String(requireObjectCoercible($this));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };
};

var stringTrim = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
  start: createMethod$2(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
  end: createMethod$2(2),
  // `String.prototype.trim` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
  trim: createMethod$2(3)
};

var fails$7 = fails$h;
var whitespaces = whitespaces$2;

var non = '\u200B\u0085\u180E';

// check that a method works with the correct list
// of whitespaces and has a correct name
var stringTrimForced = function (METHOD_NAME) {
  return fails$7(function () {
    return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
  });
};

var $$4 = _export;
var $trim = stringTrim.trim;
var forcedStringTrimMethod = stringTrimForced;

// `String.prototype.trim` method
// https://tc39.github.io/ecma262/#sec-string.prototype.trim
$$4({ target: 'String', proto: true, forced: forcedStringTrimMethod('trim') }, {
  trim: function trim() {
    return $trim(this);
  }
});

class EventEmitter {
  constructor() {
    this.emitter = new EventEmitter$1();
  }
  on(eventName, callback) {
    this.emitter.on(eventName, callback);
    return {
      remove: () => this.emitter.off(eventName, callback)
    };
  }
  off(eventName, callback) {
    this.emitter.off(eventName, callback);
  }
  emit(eventName, event) {
    this.emitter.emit(eventName, event);
  }
}

const PACKAGE_NAME = "near-wallet-selector";
const RECENTLY_SIGNED_IN_WALLETS = "recentlySignedInWallets";
const REMEMBER_RECENT_WALLETS = "rememberRecentWallets";
const REMEMBER_RECENT_WALLETS_STATE = {
  ENABLED: "enabled",
  DISABLED: "disabled"
};
const CONTRACT = "contract";
const PENDING_CONTRACT = "contract:pending";
const SELECTED_WALLET_ID = `selectedWalletId`;
const PENDING_SELECTED_WALLET_ID = `selectedWalletId:pending`;

class WalletModules {
  constructor({
    factories,
    storage,
    options,
    store,
    emitter,
    provider
  }) {
    this.factories = factories;
    this.storage = storage;
    this.options = options;
    this.store = store;
    this.emitter = emitter;
    this.provider = provider;
    this.modules = [];
    this.instances = {};
  }
  validateWallet(id) {
    return __awaiter(this, void 0, void 0, function* () {
      let accounts = [];
      const wallet = yield this.getWallet(id);
      if (wallet) {
        // Ensure our persistent state aligns with the selected wallet.
        // For example a wallet is selected, but it returns no accounts (not signed in).
        accounts = yield wallet.getAccounts().catch(err => {
          logger.log(`Failed to validate ${wallet.id} during setup`);
          logger.error(err);
          return [];
        });
      }
      return accounts;
    });
  }
  resolveStorageState() {
    return __awaiter(this, void 0, void 0, function* () {
      const jsonStorage = new JsonStorage(this.storage, PACKAGE_NAME);
      const pendingSelectedWalletId = yield jsonStorage.getItem(PENDING_SELECTED_WALLET_ID);
      const pendingContract = yield jsonStorage.getItem(PENDING_CONTRACT);
      const rememberRecentWallets = yield jsonStorage.getItem(REMEMBER_RECENT_WALLETS);
      if (pendingSelectedWalletId && pendingContract) {
        const _accounts = yield this.validateWallet(pendingSelectedWalletId);
        yield jsonStorage.removeItem(PENDING_SELECTED_WALLET_ID);
        yield jsonStorage.removeItem(PENDING_CONTRACT);
        if (_accounts.length) {
          const {
            selectedWalletId: _selectedWalletId
          } = this.store.getState();
          const selectedWallet = yield this.getWallet(_selectedWalletId);
          if (selectedWallet && pendingSelectedWalletId !== _selectedWalletId) {
            yield selectedWallet.signOut().catch(err => {
              logger.log("Failed to sign out existing wallet");
              logger.error(err);
            });
          }
          let recentlySignedInWalletsFromPending = [];
          if (rememberRecentWallets === REMEMBER_RECENT_WALLETS_STATE.ENABLED) {
            recentlySignedInWalletsFromPending = yield this.setWalletAsRecentlySignedIn(pendingSelectedWalletId);
          }
          return {
            accounts: _accounts,
            contract: pendingContract,
            selectedWalletId: pendingSelectedWalletId,
            recentlySignedInWallets: recentlySignedInWalletsFromPending,
            rememberRecentWallets: rememberRecentWallets || REMEMBER_RECENT_WALLETS_STATE.ENABLED
          };
        }
      }
      const {
        contract,
        selectedWalletId
      } = this.store.getState();
      const accounts = yield this.validateWallet(selectedWalletId);
      const recentlySignedInWallets = yield jsonStorage.getItem(RECENTLY_SIGNED_IN_WALLETS);
      if (!accounts.length) {
        return {
          accounts: [],
          contract: null,
          selectedWalletId: null,
          recentlySignedInWallets: recentlySignedInWallets || [],
          rememberRecentWallets: rememberRecentWallets || REMEMBER_RECENT_WALLETS_STATE.ENABLED
        };
      }
      return {
        accounts,
        contract,
        selectedWalletId,
        recentlySignedInWallets: recentlySignedInWallets || [],
        rememberRecentWallets: rememberRecentWallets || REMEMBER_RECENT_WALLETS_STATE.ENABLED
      };
    });
  }
  setWalletAsRecentlySignedIn(walletId) {
    return __awaiter(this, void 0, void 0, function* () {
      const jsonStorage = new JsonStorage(this.storage, PACKAGE_NAME);
      let recentlySignedInWallets = yield jsonStorage.getItem(RECENTLY_SIGNED_IN_WALLETS);
      if (!recentlySignedInWallets) {
        recentlySignedInWallets = [];
      }
      if (!recentlySignedInWallets.includes(walletId)) {
        recentlySignedInWallets.unshift(walletId);
        recentlySignedInWallets = recentlySignedInWallets.slice(0, 5);
        yield jsonStorage.setItem(RECENTLY_SIGNED_IN_WALLETS, recentlySignedInWallets);
      }
      return recentlySignedInWallets;
    });
  }
  signOutWallet(walletId) {
    return __awaiter(this, void 0, void 0, function* () {
      const wallet = yield this.getWallet(walletId);
      yield wallet.signOut().catch(err => {
        logger.log(`Failed to sign out ${wallet.id}`);
        logger.error(err);
        // At least clean up state on our side.
        this.onWalletSignedOut(wallet.id);
      });
    });
  }
  onWalletSignedIn(walletId, {
    accounts,
    contractId,
    methodNames
  }) {
    return __awaiter(this, void 0, void 0, function* () {
      const {
        selectedWalletId,
        rememberRecentWallets
      } = this.store.getState();
      const jsonStorage = new JsonStorage(this.storage, PACKAGE_NAME);
      const contract = {
        contractId,
        methodNames
      };
      if (!accounts.length) {
        const module = this.getModule(walletId);
        // We can't guarantee the user will actually sign in with browser wallets.
        // Best we can do is set in storage and validate on init.
        if (module.type === "browser") {
          yield jsonStorage.setItem(PENDING_SELECTED_WALLET_ID, walletId);
          yield jsonStorage.setItem(PENDING_CONTRACT, contract);
        }
        return;
      }
      if (selectedWalletId && selectedWalletId !== walletId) {
        yield this.signOutWallet(selectedWalletId);
      }
      let recentlySignedInWallets = [];
      if (rememberRecentWallets === REMEMBER_RECENT_WALLETS_STATE.ENABLED) {
        recentlySignedInWallets = yield this.setWalletAsRecentlySignedIn(walletId);
      }
      this.store.dispatch({
        type: "WALLET_CONNECTED",
        payload: {
          walletId,
          contract,
          accounts,
          recentlySignedInWallets,
          rememberRecentWallets
        }
      });
      this.emitter.emit("signedIn", {
        walletId,
        contractId,
        methodNames,
        accounts
      });
    });
  }
  onWalletSignedOut(walletId) {
    this.store.dispatch({
      type: "WALLET_DISCONNECTED",
      payload: {
        walletId
      }
    });
    this.emitter.emit("signedOut", {
      walletId
    });
  }
  setupWalletEmitter(module) {
    const emitter = new EventEmitter();
    emitter.on("signedOut", () => {
      this.onWalletSignedOut(module.id);
    });
    emitter.on("signedIn", event => {
      this.onWalletSignedIn(module.id, event);
    });
    emitter.on("accountsChanged", ({
      accounts
    }) => __awaiter(this, void 0, void 0, function* () {
      this.emitter.emit("accountsChanged", {
        walletId: module.id,
        accounts
      });
      if (!accounts.length) {
        return this.signOutWallet(module.id);
      }
      this.store.dispatch({
        type: "ACCOUNTS_CHANGED",
        payload: {
          walletId: module.id,
          accounts
        }
      });
    }));
    emitter.on("networkChanged", ({
      networkId
    }) => {
      this.emitter.emit("networkChanged", {
        walletId: module.id,
        networkId
      });
    });
    emitter.on("uriChanged", ({
      uri
    }) => {
      this.emitter.emit("uriChanged", {
        walletId: module.id,
        uri
      });
    });
    return emitter;
  }
  validateSignMessageParams({
    message,
    nonce,
    recipient
  }) {
    if (!message || message.trim() === "") {
      throw new Error("Invalid message. It must be a non-empty string.");
    }
    if (!Buffer.isBuffer(nonce) || nonce.length !== 32) {
      throw new Error("Invalid nonce. It must be a Buffer with a length of 32 bytes.");
    }
    if (!recipient || recipient.trim() === "") {
      throw new Error("Invalid recipient. It must be a non-empty string.");
    }
  }
  decorateWallet(wallet) {
    const _signIn = wallet.signIn;
    const _signOut = wallet.signOut;
    const _signMessage = wallet.signMessage;
    wallet.signIn = params => __awaiter(this, void 0, void 0, function* () {
      const accounts = yield _signIn(params);
      const {
        contractId,
        methodNames = []
      } = params;
      yield this.onWalletSignedIn(wallet.id, {
        accounts,
        contractId,
        methodNames
      });
      return accounts;
    });
    wallet.signOut = () => __awaiter(this, void 0, void 0, function* () {
      yield _signOut();
      this.onWalletSignedOut(wallet.id);
    });
    wallet.signMessage = params => __awaiter(this, void 0, void 0, function* () {
      if (_signMessage === undefined) {
        throw Error(`The signMessage method is not supported by ${wallet.metadata.name}`);
      }
      this.validateSignMessageParams(params);
      return yield _signMessage(params);
    });
    return wallet;
  }
  setupInstance(module) {
    return __awaiter(this, void 0, void 0, function* () {
      if (!module.metadata.available) {
        const message = module.type === "injected" ? "not installed" : "not available";
        throw Error(`${module.metadata.name} is ${message}`);
      }
      const wallet = Object.assign({
        id: module.id,
        type: module.type,
        metadata: module.metadata
      }, yield module.init({
        id: module.id,
        type: module.type,
        metadata: module.metadata,
        options: this.options,
        store: this.store.toReadOnly(),
        provider: this.provider,
        emitter: this.setupWalletEmitter(module),
        logger: new Logger(module.id),
        storage: new JsonStorage(this.storage, [PACKAGE_NAME, module.id])
      }));
      return this.decorateWallet(wallet);
    });
  }
  getModule(id) {
    return this.modules.find(x => x.id === id);
  }
  getWallet(id) {
    return __awaiter(this, void 0, void 0, function* () {
      const module = this.getModule(id);
      if (!module) {
        return null;
      }
      const {
        selectedWalletId
      } = this.store.getState();
      // If user uninstalled/removed a wallet which was previously signed in with
      // best we can do is clean up state on our side.
      if (!module.metadata.available && selectedWalletId) {
        this.onWalletSignedOut(selectedWalletId);
        return null;
      }
      return yield module.wallet();
    });
  }
  setup() {
    return __awaiter(this, void 0, void 0, function* () {
      const modules = [];
      for (let i = 0; i < this.factories.length; i += 1) {
        const module = yield this.factories[i]({
          options: this.options
        }).catch(err => {
          logger.log("Failed to setup module");
          logger.error(err);
          return null;
        });
        // Filter out wallets that aren't available.
        if (!module) {
          continue;
        }
        // Skip duplicated module.
        if (modules.some(x => x.id === module.id)) {
          continue;
        }
        modules.push({
          id: module.id,
          type: module.type,
          metadata: module.metadata,
          wallet: () => __awaiter(this, void 0, void 0, function* () {
            let instance = this.instances[module.id];
            if (instance) {
              return instance;
            }
            instance = yield this.setupInstance(module);
            this.instances[module.id] = instance;
            return instance;
          })
        });
      }
      this.modules = modules;
      const {
        accounts,
        contract,
        selectedWalletId,
        recentlySignedInWallets,
        rememberRecentWallets
      } = yield this.resolveStorageState();
      this.store.dispatch({
        type: "SETUP_WALLET_MODULES",
        payload: {
          modules,
          accounts,
          contract,
          selectedWalletId,
          recentlySignedInWallets,
          rememberRecentWallets
        }
      });
      for (let i = 0; i < this.modules.length; i++) {
        if (this.modules[i].type !== "instant-link") {
          continue;
        }
        const wallet = yield this.modules[i].wallet();
        if (!wallet.metadata.runOnStartup) {
          continue;
        }
        try {
          yield wallet.signIn({
            contractId: wallet.getContractId()
          });
        } catch (err) {
          logger.error("Failed to sign in to wallet. " + err);
        }
      }
    });
  }
}

const getNetworkPreset = (networkId, fallbackRpcUrls) => {
  switch (networkId) {
    case "mainnet":
      return {
        networkId,
        nodeUrl: (fallbackRpcUrls === null || fallbackRpcUrls === void 0 ? void 0 : fallbackRpcUrls[0]) || "https://rpc.mainnet.near.org",
        helperUrl: "https://helper.mainnet.near.org",
        explorerUrl: "https://nearblocks.io",
        indexerUrl: "https://api.fastnear.com/v0"
      };
    case "testnet":
      return {
        networkId,
        nodeUrl: (fallbackRpcUrls === null || fallbackRpcUrls === void 0 ? void 0 : fallbackRpcUrls[0]) || "https://rpc.testnet.near.org",
        helperUrl: "https://helper.testnet.near.org",
        explorerUrl: "https://testnet.nearblocks.io",
        indexerUrl: "https://test.api.fastnear.com/v0"
      };
    default:
      throw Error(`Failed to find config for: '${networkId}'`);
  }
};
const resolveNetwork = network => {
  return typeof network === "string" ? getNetworkPreset(network) : network;
};
const resolveOptions = params => {
  const options = {
    languageCode: params.languageCode || undefined,
    network: resolveNetwork(params.network),
    debug: params.debug || false,
    optimizeWalletOrder: params.optimizeWalletOrder === false ? false : true,
    randomizeWalletOrder: params.randomizeWalletOrder || false,
    relayerUrl: params.relayerUrl || undefined
  };
  return {
    options,
    storage: params.storage || new WebStorageService()
  };
};

const reducer = (state, action) => {
  logger.log("Store Action", action);
  switch (action.type) {
    case "SETUP_WALLET_MODULES":
      {
        const {
          modules,
          accounts,
          contract,
          selectedWalletId,
          recentlySignedInWallets,
          rememberRecentWallets
        } = action.payload;
        const accountStates = accounts.map((account, i) => {
          return Object.assign(Object.assign({}, account), {
            active: i === 0
          });
        });
        return Object.assign(Object.assign({}, state), {
          modules,
          accounts: accountStates,
          contract,
          selectedWalletId,
          recentlySignedInWallets,
          rememberRecentWallets
        });
      }
    case "WALLET_CONNECTED":
      {
        const {
          walletId,
          contract,
          accounts,
          recentlySignedInWallets
        } = action.payload;
        if (!accounts.length) {
          return state;
        }
        const activeAccountIndex = state.accounts.findIndex(account => account.active);
        const accountStates = accounts.map((account, i) => {
          return Object.assign(Object.assign({}, account), {
            active: i === (activeAccountIndex > -1 ? activeAccountIndex : 0)
          });
        });
        return Object.assign(Object.assign({}, state), {
          contract,
          accounts: accountStates,
          selectedWalletId: walletId,
          recentlySignedInWallets
        });
      }
    case "WALLET_DISCONNECTED":
      {
        const {
          walletId
        } = action.payload;
        if (walletId !== state.selectedWalletId) {
          return state;
        }
        return Object.assign(Object.assign({}, state), {
          contract: null,
          accounts: [],
          selectedWalletId: null
        });
      }
    case "ACCOUNTS_CHANGED":
      {
        const {
          walletId,
          accounts
        } = action.payload;
        if (walletId !== state.selectedWalletId) {
          return state;
        }
        const activeAccount = state.accounts.find(account => account.active);
        const isActiveAccountRemoved = !accounts.some(account => account.accountId === (activeAccount === null || activeAccount === void 0 ? void 0 : activeAccount.accountId));
        const accountStates = accounts.map((account, i) => {
          return Object.assign(Object.assign({}, account), {
            active: isActiveAccountRemoved ? i === 0 : account.accountId === (activeAccount === null || activeAccount === void 0 ? void 0 : activeAccount.accountId)
          });
        });
        return Object.assign(Object.assign({}, state), {
          accounts: accountStates
        });
      }
    case "SET_ACTIVE_ACCOUNT":
      {
        const {
          accountId
        } = action.payload;
        const accountStates = state.accounts.map(account => {
          return Object.assign(Object.assign({}, account), {
            active: account.accountId === accountId
          });
        });
        return Object.assign(Object.assign({}, state), {
          accounts: accountStates
        });
      }
    case "SET_REMEMBER_RECENT_WALLETS":
      {
        const {
          selectedWalletId,
          recentlySignedInWallets
        } = state;
        const {
          rememberRecentWallets
        } = action.payload;
        const newRecentWallets = rememberRecentWallets === REMEMBER_RECENT_WALLETS_STATE.ENABLED ? REMEMBER_RECENT_WALLETS_STATE.DISABLED : REMEMBER_RECENT_WALLETS_STATE.ENABLED;
        const newWalletsVal = [...recentlySignedInWallets];
        if (selectedWalletId && !recentlySignedInWallets.includes(selectedWalletId)) {
          newWalletsVal.push(selectedWalletId);
        }
        const newRecentlySignedInWallets = newRecentWallets === REMEMBER_RECENT_WALLETS_STATE.ENABLED ? newWalletsVal : [];
        return Object.assign(Object.assign({}, state), {
          rememberRecentWallets: newRecentWallets,
          recentlySignedInWallets: newRecentlySignedInWallets
        });
      }
    default:
      return state;
  }
};
const createStore = storage => __awaiter(void 0, void 0, void 0, function* () {
  const jsonStorage = new JsonStorage(storage, PACKAGE_NAME);
  const initialState = {
    modules: [],
    accounts: [],
    contract: yield jsonStorage.getItem(CONTRACT),
    selectedWalletId: yield jsonStorage.getItem(SELECTED_WALLET_ID),
    recentlySignedInWallets: (yield jsonStorage.getItem(RECENTLY_SIGNED_IN_WALLETS)) || [],
    rememberRecentWallets: (yield jsonStorage.getItem(REMEMBER_RECENT_WALLETS)) || ""
  };
  const state$ = new BehaviorSubject(initialState);
  const actions$ = new Subject();
  actions$.pipe(scan(reducer, initialState)).subscribe(state$);
  const syncStorage = (prevState, state, storageKey, property) => __awaiter(void 0, void 0, void 0, function* () {
    if (state[property] === prevState[property]) {
      return;
    }
    if (state[property]) {
      yield jsonStorage.setItem(storageKey, state[property]);
      return;
    }
    yield jsonStorage.removeItem(storageKey);
  });
  let prevState = state$.getValue();
  state$.subscribe(state => {
    syncStorage(prevState, state, SELECTED_WALLET_ID, "selectedWalletId");
    syncStorage(prevState, state, CONTRACT, "contract");
    syncStorage(prevState, state, RECENTLY_SIGNED_IN_WALLETS, "recentlySignedInWallets");
    syncStorage(prevState, state, REMEMBER_RECENT_WALLETS, "rememberRecentWallets");
    prevState = state;
  });
  return {
    observable: state$,
    getState: () => state$.getValue(),
    dispatch: action => actions$.next(action),
    toReadOnly: () => ({
      getState: () => state$.getValue(),
      observable: state$.asObservable()
    })
  };
});

let walletSelectorInstance = null;
const createSelector = (options, store, walletModules, emitter) => {
  return {
    options,
    store: store.toReadOnly(),
    wallet: id => __awaiter(void 0, void 0, void 0, function* () {
      const {
        selectedWalletId
      } = store.getState();
      const wallet = yield walletModules.getWallet(id || selectedWalletId);
      if (!wallet) {
        if (id) {
          throw new Error("Invalid wallet id");
        }
        throw new Error("No wallet selected");
      }
      return wallet;
    }),
    setActiveAccount: accountId => {
      const {
        accounts
      } = store.getState();
      if (!accounts.some(account => account.accountId === accountId)) {
        throw new Error("Invalid account id");
      }
      store.dispatch({
        type: "SET_ACTIVE_ACCOUNT",
        payload: {
          accountId
        }
      });
    },
    setRememberRecentWallets: () => {
      const {
        rememberRecentWallets
      } = store.getState();
      store.dispatch({
        type: "SET_REMEMBER_RECENT_WALLETS",
        payload: {
          rememberRecentWallets
        }
      });
    },
    isSignedIn() {
      const {
        accounts
      } = store.getState();
      return Boolean(accounts.length);
    },
    on: (eventName, callback) => {
      return emitter.on(eventName, callback);
    },
    off: (eventName, callback) => {
      emitter.off(eventName, callback);
    },
    subscribeOnAccountChange(onAccountChangeFn) {
      this.store.observable.subscribe(state => __awaiter(this, void 0, void 0, function* () {
        var _a;
        const signedAccount = (_a = state === null || state === void 0 ? void 0 : state.accounts.find(account => account.active)) === null || _a === void 0 ? void 0 : _a.accountId;
        onAccountChangeFn(signedAccount || "");
      }));
    }
  };
};
/**
 * Initiates a wallet selector instance
 * @param {WalletSelectorParams} params Selector parameters (network, modules...)
 * @returns {Promise<WalletSelector>} Returns a WalletSelector object
 */
const setupWalletSelector = params => __awaiter(void 0, void 0, void 0, function* () {
  const {
    options,
    storage
  } = resolveOptions(params);
  Logger.debug = options.debug;
  const emitter = new EventEmitter();
  const store = yield createStore(storage);
  const network = yield getNetworkPreset(options.network.networkId, params.fallbackRpcUrls);
  const rpcProviderUrls = params.fallbackRpcUrls && params.fallbackRpcUrls.length > 0 ? params.fallbackRpcUrls : [network.nodeUrl];
  const walletModules = new WalletModules({
    factories: params.modules,
    storage,
    options,
    store,
    emitter,
    provider: new Provider(rpcProviderUrls)
  });
  yield walletModules.setup();
  if (params.allowMultipleSelectors) {
    return createSelector(options, store, walletModules, emitter);
  }
  if (!walletSelectorInstance) {
    walletSelectorInstance = createSelector(options, store, walletModules, emitter);
  }
  return walletSelectorInstance;
});

const wait = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
const poll = (cb, interval, remaining) => __awaiter(void 0, void 0, void 0, function* () {
  const result = cb();
  if (result) {
    return result;
  }
  if (!remaining) {
    throw new Error("Exceeded timeout");
  }
  return wait(interval).then(() => poll(cb, interval, remaining - 1));
});
const waitFor = (cb, opts = {}) => __awaiter(void 0, void 0, void 0, function* () {
  const {
    timeout = 100,
    interval = 50
  } = opts;
  return Promise.race([wait(timeout).then(() => {
    throw new Error("Exceeded timeout");
  }), poll(cb, interval, Math.floor(timeout / interval))]);
});

const getActiveAccount = state => {
  return state.accounts.find(account => account.active) || null;
};

var aFunction = aFunction$5;
var toObject$4 = toObject$7;
var IndexedObject$1 = indexedObject;
var toLength$8 = toLength$b;

// `Array.prototype.{ reduce, reduceRight }` methods implementation
var createMethod$1 = function (IS_RIGHT) {
  return function (that, callbackfn, argumentsLength, memo) {
    aFunction(callbackfn);
    var O = toObject$4(that);
    var self = IndexedObject$1(O);
    var length = toLength$8(O.length);
    var index = IS_RIGHT ? length - 1 : 0;
    var i = IS_RIGHT ? -1 : 1;
    if (argumentsLength < 2) while (true) {
      if (index in self) {
        memo = self[index];
        index += i;
        break;
      }
      index += i;
      if (IS_RIGHT ? index < 0 : length <= index) {
        throw TypeError('Reduce of empty array with no initial value');
      }
    }
    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
      memo = callbackfn(memo, self[index], index, O);
    }
    return memo;
  };
};

var arrayReduce = {
  // `Array.prototype.reduce` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduce
  left: createMethod$1(false),
  // `Array.prototype.reduceRight` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduceright
  right: createMethod$1(true)
};

var fails$6 = fails$h;

var arrayMethodIsStrict$1 = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails$6(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal
    method.call(null, argument || function () { throw 1; }, 1);
  });
};

var $$3 = _export;
var $reduce = arrayReduce.left;
var arrayMethodIsStrict = arrayMethodIsStrict$1;
var arrayMethodUsesToLength = arrayMethodUsesToLength$2;

var STRICT_METHOD = arrayMethodIsStrict('reduce');
var USES_TO_LENGTH = arrayMethodUsesToLength('reduce', { 1: 0 });

// `Array.prototype.reduce` method
// https://tc39.github.io/ecma262/#sec-array.prototype.reduce
$$3({ target: 'Array', proto: true, forced: !STRICT_METHOD || !USES_TO_LENGTH }, {
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var anObject$1 = anObject$b;

// `RegExp.prototype.flags` getter implementation
// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
var regexpFlags$1 = function () {
  var that = anObject$1(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

var regexpStickyHelpers = {};

var fails$5 = fails$h;

// babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
// so we use an intermediate function.
function RE(s, f) {
  return RegExp(s, f);
}

regexpStickyHelpers.UNSUPPORTED_Y = fails$5(function () {
  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
  var re = RE('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

regexpStickyHelpers.BROKEN_CARET = fails$5(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = RE('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});

var regexpFlags = regexpFlags$1;
var stickyHelpers = regexpStickyHelpers;

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y || stickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = regexpFlags.call(re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = flags.replace('y', '');
      if (flags.indexOf('g') === -1) {
        flags += 'g';
      }

      strCopy = String(str).slice(re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = nativeExec.call(sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = match.input.slice(charsAdded);
        match[0] = match[0].slice(charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

var regexpExec = patchedExec;

var $$2 = _export;
var exec = regexpExec;

$$2({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});

/* eslint-disable no-useless-escape */
// https://github.com/DamonOehlman/detect-browser/blob/master/src/index.ts
const SEARCHBOX_UA_REGEX = /alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/;
const userAgentRules = [["aol", /AOLShield\/([0-9\._]+)/], ["edge", /Edge\/([0-9\._]+)/], ["edge-ios", /EdgiOS\/([0-9\._]+)/], ["yandexbrowser", /YaBrowser\/([0-9\._]+)/], ["kakaotalk", /KAKAOTALK\s([0-9\.]+)/], ["samsung", /SamsungBrowser\/([0-9\.]+)/], ["silk", /\bSilk\/([0-9._-]+)\b/], ["miui", /MiuiBrowser\/([0-9\.]+)$/], ["beaker", /BeakerBrowser\/([0-9\.]+)/], ["edge-chromium", /EdgA?\/([0-9\.]+)/], ["chromium-webview", /(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/], ["chrome", /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/], ["phantomjs", /PhantomJS\/([0-9\.]+)(:?\s|$)/], ["crios", /CriOS\/([0-9\.]+)(:?\s|$)/], ["firefox", /Firefox\/([0-9\.]+)(?:\s|$)/], ["fxios", /FxiOS\/([0-9\.]+)/], ["opera-mini", /Opera Mini.*Version\/([0-9\.]+)/], ["opera", /Opera\/([0-9\.]+)(?:\s|$)/], ["opera", /OPR\/([0-9\.]+)(:?\s|$)/], ["pie", /^Microsoft Pocket Internet Explorer\/(\d+\.\d+)$/], ["pie", /^Mozilla\/\d\.\d+\s\(compatible;\s(?:MSP?IE|MSInternet Explorer) (\d+\.\d+);.*Windows CE.*\)$/], ["netfront", /^Mozilla\/\d\.\d+.*NetFront\/(\d.\d)/], ["ie", /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/], ["ie", /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/], ["ie", /MSIE\s(7\.0)/], ["bb10", /BB10;\sTouch.*Version\/([0-9\.]+)/], ["android", /Android\s([0-9\.]+)/], ["ios", /Version\/([0-9\._]+).*Mobile.*Safari.*/], ["safari", /Version\/([0-9\._]+).*Safari/], ["facebook", /FB[AS]V\/([0-9\.]+)/], ["instagram", /Instagram\s([0-9\.]+)/], ["ios-webview", /AppleWebKit\/([0-9\.]+).*Mobile/], ["ios-webview", /AppleWebKit\/([0-9\.]+).*Gecko\)$/], ["curl", /^curl\/([0-9\.]+)$/], ["searchbot", SEARCHBOX_UA_REGEX]];
const matchUserAgent = ua => {
  return ua !== "" && userAgentRules.reduce((matched, [browser, regex]) => {
    if (matched) {
      return matched;
    }
    const uaMatch = regex.exec(ua);
    return !!uaMatch && [browser, uaMatch];
  }, false);
};
const isCurrentBrowserSupported = supportedBrowser => {
  if (typeof navigator === "undefined") {
    return false;
  }
  const matchedRule = matchUserAgent(navigator.userAgent);
  if (!matchedRule) {
    return false;
  }
  const [name] = matchedRule;
  if (name === "searchbot") {
    return false;
  }
  return !!supportedBrowser.find(item => item === name);
};

var arrayBufferNative = typeof ArrayBuffer !== 'undefined' && typeof DataView !== 'undefined';

var toInteger$2 = toInteger$5;
var toLength$7 = toLength$b;

// `ToIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-toindex
var toIndex$2 = function (it) {
  if (it === undefined) return 0;
  var number = toInteger$2(it);
  var length = toLength$7(number);
  if (number !== length) throw RangeError('Wrong length or index');
  return length;
};

// IEEE754 conversions based on https://github.com/feross/ieee754
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = 1 / 0;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;

var pack = function (number, mantissaLength, bytes) {
  var buffer = new Array(bytes);
  var exponentLength = bytes * 8 - mantissaLength - 1;
  var eMax = (1 << exponentLength) - 1;
  var eBias = eMax >> 1;
  var rt = mantissaLength === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var sign = number < 0 || number === 0 && 1 / number < 0 ? 1 : 0;
  var index = 0;
  var exponent, mantissa, c;
  number = abs(number);
  // eslint-disable-next-line no-self-compare
  if (number != number || number === Infinity) {
    // eslint-disable-next-line no-self-compare
    mantissa = number != number ? 1 : 0;
    exponent = eMax;
  } else {
    exponent = floor(log(number) / LN2);
    if (number * (c = pow(2, -exponent)) < 1) {
      exponent--;
      c *= 2;
    }
    if (exponent + eBias >= 1) {
      number += rt / c;
    } else {
      number += rt * pow(2, 1 - eBias);
    }
    if (number * c >= 2) {
      exponent++;
      c /= 2;
    }
    if (exponent + eBias >= eMax) {
      mantissa = 0;
      exponent = eMax;
    } else if (exponent + eBias >= 1) {
      mantissa = (number * c - 1) * pow(2, mantissaLength);
      exponent = exponent + eBias;
    } else {
      mantissa = number * pow(2, eBias - 1) * pow(2, mantissaLength);
      exponent = 0;
    }
  }
  for (; mantissaLength >= 8; buffer[index++] = mantissa & 255, mantissa /= 256, mantissaLength -= 8);
  exponent = exponent << mantissaLength | mantissa;
  exponentLength += mantissaLength;
  for (; exponentLength > 0; buffer[index++] = exponent & 255, exponent /= 256, exponentLength -= 8);
  buffer[--index] |= sign * 128;
  return buffer;
};

var unpack = function (buffer, mantissaLength) {
  var bytes = buffer.length;
  var exponentLength = bytes * 8 - mantissaLength - 1;
  var eMax = (1 << exponentLength) - 1;
  var eBias = eMax >> 1;
  var nBits = exponentLength - 7;
  var index = bytes - 1;
  var sign = buffer[index--];
  var exponent = sign & 127;
  var mantissa;
  sign >>= 7;
  for (; nBits > 0; exponent = exponent * 256 + buffer[index], index--, nBits -= 8);
  mantissa = exponent & (1 << -nBits) - 1;
  exponent >>= -nBits;
  nBits += mantissaLength;
  for (; nBits > 0; mantissa = mantissa * 256 + buffer[index], index--, nBits -= 8);
  if (exponent === 0) {
    exponent = 1 - eBias;
  } else if (exponent === eMax) {
    return mantissa ? NaN : sign ? -Infinity : Infinity;
  } else {
    mantissa = mantissa + pow(2, mantissaLength);
    exponent = exponent - eBias;
  } return (sign ? -1 : 1) * mantissa * pow(2, exponent - mantissaLength);
};

var ieee754 = {
  pack: pack,
  unpack: unpack
};

var toObject$3 = toObject$7;
var toAbsoluteIndex$1 = toAbsoluteIndex$3;
var toLength$6 = toLength$b;

// `Array.prototype.fill` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.fill
var arrayFill$1 = function fill(value /* , start = 0, end = @length */) {
  var O = toObject$3(this);
  var length = toLength$6(O.length);
  var argumentsLength = arguments.length;
  var index = toAbsoluteIndex$1(argumentsLength > 1 ? arguments[1] : undefined, length);
  var end = argumentsLength > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex$1(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};

var global$5 = global$n;
var DESCRIPTORS$2 = descriptors;
var NATIVE_ARRAY_BUFFER$1 = arrayBufferNative;
var createNonEnumerableProperty$2 = createNonEnumerableProperty$a;
var redefineAll = redefineAll$2;
var fails$4 = fails$h;
var anInstance$1 = anInstance$3;
var toInteger$1 = toInteger$5;
var toLength$5 = toLength$b;
var toIndex$1 = toIndex$2;
var IEEE754 = ieee754;
var getPrototypeOf$1 = objectGetPrototypeOf;
var setPrototypeOf$3 = objectSetPrototypeOf;
var getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;
var defineProperty$1 = objectDefineProperty.f;
var arrayFill = arrayFill$1;
var setToStringTag = setToStringTag$4;
var InternalStateModule$1 = internalState;

var getInternalState$1 = InternalStateModule$1.get;
var setInternalState$1 = InternalStateModule$1.set;
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH$1 = 'Wrong length';
var WRONG_INDEX = 'Wrong index';
var NativeArrayBuffer = global$5[ARRAY_BUFFER];
var $ArrayBuffer = NativeArrayBuffer;
var $DataView = global$5[DATA_VIEW];
var $DataViewPrototype = $DataView && $DataView[PROTOTYPE];
var ObjectPrototype$1 = Object.prototype;
var RangeError$2 = global$5.RangeError;

var packIEEE754 = IEEE754.pack;
var unpackIEEE754 = IEEE754.unpack;

var packInt8 = function (number) {
  return [number & 0xFF];
};

var packInt16 = function (number) {
  return [number & 0xFF, number >> 8 & 0xFF];
};

var packInt32 = function (number) {
  return [number & 0xFF, number >> 8 & 0xFF, number >> 16 & 0xFF, number >> 24 & 0xFF];
};

var unpackInt32 = function (buffer) {
  return buffer[3] << 24 | buffer[2] << 16 | buffer[1] << 8 | buffer[0];
};

var packFloat32 = function (number) {
  return packIEEE754(number, 23, 4);
};

var packFloat64 = function (number) {
  return packIEEE754(number, 52, 8);
};

var addGetter$1 = function (Constructor, key) {
  defineProperty$1(Constructor[PROTOTYPE], key, { get: function () { return getInternalState$1(this)[key]; } });
};

var get = function (view, count, index, isLittleEndian) {
  var intIndex = toIndex$1(index);
  var store = getInternalState$1(view);
  if (intIndex + count > store.byteLength) throw RangeError$2(WRONG_INDEX);
  var bytes = getInternalState$1(store.buffer).bytes;
  var start = intIndex + store.byteOffset;
  var pack = bytes.slice(start, start + count);
  return isLittleEndian ? pack : pack.reverse();
};

var set = function (view, count, index, conversion, value, isLittleEndian) {
  var intIndex = toIndex$1(index);
  var store = getInternalState$1(view);
  if (intIndex + count > store.byteLength) throw RangeError$2(WRONG_INDEX);
  var bytes = getInternalState$1(store.buffer).bytes;
  var start = intIndex + store.byteOffset;
  var pack = conversion(+value);
  for (var i = 0; i < count; i++) bytes[start + i] = pack[isLittleEndian ? i : count - i - 1];
};

if (!NATIVE_ARRAY_BUFFER$1) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance$1(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex$1(length);
    setInternalState$1(this, {
      bytes: arrayFill.call(new Array(byteLength), 0),
      byteLength: byteLength
    });
    if (!DESCRIPTORS$2) this.byteLength = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance$1(this, $DataView, DATA_VIEW);
    anInstance$1(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = getInternalState$1(buffer).byteLength;
    var offset = toInteger$1(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError$2('Wrong offset');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength$5(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError$2(WRONG_LENGTH$1);
    setInternalState$1(this, {
      buffer: buffer,
      byteLength: byteLength,
      byteOffset: offset
    });
    if (!DESCRIPTORS$2) {
      this.buffer = buffer;
      this.byteLength = byteLength;
      this.byteOffset = offset;
    }
  };

  if (DESCRIPTORS$2) {
    addGetter$1($ArrayBuffer, 'byteLength');
    addGetter$1($DataView, 'buffer');
    addGetter$1($DataView, 'byteLength');
    addGetter$1($DataView, 'byteOffset');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined)) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 23);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 52);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packInt8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packInt8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packFloat32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packFloat64, value, arguments.length > 2 ? arguments[2] : undefined);
    }
  });
} else {
  if (!fails$4(function () {
    NativeArrayBuffer(1);
  }) || !fails$4(function () {
    new NativeArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails$4(function () {
    new NativeArrayBuffer(); // eslint-disable-line no-new
    new NativeArrayBuffer(1.5); // eslint-disable-line no-new
    new NativeArrayBuffer(NaN); // eslint-disable-line no-new
    return NativeArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance$1(this, $ArrayBuffer);
      return new NativeArrayBuffer(toIndex$1(length));
    };
    var ArrayBufferPrototype = $ArrayBuffer[PROTOTYPE] = NativeArrayBuffer[PROTOTYPE];
    for (var keys = getOwnPropertyNames$1(NativeArrayBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) {
        createNonEnumerableProperty$2($ArrayBuffer, key, NativeArrayBuffer[key]);
      }
    }
    ArrayBufferPrototype.constructor = $ArrayBuffer;
  }

  // WebKit bug - the same parent prototype for typed arrays and data view
  if (setPrototypeOf$3 && getPrototypeOf$1($DataViewPrototype) !== ObjectPrototype$1) {
    setPrototypeOf$3($DataViewPrototype, ObjectPrototype$1);
  }

  // iOS Safari 7.x bug
  var testView = new $DataView(new $ArrayBuffer(2));
  var nativeSetInt8 = $DataViewPrototype.setInt8;
  testView.setInt8(0, 2147483648);
  testView.setInt8(1, 2147483649);
  if (testView.getInt8(0) || !testView.getInt8(1)) redefineAll($DataViewPrototype, {
    setInt8: function setInt8(byteOffset, value) {
      nativeSetInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      nativeSetInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, { unsafe: true });
}

setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);

var arrayBuffer = {
  ArrayBuffer: $ArrayBuffer,
  DataView: $DataView
};

var $$1 = _export;
var fails$3 = fails$h;
var ArrayBufferModule$1 = arrayBuffer;
var anObject = anObject$b;
var toAbsoluteIndex = toAbsoluteIndex$3;
var toLength$4 = toLength$b;
var speciesConstructor = speciesConstructor$2;

var ArrayBuffer$3 = ArrayBufferModule$1.ArrayBuffer;
var DataView$2 = ArrayBufferModule$1.DataView;
var nativeArrayBufferSlice = ArrayBuffer$3.prototype.slice;

var INCORRECT_SLICE = fails$3(function () {
  return !new ArrayBuffer$3(2).slice(1, undefined).byteLength;
});

// `ArrayBuffer.prototype.slice` method
// https://tc39.github.io/ecma262/#sec-arraybuffer.prototype.slice
$$1({ target: 'ArrayBuffer', proto: true, unsafe: true, forced: INCORRECT_SLICE }, {
  slice: function slice(start, end) {
    if (nativeArrayBufferSlice !== undefined && end === undefined) {
      return nativeArrayBufferSlice.call(anObject(this), start); // FF fix
    }
    var length = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    var result = new (speciesConstructor(this, ArrayBuffer$3))(toLength$4(fin - first));
    var viewSource = new DataView$2(this);
    var viewTarget = new DataView$2(result);
    var index = 0;
    while (first < fin) {
      viewTarget.setUint8(index++, viewSource.getUint8(first++));
    } return result;
  }
});

var typedArrayConstructor = {exports: {}};

var NATIVE_ARRAY_BUFFER = arrayBufferNative;
var DESCRIPTORS$1 = descriptors;
var global$4 = global$n;
var isObject$3 = isObject$c;
var has$1 = has$c;
var classof$2 = classof$8;
var createNonEnumerableProperty$1 = createNonEnumerableProperty$a;
var redefine = redefine$5.exports;
var defineProperty = objectDefineProperty.f;
var getPrototypeOf = objectGetPrototypeOf;
var setPrototypeOf$2 = objectSetPrototypeOf;
var wellKnownSymbol$1 = wellKnownSymbol$h;
var uid = uid$3;

var Int8Array$3 = global$4.Int8Array;
var Int8ArrayPrototype = Int8Array$3 && Int8Array$3.prototype;
var Uint8ClampedArray = global$4.Uint8ClampedArray;
var Uint8ClampedArrayPrototype = Uint8ClampedArray && Uint8ClampedArray.prototype;
var TypedArray$1 = Int8Array$3 && getPrototypeOf(Int8Array$3);
var TypedArrayPrototype$1 = Int8ArrayPrototype && getPrototypeOf(Int8ArrayPrototype);
var ObjectPrototype = Object.prototype;
var isPrototypeOf = ObjectPrototype.isPrototypeOf;

var TO_STRING_TAG = wellKnownSymbol$1('toStringTag');
var TYPED_ARRAY_TAG$1 = uid('TYPED_ARRAY_TAG');
// Fixing native typed arrays in Opera Presto crashes the browser, see #595
var NATIVE_ARRAY_BUFFER_VIEWS$2 = NATIVE_ARRAY_BUFFER && !!setPrototypeOf$2 && classof$2(global$4.opera) !== 'Opera';
var TYPED_ARRAY_TAG_REQIRED = false;
var NAME;

var TypedArrayConstructorsList = {
  Int8Array: 1,
  Uint8Array: 1,
  Uint8ClampedArray: 1,
  Int16Array: 2,
  Uint16Array: 2,
  Int32Array: 4,
  Uint32Array: 4,
  Float32Array: 4,
  Float64Array: 8
};

var isView = function isView(it) {
  var klass = classof$2(it);
  return klass === 'DataView' || has$1(TypedArrayConstructorsList, klass);
};

var isTypedArray$1 = function (it) {
  return isObject$3(it) && has$1(TypedArrayConstructorsList, classof$2(it));
};

var aTypedArray$4 = function (it) {
  if (isTypedArray$1(it)) return it;
  throw TypeError('Target is not a typed array');
};

var aTypedArrayConstructor$2 = function (C) {
  if (setPrototypeOf$2) {
    if (isPrototypeOf.call(TypedArray$1, C)) return C;
  } else for (var ARRAY in TypedArrayConstructorsList) if (has$1(TypedArrayConstructorsList, NAME)) {
    var TypedArrayConstructor = global$4[ARRAY];
    if (TypedArrayConstructor && (C === TypedArrayConstructor || isPrototypeOf.call(TypedArrayConstructor, C))) {
      return C;
    }
  } throw TypeError('Target is not a typed array constructor');
};

var exportTypedArrayMethod$4 = function (KEY, property, forced) {
  if (!DESCRIPTORS$1) return;
  if (forced) for (var ARRAY in TypedArrayConstructorsList) {
    var TypedArrayConstructor = global$4[ARRAY];
    if (TypedArrayConstructor && has$1(TypedArrayConstructor.prototype, KEY)) {
      delete TypedArrayConstructor.prototype[KEY];
    }
  }
  if (!TypedArrayPrototype$1[KEY] || forced) {
    redefine(TypedArrayPrototype$1, KEY, forced ? property
      : NATIVE_ARRAY_BUFFER_VIEWS$2 && Int8ArrayPrototype[KEY] || property);
  }
};

var exportTypedArrayStaticMethod$1 = function (KEY, property, forced) {
  var ARRAY, TypedArrayConstructor;
  if (!DESCRIPTORS$1) return;
  if (setPrototypeOf$2) {
    if (forced) for (ARRAY in TypedArrayConstructorsList) {
      TypedArrayConstructor = global$4[ARRAY];
      if (TypedArrayConstructor && has$1(TypedArrayConstructor, KEY)) {
        delete TypedArrayConstructor[KEY];
      }
    }
    if (!TypedArray$1[KEY] || forced) {
      // V8 ~ Chrome 49-50 `%TypedArray%` methods are non-writable non-configurable
      try {
        return redefine(TypedArray$1, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS$2 && Int8Array$3[KEY] || property);
      } catch (error) { /* empty */ }
    } else return;
  }
  for (ARRAY in TypedArrayConstructorsList) {
    TypedArrayConstructor = global$4[ARRAY];
    if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {
      redefine(TypedArrayConstructor, KEY, property);
    }
  }
};

for (NAME in TypedArrayConstructorsList) {
  if (!global$4[NAME]) NATIVE_ARRAY_BUFFER_VIEWS$2 = false;
}

// WebKit bug - typed arrays constructors prototype is Object.prototype
if (!NATIVE_ARRAY_BUFFER_VIEWS$2 || typeof TypedArray$1 != 'function' || TypedArray$1 === Function.prototype) {
  // eslint-disable-next-line no-shadow
  TypedArray$1 = function TypedArray() {
    throw TypeError('Incorrect invocation');
  };
  if (NATIVE_ARRAY_BUFFER_VIEWS$2) for (NAME in TypedArrayConstructorsList) {
    if (global$4[NAME]) setPrototypeOf$2(global$4[NAME], TypedArray$1);
  }
}

if (!NATIVE_ARRAY_BUFFER_VIEWS$2 || !TypedArrayPrototype$1 || TypedArrayPrototype$1 === ObjectPrototype) {
  TypedArrayPrototype$1 = TypedArray$1.prototype;
  if (NATIVE_ARRAY_BUFFER_VIEWS$2) for (NAME in TypedArrayConstructorsList) {
    if (global$4[NAME]) setPrototypeOf$2(global$4[NAME].prototype, TypedArrayPrototype$1);
  }
}

// WebKit bug - one more object in Uint8ClampedArray prototype chain
if (NATIVE_ARRAY_BUFFER_VIEWS$2 && getPrototypeOf(Uint8ClampedArrayPrototype) !== TypedArrayPrototype$1) {
  setPrototypeOf$2(Uint8ClampedArrayPrototype, TypedArrayPrototype$1);
}

if (DESCRIPTORS$1 && !has$1(TypedArrayPrototype$1, TO_STRING_TAG)) {
  TYPED_ARRAY_TAG_REQIRED = true;
  defineProperty(TypedArrayPrototype$1, TO_STRING_TAG, { get: function () {
    return isObject$3(this) ? this[TYPED_ARRAY_TAG$1] : undefined;
  } });
  for (NAME in TypedArrayConstructorsList) if (global$4[NAME]) {
    createNonEnumerableProperty$1(global$4[NAME], TYPED_ARRAY_TAG$1, NAME);
  }
}

var arrayBufferViewCore = {
  NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS$2,
  TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQIRED && TYPED_ARRAY_TAG$1,
  aTypedArray: aTypedArray$4,
  aTypedArrayConstructor: aTypedArrayConstructor$2,
  exportTypedArrayMethod: exportTypedArrayMethod$4,
  exportTypedArrayStaticMethod: exportTypedArrayStaticMethod$1,
  isView: isView,
  isTypedArray: isTypedArray$1,
  TypedArray: TypedArray$1,
  TypedArrayPrototype: TypedArrayPrototype$1
};

/* eslint-disable no-new */

var global$3 = global$n;
var fails$2 = fails$h;
var checkCorrectnessOfIteration = checkCorrectnessOfIteration$2;
var NATIVE_ARRAY_BUFFER_VIEWS$1 = arrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;

var ArrayBuffer$2 = global$3.ArrayBuffer;
var Int8Array$2 = global$3.Int8Array;

var typedArrayConstructorsRequireWrappers = !NATIVE_ARRAY_BUFFER_VIEWS$1 || !fails$2(function () {
  Int8Array$2(1);
}) || !fails$2(function () {
  new Int8Array$2(-1);
}) || !checkCorrectnessOfIteration(function (iterable) {
  new Int8Array$2();
  new Int8Array$2(null);
  new Int8Array$2(1.5);
  new Int8Array$2(iterable);
}, true) || fails$2(function () {
  // Safari (11+) bug - a reason why even Safari 13 should load a typed array polyfill
  return new Int8Array$2(new ArrayBuffer$2(2), 1, undefined).length !== 1;
});

var toInteger = toInteger$5;

var toPositiveInteger$1 = function (it) {
  var result = toInteger(it);
  if (result < 0) throw RangeError("The argument can't be less than 0");
  return result;
};

var toPositiveInteger = toPositiveInteger$1;

var toOffset$2 = function (it, BYTES) {
  var offset = toPositiveInteger(it);
  if (offset % BYTES) throw RangeError('Wrong offset');
  return offset;
};

var toObject$2 = toObject$7;
var toLength$3 = toLength$b;
var getIteratorMethod = getIteratorMethod$2;
var isArrayIteratorMethod = isArrayIteratorMethod$2;
var bind$1 = functionBindContext;
var aTypedArrayConstructor$1 = arrayBufferViewCore.aTypedArrayConstructor;

var typedArrayFrom$2 = function from(source /* , mapfn, thisArg */) {
  var O = toObject$2(source);
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  var iteratorMethod = getIteratorMethod(O);
  var i, length, result, step, iterator, next;
  if (iteratorMethod != undefined && !isArrayIteratorMethod(iteratorMethod)) {
    iterator = iteratorMethod.call(O);
    next = iterator.next;
    O = [];
    while (!(step = next.call(iterator)).done) {
      O.push(step.value);
    }
  }
  if (mapping && argumentsLength > 2) {
    mapfn = bind$1(mapfn, arguments[2], 2);
  }
  length = toLength$3(O.length);
  result = new (aTypedArrayConstructor$1(this))(length);
  for (i = 0; length > i; i++) {
    result[i] = mapping ? mapfn(O[i], i) : O[i];
  }
  return result;
};

var classof$1 = classofRaw$1;

// `IsArray` abstract operation
// https://tc39.github.io/ecma262/#sec-isarray
var isArray$1 = Array.isArray || function isArray(arg) {
  return classof$1(arg) == 'Array';
};

var isObject$2 = isObject$c;
var isArray = isArray$1;
var wellKnownSymbol = wellKnownSymbol$h;

var SPECIES = wellKnownSymbol('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
var arraySpeciesCreate$1 = function (originalArray, length) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject$2(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};

var bind = functionBindContext;
var IndexedObject = indexedObject;
var toObject$1 = toObject$7;
var toLength$2 = toLength$b;
var arraySpeciesCreate = arraySpeciesCreate$1;

var push = [].push;

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject$1($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that, 3);
    var length = toLength$2(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push.call(target, value); // filter
        } else if (IS_EVERY) return false;  // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

var arrayIteration = {
  // `Array.prototype.forEach` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6)
};

var isObject$1 = isObject$c;
var setPrototypeOf$1 = objectSetPrototypeOf;

// makes subclassing work correct for wrapped built-ins
var inheritIfRequired$1 = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf$1 &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    typeof (NewTarget = dummy.constructor) == 'function' &&
    NewTarget !== Wrapper &&
    isObject$1(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf$1($this, NewTargetPrototype);
  return $this;
};

var $ = _export;
var global$2 = global$n;
var DESCRIPTORS = descriptors;
var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS$1 = typedArrayConstructorsRequireWrappers;
var ArrayBufferViewCore$4 = arrayBufferViewCore;
var ArrayBufferModule = arrayBuffer;
var anInstance = anInstance$3;
var createPropertyDescriptor = createPropertyDescriptor$4;
var createNonEnumerableProperty = createNonEnumerableProperty$a;
var toLength$1 = toLength$b;
var toIndex = toIndex$2;
var toOffset$1 = toOffset$2;
var toPrimitive = toPrimitive$3;
var has = has$c;
var classof = classof$8;
var isObject = isObject$c;
var create = objectCreate;
var setPrototypeOf = objectSetPrototypeOf;
var getOwnPropertyNames = objectGetOwnPropertyNames.f;
var typedArrayFrom$1 = typedArrayFrom$2;
var forEach = arrayIteration.forEach;
var setSpecies = setSpecies$2;
var definePropertyModule = objectDefineProperty;
var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
var InternalStateModule = internalState;
var inheritIfRequired = inheritIfRequired$1;

var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var round = Math.round;
var RangeError$1 = global$2.RangeError;
var ArrayBuffer$1 = ArrayBufferModule.ArrayBuffer;
var DataView$1 = ArrayBufferModule.DataView;
var NATIVE_ARRAY_BUFFER_VIEWS = ArrayBufferViewCore$4.NATIVE_ARRAY_BUFFER_VIEWS;
var TYPED_ARRAY_TAG = ArrayBufferViewCore$4.TYPED_ARRAY_TAG;
var TypedArray = ArrayBufferViewCore$4.TypedArray;
var TypedArrayPrototype = ArrayBufferViewCore$4.TypedArrayPrototype;
var aTypedArrayConstructor = ArrayBufferViewCore$4.aTypedArrayConstructor;
var isTypedArray = ArrayBufferViewCore$4.isTypedArray;
var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
var WRONG_LENGTH = 'Wrong length';

var fromList = function (C, list) {
  var index = 0;
  var length = list.length;
  var result = new (aTypedArrayConstructor(C))(length);
  while (length > index) result[index] = list[index++];
  return result;
};

var addGetter = function (it, key) {
  nativeDefineProperty(it, key, { get: function () {
    return getInternalState(this)[key];
  } });
};

var isArrayBuffer = function (it) {
  var klass;
  return it instanceof ArrayBuffer$1 || (klass = classof(it)) == 'ArrayBuffer' || klass == 'SharedArrayBuffer';
};

var isTypedArrayIndex = function (target, key) {
  return isTypedArray(target)
    && typeof key != 'symbol'
    && key in target
    && String(+key) == String(key);
};

var wrappedGetOwnPropertyDescriptor = function getOwnPropertyDescriptor(target, key) {
  return isTypedArrayIndex(target, key = toPrimitive(key, true))
    ? createPropertyDescriptor(2, target[key])
    : nativeGetOwnPropertyDescriptor(target, key);
};

var wrappedDefineProperty = function defineProperty(target, key, descriptor) {
  if (isTypedArrayIndex(target, key = toPrimitive(key, true))
    && isObject(descriptor)
    && has(descriptor, 'value')
    && !has(descriptor, 'get')
    && !has(descriptor, 'set')
    // TODO: add validation descriptor w/o calling accessors
    && !descriptor.configurable
    && (!has(descriptor, 'writable') || descriptor.writable)
    && (!has(descriptor, 'enumerable') || descriptor.enumerable)
  ) {
    target[key] = descriptor.value;
    return target;
  } return nativeDefineProperty(target, key, descriptor);
};

if (DESCRIPTORS) {
  if (!NATIVE_ARRAY_BUFFER_VIEWS) {
    getOwnPropertyDescriptorModule.f = wrappedGetOwnPropertyDescriptor;
    definePropertyModule.f = wrappedDefineProperty;
    addGetter(TypedArrayPrototype, 'buffer');
    addGetter(TypedArrayPrototype, 'byteOffset');
    addGetter(TypedArrayPrototype, 'byteLength');
    addGetter(TypedArrayPrototype, 'length');
  }

  $({ target: 'Object', stat: true, forced: !NATIVE_ARRAY_BUFFER_VIEWS }, {
    getOwnPropertyDescriptor: wrappedGetOwnPropertyDescriptor,
    defineProperty: wrappedDefineProperty
  });

  typedArrayConstructor.exports = function (TYPE, wrapper, CLAMPED) {
    var BYTES = TYPE.match(/\d+$/)[0] / 8;
    var CONSTRUCTOR_NAME = TYPE + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + TYPE;
    var SETTER = 'set' + TYPE;
    var NativeTypedArrayConstructor = global$2[CONSTRUCTOR_NAME];
    var TypedArrayConstructor = NativeTypedArrayConstructor;
    var TypedArrayConstructorPrototype = TypedArrayConstructor && TypedArrayConstructor.prototype;
    var exported = {};

    var getter = function (that, index) {
      var data = getInternalState(that);
      return data.view[GETTER](index * BYTES + data.byteOffset, true);
    };

    var setter = function (that, index, value) {
      var data = getInternalState(that);
      if (CLAMPED) value = (value = round(value)) < 0 ? 0 : value > 0xFF ? 0xFF : value & 0xFF;
      data.view[SETTER](index * BYTES + data.byteOffset, value, true);
    };

    var addElement = function (that, index) {
      nativeDefineProperty(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };

    if (!NATIVE_ARRAY_BUFFER_VIEWS) {
      TypedArrayConstructor = wrapper(function (that, data, offset, $length) {
        anInstance(that, TypedArrayConstructor, CONSTRUCTOR_NAME);
        var index = 0;
        var byteOffset = 0;
        var buffer, byteLength, length;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new ArrayBuffer$1(byteLength);
        } else if (isArrayBuffer(data)) {
          buffer = data;
          byteOffset = toOffset$1(offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError$1(WRONG_LENGTH);
            byteLength = $len - byteOffset;
            if (byteLength < 0) throw RangeError$1(WRONG_LENGTH);
          } else {
            byteLength = toLength$1($length) * BYTES;
            if (byteLength + byteOffset > $len) throw RangeError$1(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (isTypedArray(data)) {
          return fromList(TypedArrayConstructor, data);
        } else {
          return typedArrayFrom$1.call(TypedArrayConstructor, data);
        }
        setInternalState(that, {
          buffer: buffer,
          byteOffset: byteOffset,
          byteLength: byteLength,
          length: length,
          view: new DataView$1(buffer)
        });
        while (index < length) addElement(that, index++);
      });

      if (setPrototypeOf) setPrototypeOf(TypedArrayConstructor, TypedArray);
      TypedArrayConstructorPrototype = TypedArrayConstructor.prototype = create(TypedArrayPrototype);
    } else if (TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS$1) {
      TypedArrayConstructor = wrapper(function (dummy, data, typedArrayOffset, $length) {
        anInstance(dummy, TypedArrayConstructor, CONSTRUCTOR_NAME);
        return inheritIfRequired(function () {
          if (!isObject(data)) return new NativeTypedArrayConstructor(toIndex(data));
          if (isArrayBuffer(data)) return $length !== undefined
            ? new NativeTypedArrayConstructor(data, toOffset$1(typedArrayOffset, BYTES), $length)
            : typedArrayOffset !== undefined
              ? new NativeTypedArrayConstructor(data, toOffset$1(typedArrayOffset, BYTES))
              : new NativeTypedArrayConstructor(data);
          if (isTypedArray(data)) return fromList(TypedArrayConstructor, data);
          return typedArrayFrom$1.call(TypedArrayConstructor, data);
        }(), dummy, TypedArrayConstructor);
      });

      if (setPrototypeOf) setPrototypeOf(TypedArrayConstructor, TypedArray);
      forEach(getOwnPropertyNames(NativeTypedArrayConstructor), function (key) {
        if (!(key in TypedArrayConstructor)) {
          createNonEnumerableProperty(TypedArrayConstructor, key, NativeTypedArrayConstructor[key]);
        }
      });
      TypedArrayConstructor.prototype = TypedArrayConstructorPrototype;
    }

    if (TypedArrayConstructorPrototype.constructor !== TypedArrayConstructor) {
      createNonEnumerableProperty(TypedArrayConstructorPrototype, 'constructor', TypedArrayConstructor);
    }

    if (TYPED_ARRAY_TAG) {
      createNonEnumerableProperty(TypedArrayConstructorPrototype, TYPED_ARRAY_TAG, CONSTRUCTOR_NAME);
    }

    exported[CONSTRUCTOR_NAME] = TypedArrayConstructor;

    $({
      global: true, forced: TypedArrayConstructor != NativeTypedArrayConstructor, sham: !NATIVE_ARRAY_BUFFER_VIEWS
    }, exported);

    if (!(BYTES_PER_ELEMENT in TypedArrayConstructor)) {
      createNonEnumerableProperty(TypedArrayConstructor, BYTES_PER_ELEMENT, BYTES);
    }

    if (!(BYTES_PER_ELEMENT in TypedArrayConstructorPrototype)) {
      createNonEnumerableProperty(TypedArrayConstructorPrototype, BYTES_PER_ELEMENT, BYTES);
    }

    setSpecies(CONSTRUCTOR_NAME);
  };
} else typedArrayConstructor.exports = function () { /* empty */ };

var createTypedArrayConstructor = typedArrayConstructor.exports;

// `Uint8Array` constructor
// https://tc39.github.io/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Uint8', function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

var ArrayBufferViewCore$3 = arrayBufferViewCore;
var $fill = arrayFill$1;

var aTypedArray$3 = ArrayBufferViewCore$3.aTypedArray;
var exportTypedArrayMethod$3 = ArrayBufferViewCore$3.exportTypedArrayMethod;

// `%TypedArray%.prototype.fill` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.fill
// eslint-disable-next-line no-unused-vars
exportTypedArrayMethod$3('fill', function fill(value /* , start, end */) {
  return $fill.apply(aTypedArray$3(this), arguments);
});

var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS = typedArrayConstructorsRequireWrappers;
var exportTypedArrayStaticMethod = arrayBufferViewCore.exportTypedArrayStaticMethod;
var typedArrayFrom = typedArrayFrom$2;

// `%TypedArray%.from` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.from
exportTypedArrayStaticMethod('from', typedArrayFrom, TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS);

var ArrayBufferViewCore$2 = arrayBufferViewCore;
var toLength = toLength$b;
var toOffset = toOffset$2;
var toObject = toObject$7;
var fails$1 = fails$h;

var aTypedArray$2 = ArrayBufferViewCore$2.aTypedArray;
var exportTypedArrayMethod$2 = ArrayBufferViewCore$2.exportTypedArrayMethod;

var FORCED$1 = fails$1(function () {
  // eslint-disable-next-line no-undef
  new Int8Array(1).set({});
});

// `%TypedArray%.prototype.set` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.set
exportTypedArrayMethod$2('set', function set(arrayLike /* , offset */) {
  aTypedArray$2(this);
  var offset = toOffset(arguments.length > 1 ? arguments[1] : undefined, 1);
  var length = this.length;
  var src = toObject(arrayLike);
  var len = toLength(src.length);
  var index = 0;
  if (len + offset > length) throw RangeError('Wrong length');
  while (index < len) this[offset + index] = src[index++];
}, FORCED$1);

var ArrayBufferViewCore$1 = arrayBufferViewCore;

var aTypedArray$1 = ArrayBufferViewCore$1.aTypedArray;
var exportTypedArrayMethod$1 = ArrayBufferViewCore$1.exportTypedArrayMethod;
var $sort = [].sort;

// `%TypedArray%.prototype.sort` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.sort
exportTypedArrayMethod$1('sort', function sort(comparefn) {
  return $sort.call(aTypedArray$1(this), comparefn);
});

var global$1 = global$n;
var ArrayBufferViewCore = arrayBufferViewCore;
var fails = fails$h;

var Int8Array$1 = global$1.Int8Array;
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var $toLocaleString = [].toLocaleString;
var $slice = [].slice;

// iOS Safari 6.x fails here
var TO_LOCALE_STRING_BUG = !!Int8Array$1 && fails(function () {
  $toLocaleString.call(new Int8Array$1(1));
});

var FORCED = fails(function () {
  return [1, 2].toLocaleString() != new Int8Array$1([1, 2]).toLocaleString();
}) || !fails(function () {
  Int8Array$1.prototype.toLocaleString.call([1, 2]);
});

// `%TypedArray%.prototype.toLocaleString` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.tolocalestring
exportTypedArrayMethod('toLocaleString', function toLocaleString() {
  return $toLocaleString.apply(TO_LOCALE_STRING_BUG ? $slice.call(aTypedArray(this)) : aTypedArray(this), arguments);
}, FORCED);

class Payload {
  constructor(data) {
    // The tag's value is a hardcoded value as per
    // defined in the NEP [NEP413](https://github.com/near/NEPs/blob/master/neps/nep-0413.md)
    this.tag = 2147484061;
    this.message = data.message;
    this.nonce = data.nonce;
    this.recipient = data.recipient;
    if (data.callbackUrl) {
      this.callbackUrl = data.callbackUrl;
    }
  }
}
const payloadSchema = {
  struct: {
    tag: "u32",
    message: "string",
    nonce: {
      array: {
        type: "u8",
        len: 32
      }
    },
    recipient: "string",
    callbackUrl: {
      option: "string"
    }
  }
};
const serializeNep413 = signMessageParams => {
  const payload = new Payload(Object.assign({}, signMessageParams));
  return Buffer.from(serialize(payloadSchema, payload));
};

const verifySignature = ({
  publicKey,
  signature,
  message,
  nonce,
  recipient,
  callbackUrl
}) => {
  // Reconstruct the payload that was **actually signed**
  const payload = new Payload({
    message,
    nonce,
    recipient,
    callbackUrl
  });
  // Serialize payload based on payloadSchema
  const borshPayload = serialize(payloadSchema, payload);
  // Hash the payload as in the NEP0413 referenced example
  // https://github.com/near/NEPs/blob/master/neps/nep-0413.md#references
  // https://github.com/gagdiez/near-login/blob/main/authenticate/wallet-authenticate.js#L21
  const hashedPayload = Uint8Array.from(sha256.array(borshPayload));
  // Convert real signature to buffer base64
  const realSignature = Buffer.from(signature, "base64");
  const pk = utils.PublicKey.from(publicKey);
  // Verify the signature
  return pk.verify(hashedPayload, realSignature);
};
const fetchAllUserKeys = ({
  accountId,
  network,
  publicKey
}) => __awaiter(void 0, void 0, void 0, function* () {
  const provider = new providers.JsonRpcProvider({
    url: network.nodeUrl
  });
  const key = yield provider.query({
    request_type: "view_access_key",
    account_id: accountId,
    finality: "final",
    public_key: publicKey
  });
  return key;
});
const verifyFullKeyBelongsToUser = ({
  publicKey,
  accountId,
  network
}) => __awaiter(void 0, void 0, void 0, function* () {
  const {
    permission
  } = yield fetchAllUserKeys({
    accountId,
    network,
    publicKey
  });
  return permission === "FullAccess";
});

var modal$b = {
	wallet: {
		connectYourWallet: "Connect Your Wallet",
		whatIsAWallet: "What is a Wallet?",
		secureAndManage: "Secure & Manage Your Digital Assets",
		safelyStore: "Safely store and transfer your crypto and NFTs.",
		logInToAny: "Log In to Any NEAR App",
		noNeedToCreate: "No need to create new accounts or credentials. Connect your wallet and you are good to go!",
		getAWallet: "Get a Wallet",
		useAWallet: "Use a wallet to secure and manage your NEAR assets, and to log in to any NEAR app without the need for usernames and passwords.",
		connectionFailed: "Connection Failed",
		connectionSuccessful: "Connection Successful",
		rememberWallet: "Remember wallets",
		connected: "Connected",
		connectingTo: "Connecting to",
		connectingMessage: {
			injected: "Confirm the connection in the extension window",
			browser: "Confirm the connection in the wallet after redirect",
			hardware: "Confirm the connection in the ledger device",
			bridge: "Confirm the connection in the wallet"
		}
	},
	ledger: {
		connectWithLedger: "Connect with Ledger",
		makeSureYourLedger: "Make sure your Ledger is connected securely, and that the NEAR app is open on your device",
		"continue": "Continue",
		specifyHDPath: "Specify HD Path",
		enterYourPreferredHDPath: "Enter your preferred HD path, then scan for any active accounts.",
		scan: "Scan",
		retry: "Retry",
		ledgerIsNotAvailable: "Ledger is not available",
		accessDeniedToUseLedgerDevice: "Access denied to use Ledger device",
		noAccountsFound: "No Accounts Found",
		selectYourAccounts: "Select Your Accounts",
		connecting1Account: "Connecting 1 Account",
		cantFindAnyAccount: "Can't find any account associated with this Ledger. Please create a new NEAR account on",
		orConnectAnAnotherLedger: "or connect an another Ledger.",
		connecting: "Connecting",
		ofAccounts: "of Accounts",
		failedToAutomatically: "Failed to automatically find account id. Provide it manually:",
		overviewTheListOfAuthorized: "Overview the list of authorized account(s), complete sign in by clicking the button below.",
		finish: "Finish"
	},
	install: {
		youllNeedToInstall: "You'll need to install",
		toContinueAfterInstalling: "to continue. After installing",
		refreshThePage: "refresh the page.",
		open: "Open"
	},
	qr: {
		copiedToClipboard: "Copied to clipboard",
		failedToCopy: "Failed to copy to clipboard",
		scanWithYourMobile: "Scan with Your Mobile Device",
		copyToClipboard: " Copy to clipboard",
		preferTheOfficial: "Prefer the official dialogue of",
		open: "Open"
	},
	walletTypes: {
		hardware: "Hardware Wallet",
		browser: "Browser Wallet",
		injected: "Wallet Extension",
		bridge: "Bridge Wallet",
		mobile: "Mobile Wallet",
		"instant-link": "Instant Wallet"
	},
	exportAccounts: {
		chooseAWallet: "Choose a Wallet",
		transferYourAccounts: "Transfer Your Accounts",
		selectAWallet: "Select a wallet that fits your needs and supports your connected accounts.",
		selectYourAccounts: "Select Your Accounts",
		afterDecide: "After you decide on a wallet, you can select which accounts you want to transfer.",
		disclaimer: "You won’t be able to transfer accounts that have never been funded or used on NEAR.",
		warning: "does not support account export at this time. Please select another wallet.",
		walletTypes: {
			hardware: "Hardware Wallet",
			browser: "Browser Wallet",
			injected: "Wallet Extension",
			bridge: "Bridge Wallet",
			mobile: "Mobile Wallet"
		},
		selectAccounts: {
			title: "Select Accounts to Transfer",
			button: "Continue",
			deselectAll: "Deselect All",
			selectAll: "Select All",
			unavailable: "Transfer Unavailable",
			error: "Account does not exist",
			warningLedger: "Ledger support required",
			noBalance: "Account not funded"
		},
		getPassphrase: {
			title: "Copy Temporary Password",
			desc: "You’ll need to enter this password when you begin exporting your accounts to a different wallet.",
			button: "Continue",
			transferButton: "Transfer Accounts",
			label: "Click to Copy",
			checkLabel: "I copied or wrote down the password"
		},
		complete: {
			title: "Complete the Transfer",
			descOne: "You will now be redirected to the wallet you selected to complete the transfer.",
			descTwo: "Once import part of process is completed from selected wallet, press button to complete the transfer process.",
			startOverButton: "Start Over",
			button: "Complete"
		}
	}
};
var component$5 = {
	clickToCopy: {
		label: "Copied",
		tooltip: "Click to copy"
	}
};
var en = {
	modal: modal$b,
	component: component$5
};

var modal$a = {
	wallet: {
		connectYourWallet: "Conecta Tu Billetera",
		whatIsAWallet: "¿Que es una Billetera?",
		secureAndManage: "Resguarda y Administrar Tus Activos Digitales",
		safelyStore: "Almacena de forma segura y transfiere tus cryptos y NFT's",
		logInToAny: "Inicie sesión en Cualquier Aplicacion NEAR",
		noNeedToCreate: "No es necesario crear nuevas cuentas o credenciales, ¡Conecta tu billetera y listo!",
		getAWallet: "Obten una Billetera",
		useAWallet: "Usa tu Billetera para resguardar y administrar tus activos en NEAR, e Iniciar sesión en cualquier aplicacion NEAR sin la necesidad de nombres de usuarios y contraseñas",
		connectionFailed: "Conexión Fallida",
		connectionSuccessful: "Conexión Existosa",
		rememberWallet: "Recordar las carteras",
		connected: "Conectado",
		connectingTo: "Conectando a ",
		connectingMessage: {
			injected: "Confirme la conexión en la ventana de extensión",
			browser: "Confirme la conexión en la billetera después de la redirección",
			hardware: "Confirme la conexión en el dispositivo de libro mayor",
			bridge: "Confirmar la conexión en la billetera"
		}
	},
	ledger: {
		connectWithLedger: "Conectar con Ledger",
		makeSureYourLedger: "Asegúrese de que su ledger está conectada de forma segura y que la aplicacion NEAR esté abierta en su dispositivo",
		"continue": "Continuar",
		specifyHDPath: "Especifique la ruta HD",
		enterYourPreferredHDPath: "Ingrese su ruta HD prerida,y luego busque cualquier cuenta activa.",
		scan: "Escanear",
		retry: "Reintentar",
		ledgerIsNotAvailable: "El Ledger no está disponible",
		accessDeniedToUseLedgerDevice: "Acceso denegado para usar el dispositivo ledger",
		noAccountsFound: "No se encontraron cuentas",
		selectYourAccounts: "Selecciona tus cuentas",
		connecting1Account: "Conectando a 1 cuenta",
		cantFindAnyAccount: "No se pudo encontrar ninguna cuenta asociada con este ledger,Por favor crea una nueva cuenta en NEAR",
		orConnectAnAnotherLedger: "o conecta otro ledger",
		connecting: "Conectando",
		ofAccounts: "de Cuentas",
		failedToAutomatically: "No se pudo encontrar automaticamente el id de la cuenta,Ingresalo manualmente:",
		overviewTheListOfAuthorized: "Revise la lista de las cuentas autorizadas,Complete el inicio de sesión haciedo click a countinuacion.",
		finish: "Finalizar"
	},
	install: {
		youllNeedToInstall: "Tendrás que instalar",
		toContinueAfterInstalling: "Para continuar, Despues de instalar",
		refreshThePage: "Recarga la pagina",
		open: "Abrir"
	},
	qr: {
		copiedToClipboard: "Copiado al Portapapeles",
		failedToCopy: "Falló la copia al Portapapeles",
		scanWithYourMobile: "Busca con tu dispositivo movil",
		copyToClipboard: " Copiar al Portapapeles",
		preferTheOfficial: "¿Prefires el diálogo oficial de",
		open: "Abrir"
	},
	walletTypes: {
		hardware: "Cartera de Hardware",
		browser: "Cartera de Navegador",
		injected: "Extensión de Cartera",
		bridge: "Cartera de Puente",
		mobile: "Cartera Móvil",
		"instant-link": "Cartera Instantánea"
	},
	exportAccounts: {
		afterDecide: "Después de decidirte por una billetera, puedes seleccionar qué cuentas deseas transferir.",
		chooseAWallet: "Elige una Billetera",
		complete: {
			button: "Completar",
			descOne: "Ahora serás redirigido a la billetera que seleccionaste para completar la transferencia.",
			descTwo: "Una vez que se haya completado la parte de importación del proceso desde la billetera seleccionada, presiona el botón para finalizar el proceso de transferencia.",
			startOverButton: "Empezar de Nuevo",
			title: "Completar la Transferencia"
		},
		disclaimer: "No podrás transferir cuentas que nunca hayan sido financiadas o utilizadas en NEAR.",
		getPassphrase: {
			button: "Continuar",
			checkLabel: "Copie o anote la contraseña",
			desc: "Necesitarás ingresar esta contraseña cuando comiences a exportar tus cuentas a otra billetera.",
			label: "Haga clic para Copiar",
			title: "Copiar Contraseña Temporal",
			transferButton: "Transferir Cuentas"
		},
		selectAWallet: "Selecciona una billetera que se ajuste a tus necesidades y que soporte tus cuentas conectadas.",
		selectAccounts: {
			button: "Continuar",
			deselectAll: "Deseleccionar Todo",
			error: "La cuenta no existe",
			noBalance: "Cuenta no financiada",
			selectAll: "Seleccionar Todo",
			title: "Seleccionar Cuentas para Transferir",
			unavailable: "Transferencia No Disponible",
			warningLedger: "Se requiere soporte de Ledger"
		},
		selectYourAccounts: "Selecciona Tus Cuentas",
		transferYourAccounts: "Transfiere Tus Cuentas",
		walletTypes: {
			bridge: "Billetera Bridge",
			browser: "Billetera de Navegador",
			hardware: "Billetera de Hardware",
			injected: "Extensión de Billetera",
			mobile: "Billetera Móvil"
		},
		warning: "no admite la exportación de cuentas en este momento. Por favor selecciona otra billetera."
	}
};
var component$4 = {
	clickToCopy: {
		label: "Copiado",
		tooltip: "Haga clic para copiar"
	}
};
var es = {
	modal: modal$a,
	component: component$4
};

var modal$9 = {
	wallet: {
		connectYourWallet: "连接你的钱包",
		whatIsAWallet: "什么是钱包？",
		secureAndManage: "保护和管理你的数字资产",
		safelyStore: "安全存储和转移你的加密货币和NFT",
		logInToAny: "登录任何 NEAR 应用",
		noNeedToCreate: "不需要创建新账户或密码。连接你的钱包，即可开始使用！",
		getAWallet: "获取新账户",
		useAWallet: "使用钱包来保护和管理你的 NEAR 资产，无需用户名和密码即可登录任何 NEAR 应用",
		connectionFailed: "连接失败",
		connectionSuccessful: "连接成功",
		rememberWallet: "记住钱包选择",
		connected: "已连接",
		connectingTo: "正在连接"
	},
	ledger: {
		connectWithLedger: "连接 Ledger",
		makeSureYourLedger: "确保你的 Ledger 已经安全连接，并且 NEAR 应用已经在你设备上打开",
		"continue": "继续",
		specifyHDPath: "指定 HD 路径",
		enterYourPreferredHDPath: "输入你偏好的 HD 路径，然后为任意活跃账户扫码",
		scan: "扫码",
		retry: "重试",
		ledgerIsNotAvailable: "Ledger 不可用",
		accessDeniedToUseLedgerDevice: "访问 Ledger 设备被拒绝",
		noAccountsFound: "没有找到账户",
		selectYourAccounts: "选择你的账户",
		connecting1Account: "正在连接1个账户",
		cantFindAnyAccount: "没有找到任何与这个 Ledger 相关联的账户。请创建新账户于",
		"orConnectAnAnotherLedger.": "或连接另一个 Ledger",
		connecting: "正在连接",
		ofAccounts: "个账户",
		failedToAutomatically: "无法自动找到账户ID，请主动提供：",
		overviewTheListOfAuthorized: "请查看已授权的账户列表，点击以下按钮完成登录",
		finish: "完成"
	},
	install: {
		youllNeedToInstall: "你将需要安装",
		toContinueAfterInstalling: "以继续。安装完",
		refreshThePage: "请刷新页面",
		open: "打开"
	},
	qr: {
		copiedToClipboard: "复制到了剪贴板",
		failedToCopy: "复制到剪贴板失败",
		scanWithYourMobile: "用你的移动设备扫码",
		copyToClipboard: " 复制到剪贴板",
		preferTheOfficial: "希望使用官方对话框于",
		open: "打开"
	},
	walletTypes: {
		hardware: "硬件钱包",
		browser: "浏览器钱包",
		injected: "钱包扩展",
		bridge: "桥接钱包",
		mobile: "移动钱包",
		"instant-link": "即时钱包"
	}
};
var zh = {
	modal: modal$9
};

var modal$8 = {
	wallet: {
		connectYourWallet: "Свържете вашия Портфейл",
		whatIsAWallet: "Какво е Портфейл?",
		secureAndManage: "Защитете и управлявайте дигиталните си активи",
		safelyStore: "Съхранявайте и прехвърляйте безопасно вашите крипто и NFT.",
		logInToAny: "Използвайте всяко приложение на NEAR",
		noNeedToCreate: "Няма нужда да създавате нови профили. Свържете портфейла си и сте готови!",
		getAWallet: "Създайте Портфейл",
		useAWallet: "Използвайте портфейла, за да защитите и управлявате активите си на NEAR както и да използвате всяко приложение на NEAR без нужда от потребителски имена и пароли.",
		connectionFailed: "Свързването неуспешно",
		connectionSuccessful: "Свързването успешно",
		rememberWallet: "Запази портфейлите",
		connected: "Свързан",
		connectingTo: "Свързване към",
		connectingMessage: {
			injected: "Потвърдете свързването в прозореца на разширението",
			browser: "Потвърдете свързването в портфейла след пренасочването",
			hardware: "Потвърдете свързването в хардуерния портфейл",
			bridge: "Потвърдете връзката в портфейла"
		}
	},
	ledger: {
		connectWithLedger: "Свържете се с Ledger",
		makeSureYourLedger: "Уверете се, че вашият Ledger е свързан и че приложението NEAR е отворено нa него.",
		"continue": "Продължете",
		specifyHDPath: "Посочете HD път",
		enterYourPreferredHDPath: "Въведете предпочитания HD път, след което сканирайте за активни акаунти.",
		scan: "Сканирайте",
		retry: "Опитайте отново",
		ledgerIsNotAvailable: "Ledger устройството не е достъпно",
		accessDeniedToUseLedgerDevice: "Достъпът за използване на Ledger е отказан",
		noAccountsFound: "Няма намерени профили",
		selectYourAccounts: "Изберете вашите профили",
		connecting1Account: "Свързване на 1 профил",
		cantFindAnyAccount: "Няма намерени профили, съврзани с този Ledger. Моля, създайте нов NEAR профил на",
		orConnectAnAnotherLedger: "или свържете друг Ledger.",
		connecting: "Свързване",
		ofAccounts: "от профили",
		failedToAutomatically: "Автоматичното намиране на профила не бе успешно. Въведете го ръчно:",
		overviewTheListOfAuthorized: "Прегледайте списъка с упълномощени профили, завършете влизането, като щракнете върху бутона по-долу..",
		finish: "Завършете"
	},
	install: {
		youllNeedToInstall: "Ще трябва да инсталирате",
		toContinueAfterInstalling: "за да продължите. След инсталиране",
		refreshThePage: "презаредете страницата.",
		open: "Отворете"
	},
	qr: {
		copiedToClipboard: "Копирано в клипборда",
		failedToCopy: "Неуспешно копиране в клипборда",
		scanWithYourMobile: " Сканирайте с мобилното си устройство",
		copyToClipboard: " Копирайте в клипборда",
		preferTheOfficial: "Предпочитан език за кореспонденция",
		open: "Отворете"
	},
	walletTypes: {
		hardware: "Хардуерен портфейл",
		browser: "Портфейл в браузъра",
		injected: "Разширение на портфейл",
		bridge: "Мостов портфейл",
		mobile: "Мобилен портфейл",
		"instant-link": "Мигновен портфейл"
	},
	exportAccounts: {
		afterDecide: "След като изберете портфейл, можете да изберете кои акаунти искате да прехвърлите.",
		chooseAWallet: "Изберете Портфейл",
		complete: {
			button: "Завърши",
			descOne: "Сега ще бъдете пренасочени към избрания от вас портфейл, за да завършите прехвърлянето.",
			descTwo: "След като частта от процеса по импортиране от избрания портфейл бъде завършена, натиснете бутона, за да завършите процеса на прехвърляне.",
			startOverButton: "Започнете отначало",
			title: "Завършете Прехвърлянето"
		},
		disclaimer: "Няма да можете да прехвърлите акаунти, които никога не са били финансирани или използвани в NEAR.",
		getPassphrase: {
			button: "Продължи",
			checkLabel: "Копирах или написах паролата",
			desc: "Ще трябва да въведете тази парола, когато започнете да експортирате акаунтите си в различен портфейл.",
			label: "Щракнете, за да копирате",
			title: "Копирайте Временната Парола",
			transferButton: "Прехвърлете Акаунти"
		},
		selectAWallet: "Изберете портфейл, който отговаря на нуждите ви и поддържа свързаните ви акаунти.",
		selectAccounts: {
			button: "Продължи",
			deselectAll: "Отметете всички",
			error: "Акаунтът не съществува",
			noBalance: "Акаунтът не е финансиран",
			selectAll: "Отметете всички",
			title: "Изберете Акаунти за Прехвърляне",
			unavailable: "Прехвърлянето е недостъпно",
			warningLedger: "Изисква се поддръжка на Ledger"
		},
		selectYourAccounts: "Изберете Вашите Акаунти",
		transferYourAccounts: "Прехвърлете Вашите Акаунти",
		walletTypes: {
			bridge: "Мостов Портфейл",
			browser: "Портфейл за Браузър",
			hardware: "Хардуерен Портфейл",
			injected: "Разширение на Портфейл",
			mobile: "Мобилен Портфейл"
		},
		warning: "не поддържа експортиране на акаунти в момента. Моля, изберете друг портфейл."
	}
};
var component$3 = {
	clickToCopy: {
		label: "Копирано",
		tooltip: "Щракнете, за да копирате"
	}
};
var bg = {
	modal: modal$8,
	component: component$3
};

var modal$7 = {
	wallet: {
		connectYourWallet: "지갑 연결하기",
		whatIsAWallet: "지갑은 무슨 역할을 하나요?",
		secureAndManage: "당신의 디지털 자산을 보호하고 관리합니다.",
		safelyStore: "암호화폐와 NFT를 안전하게 저장하고 전송할 수 있습니다.",
		logInToAny: "NEAR App에 로그인합니다.",
		noNeedToCreate: "새로운 계정이나 비밀번호를 만들 필요 없이 지갑을 연결한 후 바로 사용할 수 있습니다.",
		getAWallet: "지갑 가져오기",
		useAWallet: "지갑을 사용하여 NEAR 자산을 보호·관리하고, 아이디와 비밀번호 없이 NEAR 앱에 로그인할 수 있습니다.",
		connectionFailed: "연결 실패",
		connectionSuccessful: "연결 성공",
		rememberWallet: "지갑들 기억하기",
		connected: "Connected",
		connectingTo: "연결 중: ",
		connectingMessage: {
			injected: "익스텐션 창에서 연결을 확인하세요",
			browser: "리다이렉트 된 지갑에서 연결을 확인하세요",
			hardware: "Ledger 기기에서 연결을 확인하세요",
			bridge: "지갑에서 연결 확인"
		}
	},
	ledger: {
		connectWithLedger: "Ledger 연결하기",
		makeSureYourLedger: "Ledger가 안전하게 연결되어 있고, NEAR 앱이 열려 있는 지 확인하세요",
		"continue": "계속하기",
		specifyHDPath: "HD Path 지정하기",
		enterYourPreferredHDPath: "원하는 HD Path를 선택하고, 활성화된 계정이 있는 지 검색하세요",
		scan: "검색",
		retry: "다시 시도",
		ledgerIsNotAvailable: "Ledger를 사용할 수 없습니다",
		accessDeniedToUseLedgerDevice: "Ledger 기기 접근 권한이 거부되었습니다",
		noAccountsFound: "계정을 찾을 수 없습니다",
		selectYourAccounts: "계정 선택하기",
		connecting1Account: "하나의 계정에 연결",
		cantFindAnyAccount: "Ledger와 연결된 계정을 찾을 수 없습니다. 새로운 계정을 생성하거나 ",
		orConnectAnAnotherLedger: "다른 Ledger를 연결하세요",
		connecting: "계정 연결하기: ",
		ofAccounts: "개 계정을 찾았습니다",
		failedToAutomatically: "계정 ID를 찾지 못했습니다. 수동으로 입력해주세요.",
		overviewTheListOfAuthorized: "인증된 계정 목록을 확인한 후 아래 버튼을 클릭하여 로그인을 완료하세요",
		finish: "완료"
	},
	walletTypes: {
		hardware: "하드웨어 지갑",
		browser: "브라우저 지갑",
		injected: "지갑 확장",
		bridge: "브리지 지갑",
		mobile: "모바일 지갑",
		"instant-link": "인스턴트 지갑"
	},
	install: {
		youllNeedToInstall: "다음 확장 프로그램을 설치해주세요:",
		toContinueAfterInstalling: ". 설치 완료 후 페이지 새로 고침이 필요합니다. ",
		refreshThePage: "새로 고침",
		open: "Open"
	},
	qr: {
		copiedToClipboard: "클립보드에 복사 완료",
		failedToCopy: "클립보드에 복사 실패",
		scanWithYourMobile: "모바일 장치를 사용하여 스캔해주세요",
		copyToClipboard: " 클립보드에 복사하기",
		preferTheOfficial: "다음 프로그램에서 제공하는 공식 프로세스를 선호하십니까: ",
		open: "Open"
	}
};
var ko = {
	modal: modal$7
};

var modal$6 = {
	wallet: {
		connectYourWallet: "Kết nối ví của bạn",
		whatIsAWallet: "Ví là gì?",
		secureAndManage: "Bảo mật & Quản lý tài sản số của bạn",
		safelyStore: "Lưu trữ và chuyển tiền điện tử và NFT của bạn một cách an toàn.",
		logInToAny: "Đăng nhập vào bất kỳ ứng dụng trên NEAR",
		noNeedToCreate: "Không cần tạo tài khoản hoặc thông tin đăng nhập mới. Kết nối ví của bạn và bắt đầu!",
		getAWallet: "Tạo Ví",
		useAWallet: "Sử dụng ví để bảo mật và quản lý tài sản trên NEAR của bạn và đăng nhập vào bất kỳ ứng dụng NEAR nào, không cần tên người dùng và mật khẩu.",
		connectionFailed: "Kết nối thất bại",
		connectionSuccessful: "Kết nối thành công",
		rememberWallet: "Ghi nhớ lựa chọn ví",
		connected: "Đã kết nối",
		connectingTo: "Đang kết nối tới",
		connectingMessage: {
			injected: "Xác nhận kết nối trong cửa sổ tiện ích mở rộng",
			browser: "Xác nhận kết nối trong ví sau khi được chuyển hướng",
			hardware: "Xác nhận kết nối với ví lạnh",
			bridge: "Xác nhận kết nối trong ví"
		}
	},
	ledger: {
		connectWithLedger: "Kết nối ví Ledger",
		makeSureYourLedger: "Đảm bảo Ledger của bạn được kết nối an toàn và ứng dụng NEAR đang mở sẵn trên thiết bị",
		"continue": "Tiếp tục",
		specifyHDPath: "Chỉ định HD Path",
		enterYourPreferredHDPath: "Nhập HD Path của bạn, sau đó quét tìm các tài khoản hoạt động",
		scan: "Quét",
		retry: "Thử lại",
		ledgerIsNotAvailable: "Ledger không khả dụng",
		accessDeniedToUseLedgerDevice: "Truy cập Ledger bị từ chối",
		noAccountsFound: "Không tìm thấy tài khoản",
		selectYourAccounts: "Chọn tài khoản của bạn",
		connecting1Account: "Đang kết nối 1 tài khoản",
		cantFindAnyAccount: "Không thể tìm thấy bất kỳ tài khoản nào được liên kết với Ledger này. Vui lòng tạo một tài khoản NEAR mới",
		orConnectAnAnotherLedger: "hoặc kết nối với ví Ledger khác.",
		connecting: "Đang kết nối",
		ofAccounts: "của tài khoản",
		failedToAutomatically: "Không thể tự động tìm id tài khoản. Nhập thủ công:",
		overviewTheListOfAuthorized: "Tổng quan danh sách các tài khoản được ủy quyền, hoàn tất đăng nhập bằng cách bấm vào nút bên dưới.",
		finish: "Hoàn thành"
	},
	install: {
		youllNeedToInstall: "Bạn sẽ cần cài đặt",
		toContinueAfterInstalling: "để bắt đầu. Sau khi cài đặt xong",
		refreshThePage: "Tải lại trang.",
		open: "Mở"
	},
	qr: {
		copiedToClipboard: "Đã sao chép vào bảng ghi tạm",
		failedToCopy: "Sao chép vào bảng ghi tạm thất bại",
		scanWithYourMobile: "Quét với điện thoại của bạn",
		copyToClipboard: " Sao chép vào bảng ghi tạm",
		preferTheOfficial: "Dialogue chính thức của",
		open: "Mở"
	},
	walletTypes: {
		hardware: "Ví lạnh",
		browser: "Ví trình duyệt",
		injected: "Ví tiện ích mở rộng",
		bridge: "Ví Cầu",
		mobile: "Ví Mobile",
		"instant-link": "Ví tức thì"
	},
	exportAccounts: {
		chooseAWallet: "Chọn ví",
		transferYourAccounts: "Chuyển tài khoản",
		selectAWallet: "Chọn ví phù hợp với nhu cầu của bạn, ví được chọn cần hỗ trợ các tài khoản đang sử dụng.",
		selectYourAccounts: "Chọn tài khoản",
		afterDecide: "Sau khi chọn được tài khoản bạn có chuyển.",
		disclaimer: "Bạn không thể chuyển tài khoản nếu tài khoản đó chưa được nhận tiền hoặc chưa phát sinh giao dịch trên NEAR.",
		warning: "không hỗ trợ xuất tài khoản. Vui lòng chọn ví khác.",
		walletTypes: {
			hardware: "Ví lạnh",
			browser: "Ví trình duyệt",
			injected: "Ví tiện ích mở rộng",
			bridge: "Ví Cầu",
			mobile: "Ví Mobile"
		},
		selectAccounts: {
			title: "Chọn tài khoản để chuyển",
			button: "Lấy cụm mật khẩu",
			deselectAll: "Bỏ chọn tất cả",
			selectAll: "Chọn tất cả",
			unavailable: "Chuyển không khả dụng",
			error: "Tài khoản không tồn tại",
			warningLedger: "Yêu cầu hỗ trợ Ledger",
			noBalance: "Tài khoản trống"
		},
		getPassphrase: {
			title: "Sao chép mật khẩu tạm thời",
			desc: "Bạn sẽ cần nhập mật khẩu khi bắt đầu xuất các khoản tới ví khác.",
			button: "Tiếp tục",
			label: "Bấm để sao chép",
			checkLabel: "Tôi đã chép hoặc ghi lại mật khẩu"
		},
		complete: {
			title: "Hoàn thành chuyển",
			descOne: "Bạn sẽ được chuyển hướng tới tài khoản đã chọn để hoàn tất quá trình.",
			descTwo: "Sau khi nhập, nhấn nút để hoàn tất quy trình chuyển.",
			button: "Hoàn thành"
		}
	}
};
var component$2 = {
	clickToCopy: {
		label: "Đã sao chép",
		tooltip: "Bấm để sao chép"
	}
};
var vi = {
	modal: modal$6,
	component: component$2
};

var modal$5 = {
	wallet: {
		connectYourWallet: "अपना वॉलेट (Wallet) कनेक्ट करें।",
		whatIsAWallet: "वॉलेट क्या है?",
		secureAndManage: "सुरक्षित और प्रबंधित करें।",
		safelyStore: "अपनी क्रिप्टोकरेंसी और एनएफटी को सुरक्षित रूप से स्टोर और ट्रांसफर करें।",
		logInToAny: "NEAR पर किसी भी ऐप में साइन इन करें।",
		noNeedToCreate: "नए खाते या लॉगिन बनाने की आवश्यकता नहीं है। अपना वॉलेट(NEAR Wallet)कनेक्ट करें और आरंभ करें।",
		getAWallet: "एक वॉलेट बनाएँ।",
		useAWallet: "अपनी NEAR संपत्तियों को सुरक्षित और प्रबंधित करने के लिए वॉलेट का उपयोग करें और किसी भी NEAR ऐप (app) में लॉग इन करें, किसी उपयोगकर्ता (user) नाम और पासवर्ड की आवश्यकता नहीं है।",
		connectionFailed: "कनेक्शन विफल|",
		connectionSuccessful: "कनेक्शन सफल|",
		rememberWallet: "वॉलेटों को याद रखें",
		connected: "वॉलेट जुड़ गया|",
		connectingTo: "वॉलेट जुड़ रहा हे|",
		connectingMessage: {
			injected: "एक्सटेंशन विंडो में कनेक्शन की पुष्टि करें|",
			browser: "रीडायरेक्ट होने के बाद वॉलेट में कनेक्शन की पुष्टि करें|",
			hardware: "कोल्ड वॉलेट के साथ कनेक्शन की पुष्टि करें|",
			bridge: "वॉलेट में कनेक्शन की पुष्टि करें"
		}
	},
	ledger: {
		connectWithLedger: "लेजर(Ledger)वॉलेट कनेक्ट करें|",
		makeSureYourLedger: "सुनिश्चित करें कि आपका लेजर सुरक्षित रूप से जुड़ा हुआ है और NEAR ऐप आपके डिवाइस (Device)पर पहले से ही खुला है|",
		"continue": "जारी रखे|",
		specifyHDPath: "हार्ड डिस्क(Hard Disk)पथ(Path)निर्धारित करे|",
		enterYourPreferredHDPath: "अपना एचडी पथ दर्ज करें, फिर सक्रिय खातों के लिए स्कैन करें|",
		scan: "स्कैन करे|",
		retry: "दोबारा प्रयास करे|",
		ledgerIsNotAvailable: "लेजर उपलब्ध नहीं है|",
		accessDeniedToUseLedgerDevice: "लेजर डिवाइस का उपयोग करने के लिए प्रवेश निषेध|",
		noAccountsFound: "खाता नहीं मिला|",
		selectYourAccounts: "अपने खाते चुनें|",
		connecting1Account: "एक खाता कनेक्ट हो रहा है|",
		cantFindAnyAccount: "इस लेजर से जुड़ा कोई खाता नहीं मिला। कृपया एक नया NEAR खाता बनाएँ|",
		orConnectAnAnotherLedger: "अथवा दूसरे लेजर वॉलेट से कनेक्ट करें।",
		connecting: "जुड़ रहा हे|",
		ofAccounts: "खाता अब जुड़ा नहीं हे|",
		failedToAutomatically: "खाता आईडी स्वचालित रूप से खोजने में असमर्थ। मैन्युअल (Manuall) रूप से कोशिश करें|",
		overviewTheListOfAuthorized: "अवलोकन अधिकृत की सूची, नीचे दिए गए बटन पर क्लिक करके लॉगिन पूरा करें।",
		finish: "समाप्त|"
	},
	install: {
		youllNeedToInstall: "आपको इंस्टॉल करना होगा|",
		toContinueAfterInstalling: "इंस्टॉल करने के बाद जारी रखे|",
		refreshThePage: "पुन: लोड करें।",
		open: "खोले|"
	},
	qr: {
		copiedToClipboard: "क्लिपबोर्ड(Clipboard)पर कॉपी किया गया|",
		failedToCopy: "क्लिपबोर्ड पर कॉपी करना विफल रहा|",
		scanWithYourMobile: "अपने फोन (Mobile)से स्कैन करें|",
		copyToClipboard: " क्लिपबोर्ड पर कॉपी करें|",
		preferTheOfficial: "आधिकारिक संवाद को प्राथमिकता दें|",
		open: "खोले|"
	},
	walletTypes: {
		hardware: "हार्डवेयर वॉलेट",
		browser: "ब्राउज़र वॉलेट",
		injected: "वॉलेट एक्सटेंशन",
		bridge: "ब्रिज वॉलेट",
		mobile: "मोबाइल वॉलेट",
		"instant-link": "इंस्टेंट वॉलेट"
	},
	exportAccounts: {
		afterDecide: "जब आप एक वॉलेट चुन लेंगे, तब आप चुन सकते हैं कि आप कौन से खाते स्थानांतरित करना चाहते हैं।",
		chooseAWallet: "एक वॉलेट चुनें",
		complete: {
			button: "पूर्ण करें",
			descOne: "अब आपको स्थानांतरित करने के लिए आपने जो वॉलेट चुना है, उस पर रीडायरेक्ट किया जाएगा।",
			descTwo: "चुने हुए वॉलेट से आयात प्रक्रिया पूरी होने के बाद, स्थानांतरण प्रक्रिया को पूरा करने के लिए बटन दबाएं।",
			startOverButton: "फिर से शुरू करें",
			title: "स्थानांतरण पूरा करें"
		},
		disclaimer: "आप उन खातों को स्थानांतरित नहीं कर सकेंगे जो कभी भी NEAR पर फंडेड या उपयोग किए गए नहीं हैं।",
		getPassphrase: {
			button: "जारी रखें",
			checkLabel: "मैंने पासवर्ड को कॉपी या नोट किया है",
			desc: "जब आप अपने खातों को एक अलग वॉलेट में निर्यात करना शुरू करेंगे, तो आपको इस पासवर्ड को दर्ज करने की आवश्यकता होगी।",
			label: "कॉपी करने के लिए क्लिक करें",
			title: "अस्थायी पासवर्ड कॉपी करें",
			transferButton: "खातों का स्थानांतरण करें"
		},
		selectAWallet: "एक वॉलेट चुनें जो आपकी आवश्यकताओं को पूरा करता है और आपके जुड़े खातों का समर्थन करता है।",
		selectAccounts: {
			button: "जारी रखें",
			deselectAll: "सभी अचयनित करें",
			error: "खाता अस्तित्व में नहीं है",
			noBalance: "खाता निधि नहीं है",
			selectAll: "सभी चुनें",
			title: "स्थानांतरण के लिए खातों का चयन करें",
			unavailable: "स्थानांतरण अस्वीकृत",
			warningLedger: "लेजर समर्थन की आवश्यकता है"
		},
		selectYourAccounts: "अपने खाते चुनें",
		transferYourAccounts: "अपने खातों का स्थानांतरण करें",
		walletTypes: {
			bridge: "ब्रिज वॉलेट",
			browser: "ब्राउज़र वॉलेट",
			hardware: "हार्डवेयर वॉलेट",
			injected: "वॉलेट एक्सटेंशन",
			mobile: "मोबाइल वॉलेट"
		},
		warning: "वर्तमान में खाते निर्यात का समर्थन नहीं करता है। कृपया एक अन्य वॉलेट चुनें।"
	}
};
var component$1 = {
	clickToCopy: {
		label: "कॉपी हो गया",
		tooltip: "कॉपी करने के लिए क्लिक करें"
	}
};
var hi = {
	modal: modal$5,
	component: component$1
};

var modal$4 = {
	wallet: {
		connectYourWallet: "صل محفظتك",
		whatIsAWallet: "ما هي المحفظة؟",
		secureAndManage: "تأمين وإدارة الممتلكات الرقمية الخاصة بك",
		safelyStore: "قم بتخزين و ارسال عملاتك و أصولك الرقمية بأمان",
		logInToAny: "سجل الدخول إلى أي تطبيق يستخدم نير",
		noNeedToCreate: ".لا داعي لإنشاء حساب جديد. فقط قم بتوصيل محفظتك وانطلق",
		getAWallet: "احصل على محفظة",
		useAWallet: "استخدم محفظة لتأمين وإدارة أصول نير الخاصة بك، وادخل لأي تطبيق يستخدم نير دون الحاجة إلى اسم المستخدم وكلمةالمرور",
		connectionFailed: "اتصال فاشل",
		connectionSuccessful: "اتصال ناجح",
		rememberWallet: "تذكر المحافظ",
		connected: "متصل",
		connectingTo: "جاري الاتصال ب",
		connectingMessage: {
			injected: "وافق على الاتصال في نافذة الإضافة",
			browser: "وافق على الاتصال في المحفظة بعد إعادة توجيه",
			hardware: "وافق على الاتصال في جهاز ليدجر",
			bridge: "وافق على الاتصال في المحفظة"
		}
	},
	ledger: {
		connectWithLedger: "اتصل مع ليدجر",
		makeSureYourLedger: "تأكد أن ليدجر متصل بأمان, و أن تطبيق نير مفتوح في جهازك",
		"continue": "تابع",
		specifyHDPath: "حدد مسار الحساب",
		enterYourPreferredHDPath: "أدخل مسار الحساب المفضل، ثم ابحث عن كل الحسابات النشطة",
		scan: "مسح",
		retry: "أعد المحاولة",
		ledgerIsNotAvailable: "ليدجر غير متوفر",
		accessDeniedToUseLedgerDevice: "تم رفض الاتصال بليدجر",
		noAccountsFound: "لم يتم العثور على أي حسابات",
		selectYourAccounts: "حدد حساباتك",
		connecting1Account: "جاري الاتصال بحساب واحد",
		cantFindAnyAccount: "لا يمكن العثور على أي حساب مرتبط بهذا ليدجر الرجاء إنشاء حساب نير جديد على",
		orConnectAnAnotherLedger: "او اربط جهاز ليدجر آخر",
		connecting: "جاري الاتصال",
		ofAccounts: "من الحسابات",
		failedToAutomatically: "فشل في الاتصال بالحساب تلقائيا. يرجى الاتصال بالحساب يدويا",
		overviewTheListOfAuthorized: "لائحة الحسابات المصرح بها, أكمل تسجيل الدخول بالنقر على الزر أدناه",
		finish: "إنهاء"
	},
	install: {
		youllNeedToInstall: "ستحتاج لتثبيت",
		toContinueAfterInstalling: "للاستكمال. بعد التثبيت",
		refreshThePage: "قم بتحديث الصفحة",
		open: "افتح"
	},
	qr: {
		copiedToClipboard: "تم النسخ",
		failedToCopy: "فشل النسخ",
		scanWithYourMobile: "امسح بجهازك المحمول",
		copyToClipboard: "نسخ",
		preferTheOfficial: "تفضل الحوار الرسمي ل",
		open: "فتح"
	},
	walletTypes: {
		hardware: "محفظة الأجهزة",
		browser: "محفظة المتصفح",
		injected: "ملحق المحفظة",
		bridge: "محفظة الجسر",
		mobile: "محفظة الجوال",
		"instant-link": "محفظة الرابط الفوري"
	},
	exportAccounts: {
		afterDecide: "بعد اتخاذ قرار بشأن محفظة، يمكنك اختيار الحسابات التي تريد نقلها.",
		chooseAWallet: "اختر محفظة",
		disclaimer: "لن تتمكن من نقل الحسابات التي لم يتم تمويلها أو استخدامها على NEAR.",
		selectAWallet: "اختر محفظة تناسب احتياجاتك وتدعم حساباتك المتصلة.",
		selectYourAccounts: "حدد حساباتك",
		transferYourAccounts: "نقل حساباتك",
		warning: "لا تدعم تصدير الحسابات في الوقت الحالي. يرجى اختيار محفظة أخرى.",
		complete: {
			button: "أكمل",
			descOne: "سيتم توجيهك الآن إلى المحفظة التي اخترتها لإكمال النقل.",
			descTwo: "بمجرد إكمال جزء الاستيراد من العملية من المحفظة المحددة، اضغط على الزر لإكمال عملية النقل.",
			startOverButton: "ابدأ من جديد",
			title: "أكمل النقل"
		},
		getPassphrase: {
			button: "تابع",
			checkLabel: "لقد قمت بنسخ أو كتابة كلمة المرور",
			desc: "ستحتاج إلى إدخال هذه الكلمة السرية عند بدء تصدير حساباتك إلى محفظة مختلفة.",
			label: "انقر لنسخ",
			title: "انسخ كلمة المرور المؤقتة",
			transferButton: "نقل الحسابات"
		},
		selectAccounts: {
			button: "تابع",
			deselectAll: "إلغاء تحديد الكل",
			error: "الحساب غير موجود",
			noBalance: "الحساب غير ممول",
			selectAll: "تحديد الكل",
			title: "حدد الحسابات لنقلها",
			unavailable: "النقل غير متاح",
			warningLedger: "دعم Ledger مطلوب"
		},
		walletTypes: {
			bridge: "محفظة الجسر",
			browser: "محفظة المتصفح",
			hardware: "محفظة الأجهزة",
			injected: "ملحق المحفظة",
			mobile: "محفظة الجوال"
		}
	}
};
var component = {
	clickToCopy: {
		label: "تم النسخ",
		tooltip: "انقر لنسخ"
	}
};
var ar = {
	modal: modal$4,
	component: component
};

var modal$3 = {
	wallet: {
		connectYourWallet: "Spojite crypto novčanik!",
		whatIsAWallet: "Što je to crypto novčanik?",
		secureAndManage: "Osigurajte i upravljajte svojom digitalnom imovinom.",
		safelyStore: "Sigurno pohranite i prebacite svoj crypto i NFT-eve.",
		logInToAny: " Prijavite se u bilo koju NEAR aplikaciju",
		noNeedToCreate: "Nema potrebe za stvaranjem novih naloga ili korisničkih podataka. Spojite svoj crypto novčanik i spremni ste!",
		getAWallet: "Otvorite crypto novčanik",
		useAWallet: "Koristite crypto novčanik da biste osigurali i upravljali svojom NEAR imovinom, te se prijavite u bilo koju NEAR aplikaciju bez korisničkog imena i lozinke.",
		connectionFailed: "Neuspješno povezivanje.",
		connectionSuccessful: "Uspješno povezivanje.",
		rememberWallet: "Zapamti novčanike",
		connected: "Povezano.",
		connectingTo: "Povezivanje u tijeku",
		connectingMessage: {
			injected: "Potvrdite vezu u eksternom prozoru",
			browser: "Nakon redirekcije, potvrdite vezu u novčaniku",
			hardware: "Potvrdite vezu sa novčanikom",
			bridge: "Potvrdite vezu u novčaniku"
		}
	},
	ledger: {
		connectWithLedger: "Povežite se hardverskim novčanikom",
		makeSureYourLedger: "Osigurajte sigurnu vezu s hardverskim novčanikom, te da je NEAR aplikacija otvorena na vašem uređaju",
		"continue": "Nastavite",
		specifyHDPath: "Specificirajte HD putanju",
		enterYourPreferredHDPath: "Upišite preferiranu HD putanju, zatim skenirajte aktivne naloge",
		scan: "Skenirajte",
		retry: "Pokušajte ponovno",
		ledgerIsNotAvailable: "Hardverski novčanik nije dostupan.",
		accessDeniedToUseLedgerDevice: "Odbijen pristup za korištenjem hardverskog novčanika",
		noAccountsFound: "Nalozi nisu pronađeni",
		selectYourAccounts: "Odaberite svoje naloge",
		connecting1Account: "Povezivanje 1 naloga",
		cantFindAnyAccount: "Nije moguće pronaći niti jedan nalog povezan s ovim hardverskim novčanikom. Molimo vas, kreirajte novi NEAR nalog",
		orConnectAnAnotherLedger: "Ili povežite drugi hardverski novčanik.",
		connecting: "Povezivanje",
		ofAccounts: "naloga",
		failedToAutomatically: "Neuspješno automatsko pronalaženje ID naloga. Unesite ručno:",
		overviewTheListOfAuthorized: "Pregledajte popis odobrenih naloga, završite prijavu pritiskom na niže prikazani gumb.",
		finish: "Završite"
	},
	install: {
		youllNeedToInstall: " Potrebno je instalirati modal",
		toContinueAfterInstalling: "za nastavak. Nakon instalacije",
		refreshThePage: "osvježite stranicu.",
		open: "Otvorite QR modal"
	},
	qr: {
		copiedToClipboard: "Kopirano u međuspremnik",
		failedToCopy: "Neupsješno kopiranje u međuspremnik",
		scanWithYourMobile: "Skenirajte svojim mobilnim uređajem",
		copyToClipboard: " Kopirajte u međuspremnik",
		preferTheOfficial: "Odaberite službeni dijalog",
		open: "Otvorite"
	},
	walletTypes: {
		hardware: "Hardware Wallet",
		browser: "Browser Wallet",
		injected: "Wallet Extension",
		bridge: "Bridge Wallet",
		mobile: "Mobile Wallet",
		"instant-link": "Instant Wallet"
	},
	exportAccounts: {
		chooseAWallet: "Odaberi Wallet",
		transferYourAccounts: "Prenesi svoje naloge",
		selectAWallet: "Odaberite wallet koji odgovara vašim potrebama i podržava vaše povezane naloge.",
		selectYourAccounts: "Odaberi svoje naloge",
		afterDecide: "Nakon što odlučite koji wallet koristite, možete odabrati koje račune želite prebaciti.",
		disclaimer: "Nećete moći prebaciti naloge koji nisu nikada bili korišteni na NEAR-u.",
		warning: "ne podržava izvoz naloga u ovom trenutku. Molimo odaberite drugi wallet.",
		walletTypes: {
			hardware: "Hardware Wallet",
			browser: "Browser Wallet",
			injected: "Wallet Extension",
			bridge: "Bridge Wallet",
			mobile: "Mobile Wallet"
		},
		selectAccounts: {
			title: "Odaberi naloge za prijenos",
			button: "Generiraj lozinku",
			deselectAll: "Makni odabir sa svih",
			selectAll: "Odaberi sve",
			unavailable: "Prijenos nije dostupan",
			error: "Nalog ne postoji",
			warningLedger: "Potrebna ledger podrška",
			noBalance: "Nalog nema sredstava"
		},
		getPassphrase: {
			title: "Kopiraj privremenu lozinku",
			desc: "Bit će potrebno unijeti ovu lozinku na početku izvoza naloga na drugi wallet.",
			button: "Nastavi",
			label: "Klikni za kopiju",
			checkLabel: "Kopirao sam ili zapisao lozinku"
		},
		complete: {
			title: "Završi prijenos",
			descOne: "You will now be redirected to the wallet you selected to complete the transfer.",
			descTwo: "Kada je unos s odabranog walleta završen, pritisnite gumb da biste završili prijenos.",
			button: "Završi"
		}
	}
};
var hr = {
	modal: modal$3
};

var modal$2 = {
	wallet: {
		connectYourWallet: "Поврзете го вашиот новчаник!",
		whatIsAWallet: "Што е новчаник?",
		secureAndManage: "Заштитете ги и управувајте со вашите дигитални средства.",
		safelyStore: "Безбедно складирајте и извршувајте трансакции со вашите крипто и NFT.",
		logInToAny: "Најавете се на која било NEAR апликација",
		noNeedToCreate: "Нема потреба да креирате нови сметки или ингеренции. Поврзете го вашиот паричник и сте подготвени!",
		getAWallet: "Направете новчаник",
		useAWallet: "Користете паричник за да ги заштитите и управувате вашите NEAR средства и да се најавите на која било NEAR апликација без потреба од кориснички имиња и лозинки.",
		connectionFailed: "Поврзувањето не беше успешно.",
		connectionSuccessful: "Успешно поврзување.",
		rememberWallet: "Запомни паричници",
		connected: "Поврзано.",
		connectingTo: "Поврзување со",
		connectingMessage: {
			injected: "Потврдете го поврзувањето во екстерниот прозорец",
			browser: "По преусмерувањето, потврдете го поврзувањето од новчаниокт",
			hardware: "Потврдете го поврзувањето со ладен новчаник",
			bridge: "Потврдете ја врската во новчаникот"
		}
	},
	ledger: {
		connectWithLedger: "Поврзете се со Леџер",
		makeSureYourLedger: "Осигурајте се дека вашиот Леџер е поврзан безбедно, и дека NEAR апликацијата е отворена на вашиот уред",
		"continue": "Продолжете",
		specifyHDPath: "Наведете ХД локација",
		enterYourPreferredHDPath: "Внесете ја вашата преферирана ХД локација, а потоа скенирајте да ги најдете активните сметки.",
		scan: "Скенирајте",
		retry: "Обидете се повторно",
		ledgerIsNotAvailable: "Леџерот не е достапен.",
		accessDeniedToUseLedgerDevice: "Пристапот за користење на Леџер уред е одбиен",
		noAccountsFound: "Нема најдени сметки",
		selectYourAccounts: "Изберете ги вашите сметки",
		connecting1Account: "Поврзување на една сметка",
		cantFindAnyAccount: "Не се најдени сметки поврзани со овој Леџер. Ве молиме креирајте нова NEAR сметка ",
		orConnectAnAnotherLedger: "или поврзете друг Леџер.",
		connecting: "Поврзување",
		ofAccounts: "на сметки",
		failedToAutomatically: "Неуспешно автоматско барање на ИД на сметката. Внесете го рачно:",
		overviewTheListOfAuthorized: "Преглед на листата на овластени сметки, завршете се најавата со кликнување на копчето подолу.",
		finish: "Завршете"
	},
	install: {
		youllNeedToInstall: "Треба да инсталирате",
		toContinueAfterInstalling: "за да продолжите. По инсталирањето",
		refreshThePage: "Освежете ја страната.",
		open: "Отворете"
	},
	qr: {
		copiedToClipboard: "Копирано на клипбордот",
		failedToCopy: "Неуспешно копирање на клипборд",
		scanWithYourMobile: "Скенирајте со вашиот телефонски уред",
		copyToClipboard: "Копирајте на клипборд",
		preferTheOfficial: "Преферирајте официјален диалог на",
		open: "Отворете"
	},
	walletTypes: {
		hardware: "Хардверски новчаник",
		browser: "Новчаник на интернет прелистувач",
		injected: "Екстензија за новчаник",
		bridge: "Bridge новчаник",
		mobile: "Мобилен новчаник",
		"instant-link": "Инстант паричник"
	},
	exportAccounts: {
		chooseAWallet: "Одберете паричник",
		transferYourAccounts: "Префрлете ги вашите кориснички сметки",
		selectAWallet: "Изберетен новчаник кој ги задоволува вашите баранња и ги поддржува вашите поврзани кориснички сметки.",
		selectYourAccounts: "Изберете ги вашите кориснички сметки",
		afterDecide: "Одкако ќе изберете новчаник, можете да изберете кои кориснички сметки сакате да ги префрлите.",
		disclaimer: "Не можете да прфрлате кориснички сметки кои никогаш не биле надополнати или користени на NEAR.",
		warning: "не поддржува извезување на кориснички сметки во овој момент. Ве молиме изберете друг новчаник.",
		walletTypes: {
			hardware: "Хардверски новчаник",
			browser: "Новчаник на интернет прелистувач",
			injected: "Екстензија за новчаник",
			bridge: "Bridge новчаник",
			mobile: "Мобилен новчаник"
		},
		selectAccounts: {
			title: "Изберете ги корисничките сметки за да ги префрлите.",
			button: "Добијте лозинка",
			deselectAll: "Отселектирајте се",
			selectAll: "Изберете се",
			unavailable: "Трансферот е недостапен",
			error: "Корисничката сметка не постои",
			warningLedger: "Потребна е поддршка од Леџер",
			noBalance: "Сметката не е финансирана"
		},
		getPassphrase: {
			title: "Копирајте ја привремената лозинка",
			desc: "Ќе треба да ја внесете оваа лозинка кога ќе започнете да ги извезувате вашите сметки на друг новчаник.",
			button: "Продолжете",
			label: "Кликнете за да копирате",
			checkLabel: "Ја копирав или запишав лозинката"
		},
		complete: {
			title: "Завршете го преносот",
			descOne: "Сега ќе бидете пренасочени на избраниот новчаник за завршување на преносот.",
			descTwo: "Откако ќе заврши увозот од избраниот новчаник, притиснете го копчето за да го завршите преносот.",
			button: "Завршете"
		}
	}
};
var mk = {
	modal: modal$2
};

var modal$1 = {
	wallet: {
		connectYourWallet: "Povežite svojo denarnico!",
		whatIsAWallet: "Kaj je denarnica?",
		secureAndManage: "Zavarujte in upravljajte svoja digitalna sredstva.",
		safelyStore: "Varno shranjujte in prenašajte svoje kriptovalute in NFTje.",
		logInToAny: "Prijavite se v katero koli aplikacijo na NEAR",
		noNeedToCreate: "Ni vam treba ustvarjati novih računov. Povežite svojo denarnico in začnite!",
		getAWallet: "Ustvarite denarnico",
		useAWallet: "Uporabite denarnico, da bi zavarovali in upravljali s svoja NEAR digitalna sredstva, in se prijavite v katero koli aplikacijo ekosistema NEAR",
		connectionFailed: "Povezava ni bila uspešna.",
		connectionSuccessful: "Povezava je bila uspešna.",
		rememberWallet: "Zapomni si denarnice",
		connected: "Vaša denarnica je povezana.",
		connectingTo: "Povezovanje z",
		connectingMessage: {
			injected: "Potrdite povezavo v oknu razširitve",
			browser: "Po preusmeritvi potrdite povezavo v denarnici",
			hardware: "Potrdite povezavo s hladno denarnico",
			bridge: "Potrdite povezavo v denarnici"
		}
	},
	ledger: {
		connectWithLedger: "Povežite se z Ledger",
		makeSureYourLedger: "Prepričajte se, da je vaš Ledger varno povezan in da je aplikacija NEAR odprta v vaši napravi",
		"continue": "Nadaljuj",
		specifyHDPath: "Določite HD pot",
		enterYourPreferredHDPath: "Vnesite želeno HD pot, nato poiščite vse aktivne račune.",
		scan: "Skenirajte",
		retry: "Poskusite znova",
		ledgerIsNotAvailable: "Ledger ni na voljo",
		accessDeniedToUseLedgerDevice: "Dostop za uporabo naprave Ledger zavrnjen",
		noAccountsFound: "Ni najdenih računov",
		selectYourAccounts: "Izberite Vaši računi",
		connecting1Account: "Povezovanje enega računa",
		cantFindAnyAccount: "Ni mogoče najti nobenega računa, povezanega s tem Ledgerjem. Ustvarite nov NEAR račun ",
		orConnectAnAnotherLedger: "ali povežite drug Ledger..",
		connecting: "Povezovanje",
		ofAccounts: "računov",
		failedToAutomatically: "ID-ja računa ni bilo mogoče samodejno najti. Zagotovite ga ročno:",
		overviewTheListOfAuthorized: "Oglejte si seznam pooblaščenih računov, dokončajte prijavo s klikom na spodnji gumb.",
		finish: "Končajte"
	},
	install: {
		youllNeedToInstall: "Morali ga boste namestiti",
		toContinueAfterInstalling: "nadaljevati. Po namestitvi",
		refreshThePage: "Osvežite stran.",
		open: "Odprite"
	},
	qr: {
		copiedToClipboard: "Kopirano v podložni mapi",
		failedToCopy: "Kopiranje v podložni mapi ni uspelo",
		scanWithYourMobile: "Skenirajte s svojo mobilno napravo",
		copyToClipboard: " Kopirajte v podložni mapi",
		preferTheOfficial: "Preferirajte uradno pogovorno okno",
		open: "Odprite"
	},
	walletTypes: {
		hardware: "Hladna denarnica",
		browser: "Denarnica brskalnika",
		injected: "Razširitev za denarnico",
		bridge: "Bridge denarnica",
		mobile: "Mobilna denarnica",
		"instant-link": "Takojšnja denarnica"
	},
	exportAccounts: {
		chooseAWallet: "Izberite denarnico",
		transferYourAccounts: "Prenesite svoje račune",
		selectAWallet: "Izberite denarnico, ki ustreza vašim potrebam in podpira vaše povezane račune.",
		selectYourAccounts: "Izberite vaši računi",
		afterDecide: "Ko se odločite za denarnico, lahko izberete, katere račune želite prenesti.",
		disclaimer: "Ne boste mogli prenesti Računov, ki nikoli niso bili financirani ali uporabljeni na NEAR.",
		warning: "trenutno ne podpira izvoza računa. Izberite drugo denarnico",
		walletTypes: {
			hardware: "Hladna denarnica",
			browser: "Denarnica brskalnika",
			injected: "Razširitev za denarnico",
			bridge: "Bridge denarnica",
			mobile: "Mobilna denarnica"
		},
		selectAccounts: {
			title: "Izberite računi za prenos.",
			button: "Pridobite geslo",
			deselectAll: "Prekliči izbiro vseh",
			selectAll: "Izberi vse",
			unavailable: "Prenos ni na voljo",
			error: "Račun ne obstaja",
			warningLedger: "Potrebna je podpora za Ledger",
			noBalance: "Račun ni financiran"
		},
		getPassphrase: {
			title: "Kopiraj začasno geslo",
			desc: "To geslo boste morali vnesti, ko boste začeli izvažati svoje račune v drugo denarnico.",
			button: "Nadaljujte",
			label: "Kliknite za kopiranje",
			checkLabel: "Geslo sem kopiral ali zapisal"
		},
		complete: {
			title: "Dokončajte prenos",
			descOne: "Zdaj boste preusmerjeni v denarnico, ki ste jo izbrali za dokončanje prenosa.",
			descTwo: "Ko je uvozni del postopka končan iz izbrane denarnice, pritisnite gumb za dokončanje postopka prenosa.",
			button: "Končajte"
		}
	}
};
var sl = {
	modal: modal$1
};

var modal = {
	wallet: {
		connectYourWallet: "Повежите свој новчаник!",
		whatIsAWallet: "Шта је новчаник?",
		secureAndManage: "Обезбедите и управљајте својом дигиталном имовином.",
		safelyStore: "Безбедно чувајте и преносите своје криптовалуте и NFT.",
		logInToAny: "Пријавите се на било коју апликацију NEAR",
		noNeedToCreate: "Нема потребе да креирате нове налоге или акредитиве. Повежите новчаник и спремни стe!",
		getAWallet: "Набавите новчаник",
		useAWallet: "Користите новчаник да обезбедите и управљате својим NEAR средствима и да се пријавите у било коју апликацију NEAR без потребе за корисничким именима и лозинкама.",
		connectionFailed: "Веза није успостављена.",
		connectionSuccessful: "Веза је успела.",
		rememberWallet: "Запамти новчанике",
		connected: "Повезан.",
		connectingTo: "Повезивање на",
		connectingMessage: {
			injected: "Потврдите везу у спољном прозору",
			browser: "Након преусмеравања, потврдите везу у новчанику",
			hardware: "Потврдите везу са хладним новчаником",
			bridge: "Потврдите везу са новчаником"
		}
	},
	ledger: {
		connectWithLedger: "Повежите се са Ledger",
		makeSureYourLedger: "Уверите се да је ваш Ledger безбедно повезан и да је апликација NEAR отворена на вашем уређају",
		"continue": "Настави",
		specifyHDPath: "Наведите ХД путању",
		enterYourPreferredHDPath: "Унесите жељену жељену ХД путању, а затим скенирајте све активне налоге.",
		scan: "Скенирајте",
		retry: "Покушај поново",
		ledgerIsNotAvailable: "Ledger није доступан.",
		accessDeniedToUseLedgerDevice: "Приступ је одбијен за коришћење Ledger уређаја",
		noAccountsFound: "Наlози нису пронађени",
		selectYourAccounts: "Изаберите Ваш наlог",
		connecting1Account: "Повезати 1 наlог",
		cantFindAnyAccount: "Није могуће пронаћи ниједан наlог повезан са овим Ledger-ом. Направите нови NEAR наlог",
		orConnectAnAnotherLedger: "или повежите други Ledger.",
		connecting: "Повезивање",
		ofAccounts: "наlога",
		failedToAutomatically: "Аутоматско проналажење ID-a наlога није успело. Наведите га ручно:",
		overviewTheListOfAuthorized: "Прегледајте листу овлашћених рачуна, завршите пријаву кликом на дугме испод.",
		finish: "Заврши"
	},
	install: {
		youllNeedToInstall: "Мораћете да инсталирате",
		toContinueAfterInstalling: "за наставак. Након инсталирања",
		refreshThePage: "поново учитати страницу.",
		open: "Отвори"
	},
	qr: {
		copiedToClipboard: "Копирано у међуспремник",
		failedToCopy: "Копирање у међуспремник није успело",
		scanWithYourMobile: "Скенирајте помоћу мобилног уређаја",
		copyToClipboard: " Копирај у међуспремник",
		preferTheOfficial: "Преферирате званични дијалог од",
		open: "Отвори"
	},
	walletTypes: {
		hardware: "Хардверски новчаник",
		browser: "Новчаник претраживача,",
		injected: "Додатак за новчаник,",
		bridge: "Bridge новчаник",
		mobile: "Мобилни новчаник",
		"instant-link": "Инстант новчаник"
	},
	exportAccounts: {
		chooseAWallet: "Изаберите новчаник",
		transferYourAccounts: "Пренесите своје налоге",
		selectAWallet: "Изаберите новчаник који одговара вашим потребама и који подржава ваше повезане налоге.",
		selectYourAccounts: "Изаберите ваше налоге",
		afterDecide: "Након што се одлучите за новчаник, можете изабрати које налоге желите да пренесете.",
		disclaimer: "Нећете моћи да пренесете налоге који никада нису били финансирани или коришћени на  NEAR.",
		warning: "тренутно не подржава извоз налога. Изаберите други новчаник.",
		walletTypes: {
			hardware: "Хардверски новчаник",
			browser: "Новчаник претраживача,",
			injected: "Додатак за новчаник,",
			bridge: "Bridge новчаник",
			mobile: "Мобилни новчаник"
		},
		selectAccounts: {
			title: "Изаберите налоге за пренос.",
			button: "Добијте приступну фразу",
			deselectAll: "Поништите избор",
			selectAll: "Изаберите све",
			unavailable: "Трансфер није доступан",
			error: "Налог не постоји",
			warningLedger: "Потребна подршка за Ledger",
			noBalance: "Налог није финансиран"
		},
		getPassphrase: {
			title: "Копирај привремену лозинку",
			desc: "Мораћете да унесете ову лозинку када почнете да извозите своје налоге у други новчаник.",
			button: "Наставите",
			label: "Кликните да бисте копирали",
			checkLabel: "Копирао сам или записао лозинку"
		},
		complete: {
			title: "Довршите трансфер",
			descOne: "Сада ћете бити преусмерени на новчаник који сте изабрали да завршите трансфер.",
			descTwo: "Када се део процеса увоза заврши из изабраног новчаника, притисните дугме да завршите процес преноса.",
			button: "Завршите"
		}
	}
};
var sr = {
	modal: modal
};

const getLanguage = languageCode => {
  switch (languageCode) {
    case "en":
      return en;
    case "es":
      return es;
    case "zh":
      return zh;
    case "bg":
      return bg;
    case "ko":
      return ko;
    case "vi":
      return vi;
    case "hi":
      return hi;
    case "ar":
      return ar;
    case "hr":
      return hr;
    case "mk":
      return mk;
    case "sl":
      return sl;
    case "sr":
      return sr;
    default:
      return en;
  }
};
let chosenLang;
const allowOnlyLanguage = langCode => {
  chosenLang = langCode;
};
// (i.e en-CA returns just en)
const shortenLanguageCode = lang => {
  return lang.indexOf("-") !== -1 ? lang.split("-")[0] : lang.split("_")[0];
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const findObjectPropByStringPath = (obj, prop) => {
  if (!obj) {
    return "";
  }
  const _index = prop.indexOf(".");
  if (_index > -1) {
    const currentProp = prop.substring(0, _index);
    const nextProp = prop.substring(_index + 1);
    return findObjectPropByStringPath(obj[currentProp], nextProp);
  }
  return obj[prop];
};
const translate = path => {
  let browserLang = window.navigator.languages ? window.navigator.languages[0] : null;
  browserLang = browserLang || window.navigator.language;
  const languageCode = shortenLanguageCode(chosenLang || browserLang);
  const selectedLanguage = getLanguage(languageCode);
  const text = findObjectPropByStringPath(selectedLanguage, path);
  return text && typeof text === "string" ? text : path;
};

export { EventEmitter, allowOnlyLanguage, getActiveAccount, isCurrentBrowserSupported, serializeNep413, setupWalletSelector, translate, verifyFullKeyBelongsToUser, verifySignature, waitFor };

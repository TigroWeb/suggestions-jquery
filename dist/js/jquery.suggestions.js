/**
 * DaData.ru Suggestions jQuery plugin, version 99.9.9
 *
 * DaData.ru Suggestions jQuery plugin is freely distributable under the terms of MIT-style license
 * Built on DevBridge Autocomplete for jQuery (https://github.com/devbridge/jQuery-Autocomplete)
 * For details, see https://github.com/hflabs/suggestions-jquery
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('jquery')) :
	typeof define === 'function' && define.amd ? define(['jquery'], factory) :
	(factory(global.$));
}(this, (function ($) { 'use strict';

$ = $ && 'default' in $ ? $['default'] : $;

function unwrapExports (x) {
	return x && x.__esModule ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

// 7.2.1 RequireObjectCoercible(argument)
var _defined = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

// 7.1.13 ToObject(argument)

var _toObject = function(it){
  return Object(_defined(it));
};

var hasOwnProperty = {}.hasOwnProperty;
var _has = function(it, key){
  return hasOwnProperty.call(it, key);
};

var toString = {}.toString;

var _cof = function(it){
  return toString.call(it).slice(8, -1);
};

// fallback for non-array-like ES3 and non-enumerable old V8 strings

var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return _cof(it) == 'String' ? it.split('') : Object(it);
};

// to indexed object, toObject with fallback for non-array-like ES3 strings

var _toIobject = function(it){
  return _iobject(_defined(it));
};

// 7.1.4 ToInteger
var ceil  = Math.ceil;
var floor = Math.floor;
var _toInteger = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

// 7.1.15 ToLength
var min       = Math.min;
var _toLength = function(it){
  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

var max       = Math.max;
var min$1       = Math.min;
var _toIndex = function(index, length){
  index = _toInteger(index);
  return index < 0 ? max(index + length, 0) : min$1(index, length);
};

// false -> Array#indexOf
// true  -> Array#includes

var _arrayIncludes = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = _toIobject($this)
      , length = _toLength(O.length)
      , index  = _toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var _global = createCommonjsModule(function (module) {
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
});

var SHARED = '__core-js_shared__';
var store  = _global[SHARED] || (_global[SHARED] = {});
var _shared = function(key){
  return store[key] || (store[key] = {});
};

var id = 0;
var px = Math.random();
var _uid = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

var shared = _shared('keys');
var _sharedKey = function(key){
  return shared[key] || (shared[key] = _uid(key));
};

var arrayIndexOf = _arrayIncludes(false);
var IE_PROTO     = _sharedKey('IE_PROTO');

var _objectKeysInternal = function(object, names){
  var O      = _toIobject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)_has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(_has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

// IE 8- don't enum bug keys
var _enumBugKeys = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

// 19.1.2.14 / 15.2.3.14 Object.keys(O)


var _objectKeys = Object.keys || function keys(O){
  return _objectKeysInternal(O, _enumBugKeys);
};

var _core = createCommonjsModule(function (module) {
var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
});

var _aFunction = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

// optional / simple context binding

var _ctx = function(fn, that, length){
  _aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

var _isObject = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var _anObject = function(it){
  if(!_isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

var _fails = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var _descriptors = !_fails(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

var document$1 = _global.document;
var is = _isObject(document$1) && _isObject(document$1.createElement);
var _domCreate = function(it){
  return is ? document$1.createElement(it) : {};
};

var _ie8DomDefine = !_descriptors && !_fails(function(){
  return Object.defineProperty(_domCreate('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

// 7.1.1 ToPrimitive(input [, PreferredType])

// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive = function(it, S){
  if(!_isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

var dP             = Object.defineProperty;

var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes){
  _anObject(O);
  P = _toPrimitive(P, true);
  _anObject(Attributes);
  if(_ie8DomDefine)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

var _objectDp = {
	f: f
};

var _propertyDesc = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

var _hide = _descriptors ? function(object, key, value){
  return _objectDp.f(object, key, _propertyDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

var PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? _core : _core[name] || (_core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? _global : IS_STATIC ? _global[name] : (_global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? _ctx(out, _global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])_hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
var _export = $export;

// most Object methods by ES6 should accept primitives

var _objectSap = function(KEY, exec){
  var fn  = (_core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  _export(_export.S + _export.F * _fails(function(){ fn(1); }), 'Object', exp);
};

// 19.1.2.14 Object.keys(O)


_objectSap('keys', function(){
  return function keys(it){
    return _objectKeys(_toObject(it));
  };
});

var keys$1 = _core.Object.keys;

var keys = createCommonjsModule(function (module) {
module.exports = { "default": keys$1, __esModule: true };
});

var _Object$keys = unwrapExports(keys);

// true  -> String#at
// false -> String#codePointAt
var _stringAt = function(TO_STRING){
  return function(that, pos){
    var s = String(_defined(that))
      , i = _toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

var _library = true;

var _redefine = _hide;

var _iterators = {};

var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties){
  _anObject(O);
  var keys   = _objectKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)_objectDp.f(O, P = keys[i++], Properties[P]);
  return O;
};

var _html = _global.document && document.documentElement;

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var IE_PROTO$1    = _sharedKey('IE_PROTO');
var Empty       = function(){ /* empty */ };
var PROTOTYPE$1   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = _domCreate('iframe')
    , i      = _enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  _html.appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
  return createDict();
};

var _objectCreate = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE$1] = _anObject(O);
    result = new Empty;
    Empty[PROTOTYPE$1] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO$1] = O;
  } else result = createDict();
  return Properties === undefined ? result : _objectDps(result, Properties);
};

var _wks = createCommonjsModule(function (module) {
var store      = _shared('wks')
  , Symbol     = _global.Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
};

$exports.store = store;
});

var def = _objectDp.f;
var TAG = _wks('toStringTag');

var _setToStringTag = function(it, tag, stat){
  if(it && !_has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
_hide(IteratorPrototype, _wks('iterator'), function(){ return this; });

var _iterCreate = function(Constructor, NAME, next){
  Constructor.prototype = _objectCreate(IteratorPrototype, {next: _propertyDesc(1, next)});
  _setToStringTag(Constructor, NAME + ' Iterator');
};

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var IE_PROTO$2    = _sharedKey('IE_PROTO');
var ObjectProto = Object.prototype;

var _objectGpo = Object.getPrototypeOf || function(O){
  O = _toObject(O);
  if(_has(O, IE_PROTO$2))return O[IE_PROTO$2];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

var ITERATOR       = _wks('iterator');
var BUGGY          = !([].keys && 'next' in [].keys());
var FF_ITERATOR    = '@@iterator';
var KEYS           = 'keys';
var VALUES         = 'values';

var returnThis = function(){ return this; };

var _iterDefine = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  _iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = _objectGpo($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      _setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!_library && !_has(IteratorPrototype, ITERATOR))_hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!_library || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    _hide(proto, ITERATOR, $default);
  }
  // Plug for library
  _iterators[NAME] = $default;
  _iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))_redefine(proto, key, methods[key]);
    } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

var $at  = _stringAt(true);

// 21.1.3.27 String.prototype[@@iterator]()
_iterDefine(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

var _addToUnscopables = function(){ /* empty */ };

var _iterStep = function(done, value){
  return {value: value, done: !!done};
};

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
var es6_array_iterator = _iterDefine(Array, 'Array', function(iterated, kind){
  this._t = _toIobject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return _iterStep(1);
  }
  if(kind == 'keys'  )return _iterStep(0, index);
  if(kind == 'values')return _iterStep(0, O[index]);
  return _iterStep(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
_iterators.Arguments = _iterators.Array;

_addToUnscopables('keys');
_addToUnscopables('values');
_addToUnscopables('entries');

var TO_STRING_TAG = _wks('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = _global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])_hide(proto, TO_STRING_TAG, NAME);
  _iterators[NAME] = _iterators.Array;
}

var f$1 = _wks;

var _wksExt = {
	f: f$1
};

var iterator$2 = _wksExt.f('iterator');

var iterator = createCommonjsModule(function (module) {
module.exports = { "default": iterator$2, __esModule: true };
});

var _meta = createCommonjsModule(function (module) {
var META     = _uid('meta')
  , setDesc  = _objectDp.f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !_fails(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!_isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!_has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!_has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !_has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};
});

var defineProperty = _objectDp.f;
var _wksDefine = function(name){
  var $Symbol = _core.Symbol || (_core.Symbol = _library ? {} : _global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: _wksExt.f(name)});
};

var _keyof = function(object, el){
  var O      = _toIobject(object)
    , keys   = _objectKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};

var f$2 = Object.getOwnPropertySymbols;

var _objectGops = {
	f: f$2
};

var f$3 = {}.propertyIsEnumerable;

var _objectPie = {
	f: f$3
};

// all enumerable object keys, includes symbols

var _enumKeys = function(it){
  var result     = _objectKeys(it)
    , getSymbols = _objectGops.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = _objectPie.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};

// 7.2.2 IsArray(argument)

var _isArray = Array.isArray || function isArray(arg){
  return _cof(arg) == 'Array';
};

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

var f$5 = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return _objectKeysInternal(O, hiddenKeys);
};

var _objectGopn = {
	f: f$5
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var gOPN$1      = _objectGopn.f;
var toString$1  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN$1(it);
  } catch(e){
    return windowNames.slice();
  }
};

var f$4 = function getOwnPropertyNames(it){
  return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : gOPN$1(_toIobject(it));
};

var _objectGopnExt = {
	f: f$4
};

var gOPD$1           = Object.getOwnPropertyDescriptor;

var f$6 = _descriptors ? gOPD$1 : function getOwnPropertyDescriptor(O, P){
  O = _toIobject(O);
  P = _toPrimitive(P, true);
  if(_ie8DomDefine)try {
    return gOPD$1(O, P);
  } catch(e){ /* empty */ }
  if(_has(O, P))return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
};

var _objectGopd = {
	f: f$6
};

// ECMAScript 6 symbols shim
var META           = _meta.KEY;
var gOPD           = _objectGopd.f;
var dP$2             = _objectDp.f;
var gOPN           = _objectGopnExt.f;
var $Symbol        = _global.Symbol;
var $JSON          = _global.JSON;
var _stringify     = $JSON && $JSON.stringify;
var PROTOTYPE$2      = 'prototype';
var HIDDEN         = _wks('_hidden');
var TO_PRIMITIVE   = _wks('toPrimitive');
var isEnum         = {}.propertyIsEnumerable;
var SymbolRegistry = _shared('symbol-registry');
var AllSymbols     = _shared('symbols');
var OPSymbols      = _shared('op-symbols');
var ObjectProto$1    = Object[PROTOTYPE$2];
var USE_NATIVE     = typeof $Symbol == 'function';
var QObject        = _global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = _descriptors && _fails(function(){
  return _objectCreate(dP$2({}, 'a', {
    get: function(){ return dP$2(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto$1, key);
  if(protoDesc)delete ObjectProto$1[key];
  dP$2(it, key, D);
  if(protoDesc && it !== ObjectProto$1)dP$2(ObjectProto$1, key, protoDesc);
} : dP$2;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _objectCreate($Symbol[PROTOTYPE$2]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto$1)$defineProperty(OPSymbols, key, D);
  _anObject(it);
  key = _toPrimitive(key, true);
  _anObject(D);
  if(_has(AllSymbols, key)){
    if(!D.enumerable){
      if(!_has(it, HIDDEN))dP$2(it, HIDDEN, _propertyDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(_has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _objectCreate(D, {enumerable: _propertyDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP$2(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  _anObject(it);
  var keys = _enumKeys(P = _toIobject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _objectCreate(it) : $defineProperties(_objectCreate(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = _toPrimitive(key, true));
  if(this === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key))return false;
  return E || !_has(this, key) || !_has(AllSymbols, key) || _has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = _toIobject(it);
  key = _toPrimitive(key, true);
  if(it === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && _has(AllSymbols, key) && !(_has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(_toIobject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!_has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto$1
    , names  = gOPN(IS_OP ? OPSymbols : _toIobject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(_has(AllSymbols, key = names[i++]) && (IS_OP ? _has(ObjectProto$1, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = _uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto$1)$set.call(OPSymbols, value);
      if(_has(this, HIDDEN) && _has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, _propertyDesc(1, value));
    };
    if(_descriptors && setter)setSymbolDesc(ObjectProto$1, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  _redefine($Symbol[PROTOTYPE$2], 'toString', function toString(){
    return this._k;
  });

  _objectGopd.f = $getOwnPropertyDescriptor;
  _objectDp.f   = $defineProperty;
  _objectGopn.f = _objectGopnExt.f = $getOwnPropertyNames;
  _objectPie.f  = $propertyIsEnumerable;
  _objectGops.f = $getOwnPropertySymbols;

  if(_descriptors && !_library){
    _redefine(ObjectProto$1, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  _wksExt.f = function(name){
    return wrap(_wks(name));
  };
}

_export(_export.G + _export.W + _export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i$1 = 0; symbols.length > i$1; )_wks(symbols[i$1++]);

for(var symbols = _objectKeys(_wks.store), i$1 = 0; symbols.length > i$1; )_wksDefine(symbols[i$1++]);

_export(_export.S + _export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return _has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return _keyof(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

_export(_export.S + _export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && _export(_export.S + _export.F * (!USE_NATIVE || _fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !_isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE$2][TO_PRIMITIVE] || _hide($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
_setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
_setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
_setToStringTag(_global.JSON, 'JSON', true);

_wksDefine('asyncIterator');

_wksDefine('observable');

var index = _core.Symbol;

var symbol = createCommonjsModule(function (module) {
module.exports = { "default": index, __esModule: true };
});

var _typeof_1 = createCommonjsModule(function (module, exports) {
"use strict";

exports.__esModule = true;



var _iterator2 = _interopRequireDefault(iterator);



var _symbol2 = _interopRequireDefault(symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};
});

var _typeof = unwrapExports(_typeof_1);

var $JSON$1 = _core.JSON || (_core.JSON = {stringify: JSON.stringify});
var stringify$1 = function stringify(it){ // eslint-disable-line no-unused-vars
  return $JSON$1.stringify.apply($JSON$1, arguments);
};

var stringify = createCommonjsModule(function (module) {
module.exports = { "default": stringify$1, __esModule: true };
});

var _JSON$stringify = unwrapExports(stringify);

var KEYS$1 = {
    ENTER: 'Enter',
    ESC: 'Escape',
    TAB: 'Tab',
    SPACE: 'Space',
    UP: 'ArrowUp',
    DOWN: 'ArrowDown'
};
var EVENT_NS = '.suggestions';
var DATA_ATTR_KEY = 'suggestions';
var WORD_DELIMITERS = '\\s"\'~\\*\\.,:\\|\\[\\]\\(\\)\\{\\}<>№';
var WORD_SPLITTER = new RegExp('[' + WORD_DELIMITERS + ']+', 'g');
var WORD_PARTS_DELIMITERS = '\\-\\+\\/\\\\\\?!@#$%^&';
var WORD_PARTS_SPLITTER = new RegExp('[' + WORD_PARTS_DELIMITERS + ']+', 'g');

var utils = function () {
    var _uniqueId = 0;
    return {
        escapeRegExChars: function escapeRegExChars(value) {
            return value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        },
        escapeHtml: function escapeHtml(str) {
            var map = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#x27;',
                '/': '&#x2F;'
            };

            if (str) {
                $.each(map, function (ch, html) {
                    str = str.replace(new RegExp(ch, 'g'), html);
                });
            }
            return str;
        },
        getDefaultType: function getDefaultType() {
            return $.support.cors ? 'POST' : 'GET';
        },
        getDefaultContentType: function getDefaultContentType() {
            return $.support.cors ? 'application/json' : 'application/x-www-form-urlencoded';
        },
        fixURLProtocol: function fixURLProtocol(url) {
            return $.support.cors ? url : url.replace(/^https?:/, location.protocol);
        },
        addUrlParams: function addUrlParams(url, params) {
            return url + (/\?/.test(url) ? '&' : '?') + $.param(params);
        },
        serialize: function serialize(data) {
            if ($.support.cors) {
                return _JSON$stringify(data, function (key, value) {
                    return value === null ? undefined : value;
                });
            } else {
                data = this.compactObject(data);
                return $.param(data, true);
            }
        },
        compact: function compact(array) {
            return $.grep(array, function (el) {
                return !!el;
            });
        },
        delay: function delay(handler, _delay) {
            return setTimeout(handler, _delay || 0);
        },
        uniqueId: function uniqueId(prefix) {
            return (prefix || '') + ++_uniqueId;
        },
        slice: function slice(obj, start) {
            return Array.prototype.slice.call(obj, start);
        },
        indexBy: function indexBy(data, field, indexField) {
            var result = {};

            $.each(data, function (i, obj) {
                var key = obj[field],
                    val = {};

                if (indexField) {
                    val[indexField] = i;
                }

                result[key] = $.extend(true, val, obj);
            });

            return result;
        },

        /**
         * Compares two objects, but only fields that are set in both
         * @param a
         * @param b
         * @returns {boolean}
         */
        areSame: function self(a, b) {
            var same = true;

            if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) != (typeof b === 'undefined' ? 'undefined' : _typeof(b))) {
                return false;
            }

            if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) == 'object' && a != null && b != null) {
                $.each(a, function (i, value) {
                    return same = self(value, b[i]);
                });
                return same;
            }

            return a === b;
        },

        /**
         * Returns array1 minus array2
         */
        arrayMinus: function arrayMinus(array1, array2) {
            return array2 ? $.grep(array1, function (el, i) {
                return $.inArray(el, array2) === -1;
            }) : array1;
        },
        /**
         * Returns array1 minus array2
         * if value in array1 in enclosed by value in array2, it is considered a match
         */
        arrayMinusWithPartialMatching: function arrayMinusWithPartialMatching(array1, array2) {
            return array2 ? $.grep(array1, function (el, i) {
                return !array2.some(function (el2) {
                    return el2.indexOf(el) === 0;
                });
            }) : array1;
        },
        /**
         * Пересечение массивов: ([1,2,3,4], [2,4,5,6]) => [2,4]
         * Исходные массивы не меняются
         * @param {Array} array1
         * @param {Array} array2
         * @returns {Array}
         */
        arraysIntersection: function arraysIntersection(array1, array2) {
            var result = [];
            if (!$.isArray(array1) || !$.isArray(array2)) {
                return result;
            }
            $.each(array1, function (index, item) {
                if ($.inArray(item, array2) >= 0) {
                    result.push(item);
                }
            });
            return result;
        },
        getWords: function getWords(str, stopwords) {
            // Split numbers and letters written together
            str = str.replace(/(\d+)([а-яА-ЯёЁ]{2,})/g, '$1 $2').replace(/([а-яА-ЯёЁ]+)(\d+)/g, '$1 $2');

            var words = this.compact(str.split(WORD_SPLITTER)),
                lastWord = words.pop(),
                goodWords = this.arrayMinus(words, stopwords);

            goodWords.push(lastWord);
            return goodWords;
        },
        /**
         * Returns normalized string without stopwords
         */
        normalize: function normalize(str, stopwords) {
            var that = this;
            return that.getWords(str, stopwords).join(' ');
        },
        /**
         * Returns true if str1 includes str2 plus something else, false otherwise.
         */
        stringEncloses: function stringEncloses(str1, str2) {
            return str1.length > str2.length && str1.indexOf(str2) !== -1;
        },
        fieldsNotEmpty: function fieldsNotEmpty(obj, fields) {
            if (!$.isPlainObject(obj)) {
                return false;
            }
            var result = true;
            $.each(fields, function (i, field) {
                return result = !!obj[field];
            });
            return result;
        },
        getDeepValue: function self(obj, name) {
            var path = name.split('.'),
                step = path.shift();

            return obj && (path.length ? self(obj[step], path.join('.')) : obj[step]);
        },
        reWordExtractor: function reWordExtractor() {
            return new RegExp('([^' + WORD_DELIMITERS + ']*)([' + WORD_DELIMITERS + ']*)', 'g');
        },
        /**
         * Возвращает список слов используемых в запросе
         */
        getTokens: function getTokens(value, unformattableTokens) {
            var tokens, preferredTokens;

            tokens = this.compact(this.formatToken(value).split(WORD_SPLITTER));
            // Move unformattableTokens to the end.
            // This will help to apply them only if no other tokens match
            preferredTokens = this.arrayMinus(tokens, unformattableTokens);
            tokens = this.withSubTokens(preferredTokens.concat(this.arrayMinus(tokens, preferredTokens)));

            return tokens;
        },
        formatToken: function formatToken(token) {
            return token && token.toLowerCase().replace(/[ёЁ]/g, 'е');
        },
        withSubTokens: function withSubTokens(tokens) {
            var result = [];

            $.each(tokens, function (i, token) {
                var subtokens = token.split(WORD_PARTS_SPLITTER);

                result.push(token);

                if (subtokens.length > 1) {
                    result = result.concat(utils.compact(subtokens));
                }
            });

            return result;
        },

        /**
         * Возвращает массив с ключами переданного объекта
         * Используется нативный Object.keys если он есть
         * @param {Object} obj
         * @returns {Array}
         */
        objectKeys: function objectKeys(obj) {
            if (_Object$keys) {
                return _Object$keys(obj);
            }
            var keys$$1 = [];
            $.each(obj, function (name) {
                keys$$1.push(name);
            });
            return keys$$1;
        },

        /**
         * Возвращает копию объекта без пустых элементов
         * @param obj
         */
        compactObject: function compactObject(obj) {
            var copy = $.extend(true, {}, obj);

            $.each(copy, function (key, val) {
                if (val === null || val === undefined || val === '') {
                    delete copy[key];
                }
            });

            return copy;
        },

        /**
         * Итератор. Работает только с объектами.
         * Для массивов использовать нативный forEach
         */
        each: function each(obj, callback) {
            _Object$keys(obj).forEach(function (key) {
                var value = obj[key];
                callback(value, key);
            });
        },

        isFunction: function isFunction(it) {
            return Object.prototype.toString.call(it) === '[object Function]';
        }

    };
}();

/**
 * Matchers return index of suitable suggestion
 * Context inside is optionally set in types.js
 */
var matchers = function () {

    /**
     * Factory to create same parent checker function
     * @param preprocessFn called on each value before comparison
     * @returns {Function} same parent checker function
     */
    function sameParentChecker(preprocessFn) {
        return function (suggestions) {
            if (suggestions.length === 0) {
                return false;
            }
            if (suggestions.length === 1) {
                return true;
            }

            var parentValue = preprocessFn(suggestions[0].value),
                aliens = $.grep(suggestions, function (suggestion) {
                return preprocessFn(suggestion.value).indexOf(parentValue) === 0;
            }, true);

            return aliens.length === 0;
        };
    }

    /**
     * Default same parent checker. Compares raw values.
     * @type {Function}
     */
    var haveSameParent = sameParentChecker(function (val) {
        return val;
    });

    /**
     * Same parent checker for addresses. Strips house and extension before comparison.
     * @type {Function}
     */
    var haveSameParentAddress = sameParentChecker(function (val) {
        return val.replace(/, (?:д|вл|двлд|к) .+$/, '');
    });

    return {

        /**
         * Matches query against suggestions, removing all the stopwords.
         */
        matchByNormalizedQuery: function matchByNormalizedQuery(query, suggestions) {
            var queryLowerCase = query.toLowerCase(),
                stopwords = this && this.stopwords,
                normalizedQuery = utils.normalize(queryLowerCase, stopwords),
                matches = [];

            $.each(suggestions, function (i, suggestion) {
                var suggestedValue = suggestion.value.toLowerCase();
                // if query encloses suggestion, than it has already been selected
                // so we should not select it anymore
                if (utils.stringEncloses(queryLowerCase, suggestedValue)) {
                    return false;
                }
                // if there is suggestion that contains query as its part
                // than we should ignore all other matches, even full ones
                if (suggestedValue.indexOf(normalizedQuery) > 0) {
                    return false;
                }
                if (normalizedQuery === utils.normalize(suggestedValue, stopwords)) {
                    matches.push(i);
                }
            });

            return matches.length === 1 ? matches[0] : -1;
        },

        /**
         * Matches query against suggestions word-by-word (with respect to stopwords).
         * Matches if query words are a subset of suggested words.
         */
        matchByWords: function matchByWords(query, suggestions) {
            var stopwords = this && this.stopwords,
                queryLowerCase = query.toLowerCase(),
                queryTokens,
                matches = [];

            if (haveSameParent(suggestions)) {
                queryTokens = utils.withSubTokens(utils.getWords(queryLowerCase, stopwords));

                $.each(suggestions, function (i, suggestion) {
                    var suggestedValue = suggestion.value.toLowerCase();

                    if (utils.stringEncloses(queryLowerCase, suggestedValue)) {
                        return false;
                    }

                    // check if query words are a subset of suggested words
                    var suggestionWords = utils.withSubTokens(utils.getWords(suggestedValue, stopwords));

                    if (utils.arrayMinus(queryTokens, suggestionWords).length === 0) {
                        matches.push(i);
                    }
                });
            }

            return matches.length === 1 ? matches[0] : -1;
        },

        matchByWordsAddress: function matchByWordsAddress(query, suggestions) {
            var stopwords = this && this.stopwords,
                queryLowerCase = query.toLowerCase(),
                queryTokens,
                index = -1;

            if (haveSameParentAddress(suggestions)) {
                queryTokens = utils.withSubTokens(utils.getWords(queryLowerCase, stopwords));

                $.each(suggestions, function (i, suggestion) {
                    var suggestedValue = suggestion.value.toLowerCase();

                    if (utils.stringEncloses(queryLowerCase, suggestedValue)) {
                        return false;
                    }

                    // check if query words are a subset of suggested words
                    var suggestionWords = utils.withSubTokens(utils.getWords(suggestedValue, stopwords));

                    if (utils.arrayMinus(queryTokens, suggestionWords).length === 0) {
                        index = i;
                        return false;
                    }
                });
            }

            return index;
        },

        /**
         * Matches query against values contained in suggestion fields
         * for cases, when there is only one suggestion
         * only considers fields specified in fieldsStopwords map
         * uses partial matching:
         *   "0445" vs { value: "ALFA-BANK", data: { "bic": "044525593" }} is a match
         */
        matchByFields: function matchByFields(query, suggestions) {
            var stopwords = this && this.stopwords,
                fieldsStopwords = this && this.fieldsStopwords,
                tokens = utils.withSubTokens(utils.getWords(query.toLowerCase(), stopwords)),
                suggestionWords = [];

            if (suggestions.length === 1) {
                if (fieldsStopwords) {
                    $.each(fieldsStopwords, function (field, stopwords) {
                        var fieldValue = utils.getDeepValue(suggestions[0], field),
                            fieldWords = fieldValue && utils.withSubTokens(utils.getWords(fieldValue.toLowerCase(), stopwords));

                        if (fieldWords && fieldWords.length) {
                            suggestionWords = suggestionWords.concat(fieldWords);
                        }
                    });
                }

                if (utils.arrayMinusWithPartialMatching(tokens, suggestionWords).length === 0) {
                    return 0;
                }
            }

            return -1;
        }

    };
}();

var DEFAULT_OPTIONS = {
    autoSelectFirst: false,
    // основной url, может быть переопределен
    serviceUrl: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs',
    // url, который заменяет serviceUrl + method + type
    // то есть, если он задан, то для всех запросов будет использоваться именно он
    // если не поддерживается cors то к url будут добавлены параметры ?token=...&version=...
    // и заменен протокол на протокол текущей страницы
    url: null,
    onSearchStart: $.noop,
    onSearchComplete: $.noop,
    onSearchError: $.noop,
    onSuggestionsFetch: null,
    onSelect: null,
    onSelectNothing: null,
    onInvalidateSelection: null,
    minChars: 1,
    deferRequestBy: 100,
    params: {},
    paramName: 'query',
    timeout: 3000,
    formatResult: null,
    formatSelected: null,
    noCache: false,
    containerClass: 'suggestions-suggestions',
    tabDisabled: false,
    triggerSelectOnSpace: false,
    triggerSelectOnEnter: true,
    triggerSelectOnBlur: true,
    preventBadQueries: false,
    hint: 'Выберите вариант или продолжите ввод',
    noSuggestionsHint: {
        NAME: 'Неизвестное ФИО',
        ADDRESS: 'Неизвестный адрес',
        EMAIL: 'Неизвестная эл. почта',
        PARTY: 'Неизвестная организация',
        BANK: 'Неизвестный банк'
    },
    type: null,
    requestMode: 'suggest',
    count: 5,
    $helpers: null,
    headers: null,
    scrollOnFocus: true,
    mobileWidth: 980,
    initializeInterval: 100
};

/**
 * Type is a bundle of properties:
 * - urlSuffix Mandatory. String
 * - matchers Mandatory. Array of functions (with optional data bound as a context) that find appropriate suggestion to select
 * - `fieldNames` Map fields of suggestion.data to their displayable names
 * - `unformattableTokens` Array of strings which should not be highlighted
 * - `dataComponents` Array of 'bound's can be set as `bounds` option. Order is important.
 *
 * flags:
 * - `alwaysContinueSelecting` Forbids to hide dropdown after selecting
 * - `geoEnabled` Makes to detect client's location for passing it to all requests
 * - `enrichmentEnabled` Makes to send additional request when a suggestion is selected
 *
 * and methods:
 * - `isDataComplete` Checks if suggestion.data can be operated as full data of it's type
 * - `composeValue` returns string value based on suggestion.data
 * - `formatResult` returns html of a suggestion. Overrides default method
 * - `formatResultInn` returns html of suggestion.data.inn
 * - `isQueryRequestable` checks if query is appropriated for requesting server
 * - `formatSelected` returns string to be inserted in textbox
 */

var ADDRESS_STOPWORDS = ['ао', 'аобл', 'дом', 'респ', 'а/я', 'аал', 'автодорога', 'аллея', 'арбан', 'аул', 'б-р', 'берег', 'бугор', 'вал', 'вл', 'волость', 'въезд', 'высел', 'г', 'городок', 'гск', 'д', 'двлд', 'днп', 'дор', 'дп', 'ж/д_будка', 'ж/д_казарм', 'ж/д_оп', 'ж/д_платф', 'ж/д_пост', 'ж/д_рзд', 'ж/д_ст', 'жилзона', 'жилрайон', 'жт', 'заезд', 'заимка', 'зона', 'к', 'казарма', 'канал', 'кв', 'кв-л', 'км', 'кольцо', 'комн', 'кордон', 'коса', 'кп', 'край', 'линия', 'лпх', 'м', 'массив', 'местность', 'мкр', 'мост', 'н/п', 'наб', 'нп', 'обл', 'округ', 'остров', 'оф', 'п', 'п/о', 'п/р', 'п/ст', 'парк', 'пгт', 'пер', 'переезд', 'пл', 'пл-ка', 'платф', 'погост', 'полустанок', 'починок', 'пр-кт', 'проезд', 'промзона', 'просек', 'просека', 'проселок', 'проток', 'протока', 'проулок', 'р-н', 'рзд', 'россия', 'рп', 'ряды', 'с', 'с/а', 'с/мо', 'с/о', 'с/п', 'с/с', 'сад', 'сквер', 'сл', 'снт', 'спуск', 'ст', 'ст-ца', 'стр', 'тер', 'тракт', 'туп', 'у', 'ул', 'уч-к', 'ф/х', 'ферма', 'х', 'ш', 'бульвар', 'владение', 'выселки', 'гаражно-строительный', 'город', 'деревня', 'домовладение', 'дорога', 'квартал', 'километр', 'комната', 'корпус', 'литер', 'леспромхоз', 'местечко', 'микрорайон', 'набережная', 'область', 'переулок', 'платформа', 'площадка', 'площадь', 'поселение', 'поселок', 'проспект', 'разъезд', 'район', 'республика', 'село', 'сельсовет', 'слобода', 'сооружение', 'станица', 'станция', 'строение', 'территория', 'тупик', 'улица', 'улус', 'участок', 'хутор', 'шоссе'];

/**
 * Компоненты адреса
 * @type {*[]}
 * id {String} Наименование типа
 * fields {Array of Strings}
 * forBounds {Boolean} может использоваться в ограничениях
 * forLocations {Boolean}
 * kladrFormat {Object}
 * fiasType {String} Наименование соответствующего ФИАС типа
 */
var ADDRESS_COMPONENTS = [{
    id: 'kladr_id',
    fields: ['kladr_id'],
    forBounds: false,
    forLocations: true
}, {
    id: 'postal_code',
    fields: ['postal_code'],
    forBounds: false,
    forLocations: true
}, {
    id: 'country',
    fields: ['country'],
    forBounds: false,
    forLocations: true
}, {
    id: 'region_fias_id',
    fields: ['region_fias_id'],
    forBounds: false,
    forLocations: true
}, {
    id: 'region_type_full',
    fields: ['region_type_full'],
    forBounds: false,
    forLocations: true,
    kladrFormat: { digits: 2, zeros: 11 },
    fiasType: 'region_fias_id'
}, {
    id: 'region',
    fields: ['region', 'region_type', 'region_type_full', 'region_with_type'],
    forBounds: true,
    forLocations: true,
    kladrFormat: { digits: 2, zeros: 11 },
    fiasType: 'region_fias_id'
}, {
    id: 'area_fias_id',
    fields: ['area_fias_id'],
    forBounds: false,
    forLocations: true
}, {
    id: 'area_type_full',
    fields: ['area_type_full'],
    forBounds: false,
    forLocations: true,
    kladrFormat: { digits: 5, zeros: 8 },
    fiasType: 'area_fias_id'
}, {
    id: 'area',
    fields: ['area', 'area_type', 'area_type_full', 'area_with_type'],
    forBounds: true,
    forLocations: true,
    kladrFormat: { digits: 5, zeros: 8 },
    fiasType: 'area_fias_id'
}, {
    id: 'city_fias_id',
    fields: ['city_fias_id'],
    forBounds: false,
    forLocations: true
}, {
    id: 'city_type_full',
    fields: ['city_type_full'],
    forBounds: false,
    forLocations: true,
    kladrFormat: { digits: 8, zeros: 5 },
    fiasType: 'city_fias_id'
}, {
    id: 'city',
    fields: ['city', 'city_type', 'city_type_full', 'city_with_type'],
    forBounds: true,
    forLocations: true,
    kladrFormat: { digits: 8, zeros: 5 },
    fiasType: 'city_fias_id'
}, {
    id: 'city_district_fias_id',
    fields: ['city_district_fias_id'],
    forBounds: false,
    forLocations: true
}, {
    id: 'city_district_type_full',
    fields: ['city_district_type_full'],
    forBounds: false,
    forLocations: true,
    kladrFormat: { digits: 11, zeros: 2 },
    fiasType: 'city_district_fias_id'
}, {
    id: 'city_district',
    fields: ['city_district', 'city_district_type', 'city_district_type_full', 'city_district_with_type'],
    forBounds: true,
    forLocations: true,
    kladrFormat: { digits: 11, zeros: 2 },
    fiasType: 'city_district_fias_id'
}, {
    id: 'settlement_fias_id',
    fields: ['settlement_fias_id'],
    forBounds: false,
    forLocations: true
}, {
    id: 'settlement_type_full',
    fields: ['settlement_type_full'],
    forBounds: false,
    forLocations: true,
    kladrFormat: { digits: 11, zeros: 2 },
    fiasType: 'settlement_fias_id'
}, {
    id: 'settlement',
    fields: ['settlement', 'settlement_type', 'settlement_type_full', 'settlement_with_type'],
    forBounds: true,
    forLocations: true,
    kladrFormat: { digits: 11, zeros: 2 },
    fiasType: 'settlement_fias_id'
}, {
    id: 'street_fias_id',
    fields: ['street_fias_id'],
    forBounds: false,
    forLocations: true
}, {
    id: 'street_type_full',
    fields: ['street_type_full'],
    forBounds: false,
    forLocations: true,
    kladrFormat: { digits: 15, zeros: 2 },
    fiasType: 'street_fias_id'
}, {
    id: 'street',
    fields: ['street', 'street_type', 'street_type_full', 'street_with_type'],
    forBounds: true,
    forLocations: true,
    kladrFormat: { digits: 15, zeros: 2 },
    fiasType: 'street_fias_id'
}, {
    id: 'house',
    fields: ['house', 'house_type', 'house_type_full', 'block', 'block_type'],
    forBounds: true,
    forLocations: false,
    kladrFormat: { digits: 19 }
}];

var rHasMatch = /<strong>/;

var innPartsLengths = {
    'LEGAL': [2, 2, 5, 1],
    'INDIVIDUAL': [2, 2, 6, 2]
};

function valueStartsWith(suggestion, field) {
    var fieldValue = suggestion.data && suggestion.data[field];

    return fieldValue && new RegExp('^' + utils.escapeRegExChars(fieldValue) + '([' + WORD_DELIMITERS + ']|$)', 'i').test(suggestion.value);
}

function chooseFormattedField(formattedMain, formattedAlt) {
    return rHasMatch.test(formattedAlt) && !rHasMatch.test(formattedMain) ? formattedAlt : formattedMain;
}

function formattedField(main, alt, currentValue, suggestion, options) {
    var that = this,
        formattedMain = that.highlightMatches(main, currentValue, suggestion, options),
        formattedAlt = that.highlightMatches(alt, currentValue, suggestion, options);

    return chooseFormattedField(formattedMain, formattedAlt);
}

var types = {};

types['NAME'] = {
    urlSuffix: 'fio',
    matchers: [matchers.matchByNormalizedQuery, matchers.matchByWords],
    // names for labels, describing which fields are displayed
    fieldNames: {
        surname: 'фамилия',
        name: 'имя',
        patronymic: 'отчество'
    },
    // try to suggest even if a suggestion has been selected manually
    alwaysContinueSelecting: true,
    isDataComplete: function isDataComplete(suggestion) {
        var that = this,
            params = that.options.params,
            data = suggestion.data,
            fields;

        if ($.isFunction(params)) {
            params = params.call(that.element, suggestion.value);
        }
        if (params && params.parts) {
            fields = $.map(params.parts, function (part) {
                return part.toLowerCase();
            });
        } else {
            // when NAME is first, patronymic is mot mandatory
            fields = ['surname', 'name'];
            // when SURNAME is first, it is
            if (valueStartsWith(suggestion, 'surname')) {
                fields.push('patronymic');
            }
        }
        return utils.fieldsNotEmpty(data, fields);
    },
    composeValue: function composeValue(data) {
        return utils.compact([data.surname, data.name, data.patronymic]).join(' ');
    }
};

types['ADDRESS'] = {
    urlSuffix: 'address',
    matchers: [$.proxy(matchers.matchByNormalizedQuery, { stopwords: ADDRESS_STOPWORDS }), $.proxy(matchers.matchByWordsAddress, { stopwords: ADDRESS_STOPWORDS })],
    dataComponents: ADDRESS_COMPONENTS,
    dataComponentsById: utils.indexBy(ADDRESS_COMPONENTS, 'id', 'index'),
    unformattableTokens: ADDRESS_STOPWORDS,
    enrichmentEnabled: true,
    geoEnabled: true,
    isDataComplete: function isDataComplete(suggestion) {
        var fields = [this.bounds.to || 'flat'],
            data = suggestion.data;

        return !$.isPlainObject(data) || utils.fieldsNotEmpty(data, fields);
    },
    composeValue: function composeValue(data, options) {
        var region = data.region_with_type || utils.compact([data.region, data.region_type]).join(' ') || data.region_type_full,
            area = data.area_with_type || utils.compact([data.area_type, data.area]).join(' ') || data.area_type_full,
            city = data.city_with_type || utils.compact([data.city_type, data.city]).join(' ') || data.city_type_full,
            settelement = data.settlement_with_type || utils.compact([data.settlement_type, data.settlement]).join(' ') || data.settlement_type_full,
            cityDistrict = data.city_district_with_type || utils.compact([data.city_district_type, data.city_district]).join(' ') || data.city_district_type_full,
            street = data.street_with_type || utils.compact([data.street_type, data.street]).join(' ') || data.street_type_full,
            house = utils.compact([data.house_type, data.house, data.block_type, data.block]).join(' '),
            flat = utils.compact([data.flat_type, data.flat]).join(' '),
            postal_box = data.postal_box && 'а/я ' + data.postal_box,
            result;

        // если регион совпадает с городом
        // например г Москва, г Москва
        // то не показываем регион
        if (region === city) {
            region = '';
        }

        // иногда не показываем район
        if (!(options && options.saveCityDistrict)) {
            if (options && options.excludeCityDistrict) {
                // если район явно запрещен
                cityDistrict = '';
            } else if (cityDistrict && !data.city_district_fias_id) {
                // если район взят из ОКАТО (у него пустой city_district_fias_id)
                cityDistrict = '';
            }
        }

        result = utils.compact([region, area, city, cityDistrict, settelement, street, house, flat, postal_box]).join(', ');

        return result;
    },
    formatResult: function () {
        var componentsUnderCityDistrict = [],
            _underCityDistrict = false;

        $.each(ADDRESS_COMPONENTS, function () {
            if (_underCityDistrict) componentsUnderCityDistrict.push(this.id);
            if (this.id === 'city_district') _underCityDistrict = true;
        });

        return function (value, currentValue, suggestion, options) {
            var that = this,
                district = suggestion.data && suggestion.data.city_district_with_type,
                unformattableTokens = options && options.unformattableTokens,
                historyValues = suggestion.data && suggestion.data.history_values,
                tokens,
                unusedTokens,
                formattedHistoryValues;

            // добавляем исторические значения
            if (historyValues && historyValues.length > 0) {
                tokens = utils.getTokens(currentValue, unformattableTokens);
                unusedTokens = this.type.findUnusedTokens(tokens, value);
                formattedHistoryValues = this.type.getFormattedHistoryValues(unusedTokens, historyValues);
                if (formattedHistoryValues) {
                    value += formattedHistoryValues;
                }
            }

            value = that.highlightMatches(value, currentValue, suggestion, options);
            value = that.wrapFormattedValue(value, suggestion);

            if (district && (!that.bounds.own.length || that.bounds.own.indexOf('street') >= 0) && !$.isEmptyObject(that.copyDataComponents(suggestion.data, componentsUnderCityDistrict))) {
                value += '<div class="' + that.classes.subtext + '">' + that.highlightMatches(district, currentValue, suggestion) + '</div>';
            }

            return value;
        };
    }(),

    /**
     * Возвращает список слов в запросе для которых не найдено соответствующего слова в ответе
     */
    findUnusedTokens: function findUnusedTokens(tokens, value) {
        var tokenIndex,
            token,
            unused = [];

        for (tokenIndex in tokens) {
            token = tokens[tokenIndex];
            if (value.indexOf(token) === -1) {
                unused.push(token);
            }
        }

        return unused;
    },

    /**
     * Возвращает исторические названия для слов запроса, для которых не найдено совпадения в основном значении
     */
    getFormattedHistoryValues: function getFormattedHistoryValues(unusedTokens, historyValues) {
        var tokenIndex,
            token,
            historyValueIndex,
            historyValue,
            values = [],
            formatted = '';

        for (historyValueIndex in historyValues) {
            historyValue = historyValues[historyValueIndex];
            for (tokenIndex in unusedTokens) {
                token = unusedTokens[tokenIndex];
                if (historyValue.toLowerCase().indexOf(token) >= 0) {
                    values.push(historyValue);
                    break;
                }
            }
        }

        if (values.length > 0) {
            formatted = ' (бывш. ' + values.join(', ') + ')';
        }

        return formatted;
    },

    /**
     * @param instance
     * @param options
     * @param options.suggestion
     * @param options.hasSameValues
     * @param options.hasBeenEnreached
     */
    getSuggestionValue: function getSuggestionValue(instance, options) {
        var formattedValue = null;

        if (options.hasSameValues) {
            if (instance.options.restrict_value) {
                // Can not use unrestricted address,
                // because some components (from constraints) must be omitted
                formattedValue = this.getValueWithinConstraints(instance, options.suggestion);
            } else if (instance.bounds.own.length) {
                // Can not use unrestricted address,
                // because only components from bounds must be included
                formattedValue = this.getValueWithinBounds(instance, options.suggestion);
            } else {
                // Can use full unrestricted address
                formattedValue = options.suggestion.unrestricted_value;
            }
        } else if (options.hasBeenEnriched) {
            if (instance.options.restrict_value) {
                formattedValue = this.getValueWithinConstraints(instance, options.suggestion, { excludeCityDistrict: true });
            }
        }

        return formattedValue;
    },
    /*
     * Compose suggestion value with respect to constraints
     */
    getValueWithinConstraints: function getValueWithinConstraints(instance, suggestion, options) {
        return this.composeValue(instance.getUnrestrictedData(suggestion.data), options);
    },
    /*
     * Compose suggestion value with respect to bounds
     */
    getValueWithinBounds: function getValueWithinBounds(instance, suggestion, options) {
        // для корректного составления адреса нужен city_district_fias_id
        var data = instance.copyDataComponents(suggestion.data, instance.bounds.own.concat(['city_district_fias_id']));

        return this.composeValue(data, options);
    }

};

types['PARTY'] = {
    urlSuffix: 'party',
    matchers: [$.proxy(matchers.matchByFields, {
        // These fields of suggestion's `data` used by by-words matcher
        fieldsStopwords: {
            'value': null,
            'data.address.value': ADDRESS_STOPWORDS,
            'data.inn': null,
            'data.ogrn': null
        }
    })],
    dataComponents: ADDRESS_COMPONENTS,
    geoEnabled: true,
    formatResult: function formatResult(value, currentValue, suggestion, options) {
        var that = this,
            formattedInn = that.type.formatResultInn.call(that, suggestion, currentValue),
            formatterOGRN = that.highlightMatches(utils.getDeepValue(suggestion.data, 'ogrn'), currentValue, suggestion),
            formattedInnOGRN = chooseFormattedField(formattedInn, formatterOGRN),
            formattedFIO = that.highlightMatches(utils.getDeepValue(suggestion.data, 'management.name'), currentValue, suggestion),
            address = utils.getDeepValue(suggestion.data, 'address.value') || '';

        if (that.isMobile) {
            (options || (options = {})).maxLength = 50;
        }

        value = formattedField.call(that, value, utils.getDeepValue(suggestion.data, 'name.latin'), currentValue, suggestion, options);
        value = that.wrapFormattedValue(value, suggestion);

        if (address) {
            address = address.replace(/^(\d{6}?\s+|Россия,\s+)/i, '');
            if (that.isMobile) {
                // keep only two first words
                address = address.replace(new RegExp('^([^' + WORD_DELIMITERS + ']+[' + WORD_DELIMITERS + ']+[^' + WORD_DELIMITERS + ']+).*'), '$1');
            } else {
                address = that.highlightMatches(address, currentValue, suggestion, {
                    unformattableTokens: ADDRESS_STOPWORDS
                });
            }
        }

        if (formattedInnOGRN || address || formattedFIO) {
            value += '<div class="' + that.classes.subtext + '">' + '<span class="' + that.classes.subtext_inline + '">' + (formattedInnOGRN || '') + '</span>' + (chooseFormattedField(address, formattedFIO) || '') + '</div>';
        }
        return value;
    },
    formatResultInn: function formatResultInn(suggestion, currentValue) {
        var that = this,
            inn = suggestion.data && suggestion.data.inn,
            innPartsLength = innPartsLengths[suggestion.data && suggestion.data.type],
            innParts,
            formattedInn,
            rDigit = /\d/;

        if (inn) {
            formattedInn = that.highlightMatches(inn, currentValue, suggestion);
            if (innPartsLength) {
                formattedInn = formattedInn.split('');
                innParts = $.map(innPartsLength, function (partLength) {
                    var formattedPart = '',
                        ch;

                    while (partLength && (ch = formattedInn.shift())) {
                        formattedPart += ch;
                        if (rDigit.test(ch)) partLength--;
                    }

                    return formattedPart;
                });
                formattedInn = innParts.join('<span class="' + that.classes.subtext_delimiter + '"></span>') + formattedInn.join('');
            }

            return formattedInn;
        }
    }
};

types['EMAIL'] = {
    urlSuffix: 'email',
    matchers: [matchers.matchByNormalizedQuery],
    isQueryRequestable: function isQueryRequestable(query) {
        return this.options.suggest_local || query.indexOf('@') >= 0;
    }
};

types['BANK'] = {
    urlSuffix: 'bank',
    matchers: [$.proxy(matchers.matchByFields, {
        // These fields of suggestion's `data` used by by-words matcher
        fieldsStopwords: {
            'value': null,
            'data.bic': null,
            'data.swift': null
        }
    })],
    dataComponents: ADDRESS_COMPONENTS,
    geoEnabled: true,
    formatResult: function formatResult(value, currentValue, suggestion, options) {
        var that = this,
            formattedBIC = that.highlightMatches(utils.getDeepValue(suggestion.data, 'bic'), currentValue, suggestion),
            address = utils.getDeepValue(suggestion.data, 'address.value') || '';

        value = that.highlightMatches(value, currentValue, suggestion, options);
        value = that.wrapFormattedValue(value, suggestion);

        if (address) {
            address = address.replace(/^\d{6}( РОССИЯ)?, /i, '');
            if (that.isMobile) {
                // keep only two first words
                address = address.replace(new RegExp('^([^' + WORD_DELIMITERS + ']+[' + WORD_DELIMITERS + ']+[^' + WORD_DELIMITERS + ']+).*'), '$1');
            } else {
                address = that.highlightMatches(address, currentValue, suggestion, {
                    unformattableTokens: ADDRESS_STOPWORDS
                });
            }
        }

        if (formattedBIC || address) {
            value += '<div class="' + that.classes.subtext + '">' + '<span class="' + that.classes.subtext_inline + '">' + formattedBIC + '</span>' + address + '</div>';
        }
        return value;
    },
    formatSelected: function formatSelected(suggestion) {
        return utils.getDeepValue(suggestion, 'data.name.payment') || null;
    }
};

$.extend(DEFAULT_OPTIONS, {
    suggest_local: true
});

var notificator = {

    chains: {},

    'on': function on(name, method) {
        this.get(name).push(method);
        return this;
    },

    'get': function get(name) {
        var chains = this.chains;
        return chains[name] || (chains[name] = []);
    }
};

var serviceMethods = {
    'suggest': {
        defaultParams: {
            type: utils.getDefaultType(),
            dataType: 'json',
            contentType: utils.getDefaultContentType()
        },
        addTypeInUrl: true
    },
    'detectAddressByIp': {
        defaultParams: {
            type: 'GET',
            dataType: 'json'
        },
        addTypeInUrl: false
    },
    'status': {
        defaultParams: {
            type: 'GET',
            dataType: 'json'
        },
        addTypeInUrl: true
    },
    'findById': {
        defaultParams: {
            type: utils.getDefaultType(),
            dataType: 'json',
            contentType: utils.getDefaultContentType()
        },
        addTypeInUrl: true
    }
};

var requestModes = {
    'suggest': {
        method: 'suggest',
        userSelect: true,
        updateValue: true,
        enrichmentEnabled: true
    },
    'findById': {
        method: 'findById',
        userSelect: false,
        updateValue: false,
        enrichmentEnabled: false
    }
};

function Suggestions(el, options) {
    var that = this;

    // Shared variables:
    that.element = el;
    that.el = $(el);
    that.suggestions = [];
    that.badQueries = [];
    that.selectedIndex = -1;
    that.currentValue = that.element.value;
    that.intervalId = 0;
    that.cachedResponse = {};
    that.enrichmentCache = {};
    that.currentRequest = null;
    that.inputPhase = null;
    that.inputPhaseResolve = function () {};
    that.inputPhaseReject = function () {};
    that.fetchPhase = $.Deferred();
    that.enrichPhase = $.Deferred();
    that.onChangeTimeout = null;
    that.triggering = {};
    that.$wrapper = null;
    that.options = $.extend({}, DEFAULT_OPTIONS, options);
    that.classes = {
        hint: 'suggestions-hint',
        mobile: 'suggestions-mobile',
        nowrap: 'suggestions-nowrap',
        selected: 'suggestions-selected',
        suggestion: 'suggestions-suggestion',
        subtext: 'suggestions-subtext',
        subtext_inline: 'suggestions-subtext suggestions-subtext_inline',
        subtext_delimiter: 'suggestions-subtext-delimiter',
        subtext_label: 'suggestions-subtext suggestions-subtext_label',
        removeConstraint: 'suggestions-remove',
        value: 'suggestions-value'
    };
    that.disabled = false;
    that.selection = null;
    that.$viewport = $(window);
    that.$body = $(document.body);
    that.type = null;
    that.status = {};

    that.setupElement();

    that.initializer = $.Deferred();

    if (that.el.is(':visible')) {
        that.initializer.resolve();
    } else {
        that.deferInitialization();
    }

    that.initializer.done($.proxy(that.initialize, that));
}

Suggestions.prototype = {

    // Creation and destruction

    initialize: function initialize() {
        var that = this;

        that.uniqueId = utils.uniqueId('i');

        that.createWrapper();
        that.notify('initialize');

        that.bindWindowEvents();

        that.setOptions();
        that.fixPosition();
    },

    /**
     * Initialize when element is firstly interacted
     */
    deferInitialization: function deferInitialization() {
        var that = this,
            events = 'mouseover focus keydown',
            timer,
            callback = function callback() {
            that.initializer.resolve();
            that.enable();
        };

        that.initializer.always(function () {
            that.el.off(events, callback);
            clearInterval(timer);
        });

        that.disabled = true;
        that.el.on(events, callback);
        timer = setInterval(function () {
            if (that.el.is(':visible')) {
                callback();
            }
        }, that.options.initializeInterval);
    },

    isInitialized: function isInitialized() {
        return this.initializer.state() === 'resolved';
    },

    dispose: function dispose() {
        var that = this;

        that.initializer.reject();
        that.notify('dispose');
        that.el.removeData(DATA_ATTR_KEY).removeClass('suggestions-input');
        that.unbindWindowEvents();
        that.removeWrapper();
        that.el.trigger('suggestions-dispose');
    },

    notify: function notify(chainName) {
        var that = this,
            args = utils.slice(arguments, 1);

        return $.map(notificator.get(chainName), function (method) {
            return method.apply(that, args);
        });
    },

    createWrapper: function createWrapper() {
        var that = this;

        that.$wrapper = $('<div class="suggestions-wrapper"/>');
        that.el.after(that.$wrapper);

        that.$wrapper.on('mousedown' + EVENT_NS, $.proxy(that.onMousedown, that));
    },

    removeWrapper: function removeWrapper() {
        var that = this;

        if (that.$wrapper) {
            that.$wrapper.remove();
        }
        $(that.options.$helpers).off(EVENT_NS);
    },

    /** This whole handler is needed to prevent blur event on textbox
     * when suggestion is clicked (blur leads to suggestions hide, so we need to prevent it).
     * See https://github.com/jquery/jquery-ui/blob/master/ui/autocomplete.js for details
     */
    onMousedown: function onMousedown(e) {
        var that = this;

        // prevent moving focus out of the text field
        e.preventDefault();

        // IE doesn't prevent moving focus even with e.preventDefault()
        // so we set a flag to know when we should ignore the blur event
        that.cancelBlur = true;
        utils.delay(function () {
            delete that.cancelBlur;
        });

        // clicking on the scrollbar causes focus to shift to the body
        // but we can't detect a mouseup or a click immediately afterward
        // so we have to track the next mousedown and close the menu if
        // the user clicks somewhere outside of the autocomplete
        if ($(e.target).closest(".ui-menu-item").length == 0) {
            utils.delay(function () {
                $(document).one("mousedown", function (e) {
                    var $elements = that.el.add(that.$wrapper).add(that.options.$helpers);

                    if (that.options.floating) {
                        $elements = $elements.add(that.$container);
                    }

                    $elements = $elements.filter(function () {
                        return this === e.target || $.contains(this, e.target);
                    });

                    if (!$elements.length) {
                        that.hide();
                    }
                });
            });
        }
    },

    bindWindowEvents: function bindWindowEvents() {
        var that = this,
            handler = $.proxy(that.fixPosition, that);

        that.$viewport.on('resize' + EVENT_NS + that.uniqueId, handler).on('scroll' + EVENT_NS + that.uniqueId, handler);
    },

    unbindWindowEvents: function unbindWindowEvents() {
        this.$viewport.off('resize' + EVENT_NS + this.uniqueId).off('scroll' + EVENT_NS + this.uniqueId);
    },

    scrollToTop: function scrollToTop() {
        var that = this,
            scrollTarget = that.options.scrollOnFocus;

        if (scrollTarget === true) {
            scrollTarget = that.el;
        }
        if (scrollTarget instanceof $ && scrollTarget.length > 0) {
            $('body,html').animate({
                scrollTop: scrollTarget.offset().top
            }, 'fast');
        }
    },

    // Configuration methods

    setOptions: function setOptions(suppliedOptions) {
        var that = this;

        $.extend(that.options, suppliedOptions);

        // Check mandatory options
        $.each({
            'type': types,
            'requestMode': requestModes
        }, function (option, available) {
            that[option] = available[that.options[option]];
            if (!that[option]) {
                that.disable();
                throw '`' + option + '` option is incorrect! Must be one of: ' + $.map(available, function (value, name) {
                    return '"' + name + '"';
                }).join(', ');
            }
        });

        $(that.options.$helpers).off(EVENT_NS).on('mousedown' + EVENT_NS, $.proxy(that.onMousedown, that));

        if (that.isInitialized()) {
            that.notify('setOptions');
        }
    },

    // Common public methods

    fixPosition: function fixPosition(e) {
        var that = this,
            elLayout = {},
            wrapperOffset,
            origin;

        that.isMobile = that.$viewport.width() <= that.options.mobileWidth;

        if (!that.isInitialized() || e && e.type == 'scroll' && !(that.options.floating || that.isMobile)) return;
        that.$container.appendTo(that.options.floating ? that.$body : that.$wrapper);

        that.notify('resetPosition');
        // reset input's padding to default, determined by css
        that.el.css('paddingLeft', '');
        that.el.css('paddingRight', '');
        elLayout.paddingLeft = parseFloat(that.el.css('paddingLeft'));
        elLayout.paddingRight = parseFloat(that.el.css('paddingRight'));

        $.extend(elLayout, that.el.offset());
        elLayout.borderTop = that.el.css('border-top-style') == 'none' ? 0 : parseFloat(that.el.css('border-top-width'));
        elLayout.borderLeft = that.el.css('border-left-style') == 'none' ? 0 : parseFloat(that.el.css('border-left-width'));
        elLayout.innerHeight = that.el.innerHeight();
        elLayout.innerWidth = that.el.innerWidth();
        elLayout.outerHeight = that.el.outerHeight();
        elLayout.componentsLeft = 0;
        elLayout.componentsRight = 0;
        wrapperOffset = that.$wrapper.offset();

        origin = {
            top: elLayout.top - wrapperOffset.top,
            left: elLayout.left - wrapperOffset.left
        };

        that.notify('fixPosition', origin, elLayout);

        if (elLayout.componentsLeft > elLayout.paddingLeft) {
            that.el.css('paddingLeft', elLayout.componentsLeft + 'px');
        }
        if (elLayout.componentsRight > elLayout.paddingRight) {
            that.el.css('paddingRight', elLayout.componentsRight + 'px');
        }
    },

    clearCache: function clearCache() {
        this.cachedResponse = {};
        this.enrichmentCache = {};
        this.badQueries = [];
    },

    clear: function clear() {
        var that = this;

        if (that.isInitialized()) {
            that.clearCache();
            that.currentValue = '';
            that.selection = null;
            that.hide();
            that.suggestions = [];
            that.el.val('');
            that.el.trigger('suggestions-clear');
            that.notify('clear');
        }
    },

    disable: function disable() {
        var that = this;

        that.disabled = true;
        that.abortRequest();
        if (that.visible) {
            that.hide();
        }
    },

    enable: function enable() {
        this.disabled = false;
    },

    isUnavailable: function isUnavailable() {
        return this.disabled;
    },

    update: function update() {
        var that = this,
            query = that.el.val();

        if (that.isInitialized()) {
            that.currentValue = query;
            if (that.isQueryRequestable(query)) {
                that.updateSuggestions(query);
            } else {
                that.hide();
            }
        }
    },

    setSuggestion: function setSuggestion(suggestion) {
        var that = this,
            data,
            value;

        if ($.isPlainObject(suggestion) && $.isPlainObject(suggestion.data)) {
            suggestion = $.extend(true, {}, suggestion);

            if (that.bounds.own.length) {
                that.checkValueBounds(suggestion);
                data = that.copyDataComponents(suggestion.data, that.bounds.all);
                if (suggestion.data.kladr_id) {
                    data.kladr_id = that.getBoundedKladrId(suggestion.data.kladr_id, that.bounds.all);
                }
                suggestion.data = data;
            }

            that.selection = suggestion;

            // `that.suggestions` required by `that.getSuggestionValue` and must be set before
            that.suggestions = [suggestion];
            value = that.getSuggestionValue(suggestion) || '';
            that.currentValue = value;
            that.el.val(value);
            that.abortRequest();
            that.el.trigger('suggestions-set');
        }
    },

    /**
     * Fetch full object for current INPUT's value
     * if no suitable object found, clean input element
     */
    fixData: function fixData() {
        var that = this,
            fullQuery = that.extendedCurrentValue(),
            currentValue = that.el.val(),
            resolver = $.Deferred();

        resolver.done(function (suggestion) {
            that.selectSuggestion(suggestion, 0, currentValue, { hasBeenEnriched: true });
            that.el.trigger('suggestions-fixdata', suggestion);
        }).fail(function () {
            that.selection = null;
            that.currentValue = '';
            that.el.val(that.currentValue);
            that.el.trigger('suggestions-fixdata');
        });

        if (that.isQueryRequestable(fullQuery)) {
            that.currentValue = fullQuery;
            that.getSuggestions(fullQuery, { count: 1, from_bound: null, to_bound: null }).done(function (suggestions) {
                // data fetched
                var suggestion = suggestions[0];
                if (suggestion) {
                    resolver.resolve(suggestion);
                } else {
                    resolver.reject();
                }
            }).fail(function () {
                // no data fetched
                resolver.reject();
            });
        } else {
            resolver.reject();
        }
    },

    // Querying related methods

    /**
     * Looks up parent instances
     * @returns {String} current value prepended by parents' values
     */
    extendedCurrentValue: function extendedCurrentValue() {
        var that = this,
            parentInstance = that.getParentInstance(),
            parentValue = parentInstance && parentInstance.extendedCurrentValue(),
            currentValue = $.trim(that.el.val());

        return utils.compact([parentValue, currentValue]).join(' ');
    },

    getAjaxParams: function getAjaxParams(method, custom) {
        var that = this,
            token = $.trim(that.options.token),
            partner = $.trim(that.options.partner),
            serviceUrl = that.options.serviceUrl,
            url = that.options.url,
            serviceMethod = serviceMethods[method],
            params = $.extend({
            timeout: that.options.timeout
        }, serviceMethod.defaultParams),
            headers = {};

        if (url) {
            serviceUrl = url;
        } else {
            if (!/\/$/.test(serviceUrl)) {
                serviceUrl += '/';
            }
            serviceUrl += method;
            if (serviceMethod.addTypeInUrl) {
                serviceUrl += '/' + that.type.urlSuffix;
            }
        }

        serviceUrl = utils.fixURLProtocol(serviceUrl);

        if ($.support.cors) {
            // for XMLHttpRequest put token in header
            if (token) {
                headers['Authorization'] = 'Token ' + token;
            }
            if (partner) {
                headers['X-Partner'] = partner;
            }
            headers['X-Version'] = Suggestions.version;
            if (!params.headers) {
                params.headers = {};
            }
            $.extend(params.headers, that.options.headers, headers);
        } else {
            // for XDomainRequest put token into URL
            if (token) {
                headers['token'] = token;
            }
            if (partner) {
                headers['partner'] = partner;
            }
            headers['version'] = Suggestions.version;
            serviceUrl = utils.addUrlParams(serviceUrl, headers);
        }

        params.url = serviceUrl;

        return $.extend(params, custom);
    },

    isQueryRequestable: function isQueryRequestable(query) {
        var that = this,
            result;

        result = query.length >= that.options.minChars;

        if (result && that.type.isQueryRequestable) {
            result = that.type.isQueryRequestable.call(that, query);
        }

        return result;
    },

    constructRequestParams: function constructRequestParams(query, customParams) {
        var that = this,
            options = that.options,
            params = $.isFunction(options.params) ? options.params.call(that.element, query) : $.extend({}, options.params);

        if (that.type.constructRequestParams) {
            $.extend(params, that.type.constructRequestParams.call(that));
        }
        $.each(that.notify('requestParams'), function (i, hookParams) {
            $.extend(params, hookParams);
        });
        params[options.paramName] = query;
        if ($.isNumeric(options.count) && options.count > 0) {
            params.count = options.count;
        }

        return $.extend(params, customParams);
    },

    updateSuggestions: function updateSuggestions(query) {
        var that = this;

        that.fetchPhase = that.getSuggestions(query).done(function (suggestions) {
            that.assignSuggestions(suggestions, query);
        });
    },

    /**
     * Get suggestions from cache or from server
     * @param {String} query
     * @param {Object} customParams parameters specified here will be passed to request body
     * @param {Object} requestOptions
     * @param {Boolean} [requestOptions.noCallbacks]  flag, request competence callbacks will not be invoked
     * @param {Boolean} [requestOptions.useEnrichmentCache]
     * @return {$.Deferred} waiter which is to be resolved with suggestions as argument
     */
    getSuggestions: function getSuggestions(query, customParams, requestOptions) {
        var response,
            that = this,
            options = that.options,
            noCallbacks = requestOptions && requestOptions.noCallbacks,
            useEnrichmentCache = requestOptions && requestOptions.useEnrichmentCache,
            params = that.constructRequestParams(query, customParams),
            cacheKey = $.param(params || {}),
            resolver = $.Deferred();

        response = that.cachedResponse[cacheKey];
        if (response && $.isArray(response.suggestions)) {
            resolver.resolve(response.suggestions);
        } else {
            if (that.isBadQuery(query)) {
                resolver.reject();
            } else {
                if (!noCallbacks && options.onSearchStart.call(that.element, params) === false) {
                    resolver.reject();
                } else {
                    that.doGetSuggestions(params).done(function (response) {
                        // if response is correct and current value has not been changed
                        if (that.processResponse(response) && query == that.currentValue) {

                            // Cache results if cache is not disabled:
                            if (!options.noCache) {
                                if (useEnrichmentCache) {
                                    that.enrichmentCache[query] = response.suggestions[0];
                                } else {
                                    that.enrichResponse(response, query);
                                    that.cachedResponse[cacheKey] = response;
                                    if (options.preventBadQueries && response.suggestions.length === 0) {
                                        that.badQueries.push(query);
                                    }
                                }
                            }

                            resolver.resolve(response.suggestions);
                        } else {
                            resolver.reject();
                        }
                        if (!noCallbacks) {
                            options.onSearchComplete.call(that.element, query, response.suggestions);
                        }
                    }).fail(function (jqXHR, textStatus, errorThrown) {
                        resolver.reject();
                        if (!noCallbacks && textStatus !== 'abort') {
                            options.onSearchError.call(that.element, query, jqXHR, textStatus, errorThrown);
                        }
                    });
                }
            }
        }
        return resolver;
    },

    /**
     * Sends an AJAX request to server suggest method.
     * @param {Object} params request params
     * @returns {$.Deferred} response promise
     */
    doGetSuggestions: function doGetSuggestions(params) {
        var that = this,
            request = $.ajax(that.getAjaxParams(that.requestMode.method, { data: utils.serialize(params) }));

        that.abortRequest();
        that.currentRequest = request;
        that.notify('request');

        request.always(function () {
            that.currentRequest = null;
            that.notify('request');
        });

        return request;
    },

    isBadQuery: function isBadQuery(q) {
        if (!this.options.preventBadQueries) {
            return false;
        }

        var result = false;
        $.each(this.badQueries, function (i, query) {
            return !(result = q.indexOf(query) === 0);
        });
        return result;
    },

    abortRequest: function abortRequest() {
        var that = this;

        if (that.currentRequest) {
            that.currentRequest.abort();
        }
    },

    /**
     * Checks response format and data
     * @return {Boolean} response contains acceptable data
     */
    processResponse: function processResponse(response) {
        var that = this,
            suggestions;

        if (!response || !$.isArray(response.suggestions)) {
            return false;
        }

        that.verifySuggestionsFormat(response.suggestions);
        that.setUnrestrictedValues(response.suggestions);

        if ($.isFunction(that.options.onSuggestionsFetch)) {
            suggestions = that.options.onSuggestionsFetch.call(that.element, response.suggestions);
            if ($.isArray(suggestions)) {
                response.suggestions = suggestions;
            }
        }

        return true;
    },

    verifySuggestionsFormat: function verifySuggestionsFormat(suggestions) {
        if (typeof suggestions[0] === 'string') {
            $.each(suggestions, function (i, value) {
                suggestions[i] = { value: value, data: null };
            });
        }
    },

    /**
     * Gets string to set as input value
     *
     * @param suggestion
     * @param {Object} [selectionOptions]
     * @param {boolean} selectionOptions.hasBeenEnriched
     * @param {boolean} selectionOptions.hasSameValues
     * @return {string}
     */
    getSuggestionValue: function getSuggestionValue(suggestion, selectionOptions) {
        var that = this,
            formatSelected = that.options.formatSelected || that.type.formatSelected,
            hasSameValues = selectionOptions && selectionOptions.hasSameValues,
            hasBeenEnriched = selectionOptions && selectionOptions.hasBeenEnriched,
            formattedValue,
            typeFormattedValue = null;

        if ($.isFunction(formatSelected)) {
            formattedValue = formatSelected.call(that, suggestion);
        }

        if (typeof formattedValue !== 'string') {
            formattedValue = suggestion.value;

            if (that.type.getSuggestionValue) {
                typeFormattedValue = that.type.getSuggestionValue(that, {
                    suggestion: suggestion,
                    hasSameValues: hasSameValues,
                    hasBeenEnriched: hasBeenEnriched
                });

                if (typeFormattedValue !== null) {
                    formattedValue = typeFormattedValue;
                }
            }
        }

        return formattedValue;
    },

    hasSameValues: function hasSameValues(suggestion) {
        var hasSame = false;

        $.each(this.suggestions, function (i, anotherSuggestion) {
            if (anotherSuggestion.value === suggestion.value && anotherSuggestion !== suggestion) {
                hasSame = true;
                return false;
            }
        });

        return hasSame;
    },

    assignSuggestions: function assignSuggestions(suggestions, query) {
        var that = this;
        that.suggestions = suggestions;
        that.notify('assignSuggestions', query);
    },

    shouldRestrictValues: function shouldRestrictValues() {
        var that = this;
        // treat suggestions value as restricted only if there is one constraint
        // and restrict_value is true
        return that.options.restrict_value && that.constraints && _Object$keys(that.constraints).length == 1;
    },

    /**
     * Fills suggestion.unrestricted_value property
     */
    setUnrestrictedValues: function setUnrestrictedValues(suggestions) {
        var that = this,
            shouldRestrict = that.shouldRestrictValues(),
            label = that.getFirstConstraintLabel();

        $.each(suggestions, function (i, suggestion) {
            if (!suggestion.unrestricted_value) {
                suggestion.unrestricted_value = shouldRestrict ? label + ', ' + suggestion.value : suggestion.value;
            }
        });
    },

    areSuggestionsSame: function areSuggestionsSame(a, b) {
        return a && b && a.value === b.value && utils.areSame(a.data, b.data);
    }

};

// 19.1.2.1 Object.assign(target, source, ...)
var $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
var _objectAssign = !$assign || _fails(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = _toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = _objectGops.f
    , isEnum     = _objectPie.f;
  while(aLen > index){
    var S      = _iobject(arguments[index++])
      , keys   = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;

// 19.1.3.1 Object.assign(target, source)


_export(_export.S + _export.F, 'Object', {assign: _objectAssign});

var assign$1 = _core.Object.assign;

var assign = createCommonjsModule(function (module) {
module.exports = { "default": assign$1, __esModule: true };
});

var _Object$assign = unwrapExports(assign);

// getting tag from 19.1.3.6 Object.prototype.toString()
var TAG$1 = _wks('toStringTag');
var ARG = _cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

var _classof = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T
    // builtinTag case
    : ARG ? _cof(O)
    // ES3 arguments fallback
    : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

var _anInstance = function(it, Constructor, name, forbiddenField){
  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

// call something on iterator step with safe closing on error

var _iterCall = function(iterator, fn, value, entries){
  try {
    return entries ? fn(_anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)_anObject(ret.call(iterator));
    throw e;
  }
};

// check on default Array iterator
var ITERATOR$1   = _wks('iterator');
var ArrayProto = Array.prototype;

var _isArrayIter = function(it){
  return it !== undefined && (_iterators.Array === it || ArrayProto[ITERATOR$1] === it);
};

var ITERATOR$2  = _wks('iterator');
var core_getIteratorMethod = _core.getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR$2]
    || it['@@iterator']
    || _iterators[_classof(it)];
};

var _forOf = createCommonjsModule(function (module) {
var BREAK       = {}
  , RETURN      = {};
var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
  var iterFn = ITERATOR ? function(){ return iterable; } : core_getIteratorMethod(iterable)
    , f      = _ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator, result;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(_isArrayIter(iterFn))for(length = _toLength(iterable.length); length > index; index++){
    result = entries ? f(_anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if(result === BREAK || result === RETURN)return result;
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    result = _iterCall(iterator, f, step.value, entries);
    if(result === BREAK || result === RETURN)return result;
  }
};
exports.BREAK  = BREAK;
exports.RETURN = RETURN;
});

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var SPECIES   = _wks('species');
var _speciesConstructor = function(O, D){
  var C = _anObject(O).constructor, S;
  return C === undefined || (S = _anObject(C)[SPECIES]) == undefined ? D : _aFunction(S);
};

// fast apply, http://jsperf.lnkit.com/fast-apply/5
var _invoke = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return              fn.apply(that, args);
};

var process$1            = _global.process;
var setTask            = _global.setImmediate;
var clearTask          = _global.clearImmediate;
var MessageChannel     = _global.MessageChannel;
var counter            = 0;
var queue              = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer;
var channel;
var port;
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function(event){
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      _invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(_cof(process$1) == 'process'){
    defer = function(id){
      process$1.nextTick(_ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listener;
    defer = _ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(_global.addEventListener && typeof postMessage == 'function' && !_global.importScripts){
    defer = function(id){
      _global.postMessage(id + '', '*');
    };
    _global.addEventListener('message', listener, false);
  // IE8-
  } else if(ONREADYSTATECHANGE in _domCreate('script')){
    defer = function(id){
      _html.appendChild(_domCreate('script'))[ONREADYSTATECHANGE] = function(){
        _html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(_ctx(run, id, 1), 0);
    };
  }
}
var _task = {
  set:   setTask,
  clear: clearTask
};

var macrotask = _task.set;
var Observer  = _global.MutationObserver || _global.WebKitMutationObserver;
var process$2   = _global.process;
var Promise   = _global.Promise;
var isNode$1    = _cof(process$2) == 'process';

var _microtask = function(){
  var head, last, notify;

  var flush = function(){
    var parent, fn;
    if(isNode$1 && (parent = process$2.domain))parent.exit();
    while(head){
      fn   = head.fn;
      head = head.next;
      try {
        fn();
      } catch(e){
        if(head)notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if(parent)parent.enter();
  };

  // Node.js
  if(isNode$1){
    notify = function(){
      process$2.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if(Observer){
    var toggle = true
      , node   = document.createTextNode('');
    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
    notify = function(){
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if(Promise && Promise.resolve){
    var promise = Promise.resolve();
    notify = function(){
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function(){
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(_global, flush);
    };
  }

  return function(fn){
    var task = {fn: fn, next: undefined};
    if(last)last.next = task;
    if(!head){
      head = task;
      notify();
    } last = task;
  };
};

var _redefineAll = function(target, src, safe){
  for(var key in src){
    if(safe && target[key])target[key] = src[key];
    else _hide(target, key, src[key]);
  } return target;
};

var SPECIES$1     = _wks('species');

var _setSpecies = function(KEY){
  var C = typeof _core[KEY] == 'function' ? _core[KEY] : _global[KEY];
  if(_descriptors && C && !C[SPECIES$1])_objectDp.f(C, SPECIES$1, {
    configurable: true,
    get: function(){ return this; }
  });
};

var ITERATOR$3     = _wks('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR$3]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

var _iterDetect = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR$3]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR$3] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};

var task               = _task.set;
var microtask          = _microtask();
var PROMISE            = 'Promise';
var TypeError$1          = _global.TypeError;
var process            = _global.process;
var $Promise           = _global[PROMISE];
var process            = _global.process;
var isNode             = _classof(process) == 'process';
var empty              = function(){ /* empty */ };
var Internal;
var GenericPromiseCapability;
var Wrapper;

var USE_NATIVE$1 = !!function(){
  try {
    // correct subclassing with @@species support
    var promise     = $Promise.resolve(1)
      , FakePromise = (promise.constructor = {})[_wks('species')] = function(exec){ exec(empty, empty); };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch(e){ /* empty */ }
}();

// helpers
var sameConstructor = function(a, b){
  // with library wrapper special case
  return a === b || a === $Promise && b === Wrapper;
};
var isThenable = function(it){
  var then;
  return _isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var newPromiseCapability = function(C){
  return sameConstructor($Promise, C)
    ? new PromiseCapability(C)
    : new GenericPromiseCapability(C);
};
var PromiseCapability = GenericPromiseCapability = function(C){
  var resolve, reject;
  this.promise = new C(function($$resolve, $$reject){
    if(resolve !== undefined || reject !== undefined)throw TypeError$1('Bad Promise constructor');
    resolve = $$resolve;
    reject  = $$reject;
  });
  this.resolve = _aFunction(resolve);
  this.reject  = _aFunction(reject);
};
var perform = function(exec){
  try {
    exec();
  } catch(e){
    return {error: e};
  }
};
var notify = function(promise, isReject){
  if(promise._n)return;
  promise._n = true;
  var chain = promise._c;
  microtask(function(){
    var value = promise._v
      , ok    = promise._s == 1
      , i     = 0;
    var run = function(reaction){
      var handler = ok ? reaction.ok : reaction.fail
        , resolve = reaction.resolve
        , reject  = reaction.reject
        , domain  = reaction.domain
        , result, then;
      try {
        if(handler){
          if(!ok){
            if(promise._h == 2)onHandleUnhandled(promise);
            promise._h = 1;
          }
          if(handler === true)result = value;
          else {
            if(domain)domain.enter();
            result = handler(value);
            if(domain)domain.exit();
          }
          if(result === reaction.promise){
            reject(TypeError$1('Promise-chain cycle'));
          } else if(then = isThenable(result)){
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch(e){
        reject(e);
      }
    };
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if(isReject && !promise._h)onUnhandled(promise);
  });
};
var onUnhandled = function(promise){
  task.call(_global, function(){
    var value = promise._v
      , abrupt, handler, console;
    if(isUnhandled(promise)){
      abrupt = perform(function(){
        if(isNode){
          process.emit('unhandledRejection', value, promise);
        } else if(handler = _global.onunhandledrejection){
          handler({promise: promise, reason: value});
        } else if((console = _global.console) && console.error){
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if(abrupt)throw abrupt.error;
  });
};
var isUnhandled = function(promise){
  if(promise._h == 1)return false;
  var chain = promise._a || promise._c
    , i     = 0
    , reaction;
  while(chain.length > i){
    reaction = chain[i++];
    if(reaction.fail || !isUnhandled(reaction.promise))return false;
  } return true;
};
var onHandleUnhandled = function(promise){
  task.call(_global, function(){
    var handler;
    if(isNode){
      process.emit('rejectionHandled', promise);
    } else if(handler = _global.onrejectionhandled){
      handler({promise: promise, reason: promise._v});
    }
  });
};
var $reject = function(value){
  var promise = this;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if(!promise._a)promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function(value){
  var promise = this
    , then;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if(promise === value)throw TypeError$1("Promise can't be resolved itself");
    if(then = isThenable(value)){
      microtask(function(){
        var wrapper = {_w: promise, _d: false}; // wrap
        try {
          then.call(value, _ctx($resolve, wrapper, 1), _ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch(e){
    $reject.call({_w: promise, _d: false}, e); // wrap
  }
};

// constructor polyfill
if(!USE_NATIVE$1){
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor){
    _anInstance(this, $Promise, PROMISE, '_h');
    _aFunction(executor);
    Internal.call(this);
    try {
      executor(_ctx($resolve, this, 1), _ctx($reject, this, 1));
    } catch(err){
      $reject.call(this, err);
    }
  };
  Internal = function Promise(executor){
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = _redefineAll($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var reaction    = newPromiseCapability(_speciesConstructor(this, $Promise));
      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail   = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if(this._a)this._a.push(reaction);
      if(this._s)notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
  PromiseCapability = function(){
    var promise  = new Internal;
    this.promise = promise;
    this.resolve = _ctx($resolve, promise, 1);
    this.reject  = _ctx($reject, promise, 1);
  };
}

_export(_export.G + _export.W + _export.F * !USE_NATIVE$1, {Promise: $Promise});
_setToStringTag($Promise, PROMISE);
_setSpecies(PROMISE);
Wrapper = _core[PROMISE];

// statics
_export(_export.S + _export.F * !USE_NATIVE$1, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    var capability = newPromiseCapability(this)
      , $$reject   = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
_export(_export.S + _export.F * (_library || !USE_NATIVE$1), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
    var capability = newPromiseCapability(this)
      , $$resolve  = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
_export(_export.S + _export.F * !(USE_NATIVE$1 && _iterDetect(function(iter){
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , resolve    = capability.resolve
      , reject     = capability.reject;
    var abrupt = perform(function(){
      var values    = []
        , index     = 0
        , remaining = 1;
      _forOf(iterable, false, function(promise){
        var $index        = index++
          , alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function(value){
          if(alreadyCalled)return;
          alreadyCalled  = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , reject     = capability.reject;
    var abrupt = perform(function(){
      _forOf(iterable, false, function(promise){
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  }
});

var promise$1 = _core.Promise;

var promise = createCommonjsModule(function (module) {
module.exports = { "default": promise$1, __esModule: true };
});

var _Promise = unwrapExports(promise);

var eventsByNamespace = {};

var dom = {

    addClass: function addClass(element, className) {
        var list = element.className.split(' ');
        if (list.indexOf(className) === -1) {
            list.push(className);
        }
        element.className = list.join(' ');
    },

    setStyle: function setStyle(element, name, value) {
        element.style[name] = value;
    },

    listen: function listen(element, eventName, namespace, callback) {
        element.addEventListener(eventName, callback, false);
        if (namespace) {
            if (!eventsByNamespace[namespace]) {
                eventsByNamespace[namespace] = [];
            }
            eventsByNamespace[namespace].push({
                eventName: eventName,
                element: element,
                callback: callback
            });
        }
    },

    stopListenByNamespace: function stopListenByNamespace(namespace) {
        var events = eventsByNamespace[namespace];
        if (events) {
            for (var eventIndex in events) {
                //console.log('EVENT ' + eventIndex);
                var event = events[eventIndex];
                event.element.removeEventListener(event.eventName, event.callback, false);
            }
        }
    },

    stopListen: function stopListen() {}

};

/**
 * Methods related to INPUT's behavior
 */

var methods = {

    setupElement: function setupElement() {
        // Remove autocomplete attribute to prevent native suggestions:
        this.element.setAttribute('autocomplete', 'off');
        dom.addClass(this.element, 'suggestions-input');
        dom.setStyle(this.element, 'boxSizing', 'border-box');
    },

    bindElementEvents: function bindElementEvents() {
        dom.listen(this.element, 'keydown', EVENT_NS, this.onElementKeyDown.bind(this));
        // IE is buggy, it doesn't trigger `input` on text deletion, so use following events
        dom.listen(this.element, 'keyup', EVENT_NS, this.onElementKeyUp.bind(this));
        dom.listen(this.element, 'cut', EVENT_NS, this.onElementKeyUp.bind(this));
        dom.listen(this.element, 'paste', EVENT_NS, this.onElementKeyUp.bind(this));
        dom.listen(this.element, 'input', EVENT_NS, this.onElementKeyUp.bind(this));
        dom.listen(this.element, 'blur', EVENT_NS, this.onElementBlur.bind(this));
        dom.listen(this.element, 'focus', EVENT_NS, this.onElementFocus.bind(this));
    },

    unbindElementEvents: function unbindElementEvents() {
        dom.stopListenByNamespace(EVENT_NS);
    },

    onElementBlur: function onElementBlur() {
        var _this = this;

        // suggestion was clicked, blur should be ignored
        // see container mousedown handler
        if (this.cancelBlur) {
            this.cancelBlur = false;
            return;
        }

        if (this.options.triggerSelectOnBlur) {
            if (!this.isUnavailable()) {
                this.selectCurrentValue({ noSpace: true }).always(function () {
                    // For NAMEs selecting keeps suggestions list visible, so hide it
                    _this.hide();
                });
            }
        } else {
            this.hide();
        }

        if (this.fetchPhase.abort) {
            this.fetchPhase.abort();
        }
    },

    onElementFocus: function onElementFocus() {
        if (!this.cancelFocus) {
            // defer methods to allow browser update input's style before
            utils.delay(this.completeOnFocus.bind(this));
        }
        this.cancelFocus = false;
    },

    onElementKeyDown: function onElementKeyDown(e) {
        var _this2 = this;

        if (this.isUnavailable()) {
            return;
        }

        if (!this.visible) {
            switch (e.key) {
                // If suggestions are hidden and user presses arrow down, display suggestions
                case KEYS$1.DOWN:
                    this.suggest();
                    break;
                // if no suggestions available and user pressed Enter
                case KEYS$1.ENTER:
                    if (this.options.triggerSelectOnEnter) {
                        this.triggerOnSelectNothing();
                    }
                    break;
            }
            return;
        }

        switch (e.key) {
            case KEYS$1.ESC:
                this.el.val(this.currentValue);
                this.hide();
                this.abortRequest();
                break;

            case KEYS$1.TAB:
                if (this.options.tabDisabled === false) {
                    return;
                }
                break;

            case KEYS$1.ENTER:
                if (this.options.triggerSelectOnEnter) {
                    this.selectCurrentValue();
                }
                break;

            case KEYS$1.SPACE:
                if (this.options.triggerSelectOnSpace && this.isCursorAtEnd()) {
                    e.preventDefault();
                    this.selectCurrentValue({ continueSelecting: true, dontEnrich: true }).fail(function () {
                        // If all data fetched but nothing selected
                        _this2.currentValue += ' ';
                        _this2.el.val(_this2.currentValue);
                        _this2.proceedChangedValue();
                    });
                }
                return;
            case KEYS$1.UP:
                this.moveUp();
                break;
            case KEYS$1.DOWN:
                this.moveDown();
                break;
            default:
                return;
        }

        // Cancel event if function did not return:
        e.stopImmediatePropagation();
        e.preventDefault();
    },

    onElementKeyUp: function onElementKeyUp(e) {
        if (this.isUnavailable()) {
            return;
        }

        switch (e.key) {
            case KEYS$1.UP:
            case KEYS$1.DOWN:
            case KEYS$1.ENTER:
                return;
        }

        // Cancel pending change
        clearTimeout(this.onChangeTimeout);
        this.inputPhaseReject();

        if (this.currentValue !== this.el.val()) {
            this.proceedChangedValue();
        }
    },

    proceedChangedValue: function proceedChangedValue() {
        var _this3 = this;

        // Cancel fetching, because it became obsolete
        this.abortRequest();

        this.inputPhase = new _Promise(function (resolve, reject) {
            _this3.inputPhaseResolve = resolve;
            _this3.inputPhaseReject = reject;
        }).then(this.onValueChange.bind(this), function () {});

        if (this.options.deferRequestBy > 0) {
            // Defer lookup in case when value changes very quickly:
            this.onChangeTimeout = utils.delay(function () {
                _this3.inputPhaseResolve();
            }, this.options.deferRequestBy);
        } else {
            this.inputPhaseResolve();
        }
    },

    onValueChange: function onValueChange() {
        var currentSelection = void 0;

        if (this.selection) {
            currentSelection = this.selection;
            this.selection = null;
            this.trigger('InvalidateSelection', currentSelection);
        }

        this.selectedIndex = -1;

        this.update();
        this.notify('valueChange');
    },

    completeOnFocus: function completeOnFocus() {
        if (this.isUnavailable()) {
            return;
        }

        if (this.isElementFocused()) {
            this.fixPosition();
            this.update();
            if (this.isMobile) {
                this.setCursorAtEnd();
                this.scrollToTop();
            }
        }
    },

    isElementFocused: function isElementFocused() {
        return document.activeElement === this.element;
    },

    isCursorAtEnd: function isCursorAtEnd() {
        var valLength = this.el.val().length,
            selectionStart = void 0,
            range = void 0;

        // `selectionStart` and `selectionEnd` are not supported by some input types
        try {
            selectionStart = this.element.selectionStart;
            if (typeof selectionStart === 'number') {
                return selectionStart === valLength;
            }
        } catch (ex) {}

        if (document.selection) {
            range = document.selection.createRange();
            range.moveStart('character', -valLength);
            return valLength === range.text.length;
        }
        return true;
    },

    setCursorAtEnd: function setCursorAtEnd() {
        var element = this.element;

        // `selectionStart` and `selectionEnd` are not supported by some input types
        try {
            element.selectionEnd = element.selectionStart = element.value.length;
            element.scrollLeft = element.scrollWidth;
        } catch (ex) {
            element.value = element.value;
        }
    }

};

_Object$assign(Suggestions.prototype, methods);

notificator.on('initialize', methods.bindElementEvents).on('dispose', methods.unbindElementEvents);

var ajax = {

    send: function send(params) {
        var xhr = void 0,
            resolve = void 0,
            reject = void 0,
            promise$$1 = void 0,
            timeoutTimer = void 0;

        promise$$1 = new _Promise(function (res, rej) {
            resolve = res;
            reject = rej;
        });

        if (window.ActiveXObject) {
            xhr = new ActiveXObject('Microsoft.XMLHTTP');
        } else if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        }

        if (xhr) {
            xhr.onreadystatechange = function () {
                var result = void 0;

                if (xhr.readyState === 4) {
                    window.clearTimeout(timeoutTimer);
                    if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                        var json = xhr.responseText;
                        try {
                            result = JSON.parse(json);
                        } catch (e) {}
                        resolve(result, xhr);
                    } else {
                        reject(xhr);
                    }
                }
            };

            if (params.type === 'GET') {
                xhr.open('GET', params.url, true);
            } else {
                xhr.open(params.type, params.url, true);
            }

            this.setHeaders(xhr, _Object$assign({
                'Content-type': 'application/json'
            }, params.headers));

            try {
                params.type === 'GET' ? xhr.send() : xhr.send();
            } catch (e) {
                reject();
            }

            if (params.timeout) {
                timeoutTimer = window.setTimeout(function () {
                    reject('timeout');
                }, params.timeout);
            }
        }

        promise$$1.xhr = xhr;

        return promise$$1;
    },

    get: function get(url) {
        return this.send('GET', url);
    },

    setHeaders: function setHeaders(xhr, headers) {
        utils.each(headers, function (value, name) {
            xhr.setRequestHeader(name, value);
        });
    }

};

/**
 * Methods related to plugin's authorization on server
 */

// keys are "[type][token]"
var statusRequests = {};

function resetTokens() {
    utils.each(statusRequests, function (request) {
        request.xhr.abort();
    });
    statusRequests = {};
}

resetTokens();

var methods$1 = {

    checkStatus: function checkStatus() {
        var that = this,
            token = that.options.token && that.options.token.trim(),
            requestKey = that.options.type + token,
            request = statusRequests[requestKey];

        if (!request) {
            request = statusRequests[requestKey] = ajax.send(that.getAjaxParams('status'));
        }

        request.then(function (status) {
            if (status.search) {
                _Object$assign(that.status, status);
            } else {
                triggerError('Service Unavailable');
            }
        }).catch(function (xhr) {
            triggerError(xhr.statusText);
        });

        function triggerError(errorThrown) {
            // If unauthorized
            if (utils.isFunction(that.options.onSearchError)) {
                that.options.onSearchError.call(that.element, null, request, 'error', errorThrown);
            }
        }
    }

};

Suggestions.resetTokens = resetTokens;

_Object$assign(Suggestions.prototype, methods$1);

notificator.on('setOptions', methods$1.checkStatus);

var locationRequest;
var defaultGeoLocation = true;

function resetLocation() {
    locationRequest = null;
    DEFAULT_OPTIONS.geoLocation = defaultGeoLocation;
}

var methods$2 = {

    checkLocation: function checkLocation() {
        var that = this,
            providedLocation = that.options.geoLocation;

        if (!that.type.geoEnabled || !providedLocation) {
            return;
        }

        that.geoLocation = $.Deferred();
        if ($.isPlainObject(providedLocation) || $.isArray(providedLocation)) {
            that.geoLocation.resolve(providedLocation);
        } else {
            if (!locationRequest) {
                locationRequest = $.ajax(that.getAjaxParams('detectAddressByIp'));
            }

            locationRequest.done(function (resp) {
                var locationData = resp && resp.location && resp.location.data;
                if (locationData && locationData.kladr_id) {
                    that.geoLocation.resolve(locationData);
                } else {
                    that.geoLocation.reject();
                }
            }).fail(function () {
                that.geoLocation.reject();
            });
        }
    },

    /**
     * Public method to get `geoLocation` promise
     * @returns {$.Deferred}
     */
    getGeoLocation: function getGeoLocation() {
        return this.geoLocation;
    },

    constructParams: function constructParams() {
        var that = this,
            params = {};

        if (that.geoLocation && $.isFunction(that.geoLocation.promise) && that.geoLocation.state() == 'resolved') {
            that.geoLocation.done(function (locationData) {
                params['locations_boost'] = $.makeArray(locationData);
            });
        }

        return params;
    }

};

// Disable this feature when GET method used. See SUG-202
if (utils.getDefaultType() != 'GET') {
    $.extend(DEFAULT_OPTIONS, {
        geoLocation: defaultGeoLocation
    });

    $.extend(Suggestions, {
        resetLocation: resetLocation
    });

    $.extend(Suggestions.prototype, {
        getGeoLocation: methods$2.getGeoLocation
    });

    notificator.on('setOptions', methods$2.checkLocation).on('requestParams', methods$2.constructParams);
}

var methods$3 = {

    enrichSuggestion: function enrichSuggestion(suggestion, selectionOptions) {
        var that = this,
            resolver = $.Deferred();

        if (!that.status.enrich || !that.type.enrichmentEnabled || !that.requestMode.enrichmentEnabled || selectionOptions && selectionOptions.dontEnrich) {
            return resolver.resolve(suggestion);
        }

        // if current suggestion is already enriched, use it
        if (suggestion.data && suggestion.data.qc != null) {
            return resolver.resolve(suggestion);
        }

        that.disableDropdown();

        // Set `currentValue` to make `processResponse` to consider enrichment response valid
        that.currentValue = suggestion.unrestricted_value;

        // prevent request abortion during onBlur
        that.enrichPhase = that.getSuggestions(suggestion.unrestricted_value, {
            count: 1,
            locations: null,
            locations_boost: null,
            from_bound: null,
            to_bound: null
        }, {
            noCallbacks: true,
            useEnrichmentCache: true
        }).always(function () {
            that.enableDropdown();
        }).done(function (suggestions) {
            var enrichedSuggestion = suggestions && suggestions[0];

            resolver.resolve(enrichedSuggestion || suggestion, !!enrichedSuggestion);
        }).fail(function () {
            resolver.resolve(suggestion);
        });

        return resolver;
    },

    /**
     * Injects enriched suggestion into response
     * @param response
     * @param query
     */
    enrichResponse: function enrichResponse(response, query) {
        var that = this,
            enrichedSuggestion = that.enrichmentCache[query];

        if (enrichedSuggestion) {
            $.each(response.suggestions, function (i, suggestion) {
                if (suggestion.value === query) {
                    response.suggestions[i] = enrichedSuggestion;
                    return false;
                }
            });
        }
    }

};

$.extend(Suggestions.prototype, methods$3);

/**
 * Methods related to suggestions dropdown list
 */

function _highlightMatches(chunks) {
    return $.map(chunks, function (chunk) {
        var text = utils.escapeHtml(chunk.text);

        if (text && chunk.matched) {
            text = '<strong>' + text + '</strong>';
        }
        return text;
    }).join('');
}

function nowrapLinkedParts(formattedStr, nowrapClass) {
    var delimitedParts = formattedStr.split(', ');
    // string has no delimiters, should not wrap
    if (delimitedParts.length === 1) {
        return formattedStr;
    }
    // disable word-wrap inside delimited parts
    return $.map(delimitedParts, function (part) {
        return '<span class="' + nowrapClass + '">' + part + '</span>';
    }).join(', ');
}

function hasAnotherSuggestion(suggestions, suggestion) {
    var result = false;

    $.each(suggestions, function (i, s) {
        result = s.value == suggestion.value && s != suggestion;
        if (result) {
            return false;
        }
    });

    return result;
}

var optionsUsed = {
    width: 'auto',
    floating: false
};

var methods$4 = {

    createContainer: function createContainer() {
        var that = this,
            suggestionSelector = '.' + that.classes.suggestion,
            options = that.options,
            $container = $('<div/>').addClass(options.containerClass).css({
            position: 'absolute',
            display: 'none'
        });

        that.$container = $container;

        $container.on('click' + EVENT_NS, suggestionSelector, $.proxy(that.onSuggestionClick, that));
    },

    removeContainer: function removeContainer() {
        var that = this;

        if (that.options.floating) {
            that.$container.remove();
        }
    },

    setContainerOptions: function setContainerOptions() {
        var that = this,
            mousedownEvent = 'mousedown' + EVENT_NS;

        that.$container.off(mousedownEvent);
        if (that.options.floating) {
            that.$container.on(mousedownEvent, $.proxy(that.onMousedown, that));
        }
    },

    /**
     * Listen for click event on suggestions list:
     */
    onSuggestionClick: function onSuggestionClick(e) {
        var that = this,
            $el = $(e.target),
            index;

        if (!that.dropdownDisabled) {
            that.cancelFocus = true;
            that.el.focus();

            while ($el.length && !(index = $el.attr('data-index'))) {
                $el = $el.closest('.' + that.classes.suggestion);
            }

            if (index && !isNaN(index)) {
                that.select(+index);
            }
        }
    },

    // Dropdown UI methods

    setDropdownPosition: function setDropdownPosition(origin, elLayout) {
        var that = this,
            scrollLeft = that.$viewport.scrollLeft(),
            style;

        if (that.isMobile) {
            style = that.options.floating ? {
                left: scrollLeft + 'px',
                top: elLayout.top + elLayout.outerHeight + 'px'
            } : {
                left: origin.left - elLayout.left + scrollLeft + 'px',
                top: origin.top + elLayout.outerHeight + 'px'
            };
            style.width = that.$viewport.width() + 'px';
        } else {
            style = that.options.floating ? {
                left: elLayout.left + 'px',
                top: elLayout.top + elLayout.borderTop + elLayout.innerHeight + 'px'
            } : {
                left: origin.left + 'px',
                top: origin.top + elLayout.borderTop + elLayout.innerHeight + 'px'
            };

            // Defer to let body show scrollbars
            utils.delay(function () {
                var width = that.options.width;

                if (width === 'auto') {
                    width = that.el.outerWidth();
                }
                that.$container.outerWidth(width);
            });
        }

        that.$container.toggleClass(that.classes.mobile, that.isMobile).css(style);

        that.containerItemsPadding = elLayout.left + elLayout.borderLeft + elLayout.paddingLeft - scrollLeft;
    },

    setItemsPositions: function setItemsPositions() {
        var that = this,
            $items = that.getSuggestionsItems();

        $items.css('paddingLeft', that.isMobile ? that.containerItemsPadding + 'px' : '');
    },

    getSuggestionsItems: function getSuggestionsItems() {
        return this.$container.children('.' + this.classes.suggestion);
    },

    toggleDropdownEnabling: function toggleDropdownEnabling(enable) {
        this.dropdownDisabled = !enable;
        this.$container.attr('disabled', !enable);
    },

    disableDropdown: function disableDropdown() {
        this.toggleDropdownEnabling(false);
    },

    enableDropdown: function enableDropdown() {
        this.toggleDropdownEnabling(true);
    },

    /**
     * Shows if there are any suggestions besides currently selected
     * @returns {boolean}
     */
    hasSuggestionsToChoose: function hasSuggestionsToChoose() {
        var that = this;

        return that.suggestions.length > 1 || that.suggestions.length === 1 && (!that.selection || $.trim(that.suggestions[0].value) !== $.trim(that.selection.value));
    },

    suggest: function suggest() {
        var that = this,
            options = that.options,
            formatResult,
            html = [];

        if (!that.requestMode.userSelect) {
            return;
        }

        // если нечего показывать, то сообщаем об этом
        if (!that.hasSuggestionsToChoose()) {

            if (that.suggestions.length) {
                that.hide();
                return;
            } else {
                html.push('<div class="' + that.classes.hint + '">' + options.noSuggestionsHint[options.type] + '</div>');
            }
        } else {

            formatResult = options.formatResult || that.type.formatResult || that.formatResult;

            // Build hint html
            if (!that.isMobile && options.hint && that.suggestions.length) {
                html.push('<div class="' + that.classes.hint + '">' + options.hint + '</div>');
            }
            that.selectedIndex = -1;
            // Build suggestions inner HTML:
            $.each(that.suggestions, function (i, suggestion) {
                var labels = that.makeSuggestionLabel(that.suggestions, suggestion);

                if (suggestion == that.selection) {
                    that.selectedIndex = i;
                }

                html.push('<div class="' + that.classes.suggestion + '" data-index="' + i + '">');
                html.push(formatResult.call(that, suggestion.value, that.currentValue, suggestion, {
                    unformattableTokens: that.type.unformattableTokens
                }));
                if (labels) {
                    html.push('<span class="' + that.classes.subtext_label + '">' + utils.escapeHtml(labels) + '</span>');
                }
                html.push('</div>');
            });
        }

        that.$container.html(html.join(''));

        // Select first value by default:
        if (options.autoSelectFirst && that.selectedIndex === -1) {
            that.selectedIndex = 0;
        }
        if (that.selectedIndex !== -1) {
            that.getSuggestionsItems().eq(that.selectedIndex).addClass(that.classes.selected);
        }

        if ($.isFunction(options.beforeRender)) {
            options.beforeRender.call(that.element, that.$container);
        }

        that.$container.show();
        that.visible = true;
        that.fixPosition();
        that.setItemsPositions();
    },

    wrapFormattedValue: function wrapFormattedValue(value, suggestion) {
        var that = this,
            status = utils.getDeepValue(suggestion.data, 'state.status');

        return '<span class="' + that.classes.value + '"' + (status ? ' data-suggestion-status="' + status + '"' : '') + '>' + value + '</span>';
    },

    formatResult: function formatResult(value, currentValue, suggestion, options) {
        var that = this;

        value = that.highlightMatches(value, currentValue, suggestion, options);

        return that.wrapFormattedValue(value, suggestion);
    },

    /**
     * Makes HTML contents for suggestion item
     * @param {String} value string to be displayed as a value
     * @param {String} currentValue contents of the textbox
     * @param suggestion whole suggestion object with displaying value and other fields
     * @param {Object} [options] set of flags:
     *          `unformattableTokens` - array of search tokens, that are not to be highlighted
     *          `maxLength` - if set, `value` is limited by this length
     * @returns {String} HTML to be inserted in the list
     */
    highlightMatches: function highlightMatches(value, currentValue, suggestion, options) {

        var that = this,
            chunks = [],
            unformattableTokens = options && options.unformattableTokens,
            maxLength = options && options.maxLength,
            tokens,
            tokenMatchers,
            preferredTokens,
            rWords = utils.reWordExtractor(),
            match,
            word,
            i,
            chunk,
            formattedStr;

        if (!value) return '';

        tokens = utils.getTokens(currentValue, unformattableTokens);

        tokenMatchers = $.map(tokens, function (token) {
            return new RegExp('^((.*)([' + WORD_PARTS_DELIMITERS + ']+))?' + '(' + utils.escapeRegExChars(token) + ')' + '([^' + WORD_PARTS_DELIMITERS + ']*[' + WORD_PARTS_DELIMITERS + ']*)', 'i');
        });

        // parse string by words
        while ((match = rWords.exec(value)) && match[0]) {
            word = match[1];
            chunks.push({
                text: word,

                // upper case means a word is a name and can be highlighted even if presents in unformattableTokens
                hasUpperCase: word.toLowerCase() !== word,
                formatted: utils.formatToken(word),
                matchable: true
            });
            if (match[2]) {
                chunks.push({
                    text: match[2]
                });
            }
        }

        // use simple loop because length can change
        for (i = 0; i < chunks.length; i++) {
            chunk = chunks[i];
            if (chunk.matchable && !chunk.matched && ($.inArray(chunk.formatted, unformattableTokens) === -1 || chunk.hasUpperCase)) {
                $.each(tokenMatchers, function (j, matcher) {
                    var tokenMatch = matcher.exec(chunk.formatted),
                        length,
                        nextIndex = i + 1;

                    if (tokenMatch) {
                        tokenMatch = {
                            before: tokenMatch[1] || '',
                            beforeText: tokenMatch[2] || '',
                            beforeDelimiter: tokenMatch[3] || '',
                            text: tokenMatch[4] || '',
                            after: tokenMatch[5] || ''
                        };

                        if (tokenMatch.before) {
                            // insert chunk before current
                            chunks.splice(i, 0, {
                                text: chunk.text.substr(0, tokenMatch.beforeText.length),
                                formatted: tokenMatch.beforeText,
                                matchable: true
                            }, {
                                text: tokenMatch.beforeDelimiter
                            });
                            nextIndex += 2;

                            length = tokenMatch.before.length;
                            chunk.text = chunk.text.substr(length);
                            chunk.formatted = chunk.formatted.substr(length);
                            i--;
                        }

                        length = tokenMatch.text.length + tokenMatch.after.length;
                        if (chunk.formatted.length > length) {
                            chunks.splice(nextIndex, 0, {
                                text: chunk.text.substr(length),
                                formatted: chunk.formatted.substr(length),
                                matchable: true
                            });
                            chunk.text = chunk.text.substr(0, length);
                            chunk.formatted = chunk.formatted.substr(0, length);
                        }

                        if (tokenMatch.after) {
                            length = tokenMatch.text.length;
                            chunks.splice(nextIndex, 0, {
                                text: chunk.text.substr(length),
                                formatted: chunk.formatted.substr(length)
                            });
                            chunk.text = chunk.text.substr(0, length);
                            chunk.formatted = chunk.formatted.substr(0, length);
                        }
                        chunk.matched = true;
                        return false;
                    }
                });
            }
        }

        if (maxLength) {
            for (i = 0; i < chunks.length && maxLength >= 0; i++) {
                chunk = chunks[i];
                maxLength -= chunk.text.length;
                if (maxLength < 0) {
                    chunk.text = chunk.text.substr(0, chunk.text.length + maxLength) + '...';
                }
            }
            chunks.length = i;
        }

        formattedStr = _highlightMatches(chunks);
        return nowrapLinkedParts(formattedStr, that.classes.nowrap);
    },

    makeSuggestionLabel: function makeSuggestionLabel(suggestions, suggestion) {
        var that = this,
            fieldNames = that.type.fieldNames,
            nameData = {},
            rWords = utils.reWordExtractor(),
            match,
            word,
            labels = [];

        if (fieldNames && hasAnotherSuggestion(suggestions, suggestion) && suggestion.data) {

            $.each(fieldNames, function (field) {
                var value = suggestion.data[field];
                if (value) {
                    nameData[field] = utils.formatToken(value);
                }
            });

            if (!$.isEmptyObject(nameData)) {
                while ((match = rWords.exec(utils.formatToken(suggestion.value))) && (word = match[1])) {
                    $.each(nameData, function (i, value) {
                        if (value == word) {
                            labels.push(fieldNames[i]);
                            delete nameData[i];
                            return false;
                        }
                    });
                }

                if (labels.length) {
                    return labels.join(', ');
                }
            }
        }
    },

    hide: function hide() {
        var that = this;
        that.visible = false;
        that.selectedIndex = -1;
        that.$container.hide().empty();
    },

    activate: function activate(index) {
        var that = this,
            $activeItem,
            selected = that.classes.selected,
            $children;

        if (!that.dropdownDisabled) {
            $children = that.getSuggestionsItems();

            $children.removeClass(selected);

            that.selectedIndex = index;

            if (that.selectedIndex !== -1 && $children.length > that.selectedIndex) {
                $activeItem = $children.eq(that.selectedIndex);
                $activeItem.addClass(selected);
                return $activeItem;
            }
        }

        return null;
    },

    deactivate: function deactivate(restoreValue) {
        var that = this;

        if (!that.dropdownDisabled) {
            that.selectedIndex = -1;
            that.getSuggestionsItems().removeClass(that.classes.selected);
            if (restoreValue) {
                that.el.val(that.currentValue);
            }
        }
    },

    moveUp: function moveUp() {
        var that = this;

        if (that.dropdownDisabled) {
            return;
        }
        if (that.selectedIndex === -1) {
            if (that.suggestions.length) {
                that.adjustScroll(that.suggestions.length - 1);
            }
            return;
        }

        if (that.selectedIndex === 0) {
            that.deactivate(true);
            return;
        }

        that.adjustScroll(that.selectedIndex - 1);
    },

    moveDown: function moveDown() {
        var that = this;

        if (that.dropdownDisabled) {
            return;
        }
        if (that.selectedIndex === that.suggestions.length - 1) {
            that.deactivate(true);
            return;
        }

        that.adjustScroll(that.selectedIndex + 1);
    },

    adjustScroll: function adjustScroll(index) {
        var that = this,
            $activeItem = that.activate(index),
            itemTop,
            itemBottom,
            scrollTop = that.$container.scrollTop(),
            containerHeight;

        if (!$activeItem || !$activeItem.length) {
            return;
        }

        itemTop = $activeItem.position().top;
        if (itemTop < 0) {
            that.$container.scrollTop(scrollTop + itemTop);
        } else {
            itemBottom = itemTop + $activeItem.outerHeight();
            containerHeight = that.$container.innerHeight();
            if (itemBottom > containerHeight) {
                that.$container.scrollTop(scrollTop - containerHeight + itemBottom);
            }
        }

        that.el.val(that.suggestions[index].value);
    }

};

$.extend(DEFAULT_OPTIONS, optionsUsed);

$.extend(Suggestions.prototype, methods$4);

notificator.on('initialize', methods$4.createContainer).on('dispose', methods$4.removeContainer).on('setOptions', methods$4.setContainerOptions).on('fixPosition', methods$4.setDropdownPosition).on('fixPosition', methods$4.setItemsPositions).on('assignSuggestions', methods$4.suggest);

/**
 * Methods related to right-sided component
 */

var QUEUE_NAME = 'addon';
var BEFORE_SHOW_ADDON = 50;
var BEFORE_RESTORE_PADDING = 1000;

var optionsUsed$1 = {
    addon: null
};

var ADDON_TYPES = {
    'NONE': 'none',
    'SPINNER': 'spinner',
    'CLEAR': 'clear'
};

var Addon = function Addon(owner) {
    var that = this,
        $el = $('<span class="suggestions-addon"/>');

    that.owner = owner;
    that.$el = $el;
    that.type = ADDON_TYPES.NONE;
    that.visible = false;
    that.initialPadding = null;

    $el.on('click', $.proxy(that, 'onClick'));
};

Addon.prototype = {

    checkType: function checkType() {
        var that = this,
            type = that.owner.options.addon,
            isTypeCorrect = false;

        $.each(ADDON_TYPES, function (key, value) {
            isTypeCorrect = value == type;
            if (isTypeCorrect) {
                return false;
            }
        });

        if (!isTypeCorrect) {
            type = that.owner.isMobile ? ADDON_TYPES.CLEAR : ADDON_TYPES.SPINNER;
        }

        if (type != that.type) {
            that.type = type;
            that.$el.attr('data-addon-type', type);
            that.toggle(true);
        }
    },

    toggle: function toggle(immediate) {
        var that = this,
            visible;

        switch (that.type) {
            case ADDON_TYPES.CLEAR:
                visible = !!that.owner.currentValue;
                break;
            case ADDON_TYPES.SPINNER:
                visible = !!that.owner.currentRequest;
                break;
            default:
                visible = false;
        }

        if (visible != that.visible) {
            that.visible = visible;
            if (visible) {
                that.show(immediate);
            } else {
                that.hide(immediate);
            }
        }
    },

    show: function show(immediate) {
        var that = this,
            style = { 'opacity': 1 };

        if (immediate) {
            that.$el.show().css(style);
            that.showBackground(true);
        } else {
            that.$el.stop(true, true).delay(BEFORE_SHOW_ADDON).queue(function () {
                that.$el.show();
                that.showBackground();
                that.$el.dequeue();
            }).animate(style, 'fast');
        }
    },

    hide: function hide(immediate) {
        var that = this,
            style = { 'opacity': 0 };

        if (immediate) {
            that.$el.hide().css(style);
        }
        that.$el.stop(true).animate(style, {
            duration: 'fast',
            complete: function complete() {
                that.$el.hide();
                that.hideBackground();
            }
        });
    },

    fixPosition: function fixPosition(origin, elLayout) {
        var that = this,
            addonSize = elLayout.innerHeight;

        that.checkType();
        that.$el.css({
            left: origin.left + elLayout.borderLeft + elLayout.innerWidth - addonSize + 'px',
            top: origin.top + elLayout.borderTop + 'px',
            height: addonSize,
            width: addonSize
        });

        that.initialPadding = elLayout.paddingRight;
        that.width = addonSize;
        if (that.visible) {
            elLayout.componentsRight += addonSize;
        }
    },

    showBackground: function showBackground(immediate) {
        var that = this,
            $el = that.owner.el,
            style = { 'paddingRight': that.width };

        if (that.width > that.initialPadding) {
            that.stopBackground();
            if (immediate) {
                $el.css(style);
            } else {
                $el.animate(style, { duration: 'fast', queue: QUEUE_NAME }).dequeue(QUEUE_NAME);
            }
        }
    },

    hideBackground: function hideBackground(immediate) {
        var that = this,
            $el = that.owner.el,
            style = { 'paddingRight': that.initialPadding };

        if (that.width > that.initialPadding) {
            that.stopBackground(true);
            if (immediate) {
                $el.css(style);
            } else {
                $el.delay(BEFORE_RESTORE_PADDING, QUEUE_NAME).animate(style, { duration: 'fast', queue: QUEUE_NAME }).dequeue(QUEUE_NAME);
            }
        }
    },

    stopBackground: function stopBackground(gotoEnd) {
        this.owner.el.stop(QUEUE_NAME, true, gotoEnd);
    },

    onClick: function onClick(e) {
        var that = this;

        if (that.type == ADDON_TYPES.CLEAR) {
            that.owner.clear();
        }
    }

};

var methods$5 = {

    createAddon: function createAddon() {
        var that = this,
            addon = new Addon(that);

        that.$wrapper.append(addon.$el);
        that.addon = addon;
    },

    fixAddonPosition: function fixAddonPosition(origin, elLayout) {
        this.addon.fixPosition(origin, elLayout);
    },

    checkAddonType: function checkAddonType() {
        this.addon.checkType();
    },

    checkAddonVisibility: function checkAddonVisibility() {
        this.addon.toggle();
    },

    stopBackground: function stopBackground() {
        this.addon.stopBackground();
    }

};

$.extend(DEFAULT_OPTIONS, optionsUsed$1);

notificator.on('initialize', methods$5.createAddon).on('setOptions', methods$5.checkAddonType).on('fixPosition', methods$5.fixAddonPosition).on('clear', methods$5.checkAddonVisibility).on('valueChange', methods$5.checkAddonVisibility).on('request', methods$5.checkAddonVisibility).on('resetPosition', methods$5.stopBackground);

/**
 * Methods related to CONSTRAINTS component
 */
var optionsUsed$2 = {
    constraints: null,
    restrict_value: false
};

var fiasParamNames = ['region_fias_id', 'area_fias_id', 'city_fias_id', 'city_district_fias_id', 'settlement_fias_id', 'street_fias_id'];

/**
 * Compares two suggestion objects
 * @param suggestion
 * @param instance other Suggestions instance
 */
function belongsToArea(suggestion, instance) {
    var parentSuggestion = instance.selection,
        result = parentSuggestion && parentSuggestion.data && instance.bounds;

    if (result) {
        $.each(instance.bounds.all, function (i, bound) {
            return result = parentSuggestion.data[bound] === suggestion.data[bound];
        });
    }
    return result;
}

/**
 * @param {Object} data  fields
 * @param {Suggestions} instance
 * @constructor
 */
var ConstraintLocation = function ConstraintLocation(data, instance) {
    var that = this,
        fieldNames,
        fiasFieldNames,
        fiasFields = {};

    that.instance = instance;
    that.fields = {};
    that.specificity = -1;

    if ($.isPlainObject(data) && instance.type.dataComponents) {
        $.each(instance.type.dataComponents, function (i, component) {
            var fieldName = component.id;

            if (component.forLocations && data[fieldName]) {
                that.fields[fieldName] = data[fieldName];
                that.specificity = i;
            }
        });
    }

    fieldNames = utils.objectKeys(that.fields);
    fiasFieldNames = utils.arraysIntersection(fieldNames, fiasParamNames);
    if (fiasFieldNames.length) {
        $.each(fiasFieldNames, function (index, fieldName) {
            fiasFields[fieldName] = that.fields[fieldName];
        });
        that.fields = fiasFields;
        that.specificity = that.getFiasSpecificity(fiasFieldNames);
    } else if (that.fields.kladr_id) {
        that.fields = { kladr_id: that.fields.kladr_id };
        that.specificity = that.getKladrSpecificity(that.fields.kladr_id);
    }
};

$.extend(ConstraintLocation.prototype, {
    getLabel: function getLabel() {
        return this.instance.type.composeValue(this.fields, { saveCityDistrict: true });
    },

    getFields: function getFields() {
        return this.fields;
    },

    isValid: function isValid() {
        return !$.isEmptyObject(this.fields);
    },

    /**
     * Возвращает specificity для КЛАДР
     * Описание ниже, в getFiasSpecificity
     * @param kladr_id
     * @returns {number}
     */
    getKladrSpecificity: function getKladrSpecificity(kladr_id) {
        var specificity = -1,
            significantLength;

        this.significantKladr = kladr_id.replace(/^(\d{2})(\d*?)(0+)$/g, '$1$2');
        significantLength = this.significantKladr.length;

        $.each(this.instance.type.dataComponents, function (i, component) {
            if (component.kladrFormat && significantLength === component.kladrFormat.digits) {
                specificity = i;
            }
        });

        return specificity;
    },

    /**
     * Возвращает особую величину specificity для ФИАС
     * Specificity это индекс для массива this.instance.type.dataComponents
     * до которого (включительно) обрежется этот массив при формировании строки адреса.
     * Этот параметр нужен для случаев, когда в настройках плагина restrict_value = true
     * Например, установлено ограничение (locations) по region_fias_id (Краснодарский край)
     * В выпадашке нажимаем на "г. Сочи"
     * Если restrict_value отключен, то выведется значение "Краснодарский край, г Сочи"
     * Если включен, то просто "г Сочи"
     *
     * @param fiasFieldNames
     * @returns {number}
     */
    getFiasSpecificity: function getFiasSpecificity(fiasFieldNames) {
        var specificity = -1;

        $.each(this.instance.type.dataComponents, function (i, component) {
            if (component.fiasType && $.inArray(component.fiasType, fiasFieldNames) > -1 && specificity < i) {
                specificity = i;
            }
        });

        return specificity;
    },

    containsData: function containsData(data) {
        var result = true;

        if (this.fields.kladr_id) {
            return !!data.kladr_id && data.kladr_id.indexOf(this.significantKladr) === 0;
        } else {
            $.each(this.fields, function (fieldName, value) {
                return result = !!data[fieldName] && data[fieldName].toLowerCase() === value.toLowerCase();
            });

            return result;
        }
    }
});

Suggestions.ConstraintLocation = ConstraintLocation;

/**
 * @param {Object} data
 * @param {Object|Array} data.locations
 * @param {string} [data.label]
 * @param {boolean} [data.deletable]
 * @param {Suggestions} [instance]
 * @constructor
 */
var Constraint = function Constraint(data, instance) {
    this.id = utils.uniqueId('c');
    this.deletable = !!data.deletable;
    this.instance = instance;

    this.locations = $.map($.makeArray(data && (data.locations || data.restrictions)), function (data) {
        return new ConstraintLocation(data, instance);
    });

    this.locations = $.grep(this.locations, function (location) {
        return location.isValid();
    });

    this.label = data.label;
    if (this.label == null && instance.type.composeValue) {
        this.label = $.map(this.locations, function (location) {
            return location.getLabel();
        }).join(', ');
    }

    if (this.label && this.isValid()) {
        this.$el = $(document.createElement('li')).append($(document.createElement('span')).text(this.label)).attr('data-constraint-id', this.id);

        if (this.deletable) {
            this.$el.append($(document.createElement('span')).addClass(instance.classes.removeConstraint));
        }
    }
};

$.extend(Constraint.prototype, {
    isValid: function isValid() {
        return this.locations.length > 0;
    },
    getFields: function getFields() {
        return $.map(this.locations, function (location) {
            return location.getFields();
        });
    }
});

var methods$6 = {

    createConstraints: function createConstraints() {
        var that = this;

        that.constraints = {};

        that.$constraints = $('<ul class="suggestions-constraints"/>');
        that.$wrapper.append(that.$constraints);
        that.$constraints.on('click', '.' + that.classes.removeConstraint, $.proxy(that.onConstraintRemoveClick, that));
    },

    setConstraintsPosition: function setConstraintsPosition(origin, elLayout) {
        var that = this;

        that.$constraints.css({
            left: origin.left + elLayout.borderLeft + elLayout.paddingLeft + 'px',
            top: origin.top + elLayout.borderTop + Math.round((elLayout.innerHeight - that.$constraints.height()) / 2) + 'px'
        });

        elLayout.componentsLeft += that.$constraints.outerWidth(true) + elLayout.paddingLeft;
    },

    onConstraintRemoveClick: function onConstraintRemoveClick(e) {
        var that = this,
            $item = $(e.target).closest('li'),
            id = $item.attr('data-constraint-id');

        // Delete constraint data before animation to let correct requests to be sent while fading
        delete that.constraints[id];
        // Request for new suggestions
        that.update();

        $item.fadeOut('fast', function () {
            that.removeConstraint(id);
        });
    },

    setupConstraints: function setupConstraints() {
        var that = this,
            constraints = that.options.constraints,
            $parent;

        if (!constraints) {
            that.unbindFromParent();
            return;
        }

        if (constraints instanceof $ || typeof constraints === 'string' || typeof constraints.nodeType === 'number') {
            $parent = $(constraints);
            if (!$parent.is(that.constraints)) {
                that.unbindFromParent();
                if (!$parent.is(that.el)) {
                    that.constraints = $parent;
                    that.bindToParent();
                }
            }
        } else {
            that._constraintsUpdating = true;
            $.each(that.constraints, $.proxy(that.removeConstraint, that));
            $.each($.makeArray(constraints), function (i, constraint) {
                that.addConstraint(constraint);
            });
            that._constraintsUpdating = false;
            that.fixPosition();
        }
    },

    filteredLocation: function filteredLocation(data) {
        var locationComponents = [],
            location = {};

        $.each(this.type.dataComponents, function () {
            if (this.forLocations) locationComponents.push(this.id);
        });

        if ($.isPlainObject(data)) {
            // Copy to location only allowed fields
            $.each(data, function (key, value) {
                if (value && locationComponents.indexOf(key) >= 0) {
                    location[key] = value;
                }
            });
        }

        if (!$.isEmptyObject(location)) {
            return location.kladr_id ? { kladr_id: location.kladr_id } : location;
        }
    },

    addConstraint: function addConstraint(constraint) {
        var that = this;

        constraint = new Constraint(constraint, that);

        if (constraint.isValid()) {
            that.constraints[constraint.id] = constraint;

            if (constraint.$el) {
                that.$constraints.append(constraint.$el);
                if (!that._constraintsUpdating) {
                    that.fixPosition();
                }
            }
        }
    },

    removeConstraint: function removeConstraint(id) {
        var that = this;
        delete that.constraints[id];
        that.$constraints.children('[data-constraint-id="' + id + '"]').remove();
        if (!that._constraintsUpdating) {
            that.fixPosition();
        }
    },

    constructConstraintsParams: function constructConstraintsParams() {
        var that = this,
            locations = [],
            constraints = that.constraints,
            parentInstance,
            parentData,
            params = {};

        while (constraints instanceof $ && (parentInstance = constraints.suggestions()) && !(parentData = utils.getDeepValue(parentInstance, 'selection.data'))) {
            constraints = parentInstance.constraints;
        }

        if (constraints instanceof $) {
            parentData = new ConstraintLocation(parentData, parentInstance).getFields();

            if (parentData) {
                params.locations = [parentData];
                params.restrict_value = true;
            }
        } else {
            if (constraints) {
                $.each(constraints, function (id, constraint) {
                    locations = locations.concat(constraint.getFields());
                });

                if (locations.length) {
                    params.locations = locations;
                    params.restrict_value = that.options.restrict_value;
                }
            }
        }

        return params;
    },

    /**
     * Returns label of the first constraint (if any), empty string otherwise
     * @returns {String}
     */
    getFirstConstraintLabel: function getFirstConstraintLabel() {
        var that = this,
            constraints_id = $.isPlainObject(that.constraints) && _Object$keys(that.constraints)[0];

        return constraints_id ? that.constraints[constraints_id].label : '';
    },

    bindToParent: function bindToParent() {
        var that = this;

        that.constraints.on(['suggestions-select.' + that.uniqueId, 'suggestions-invalidateselection.' + that.uniqueId, 'suggestions-clear.' + that.uniqueId].join(' '), $.proxy(that.onParentSelectionChanged, that)).on('suggestions-dispose.' + that.uniqueId, $.proxy(that.onParentDispose, that));
    },

    unbindFromParent: function unbindFromParent() {
        var that = this,
            $parent = that.constraints;

        if ($parent instanceof $) {
            $parent.off('.' + that.uniqueId);
        }
    },

    onParentSelectionChanged: function onParentSelectionChanged(e, suggestion, valueChanged) {
        // Don't clear if parent has been just enriched
        if (e.type !== 'suggestions-select' || valueChanged) {
            this.clear();
        }
    },

    onParentDispose: function onParentDispose(e) {
        this.unbindFromParent();
    },

    getParentInstance: function getParentInstance() {
        return this.constraints instanceof $ && this.constraints.suggestions();
    },

    shareWithParent: function shareWithParent(suggestion) {
        // that is the parent control's instance
        var that = this.getParentInstance();

        if (!that || that.type !== this.type || belongsToArea(suggestion, that)) {
            return;
        }

        that.shareWithParent(suggestion);
        that.setSuggestion(suggestion);
    },

    /**
     * Pick only fields that absent in restriction
     */
    getUnrestrictedData: function getUnrestrictedData(data) {
        var that = this,
            restrictedKeys = [],
            unrestrictedData = {},
            maxSpecificity = -1;

        // Find most specific location that could restrict current data
        $.each(that.constraints, function (id, constraint) {
            $.each(constraint.locations, function (i, location) {
                if (location.containsData(data) && location.specificity > maxSpecificity) {
                    maxSpecificity = location.specificity;
                }
            });
        });

        if (maxSpecificity >= 0) {

            // Для городов-регионов нужно также отсечь и город
            if (data.region_kladr_id && data.region_kladr_id === data.city_kladr_id) {
                restrictedKeys.push.apply(restrictedKeys, that.type.dataComponentsById['city'].fields);
            }

            // Collect all fieldnames from all restricted components
            $.each(that.type.dataComponents.slice(0, maxSpecificity + 1), function (i, component) {
                restrictedKeys.push.apply(restrictedKeys, component.fields);
            });

            // Copy skipping restricted fields
            $.each(data, function (key, value) {
                if (restrictedKeys.indexOf(key) === -1) {
                    unrestrictedData[key] = value;
                }
            });
        } else {
            unrestrictedData = data;
        }

        return unrestrictedData;
    }

};

$.extend(DEFAULT_OPTIONS, optionsUsed$2);

$.extend(Suggestions.prototype, methods$6);

// Disable this feature when GET method used. See SUG-202
if (utils.getDefaultType() != 'GET') {
    notificator.on('initialize', methods$6.createConstraints).on('setOptions', methods$6.setupConstraints).on('fixPosition', methods$6.setConstraintsPosition).on('requestParams', methods$6.constructConstraintsParams).on('dispose', methods$6.unbindFromParent);
}

/**
 * Methods for selecting a suggestion
 */

var methods$7 = {

    proceedQuery: function proceedQuery(query) {
        var that = this;

        if (query.length >= that.options.minChars) {
            that.updateSuggestions(query);
        } else {
            that.hide();
        }
    },

    /**
     * Selects current or first matched suggestion, but firstly waits for data ready
     * @param selectionOptions
     * @returns {$.Deferred} promise, resolved with index of selected suggestion or rejected if nothing matched
     */
    selectCurrentValue: function selectCurrentValue(selectionOptions) {
        var that = this,
            result = $.Deferred();

        // force onValueChange to be executed if it has been deferred
        that.inputPhaseResolve();

        that.fetchPhase.done(function () {
            var index;

            // When suggestion has already been selected and not modified
            if (that.selection && !that.visible) {
                result.reject();
            } else {
                index = that.findSuggestionIndex();

                that.select(index, selectionOptions);

                if (index === -1) {
                    result.reject();
                } else {
                    result.resolve(index);
                }
            }
        }).fail(function () {
            result.reject();
        });

        return result;
    },

    /**
     * Selects first when user interaction is not supposed
     */
    selectFoundSuggestion: function selectFoundSuggestion() {
        var that = this;

        if (!that.requestMode.userSelect) {
            that.select(0);
        }
    },

    /**
     * Selects current or first matched suggestion
     * @returns {number} index of found suggestion
     */
    findSuggestionIndex: function findSuggestionIndex() {
        var that = this,
            index = that.selectedIndex,
            value;

        if (index === -1) {
            // matchers always operate with trimmed strings
            value = $.trim(that.el.val());
            if (value) {
                $.each(that.type.matchers, function (i, matcher) {
                    index = matcher(value, that.suggestions);
                    return index === -1;
                });
            }
        }

        return index;
    },

    /**
     * Selects a suggestion at specified index
     * @param index index of suggestion to select. Can be -1
     * @param {Object} selectionOptions
     * @param {boolean} [selectionOptions.continueSelecting]  prevents hiding after selection
     * @param {boolean} [selectionOptions.noSpace]  prevents adding space at the end of current value
     */
    select: function select(index, selectionOptions) {
        var that = this,
            suggestion = that.suggestions[index],
            continueSelecting = selectionOptions && selectionOptions.continueSelecting,
            currentValue = that.currentValue,
            hasSameValues;

        // Prevent recursive execution
        if (that.triggering['Select']) return;

        // if no suggestion to select
        if (!suggestion) {
            if (!continueSelecting && !that.selection) {
                that.triggerOnSelectNothing();
            }
            that.onSelectComplete(continueSelecting);
            return;
        }

        hasSameValues = that.hasSameValues(suggestion);

        that.enrichSuggestion(suggestion, selectionOptions).done(function (enrichedSuggestion, hasBeenEnriched) {
            that.selectSuggestion(enrichedSuggestion, index, currentValue, $.extend({
                hasBeenEnriched: hasBeenEnriched,
                hasSameValues: hasSameValues
            }, selectionOptions));
        });
    },

    /**
     * Formats and selects final (enriched) suggestion
     * @param suggestion
     * @param index
     * @param lastValue
     * @param {Object} selectionOptions
     * @param {boolean} [selectionOptions.continueSelecting]  prevents hiding after selection
     * @param {boolean} [selectionOptions.noSpace]  prevents adding space at the end of current value
     * @param {boolean} selectionOptions.hasBeenEnriched
     * @param {boolean} selectionOptions.hasSameValues
     */
    selectSuggestion: function selectSuggestion(suggestion, index, lastValue, selectionOptions) {
        var that = this,
            continueSelecting = selectionOptions.continueSelecting,
            assumeDataComplete = !that.type.isDataComplete || that.type.isDataComplete.call(that, suggestion),
            currentSelection = that.selection;

        // Prevent recursive execution
        if (that.triggering['Select']) return;

        if (that.type.alwaysContinueSelecting) {
            continueSelecting = true;
        }

        if (assumeDataComplete) {
            continueSelecting = false;
        }

        // `suggestions` cat be empty, e.g. during `fixData`
        if (selectionOptions.hasBeenEnriched && that.suggestions[index]) {
            that.suggestions[index].data = suggestion.data;
        }

        if (that.requestMode.updateValue) {
            that.checkValueBounds(suggestion);
            that.currentValue = that.getSuggestionValue(suggestion, selectionOptions);

            if (that.currentValue && !selectionOptions.noSpace && !assumeDataComplete) {
                that.currentValue += ' ';
            }
            that.el.val(that.currentValue);
        }

        if (that.currentValue) {
            that.selection = suggestion;
            if (!that.areSuggestionsSame(suggestion, currentSelection)) {
                that.trigger('Select', suggestion, that.currentValue != lastValue);
            }
            if (that.requestMode.userSelect) {
                that.onSelectComplete(continueSelecting);
            }
        } else {
            that.selection = null;
            that.triggerOnSelectNothing();
        }

        that.shareWithParent(suggestion);
    },

    onSelectComplete: function onSelectComplete(continueSelecting) {
        var that = this;

        if (continueSelecting) {
            that.selectedIndex = -1;
            that.updateSuggestions(that.currentValue);
        } else {
            that.hide();
        }
    },

    triggerOnSelectNothing: function triggerOnSelectNothing() {
        var that = this;

        if (!that.triggering['SelectNothing']) {
            that.trigger('SelectNothing', that.currentValue);
        }
    },

    trigger: function trigger(event) {
        var that = this,
            args = utils.slice(arguments, 1),
            callback = that.options['on' + event];

        that.triggering[event] = true;
        if ($.isFunction(callback)) {
            callback.apply(that.element, args);
        }
        that.el.trigger.call(that.el, 'suggestions-' + event.toLowerCase(), args);
        that.triggering[event] = false;
    }

};

$.extend(Suggestions.prototype, methods$7);

notificator.on('assignSuggestions', methods$7.selectFoundSuggestion);

/**
 * features for connected instances
 */

var optionsUsed$3 = {
    bounds: null
};

var methods$8 = {

    setupBounds: function setupBounds() {
        this.bounds = {
            from: null,
            to: null
        };
    },

    setBoundsOptions: function setBoundsOptions() {
        var that = this,
            boundsAvailable = [],
            newBounds = $.trim(that.options.bounds).split('-'),
            boundFrom = newBounds[0],
            boundTo = newBounds[newBounds.length - 1],
            boundsOwn = [],
            boundIsOwn,
            boundsAll = [],
            indexTo;

        if (that.type.dataComponents) {
            $.each(that.type.dataComponents, function () {
                if (this.forBounds) {
                    boundsAvailable.push(this.id);
                }
            });
        }

        if ($.inArray(boundFrom, boundsAvailable) === -1) {
            boundFrom = null;
        }

        indexTo = $.inArray(boundTo, boundsAvailable);
        if (indexTo === -1 || indexTo === boundsAvailable.length - 1) {
            boundTo = null;
        }

        if (boundFrom || boundTo) {
            boundIsOwn = !boundFrom;
            $.each(boundsAvailable, function (i, bound) {
                if (bound == boundFrom) {
                    boundIsOwn = true;
                }
                boundsAll.push(bound);
                if (boundIsOwn) {
                    boundsOwn.push(bound);
                }
                if (bound == boundTo) {
                    return false;
                }
            });
        }

        that.bounds.from = boundFrom;
        that.bounds.to = boundTo;
        that.bounds.all = boundsAll;
        that.bounds.own = boundsOwn;
    },

    constructBoundsParams: function constructBoundsParams() {
        var that = this,
            params = {};

        if (that.bounds.from) {
            params['from_bound'] = { value: that.bounds.from };
        }
        if (that.bounds.to) {
            params['to_bound'] = { value: that.bounds.to };
        }

        return params;
    },

    /**
     * Подстраивает suggestion.value под that.bounds.own
     * Ничего не возвращает, меняет в самом suggestion
     * @param suggestion
     */
    checkValueBounds: function checkValueBounds(suggestion) {
        var that = this,
            valueData;

        // If any bounds set up
        if (that.bounds.own.length && that.type.composeValue) {
            // делаем копию
            var bounds = that.bounds.own.slice(0);
            // если роль текущего инстанса плагина показывать только район города
            // то для корректного формировния нужен city_district_fias_id
            if (bounds.length === 1 && bounds[0] === 'city_district') {
                bounds.push('city_district_fias_id');
            }
            valueData = that.copyDataComponents(suggestion.data, bounds);
            suggestion.value = that.type.composeValue(valueData);
        }
    },

    copyDataComponents: function copyDataComponents(data, components) {
        var result = {},
            dataComponentsById = this.type.dataComponentsById;

        if (dataComponentsById) {
            $.each(components, function (i, component) {
                $.each(dataComponentsById[component].fields, function (i, field) {
                    if (data[field] != null) {
                        result[field] = data[field];
                    }
                });
            });
        }

        return result;
    },

    getBoundedKladrId: function getBoundedKladrId(kladr_id, boundsRange) {
        var boundTo = boundsRange[boundsRange.length - 1],
            kladrFormat;

        $.each(this.type.dataComponents, function (i, component) {
            if (component.id === boundTo) {
                kladrFormat = component.kladrFormat;
                return false;
            }
        });

        return kladr_id.substr(0, kladrFormat.digits) + new Array((kladrFormat.zeros || 0) + 1).join('0');
    }

};

$.extend(DEFAULT_OPTIONS, optionsUsed$3);

$.extend(Suggestions.prototype, methods$8);

notificator.on('initialize', methods$8.setupBounds).on('setOptions', methods$8.setBoundsOptions).on('requestParams', methods$8.constructBoundsParams);

Suggestions.defaultOptions = DEFAULT_OPTIONS;

Suggestions.version = '99.9.9';

$.Suggestions = Suggestions;

// Create chainable jQuery plugin:
$.fn.suggestions = function (options, args) {
    // If function invoked without argument return
    // instance of the first matched element:
    if (arguments.length === 0) {
        return this.first().data(DATA_ATTR_KEY);
    }

    return this.each(function () {
        var inputElement = $(this),
            instance = inputElement.data(DATA_ATTR_KEY);

        if (typeof options === 'string') {
            if (instance && typeof instance[options] === 'function') {
                instance[options](args);
            }
        } else {
            // If instance already exists, destroy it:
            if (instance && instance.dispose) {
                instance.dispose();
            }
            instance = new Suggestions(this, options);
            inputElement.data(DATA_ATTR_KEY, instance);
        }
    });
};

})));

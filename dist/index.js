(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["reduxOperation"] = factory();
	else
		root["reduxOperation"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.createActionWithPayload = function (type) { return function (payload) { return ({
    type: type,
    payload: payload
}); }; };
/**
 * Outputs a Map of string as keys and Symbol | strings as it's values. For eg
 * {
 *    foo: Symbol('bar'),
 *    baz: Symbol('bax'),
 * }
 * @param constants [['foo', 'bar'], ['baz', 'bax']]
 */
exports.makeConstantsWithKeys = function (constants) {
    return constants.reduce(function (constantsMap, constant) {
        var key = constant[0], val = constant[1];
        constantsMap.set(key, Symbol(val));
        return constantsMap;
    }, new Map());
};
var DELIMITER = "_";
var actionFlags;
(function (actionFlags) {
    actionFlags["REQUEST"] = "REQUEST";
    actionFlags["SUCCESS"] = "SUCCESS";
    actionFlags["FAILURE"] = "FAILURE";
})(actionFlags = exports.actionFlags || (exports.actionFlags = {}));
exports.createReduxOperation = function (actionName) {
    /**
     * Will generate constants map in the form of { SUCCESS: Symbol('FETCH_DATA_SUCCESS') }
     */
    var constants = exports.makeConstantsWithKeys(Object.values(actionFlags).map(function (constant) { return [
        constant,
        "" + actionName + DELIMITER + constant
    ]; }));
    /**
     * Generate redux actions for corresponding intents like request, success, failure
     */
    var actions = Object.values(actionFlags).map(function (constant) {
        return exports.createActionWithPayload(constants.get(constant));
    });
    var initialState = {
        pending: false,
        success: false,
        failure: false,
        errors: null
    };
    /**
     * Create a reducer to be combined with the original one in the parent context
     * @param state Redux State holding flags
     * @param action Redux Action
     */
    var reducer = function (state, _a) {
        if (state === void 0) { state = initialState; }
        var type = _a.type, _b = _a.payload, payload = _b === void 0 ? undefined : _b;
        switch (type) {
            case constants.get(actionFlags.REQUEST):
                return __assign({}, initialState, { pending: true });
            case constants.get(actionFlags.SUCCESS):
                return __assign({}, initialState, { success: true });
            case constants.get(actionFlags.FAILURE):
                return __assign({}, initialState, { failure: true, errors: payload });
            default:
                return state;
        }
    };
    return {
        constants: constants,
        actions: actions,
        reducer: reducer
    };
};


/***/ })

/******/ });
});
//# sourceMappingURL=index.js.map
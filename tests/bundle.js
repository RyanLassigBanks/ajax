/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	ajax = __webpack_require__(1)

	function testJSON(expected, actual) {
	   let result = true
	   for (i in expected) {
	      console.log(`Expected ${i}: ${expected[i]}`)
	      console.log(`Actual ${i}: ${actual[i]}`)
	      result = result && (expected[i] === actual[i])
	   }
	   return result
	}

	// Test GET

	function testGET() {
	   let expectedResponse = {
	      "userId": 1,
	      "id": 1,
	      "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
	      "body": "quia et suscipit\n" +
	               "suscipit recusandae consequuntur expedita et cum\n" +
	               "reprehenderit molestiae ut ut quas totam\n" +
	               "nostrum rerum est autem sunt rem eveniet architecto"
	   }

	   ajax("http://jsonplaceholder.typicode.com/posts/1", {
	      method: "GET"
	   }).then((res) => {
	      testJSON(expectedResponse, JSON.parse(res)) ? console.log("PASS") : console.log("FAIL")
	   })
	}

	testGET()

	// Test PUT

	// Test POST

	// Test DELETE


/***/ },
/* 1 */
/***/ function(module, exports) {

	/**
	 * url:
	 *
	 * String representing the url the request will be sent to. Query strings should be attached
	 * if there are any
	 *
	 * option properties:
	 *
	 * method:
	 *
	 * request method (e.g. GET ,POST, PUT, DELETE, etc).
	 *
	 * headers:
	 *
	 * An object representing any headers needed by the request. The key is the header name and the
	 * value is the header value.
	 *
	 * body:
	 *
	 * Request body. The value of the body field can be an object or primitive. The value of the body
	 * will be serialized if it is not already of type "string"
	 */

	function ajax(url, options) {
	   return new Promise((resolve, reject) => {
	      let request = new XMLHttpRequest()

	      request.onreadystatechange = _ => {
	         if (request.readyState === XMLHttpRequest.DONE) {
	            if (request.status === 200 || request.status === 201) {
	               resolve(request.response)
	            } else {
	               reject({
	                  status: request.status,
	                  body: request.response
	               })
	            }
	         }
	      }

	      request.open(options.method, url)

	      // Set request headers
	      for (header in options.headers) {
	         request.setRequestHeader(header, options.headers[header])
	      }

	      // If body field isn't serialized, serialize it
	      if (options.body != null && typeof options.body !== "string") {
	         options.body = JSON.stringify(options.body)
	      }

	      request.send(options.body)
	   })
	}

	module.exports = ajax


/***/ }
/******/ ]);
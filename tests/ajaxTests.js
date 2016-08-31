ajax = require('../ajax.js')

function testJSON(expected, actual, log) {
   if (log) {
      console.log('TEST START\n\n')
      console.log('EXPECTED RESPONSE:\n\n')
      console.log(JSON.stringify(expected))
      console.log('\n\n')
      console.log('ACTUAL RESPONSE:\n\n')
      console.log(JSON.stringify(actual))
      console.log('\n\n')
   }

   let result = true
   for (i in expected) {
      result = result && (expected[i] === actual[i])
   }
   if (result) {
      console.log('TEST RESULT: PASS\n\n')
   } else {
      console.log('TEST RESULT: FAIL\n\n')
   }
   return result
}

function test(expectedResponse, promise) {
   this.expectedResponse = expectedResponse
   this.promise = promise
}

// Test GET

function testGET() {

   let expectedResponse = {
      'userId': 1,
      'id': 1,
      'title': 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      "body": 'quia et suscipit\n' +
               'suscipit recusandae consequuntur expedita et cum\n' +
               'reprehenderit molestiae ut ut quas totam\n' +
               'nostrum rerum est autem sunt rem eveniet architecto'
   }

   let promise = ajax('http://jsonplaceholder.typicode.com/posts/1', { method: 'GET' })

   return new test(expectedResponse, promise)
}

function testGETnullBody() {

   let expectedResponse = {
      'userId': 1,
      'id': 1,
      'title': 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      "body": 'quia et suscipit\n' +
               'suscipit recusandae consequuntur expedita et cum\n' +
               'reprehenderit molestiae ut ut quas totam\n' +
               'nostrum rerum est autem sunt rem eveniet architecto'
   }

   let promise = ajax('http://jsonplaceholder.typicode.com/posts/1', { method: 'GET', body: null })

   return new test(expectedResponse, promise)
}

// Test PUT

function testPUT() {

   let expectedResponse = {
      id: 1,
      title: 'foo',
      body: 'bar',
      userId: 1
   }

   let promise = ajax('http://jsonplaceholder.typicode.com/posts/1', {
      method: 'PUT',
      headers: {
         'Content-type': 'application/json'
      },
      body: expectedResponse
   })

   return new test(expectedResponse, promise)
}

// Test POST

function testPOST() {

   let expectedResponse = {
      id: 101,
      title: 'foo',
      body: 'bar',
      userId: 1
   }

   let promise = ajax('http://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
         'Content-type': 'application/json'
      },
      body: expectedResponse
   })

   return new test(expectedResponse, promise)
}

function testPOSTSerializedPayload() {

   let expectedResponse = {
      id: 101,
      title: 'foo',
      body: 'bar',
      userId: 1
   }

   let promise = ajax('http://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
         'Content-type': 'application/json'
      },
      body: JSON.stringify(expectedResponse)
   })

   return new test(expectedResponse, promise)
}

// Test DELETE

function testDELETE() {

   let expectedResponse = {}

   let promise = ajax('http://jsonplaceholder.typicode.com/posts/1', {
      method: 'DELETE',
   })

   return new test(expectedResponse, promise)
}

// Run Tests

(_ => {
   let tests = [
      testGET(),
      testGETnullBody(),
      testPUT(),
      testPOST(),
      testPOSTSerializedPayload(),
      testDELETE()
   ]

   let testCount = tests.length
   let passed = 0

   Promise.all(tests.map((e) => e.promise)).then((actualResponses) => {
      let expectedResponses = tests.map((e) => e.expectedResponse)
      for (let i = 0; i < expectedResponses.length; i++) {
         if (testJSON(expectedResponses[i], JSON.parse(actualResponses[i]), false)) {
            passed++
         }
      }
      console.log(`${passed} OUT OF ${testCount} TEST CASES PASSED`)
   })
})()

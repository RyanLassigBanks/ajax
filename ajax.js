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

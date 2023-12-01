# tests/integration/post-fragments.hurl
# Authenticated POST to /v1/fragments
POST http://localhost:8080/v1/fragments
# We're sending a plain text fragment
Content-Type: text/plain
# Include HTTP Basic Auth credentials
[BasicAuth]
user1@email.com:password1
# Body of the request goes in ```...``` when it's a string
`Hello S3!`

# 1. We expect to get back an HTTP 201
HTTP/1.1 201

# Capture the Location URL into a variable named `url`
[Captures]
url: header "Location"
idCreated: jsonpath "$.fragments.id"
size: jsonpath "$.fragments.size"
type: jsonpath "$.fragments.type"

# 3. Try to GET the fragment we just posted by its URL
GET {{url}}
[BasicAuth]
user1@email.com:password1

HTTP/1.1 200
Content-Type: text/plain
Content-Length: 9
[Asserts]
body == "Hello S3!" 

# 5. DELETE the fragment
DELETE {{url}}
[BasicAuth]
user1@email.com:password1

# We expect to get back an HTTP 200
HTTP/1.1 200

# 7. Try to GET the fragment again using the url as an authorized user.
GET {{url}}

[BasicAuth]
user1@email.com:password1

# We should get back an HTTP 1.1 404 response
HTTP/1.1 404
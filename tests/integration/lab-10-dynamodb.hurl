# tests/integration/lab-10-dynamodb.hurl
# Authenticated POST to /v1/fragments
POST http://localhost:8080/v1/fragments
# We're sending a JSON fragment
Content-Type: application/json
# Include HTTP Basic Auth credentials
[BasicAuth]
user1@email.com:password1
# Body of the request goes in ```...``` when it's a string
`{"service": "DynamoDB"}`

# 1. We expect to get back an HTTP 201
HTTP/1.1 404
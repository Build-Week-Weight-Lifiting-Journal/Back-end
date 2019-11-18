# Weight Lifting Journal - Back End

## API Documentation
**BASE URL** https://weight-lift-journal.herokuapp.com/
- Attach endpoints to the end of the base URL in order to make HTTP Requests.

### Table of Contents
Endpoints that do _**not**_ require authentication (Not Protected):

| Links           | Endpoints          |
|-----------------|--------------------|
|POST Registration| /api/auth/register |
|POST Login       | /api/auth/login    |

<hr />

## [POST] Registration
URL: https://weight-lift-journal.herokuapp.com/api/auth/registration

### Request body should include: 
| Input (Case Sensitive)           | Input Type          |
|-----------------|--------------------|
|name (required)           | string (4+ characters) |
|password (required)       | string (4+ characters)    |

_An example of how the body should appear:_

```js
{
	"username": "exampleuser",
	"password": "exampleuser"
}
```

### What will be returned:
```js
{
  "user": {
    "id": 5,
    "username": "exampleuser",
    "created_at": "2019-11-18T16:09:18.017Z",
    "updated_at": "2019-11-18T16:09:18.017Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImV4YW1wbGV1c2VyIiwiaWF0IjoxNTc0MDkzMzU3LCJleHAiOjE1NzQxMjIxNTd9.hbL6AISkyQP6IF0PF6_VuUka3fsHLCCO3SfAhvw0AEw"
}
```

<hr />

## [POST] Log In
URL: https://weight-lift-journal.herokuapp.com/api/auth/login

### Request body should include: 
| Input (Case Sensitive)           | Input Type          |
|-----------------|--------------------|
|name (required)           | string (4+ characters) |
|password (required)       | string (4+ characters)    |

_An example of how the body should appear:_

```js
{
	"username": "exampleuser",
	"password": "exampleuser"
}
```

### What will be returned:
```js
{
  "message": "Success! You are logged in!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJ0ZXN0dXNlciIsImlhdCI6MTU3NDA5MzU0NSwiZXhwIjoxNTc0MTIyMzQ1fQ.VXyAdSorktX0HcG5kwOcz7g7VC7KRhmNr-muyYJQxOw"
}
```

<hr />




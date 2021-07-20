# Passport-Tutorial

Run npm start 

Call POST: http://localhost:8000/api/users/login

with body 

```javascript
{
    "user": {
        "email": "zen",
        "password": "password"
    }
   
}
```

Extract jwt token from response cookies and add them to Postman cookie

call GET http://localhost:8000/api/users/hello
you should get Hello as response

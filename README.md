# ipapi
node+express json ip api. Get ```/``` to return IP info on the requesting IP. Get ```/123.123.123.123``` to return IP info on 123.123.123.123.

sample response:

```
{
  "ip": "123.123.123.123",
  "location": {
    "country": "CN",
    "region": "22",
    "city": "Beijing",
    "ll": [
      39.9289,
      116.3883
    ],
    "map": "https://www.google.com/maps?q=39.9289,116.3883"
  }
}
```


###run:

```
node app.js
```

###deploy:

```
git push heroku
```
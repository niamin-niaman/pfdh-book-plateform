# DB structure 
- we are using firestore 

```
{
    "usersCol" : {
        "userIdDoc" :{
            "name": "",
            "generalFile": "",
            "booksCol": [
                "bookRef1",
                "bookRef2"
            ],
            "chatsCol":{
                "userId" : {
                    "chatRef" : "ChatRef_val",
                    "userId" : "userId_val",
                },
            }
        },
    },
    "booksCol" : {
        "bookIdDoc" : {
            "name": "",
            "generalField":"",
        }
    },
    "chatsCol" : {
        "chatIdDoc" : {
            "from" : "userId",
            "message" : "bla bla"
            "timeStamp" : time
        }
    }
}
```

## Scenerio

### Sign up user

### Sign in User

### Sign out User

### Create Book post

### Edit Book post

## Delete Book post

### Start chating

### Reading chat

## Testing user

### T1

- username : test@test.test
- password : test@test.test

### T2

- username : test2@test.test
- password : test2@test.test
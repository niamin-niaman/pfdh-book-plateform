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




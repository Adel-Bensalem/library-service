## Introduction

Software to publish and distribute books, this software includes viewing and editing books and chapters, as well as adding comments.

As it is a service exported by a web server, the graphical interface that will display the data provided is interchangeable.

## Use Cases

Here is the detailed features of the software:

```
Create an Account:

    Create an account that will be needed to execute commands as an author
```

```
Access Account:

    Identify as an author, an authentification token will be provided upon success
```

```
Create a Book:

    Create a book, provide a title and a description, the book will host the upcoming chapters
```

```
Add a Chapter:

    Add a Chapter to a book, chapters are numbered from the first to the last chapter.
```

```
Edit a Book:

    Edit the content of a book
```

```
Retrieve Books:

    Retrieve books, possible to filter by title.
```

```
Retrieve Chapters:

    Retrieve book's chapters.
```

```
Comment a Chapter:

    Leave a Comment on a Chapter to help improve the chapter.
```

## Communication

The web server exposes a REST API, here is the documentation:

```
Create an Account:

    - routeName: /authors
    - method: POST
    - request:
        - data: Author
    - response:
        -
            - status: 200
            - data:
                - fullName: string
                - email: string
                - password: string
        -
            - status: 400
            - data:
                - isFullNameInvalid: boolean
                - isEmailInvalid: boolean
                - isPasswordInvalid: boolean
                - isEmailAlreadyUsed: boolean
```

```
Access Account:

    - routeName: /authors
    - method: GET
    - request:
        - params:
            - email: string
            - password: string
    - response:
        -
            - status: 200
            - data:
                - author:
                    - fullName: string;
                    - email: string;
                    - password: string;
                - accessToken: string
        -
            - status: 403
            - data:
                - isEmailInvalid: boolean
                - wasAccountNotFound: boolean;
```

```
Create a Book:

    - routeName: /books
    - method: POST
    - request:
        - headers:
            - Authorization: Bearer <accessToken>
        - data: Book
    - response:
        -
            - status: 200
            - data:
                - title: string
                - description: string
        -
            - status: 400
            - data:
                - isTitleInvalid: boolean
                - isDescriptionInvalid: boolean
```

```
Add a Chapter:

    - routeName: /chapters
    - method: POST
    - request:
        - headers:
            - Authorization: Bearer <accessToken>
        - data:
            - book:
                - title: string
                - description: string
            - chapter:
                - title: string
                - body:
                    - string
    - response:
        -
            - status: 200
            - data:
                - title: string
                - body: string[]
        -
            - status: 400
            - data:
                - isTitleInvalid: boolean
                - hasEmptyBody: boolean
```

```
Retrieve Books:

    - routeName: /books
    - method: GET
    - request:
        - params:
            - title: string
    - response:
        -
            - status: 200
            - data:
                -
                    - title: string
                    - description: string
                    - chapters:
                        -
                            - title: string
                            - number: integer
                            - body:
                                - string
```

```
Retrieve Author Books:

    - routeName: /books
    - method: GET
    - request:
        - params:
            - title: string
    - response:
        -
            - status: 200
            - data:
                -
                    - title: string
                    - description: string
                    - chapters:
                        -
                            - title: string
                            - number: integer
                            - body:
                                - string
```

```
Retrieve Chapters:

    - routeName: /books/:id/chapters
    - method: GET
    - response:
        -
            - status: 200
            - data:
                -
                    - title: string
                    - number: integer
                    - body:
                        - string
```

```
Edit a Book:

    - routeName: /books/:id
    - method: PUT
    - request:
        - headers:
            - Authorization: Bearer <accessToken>
        - data:
            - book:
                - title: string
                - description: string
            - nextBook:
                - title: string
                - description: string
    - response:
        -
            - status: 200
            - data:
                - title: string
                - description: string
                - chapters:
                    -
                        - title: string
                        - number: integer
                        - body:
                            - string
        -
            - status: 400
            - data:
                - isTitleInvalid: boolean
                - isDescriptionInvalid: boolean
```

```
Edit a Chapter:

    - routeName: /chapters/:id
    - method: PUT
    - request:
        - headers:
            - Authorization: Bearer <accessToken>
        - data:
            - chapter:
                - title: string
                - body:
                    - string
            - nextChapter:
                - title: string
                - body:
                    - string
    - response:
        -
            - status: 200
            - data:
                - title: string
                - number: integer
                - body:
                    - string
        -
            - status: 400
            - data:
                - isTitleInvalid: boolean
                - hasEmptyBody: boolean
```

## Commands

The project needs a running Mongodb instance to run. if you don't want to use Mongodb, all you have to do is, remove
Mongodb from the dependencies, and re-implement the functions in the `dataPersistence` directory.

The other commands require NodeJs and a NodeJs package manager:

```
npm run dev: Start the project in it's developement environnement
npm run start: Start the project in it's production environnement
```

## Environment variables

```
DB_NAME: Name of the used database
DB_CONNECTION_URL: Url to the running database instance
ACCESS_TOKEN_SECRET: Secret used to generate and decode the provided token upon authentication
PORT: The port on which the web server is listening
```

## Implementation

The project implementation is based on Robert C. Martin's [Clean Architecture](/https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html),
here is an explanation on the project if you want to fork this project.

---

#### Core

Clean Architecture's goal, to summarize quickly is the separation of concerns, the separation of the high level policies from the low level details,
in other words, the buisness logic and the frameworks, mediums, databases, etc...

The `core` layer is the application's most important layer as it contains all of the buisness logic, the high level rules are defined there.
this layer is separated in two parts, the `entities` and the `use cases objects`:

```
Entities:

    Entities implements the static busisness logic, which means, it implements all the logic that doesn't require automation, logic that doesn't require a computer
```

```
Use Case objects:

    Use case objects implements the busisness logic that requires automation, which means, it implements all the project's use case/features
```

The `core` layer shouldn't have any dependencies to any low level details and shouldn't be developed with them in mind,
if the business logic needs to use an external software/device/medium, it should define an [adapter](https://en.wikipedia.org/wiki/Adapter_pattern#:~:text=In%20software%20engineering%2C%20the%20adapter,be%20used%20as%20another%20interface.),
which should be implemented and injected outside the `core` layer.

---

#### Controllers

Controllers's role is simply to format the data received from the outside world and to pass it to the business logic.

#### Data persistence

This layer implements the `Repository` adapter from the business logic, it's role is to persist data. The database lives in this layer of the application.

#### Router

This layer contains the web servers REST API definitions or any communication protocol with the web.
It's only role is to somehow retrieve the clients inputs and pass it to the controller.
The router doesn't do any unnecessary checks.

#### Tools

This layer contains small components that implements the business logic's adapters

#### Main

This layer is kind of the dirty part of the application, it's role is to connect all the other layers dependencies.

# react-todo-mongodb

- Use npm module `realm-web` to store data on atlas realm (mongodb).
- Use npm module `uuid` to generate local uniqe keys instead of relying on db to create key for us. This makes the inteface snappy, as we can instantly update state without waiting on db for unique key.

# Todo List
" programmers 2019 summercoding 2nd work

## **About**

The todo list project was produced using React.js technology.The todo list gets data through infinite scrolling.To do items can be prioritized and adjusted by drag and drop.At the user's choice, the todo can have a deadline.By clicking on the todo item, you can process the completion.Alerts can be exposed for expired todo.

------

## **Core Technology**

Following technologies are used in this project (some are omitted)

Frontend

- React
- Redux
- redux-actions
- redux-pender
- immer
- Sass
- create-react-app

Backend

- Node.js
- Express
- GraphQL
- express-graphql
- graphql-custom-types
- graphql-tools
- sequelize
- Babel
- morgan
- nodemon

------

## **Getting started**

These instructions will get you a copy of the project up and runing on your local machine for development and testing purposes.

### **Prerequisites**

Develop environment

- Node.js 10^
- npm 6.4.1^
- PostgreSQL10^

### **Installing**

1. Clone the project from the github repository

   ```
    git clone https://github.com/Jo-GyuHyeon/todo_list.git
    cd todo_list
   ```

2. Install local dependencies

   Project for the client and the server separated in two different directories.

   ```
   cd todolist-backend
   npm install
   cd ../todolist-frontend
   npm install
   ```

3. `If you want to` deploy a server or test the deployment version in a localhost environment, please modify the `.env` file.

   > Currently, DB host in the development environment uses 127.0.0.1 (localhost), and DB host for deployment is
   > You are using AWS RDS db host.

   This file is resides in **todolist-backend** directory.  Input the values for the envioronment variables.

   ```
   # Server port
   PORT=4000
   # DB config 
   # Enter your db host ip ex)127.0.0.1
   DB_HOST=127.0.0.1 
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=postgres
   ```

4. The CREATE DATABASE statement is used to create a new SQL database.

   Two db for development and distribution are required.

   ```
   CREATE DATABASE todolist;
   CREATE DATABASE todolist_dev;
   ```

### **Development and Run**

For the development environment, you have to run two kind of scripts.

1. run following command from the **todolist-backend**

   ```
     npm start
   ```

- development command from the **todolist-backend**

  ```
  npm run dev
  ```

1. run following command from the **todolist-frontend**

   ```
    npm start
   ```
## Run screen
![Run screen](https://user-images.githubusercontent.com/20269425/57995657-4afeb880-7afe-11e9-9ecf-ff6ddc165794.png)
## **Questions?**

If you have any questions, leave an email to <kuhyun1993@gmail.com>

## **Authors**

- regyu - Jo Gyu Hyeon

## **License**

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/angular/angular.js/blob/master/LICENSE) file for details

## **Acknowledgments**

- Hat tip to anyone whose code was used
- Inspiration
- etc

# ShoppingApp
A shopping app built using MERN stack.
### Features
 - Supports two types of users.
 - Register and login feature for both users.
 - Use cases of Vendor:
    * Create products
    * View current product listing
    * Remove products
    * Dispatch products
    * View rating and reviews of all products
- Use cases of Customer:
   * Search products
   * Add products to cart
   * View status
   * Edit orders

### How to run
Run Mongo daemon:

```
sudo mongod
```

Mongo will be running on port 27017.

To create a database:

```
mongo
```

This will open the mongo shell. Type in `use users` to create a new database called users.

Run Express:

```
cd backend/
npm install
npm start
```

Run React:

```
cd frontend/
npm install
npm start
```

Navigate to [localhost:3000/](localhost:3000/) in your browser to use the app. 

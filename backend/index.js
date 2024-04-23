const port = 4000;
const express = require('express')
const app = express();
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const path = require('path');
const cors = require('cors')

app.use(express.json());
app.use(cors());

// Database connection with mongodb

mongoose.connect('mongodb://localhost:27017/e-commerce')

// API creation

app.get("/", (req, res) => {
    res.send("Express App is running!")
})

// Image Storage Engine

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/images');
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage })

// Creating upload endpoint for images

app.use("/images", express.static('upload/images'))

app.post("/upload", upload.single('product'), (req, res) => {
    console.log("Upload request received");
    if (!req.file) {
        console.log("No file uploaded");
        return res.status(400).json({ error: 'No file uploaded' });
    }

    // File uploaded successfully, handle the file here
    console.log('File uploaded:', req.file.filename);

    // Send response with file information
    res.json({
        success: true,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

// Schema for creating products

const Product = mongoose.model("Product", {
    id: {
        type: Number,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true,
    },
    new_price: {
        type: Number,
        require: true
    },
    old_price: {
        type: Number,
        require: true
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    available: {
        type: Boolean,
        default: true
    }
})

// Creating API For Adding Product

app.post('/addproduct', async (req, res) => {
    try {
        const productCount = await Product.countDocuments({});
        const id = productCount + 1;

        const product = new Product({
            id: id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
        });

        console.log(product);
        await product.save();
        console.log("Saved");

        res.json({
            success: true,
            name: req.body.name,
        });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ success: false, error: "Error adding product" });
    }
});

// creating API for deleting products

app.post("/removeproduct", async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id })
    console.log("Removed");
    res.json({
        success: true,
        name: req.body.name
    })
});

// Creating API For Getting all products

app.get("/allproducts", async (req, res) => {
    try {
        let products = await Product.find({});
        console.log("All Products Fetched:", products);
        res.json(products); // Send the fetched products as JSON response
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ success: false, error: "Error fetching products" });
    }
});

// Creating Schema For User Model

const Users = mongoose.model("Users", {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,
    },
    data: {
        type: Date,
        default: Date.now,
    }
})

// Creating Endpoint for registering the user

app.post("/signup", async (req, res) => {

    let check = await Users.findOne({ email: req.body.email })

    if (check) {
        return res.status(400).json({ success: false, errors: "existing user found with same email address" })
    }

    let cart = {};

    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }

    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    })

    await user.save();

    const data = {
        user: {
            id: user.id
        }
    }

    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success: true, token })

})

// Creating Endpoint for user login

app.post("/login", async (req, res) => {
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            };
            const token = jwt.sign(data, 'secret_ecom');
            res.json({ success: true, token });
        } else {
            res.json({ success: false, errors: "Wrong Password" });
        }
    } else {
        res.json({ success: false, errors: "Wrong Email Id" });
    }
});

// creating endpoint for new collection

app.get("/newcollection", async (req, res) => {
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("newcollection fecthed")
    res.send(newcollection)
})

// creating endpoint for popular women collection

app.get("/popularinomen", async (req, res) => {
    let products = await Product.find({ category: "women" });
    let popularinomen = products.slice(0, 4);
    console.log("Popular In Women Fetched");
    res.send(popularinomen)
})

// creating middleware for fetch user

const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ errors: "Please authenticate using valid token" })
    }
    else {
        try {
            const data = jwt.verify(token, 'secret_ecom')
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({ errors: "Please authenticate using valid token" })
        }
    }
}

// creating endpoint for add to cart products

app.post("/addtocart", fetchUser, async (req, res) => {
    console.log("Added", req.body.itemId);
    let userData = await Users.findOne({ _id: req.user.id })
    userData.cartData[req.body.itemId] += 1
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData })
    res.send("Added")
})

// creating endpoint for remoing product in cart data

app.post("/removefromcart", fetchUser, async (req, res) => {
    console.log("Removed", req.body.itemId);
    let userData = await Users.findOne({ _id: req.user.id })
    if (userData.cartData[req.body.itemId] > 0)
        userData.cartData[req.body.itemId] -= 1
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData })
    res.send("Removed")
})

// creating endpoint to cart data

app.post("/getcart", fetchUser, async (req, res) => {
    console.log("GetCart");
    let userData = await Users.findOne({ _id: req.user.id })
    res.json(userData.cartData)
})

// Server Listening

app.listen(port, (error) => {
    if (!error) {
        console.log("Server running on Port ", port);
    }
    else {
        console.log("Error : ", error)
    }
})
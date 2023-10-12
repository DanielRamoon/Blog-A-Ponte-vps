const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const Category = require("../models/Category");

// CREATE POST
router.post("/", async (req, res) => {
  console.log("Dados recebidos no servidor:", req.body);

  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    console.log("Erro ao salvar o post:", err);
    res.status(500).json(err);
  }
});

// UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET POST BY ID
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL POSTS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ASSIGN POST TO CATEGORY
router.post("/:postId/assign-category/:categoryId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    const category = await Category.findById(req.params.categoryId);

    if (!post || !category) {
      return res.status(404).json("Post or category not found");
    }

    // Adicione o ID da categoria ao array de categorias do post
    post.categories.push(category._id);

    // Salve as alterações no post
    await post.save();

    res.status(200).json("Post assigned to category successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET POSTS BY CATEGORY NAME
router.get("/by-category/:categoryName", async (req, res) => {
  try {
    const categoryName = req.params.categoryName;
    const posts = await Post.find({
      categories: {
        $in: [categoryName],
      },
    });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET POSTS BY CATEGORY ID
router.get("/posts-by-category/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const posts = await Post.find({
      categories: categoryId,
    });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

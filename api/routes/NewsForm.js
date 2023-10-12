const express = require("express");
const router = express.Router();
const News = require("./News");

// Endpoint para criar uma nova notícia
router.post("/news", async (req, res) => {
  try {
    const { imageUrl, title, description } = req.body;
    const newNews = new News({ imageUrl, title, description });
    const savedNews = await newNews.save();
    res.status(201).json(savedNews);
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar uma nova notícia" });
  }
});

// Endpoint para atualizar uma notícia existente
router.put("/news/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { imageUrl, title, description } = req.body;
    const updatedNews = await News.findByIdAndUpdate(
      id,
      { imageUrl, title, description },
      { new: true }
    );
    if (!updatedNews) {
      res.status(404).json({ error: "Notícia não encontrada" });
    } else {
      res.status(200).json(updatedNews);
    }
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar a notícia" });
  }
});

// Endpoint para excluir uma notícia existente
router.delete("/news/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNews = await News.findByIdAndDelete(id);
    if (!deletedNews) {
      res.status(404).json({ error: "Notícia não encontrada" });
    } else {
      res.status(200).json({ message: "Notícia excluída com sucesso" });
    }
  } catch (err) {
    res.status(500).json({ error: "Erro ao excluir a notícia" });
  }
});

// Endpoint para obter todas as notícias
router.get("/news", async (req, res) => {
  try {
    const news = await News.find();
    res.status(200).json(news);
  } catch (err) {
    res.status(500).json({ error: "Erro ao obter as notícias" });
  }
});

// Endpoint para obter uma notícia específica
router.get("/news/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const news = await News.findById(id);
    if (!news) {
      res.status(404).json({ error: "Notícia não encontrada" });
    } else {
      res.status(200).json(news);
    }
  } catch (err) {
    res.status(500).json({ error: "Erro ao obter a notícia" });
  }
});

module.exports = router;

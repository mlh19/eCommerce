const router = require('express').Router();
const { Category, Product } = require('../../models');
const { restore } = require('../../models/Product');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }]
    })
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });

    if (!categoryData) {
      res.status(404).json({ message: "No category found for that ID." });
    }

    res.status(200).json(categoryData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
    .then((newCategory) => {
      res.json(newCategory)
    })
    .catch((err) => {
      res.json(err)
    })
});

router.put('/:id', async (req, res) => {
  console.log(req);
  try {
    const updateCategory = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    // 
    console.log(updateCategory);
    res.status(200).json(updateCategory);
  }
  catch (err) {
    res.status(500).json(err);
  }
  // .then(updatedCategory => res.json(updatedCategory))
  // .catch(err => res.status(400).json(err));
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then((deletedCategory) => {
      res.json(deletedCategory)
    })
    .catch(err => res.status(400).json(err));
});

module.exports = router;
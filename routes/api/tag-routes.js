const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: ProductTag }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: ProductTag }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(404).json("Unable to find tag with that id.")
  }
});

router.post('/', (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create({
      tag_id: req.body.tag_id,
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.put({
      tag_id: req.body.tag_id,
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagData) {
      res
        .status(400)
        .json({ message: "No tag exists associated with the inputted ID." });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

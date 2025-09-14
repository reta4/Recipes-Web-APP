import Recipe from "../model/recipeModel.js";
//...................................................................................................
const createRecipe = async (req, res) => {
  const { title, ingredients, category, photoUrl, cookingTime, instructions } =
    req.body;
  try {
    if (!title || !ingredients || !category || !photoUrl || !cookingTime)
      return res.status(400).json({ message: "please fill all the fields" });
    const newRecipe = await new Recipe({
      title,
      ingredients,
      category,
      photoUrl,
      cookingTime,
      instructions,
      createdBy: req.user._id,
    });

    await newRecipe.save();
    res
      .status(201)
      .json({ message: "new recipe created successfully", recipe: newRecipe });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
};

//...................................................................................................

const getByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    let recipes;
    if (category === "All") {
      recipes = await Recipe.find();
    } else {
      recipes = await Recipe.find({ category: category });
    }

    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: "server error " });
  }
};

//...................................................................................................

const getRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    res.status(200).json(recipe);
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};

//...................................................................................................
const getAll = async (req, res) => {
  try {
    const recipe = await Recipe.find({});
    res.status(200).json(recipe);
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};

//...................................................................................................

const updateRecipe = async (req, res) => {
  try {
    const {
      title,
      ingredients,
      category,
      photoUrl,
      cookingTime,
      instructions,
    } = req.body;

    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "recipe not found" });

    console.log(category);
    await recipe.updateOne({
      title,
      ingredients,
      category: category || recipe.category,
      photoUrl,
      instructions,
      cookingTime,
    });
    const updatedRcipe = await recipe.save();
    res.status(201).json(updatedRcipe);
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};

//...................................................................................................

const getRecipeBycreator = async (req, res) => {
  try {
    const { id } = req.params;

    const recipes = await Recipe.find({ createdBy: id });
    if (!recipes) return res.status(404).json({ message: "recipe not found" });
    res.status(200).json({ recipes });
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};

//...................................................................................................

const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "recipe not found" });
    await recipe.deleteOne();
    res.status(200).json({ message: "recipe deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
};
export {
  getAll,
  createRecipe,
  getRecipe,
  getByCategory,
  updateRecipe,
  deleteRecipe,
  getRecipeBycreator,
};

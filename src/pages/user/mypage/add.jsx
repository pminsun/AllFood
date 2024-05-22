import styles from "@/styles/User.module.css";
import Image from "next/image";
import { useState } from "react";
import { HiOutlinePlusSm, HiOutlineMinusSm } from "react-icons/hi";

export default function MyListAdd() {
  const [recipeName, setRecipeName] = useState("");
  //const [ingredients, setIngredients] = useState([{ id: 0 }]);
  const [ingredients, setIngredients] = useState([
    { id: 0, name: "", quantity: "", unit: "단위" },
  ]);
  const [submitImage, setSubmitImage] = useState("");
  const [recipeInstructions, setRecipeInstructions] = useState("");

  const handleRecipeName = (e) => {
    setRecipeName(e.target.value);
  };

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      { id: ingredients.length, name: "", quantity: "", unit: "단위" },
    ]);
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = ingredients.map((ingredient, i) =>
      i === index ? { ...ingredient, [field]: value } : ingredient
    );
    setIngredients(newIngredients);
  };

  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setSubmitImage(imageUrl);
  };

  const handleInstructionsChange = (e) => {
    setRecipeInstructions(e.target.value);
  };

  const submitRecipe = (e) => {
    e.preventDefault();
    const recipeData = {
      recipeName,
      ingredients,
      image: submitImage,
      instructions: recipeInstructions,
    };
    console.log(recipeData);
  };

  const IngredientInput = ({ ingredient, index }) => {
    const selectList = ["단위", "개", "장", "g", "ml", "L", "컵", "스푼"];

    return (
      <div className={styles.ing_add_area} key={index}>
        <div className={styles.ing_add_input_area}>
          <input
            placeholder="재료"
            value={ingredient.name}
            onChange={(e) =>
              handleIngredientChange(index, "name", e.target.value)
            }
          />
          <input
            placeholder="양"
            value={ingredient.quantity}
            onChange={(e) =>
              handleIngredientChange(index, "quantity", e.target.value)
            }
          />
          <select
            onChange={(e) =>
              handleIngredientChange(index, "unit", e.target.value)
            }
            value={ingredient.unit}
          >
            {selectList.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.ing_add_btn}>
          <button type="button" onClick={addIngredient}>
            <HiOutlinePlusSm />
          </button>
          {index !== 0 && (
            <button type="button" onClick={() => removeIngredient(index)}>
              <HiOutlineMinusSm />
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <section className={`first_content`}>
      <section className="layout_size">
        <div>
          <h2 className={styles.page_title}>MY PAGE</h2>
          <p className={styles.page_info}>
            나만의 레시피를 AllFood 계정을 통해 기록하세요.
          </p>
        </div>
        <section>
          <h3 className={styles.add_title}>레시피 추가</h3>
          <form onSubmit={submitRecipe} className={styles.add_form}>
            <input
              className={styles.recipe_name}
              onChange={handleRecipeName}
              value={recipeName}
              placeholder="레시피 이름"
            />
            {ingredients.map((ingredient, index) => (
              <IngredientInput
                key={ingredient.id}
                ingredient={ingredient}
                index={index}
              />
            ))}
            <div className={styles.recipe_photo_text_area}>
              <div className={styles.recipe_photo}>
                <label htmlFor="imgSubmit">
                  {submitImage.length === 0 && "이미지 등록"}
                  {submitImage && (
                    <Image
                      alt="등록이미지"
                      src={submitImage.toString()}
                      className="pre-img"
                      width={400}
                      height={400}
                    />
                  )}
                </label>
                <input
                  onChange={handleChangeFile}
                  id="imgSubmit"
                  type="file"
                  accept="image/*"
                />
              </div>
              <textarea
                className={styles.recipe_text}
                onChange={handleInstructionsChange}
                value={recipeInstructions}
                placeholder={`레시피순서 작성 시 마침표 구분해주세요\n예) 당근, 양파는 잘게 다지고 실파는 송송 썰어주세요.`}
              ></textarea>
            </div>
            <button className={styles.form_add_btn}>추가</button>
          </form>
        </section>
      </section>
    </section>
  );
}

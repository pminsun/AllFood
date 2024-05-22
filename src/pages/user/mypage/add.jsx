import styles from "@/styles/User.module.css";
import { useState } from "react";
import { HiOutlinePlusSm, HiOutlineMinusSm } from "react-icons/hi";

export default function MyListAdd() {
  const [ingredients, setIngredients] = useState([{ id: 0 }]);

  const addIngredient = () => {
    setIngredients([...ingredients, { id: ingredients.length }]);
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const IngredientInput = ({ index }) => {
    const selectList = ["단위", "개", "장", "g", "ml", "L", "컵", "스푼"];
    const [Selected, setSelected] = useState("단위");

    const handleSelect = (e) => {
      setSelected(e.target.value);
    };

    const [ingredientName, setIngredientName] = useState("");
    const textIngredient = (e) => {
      setIngredientName(e.target.value);
    };

    const [ingredientNum, setIngredientNum] = useState(0);
    const numIngredient = (e) => {
      setIngredientNum(e.target.value);
    };

    return (
      <div className={styles.ing_add_area} key={index}>
        <div className={styles.ing_add_input_area}>
          <input
            placeholder="재료"
            value={ingredientName}
            onChange={textIngredient}
          />
          <input
            placeholder="양"
            value={ingredientNum}
            onChange={numIngredient}
          />
          <select onChange={handleSelect} value={Selected}>
            {selectList.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.ing_add_btn}>
          <button type="text" onClick={addIngredient}>
            <HiOutlinePlusSm />
          </button>
          {index !== 0 && (
            <button type="text" onClick={() => removeIngredient(index)}>
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
          <form className={styles.add_form}>
            {ingredients.map((ingredient, index) => (
              <IngredientInput key={ingredient.id} index={index} />
            ))}
            <div className={styles.recipe_photo_text_area}>
              <div className={styles.recipe_photo}>
                <input type="image" />
              </div>
              <textarea className={styles.recipe_text}></textarea>
            </div>
            <button className={styles.form_add_btn}>추가</button>
          </form>
        </section>
      </section>
    </section>
  );
}

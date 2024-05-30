import styles from "@/styles/User.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { HiOutlinePlusSm, HiOutlineMinusSm } from "react-icons/hi";
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, fireStore } from "../../../../firebase/firebasedb";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";

// 레시피 재료
const IngredientInput = ({
  ingredient,
  index,
  handleIngredientChange,
  addIngredient,
  removeIngredient,
}) => {
  const selectList = [
    "단위",
    "개",
    "장",
    "g",
    "ml",
    "L",
    "컵",
    "스푼",
    "큰술",
    "작은술",
  ];

  return (
    <div className={styles.ing_add_area} key={ingredient.id}>
      <div className={styles.ing_add_input_area}>
        <input
          placeholder="재료"
          value={ingredient.text}
          onChange={(e) =>
            handleIngredientChange(index, "text", e.target.value)
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
            handleIngredientChange(index, "measure", e.target.value)
          }
          value={ingredient.measure}
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

export default function MyListAdd({ query }) {
  const [load, setLoad] = useState(false);
  const router = useRouter();
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState([
    { id: 0, text: "", quantity: "", measure: "단위" },
  ]);
  const [submitImage, setSubmitImage] = useState("");
  const [submitImageType, setSubmitImageType] = useState("");
  const [showImage, setShowImage] = useState("");
  const [recipeInstructions, setRecipeInstructions] = useState("");
  const [submitTxt, setSubmitTxt] = useState("추가");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoad(true);
  }, []);

  // 현재 로그인 정보
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  // page type
  const [data, setData] = useState(null);
  useEffect(() => {
    if (query.type === "edit" && query.id && load && currentUser) {
      setSubmitTxt("수정");
      const fetchData = async () => {
        const docRef = doc(
          fireStore,
          `users/${currentUser?.uid}/myrecipes`,
          query.id
        );
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData(docSnap.data());
        }
      };

      fetchData();
    } else if (query.type === "add") {
      setSubmitTxt("추가");
    }
  }, [load, currentUser, query.type, query.id]);

  useEffect(() => {
    if (data) {
      setIngredients(data?.ingredients);
      setRecipeName(data?.name);
      setRecipeInstructions(data?.recipe);
    } else {
      setIngredients([{ id: 0, text: "", quantity: "", measure: "단위" }]);
      setRecipeName("");
      setRecipeInstructions("");
    }
  }, [data]);

  const handleRecipeName = (e) => {
    setRecipeName(e.target.value);
  };

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      { id: ingredients.length, text: "", quantity: "", measure: "단위" },
    ]);
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleIngredientChange = (fiedlIndex, field, value) => {
    const newIngredients = ingredients.map((ingredient, i) =>
      ingredient.id === fiedlIndex
        ? { ...ingredient, [field]: value }
        : ingredient
    );
    setIngredients(newIngredients);
  };

  // 이미지 show
  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setSubmitImageType(file.type);
    setSubmitImage(file.name);
    setShowImage(imageUrl);
  };

  // 레시피 작성
  const handleInstructionsChange = (e) => {
    const content = e.target.value;
    setRecipeInstructions(content);
  };

  // 레시피 추가
  const submitRecipe = async (e) => {
    e.preventDefault();
    setLoading(true);
    const storage = getStorage();
    const metadata = {
      contentType: submitImageType,
    };

    const uploadFileName = uuid() + submitImage;

    try {
      if (!submitImage) return;

      const imageRef = ref(
        storage,
        `myrecipe/${currentUser.uid}_${uploadFileName}`
      );

      // 파일 내용을 읽습니다
      const file = document.getElementById("imgSubmit").files[0];
      if (!file) {
        console.error("파일이 선택되지 않았습니다");
        return;
      }

      // 파일을 업로드하고 업로드가 완료될 때까지 기다립니다
      await uploadBytes(imageRef, file, metadata);
      const downloadURL = await getDownloadURL(imageRef);

      // 레시피 데이터를 준비합니다
      const recipeData = {
        imageId: uploadFileName,
        name: recipeName,
        ingredients,
        image: downloadURL,
        recipe: recipeInstructions,
      };

      // 레시피 데이터를 Firestore에 저장합니다
      await addDoc(
        collection(fireStore, `users/${currentUser.uid}/myrecipes`),
        recipeData
      );
      setLoading(false);
      router.push("/user/mypage");
    } catch (error) {
      console.error("레시피 추가 중 오류 발생: ", error);
    }
  };

  // 레시피 업데이트
  const updateRecipe = async (e) => {
    e.preventDefault();
    setLoading(true);
    const storage = getStorage();
    let downloadURL = data.image; // 기본값으로 기존 이미지 URL 사용
    const metadata = {
      contentType: submitImageType,
    };

    try {
      if (submitImage) {
        const uploadFileName = uuid() + submitImage.name;
        const imageRef = ref(
          storage,
          `myrecipe/${currentUser.uid}_${uploadFileName}`
        );

        // 파일을 업로드하고 업로드가 완료될 때까지 기다립니다
        await uploadBytes(imageRef, submitImage, metadata);
        downloadURL = await getDownloadURL(imageRef);
      }

      // 레시피 데이터를 준비합니다
      const recipeData = {
        name: recipeName,
        ingredients,
        image: downloadURL,
        recipe: recipeInstructions,
      };

      // 레시피 데이터를 Firestore에 업데이트합니다
      const docRef = doc(
        fireStore,
        `users/${currentUser.uid}/myrecipes`,
        query.id
      );
      await updateDoc(docRef, recipeData);
      setLoading(false);
      router.push("/user/mypage");
    } catch (error) {
      console.error("레시피 업데이트 중 오류 발생: ", error);
    }
  };

  return (
    <>
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
            <form
              onSubmit={submitTxt === "추가" ? submitRecipe : updateRecipe}
              className={styles.add_form}
            >
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
                  handleIngredientChange={handleIngredientChange}
                  addIngredient={addIngredient}
                  removeIngredient={removeIngredient}
                />
              ))}

              <div className={styles.recipe_photo_text_area}>
                <div className={styles.recipe_photo}>
                  <label htmlFor="imgSubmit">
                    {!showImage && !data?.image && "이미지 등록"}
                    {(showImage || data?.image) && (
                      <Image
                        alt="등록이미지"
                        src={data ? data.image : showImage}
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
              <button className={styles.form_add_btn}>{submitTxt}</button>
            </form>
          </section>
        </section>
      </section>
      {loading && (
        <>
          <div className="loaderBox">
            <Loading />
          </div>
          <div className="modalBox_bg" />
        </>
      )}
    </>
  );
}
export async function getServerSideProps(context) {
  const { query } = context;
  return {
    props: { query },
  };
}

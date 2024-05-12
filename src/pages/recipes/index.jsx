import { useRouter } from "next/router";
import { useEffect } from "react";
import { HiArrowRight } from "react-icons/hi";
import styles from "@/styles/List.module.css";
import { testData } from "../../../lib/test";
import Image from "next/image";

export default function Recipes({ query }) {
  //const [recipesList, setRecipesList] = useState({});

  const fetchData = async () => {
    // const response = await fetch(
    //   `https://api.edamam.com/search?q=${query.food}&app_id=${process.env.NEXT_PUBLIC_APP_ID}&app_key=${process.env.NEXT_PUBLIC_APP_KEY}`
    // );
    // const jsonData = await response.json();
    // console.log(jsonData);
    //setRecipesList(jsonData);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(query);

  return (
    <section className={`first_content`}>
      <section className="layout_size">
        <div className={styles.recipe_name}>
          <h2 className={styles.recipe_name}>{query.food || ""} Recipes</h2>
          {query.food && (
            <p>
              10,000 <span>건</span>
            </p>
          )}
        </div>
        <div className={styles.search}>
          <input
            id="search"
            placeholder="원하는 요리 또는 식재료를 검색하세요"
          />
          <button>
            <HiArrowRight />
          </button>
        </div>
        <section className={styles.recipes}>
          {testData.hits.map((item, index) => (
            <div key={index}>
              <div className="image_area">
                <Image
                  src={"/image/listTest.jpg"}
                  alt="photo"
                  width={200}
                  height={200}
                />
              </div>
              <p className="item_name">{item.label}</p>
            </div>
          ))}
        </section>
        <section className={styles.pagination}>1</section>
      </section>
    </section>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  return {
    props: { query },
  };
}

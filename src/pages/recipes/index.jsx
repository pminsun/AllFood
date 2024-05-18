import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HiArrowRight, HiArrowSmLeft } from "react-icons/hi";
import styles from "@/styles/List.module.css";
import List from "@/components/List";
import { commaThousand } from "@/config";
import Loading from "./../../components/Loading";

export default function Recipes({ query }) {
  const router = useRouter();
  const [searchTxt, setSearchTxt] = useState("");
  const moveToRecipes = (food) => {
    return () => {
      if (food.length > 0) {
        router.replace({
          pathname: "/recipes",
          query: { food: food },
        });
      }
    };
  };

  const [recipesList, setRecipesList] = useState([]);
  const [totalReciepeLength, setTotalReciepeLength] = useState(0);
  const [nextPageLink, setNextPageLink] = useState("");
  const [previousPageLink, setPreviousPageLink] = useState("");
  const [recipesLoading, setRecipesLoading] = useState(false);

  const fetchRecipes = async (prev) => {
    let url = `https://api.edamam.com/api/recipes/v2?type=public&q=${query.food}&app_id=${process.env.NEXT_PUBLIC_APP_ID}&app_key=${process.env.NEXT_PUBLIC_APP_KEY}`;

    if (prev?.length > 0) {
      url += `&_cont=${prev}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    setRecipesLoading(true);
    const fetchData = async () => {
      const newRecipes = await fetchRecipes();

      setRecipesList(newRecipes.hits);
      setTotalReciepeLength(newRecipes.count);
      setNextPageLink(newRecipes?._links?.next.href);
      setPreviousPageLink(
        newRecipes._links?.previous
          ? newRecipes._links.previous.href
              .split("_cont=")[1]
              .split("&type=")[0]
          : ""
      );

      setRecipesLoading(false);
    };

    query.food && fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.food]);

  const fetchNewRecipes = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  const handleNextPage = async () => {
    setRecipesLoading(true);
    const newRecipes = await fetchNewRecipes(nextPageLink);
    setRecipesList(newRecipes.hits);
    setNextPageLink(newRecipes._links.next.href);
    setRecipesLoading(false);
  };

  const handlePreviousPage = async () => {
    // 이전 페이지 링크가 빈 문자열이면 첫 번째 페이지로 간주하여 새로운 요청을 보냄
    const previousRecipes = previousPageLink
      ? await fetchRecipes(previousPageLink)
      : await fetchRecipes();
    setRecipesList(previousRecipes.hits);
    setNextPageLink(previousRecipes._links.next.href);
  };

  return (
    <section className={`first_content`}>
      <section className="layout_size">
        <div className={styles.recipe_name}>
          <h2>{query.food || ""} Recipes</h2>
          {query.food && (
            <p>
              {commaThousand(totalReciepeLength)} <span>건</span>
            </p>
          )}
        </div>
        <div className={styles.search}>
          <input
            id="search"
            onChange={(e) => setSearchTxt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                moveToRecipes(searchTxt)();
              }
            }}
            placeholder="원하는 요리 또는 식재료를 검색하세요"
          />
          <button onClick={moveToRecipes(searchTxt)}>
            <HiArrowRight />
          </button>
        </div>
        {recipesLoading && query.food && (
          <div className={styles.loadingArea}>
            <Loading />
          </div>
        )}
        {query.food && (
          <>
            <section className={styles.recipes}>
              {recipesList?.map((recipe, index) => (
                <List key={recipe.recipe.labe} recipe={recipe} />
              ))}
            </section>
            <section className={styles.pagination}>
              <button onClick={handlePreviousPage}>
                <HiArrowSmLeft /> Previous
              </button>

              <button onClick={handleNextPage}>
                Next <HiArrowRight />
              </button>
            </section>
          </>
        )}
        {!query.food && (
          <section className={styles.noneRecipes}>
            <p>원하는 요리 또는 식재료를 검색하세요</p>
          </section>
        )}
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

import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Recipes({ query }) {
  //const [recipesList, setRecipesList] = useState({});

  const fetchData = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query.food}&app_id=${process.env.NEXT_PUBLIC_APP_ID}&app_key=${process.env.NEXT_PUBLIC_APP_KEY}`
    );
    const jsonData = await response.json();
    console.log(jsonData);
    //setRecipesList(jsonData);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={`first_content`}>
      <section className="layout_size">Recipes</section>
    </section>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  return {
    props: { query },
  };
}

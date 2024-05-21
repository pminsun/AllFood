import { useEffect, useState } from "react";
import styles from "@/styles/User.module.css";
import { fireStore, fireStorage } from "../../firebase/firebasedb";
import { collection, getDocs } from "firebase/firestore";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import Image from "next/image";
import Link from "next/link";

export default function MyList() {
  const [recipesList, setRecipesList] = useState([]);
  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(fireStore, "myrecipe"));
    const data = querySnapshot.docs.map((doc) => doc.data());
    setRecipesList(data);
  };

  const [urlImage, setUrlImage] = useState("");
  const fetchImage = async () => {
    const fileRef = ref(fireStorage, "myrecipe/");
    const result = await listAll(fileRef);
    const urls = await Promise.all(
      result.items.map(async (item) => {
        const url = await getDownloadURL(item);
        return url;
      })
    );
    setUrlImage(urls);
  };

  useEffect(() => {
    fetchData();
    fetchImage();
  }, []);

  return (
    <div className={styles.myList_area}>
      {recipesList.map((item, index) => (
        <Link
          href={{
            pathname: `/user/mypage/${item.name}`,
            query: {
              img:
                urlImage &&
                urlImage.find((img) => img.includes(item.image)).split("%")[1],
            },
          }}
          key={index}
        >
          <div className={styles.item_img}>
            {urlImage &&
              urlImage.map(
                (img) =>
                  img.includes(item.image) && (
                    <Image
                      key={img}
                      src={img}
                      alt="pasta"
                      width={208}
                      height={200}
                    />
                  )
              )}
          </div>
          <p className={styles.item_name}>{item.name}</p>
        </Link>
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const fileRef = ref(fireStorage, "coverImage/");
  // coverImage/ 하위에 있는 모든 파일에 대한 참조
  const result = await listAll(fileRef);
  const urls = await Promise.all(
    result.items.map(async (item) => {
      const url = await getDownloadURL(item);
      return url;
    })
  );

  console.log(urls);

  return {
    props: {
      images: urls,
    },
  };
}

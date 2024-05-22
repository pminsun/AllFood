import styles from "@/styles/User.module.css";
import Image from "next/image";
import { fireStore } from "../../../../firebase/firebasedb";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";

export default function MyListDetail({ query }) {
  const [filteredData, setFilteredData] = useState([]);
  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(fireStore, "myrecipe"));
    const data = querySnapshot.docs.map((doc) => doc.data());
    const filtered = data.filter(
      (item) => item.name.toLowerCase() === query.id[0].toLowerCase()
    );
    setFilteredData(filtered);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className={`first_content`}>
      <section className="layout_size">
        <div>
          <h2 className={styles.page_title}>MY PAGE</h2>
          <p className={styles.page_info}>
            나만의 레시피를 AllFood 계정을 통해 기록하세요.
          </p>
        </div>
        <section className={styles.myListDetail_area}>
          <div className={styles.myListImage_area}>
            <Image
              src={`https://firebasestorage.googleapis.com/v0/b/allfood-ffab0.appspot.com/o/myrecipe%${query.img}`}
              alt="img"
              width={400}
              height={400}
            />
          </div>
          <div>
            {filteredData.map((item, index) => (
              <React.Fragment key={index}>
                <div className={styles.item_name_area}>
                  <h3>{item.name}</h3>
                  <div className={styles.tabTitle_btn_area}>
                    <p className={styles.tabTitle_btn}>수정</p>
                    <p className={styles.tabTitle_btn}>삭제</p>
                  </div>
                </div>
                <div className={styles.ing_area}>
                  <p className={styles.item_sub}>재료</p>
                  <ul className={styles.ing_list_area}>
                    {item.ingredients.map((ing, index) => (
                      <li key={index + "ing"} className={styles.item_list}>
                        <span>{ing.text}</span>
                        <div>
                          <span>{ing.quantity}</span>
                          <span>{ing.measure}</span>
                        </div>
                        <span>|</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={styles.reci_area}>
                  <p className={styles.item_sub}>레시피</p>
                  <ul className={styles.reci_list_area}>
                    {item.recipe.map((reci, index) => (
                      <li key={index + "recipe"} className={styles.reci_list}>
                        <p>
                          <span>{index + 1}.</span>
                          {reci}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </React.Fragment>
            ))}
          </div>
        </section>
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

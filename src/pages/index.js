import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { HiArrowRight } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [searchTxt, setSearchTxt] = useState("");
  const moveToRecipes = (food) => {
    return () => {
      router.push({
        pathname: "/recipes",
        query: { food: food },
      });
    };
  };

  return (
    <>
      <main className={`${styles.main}}`}>
        <section className={`${styles.mainfirst} first_content`}>
          <div className="layout_size">
            <h2 className={styles.title}>
              HELP YOU FIND BEST <p>FOOD RECIPES</p>
            </h2>
            <div className={styles.search}>
              <input
                id="search"
                onChange={(e) => setSearchTxt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    moveToRecipes(searchTxt)();
                  }
                }}
                placeholder="원하는 요리를 영문으로 검색하세요"
              />
              <button onClick={moveToRecipes(searchTxt)}>
                <HiArrowRight />
              </button>
            </div>
          </div>
        </section>
        <section className={`${styles.mainsecond} layout_size`}>
          <div className={styles.infoText}>
            <h3>
              Food ingredients with a lot of <br />
              recipes
            </h3>
            <div>
              <p>
                10,000가지가 넘는 다양한 레시피를 활용하여 신선한 재료로 만든
                요리들을 즐기며, 맛있는 음식과 함께 특별한 식사 시간을 보내세요.
              </p>
            </div>
          </div>
          <div className={styles.infoList}>
            <div onClick={moveToRecipes("pasta")}>
              <div className="list_img">
                <Image
                  src={"/image/pasta.avif"}
                  alt="pasta"
                  width={500}
                  height={540}
                />
              </div>
              <div className="list_name">
                <p>PASTA</p>
                <div className={styles.listInfo}>
                  <div>
                    <p>288 kcal</p>
                    <p>100g</p>
                  </div>
                  <ul className="nutrients">
                    <li>PROTEIN 11g</li>
                    <li>FAT 2g</li>
                    <li>CARB 54g</li>
                  </ul>
                </div>
              </div>
            </div>
            <div onClick={moveToRecipes("pork")}>
              <div className="list_img">
                <Image
                  src={"/image/pork.avif"}
                  alt="pork"
                  width={500}
                  height={540}
                />
              </div>
              <div className="list_name">
                <p>PORK</p>
                <div className={styles.listInfo}>
                  <div>
                    <p>198 kcal</p>
                    <p>100g</p>
                  </div>
                  <ul className="nutrients">
                    <li>PROTEIN 19g</li>
                    <li>FAT 12g</li>
                    <li>CARB 0g</li>
                  </ul>
                </div>
              </div>
            </div>
            <div onClick={moveToRecipes("egg")}>
              <div className="list_img">
                <Image
                  src={"/image/egg.avif"}
                  alt="egg"
                  width={500}
                  height={540}
                />
              </div>
              <div className="list_name">
                <p>EGG</p>
                <div className={styles.listInfo}>
                  <div>
                    <p>143 kcal</p>
                    <p>100g</p>
                  </div>
                  <ul className="nutrients">
                    <li>PROTEIN 12g</li>
                    <li>FAT 9g</li>
                    <li>CARB 0g</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={`${styles.mainthird} layout_size`}>
          <div className={styles.infoText}>
            <h3>
              Top Food <br />
              Curator
            </h3>
          </div>
          <div className={styles.rankerList}>
            <div className={styles.topRanker}>
              <div></div>
              <div></div>
            </div>
            <div className={styles.otherRanker}>
              <div>
                <div>
                  <p>Itis along</p>
                </div>
                <div className="ranker_img"></div>
              </div>
              <div>
                <div>
                  {" "}
                  <p>Itis along</p>
                </div>
                <div className="ranker_img"></div>
              </div>
              <div>
                <div>
                  {" "}
                  <p>Itis along</p>
                </div>
                <div className="ranker_img"></div>
              </div>
            </div>
          </div>
        </section>
        <section className={`${styles.mainfourth} layout_size`}>
          <div className={styles.fourthLeft}>
            <p className="fourth_title">
              EXPERIENCE OF <br />
              REAL RECIPES <br />
              TASTE
            </p>
            <div className="fourth_info">
              <div></div>
              <p>
                It is a long established fact that a reader will be distracted
              </p>
              <div>VIEW ALL</div>
            </div>
          </div>
          <div className="recipes_img"></div>
        </section>
        <section className={`${styles.mainfifth} layout_size`}>
          <div>
            <p>Check your nutrition</p>
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
          </div>
          <div></div>
        </section>
      </main>
    </>
  );
}

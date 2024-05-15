import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Home.module.css";
import { HiArrowRight } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQueries, useQuery } from "@tanstack/react-query";
import { commaThousand, dateFormat } from "@/config";
import Lottie from "react-lottie-player";
import nutritionCheck from "../../public/ani/nutrition_check.json";

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

  // mainCookingYoutuber - 최신동영상
  const { data: mainVideo } = useQuery({
    queryKey: ["firstYoutubeVideo"],
    queryFn: () =>
      fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?key=${process.env.NEXT_PUBLIC_YOUTUBE_APP_KEY}&part=snippet,contentDetails,id&playlistId=PLoABXt5mipg6mIdGKBuJlv5tmQFAQ3OYr&maxResults=1`
      ).then((res) => res.json()),
  });

  // mainCookingYoutuber - 구독수, 동영상 수
  const channelsList = [
    { id: "UCyn-K7rZLXjGl7VXGweIlcA" },
    { id: "UCFiYPUhUzLKoi-cZ0AwpjLA" },
    { id: "UCPWFxcwPliEBMwJjmeFIDIg" },
    { id: "UCC8bTxyN2ZCfMzS_JAEClfA" },
  ];

  const fetchChannelData = async ({ id, regionCode }) => {
    const res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/channels?part=statistics&id=${id}&regionCode=KR&maxResults=10&key=${process.env.NEXT_PUBLIC_YOUTUBE_APP_KEY}`
    );
    return res.json();
  };

  const combinedQueries = useQueries({
    queries: channelsList.map((channel) => ({
      queryKey: ["channelData", channel.id],
      queryFn: () => fetchChannelData(channel),
    })),
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
      };
    },
  });

  return (
    <>
      <main className={`${styles.main}}`}>
        <section className={`${styles.mainSearch} first_content`}>
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
                placeholder="원하는 요리 또는 식재료를 영문으로 검색하세요"
              />
              <button onClick={moveToRecipes(searchTxt)}>
                <HiArrowRight />
              </button>
            </div>
          </div>
        </section>
        <section className={`${styles.mainLotOfIngredients} layout_size`}>
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
                  priority
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

        <section className={`${styles.mainRecommendByWeather} layout_size`}>
          {/* 날씨에 따른 추천음식 -  https://ai-creator.tistory.com/31 */}
          <div className={styles.recommendLeft}>
            <p className="recommend_title">
              TODAY&apos;s <br />
              RECOMMENDATION RECIPE <br />
              ACCORDING TO THE WEATHER
            </p>
            <div className="recommend_info">
              <p>
                오늘은 쌀쌀한 날씨네요. 이런 날씨에는 따뜻한 칼국수가
                어떠신가요? <br />
                몸도 마음도 따뜻해지는 맛있는 식사를 즐겨보세요.
              </p>
            </div>
          </div>
          <div className="recipes_img"></div>
        </section>

        <section className={`${styles.mainCookingYoutuber} layout_size`}>
          {/* https://velog.io/@kknyapple/%ED%95%A0%EB%8B%B9%EB%9F%89-%EC%83%9D%EA%B0%81%ED%95%98%EB%A9%B0-YouTube-API%EB%A1%9C-%EC%9B%90%ED%95%98%EB%8A%94-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EC%96%BB%EA%B8%B0 */}
          <div className={styles.infoText}>
            <h3>
              Top Cooking <br />
              YouTube
            </h3>
            <div>
              <p>
                유명한 요리 유투버의 레시피를 따라해보세요. 유투버의 요리로
                새로운 맛을 경험해보는 재미를 느껴보세요
              </p>
            </div>
          </div>
          <div className={styles.rankerList}>
            <div className={styles.topRanker}>
              <div>
                <Image
                  src={"/image/youtube1.jpg"}
                  alt="youtube1"
                  width={110}
                  height={110}
                />
                <div className="topranker_info">
                  <p>백종원 PAIK JONG WON</p>
                  <p>
                    구독자{" "}
                    {commaThousand(
                      +combinedQueries.data[0]?.items[0].statistics
                        .subscriberCount
                    )}
                    명 | 동영상{" "}
                    {combinedQueries.data[0]?.items[0].statistics.videoCount}개
                  </p>
                </div>
                <div className="topranker_channel">
                  <Link
                    target="_blank"
                    href={"https://www.youtube.com/@paik_jongwon"}
                  >
                    <p>
                      go to <br /> channel
                    </p>
                  </Link>
                </div>
              </div>
              <div className="recent_video">
                {mainVideo && (
                  <iframe
                    id="ytplayer"
                    type="text/html"
                    width="320"
                    height="180"
                    src={`https://www.youtube.com/embed/${mainVideo?.items[0].contentDetails.videoId}`}
                    allowFullScreen
                  ></iframe>
                )}
                <div className="video_info">
                  <span className="view">
                    <Link
                      target="_blank"
                      href={
                        "https://www.youtube.com/playlist?list=PLoABXt5mipg6mIdGKBuJlv5tmQFAQ3OYr"
                      }
                    >
                      View More
                    </Link>
                  </span>
                  <div>
                    <p>최근 동영상</p>
                    <p>{mainVideo?.items[0].snippet.title}</p>
                    <p>{dateFormat(mainVideo?.items[0].snippet.publishedAt)}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.otherRanker}>
              <Link
                target="_blank"
                href={"https://www.youtube.com/@deliciousday1"}
              >
                <div className="ranker_info">
                  <p>매일맛나 delicious day</p>
                  <p>
                    구독자{" "}
                    {commaThousand(
                      +combinedQueries.data[1]?.items[0].statistics
                        .subscriberCount
                    )}
                    명 | 동영상{" "}
                    {combinedQueries.data[1]?.items[0].statistics.videoCount}개
                  </p>
                </div>
                <div className="ranker_img">
                  <Image
                    src={"/image/youtube2.jpg"}
                    alt="youtube2"
                    width={80}
                    height={80}
                  />
                </div>
              </Link>

              <Link
                target="_blank"
                href={"https://www.youtube.com/@onemealaday767"}
              >
                <div className="ranker_info">
                  <p>하루한끼 one meal a day</p>
                  <p>
                    구독자{" "}
                    {commaThousand(
                      +combinedQueries.data[2]?.items[0].statistics
                        .subscriberCount
                    )}
                    명 | 동영상{" "}
                    {combinedQueries.data[2]?.items[0].statistics.videoCount}개
                  </p>
                </div>
                <div className="ranker_img">
                  <Image
                    src={"/image/youtube3.jpg"}
                    alt="youtube3"
                    width={80}
                    height={80}
                  />
                </div>
              </Link>

              <Link
                target="_blank"
                href={"https://www.youtube.com/@cooking_haru"}
              >
                <div className="ranker_info">
                  <p>쿠킹하루 Cooking Haru :)</p>
                  <p>
                    구독자{" "}
                    {commaThousand(
                      +combinedQueries.data[3]?.items[0].statistics
                        .subscriberCount
                    )}
                    명 | 동영상{" "}
                    {combinedQueries.data[3]?.items[0].statistics.videoCount}개
                  </p>
                </div>
                <div className="ranker_img">
                  <Image
                    src={"/image/youtube4.jpg"}
                    alt="youtube4"
                    width={80}
                    height={80}
                  />
                </div>
              </Link>
            </div>
          </div>
        </section>
        <section className={`${styles.mainNutrition} layout_size`}>
          <div className={styles.infoNutritionText}>
            <h3>Check your nutrition</h3>
            <p>
              영양성분을 확인하고 싶은 레시피가 있다면 버튼을 눌러주세요. <br />
              칼로리, 지방, 단백질 등 다양한 성분을 분석하여 자세히 알려드릴게요
            </p>
          </div>
          <div className={styles.submitNutrition}>
            <Lottie
              loop
              animationData={nutritionCheck}
              play
              style={{ width: 220, height: 220 }}
            />
            <Link href={"/nutrition"} className="submitNutrition_btn">
              Analysis
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

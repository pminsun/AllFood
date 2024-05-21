import { signOut, useSession } from "next-auth/react";
import styles from "@/styles/User.module.css";
import { useState } from "react";
import { HiOutlineUser, HiOutlinePencilAlt } from "react-icons/hi";
import { IoLogOutOutline } from "react-icons/io5";
import MyList from "@/components/MyList";
import MyAccount from "@/components/MyAccount";
import Link from "next/link";

export default function Mypage() {
  const { data: session, status } = useSession();

  const tabContent = [
    {
      title: "내 레시피",
      titleBtn: "추가",
      content: <MyList />,
    },
    {
      title: "계정 정보",
      titleBtn: "수정",
      titleBtnTwo: "탈퇴",
      content: <MyAccount />,
    },
  ];

  const [tab, setTab] = useState(0);
  const selectTabHandler = (index) => {
    setTab(index);
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
        <section className={styles.mypageArea}>
          <div className={styles.mymenu}>
            <p
              className={`${tab === 0 ? styles.mymenuSelect : ""}`}
              onClick={() => selectTabHandler(0)}
            >
              <HiOutlinePencilAlt /> My Recipes
            </p>
            <p
              className={`${tab === 1 ? styles.mymenuSelect : ""}`}
              onClick={() => selectTabHandler(1)}
            >
              <HiOutlineUser /> My Account
            </p>

            <p onClick={() => signOut({ callbackUrl: `/` })}>
              <IoLogOutOutline />
              Log out
            </p>
          </div>
          <div className={styles.mypageCon}>
            <div className={styles.tabTitle}>
              <p>{tabContent[tab].title}</p>
              <div className={styles.tabTitle_btn_area}>
                {tabContent[tab].titleBtn === "추가" && (
                  <Link
                    href={"/user/mypage/add"}
                    className={styles.tabTitle_btn}
                  >
                    {tabContent[tab].titleBtn}
                  </Link>
                )}

                {tabContent[tab].titleBtnTwo && (
                  <>
                    <p className={styles.tabTitle_btn}>
                      {tabContent[tab].titleBtn}
                    </p>
                    <p className={styles.tabTitle_btn}>
                      {tabContent[tab].titleBtnTwo}
                    </p>
                  </>
                )}
              </div>
            </div>
            <div>{tabContent[tab].content}</div>
          </div>
        </section>
      </section>
    </section>
  );
}

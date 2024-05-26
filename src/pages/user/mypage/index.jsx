import { signOut, useSession } from "next-auth/react";
import styles from "@/styles/User.module.css";
import { useState } from "react";
import { HiOutlineUser, HiOutlinePencilAlt } from "react-icons/hi";
import { IoLogOutOutline } from "react-icons/io5";
import MyList from "@/components/MyList";
import MyAccount from "@/components/MyAccount";
import Link from "next/link";
import { auth } from "../../../../firebase/firebasedb";
import { useRouter } from "next/router";
import { deleteUser } from "firebase/auth";
import { reauthenticate } from "../../../../firebase/reauthenticate";

export default function Mypage() {
  const router = useRouter();
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

  // logoutModal
  const [logoutModal, setLogoutModal] = useState(false);
  const handleShowLogoutModal = () => {
    setLogoutModal(true);
    document.body.style.overflow = "hidden";
  };

  // 탈퇴
  const handleDeleteAccount = async () => {
    const user = auth.currentUser;

    if (user) {
      try {
        await deleteUser(user);
        alert("계정이 성공적으로 삭제되었습니다.");
        // 추가로, 사용자가 로그아웃 상태로 돌아가게 할 수 있습니다.
        router.replace("/");
      } catch (error) {
        console.error(
          "계정 삭제 중 오류가 발생했습니다. 다시 시도해 주세요 ",
          error
        );
      }
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

              <p onClick={handleShowLogoutModal}>
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
                      href={{
                        pathname: "/user/mypage/add",
                        query: {
                          type: "add",
                        },
                      }}
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
                      <p
                        onClick={handleDeleteAccount}
                        className={styles.tabTitle_btn}
                      >
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
      {logoutModal && (
        <>
          <div className="modalBox">
            <div className="modalTop">
              <p className="modalTitle">LOGOUT</p>
            </div>
            <p className="modalCon">로그아웃 하시겠습니까?</p>
            <div className="modalBtn_area">
              <p
                onClick={() => {
                  setLogoutModal(false);
                  document.body.style.overflow = "auto";
                }}
              >
                취소
              </p>
              <p onClick={() => signOut({ callbackUrl: `/` })}>확인</p>
            </div>
          </div>
          <div className="modalBox_bg" />
        </>
      )}
    </>
  );
}

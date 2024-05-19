import styles from "@/styles/User.module.css";
import { useSession } from "next-auth/react";

export default function MyAccount() {
  const { data: session, status } = useSession();

  return (
    <div className={styles.myAccount_area}>
      <div className={styles.myAccount_box}>
        <p className={styles.myAccount_title}>아이디</p>
        <input disabled value={session && session.user.email} />
      </div>
      <div className={styles.myAccount_box}>
        <p className={styles.myAccount_title}>비밀번호 재설정</p>
        <input value={session && session.user.email} />
      </div>
      <div className={styles.myAccount_btnarea}>
        <button>수정</button>
        <button>탈퇴</button>
      </div>
    </div>
  );
}

import { useState } from "react";
import styles from "@/styles/User.module.css";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { reauthenticate } from "../../firebase/reauthenticate";

export default function MyAccount({ onReauthenticate }) {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleReauthenticate = async () => {
    console.log(email, password);
    try {
      await reauthenticate(email, password);
      onReauthenticate();
    } catch (error) {
      alert("재인증에 실패했습니다. 이메일과 비밀번호를 확인해 주세요.");
    }
  };

  return (
    <div className={styles.myAccount_area}>
      <div className={styles.myAccount_box}>
        <p className={styles.myAccount_title}>아이디</p>
        <input disabled value={session && session.user.email} />
      </div>
      <div className={styles.myAccount_box}>
        <p className={styles.myAccount_title}>비밀번호 재설정</p>
        <input type="password" disabled value={"********"} />
      </div>
      <div className={styles.reauth_area}>
        <h3>계정 삭제를 위해 다시 로그인해 주세요.</h3>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleReauthenticate}>재인증</button>
      </div>
    </div>
  );
}

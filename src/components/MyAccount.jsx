import styles from "@/styles/User.module.css";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

export default function MyAccount() {
  const { data: session, status } = useSession();

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

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
    </div>
  );
}

import styles from "@/styles/User.module.css";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../firebase/firebasedb";
import { useRouter } from "next/router";

export default function Signup() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const signUpAccont = async (data) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      router.replace("/user/login");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("useEmail", {
          message: "이미 사용 중인 이메일입니다.",
        });
      }
    }
  };

  return (
    <section className={`first_content`}>
      <section className="layout_size">
        <div>
          <h2 className={styles.page_title}>Sign Up</h2>
        </div>
        <form
          onSubmit={handleSubmit(signUpAccont)}
          className={styles.login_form}
        >
          {/* <div>
            <div className="inputArea">
              <input
                type="text"
                placeholder="name"
                {...register("name", {
                  required: "이름은 필수 입력입니다.",
                })}
              />
            </div>
            {errors.name && (
              <span className="errorTxt">{errors.name.message}</span>
            )}
          </div> */}
          <div>
            <div className="inputArea">
              <input
                type="text"
                placeholder="Email"
                {...register("email", {
                  required: "아이디는 필수 입력입니다.",
                })}
              />
            </div>
            {errors.email && (
              <span className="errorTxt">{errors.email.message}</span>
            )}
          </div>
          <div>
            <div className="inputArea">
              <input
                //type={showPassword ? "text" : "password"}
                placeholder="8+ Password"
                {...register("password", {
                  required: "비밀번호는 필수 입력입니다.",
                  minLength: {
                    value: 8,
                    message: "8자리 이상 비밀번호를 입력하세요.",
                  },
                })}
              />
              {/* <div className="passwordShow" onClick={clickShowPassword}>
                  {showPassword ? <FiEye /> : <FiEyeOff />}
                </div> */}
            </div>
            {errors.password && (
              <span className="errorTxt">{errors.password.message}</span>
            )}
          </div>
          <p {...register("useEmail")}>
            {errors.useEmail && (
              <span className={styles.errorLogin}>
                {errors.useEmail.message}
              </span>
            )}
          </p>
          <button
            type="submit"
            className={styles.login_btn}
            disabled={isSubmitting}
          >
            회원가입
          </button>
        </form>
        <Link href={"/user/login"} className={styles.moveTo_signUp}>
          로그인 하러 가기
        </Link>
      </section>
    </section>
  );
}

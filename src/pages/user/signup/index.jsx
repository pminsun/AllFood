import styles from "@/styles/User.module.css";
import Link from "next/link";
import { useForm } from "react-hook-form";
export default function Signup() {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  return (
    <section className={`first_content`}>
      <section className="layout_size">
        <div>
          <h2 className={styles.page_title}>Sign Up</h2>
        </div>
        <form className={styles.login_form}>
          <div>
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
          </div>
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

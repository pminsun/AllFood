import styles from "@/styles/User.module.css";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onValid = async (data) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    if (!result?.error) {
      router.replace("/");
    } else {
      setError("loginError", {
        message: "아이디와 비밀번호를 다시 확인해주세요.",
      });
    }
  };
  const handleReauthenticate = async () => {
    try {
      await reauthenticate(email, password);
      handleDeleteAccount();
    } catch (error) {
      setError("재인증에 실패했습니다. 이메일과 비밀번호를 확인해 주세요.");
    }
  };

  return (
    <section className={`first_content`}>
      <section className="layout_size">
        <div>
          <h2 className={styles.page_title_center}>Login</h2>
        </div>

        <form onSubmit={handleSubmit(onValid)} className={styles.login_form}>
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
              <span className={styles.errorLogin}>{errors.email.message}</span>
            )}
          </div>
          <div>
            <div className="inputArea">
              <input
                type="password"
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
              <span className={styles.errorLogin}>
                {errors.password.message}
              </span>
            )}
          </div>
          {/* <div className="infoConfigArea">
              <div className="rememberArea">
                <input
                  type="checkbox"
                  id="rememberId"
                  checked={rememberCheck}
                  onChange={handleChangeRemember}
                />
                <label htmlFor="rememberId">계정정보 저장하기</label>
              </div>
            </div> */}
          <p {...register("loginError")}>
            {errors.loginError && (
              <span className={styles.errorLogin}>
                {errors.loginError.message}
              </span>
            )}
          </p>
          <button
            type="submit"
            className={styles.login_btn}
            disabled={isSubmitting}
          >
            로그인
          </button>
        </form>
        <Link href={"/user/signup"} className={styles.moveTo_signUp}>
          회원가입 하러 가기
        </Link>
      </section>
    </section>
  );
}

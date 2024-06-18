import { useState, useEffect } from 'react'
import styles from '@/styles/User.module.css'
import { signOut, useSession } from 'next-auth/react'
import { reauthenticate } from '../../firebase/reauthenticate'
import { auth } from '../../firebase/firebasedb'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { useRouter } from 'next/router'
import { deleteUser, updatePassword } from 'firebase/auth'

export default function MyAccount({
  showDeleteAccount,
  setShowDeleteAccount,
  showUpdateAccount,
  setShowUpdateAccount,
}) {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [email, setEmail] = useState(session && session.user.email)
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/')
    }
  }, [router, status])

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }
  const handlePassword = (e) => {
    setPassword(e.target.value)
  }
  const handleNewPassword = (e) => {
    setNewPassword(e.target.value)
  }
  const clickShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const clickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword)
  }
  // 탈퇴
  const handleDeleteAccount = async () => {
    const user = auth.currentUser

    if (user) {
      try {
        await deleteUser(user)
        alert('계정이 성공적으로 삭제되었습니다.')
        await signOut({ redirect: false })
        router.push('/')
      } catch (error) {
        if (error.code === 'auth/requires-recent-login') {
          alert('계정을 삭제하려면 다시 로그인해 주세요.')
        } else {
          console.error(
            '계정 삭제 중 오류가 발생했습니다. 다시 시도해 주세요',
            error,
          )
        }
      }
    }
  }

  // 비번 수정
  const handleUpdatePassword = async () => {
    const user = auth.currentUser

    if (user) {
      try {
        await updatePassword(user, newPassword)
        alert('비밀번호가 성공적으로 변경되었습니다.')
        setNewPassword('')
        setShowUpdateAccount(false)
        router.push('/')
      } catch (error) {
        if (error.code === 'auth/requires-recent-login') {
          alert('비밀번호를 변경하려면 다시 로그인해 주세요.')
        } else {
          console.error(
            '비밀번호 변경 중 오류가 발생했습니다. 다시 시도해 주세요',
            error,
          )
        }
      }
    }
  }

  const handleReauthenticate = async () => {
    try {
      await reauthenticate(email, password)
      if (showDeleteAccount) {
        await handleDeleteAccount()
      } else {
        await handleUpdatePassword()
      }
    } catch (error) {
      alert('재인증에 실패했습니다. 이메일과 비밀번호를 확인해 주세요.')
    }
  }

  return (
    <>
      <div className={styles.myAccount_area}>
        {showDeleteAccount && <h3>계정 탈퇴를 위해 다시 로그인해 주세요.</h3>}
        <div className={styles.myAccount_box}>
          <p className={styles.myAccount_title}>아이디</p>
          <input
            onChange={handleEmail}
            disabled={showDeleteAccount ? false : true}
            value={email}
          />
        </div>

        <div className={styles.myAccount_box}>
          <p className={styles.myAccount_title}>비밀번호</p>
          <div className={styles.inputArea}>
            <input
              type={showPassword ? 'text' : 'password'}
              onChange={handlePassword}
              disabled={showDeleteAccount || showUpdateAccount ? false : true}
              value={
                showDeleteAccount || showUpdateAccount ? password : '********'
              }
            />
            <div className={styles.passwordShow} onClick={clickShowPassword}>
              {showPassword ? <FiEye /> : <FiEyeOff />}
            </div>
          </div>
        </div>

        {showUpdateAccount && (
          <div className={styles.myAccount_box}>
            <p className={styles.myAccount_title}>새 비밀번호</p>
            <div className={styles.inputArea}>
              <input
                type={showNewPassword ? 'text' : 'password'}
                onChange={handleNewPassword}
                value={newPassword}
              />
              <div
                className={styles.passwordShow}
                onClick={clickShowNewPassword}
              >
                {showNewPassword ? <FiEye /> : <FiEyeOff />}
              </div>
            </div>
          </div>
        )}
        {showDeleteAccount && (
          <div className={styles.recheck_area}>
            <button
              className={styles.recheck}
              onClick={() => setShowDeleteAccount(false)}
            >
              취소
            </button>
            <button className={styles.recheck} onClick={handleReauthenticate}>
              재인증
            </button>
          </div>
        )}
        {showUpdateAccount && (
          <div className={styles.recheck_area}>
            <button
              className={styles.recheck}
              onClick={() => setShowUpdateAccount(false)}
            >
              취소
            </button>
            <button className={styles.recheck} onClick={handleReauthenticate}>
              비밀번호 변경
            </button>
          </div>
        )}
      </div>
    </>
  )
}

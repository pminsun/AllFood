import { useEffect, useState } from 'react'
import styles from '@/styles/User.module.css'
import { fireStore, fireStorage, auth } from '../../firebase/firebasedb'
import { collection, getDocs } from 'firebase/firestore'
import { ref, listAll, getDownloadURL } from 'firebase/storage'
import Image from 'next/image'
import Link from 'next/link'

export default function MyList() {
  const [load, setLoad] = useState(false)
  // 현재 로그인 정보
  const [currentUser, setCurrentUser] = useState(null)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
    })

    return () => unsubscribe()
  }, [])

  const [recipesList, setRecipesList] = useState([])
  const fetchData = async () => {
    const querySnapshot = await getDocs(
      collection(fireStore, `users/${currentUser?.uid}/myrecipes`),
    )

    const data = querySnapshot.docs
      .map((doc) => {
        const recipeData = doc.data()
        // 만약 recipeData에 created_at 필드가 있다면 제외하고 없는 경우에만 반환
        if (recipeData.hasOwnProperty('created_at')) {
          return null
        }
        return recipeData
      })
      .filter((recipe) => recipe !== null)

    setRecipesList(data)
  }

  const [urlImage, setUrlImage] = useState('')
  const fetchImage = async () => {
    const fileRef = ref(fireStorage, 'myrecipe/')
    const result = await listAll(fileRef)
    const urls = await Promise.all(
      result.items.map(async (item) => {
        const url = await getDownloadURL(item)
        return url
      }),
    )
    setUrlImage(urls)
  }

  useEffect(() => {
    setLoad(true)
  }, [])

  useEffect(() => {
    const fetchDataAndImage = async () => {
      await Promise.all([fetchData(), fetchImage()])
    }

    if (load) {
      fetchDataAndImage() // load 상태가 true이면 fetchDataAndImage 함수를 실행합니다.
    }
  }, [load])

  return (
    <div className={styles.myList_area}>
      {recipesList.map((item, index) => (
        <Link
          href={{
            pathname: `/user/mypage/${item.name}`,
            query: {
              img:
                urlImage &&
                urlImage
                  .find(
                    (img) =>
                      img.includes(item.image) &&
                      img.includes(currentUser?.uid),
                  )
                  ?.split('%')[1],
            },
          }}
          key={index}
        >
          <div className={styles.item_img}>
            {urlImage &&
              urlImage.map(
                (img) =>
                  img.includes(item.image) &&
                  img.includes(currentUser?.uid) && (
                    <Image
                      key={img}
                      src={img}
                      alt="urlImage"
                      width={208}
                      height={200}
                    />
                  ),
              )}
          </div>
          <p className={styles.item_name}>{item.name}</p>
        </Link>
      ))}
    </div>
  )
}

export async function getStaticProps() {
  const fileRef = ref(fireStorage, 'coverImage/')
  // coverImage/ 하위에 있는 모든 파일에 대한 참조
  const result = await listAll(fileRef)
  const urls = await Promise.all(
    result.items.map(async (item) => {
      const url = await getDownloadURL(item)
      return url
    }),
  )

  return {
    props: {
      images: urls,
    },
  }
}

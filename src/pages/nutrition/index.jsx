import Loading from '@/components/Loading'
import styles from '@/styles/Nutrition.module.css'
import dynamic from 'next/dynamic'
import { useState } from 'react'
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false })

export default function Nutrition() {
  const [nutritionTxt, setNutritionTxt] = useState('')
  const [nutritionData, setNutritionData] = useState(null)
  const [analysisLoading, setAnalysisLoading] = useState(false)

  const InputNutritionTxt = (e) => {
    setNutritionTxt(e.target.value)
  }

  const nutritionDataFetch = async (nutritionTxt) => {
    setAnalysisLoading(true)
    const ingredientsArray = nutritionTxt.split(',').filter((n) => n.length > 0)
    const response = await fetch(
      `https://api.edamam.com/api/nutrition-details?app_id=${process.env.NEXT_PUBLIC_NUTRITION_APP_ID}&app_key=${process.env.NEXT_PUBLIC_NUTRITION_APP_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // JSON 형식으로 요청을 보냄
        },
        body: JSON.stringify({
          ingr: ingredientsArray,
        }),
      },
    )
    const data = await response.json()
    return data
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (nutritionTxt.length > 0) {
      const data = await nutritionDataFetch(nutritionTxt)
      setNutritionData(data)
      setAnalysisLoading(false)
    }
  }

  const roundedNumber = (number) => number.toFixed(1)

  // 차트
  const state = {
    series: nutritionData
      ? [
          roundedNumber(nutritionData.totalDaily.FAT.quantity),
          roundedNumber(nutritionData.totalDaily.CHOLE.quantity),
          roundedNumber(nutritionData.totalDaily.NA.quantity),
          roundedNumber(nutritionData.totalDaily.CHOCDF.quantity),
          roundedNumber(nutritionData.totalDaily.PROCNT.quantity),
        ]
      : [0, 0, 0, 0, 0],
  }
  const commonOptions = {
    plotOptions: {
      radialBar: {
        hollow: {
          size: '58%',
        },
        dataLabels: {
          name: {
            fontSize: '20px',
          },
          value: {
            fontSize: '16px',
          },
        },
      },
    },
    stroke: {
      lineCap: 'round',
    },
  }

  const options = {
    ...commonOptions,
    chart: {
      height: 400,
      type: 'radialBar',
    },
    colors: ['#ddbf5c', '#88dd4e', '#75d1d8', '#8a9dd1', '#c6a8e2'],
    labels: ['총 지방', '콜레스테롤', '나트륨', '총 탄수화물', '단백질'],
  }

  const stateNone = { series: [0, 0, 0, 0, 0] }
  const optionsNone = {
    plotOptions: {
      radialBar: {
        hollow: {
          size: '58%',
        },
        dataLabels: {
          showOn: 'none',
        },
      },
    },
    stroke: {
      lineCap: 'round',
    },
    chart: {
      height: 400,
      type: 'radialBar',
    },
    colors: ['#ddbf5c', '#88dd4e', '#75d1d8', '#8a9dd1', '#c6a8e2'],
    labels: ['총 지방', '콜레스테롤', '나트륨', '총 탄수화물', '단백질'],
  }

  return (
    <>
      {/* {analysisLoading && (
        <>
          <div className="backdrop_loading"></div>
          <div className="fullScreen_loading">
            <Loading />
          </div>
        </>
      )} */}
      <section className={`first_content`}>
        <section className="layout_size">
          <div>
            <h2 className={styles.page_title}>Check your Nutrition</h2>
            <p className={styles.page_info}>
              영양성분을 확인하고 싶은 레시피를 입력해주세요. <br />
              칼로리, 지방, 단백질 등 다양한 성분을 분석하여 자세히 알려드릴게요
            </p>
          </div>
          <section className={styles.nutritionInfo}>
            <form onSubmit={handleSubmit}>
              <div className={styles.submitNutrition}>
                <textarea
                  onChange={InputNutritionTxt}
                  placeholder={`콤마로 식재료를 구분해주세요\n예) 1 cup rice, 10 oz chickpeas`}
                />
                <button className="submitNutrition_btn" type="text">
                  Analysis
                </button>
              </div>
            </form>
            <div className={styles.nutritionFacts}>
              <div>
                <p className="title">Nutrition Facts</p>
                {nutritionData !== null ? (
                  <div className="total">
                    <p className={styles.calories}>
                      Total Calories {nutritionData.calories}
                    </p>
                    <span>Amount Per Serving</span>
                  </div>
                ) : (
                  <div className="total"></div>
                )}
              </div>
              <div className={styles.nutritionGraph}>
                <div>
                  {nutritionData !== null ? (
                    <ApexCharts
                      options={options}
                      series={state.series}
                      type="radialBar"
                      height={400}
                    />
                  ) : (
                    <ApexCharts
                      options={optionsNone}
                      series={stateNone.series}
                      type="radialBar"
                      height={400}
                    />
                  )}
                </div>
                <div className={styles.nutritionGraphInfo}>
                  <div>
                    <div className="dot" />
                    <p>총 지방</p>
                    <p>
                      {nutritionData !== null
                        ? roundedNumber(nutritionData.totalDaily.FAT.quantity) +
                          '%'
                        : ''}
                    </p>
                  </div>
                  <div>
                    <div className="dot d_sec" />
                    <p>콜레스테롤</p>
                    <p>
                      {nutritionData !== null
                        ? roundedNumber(
                            nutritionData.totalDaily.CHOLE.quantity,
                          ) + '%'
                        : ''}
                    </p>
                  </div>
                  <div>
                    <div className="dot d_third" />
                    <p>나트륨</p>
                    <p>
                      {nutritionData !== null
                        ? roundedNumber(nutritionData.totalDaily.NA.quantity) +
                          '%'
                        : ''}
                    </p>
                  </div>
                  <div>
                    <div className="dot d_fourth" />
                    <p>총 탄수화물</p>
                    <p>
                      {nutritionData !== null
                        ? roundedNumber(
                            nutritionData.totalDaily.CHOCDF.quantity,
                          ) + '%'
                        : ''}
                    </p>
                  </div>
                  <div>
                    <div className="dot d_fifth" />
                    <p>단백질</p>
                    <p>
                      {nutritionData !== null
                        ? roundedNumber(
                            nutritionData.totalDaily.PROCNT.quantity,
                          )
                        : ''}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className={styles.nutritionTable}>
            <table>
              <thead>
                <tr>
                  <th>수량</th>
                  <th>단위</th>
                  <th>음식</th>
                  <th>칼로리</th>
                  <th>무게</th>
                </tr>
              </thead>
              <tbody>
                {nutritionData !== null ? (
                  nutritionData?.ingredients.map((ingri) => (
                    <tr key={ingri.text}>
                      <td>{ingri.parsed[0].quantity}</td>
                      <td>{ingri.parsed[0].measure}</td>
                      <td>{ingri.parsed[0].food}</td>
                      <td>
                        {roundedNumber(
                          ingri.parsed[0].nutrients.ENERC_KCAL.quantity,
                        )}{' '}
                        {ingri.parsed[0].nutrients.ENERC_KCAL.unit}
                      </td>
                      <td>{roundedNumber(ingri.parsed[0].weight)} g</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5}>
                      영양성분을 확인하고 싶은 레시피를 입력해주세요.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </>
  )
}

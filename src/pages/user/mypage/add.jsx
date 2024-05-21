import styles from "@/styles/User.module.css";
export default function MyListAdd() {
  return (
    <section className={`first_content`}>
      <section className="layout_size">
        <div>
          <h2 className={styles.page_title}>MY PAGE</h2>
          <p className={styles.page_info}>
            나만의 레시피를 AllFood 계정을 통해 기록하세요.
          </p>
        </div>
        <section>추가</section>
      </section>
    </section>
  );
}

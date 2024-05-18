import { useSession } from "next-auth/react";
export default function Mypage() {
  const { data: session, status } = useSession();

  return (
    <section className={`first_content`}>
      <section className="layout_size"></section>
    </section>
  );
}

import styles from "@/styles/List.module.css";
import Image from "next/image";
import Link from "next/link";

export default function List({ recipe }) {
  const base64 = "data:image/jpeg;base64,";
  const blurImg =
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO88B8AAqUB0Y/H4mkAAAAASUVORK5CYII=";

  return (
    <Link href={recipe.recipe.url} target="_blank">
      <div className="image_area">
        <Image
          src={recipe.recipe.image}
          alt="photo"
          width={200}
          height={200}
          placeholder="blur"
          blurDataURL={base64 + blurImg}
        />
      </div>
      <p className="item_name">{recipe.recipe.label}</p>
    </Link>
  );
}

import Link from "next/link";

export default function InfoCard() {
  return (
    <article className=" p-3 border rounded-lg ">
      <h3 className="text-foreground capitalize text-sm truncate">employee</h3>
      <h2 className="text-foreground font-medium capitalize truncate ">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus
        voluptate eum ea debitis maxime. Illum!
      </h2>
      <p className="text-sm py-2 w-full">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam, nihil
        rerum itaque minima nemo totam adipisci quis suscipit deserunt ex.
      </p>
      <Link href="/" className="block">
        <button className=" text-xs py-1 px-3 rounded-md text-background bg-primary ">
          Read More
        </button>
      </Link>
    </article>
  );
}

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center">
      <Link
        href="/landing"
        className="flex bg-primary justify-center items-center w-1/2 h-50"
      >
        랜딩페이지로 이동
      </Link>
    </div>
  );
}

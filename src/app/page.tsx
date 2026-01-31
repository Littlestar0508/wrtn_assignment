import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center">
      <Link href="/landing" className="bg-primary">
        랜딩페이지로 이동
      </Link>
    </div>
  );
}

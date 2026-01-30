import Form from "next/form";

export default function Landing() {
  const chkPlace = async (formData: FormData) => {
    "use server";
    const place = formData.get("place");
  };

  return (
    <>
      <Form action={chkPlace} className="w-3/5 flex gap-20 mx-auto mt-20">
        <input name="place" type="text" className="flex-1 border" />
        <button type="submit" className="bg-primary flex-1">
          다음
        </button>
      </Form>
    </>
  );
}

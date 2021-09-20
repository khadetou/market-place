import { useState } from "react";
import { toast } from "react-toastify";
import { signIn, getSession } from "next-auth/client";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("object");

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (result.error) {
      toast.error(result.error);
    } else {
      router.push("/");
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Submit</button>
    </form>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  console.log(session);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

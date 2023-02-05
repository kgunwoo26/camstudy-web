import { useAuthState } from "react-firebase-hooks/auth";
import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { WelcomeStore } from "@/stores/WelcomeStore";
import { observer } from "mobx-react";
import userStore from "@/stores/UserStore";
import { auth } from "@/service/firebase";

const Welcome: NextPage = () => {
  const [welcomeStore] = useState(new WelcomeStore());
  const [user, loading] = useAuthState(auth);
  const successToCreate = welcomeStore.successToCreate;
  const router = useRouter();

  useEffect(() => {
    if (successToCreate) {
      router.replace("/");
    }
  }, [successToCreate, router]);

  if (loading) {
    return <div>Loading</div>;
  }
  if (!user) {
    router.replace("/login");
    return <div>Please sign in to continue</div>;
  }
  const uid = user?.uid;

  return (
    <div>
      {/*<input type={"im"}></input>*/}
      <input
        id={"name"}
        type={"text"}
        onChange={(e) => welcomeStore.changeName(e.target.value)}
        value={welcomeStore.name}
      />
      <div>{welcomeStore.nameErrorMessage}</div>
      <br />
      <input
        id={"introduce"}
        type={"text"}
        onChange={(e) => welcomeStore.changeIntroduce(e.target.value)}
        value={welcomeStore.introduce}
      />
      <div>{welcomeStore.introduceErrorMessage}</div>
      <br />
      <input
        id={"tags"}
        type={"text"}
        onChange={(e) => welcomeStore.changeTags(e.target.value)}
        value={welcomeStore.tags}
      />
      <div>{welcomeStore.tagsErrorMessage}</div>
      <br />
      <button onClick={() => welcomeStore.createUser(uid)}>확인</button>
      <br />

      <button onClick={() => userStore.signOut()}>Sign out</button>

      <div>{welcomeStore.errorMessage}</div>
    </div>
  );
};
export default observer(Welcome);

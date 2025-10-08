import { Redirect, Stack } from "expo-router";
import { useU, useUserser } from "@clerk/clerk-expo";

export default function AuthRoutesLayout() {
  const { isSignedIn } = useUser();

  if (isSignedIn) {
    return <Redirect href={"/sign-in"} />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

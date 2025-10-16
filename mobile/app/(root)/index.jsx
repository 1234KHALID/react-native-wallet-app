import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import { SignOutButton } from "@/components/sign-out-button";
import { useTransactions } from "../../hooks/use-transactions";
import { useEffect } from "react";

export default function Page() {
  const { user } = useUser();
  const { isLoading, transactions, summary, loadingData, deleteTransaction } =
    useTransactions(user.id);

  // useEffect(() => {
  //   loadingData();
  // }, [loadingData]);

  console.log("transactions", transactions);
  console.log("summary", summary);

  return (
    <View>
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        <SignOutButton />
      </SignedIn>
      <SignedOut>
        <Link href="/(auth)/sign-in">
          <Text>Sign in</Text>
        </Link>
        <Link href="/(auth)/sign-up">
          <Text>Sign up</Text>
        </Link>
      </SignedOut>
    </View>
  );
}

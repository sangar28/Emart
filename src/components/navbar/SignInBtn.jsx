import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

const SignInBtn = () => {
  return (
    <div className="sm:block">
      <SignedOut>
        <SignInButton className="bg-red-500 text-white font-semibold rounded-md px-4 py-2" />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};
export default SignInBtn;

import { Button, Typography } from 'antd';

const Page1 = ({ onClick, onPartnerSignUpClick, onUserSignUpClick }) => {
	const { Text } = Typography;
	return (
    <>
      <div className="flex flex-row justify-between align-center mb-8">
        <Text className="text-4xl font-extrabold">Sign up </Text>
        <img
          src="/images/close.png"
          alt="close"
          className="h-4 w-4 cursor-pointer"
          onClick={onClick}
        />
      </div>
      <Text className="my-8" style={{ fontSize: "1.2rem" }}>
        New to Cheffy? Sign up now.
      </Text>
      <Button
        onClick={onPartnerSignUpClick}
        block
        className="py-8 text-white font-bold text-2xl mb-5 mt-10 flex items-center justify-center"
        style={{ backgroundColor: "#d73d36" }}
      >
        Partners
      </Button>
      <Button
        onClick={onUserSignUpClick}
        block
        className="py-8 font-bold text-2xl flex items-center justify-center border-2"
        style={{ color: "#d73d36", borderColor: "#d73d36" }}
      >
        Users
      </Button>
    </>
  );
};

export default Page1;

import {
  Alert,
  AlertIcon,
  Button,
  Input,
  Switch,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import useAdminLogin from "../../hooks/useAdminLogin"; // You'll need to create this custom hook

const Login = () => {
  const [inputs, setInputs] = useState({
    // username: "",
    // fullname: "",
    email: "",
    password: "",
  });
  const [isSignUp, setIsSignUp] = useState(false);
  const { loading, error, login, signup } = useAdminLogin();

  const handleAuth = () => {
    if (isSignUp) {
      signup(inputs);
    } else {
      login(inputs);
    }
  };

  return (
    <VStack spacing={4} align="stretch">
      <Input
        placeholder="Email"
        fontSize={14}
        type="email"
        size={"sm"}
        value={inputs.email}
        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
      />

      <Input
        placeholder="Password"
        fontSize={14}
        size={"sm"}
        type="password"
        value={inputs.password}
        onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
      />
      {error && (
        <Alert status="error" fontSize={13} p={2} borderRadius={4}>
          <AlertIcon fontSize={12} />
          {error.message}
        </Alert>
      )}
      <Button
        w={"full"}
        colorScheme="blue"
        size={"sm"}
        fontSize={14}
        isLoading={loading}
        onClick={handleAuth}>
        {isSignUp ? "Sign Up" : "Log in"}
      </Button>
      <VStack align="center">
        <Text fontSize={14}>
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
        </Text>
        <Switch
          size="sm"
          onChange={() => setIsSignUp(!isSignUp)}
          isChecked={isSignUp}
        />
        <Text fontSize={12}>
          {isSignUp ? "Switch to Log In" : "Switch to Sign Up"}
        </Text>
      </VStack>
    </VStack>
  );
};

export default Login;

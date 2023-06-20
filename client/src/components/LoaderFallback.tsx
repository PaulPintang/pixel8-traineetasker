import { LoadingOverlay, Button, Text } from "@mantine/core";

interface PropsMsg {
  text: string;
}
const LoaderFallback = ({ text }: PropsMsg) => {
  return (
    <LoadingOverlay
      className="h-screen"
      loader={
        <Button variant="white" color="dark" size="md" mb={55} loading>
          <Text c="dark" fz="xs" className="tracking-wide">
            {text}
          </Text>
        </Button>
      }
      visible={true}
      overlayOpacity={1}
    />
  );
};

export default LoaderFallback;

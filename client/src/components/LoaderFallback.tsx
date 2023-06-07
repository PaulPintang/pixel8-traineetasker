import { LoadingOverlay, Button, Text } from "@mantine/core";

const LoaderFallback = () => {
  return (
    <LoadingOverlay
      className="h-screen"
      loader={
        <Button variant="white" color="teal" size="xs" mb={55} loading>
          <Text c="teal" fz="sm" className="tracking-wide">
            Loading . . .
          </Text>
        </Button>
      }
      visible={true}
      overlayOpacity={1}
    />
  );
};

export default LoaderFallback;

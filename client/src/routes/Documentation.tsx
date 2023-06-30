import { Center, Image, Stack, Title, Text } from "@mantine/core";
import dashboard from "../assets/dashboard.png";

const Documentation = () => {
  return (
    <Stack align="center" className="text-center" spacing={60}>
      <div className="max-w-[799px] mx-auto">
        <Title fz={45} className="mx-auto">
          {/* Unleash Your Potential with Efficient Task Management */}
          Empowering Tomorrow's Professionals
        </Title>
        <Text c="dimmed" className="max-w-[590px] mx-auto pt-2">
          Welcome to our platform, where your dreams take flight! We aim to
          empower you to elevate your learning experience and help you thrive in
          your chosen field.
        </Text>
      </div>
      <div className="w-[970px]">
        <Image src={dashboard} />
      </div>
    </Stack>
  );
};

export default Documentation;

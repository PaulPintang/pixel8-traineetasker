import { Button, Text, Stack, Image } from "@mantine/core";
import empty from "../assets/empty.png";

const GettingData = () => {
  return (
    <>
      <tbody>
        <tr className="h-full w-full absolute left-0">
          <td className="flex items-center justify-center h-full bg-white">
            <Stack align="center">
              <Image src={empty} width={60} className="animate-searching" />
              <Button variant="white" color="dark" size="xs" mb={55} loading>
                <Text c="dark" fz="xs" className="tracking-wide">
                  Getting data . . .
                </Text>
              </Button>
            </Stack>
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default GettingData;

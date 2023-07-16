import { Text, Image, Stack } from "@mantine/core";
import empty from "../assets/empty.png";

type Props = {
  text: string;
};

const EmptyState = ({ text }: Props) => {
  return (
    <>
      <tbody>
        <tr className="h-full w-full absolute left-0">
          <td className="flex items-center justify-center h-full bg-white">
            <Stack align="center">
              <Image src={empty} width={70} />
              <Text
                c="dimmed"
                fs="italic"
                fz="xs"
                className="tracking-normal"
                mb={55}
              >
                {text}
              </Text>
            </Stack>
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default EmptyState;

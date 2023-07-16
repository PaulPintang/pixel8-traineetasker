import { Flex, Text, Notification } from "@mantine/core";
import { toast } from "react-hot-toast";
import { IconCheck, IconX } from "@tabler/icons-react";
const ToastNotify = (message: string, type: string) => {
  if (type === "error") {
    return toast.error(
      <Text fz="sm" className="text-gray-500">
        {message}
      </Text>,
      {
        duration: 2000,
        className: "bg-white",
        style: {
          padding: 8,
        },
      }
    );
  } else {
    return toast.success(
      <Text fz="sm" className="text-gray-500">
        {message}
      </Text>,
      {
        duration: 2000,
        className: "bg-white",
        style: {
          padding: 8,
        },
      }
    );
  }
};

export default ToastNotify;

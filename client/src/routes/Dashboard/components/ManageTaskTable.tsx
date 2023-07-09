import {
  Card,
  Text,
  Flex,
  Group,
  Pagination,
  ActionIcon,
  Image,
} from "@mantine/core";
import { IconId } from "@tabler/icons-react";
import { chunk } from "lodash";
import { useState } from "react";
import avatar from "../../../assets/avatar.png";
// import { members } from "../../../data/members";

const ManageTaskTable = () => {
  const [page, setPage] = useState(1);
  const [filterBy, setFilterBy] = useState<string | null>("");

  //   const data = members?.filter((member) =>
  //     filterBy ? member.status === filterBy : member
  //   );

  // const items = chunk(members, 4);

  // const rows = items[page - 1]?.map((member) => (
  //   <tr>
  //     <td className="hidden md:table-cell lg:table-cell pl-3 pt-3">
  //       <Group spacing={10}>
  //         <Image src={avatar} width={35} />
  //         <div className="-space-y-[2px]">
  //           <Text className="font-semibold">{member.name}</Text>
  //           <Text c="dimmed">{member.email}</Text>
  //         </div>
  //       </Group>
  //     </td>
  //     <td className="hidden md:table-cell lg:table-cell pl-3 ">
  //       <Text className="font-semibold">{member.gender}</Text>
  //     </td>
  //     <td className="hidden md:table-cell lg:table-cell pl-3 ">
  //       <Text className="font-semibold">
  //         {member.requiredHours} <span className="font-normal">hours</span>
  //       </Text>
  //     </td>
  //     <td className="hidden md:table-cell lg:table-cell pl-3 ">
  //       <Text className="font-semibold">
  //         {member.pendingHours} <span className="font-normal">hours</span>
  //       </Text>
  //     </td>
  //     <td className="hidden md:table-cell lg:table-cell pl-3 ">
  //       <Text className="font-semibold">
  //         {member.renderedHours} <span className="font-normal">hours</span>
  //       </Text>
  //     </td>
  //     <td className="hidden md:table-cell lg:table-cell pl-3 ">
  //       <Text className="font-semibold">
  //         {member.completedTask} <span className="font-normal">tasks</span>
  //       </Text>
  //     </td>
  //     <td className="hidden md:table-cell lg:table-cell pl-3 ">
  //       <ActionIcon variant="light" color="cyan">
  //         <IconId size={19} />
  //       </ActionIcon>
  //     </td>
  //   </tr>
  // ));

  return (
    <>
      <Card className="bg-opacity-60 rounded-md shadow-md h-[calc(100vh-375px)]">
        <div className="h-[94%] overflow-hidden">
          <table className="border-collapse border-none w-full">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="md:px-3 lg:px-3 pl-3 py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider  bg-gray-100 shadow-sm rounded-tl-md"
                >
                  <Text>Intern</Text>
                </th>
                <th
                  scope="col"
                  className="rounded-tr-md md:rounded-none lg:rounded-none py-3 md:pr-3 lg:pr-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider  bg-gray-100 shadow-sm"
                >
                  <Text>Gender</Text>
                </th>
                <th
                  scope="col"
                  className="hidden md:table-cell lg:table-cell py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm"
                >
                  <Text>Required hours</Text>
                </th>

                <th
                  scope="col"
                  className=" hidden md:table-cell lg:table-cell py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm"
                >
                  <Text>Pending hours</Text>
                </th>
                <th
                  scope="col"
                  className=" hidden md:table-cell lg:table-cell py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm"
                >
                  <Text>Rendered hours</Text>
                </th>
                <th
                  scope="col"
                  className=" hidden md:table-cell lg:table-cell py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm"
                >
                  <Text>Completed task</Text>
                </th>
                <th
                  scope="col"
                  className="md:px-3 lg:px-3 pl-3 py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider  bg-gray-100 shadow-sm rounded-tr-md"
                >
                  <Text>Action</Text>
                </th>
                {/* <th
                  scope="col"
                  className="rounded-tr-md hidden md:table-cell lg:table-cell py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm"
                ></th> */}
              </tr>
            </thead>
            {/* <tbody className="text-xs text-gray-600">{rows}</tbody> */}
          </table>
        </div>

        <Flex justify="space-between">
          <Group align="center">
            <Flex>
              <Group spacing={3}>
                <Text fz="xs" className="uppercase font-semibold text-gray-700">
                  Total:
                </Text>
                <Text fz="xs">
                  {/* {members.length} member{members.length >= 2 && "s"} */}
                </Text>
              </Group>
            </Flex>
          </Group>
          {/* <Pagination
            total={items.length}
            value={page}
            onChange={setPage}
            size="xs"
            color="teal"
            withEdges
          /> */}
        </Flex>
      </Card>
    </>
  );
};

export default ManageTaskTable;

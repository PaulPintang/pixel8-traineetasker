import { Center, Image, Stack, Title, Text, Button } from "@mantine/core";
import dashboard from "../../assets/CarouselImages/dashboard.png";
import tasks from "../../assets/CarouselImages/tasks.png";
import timesheet from "../../assets/CarouselImages/timesheet.png";
import dtr from "../../assets/CarouselImages/dtr.png";
import { useRef } from "react";
import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useAppSelector } from "../../app/hooks";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const Home = () => {
  const location = useLocation();
  const { pathname } = location;
  const { user } = useAppSelector((state) => state.auth);
  const autoplay = useRef(Autoplay({ delay: 3000 }));

  useDocumentTitle("TraineeTasker");
  return (
    <Stack align="center" className="text-center" spacing={60}>
      <div>
        <Title fz={45} className="mx-auto">
          Empowering Tomorrow's Professionals
        </Title>
        <Text c="dimmed" className="max-w-[590px] mx-auto pt-2">
          Welcome to our platform, where your dreams take flight! We aim to
          empower you to elevate your learning experience and help you thrive in
          your chosen field.
        </Text>

        {user && pathname === "/" && (
          <NavLink to="dashboard" className="text-white">
            <Button
              color="cyan"
              mt={20}
              rightIcon={<IconArrowNarrowRight />}
              radius={0}
            >
              Proceed to dashboard
            </Button>
          </NavLink>
        )}
      </div>
      {/* <div className="w-[970px] shadow-2xl"> */}
      <div className="md:w-[970px] xl:w-[970px] w-full shadow-2xl md:rounded-3xl lg:rounded-3xl rounded-lg bg-gray-50 p-1">
        {/* <Image src={dashboard} className="shadow-2xl" /> */}
        <Carousel
          mx="auto"
          withIndicators
          loop
          plugins={[autoplay.current]}
          onMouseEnter={autoplay.current.stop}
          onMouseLeave={autoplay.current.reset}
          withControls={false}
          slideGap={8}
        >
          <Carousel.Slide>
            <Image src={dashboard} radius={20} />
          </Carousel.Slide>
          <Carousel.Slide>
            <Image src={tasks} radius={20} />
          </Carousel.Slide>
          <Carousel.Slide>
            <Image src={timesheet} radius={20} />
          </Carousel.Slide>
          <Carousel.Slide>
            <Image src={dtr} radius={20} />
          </Carousel.Slide>
        </Carousel>
      </div>
      <div className="py-[100px]"></div>
    </Stack>
  );
};

export default Home;

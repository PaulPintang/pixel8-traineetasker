import { Center, Image, Stack, Title, Text } from "@mantine/core";
import dashboard from "../assets/dashboard.png";
import { useRef } from "react";
import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";

const Documentation = () => {
  const autoplay = useRef(Autoplay({ delay: 3000 }));
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
      <div className="w-[970px] shadow-2xl">
        {/* <Image src={dashboard} className="shadow-2xl" /> */}
        <Carousel
          mx="auto"
          withIndicators
          loop
          plugins={[autoplay.current]}
          onMouseEnter={autoplay.current.stop}
          onMouseLeave={autoplay.current.reset}
          withControls={false}
        >
          <Carousel.Slide>
            <Image src={dashboard} />
          </Carousel.Slide>
          <Carousel.Slide>
            <Image src={dashboard} />
          </Carousel.Slide>
        </Carousel>
      </div>
      <div className="py-[100px]"></div>
    </Stack>
  );
};

export default Documentation;

import React from 'react';
import Slider from 'react-slick';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import EventDetailsCard from './EventDetailsCard';
import type { EventDetailsCardProps } from './EventDetailsCard';

interface EventListWrapperProps {
  events: EventDetailsCardProps[];
}

const EventListWrapper: React.FC<EventListWrapperProps> = ({ events }) => {
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('md'));

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    swipeToSlide: true,
  };

  return (
    <div>
      {isMobileOrTablet ? (
        <Slider {...sliderSettings}>
          {events.map((event) => (
            <div key={event.eventId}>
              <EventDetailsCard {...event} />
            </div>
          ))}
        </Slider>
      ) : (
        <div className="container mt-3">
          {events.map((event) => (
            <EventDetailsCard key={event.eventId} {...event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventListWrapper;

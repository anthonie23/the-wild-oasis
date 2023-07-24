import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings-v1";
import { useParams } from "react-router-dom";

function useBooking() {
  const { bookingId } = useParams();

  const {
    isLoading,
    error,
    data: booking,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false,
  });
  return { isLoading, error, booking };
}

export default useBooking;

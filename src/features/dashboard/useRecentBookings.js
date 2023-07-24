import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings-v1";

function useRecentBookings() {
  const [searchParam] = useSearchParams();

  const numDays = !searchParam.get("last")
    ? 7
    : Number(searchParam.get("last"));

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: bookings } = useQuery({
    queryKey: ["bookings", `last-${numDays}`],
    queryFn: () => getBookingsAfterDate(queryDate),
  });
  return { isLoading, bookings };
}

export default useRecentBookings;

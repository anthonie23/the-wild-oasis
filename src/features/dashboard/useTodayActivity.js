import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings-v1";

function useTodayActivity() {
  const { data: activity, isLoading } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["activity-today"],
  });
  return { activity, isLoading };
}

export default useTodayActivity;

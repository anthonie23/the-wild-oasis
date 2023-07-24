import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";
import SpinnerMini from "../../ui/SpinnerMini";

function Stats({ bookings, confirmedStays, numDays, cabins, isLoading }) {
  const numCabins = cabins?.length;

  const numBookings = bookings?.length;

  const sales = bookings?.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const checkins = confirmedStays?.length;

  const occupation =
    (confirmedStays?.reduce((acc, cur) => acc + cur.numNights, 0) /
      (numCabins * numDays)) *
    100;

  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        title="bookings"
        value={isLoading ? <SpinnerMini /> : numBookings}
        color="blue"
      />
      <Stat
        icon={<HiOutlineBanknotes />}
        title="sales"
        value={isLoading ? <SpinnerMini /> : formatCurrency(sales)}
        color="green"
      />
      <Stat
        icon={<HiOutlineCalendarDays />}
        title="check-ins"
        value={isLoading ? <SpinnerMini /> : checkins}
        color="indigo"
      />
      <Stat
        icon={<HiOutlineChartBar />}
        title="occupancy rate"
        value={isLoading ? <SpinnerMini /> : Math.round(occupation) + "%"}
        color="yellow"
      />
    </>
  );
}

export default Stats;

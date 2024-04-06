import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import { TypeBooking, TypeCabin } from "../../types";
import { useBookings } from "./useBookings";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";

function BookingTable() {
  const { data, isLoading } = useBookings();
  const bookings = data?.data;
  const count = data?.count;

  if (isLoading) return <Spinner />;
  if (!bookings) return <Empty resourceName="bookings" />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking: TypeBooking | TypeCabin) => (
            <BookingRow
              key={(booking as TypeBooking).id}
              booking={booking as TypeBooking}
            />
          )}
        />
        <Table.Footer>
          <Pagination count={count!} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;

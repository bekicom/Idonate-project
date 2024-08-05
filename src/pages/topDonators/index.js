import { Table } from "../../components";
import { useGetTopDonatersQuery } from "../../context/service/donate.service";

function TopDonators() {
  let { data: topDonaters, error } = useGetTopDonatersQuery();
  console.log(topDonaters);
  console.log(error);

  return (
    <div>
      <p className="title">Top donaterlar</p>
      <Table
        title={["Ismi", "To'lagan summa"]}
        data={[{ ism: "Guli", tolov: "" }]}
      />
    </div>
  );
}

export default TopDonators;

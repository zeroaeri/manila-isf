import { useData } from "../DataContext";
import { useState } from "react";
import { BodyLog } from "../layout";
import moment from "moment";
const ActivityLogsPage = () => {
    const { logs } = useData();

    const [curSearch, setCurSearch] = useState("");
    const [curFilter, setCurFilter] = useState("All");

    const filterBy = ["All", "Added", "Edited", "Deleted"];

    const columns = [
        { id: "id", label: "ID", minWidth: 100 },
        { id: "name", label: "Name", minWidth: 150 },
        {
            id: "activity",
            label: "Activity",
            minWidth: 180,
        },
        { id: "date", label: "Date", minWidth: 150 },
    ];

    function createData(id, name, activity, type, date) {
        return {
            id,
            name,
            activity,
            type,
            date,
        };
    }

    let rows =
        logs.length > 0
            ? logs
                  .filter((data) => {
                      const { activity } = data;
                      return curSearch.toLowerCase() === ""
                          ? data
                          : activity.includes(curSearch.toLowerCase());
                  })
                  .filter((data) => {
                      return curFilter == "" || curFilter == "All"
                          ? data
                          : curFilter == data.type;
                  })
                  .map((dataMap) => {
                      const { id, name, activity, type, updated_at } = dataMap;
                      let date = `${moment(updated_at).format("LLLL")}`;
                      return createData(id, name, activity, type, date);
                  })
            : [];

    return (
        <BodyLog
            module={"Activity Logs"}
            number={rows.length < 10 ? `0${rows.length}` : rows.length}
            rows={rows.length == 0 ? [] : rows}
            columns={columns}
            setCurSearch={setCurSearch}
            curSearch={curSearch}
            setCurFilter={setCurFilter}
            filterBy={filterBy}
            curFilter={curFilter}
        />
    );
};

export default ActivityLogsPage;

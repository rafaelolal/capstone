import { useState } from "react";
import ForbiddenPage from "../components/forbiddenPage";
import { useAppContext } from "../context/state";

export default function Dashboard() {
  const { unit } = useAppContext();
  const [page, setPage] = useState("Add Assignment");

  if (unit != process.env.RESEARCHER_ID) {
    return <ForbiddenPage />;
  }

  return (
    <>
      <button onClick={() => setPage(this.value)}>Add Assignment</button>
      <button onClick={() => setPage(this.value)}>All Assignments</button>

      {page == "Add Assignment" && <p>Add Assignment</p>}
      {page == "All Assignments" && <p>All Assignments</p>}
    </>
  );
}

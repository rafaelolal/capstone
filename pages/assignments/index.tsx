import axios from "axios";
import { useRouter } from "next/router";
import { useAppContext } from "../../context/state";
import useSWR from "swr";
import FlagIcon from "../../components/icons/flag";
import HourglassIcon from "../../components/icons/hourglass";
import Link from "next/link";
import ArrowIcon from "../../components/icons/arrow";
import { toast } from "react-toastify";
import Begin from "../../components/cards/begin";

export default function Assignments() {
  const now = new Date();
  const { unit } = useAppContext();
  const router = useRouter();

  const { data, error } = useSWR("/api/getAssignments", async (url) => {
    return await axios
      .get(url)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        toast.error(`getAssignments Error (${error.code}): ${error.message}`);
      });
  });

  if (error) {
    console.log({ AssignmentError: error });
    return;
  }

  if (!data) {
    return <p>Loading...</p>;
  }

  console.log(data.data);

  return (
    <div className="row my-5">
      {data.data.map((assignment, i) => (
        <div key={i} className="col-6">
          <div className="post p-3" style={{ outline: "1px black solid" }}>
            <h2 className="fw-bold">{assignment.title}</h2>

            <p className="text-center">
              {assignment.body
                .split("\\n")
                .join(" ")
                .split(". ")
                .slice(0, 2)
                .join(". ")}
              ...
            </p>

            <Begin assignment={assignment} />

            <div className="date mt-3">
              <div className="row m-0">
                <div className="col-auto icon d-flex">
                  <div className="mx-auto my-auto d-flex p-1">
                    <div
                      style={{
                        color:
                          new Date(assignment.openDate) < now ? "green" : "red",
                      }}
                    >
                      <FlagIcon />
                    </div>
                  </div>
                </div>

                <div className="col">
                  <p
                    className="text-center fw-bold mb-0"
                    aria-describedby="basic-addon1"
                  >
                    OPENS
                  </p>
                  <p className="text-center mb-0">
                    {new Date(assignment.openDate).toLocaleString(undefined, {
                      timeZone: "UTC",
                      year: "numeric",
                      month: "long",
                      day: "2-digit",
                      weekday: "long",
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="date mt-3">
              <div className="row m-0">
                <div className="col-auto icon d-flex">
                  <div className="mx-auto my-auto d-flex p-1">
                    <div
                      style={{
                        color:
                          new Date(assignment.dueDate) > now ? "green" : "red",
                      }}
                    >
                      <HourglassIcon />
                    </div>
                  </div>
                </div>
                <div className="col">
                  <p
                    className="text-center fw-bold mb-0"
                    aria-describedby="basic-addon1"
                  >
                    DUE
                  </p>
                  <p className="text-center mb-0">
                    {new Date(assignment.dueDate).toLocaleString(undefined, {
                      timeZone: "UTC",
                      year: "numeric",
                      month: "long",
                      day: "2-digit",
                      weekday: "long",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

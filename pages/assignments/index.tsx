import axios from "axios";
import { useRouter } from "next/router";
import { useAppContext } from "../../context/state";
import useSWR from "swr";
import FlagIcon from "../../components/icons/flag";
import HourglassIcon from "../../components/icons/hourglass";
import Link from "next/link";
import ArrowIcon from "../../components/icons/arrow";

export default function Assignments() {
  const now = new Date();
  const { unit, addToast } = useAppContext();
  const router = useRouter();

  const { data, error } = useSWR("/api/getAssignments", async (url) => {
    return await axios
      .get(url)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        addToast({
          status: 500,
          title: error.code,
          body: error.message,
        });
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
    <div className="row g-5 my-5">
      {data.data.map((assignment, i) => (
        <div key={i} className="col-6">
          <div className="post p-3">
            <div className="d-flex justify-content-between">
              <div
                className={`p-1 fw-bold text-center ms-auto d-inline-block ${
                  new Date(assignment.openDate) < now ? "begin" : "noBegin"
                }`}
              >
                <Link href={`/assignments/${assignment.id}`}>
                  <a style={{ textDecoration: "none" }}>
                    {new Date(assignment.openDate) < now
                      ? "BEGIN"
                      : "UNAVAILABLE"}
                  </a>
                </Link>
              </div>
            </div>
            <h2 className="fw-bold">{assignment.title}</h2>

            <p className="text-center">{assignment.description.split("\\n").join(" ").split(". ").slice(0, 2).join(". ")}...</p>

            <div className="date mt-5">
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

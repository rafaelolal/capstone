import axios from "axios";
import { useRef } from "react";
import { useAppContext } from "../context/state";

export default function Index() {
  const { unit, setUnit, addToast } = useAppContext();

  const idRef = useRef<HTMLInputElement>(null);

  function signIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const id = idRef.current!.value;

    axios
      .get("/api/signIn", { params: { id } })
      .then((response) => {
        const data = response.data;
        addToast({
          status: data.status,
          title: data.title,
          body: data.message,
        });

        if (data.found) {
          setUnit(id);
        }
      })
      .catch((error) => {
        addToast({
          status: 500,
          title: error.code,
          body: error.message,
        });
      });
  }

  function signOut() {
    setUnit(null);
    addToast({
      status: 200,
      title: "Signed Out",
      body: "None of your personal data was recorded",
    });
  }

  if (unit) {
    return (
      <div className="d-flex " style={{ height: "94vh" }}>
        <div className="mx-auto my-auto card">
          <div className="card-body">
            <h5 className="card-title">Signed in as unit {unit}</h5>
            <p className="card-text">
              Thank you for participating in this experiment.
            </p>
            <button className="btn btn-primary" onClick={signOut}>
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex" style={{ height: "94vh" }}>
      <form className="mx-auto my-auto" onSubmit={signIn}>
        <div className="input-group">
          <span className="input-group-text" id="idInputLabel">
            ID
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="1234"
            aria-label="Code"
            aria-describedby="idInputLabel"
            ref={idRef}
          />
          <button type="submit" className="btn btn-primary">
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}

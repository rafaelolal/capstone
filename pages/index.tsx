import axios from 'axios';
import { MutableRefObject, useRef } from 'react';
import { toast } from 'react-toastify';
import { useAppContext } from '../context/state';

export default function Index() {
  const { unit, setUnit } = useAppContext();

  const idRef = useRef() as MutableRefObject<HTMLInputElement>;

  function signIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const id = idRef.current.value;

    axios
      .get('https://ralmeida.dev/capstone_server/questions/?format=api')
      .then((response) => {
        const data = response.data;
        console.log({ response });
        if (data.data) {
          setUnit(id);
        } else {
          toast.warning(data.message);
        }
      })
      .catch((error) => {
        toast.error(`signIn Error (${error.code}): ${error.message}`);
      });
  }

  function signOut() {
    setUnit('');
    toast.success(`Signed out: none of your personal information was recorded`);
  }

  if (unit) {
    return (
      <div className="d-flex " style={{ height: '94vh' }}>
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
    <div className="d-flex" style={{ height: '94vh' }}>
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

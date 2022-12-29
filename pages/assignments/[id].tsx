import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { useAppContext } from "../../context/state";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const prisma = new PrismaClient();

export default function Assignment(props) {
  const { unit, addToast } = useAppContext();

  // const [showPause, setShowPause] = useState(false);
  // const [showStart, setShowStart] = useState(true);
  // const [timeOn, setTimeOn] = useState(false);

  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // if (timeOn) {
      setTime((time) => time + 1);
      // } else {
      //   setTime((time) => time);
      // }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!unit) {
    return (
      <div className="d-flex" style={{ height: "94vh" }}>
        <div className="mx-auto my-auto">
          <h1>You must sign in before viewing assignments</h1>
          <Link href="/">
            <button className="btn btn-primary">Back</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="my-5">
      <h1>{props.assignment.title}</h1>
      <div className="mt-5 col-10 mx-auto">
        {props.assignment.description.split("\\n").map((paragraph) => (
          <p className="fs-5 problemP">{paragraph}</p>
        ))}
      </div>
      <div className="col-9 mt-5 mx-auto d-flex flex-column">
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          placeholder="Response"
        />
        <div className="ms-auto mt-3">
          <p className="fs-3 d-inline-block me-3 align-top">{time}</p>
          {/* <button
            className="btn btn-warning me-3"
            onClick={() => {
              setTimeOn(false);
              setShowPause(true);
            }}
          >
            Pause
          </button> */}

          <button className="btn btn-success" onClick={() => {}}>
            Submit
          </button>
        </div>
      </div>
      {/* <Modal show={showStart} backdrop="static">
        <Modal.Header>
          <Modal.Title>START</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Make sure you have at most 30 minutes free to complete this
          assignment. Start whenever you are ready.
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              // setTimeOn(true);
              setShowStart(false);
            }}
          >
            Start
          </Button>
        </Modal.Footer>
      </Modal> */}

      {/* <Modal show={showPause} backdrop="static">
        <Modal.Header>
          <Modal.Title>PAUSED</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Take a break and do what you have to do. When you are ready to
          continue working press resume. Try to minimize the number of pauses.
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setTimeOn(true);
              setShowPause(false);
            }}
          >
            Resume
          </Button>
        </Modal.Footer>
      </Modal> */}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;

  const result = await prisma.assignment.findFirst({
    where: {
      id: parseInt(id),
    },
  });

  return {
    props: {
      assignment: JSON.parse(JSON.stringify(result)),
    },
  };
}

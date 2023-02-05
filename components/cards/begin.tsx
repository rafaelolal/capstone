import Link from "next/link";

export default function Begin(props: assignment) {
  const today = new Date();

  return (
    <div className="d-flex">
      <div
        className={`p-1 fw-bold text-center d-inline-block mx-auto ${
          new Date(props.assignment.openDate) < today ? "begin" : "noBegin"
        }`}
      >
        {true ? (
          <Link href={`/assignments/${props.assignment.id}`}>
            <a style={{ textDecoration: "none" }}>BEGIN</a>
          </Link>
        ) : (
          <a>UNAVAILABLE</a>
        )}
      </div>
    </div>
  );
}

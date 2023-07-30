import "./index.css";

interface Props {
  color: string;
}

const CircleLoader = ({ color }: Props) => {
  return (
    <>
      <section className="talign-center">
        <div
          className={`spinner text-${color} spinner--steps2 icon-spinner-7`}
          aria-hidden="true"
        ></div>
      </section>
    </>
  );
};

export default CircleLoader;

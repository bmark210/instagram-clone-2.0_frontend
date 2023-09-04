import "./index.css";

interface Props {
  color: string;
  size: string;
}

const CircleLoader = ({ color, size }: Props) => {
  return (
    <>
      <section className={`text-${size} talign-center`}>
        <div
          className={`spinner text-${color} spinner--steps2 icon-spinner-7`}
          aria-hidden="true"
        ></div>
      </section>
    </>
  );
};

export default CircleLoader;

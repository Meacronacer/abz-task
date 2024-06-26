import root from "./contentTop.module.scss";

const ContentTop = () => {
  return (
    <div className={root.contentTop}>
      <div className={root.inner}>
        <h1 className={root.title}>Test assignment for front-end developer</h1>
        <p className={root.description}>
          What defines a good front-end developer is one that has skilled
          knowledge of HTML, CSS, JS with a vast understanding of User design
          thinking as they'll be building web interfaces with accessibility in
          mind. They should also be excited to learn, as the world of Front-End
          Development keeps evolving.
        </p>
        <button>Sign up</button>
      </div>
    </div>
  );
};

export default ContentTop;

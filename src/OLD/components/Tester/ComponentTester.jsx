const ComponentTester = ({ component: Component, props = {} }) => {
  return (
    <div style={{ padding: "20px", display: "flex", justifyContent: "center" }}>
      <Component {...props} />
    </div>
  );
};

export default ComponentTester;

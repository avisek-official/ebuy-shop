const Container = (props) => {
  return (
    <div className="w-full h-auto min-h-screen flex flex-col justify-between items-center">
      {props.children}
    </div>
  );
};

export default Container;

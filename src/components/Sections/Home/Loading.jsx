const Loading = () => {
  return (
    <>
      <section className="flex justify-center bg-pattern">
        <div className="w-primary justify-center flex items-center h-screen py-40">
          <div className="spinner">
            {Array.from({ length: 8 }).map((_, index) => (
              <span key={index} className="dark:!bg-white"></span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Loading;

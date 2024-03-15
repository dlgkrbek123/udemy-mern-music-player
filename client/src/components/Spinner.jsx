const Spinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black opacity-80">
      <div className="w-20 h-20 border-t-4 border-b-4 border-gray-300 rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;

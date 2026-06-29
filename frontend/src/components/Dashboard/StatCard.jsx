const StatCard = ({ title, value }) => {
  return (
    <div className="bg-white border rounded-2xl shadow-sm p-5 sm:p-6 hover:shadow-md transition">

      {/* Title */}
      <h3 className="text-sm sm:text-base text-gray-500 font-medium">
        {title}
      </h3>

      {/* Value */}
      <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-gray-800">
        {value}
      </h1>

    </div>
  );
};

export default StatCard;
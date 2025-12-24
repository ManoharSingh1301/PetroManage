export const SummaryCard = ({ title, value, textColor, onClick, isActive }) => {
  return (
    <div 
      onClick={onClick} 
      className={`p-4 border-2 rounded-lg shadow-sm bg-white cursor-pointer transition-all duration-200
        ${isActive ? 'border-blue-500 ring-2 ring-blue-100 shadow-md' : 'border-transparent hover:border-gray-300 hover:shadow-md'}
      `}
    >
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      <p className={`text-2xl font-bold ${textColor}`}>{value}</p>
      
      {/* Small indicator text that appears on hover */}
      <span className="text-[10px] text-gray-400 opacity-0 group-hover:opacity-100">Click to filter</span>
    </div>
  );
};
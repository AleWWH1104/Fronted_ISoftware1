export default function KPICard ({titulo, valor, icono}) {
  return (
    <div className="bg-white rounded-lg p-4 pb-1 shadow-xs ">
      <div className="flex items-start gap-3">
        <div
          className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-[#046BB1]"
          style={{ backgroundColor: "#DDF0FC" }}
        >
          {icono}
        </div>
        <div className="flex flex-col">
          <p className="text-sm">{titulo}</p>
          <p className="titulo font-bold" style={{ color: "#046BB1" }}>
            {valor}
          </p>
        </div>
      </div>
    </div>
  )
}











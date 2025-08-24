export default function KPICard ({titulo, valor, icono}) {
  return (
    <div className="bg-white rounded-lg p-3 shadow-xs ">
      <div className="flex items-start gap-3">
        <div
          className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-[#046BB1]"
          style={{ backgroundColor: "#DDF0FC" }}
        >
          {icono}
        </div>
        <div className="flex-1">
          <p className="text-sm">{titulo}</p>
          <p className="titulo font-bold" style={{ color: "#046BB1" }}>
            {valor}
          </p>
        </div>
      </div>
    </div>
  )
}











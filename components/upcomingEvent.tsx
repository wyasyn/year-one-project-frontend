export default function UpcomingEvent() {
  return (
    <div className="flex flex-col gap-3 items-center xl:items-start xl:flex-row ">
      <div className=" p-1 rounded-lg border text-center">
        <div className=" text-xs ">oct</div>
        <div className=" font-bold text-foreground ">06</div>
        <div className=" text-xs ">2024</div>
      </div>
      <div className="text-center xl:text-start">
        <p className="font-light text-xs ">Exam</p>
        <h2 className="text-foreground font-light capitalize truncate">
          student life
        </h2>
        <p className="font-light text-xs ">Aug - Dec</p>
      </div>
    </div>
  );
}

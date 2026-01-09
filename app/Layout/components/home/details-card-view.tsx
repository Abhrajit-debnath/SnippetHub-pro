import React from "react";

type DetailsViewCardProps = {
  title: string;
  icon: React.ReactElement;
  data: number | string;
  variant: "purple" | "yellow" | "green" | "violet";
};

const colorMap = {
  purple: "bg-purple-700",
  yellow: "bg-yellow-700",
  green: "bg-green-700",
  violet: "bg-violet-800",
};

const DetailsViewCard = ({
  data,
  title,
  icon,
  variant,
}: DetailsViewCardProps) => {
  return (
    <div className="bg-snippetCardbox rounded-2xl p-4 flex gap-4">
      <div
        className={`${colorMap[variant]} p-2 rounded-lg flex justify-center items-center`}
      >
        {icon}
      </div>
      <div className="text-white">
        <h3 className="font-poppins">{title}</h3>

        <h2 className="font-inter">{data}</h2>
      </div>
    </div>
  );
};

export default DetailsViewCard;

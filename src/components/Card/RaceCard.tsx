import Image from "next/future/image";
import { capitalize } from "lodash";

import { Label } from "@components/Label";
import { Card } from "./Card";

interface IRaceCard {
  round: number;
  circuitId: string;
  country: string;
  year: string;
  date: string;
}

const Backdrop = () => {
  return <div className="absolute z-10 h-full w-full bg-brand-blue-400/60" />;
};

export const RaceCard = ({ round, circuitId, country, date }: IRaceCard) => {
  const corrections: { [key: string]: string } = {
    UK: "Great Britain",
    UAE: "Abu Dhabi",
    USA: "United States"
  };

  const clean = {
    round: String(round).padStart(2, "0"),
    circuitId: circuitId
      .split("_")
      .map((e) => capitalize(e))
      .join(" "),
    country: (corrections[country] || country).toLowerCase().replace(/\s/g, "-")
  };
  const imagePath = `/races/${clean.round}-${clean.country}.jpeg`;

  return (
    <Card
      href={`/races/${round}`}
      selected={(asPath) => asPath.split("/").at(-1) === round.toString()}
      className="items-center justify-center gap-2 p-5 text-center"
    >
      <div className="z-20 drop-shadow-card-text-md">
        <h1 className="text-[22px] font-medium">
          {corrections[country] || country}
        </h1>
        <h2 className="text-sm font-medium uppercase">{clean.circuitId}</h2>
      </div>
      <Label text={date} className="z-20" />
      <Backdrop />
      <Image
        src={imagePath}
        alt={`${circuitId}, ${country}, ${date}}`}
        className="object-cover"
        fill
      />
    </Card>
  );
};
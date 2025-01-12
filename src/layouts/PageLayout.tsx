import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

import { CardsTrigger } from "@components/CardsTrigger";
import { IPill, Pill } from "@components/Pill";

import { AppLayout } from "./AppLayout";

interface IPageLayout {
  headTitle: string;
  title: string;
  subtitle?: string;
  buttons?: IPill[][];
  side?: React.ReactNode;
  body: React.ReactNode;
  showTrigger?: boolean;
}

const Divider = ({ className = "" }: { className?: string }) => (
  <div className={`${className} h-3 w-px bg-brand-blue-200`.trim()} />
);

const Menu = ({ buttonGroups }: { buttonGroups: IPill[][] }) => {
  return (
    <div className="flex items-center gap-5">
      {buttonGroups.map((buttonGroup, idx) => (
        <div key={uuidv4()} className="flex items-center gap-[10px]">
          {buttonGroup
            .filter((button) => !button.hidden)
            .map((button) => (
              <Pill key={uuidv4()} {...button} />
            ))}
          {idx < buttonGroups.length - 1 && <Divider className="ml-[10px]" />}
        </div>
      ))}
    </div>
  );
};

const PageContext = ({
  title,
  subtitle
}: {
  title: string;
  subtitle?: string;
}) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <h1 className="text-center text-[40px] font-medium text-brand-white-100">
        {title}
      </h1>
      {subtitle && (
        <p className="whitespace-pre break-normal text-center text-base font-medium uppercase text-brand-blue-100 opacity-70">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export const PageLayout = ({
  headTitle,
  title,
  subtitle,
  side,
  body,
  buttons,
  showTrigger = true
}: IPageLayout) => {
  return (
    <AppLayout headTitle={headTitle}>
      {side}
      <div className="relative flex flex-auto flex-col items-center gap-10 bg-brand-blue-400 px-4 pt-12 pb-8 md:pb-16 text-brand-white-100 overflow-scroll lg:px-14">
        {showTrigger && <CardsTrigger />}
        <Image
          src="/f1_logo.svg"
          alt="Formula 1 logo"
          width={120}
          height={30}
        />
        <PageContext title={title} subtitle={subtitle} />
        {buttons && <Menu buttonGroups={buttons} />}
        {body}
      </div>
    </AppLayout>
  );
};

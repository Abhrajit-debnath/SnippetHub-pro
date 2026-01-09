import { useAuthStore } from "@/app/store/authStore";
import { useSnippetStore } from "@/app/store/snippetStore";
import { CodeXml, Crown, Braces, CalendarCheck2 } from "lucide-react";
import DetailsViewCard from "./details-card-view";
import { useEffect, useMemo } from "react";
type DashboardDetail = {
  name: string;
  icon: React.ReactElement;
  data: number | string;
  variant: "purple" | "yellow" | "green";
};

const DahboardView = () => {
  const { snippets, fetchSnippets } = useSnippetStore();
  const { user } = useAuthStore();

  useEffect(() => {
    fetchSnippets();
  }, []);

  const uniqueLanguages = useMemo(() => {
    return Array.from(new Set(snippets.map((snippet) => snippet.language)));
  }, [snippets]);

  const DetailsObj: DashboardDetail[] = [
    {
      name: "Snippet Count",
      icon: <CodeXml className="text-purple-300" />,
      data: snippets.length,
      variant: "purple",
    },
    {
      name: "Plan Status",
      icon: <Crown className="text-yellow-500" />,
      data: user?.isSubscribed ? "Pro" : "Free",
      variant: "yellow",
    },
    {
      name: "Languages Used",
      icon: <Braces className="text-violet-400" />,
      data: uniqueLanguages.length,
      variant: "violet",
    },
    {
      name: "Last Snippet",
      icon: <CalendarCheck2 className="text-green-500" />,
      data: snippets.length > 0 ? snippets.at(-1)?.title : "No snippets",
      variant: "green",
    },
  ];

  return (
    <div className="bg-sidebarBg  rounded-xl mt-8 p-5 ">
      <h2 className="pb-3  text-white font-poppins capitalize text-lg">
        overview
      </h2>
      <div className="grid grid-cols-1 xxs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5   w-full">
        {DetailsObj.map((item) => (
          <DetailsViewCard
            key={item.name}
            title={item.name}
            icon={item.icon}
            data={item.data}
            variant={item.variant}
          />
        ))}
      </div>
    </div>
  );
};

export default DahboardView;

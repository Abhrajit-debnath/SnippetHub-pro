import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import axios from "@/app/config/axios.config";

const SnippetSearchBox = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      console.log("run");
      
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  useEffect(() => {
    if (!debouncedQuery) {
      return;
    }

    seachSnippetHandler(debouncedQuery)
  }, [debouncedQuery]);

  const seachSnippetHandler=async(query:string)=>{
try {
    const res = await axios.get(`/snippets/search/${query}`)
} catch (error) {
    
}
  }

  return (
    <div className="w-full mx-auto mt-8">
      <div className="flex items-center bg-snippetCardbox gap-3 rounded-xl px-4 py-2">
        <Search className="h-5 w-5 text-white" />

        <input
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search snippets by title, tag, or language..."
          className="w-full py-2 text-white border-none text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>
    </div>
  );
};

export default SnippetSearchBox;
